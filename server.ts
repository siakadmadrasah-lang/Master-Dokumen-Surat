import express from 'express';
import path from 'path';
import fs from 'fs';
import JSZip from 'jszip';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { generateMadrasahSqlDump } from './src/utils/sqlExport';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Lazy initialization of Gemini API
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. AI features will fallback to smart template generators.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Helper for mapping incoming raw data
function normalizeTeachersList(rawItems: any[]): any[] {
  if (!Array.isArray(rawItems)) return [];
  return rawItems.map((item, idx) => {
    const nama = item.nama || item.name || item.nama_lengkap || item.nama_guru || `Guru #${idx + 1}`;
    const nip = item.nip && item.nip !== '-' ? String(item.nip).trim() : '';
    const nuptk = item.nuptk && item.nuptk !== '-' ? String(item.nuptk).trim() : '';
    const pegId = item.peg_id || item.pegId || item.id_pegawai || item.npk || '';
    
    let jk: 'L' | 'P' = 'L';
    const rawJk = (item.jenis_kelamin || item.jk || item.gender || 'L').toString().toUpperCase();
    if (rawJk.startsWith('P') || rawJk === 'WANITA' || rawJk === 'PEREMPUAN' || rawJk === 'FEMALE') {
      jk = 'P';
    }

    const gelarBelakang = item.gelar || item.gelar_belakang || item.gelarBelakang || (nama.includes(',') ? nama.split(',').slice(1).join(',').trim() : '');

    // Status Kepegawaian & Pangkat Golongan
    let statusKep: string = 'GTY';
    const rawStatus = (item.status_kepegawaian || item.status || '').toUpperCase();
    if (rawStatus.includes('PNS') || (nip && nip.length >= 18)) {
      statusKep = 'PNS';
    } else if (rawStatus.includes('PPPK')) {
      statusKep = 'PPPK';
    } else if (rawStatus.includes('GTT') || rawStatus.includes('HONORER')) {
      statusKep = 'GTT';
    } else {
      statusKep = 'GTY';
    }

    const isSertifikasi = Boolean(
      item.sertifikasi === true ||
      item.sertifikasi === 'Sudah Sertifikasi' ||
      item.status_sertifikasi === 'Sudah Sertifikasi' ||
      item.is_certified === true ||
      item.sertifikasi === '1'
    );

    // Tanggal Lahir check
    const rawTglLahir = item.tanggal_lahir || item.tanggalLahir || '';
    const safeTglLahir = (rawTglLahir && String(rawTglLahir).includes('-')) ? String(rawTglLahir) : '1980-01-01';

    return {
      id: item.id ? String(item.id) : `T-SIAKAD-${Date.now()}-${idx + 1}`,
      nama: nama,
      gelarDepan: item.gelar_depan || item.gelarDepan || '',
      gelarBelakang: gelarBelakang,
      nip: nip,
      nuptk: nuptk,
      pegId: pegId,
      jenisKelamin: jk,
      tempatLahir: item.tempat_lahir || item.tempatLahir || 'Banyumas',
      tanggalLahir: safeTglLahir,
      statusKepegawaian: statusKep,
      pangkatGol: item.pangkat_gol || item.pangkatGol || (statusKep === 'PNS' ? 'Penata Muda / III/a' : 'Guru Tetap Yayasan'),
      jabatanUtama: item.jabatan_utama || item.jabatan || 'Guru Kelas',
      tugasTambahan: item.tugas_tambahan || (item.mengajar_kelas ? `Wali ${item.mengajar_kelas}` : ''),
      mapelUtama: item.mapel_diampu && item.mapel_diampu !== '-' ? item.mapel_diampu : (item.mapel_utama || item.mapel || 'Pendidikan Agama Islam'),
      jumlahJam: Number(item.jumlah_jam || item.jumlahJam || item.jp || 24),
      waliKelasDi: item.mengajar_kelas || item.kelas_diampu || item.wali_kelas || '',
      sertifikasi: isSertifikasi,
      telepon: item.telepon || item.no_hp || item.phone || '',
      email: item.email || '',
      isActive: item.status_keaktifan ? item.status_keaktifan === 'Aktif' : (item.is_active !== undefined ? Boolean(item.is_active) : true),
      signatureUrl: item.foto_url || item.foto || item.signature_url || undefined,
    };
  });
}

function normalizeStudentsList(rawItems: any[]): any[] {
  if (!Array.isArray(rawItems)) return [];
  return rawItems.map((item, idx) => {
    const nama = item.nama || item.name || item.nama_lengkap || item.nama_siswa || `Siswa #${idx + 1}`;
    const nisn = item.nisn || item.NISN || '';
    const nis = item.nis || item.NIS || `MI-${2025000 + idx + 1}`;
    const nik = item.nik && item.nik !== '-' ? String(item.nik).replace(/['"]/g, '').trim() : '';
    
    let jk: 'L' | 'P' = 'L';
    const rawJk = (item.jenis_kelamin || item.jk || item.gender || 'L').toString().toUpperCase();
    if (rawJk.startsWith('P') || rawJk === 'WANITA' || rawJk === 'PEREMPUAN' || rawJk === 'FEMALE') {
      jk = 'P';
    }

    const rombel = item.rombel || item.kelas || item.nama_kelas || 'Kelas 1';
    const tingkatMatch = String(rombel).match(/\d+/);
    const tingkat = tingkatMatch ? parseInt(tingkatMatch[0], 10) : Number(item.tingkat || 1);

    const rawTglLahir = item.tanggal_lahir || item.tanggalLahir || '';
    const safeTglLahir = (rawTglLahir && String(rawTglLahir).includes('-')) ? String(rawTglLahir) : '2016-01-01';

    return {
      id: item.id ? String(item.id) : `S-SIAKAD-${Date.now()}-${idx + 1}`,
      nisn: nisn,
      nis: nis,
      nik: nik,
      nama: nama,
      jenisKelamin: jk,
      rombel: rombel,
      tingkat: isNaN(tingkat) ? 1 : tingkat,
      tempatLahir: item.tempat_lahir || item.tempatLahir || 'Banyumas',
      tanggalLahir: safeTglLahir,
      namaAyah: item.nama_ayah || item.ayah || item.namaAyah || '',
      namaIbu: item.nama_ibu || item.ibu || item.namaIbu || '',
      pekerjaanOrtu: item.pekerjaan_ayah || item.pekerjaan_ortu || item.pekerjaan || 'Wiraswasta',
      alamat: item.address || item.alamat || item.alamat_lengkap || 'Sanggreman, Rawalo, Banyumas',
      desaKelurahan: item.desa || item.kelurahan || item.desaKelurahan || 'Sanggreman',
      kecamatan: item.kecamatan || 'Rawalo',
      kabupatenKota: item.kabupaten || item.kabupatenKota || 'Banyumas',
      provinsi: item.provinsi || 'Jawa Tengah',
      statusSiswa: item.status === 'active' || item.status === 'Aktif' || !item.status ? 'Aktif' : item.status,
      tahunMasuk: String(item.tahun_masuk || item.tahunMasuk || '2024'),
      teleponOrtu: item.no_hp_ortu || item.phone || item.telepon_ortu || '',
    };
  });
}

async function safeJsonFetch(url: string, options?: any): Promise<any | null> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    const text = await res.text();
    const trimmed = text.trim();
    if (trimmed.startsWith('<') || trimmed.startsWith('<!doctype') || trimmed.startsWith('<!DOCTYPE')) {
      return null;
    }
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// SIAKAD Test Connection (with live teacher & student probing)
app.post('/api/siakad/test-connection', async (req, res) => {
  try {
    const { baseUrl, apiToken } = req.body;
    const targetUrl = (baseUrl || 'https://siakad-madrasah.jaenalmaskun.biz.id').replace(/\/$/, '');

    const headers: Record<string, string> = {
      'User-Agent': 'AutoMadrasah-Sync/1.0',
      'Accept': 'application/json, text/html, */*',
    };
    if (apiToken) {
      headers['Authorization'] = `Bearer ${apiToken}`;
      headers['X-API-KEY'] = apiToken;
    }

    let isOnline = false;
    let statusCode = 200;
    let statusText = 'OK';
    let teachersCount = 0;
    let studentsCount = 0;
    let madrasahName = '';

    // 1. Check root or api.php
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const pingRes = await fetch(targetUrl, { headers, signal: controller.signal });
      clearTimeout(timeout);
      isOnline = pingRes.ok;
      statusCode = pingRes.status;
      statusText = pingRes.statusText;
    } catch {
      // If root failed, continue to test api.php directly
    }

    // 2. Probe Teachers from data_guru
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const json = await safeJsonFetch(`${targetUrl}/api.php?action=select&table=site_settings&id=data_guru`, {
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (json) {
        isOnline = true;
        const list = Array.isArray(json?.data?.value)
          ? json.data.value
          : Array.isArray(json?.data)
          ? json.data
          : [];
        teachersCount = list.length;
      }
    } catch {
      // continue
    }

    // 3. Probe Students from students_data
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const json = await safeJsonFetch(`${targetUrl}/api.php?action=select&table=site_settings&id=students_data`, {
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (json) {
        const list = Array.isArray(json?.data?.value)
          ? json.data.value
          : Array.isArray(json?.data)
          ? json.data
          : [];
        studentsCount = list.length;
      }
    } catch {
      // continue
    }

    // 4. Probe Madrasah Profile
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const json = await safeJsonFetch(`${targetUrl}/api.php?action=select&table=site_settings&id=identitas_madrasah`, {
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (json) {
        madrasahName = json?.data?.value?.nama_madrasah || '';
      }
    } catch {
      // continue
    }

    if (!isOnline && teachersCount === 0 && studentsCount === 0) {
      return res.json({
        success: false,
        message: `Tidak dapat terhubung ke ${targetUrl}. Periksa koneksi internet atau status domain.`,
      });
    }

    const message = teachersCount > 0 || studentsCount > 0
      ? `Koneksi berhasil! Terhubung ke SIAKAD ${madrasahName ? `(${madrasahName})` : ''} - Terdeteksi ${teachersCount} Guru & ${studentsCount} Siswa di database.`
      : `Koneksi ke ${targetUrl} berhasil (HTTP ${statusCode} ${statusText}), namun data guru belum terdeteksi. Silakan jalankan Sinkronisasi Otomatis.`;

    return res.json({
      success: true,
      status: statusCode,
      statusText: statusText,
      teachersCount,
      studentsCount,
      madrasahName: madrasahName || 'SIAKAD Madrasah',
      message,
      details: {
        teachersCount,
        studentsCount,
        madrasahName,
        targetUrl,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// SIAKAD Sync Data
app.post('/api/siakad/sync', async (req, res) => {
  try {
    const { baseUrl, apiToken, target, customEndpoints } = req.body;
    const rootUrl = (baseUrl || 'https://siakad-madrasah.jaenalmaskun.biz.id').replace(/\/$/, '');

    const headers: Record<string, string> = {
      'User-Agent': 'AutoMadrasah-Sync/1.0',
      'Accept': 'application/json',
    };
    if (apiToken) {
      headers['Authorization'] = `Bearer ${apiToken}`;
      headers['X-API-KEY'] = apiToken;
    }

    let teachers: any[] = [];
    let students: any[] = [];
    let profileData: any = null;
    const errors: string[] = [];

    // Helper to safely extract list from API response
    const extractList = (json: any, targetKey: 'guru' | 'siswa'): any[] => {
      if (!json) return [];
      if (Array.isArray(json)) return json;
      if (Array.isArray(json?.data?.value)) return json.data.value;
      if (Array.isArray(json?.value)) return json.value;
      if (Array.isArray(json?.data)) {
        if (targetKey === 'guru') {
          const found = json.data.find((r: any) => r.id === 'data_guru' || r.id === 'data_guru_madrasah_default');
          if (found && Array.isArray(found.value)) return found.value;
        } else {
          const found = json.data.find((r: any) => r.id === 'students_data' || r.id === 'app_students_v2' || r.id === 'students_list');
          if (found && Array.isArray(found.value)) return found.value;
        }
        return json.data;
      }
      if (json.teachers || json.guru) return json.teachers || json.guru;
      if (json.students || json.siswa) return json.students || json.siswa;
      if (json.items) return json.items;
      return [];
    };

    // 1. Fetch Teachers if requested
    if (target === 'all' || target === 'teachers') {
      const teacherEndpoints = [
        customEndpoints?.teachers,
        '/api.php?action=select&table=site_settings&id=data_guru',
        '/api.php?action=select&table=site_settings&id=data_guru_madrasah_default',
        '/api.php?action=select&table=site_settings',
        '/api/v1/teachers',
        '/api/v1/guru',
        '/api/teachers',
        '/api/guru',
        '/data/guru.json',
        '/api/export/teachers',
      ].filter(Boolean);

      let fetchedTeachers = false;
      for (const ep of teacherEndpoints) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 7000);
          const tUrl = `${rootUrl}${ep?.startsWith('/') ? ep : `/${ep}`}`;
          const json = await safeJsonFetch(tUrl, { headers, signal: controller.signal });
          clearTimeout(timeout);

          if (json) {
            const rawList = extractList(json, 'guru');
            if (Array.isArray(rawList) && rawList.length > 0) {
              teachers = normalizeTeachersList(rawList);
              fetchedTeachers = true;
              break;
            }
          }
        } catch {
          // continue checking other endpoints
        }
      }

      if (!fetchedTeachers) {
        errors.push(`Endpoint guru di ${rootUrl} tidak mengembalikan data. Pastikan server SIAKAD aktif.`);
      }
    }

    // 2. Fetch Students if requested
    if (target === 'all' || target === 'students') {
      const studentEndpoints = [
        customEndpoints?.students,
        '/api.php?action=select&table=site_settings&id=students_data',
        '/api.php?action=select&table=site_settings&id=app_students_v2',
        '/api.php?action=select&table=site_settings&id=students_list',
        '/api.php?action=select&table=site_settings',
        '/api/v1/students',
        '/api/v1/siswa',
        '/api/students',
        '/api/siswa',
        '/data/siswa.json',
        '/api/export/students',
      ].filter(Boolean);

      let fetchedStudents = false;
      for (const ep of studentEndpoints) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 7000);
          const sUrl = `${rootUrl}${ep?.startsWith('/') ? ep : `/${ep}`}`;
          const json = await safeJsonFetch(sUrl, { headers, signal: controller.signal });
          clearTimeout(timeout);

          if (json) {
            const rawList = extractList(json, 'siswa');
            if (Array.isArray(rawList) && rawList.length > 0) {
              students = normalizeStudentsList(rawList);
              fetchedStudents = true;
              break;
            }
          }
        } catch {
          // continue checking other endpoints
        }
      }

      if (!fetchedStudents) {
        errors.push(`Endpoint siswa di ${rootUrl} tidak mengembalikan data. Pastikan endpoint SIAKAD sesuai.`);
      }
    }

    // 3. Fetch School Profile if requested
    if (target === 'all' || target === 'profile') {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000);
        const pUrl = `${rootUrl}/api.php?action=select&table=site_settings&id=identitas_madrasah`;
        const json = await safeJsonFetch(pUrl, { headers, signal: controller.signal });
        clearTimeout(timeout);
        if (json) {
          profileData = json?.data?.value || null;
        }
      } catch {
        // optional profile
      }
    }

    const hasData = teachers.length > 0 || students.length > 0;
    res.json({
      success: hasData || errors.length === 0,
      message: hasData
        ? `Berhasil menarik ${teachers.length} data guru dan ${students.length} data siswa dari ${rootUrl}!`
        : `Koneksi ke ${rootUrl} selesai. Silakan periksa kredensial token/endpoint jika data belum muncul.`,
      teachersCount: teachers.length,
      studentsCount: students.length,
      teachers: teachers.length > 0 ? teachers : undefined,
      students: students.length > 0 ? students : undefined,
      profile: profileData || undefined,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Error in Siakad Sync:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Gagal sinkronisasi data SIAKAD',
    });
  }
});

// Full Production Plesk ZIP Exporter
app.post('/api/export/plesk-bundle', async (req, res) => {
  try {
    const { profile, documents, teachers, students, rombels, logs } = req.body || {};
    const zip = new JSZip();

    // 1. htaccess
    const htaccess = `# ====================================================================
# AUTO-MADRASAH PLESK HOSTING CONFIGURATION (.htaccess)
# ====================================================================
DirectoryIndex index.html index.php

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{HTTPS} !=on
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # SPA Routing: Send all non-file/dir requests to index.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>

<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_mime.c>
    AddType application/javascript .js
    AddType text/css .css
    AddType application/json .json
    AddType image/svg+xml .svg
    AddType font/woff2 .woff2
    AddDefaultCharset UTF-8
</IfModule>
`;

    // 2. Add dist files recursively into both root and httpdocs/
    const distPath = path.join(process.cwd(), 'dist');
    const httpdocs = zip.folder('httpdocs') || zip;

    // Add .htaccess & .user.ini
    zip.file('.htaccess', htaccess);
    httpdocs.file('.htaccess', htaccess);

    function addFolderToZip(dirPath: string, zipFolder: any, rootZipFolder: any, relativePath = '') {
      if (!fs.existsSync(dirPath)) return;
      const items = fs.readdirSync(dirPath);
      for (const item of items) {
        // Skip server-only bundles in public web root
        if (item === 'server.cjs' || item === 'server.cjs.map') continue;

        const fullPath = path.join(dirPath, item);
        const rel = relativePath ? `${relativePath}/${item}` : item;
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          const subZip = zipFolder.folder(item);
          const subRootZip = rootZipFolder.folder(item);
          addFolderToZip(fullPath, subZip, subRootZip, rel);
        } else {
          const content = fs.readFileSync(fullPath);
          zipFolder.file(item, content);
          rootZipFolder.file(item, content);
        }
      }
    }

    if (fs.existsSync(distPath)) {
      addFolderToZip(distPath, httpdocs, zip, '');
    }

    // Embed live database snapshot
    const dataSnapshot = {
      profile: profile || {},
      teachers: teachers || [],
      students: students || [],
      rombels: rombels || [],
      documents: documents || [],
      logs: logs || [],
      exportedAt: new Date().toISOString(),
      system: 'AutoMadrasah Full React SPA',
    };
    const jsonStr = JSON.stringify(dataSnapshot, null, 2);
    zip.file('madrasah-data.json', jsonStr);
    httpdocs.file('madrasah-data.json', jsonStr);

    // Initial state injector for offline bootstrap
    const stateBootstrapScript = `
window.__INITIAL_MADRASAH_DATA__ = ${JSON.stringify(dataSnapshot)};
if (!localStorage.getItem('MADRASAH_PROFILE') && window.__INITIAL_MADRASAH_DATA__) {
  try {
    localStorage.setItem('MADRASAH_PROFILE', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.profile));
    localStorage.setItem('MADRASAH_TEACHERS', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.teachers));
    localStorage.setItem('MADRASAH_STUDENTS', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.students));
    localStorage.setItem('MADRASAH_ROMBELS', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.rombels));
    localStorage.setItem('MADRASAH_DOCUMENTS', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.documents));
  } catch(e) {}
}
`;
    zip.file('data-init.js', stateBootstrapScript);
    httpdocs.file('data-init.js', stateBootstrapScript);

    // PHP Entry point fallback
    const indexPhp = `<?php
if (file_exists(__DIR__ . '/index.html')) {
    include __DIR__ . '/index.html';
} elseif (file_exists(__DIR__ . '/httpdocs/index.html')) {
    include __DIR__ . '/httpdocs/index.html';
} else {
    echo "<h1>AutoMadrasah</h1><p>index.html not found.</p>";
}
?>`;
    zip.file('index.php', indexPhp);
    httpdocs.file('index.php', indexPhp);

    const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=PLESK_AUTOMA_FULL_APP.zip');
    res.send(buffer);
  } catch (error: any) {
    console.error('Error generating plesk bundle:', error);
    res.status(500).json({ error: error.message || 'Gagal membuat paket Plesk' });
  }
});

// Full Production cPanel & MySQL Auto-Sync ZIP Exporter (Includes Full React Web App + MySQL PHP REST API)
app.post('/api/export/cpanel-bundle', async (req, res) => {
  try {
    const {
      profile = {},
      documents = [],
      teachers = [],
      students = [],
      rombels = [],
      logs = [],
      dbName = 'masbagoes_dokmadrasah',
      dbUser = 'masbagoes_dokmadrasah',
      dbPass = 'masbagus15',
      dbHost = 'localhost',
      domainName = profile.website?.replace(/^https?:\/\//, '') || 'dok-madrasah.masbagoes.web.id',
    } = req.body || {};

    const zip = new JSZip();
    const publicHtml = zip.folder('public_html') || zip;
    const apiFolder = publicHtml.folder('api') || publicHtml;
    const rootApiFolder = zip.folder('api') || zip;

    const addUniversalFile = (filename: string, content: string | Buffer | Uint8Array) => {
      zip.file(filename, content);
      publicHtml.file(filename, content);
    };

    const addUniversalApiFile = (filename: string, content: string | Buffer | Uint8Array) => {
      rootApiFolder.file(filename, content);
      apiFolder.file(filename, content);
    };

    // 1. .htaccess for cPanel Apache / LiteSpeed (SPA routing + /api/ pass-through)
    const htaccess = `# ====================================================================
# AUTOMADRASAH CPANEL HOSTING & MYSQL SYNC CONFIGURATION (.htaccess)
# Kompatibel dengan Apache 2.4+ / LiteSpeed Web Server pada cPanel
# Satuan Pendidikan: ${profile.namaMadrasah || 'MI Ma\'arif NU 2 Sanggreman'} (NSM: ${profile.nsm || '111233020015'})
# ====================================================================

# 1. DIRECTORY INDEX PRIORITY
DirectoryIndex index.html index.php

# 2. ENFORCE HTTPS REDIRECTION (AutoSSL / Let's Encrypt)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Paksa protokol aman HTTPS
    RewriteCond %{HTTPS} !=on
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # JANGAN rewrite request ke folder /api/ atau berkas PHP fisik
    RewriteCond %{REQUEST_URI} ^/api/ [NC]
    RewriteRule ^ - [L]

    # Berikan akses langsung jika file atau folder fisik nyata ada
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # SINGLE PAGE APPLICATION (SPA) ROUTING: Arahkan route lain ke index.html
    RewriteRule ^ index.html [QSA,L]
</IfModule>

# 3. CORS & SECURITY HEADERS FOR REST SYNC
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With, X-AutoMadrasah-Sync"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# 4. GZIP COMPRESSION
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json image/svg+xml
</IfModule>

# 5. MIME TYPES
<IfModule mod_mime.c>
    AddType application/javascript .js
    AddType text/css .css
    AddType application/json .json
    AddType image/svg+xml .svg
    AddType font/woff2 .woff2
    AddDefaultCharset UTF-8
</IfModule>
`;
    addUniversalFile('.htaccess', htaccess);

    // 2. config.php (MySQL Credentials)
    const configPhp = `<?php
/**
 * ====================================================================
 * AUTOMADRASAH - KONFIGURASI DATABASE MYSQL CPANEL & PLESK
 * Satuan Pendidikan: ${profile.namaMadrasah || 'MI Ma\'arif NU 2 Sanggreman'} (NSM: ${profile.nsm || '111233020015'} | NPSN: ${profile.npsn || '60710459'})
 * Sesuai Standar KMA 450 Tahun 2024 & Kurikulum Madrasah Kemenag RI
 * ====================================================================
 */

// Kredensial Koneksi Database MySQL cPanel
define('DB_HOST', '${dbHost}');
define('DB_NAME', '${dbName}');
define('DB_USER', '${dbUser}');
define('DB_PASS', '${dbPass}');
define('DB_CHARSET', 'utf8mb4');

// Konfigurasi Aplikasi & Keamanan Sinkronisasi
define('APP_NAME', 'AutoMadrasah Kemenag RI');
define('APP_VERSION', '1.0.0');
define('MADRASAH_NSM', '${profile.nsm || '111233020015'}');
define('TIMEZONE', 'Asia/Jakarta');

date_default_timezone_set(TIMEZONE);
?>`;
    addUniversalFile('config.php', configPhp);

    // 3. api/db.php (PDO Connection & Auto Migration)
    const dbPhp = `<?php
/**
 * AutoMadrasah - Konektor Database PDO MySQL & Auto Migration
 * Terhubung ke: ${dbName} dengan pengguna: ${dbUser}
 */
require_once __DIR__ . '/../config.php';

function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        initTablesIfNotExist($pdo);
        return $pdo;
    } catch (PDOException $e) {
        try {
            $dsnRoot = "mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET;
            $pdoRoot = new PDO($dsnRoot, DB_USER, DB_PASS, $options);
            $pdoRoot->exec("CREATE DATABASE IF NOT EXISTS \`" . DB_NAME . "\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
            $pdoRoot->exec("USE \`" . DB_NAME . "\`;");
            initTablesIfNotExist($pdoRoot);
            $pdo = $pdoRoot;
            return $pdo;
        } catch (Exception $inner) {
            header('Content-Type: application/json; charset=utf-8', true, 500);
            echo json_encode([
                'success' => false,
                'error'   => 'Gagal terhubung ke database MySQL cPanel',
                'message' => $e->getMessage(),
                'target_database' => DB_NAME,
                'target_user'     => DB_USER,
                'petunjuk' => 'Pastikan di menu cPanel "MySQL Databases", database [' . DB_NAME . '] dan user [' . DB_USER . '] sudah dibuat dan diberi ALL PRIVILEGES.'
            ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
}

function initTablesIfNotExist(PDO $pdo) {
    // 1. Profil Madrasah
    $pdo->exec("CREATE TABLE IF NOT EXISTS \`madrasah_profil\` (
        \`id\` varchar(50) NOT NULL DEFAULT 'madrasah_active',
        \`nsm\` varchar(30) NOT NULL,
        \`npsn\` varchar(20) NOT NULL,
        \`nama_madrasah\` varchar(200) NOT NULL,
        \`jenjang\` varchar(10) NOT NULL,
        \`status\` varchar(20) NOT NULL,
        \`akreditasi\` varchar(20) DEFAULT 'A',
        \`alamat\` text NOT NULL,
        \`desa_kelurahan\` varchar(100) DEFAULT NULL,
        \`kecamatan\` varchar(100) DEFAULT NULL,
        \`kabupaten_kota\` varchar(100) DEFAULT NULL,
        \`provinsi\` varchar(100) DEFAULT NULL,
        \`kode_pos\` varchar(10) DEFAULT NULL,
        \`telepon\` varchar(50) DEFAULT NULL,
        \`email\` varchar(100) DEFAULT NULL,
        \`website\` varchar(150) DEFAULT NULL,
        \`nama_kepala\` varchar(150) NOT NULL,
        \`nip_kepala\` varchar(30) DEFAULT NULL,
        \`pangkat_gol_kepala\` varchar(50) DEFAULT NULL,
        \`nama_ketua_komite\` varchar(150) DEFAULT NULL,
        \`nama_pengawas\` varchar(150) DEFAULT NULL,
        \`nip_pengawas\` varchar(30) DEFAULT NULL,
        \`tahun_ajaran\` varchar(20) NOT NULL,
        \`semester\` varchar(10) NOT NULL,
        \`titimangsa\` varchar(100) DEFAULT NULL,
        \`raw_data\` longtext DEFAULT NULL,
        \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 2. Guru & GTK
    $pdo->exec("CREATE TABLE IF NOT EXISTS \`guru_gtk\` (
        \`id\` varchar(50) NOT NULL,
        \`nip\` varchar(30) DEFAULT NULL,
        \`nuptk\` varchar(30) DEFAULT NULL,
        \`peg_id\` varchar(30) DEFAULT NULL,
        \`nama\` varchar(150) NOT NULL,
        \`gelar_depan\` varchar(30) DEFAULT NULL,
        \`gelar_belakang\` varchar(50) DEFAULT NULL,
        \`jenis_kelamin\` enum('L','P') NOT NULL DEFAULT 'L',
        \`tempat_lahir\` varchar(100) DEFAULT NULL,
        \`tanggal_lahir\` varchar(30) DEFAULT NULL,
        \`status_kepegawaian\` varchar(50) NOT NULL,
        \`pangkat_gol\` varchar(50) DEFAULT NULL,
        \`jabatan_utama\` varchar(100) NOT NULL,
        \`tugas_tambahan\` varchar(100) DEFAULT NULL,
        \`mapel_utama\` varchar(100) NOT NULL,
        \`jumlah_jam\` int(11) NOT NULL DEFAULT 0,
        \`wali_kelas_di\` varchar(50) DEFAULT NULL,
        \`sertifikasi\` tinyint(1) NOT NULL DEFAULT 0,
        \`email\` varchar(100) DEFAULT NULL,
        \`telepon\` varchar(30) DEFAULT NULL,
        \`is_active\` tinyint(1) NOT NULL DEFAULT 1,
        \`signature_url\` text DEFAULT NULL,
        \`raw_data\` longtext DEFAULT NULL,
        \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY \`idx_nip\` (\`nip\`),
        KEY \`idx_nuptk\` (\`nuptk\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 3. Siswa
    $pdo->exec("CREATE TABLE IF NOT EXISTS \`siswa\` (
        \`id\` varchar(50) NOT NULL,
        \`nisn\` varchar(20) DEFAULT NULL,
        \`nis\` varchar(30) NOT NULL,
        \`nik\` varchar(30) DEFAULT NULL,
        \`nama\` varchar(150) NOT NULL,
        \`jenis_kelamin\` enum('L','P') NOT NULL DEFAULT 'L',
        \`rombel\` varchar(50) NOT NULL,
        \`tingkat\` int(11) NOT NULL DEFAULT 1,
        \`tempat_lahir\` varchar(100) DEFAULT NULL,
        \`tanggal_lahir\` varchar(30) DEFAULT NULL,
        \`nama_ayah\` varchar(100) DEFAULT NULL,
        \`nama_ibu\` varchar(100) DEFAULT NULL,
        \`pekerjaan_ortu\` varchar(100) DEFAULT NULL,
        \`alamat\` text DEFAULT NULL,
        \`status_siswa\` varchar(30) DEFAULT 'Aktif',
        \`raw_data\` longtext DEFAULT NULL,
        \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY \`idx_nisn\` (\`nisn\`),
        KEY \`idx_nis\` (\`nis\`),
        KEY \`idx_rombel\` (\`rombel\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 4. Rombel
    $pdo->exec("CREATE TABLE IF NOT EXISTS \`rombel\` (
        \`id\` varchar(50) NOT NULL,
        \`nama_rombel\` varchar(50) NOT NULL,
        \`tingkat\` int(11) NOT NULL DEFAULT 1,
        \`wali_kelas_id\` varchar(50) DEFAULT NULL,
        \`jumlah_siswa\` int(11) NOT NULL DEFAULT 0,
        PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 5. Dokumen Resmi & SK
    $pdo->exec("CREATE TABLE IF NOT EXISTS \`dokumen_resmi\` (
        \`id\` varchar(50) NOT NULL,
        \`document_type\` varchar(50) NOT NULL,
        \`nomor_surat\` varchar(100) NOT NULL,
        \`judul\` varchar(255) NOT NULL,
        \`tahun_ajaran\` varchar(20) NOT NULL,
        \`tanggal_terbit\` varchar(50) NOT NULL,
        \`status\` varchar(30) NOT NULL DEFAULT 'DRAFT',
        \`qr_code_hash\` varchar(150) DEFAULT NULL,
        \`signer_name\` varchar(150) NOT NULL,
        \`signer_nip\` varchar(50) DEFAULT NULL,
        \`signer_role\` varchar(100) DEFAULT NULL,
        \`content_json\` longtext NOT NULL,
        \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY \`idx_doc_type\` (\`document_type\`),
        KEY \`idx_nomor\` (\`nomor_surat\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 6. Activity Logs
    $pdo->exec("CREATE TABLE IF NOT EXISTS \`activity_logs\` (
        \`id\` int(11) NOT NULL AUTO_INCREMENT,
        \`action\` text NOT NULL,
        \`user\` varchar(100) NOT NULL DEFAULT 'Admin Madrasah',
        \`category\` varchar(50) NOT NULL DEFAULT 'SYNC',
        \`timestamp_str\` varchar(100) NOT NULL,
        \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 7. Status Sinkronisasi
    $pdo->exec("CREATE TABLE IF NOT EXISTS \`sync_status\` (
        \`id\` int(11) NOT NULL DEFAULT 1,
        \`last_sync_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`teachers_count\` int(11) DEFAULT 0,
        \`students_count\` int(11) DEFAULT 0,
        \`documents_count\` int(11) DEFAULT 0,
        \`payload_hash\` varchar(64) DEFAULT NULL,
        \`client_ip\` varchar(50) DEFAULT NULL,
        PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
}
?>`;
    addUniversalApiFile('db.php', dbPhp);

    // 4. api/sync.php (Bidirectional Sync API with CORS)
    const syncPhp = `<?php
/**
 * AutoMadrasah - Endpoint Sinkronisasi Otomatis MySQL
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-AutoMadrasah-Sync");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getDbConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (!$rawInput) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Data payload kosong.']);
        exit;
    }

    $payload = json_decode($rawInput, true);
    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Format JSON tidak valid.']);
        exit;
    }

    $profileData   = $payload['profile'] ?? [];
    $teachersList  = $payload['teachers'] ?? [];
    $studentsList  = $payload['students'] ?? [];
    $rombelsList   = $payload['rombels'] ?? [];
    $documentsList = $payload['documents'] ?? [];
    $logsList      = $payload['logs'] ?? [];

    try {
        $pdo->beginTransaction();

        if (!empty($profileData['namaMadrasah'])) {
            $stmt = $pdo->prepare("REPLACE INTO \`madrasah_profil\` (
                \`id\`, \`nsm\`, \`npsn\`, \`nama_madrasah\`, \`jenjang\`, \`status\`, \`akreditasi\`,
                \`alamat\`, \`desa_kelurahan\`, \`kecamatan\`, \`kabupaten_kota\`, \`provinsi\`, \`kode_pos\`,
                \`telepon\`, \`email\`, \`website\`, \`nama_kepala\`, \`nip_kepala\`, \`pangkat_gol_kepala\`,
                \`nama_ketua_komite\`, \`nama_pengawas\`, \`nip_pengawas\`, \`tahun_ajaran\`, \`semester\`, \`titimangsa\`, \`raw_data\`
            ) VALUES (
                'madrasah_active', :nsm, :npsn, :nama, :jenjang, :status, :akreditasi,
                :alamat, :desa, :kecamatan, :kabupaten, :provinsi, :kode_pos,
                :telepon, :email, :website, :nama_kepala, :nip_kepala, :pangkat_kepala,
                :komite, :pengawas, :nip_pengawas, :tahun_ajaran, :semester, :titimangsa, :raw_data
            )");
            $stmt->execute([
                ':nsm'            => $profileData['nsm'] ?? '',
                ':npsn'           => $profileData['npsn'] ?? '',
                ':nama'           => $profileData['namaMadrasah'] ?? '',
                ':jenjang'        => $profileData['jenjang'] ?? 'MI',
                ':status'         => $profileData['status'] ?? 'Swasta',
                ':akreditasi'     => $profileData['akreditasi'] ?? 'A',
                ':alamat'         => $profileData['alamatJalan'] ?? '',
                ':desa'           => $profileData['desaKelurahan'] ?? '',
                ':kecamatan'      => $profileData['kecamatan'] ?? '',
                ':kabupaten'      => $profileData['kabupatenKota'] ?? '',
                ':provinsi'       => $profileData['provinsi'] ?? '',
                ':kode_pos'       => $profileData['kodePos'] ?? '',
                ':telepon'        => $profileData['telepon'] ?? '',
                ':email'          => $profileData['email'] ?? '',
                ':website'        => $profileData['website'] ?? '',
                ':nama_kepala'    => $profileData['namaKepala'] ?? '',
                ':nip_kepala'     => $profileData['nipKepala'] ?? '',
                ':pangkat_kepala' => $profileData['pangkatGolKepala'] ?? '',
                ':komite'         => $profileData['namaKetuaKomite'] ?? '',
                ':pengawas'       => $profileData['namaPengawas'] ?? '',
                ':nip_pengawas'   => $profileData['nipPengawas'] ?? '',
                ':tahun_ajaran'   => $profileData['tahunAjaran'] ?? '2025/2026',
                ':semester'       => $profileData['semester'] ?? '1',
                ':titimangsa'     => $profileData['titimangsa'] ?? 'Banyumas',
                ':raw_data'       => json_encode($profileData, JSON_UNESCAPED_UNICODE),
            ]);
        }

        if (is_array($teachersList) && count($teachersList) > 0) {
            $stmtG = $pdo->prepare("REPLACE INTO \`guru_gtk\` (
                \`id\`, \`nip\`, \`nuptk\`, \`peg_id\`, \`nama\`, \`gelar_depan\`, \`gelar_belakang\`,
                \`jenis_kelamin\`, \`tempat_lahir\`, \`tanggal_lahir\`, \`status_kepegawaian\`, \`pangkat_gol\`,
                \`jabatan_utama\`, \`tugas_tambahan\`, \`mapel_utama\`, \`jumlah_jam\`, \`wali_kelas_di\`,
                \`sertifikasi\`, \`email\`, \`telepon\`, \`is_active\`, \`signature_url\`, \`raw_data\`
            ) VALUES (
                :id, :nip, :nuptk, :peg_id, :nama, :gelar_depan, :gelar_belakang,
                :jk, :tempat_lahir, :tanggal_lahir, :status, :pangkat,
                :jabatan, :tugas_tambahan, :mapel, :jam, :wali,
                :sertifikasi, :email, :telepon, :active, :sig, :raw
            )");

            foreach ($teachersList as $g) {
                if (empty($g['nama'])) continue;
                $stmtG->execute([
                    ':id'             => $g['id'] ?? ('G-' . uniqid()),
                    ':nip'            => $g['nip'] ?? '',
                    ':nuptk'          => $g['nuptk'] ?? '',
                    ':peg_id'         => $g['pegId'] ?? '',
                    ':nama'           => $g['nama'] ?? '',
                    ':gelar_depan'    => $g['gelarDepan'] ?? '',
                    ':gelar_belakang' => $g['gelarBelakang'] ?? '',
                    ':jk'             => ($g['jenisKelamin'] === 'P') ? 'P' : 'L',
                    ':tempat_lahir'   => $g['tempatLahir'] ?? '',
                    ':tanggal_lahir'  => $g['tanggalLahir'] ?? '',
                    ':status'         => $g['statusKepegawaian'] ?? 'GTY',
                    ':pangkat'        => $g['pangkatGol'] ?? '',
                    ':jabatan'        => $g['jabatanUtama'] ?? 'Guru Kelas',
                    ':tugas_tambahan' => $g['tugasTambahan'] ?? '',
                    ':mapel'          => $g['mapelUtama'] ?? '',
                    ':jam'            => intval($g['jumlahJam'] ?? 24),
                    ':wali'           => $g['waliKelasDi'] ?? '',
                    ':sertifikasi'    => !empty($g['sertifikasi']) ? 1 : 0,
                    ':email'          => $g['email'] ?? '',
                    ':telepon'        => $g['telepon'] ?? '',
                    ':active'         => isset($g['isActive']) ? ($g['isActive'] ? 1 : 0) : 1,
                    ':sig'            => $g['signatureUrl'] ?? '',
                    ':raw'            => json_encode($g, JSON_UNESCAPED_UNICODE),
                ]);
            }
        }

        if (is_array($studentsList) && count($studentsList) > 0) {
            $stmtS = $pdo->prepare("REPLACE INTO \`siswa\` (
                \`id\`, \`nisn\`, \`nis\`, \`nik\`, \`nama\`, \`jenis_kelamin\`, \`rombel\`, \`tingkat\`,
                \`tempat_lahir\`, \`tanggal_lahir\`, \`nama_ayah\`, \`nama_ibu\`, \`pekerjaan_ortu\`,
                \`alamat\`, \`status_siswa\`, \`raw_data\`
            ) VALUES (
                :id, :nisn, :nis, :nik, :nama, :jk, :rombel, :tingkat,
                :tempat_lahir, :tanggal_lahir, :ayah, :ibu, :pekerjaan,
                :alamat, :status, :raw
            )");

            foreach ($studentsList as $s) {
                if (empty($s['nama'])) continue;
                $stmtS->execute([
                    ':id'            => $s['id'] ?? ('S-' . uniqid()),
                    ':nisn'          => $s['nisn'] ?? '',
                    ':nis'           => $s['nis'] ?? '',
                    ':nik'           => $s['nik'] ?? '',
                    ':nama'          => $s['nama'] ?? '',
                    ':jk'            => ($s['jenisKelamin'] === 'P') ? 'P' : 'L',
                    ':rombel'        => $s['rombel'] ?? 'Kelas 1',
                    ':tingkat'       => intval($s['tingkat'] ?? 1),
                    ':tempat_lahir'  => $s['tempatLahir'] ?? '',
                    ':tanggal_lahir' => $s['tanggalLahir'] ?? '',
                    ':ayah'          => $s['namaAyah'] ?? '',
                    ':ibu'           => $s['namaIbu'] ?? '',
                    ':pekerjaan'     => $s['pekerjaanOrtu'] ?? '',
                    ':alamat'        => $s['alamat'] ?? '',
                    ':status'        => $s['statusSiswa'] ?? 'Aktif',
                    ':raw'           => json_encode($s, JSON_UNESCAPED_UNICODE),
                ]);
            }
        }

        if (is_array($documentsList) && count($documentsList) > 0) {
            $stmtD = $pdo->prepare("REPLACE INTO \`dokumen_resmi\` (
                \`id\`, \`document_type\`, \`nomor_surat\`, \`judul\`, \`tahun_ajaran\`, \`tanggal_terbit\`,
                \`status\`, \`qr_code_hash\`, \`signer_name\`, \`signer_nip\`, \`signer_role\`, \`content_json\`
            ) VALUES (
                :id, :doc_type, :nomor, :judul, :tahun, :tanggal,
                :status, :hash, :signer_name, :signer_nip, :signer_role, :content
            )");

            foreach ($documentsList as $d) {
                if (empty($d['id'])) continue;
                $stmtD->execute([
                    ':id'          => $d['id'],
                    ':doc_type'    => $d['type'] ?? 'KOM',
                    ':nomor'       => $d['documentNumber'] ?? '-',
                    ':judul'       => $d['title'] ?? 'Dokumen Resmi',
                    ':tahun'       => $d['academicYear'] ?? '2025/2026',
                    ':tanggal'     => $d['effectiveDate'] ?? date('Y-m-d'),
                    ':status'      => $d['status'] ?? 'DRAFT',
                    ':hash'        => $d['signatures']?.[0]?.['digitalHash'] ?? null,
                    ':signer_name' => $d['signatures']?.[0]?.['name'] ?? 'Kepala Madrasah',
                    ':signer_nip'  => $d['signatures']?.[0]?.['nip'] ?? '',
                    ':signer_role' => $d['signatures']?.[0]?.['role'] ?? 'Kepala Madrasah',
                    ':content'     => json_encode($d, JSON_UNESCAPED_UNICODE),
                ]);
            }
        }

        // Update sync status
        $pdo->prepare("REPLACE INTO \`sync_status\` (\`id\`, \`last_sync_at\`, \`teachers_count\`, \`students_count\`, \`documents_count\`, \`client_ip\`)
                       VALUES (1, NOW(), :tc, :sc, :dc, :ip)")
            ->execute([
                ':tc' => count($teachersList),
                ':sc' => count($studentsList),
                ':dc' => count($documentsList),
                ':ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
            ]);

        $pdo->commit();

        echo json_encode([
            'success' => true,
            'message' => 'Sinkronisasi berhasil! ' . count($teachersList) . ' guru, ' . count($studentsList) . ' siswa, dan ' . count($documentsList) . ' dokumen tersimpan di MySQL cPanel.',
            'timestamp' => date('Y-m-d H:i:s T'),
        ]);
        exit;
    } catch (Exception $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Gagal simpan ke MySQL: ' . $e->getMessage()]);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmtProfile = $pdo->query("SELECT * FROM \`madrasah_profil\` WHERE \`id\` = 'madrasah_active' LIMIT 1");
        $dbProfile = $stmtProfile->fetch();

        $stmtTeachers = $pdo->query("SELECT * FROM \`guru_gtk\` ORDER BY \`nama\` ASC");
        $dbTeachers = [];
        while ($row = $stmtTeachers->fetch()) {
            $dbTeachers[] = !empty($row['raw_data']) ? json_decode($row['raw_data'], true) : $row;
        }

        $stmtStudents = $pdo->query("SELECT * FROM \`siswa\` ORDER BY \`nama\` ASC");
        $dbStudents = [];
        while ($row = $stmtStudents->fetch()) {
            $dbStudents[] = !empty($row['raw_data']) ? json_decode($row['raw_data'], true) : $row;
        }

        $stmtDocs = $pdo->query("SELECT * FROM \`dokumen_resmi\` ORDER BY \`updated_at\` DESC");
        $dbDocs = [];
        while ($row = $stmtDocs->fetch()) {
            $dbDocs[] = !empty($row['content_json']) ? json_decode($row['content_json'], true) : $row;
        }

        echo json_encode([
            'success'   => true,
            'database'  => DB_NAME,
            'profile'   => $dbProfile ? (!empty($dbProfile['raw_data']) ? json_decode($dbProfile['raw_data'], true) : $dbProfile) : null,
            'teachers'  => $dbTeachers,
            'students'  => $dbStudents,
            'documents' => $dbDocs,
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Gagal baca dari MySQL: ' . $e->getMessage()]);
        exit;
    }
}
?>`;
    addUniversalApiFile('sync.php', syncPhp);

    // 5. api/health.php (Diagnostic JSON)
    const healthPhp = `<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . '/db.php';

try {
    $pdo = getDbConnection();
    $tables = ['madrasah_profil', 'guru_gtk', 'siswa', 'rombel', 'dokumen_resmi', 'activity_logs', 'sync_status'];
    $counts = [];

    foreach ($tables as $tbl) {
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM \`$tbl\`");
            $res = $stmt->fetch();
            $counts[$tbl] = intval($res['cnt'] ?? 0);
        } catch (Exception $e) {
            $counts[$tbl] = 0;
        }
    }

    echo json_encode([
        'status'        => 'connected',
        'success'       => true,
        'message'       => 'Koneksi ke database MySQL cPanel [' . DB_NAME . '] berhasil aktif!',
        'database'      => DB_NAME,
        'user'          => DB_USER,
        'host'          => DB_HOST,
        'php_version'   => phpversion(),
        'server_time'   => date('Y-m-d H:i:s T'),
        'table_counts'  => $counts,
        'app_url'       => (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]/",
        'sync_endpoint' => (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]" . dirname($_SERVER['REQUEST_URI']) . "/sync.php",
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status'   => 'disconnected',
        'success'  => false,
        'message'  => 'Gagal menghubungi MySQL: ' . $e->getMessage(),
        'database' => DB_NAME,
        'user'     => DB_USER,
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
?>`;
    addUniversalApiFile('health.php', healthPhp);

    // 6. api/test.php (Visual HTML test page)
    const testPhp = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Tes Koneksi MySQL cPanel - AutoMadrasah</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 p-6 text-slate-800">
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <div class="flex items-center space-x-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">AM</div>
      <div>
        <h1 class="font-bold text-lg text-slate-900">Uji Koneksi MySQL cPanel AutoMadrasah</h1>
        <p class="text-xs text-slate-500">Database: <code class="text-emerald-700 font-bold">${dbName}</code> | User: <code class="text-emerald-700 font-bold">${dbUser}</code></p>
      </div>
    </div>
    <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-4 text-xs space-y-2">
      <?php
      require_once __DIR__ . '/db.php';
      try {
          $pdo = getDbConnection();
          echo '<p class="text-emerald-700 font-bold">✓ Berhasil terhubung ke database [' . DB_NAME . '] di host [' . DB_HOST . ']!</p>';
          $stmt = $pdo->query("SHOW TABLES");
          $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
          echo '<p class="text-slate-600">Tabel aktif: ' . implode(', ', $tables) . '</p>';
      } catch (Exception $e) {
          echo '<p class="text-rose-600 font-bold">✗ Gagal: ' . htmlspecialchars($e->getMessage()) . '</p>';
      }
      ?>
    </div>
    <div class="text-xs text-slate-500 border-t pt-3 flex justify-between items-center">
      <span>AutoMadrasah Kemenag RI</span>
      <a href="../" class="text-emerald-700 font-bold hover:underline">Buka Aplikasi AutoMadrasah &rarr;</a>
    </div>
  </div>
</body>
</html>`;
    addUniversalApiFile('test.php', testPhp);

    // 7. api/status.php (The diagnostic overview card)
    const statusPhp = `<?php
require_once __DIR__ . '/db.php';
$connOk = false;
$msg = '';
$counts = ['guru' => 0, 'siswa' => 0, 'dokumen' => 0];
try {
    $pdo = getDbConnection();
    $connOk = true;
    $counts['guru'] = $pdo->query("SELECT COUNT(*) FROM \`guru_gtk\`")->fetchColumn();
    $counts['siswa'] = $pdo->query("SELECT COUNT(*) FROM \`siswa\`")->fetchColumn();
    $counts['dokumen'] = $pdo->query("SELECT COUNT(*) FROM \`dokumen_resmi\`")->fetchColumn();
} catch (Exception $e) {
    $msg = $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Status API & Sinkronisasi MySQL - AutoMadrasah</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col p-4 sm:p-8">
  <div class="max-w-4xl mx-auto w-full space-y-6">
    <header class="bg-emerald-950 text-white p-5 rounded-2xl flex items-center justify-between shadow-lg">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center font-bold text-emerald-300">AM</div>
        <div>
          <h1 class="font-bold text-base leading-tight">${profile.namaMadrasah || 'MI Ma\'arif NU 2 Sanggreman'}</h1>
          <p class="text-xs text-emerald-300">Portal API & Sinkronisasi Database MySQL</p>
        </div>
      </div>
      <a href="../" class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all">
        Buka Aplikasi Web &rarr;
      </a>
    </header>

    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 class="text-lg font-bold text-slate-900">Status Koneksi MySQL cPanel</h2>
          <p class="text-xs text-slate-500">Database: <code class="font-bold text-emerald-700">${dbName}</code> | Host: <code class="font-bold text-emerald-700">${dbHost}</code></p>
        </div>
        <span class="px-3 py-1 text-xs font-bold rounded-full inline-flex items-center gap-1.5 <?= $connOk ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800' ?>">
          <span class="w-2 h-2 rounded-full <?= $connOk ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500' ?>"></span>
          <?= $connOk ? 'MySQL Tersambung' : 'MySQL Terputus' ?>
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <p class="text-xs font-medium text-emerald-700">Dokumen Resmi</p>
          <p class="text-2xl font-black text-emerald-950 mt-1"><?= $counts['dokumen'] ?></p>
          <p class="text-[11px] text-emerald-600 mt-0.5">Tabel \`dokumen_resmi\`</p>
        </div>
        <div class="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p class="text-xs font-medium text-blue-700">Guru & GTK</p>
          <p class="text-2xl font-black text-blue-950 mt-1"><?= $counts['guru'] ?></p>
          <p class="text-[11px] text-blue-600 mt-0.5">Tabel \`guru_gtk\`</p>
        </div>
        <div class="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p class="text-xs font-medium text-amber-700">Peserta Didik</p>
          <p class="text-2xl font-black text-amber-950 mt-1"><?= $counts['siswa'] ?></p>
          <p class="text-[11px] text-amber-600 mt-0.5">Tabel \`siswa\`</p>
        </div>
      </div>

      <div class="space-y-2 text-xs">
        <p class="font-bold text-slate-800">Endpoint REST API:</p>
        <div class="p-3 bg-slate-50 rounded-xl font-mono text-[11px] space-y-1 text-slate-700">
          <p><span class="text-emerald-700 font-bold">POST</span> /api/sync.php &rarr; Simpan data dari aplikasi ke MySQL</p>
          <p><span class="text-blue-700 font-bold">GET</span> /api/sync.php &rarr; Ambil snapshot data dari MySQL</p>
          <p><span class="text-purple-700 font-bold">GET</span> /api/health.php &rarr; Cek status koneksi JSON</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
    addUniversalApiFile('status.php', statusPhp);

    // 8. Snapshot data JSON & database.sql
    const dataSnapshot = {
      profile,
      teachers,
      students,
      rombels,
      documents,
      logs,
      exportedAt: new Date().toISOString(),
      system: 'AutoMadrasah Full React Web Application',
    };
    const jsonStr = JSON.stringify(dataSnapshot, null, 2);
    addUniversalFile('madrasah-data.json', jsonStr);

    const fullSql = generateMadrasahSqlDump({
      profile,
      teachers,
      students,
      rombels,
      documents,
      logs,
      dbDialect: 'MYSQL',
      dbName,
    });
    addUniversalFile('database.sql', fullSql);

    // 9. Initial state injector for browser localStorage bootstrap
    const stateBootstrapScript = `
window.__INITIAL_MADRASAH_DATA__ = ${JSON.stringify(dataSnapshot)};
(function() {
  try {
    if (!localStorage.getItem('MADRASAH_PROFILE') && window.__INITIAL_MADRASAH_DATA__) {
      localStorage.setItem('MADRASAH_PROFILE', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.profile));
      localStorage.setItem('MADRASAH_TEACHERS', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.teachers));
      localStorage.setItem('MADRASAH_STUDENTS', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.students));
      localStorage.setItem('MADRASAH_ROMBELS', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.rombels));
      localStorage.setItem('MADRASAH_DOCUMENTS', JSON.stringify(window.__INITIAL_MADRASAH_DATA__.documents));
    }
  } catch(e) {}
})();
`;
    addUniversalFile('data-init.js', stateBootstrapScript);

    // 10. Copy compiled React Single Page App files from dist/
    const distPath = path.join(process.cwd(), 'dist');

    function addDistFolderToZip(dirPath: string, relativePath = '') {
      if (!fs.existsSync(dirPath)) return;
      const items = fs.readdirSync(dirPath);
      for (const item of items) {
        if (item === 'server.cjs' || item === 'server.cjs.map') continue;

        const fullPath = path.join(dirPath, item);
        const rel = relativePath ? `${relativePath}/${item}` : item;
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          addDistFolderToZip(fullPath, rel);
        } else {
          if (item === 'index.html' && !relativePath) {
            // Inject data-init.js into index.html
            let htmlContent = fs.readFileSync(fullPath, 'utf8');
            if (!htmlContent.includes('data-init.js')) {
              htmlContent = htmlContent.replace('</head>', '  <script src="/data-init.js"></script>\n  </head>');
            }
            addUniversalFile('index.html', htmlContent);
          } else {
            const content = fs.readFileSync(fullPath);
            addUniversalFile(rel, content);
          }
        }
      }
    }

    if (fs.existsSync(distPath)) {
      addDistFolderToZip(distPath, '');
    }

    // 11. PHP index.php fallback
    const indexPhp = `<?php
/**
 * AutoMadrasah cPanel Web Router
 */
if (file_exists(__DIR__ . '/index.html')) {
    include __DIR__ . '/index.html';
} elseif (file_exists(__DIR__ . '/public_html/index.html')) {
    include __DIR__ . '/public_html/index.html';
} else {
    include __DIR__ . '/api/status.php';
}
?>`;
    addUniversalFile('index.php', indexPhp);

    // 12. Deployment Guide Markdown
    const deployGuide = `# PANDUAN PEMASANGAN LENGKAP AUTOMADRASAH PADA CPANEL HOSTING

Satuan Pendidikan: ${profile.namaMadrasah || 'MI Ma\'arif NU 2 Sanggreman'}
Domain: ${domainName}
Database: ${dbName} | User: ${dbUser}

---

## CARA PASANG (HANYA 2 LANGKAH):

1. **Upload & Ekstrak Berkas ke cPanel:**
   - Login ke cPanel hosting madrasah Anda (misal: https://${domainName}:2083).
   - Masuk ke menu **File Manager** -> Buka folder **\`public_html\`**.
   - Hapus atau kosongkan berkas lama jika ada.
   - Klik **Upload** -> Pilih file ZIP ini (\`AUTOMADRASAH_CPANEL_FULL_APP.zip\`).
   - Klik kanan file ZIP -> Pilih **Extract** ke \`public_html\`.

2. **Buat Database MySQL (Jika Belum Ada):**
   - Di cPanel, masuk ke menu **MySQL Databases**.
   - Buat database: \`${dbName}\`.
   - Buat user: \`${dbUser}\` (Password: \`${dbPass}\`).
   - Masukkan user ke database tersebut dan centang **ALL PRIVILEGES**.
   - (Opsional) Buka phpMyAdmin -> Pilih database \`${dbName}\` -> Import berkas \`database.sql\`.

3. **Selesai! Buka Domain Anda:**
   - Kunjungi \`https://${domainName}/\` di browser.
   - Aplikasi AutoMadrasah lengkap langsung aktif secara instan!
   - Untuk melihat status koneksi MySQL kapan saja, buka: \`https://${domainName}/api/status.php\` atau \`https://${domainName}/api/health.php\`.
`;
    addUniversalFile('CPANEL_DEPLOY_GUIDE.md', deployGuide);
    addUniversalFile('BACA_PANDUAN_CPANEL.txt', `Panduan pemasangan: Upload dan ekstrak file ZIP ini langsung ke dalam folder public_html di cPanel File Manager. Kunjungi domain Anda untuk membuka aplikasi AutoMadrasah.`);

    const buffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=AUTOMADRASAH_CPANEL_FULL_APP.zip`);
    res.send(buffer);
  } catch (error: any) {
    console.error('Error generating cpanel bundle:', error);
    res.status(500).json({ error: error.message || 'Gagal membuat paket cPanel' });
  }
});


// AI Document Generation Endpoint
app.post('/api/ai/generate-kom', async (req, res) => {
  try {
    const {
      madrasahName,
      jenjang,
      kepalaMadrasah,
      lokasi,
      karakteristik,
      visiMisi,
      fokusNilaiCinta,
      kurikulumVersion,
    } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key belum terkonfigurasi di Settings.',
      });
    }

    const prompt = `Anda adalah seorang Ahli Kurikulum dan Pengembang Kebijakan Pendidikan Islam di Kementerian Agama Republik Indonesia.
Buatkan draft BAB / Bagian Resmi Kurikulum Operasional Madrasah (KOM) Berbasis Cinta (KMA 450 Tahun 2024 / Kurikulum Merdeka) untuk:

Nama Madrasah: ${madrasahName || 'Madrasah Ibtidaiyah Negeri 1'}
Jenjang: ${jenjang || 'Madrasah Ibtidaiyah (MI)'}
Kepala Madrasah: ${kepalaMadrasah || 'H. Ahmad Syafii, M.Pd.I'}
Lokasi / Lingkungan: ${lokasi || 'Daerah semi-perkotaan religius dan dinamis'}
Karakteristik Satuan Pendidikan: ${karakteristik || 'Madrasah berbasis riset, tahfidz, dan berwawasan lingkungan'}
Visi & Misi: ${visiMisi || 'Mewujudkan generasi bertakwa, cerdas, berakhlak mulia, dan penuh kasih sayang'}
Fokus Nilai Madrasah Cinta: ${fokusNilaiCinta || 'Cinta Allah & Rasul, Cinta Sesama & Tanpa Kekerasan/Bullying, Cinta Ilmu, Cinta Lingkungan & Moderasi Beragama'}
Regulasi: KMA Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Madrasah

Tolong buatkan struktur dokumen KOM yang lengkap, mendalam, inspiratif, dan siap digunakan resmi dengan format JSON dengan key:
1. "analisisKarakteristik": Teks narasi analisis karakteristik peserta didik, guru/tenaga kependidikan, dan konteks sosial budaya madrasah ramah anak.
2. "visiMisiTujuan": Narasi visi, misi, dan tujuan jangka pendek & menengah yang mengintegrasikan nilai Madrasah Ramah Anak dan Berbasis Cinta (Pilar Mahabbah).
3. "pengorganisasianPembelajaran": Penjelasan struktur intrakurikuler (mapel PAI + Umum), Kokurikuler (P5RA - Projek Penguatan Profil Pelajar Pancasila & Rahmatan Lil Alamin dengan 10 nilai Rahmatan Lil Alamin), dan Ekstrakurikuler.
4. "perencanaanPembelajaran": Panduan Modul Ajar berdiferensiasi dan berakar cinta kasih guru ke siswa (Pedagogi Welas Asih).
5. "pendampinganEvaluasi": Mekanisme supervisi akademik, monitoring, dan evaluasi berkelanjutan kepala madrasah dan pengawas.
6. "ikrarMadrasahCinta": Naskah Deklarasi/Komitmen Bersama Madrasah Maju, Bermutu, Penuh Kasih Sayang.

Pastikan gaya bahasa sangat resmi, akademis, santun, sesuai tata laksana Kemenag RI. Berikan output murni JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = { rawContent: text };
    }

    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error generating KOM:', error);
    res.status(500).json({ error: error.message || 'Gagal generate KOM' });
  }
});

// AI SK Legal Consideration Generator
app.post('/api/ai/generate-sk-legal', async (req, res) => {
  try {
    const { jenisSK, tahunAjaran, nomorSK, namaMadrasah, jenjang, halKhusus } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key belum terkonfigurasi di Settings.',
      });
    }

    const prompt = `Buatkan bagian resmi konsiderans SK Kepala Madrasah Kemenag RI untuk:
Jenis SK: ${jenisSK || 'Surat Keputusan Pembagian Tugas Guru dan Beban Kerja'}
Tahun Pelajaran: ${tahunAjaran || '2025/2026'}
Nomor Surat: ${nomorSK || 'B-042/MI.01/PP.00.4/07/2025'}
Satuan Pendidikan: ${namaMadrasah || 'Madrasah'} (${jenjang || 'MI'})
Catatan Khusus: ${halKhusus || 'Sesuai KMA 450 Tahun 2024 dan regulasi beban kerja guru'}

Kembalikan format JSON dengan key:
- "menimbang": Array of string poin pertimbangan (a, b, c, dst)
- "mengingat": Array of string dasar hukum resmi (UU Sisdiknas, UU Guru dan Dosen, PMA No 90/2013, KMA 450 Tahun 2024, Juknis Dirjen Pendis terbaru)
- "memperhatikan": Array of string hasil rapat dewan guru dan komite
- "diktumPertama": Isi ketetapan KESATU
- "diktumKedua": Isi ketetapan KEDUA
- "diktumKetiga": Isi ketetapan KETIGA
- "diktumKeempat": Isi ketetapan KEEMPAT (tentang pembiayaan/anggaran DIPA/BOS)
- "diktumKelima": Isi ketetapan KELIMA (mulai berlaku dan perbaikan jika kekeliruan)`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = { rawContent: text };
    }

    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error generating SK legal:', error);
    res.status(500).json({ error: error.message || 'Gagal generate SK Legal' });
  }
});

// AI Polish / Assist Endpoint
app.post('/api/ai/polish-text', async (req, res) => {
  try {
    const { text, context } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API Key belum terkonfigurasi di Settings.',
      });
    }

    const prompt = `Anda adalah ahli tata bahasa dan persuratan resmi Kementerian Agama RI.
Tolong perbaiki dan sempurnakan teks berikut agar lebih formal, lugas, santun, dan sesuai kaidah tata naskah dinas Kemenag.
Konteks: ${context || 'Dokumen Resmi Madrasah'}
Teks Asli:
"""
${text}
"""

Kembalikan JSON dengan key:
- "polishedText": teks yang sudah disempurnakan
- "summaryOfChanges": ringkasan apa saja yang diperbaiki (e.g. ejaan, diksi, dasar regulasi)`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const textRes = response.text || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(textRes);
    } catch {
      parsedData = { polishedText: textRes };
    }

    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error polishing text:', error);
    res.status(500).json({ error: error.message || 'Gagal polish teks' });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AutoMadrasah Server running on port ${PORT}`);
  });
}

startServer();
