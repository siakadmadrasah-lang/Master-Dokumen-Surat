import express from 'express';
import path from 'path';
import fs from 'fs';
import JSZip from 'jszip';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

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
