import JSZip from 'jszip';
import { MadrasahProfile, OfficialDocument, Teacher, Student, Rombel, ActivityLog } from '../types';
import { generateMadrasahSqlDump } from './sqlExport';

export interface PleskExportOptions {
  profile: MadrasahProfile;
  documents: OfficialDocument[];
  teachers: Teacher[];
  students: Student[];
  rombels: Rombel[];
  logs: ActivityLog[];
  includeNodeServer?: boolean;
  domainName?: string;
}

export const generatePleskDeploymentZip = async (
  options: PleskExportOptions,
  onProgress?: (percent: number, message: string) => void
): Promise<Blob> => {
  const zip = new JSZip();
  const { profile, documents, teachers, students, rombels, logs, includeNodeServer = true, domainName = 'madrasah.sch.id' } = options;

  onProgress?.(10, 'Menyiapkan struktur direktori Plesk httpdocs...');

  // 1. Root and httpdocs Folder
  const httpdocs = zip.folder('httpdocs') || zip;

  // 2. .htaccess for Plesk Apache / LiteSpeed
  const htaccessContent = `# ====================================================================
# AUTO-MADRASAH PLESK HOSTING CONFIGURATION (.htaccess)
# Standard: Apache 2.4+ / LiteSpeed / OpenLiteSpeed pada Plesk Obsidian
# Satuan Pendidikan: ${profile.namaMadrasah} (NSM: ${profile.nsm})
# ====================================================================

# 1. DIRECTORY INDEX PRIORITY
DirectoryIndex index.html index.php

# 2. ENFORCE HTTPS REDIRECTION (SSL Let's Encrypt Plesk)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{HTTPS} !=on
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # 3. SINGLE PAGE APPLICATION (SPA) ROUTING REWRITE
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>

# 4. COMPRESSION & GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript
    AddOutputFilterByType DEFLATE application/javascript application/x-javascript application/json
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# 5. BROWSER CACHING HEADERS
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 0 seconds"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType application/json "access plus 0 seconds"
</IfModule>

# 6. SECURITY HEADERS
<IfModule mod_headers.c>
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set X-Content-Type-Options "nosniff"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# 7. MIME TYPES
<IfModule mod_mime.c>
    AddType application/json .json
    AddType image/svg+xml .svg
    AddType font/woff2 .woff2
    AddDefaultCharset UTF-8
</IfModule>
`;

  httpdocs.file('.htaccess', htaccessContent);
  zip.file('.htaccess', htaccessContent);
  onProgress?.(30, 'Menyusun berkas konfigurasi .htaccess & web.config...');

  // 3. web.config for Plesk on Windows Server / IIS
  const webConfigContent = `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="AutoMadrasah HTTPS Redirect" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{HTTPS}" pattern="off" ignoreCase="true" />
          </conditions>
          <action type="Redirect" url="https://{HTTP_HOST}/{R:1}" redirectType="Permanent" />
        </rule>
        <rule name="AutoMadrasah SPA Rewrite" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <remove fileExtension=".json" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
      <remove fileExtension=".svg" />
      <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
    </staticContent>
    <httpProtocol>
      <customHeaders>
        <add name="X-Frame-Options" value="SAMEORIGIN" />
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-XSS-Protection" value="1; mode=block" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>`;

  httpdocs.file('web.config', webConfigContent);

  // 4. nginx.conf for Plesk Reverse Proxy or Standalone Nginx
  const nginxConfContent = `# ====================================================================
# PLESK NGINX DIRECTIVES (Tambahkan di Menu: "Apache & Nginx Settings" -> "Additional Nginx Directives")
# ====================================================================

# 1. SPA Fallback Routing
location / {
    try_files $uri $uri/ /index.html;
}

# 2. Static Asset Caching
location ~* \\.(?:css|js|jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc|woff2|woff)$ {
    expires 1M;
    access_log off;
    add_header Cache-Control "public";
}

# 3. Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
`;

  zip.file('plesk-nginx.conf', nginxConfContent);

  onProgress?.(50, 'Menyematkan snapshot database madrasah & berkas naskah...');

  // 5. Database JSON payload
  const databaseSnapshot = {
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    targetPlatform: 'Plesk Obsidian / Onyx Web Hosting',
    madrasah: {
      nama: profile.namaMadrasah,
      nsm: profile.nsm,
      npsn: profile.npsn,
      jenjang: profile.jenjang,
      akreditasi: profile.akreditasi,
      kepala: profile.namaKepala,
      nipKepala: profile.nipKepala,
    },
    data: {
      profile,
      teachers,
      students,
      rombels,
      documents,
      logs,
    },
  };

  httpdocs.file('madrasah-data.json', JSON.stringify(databaseSnapshot, null, 2));

  // 5b. Database MySQL / MariaDB SQL Dump (.sql) for phpMyAdmin or MySQL CLI
  const sqlDump = generateMadrasahSqlDump({
    profile,
    teachers,
    students,
    rombels,
    documents,
    logs,
  });
  httpdocs.file('database.sql', sqlDump);
  zip.file('database.sql', sqlDump);

  // 6. Production Index.html Starter Template for Plesk
  const indexHtmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AutoMadrasah - ${profile.namaMadrasah}</title>
  <meta name="description" content="Sistem Otomatisasi Dokumen Resmi Kemenag RI, SK Pembagian Tugas, KOM KMA 450/2024, dan TTE Digital QR Code." />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏛️</text></svg>">
  <!-- Tailwind CSS & Font CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-formal { font-family: 'Merriweather', serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
  <div id="root">
    <!-- Header -->
    <header class="bg-emerald-950 text-white p-4 border-b border-emerald-800 shadow-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center font-bold text-lg text-emerald-300">
            AM
          </div>
          <div>
            <h1 class="font-bold text-base leading-tight">${profile.namaMadrasah}</h1>
            <p class="text-xs text-emerald-300">NSM: ${profile.nsm} | NPSN: ${profile.npsn} • KMA 450/2024</p>
          </div>
        </div>
        <span class="px-3 py-1 bg-emerald-900 text-emerald-200 rounded-full text-xs font-semibold border border-emerald-700">
          Plesk Production Ready
        </span>
      </div>
    </header>

    <!-- Main Live Container -->
    <main class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 class="text-xl font-bold text-slate-900 mb-2">Selamat Datang di Portal Dokumen Resmi ${profile.namaMadrasah}</h2>
        <p class="text-sm text-slate-600 mb-4">
          Paket aplikasi AutoMadrasah telah berhasil dipasang pada Plesk Hosting server Anda.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <h3 class="font-bold text-emerald-950 text-sm mb-1">Kurikulum KOM & SK</h3>
            <p class="text-emerald-800">Tersedia ${documents.length} dokumen resmi tersertifikasi TTE QR Code.</p>
          </div>
          <div class="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 class="font-bold text-blue-950 text-sm mb-1">Database GTK</h3>
            <p class="text-blue-800">Tercatat ${teachers.length} guru dan tenaga kependidikan aktif.</p>
          </div>
          <div class="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h3 class="font-bold text-amber-950 text-sm mb-1">Peserta Didik</h3>
            <p class="text-amber-800">Tercatat ${students.length} siswa terdaftar di madrasah.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
      © ${new Date().getFullYear()} ${profile.namaMadrasah} • AutoMadrasah Kemenag RI Plesk Deployment Package
    </footer>
  </div>
</body>
</html>`;

  httpdocs.file('index.html', indexHtmlContent);
  zip.file('index.html', indexHtmlContent);

  const indexPhpContent = `<?php
/**
 * AutoMadrasah PHP Entry Point for Plesk / Apache / LiteSpeed
 */
if (file_exists(__DIR__ . '/index.html')) {
    include __DIR__ . '/index.html';
} elseif (file_exists(__DIR__ . '/httpdocs/index.html')) {
    include __DIR__ . '/httpdocs/index.html';
} else {
    echo "<h1>AutoMadrasah Ready</h1><p>Silakan pastikan file index.html tersedia di direktori web root.</p>";
}
?>`;

  httpdocs.file('index.php', indexPhpContent);
  zip.file('index.php', indexPhpContent);

  // 7. Node.js Express Passenger Server (if user wants Node.js Plesk Hosting)
  if (includeNodeServer) {
    const serverJsContent = `// AutoMadrasah Express Server for Plesk Node.js Selector
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Security & Static Files
app.use(express.static(path.join(__dirname, 'httpdocs')));
app.use(express.json());

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    madrasah: '${profile.namaMadrasah}',
    version: '1.0.0',
    platform: 'Plesk Obsidian Node.js',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'httpdocs', 'madrasah-data.json'));
});

// SPA Fallback for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'httpdocs', 'index.html'));
});

app.listen(PORT, () => {
  console.log('AutoMadrasah Plesk Server running on port ' + PORT);
});
`;

    zip.file('app.js', serverJsContent);
    zip.file('server.js', serverJsContent);

    const packageJsonContent = {
      name: `automadrasah-${profile.namaMadrasah.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      version: '1.0.0',
      description: `AutoMadrasah Deployment Package for ${profile.namaMadrasah}`,
      main: 'app.js',
      scripts: {
        start: 'node app.js',
      },
      dependencies: {
        express: '^4.21.2',
      },
    };

    zip.file('package.json', JSON.stringify(packageJsonContent, null, 2));
  }

  onProgress?.(75, 'Menyusun buku panduan instalasi Plesk (PLESK_DEPLOY_GUIDE.md)...');

  // 8. Comprehensive Indonesian Plesk Installation Guide
  const guideContent = `# PANDUAN LENGKAP INSTALASI AUTOMADRASAH DI PLESK HOSTING
**Satuan Pendidikan**: ${profile.namaMadrasah}
**NSM**: ${profile.nsm} | **NPSN**: ${profile.npsn}
**Versi**: 1.0.0 (KMA 450/2024 & Kurikulum Berbasis Cinta)

---

## DAFTAR ISI
1. [Ringkasan Berkas Paket](#1-ringkasan-berkas-paket)
2. [Metode 1: Pemasangan Static Web Hosting (Paling Mudah)](#2-metode-1-pemasangan-static-web-hosting-paling-mudah)
3. [Metode 2: Pemasangan Node.js Selector di Plesk](#3-metode-2-pemasangan-nodejs-selector-di-plesk)
4. [Konfigurasi SSL Let's Encrypt Gratis](#4-konfigurasi-ssl-lets-encrypt-gratis)
5. [Konfigurasi Domain / Subdomain Madrasah](#5-konfigurasi-domain--subdomain-madrasah)
6. [Troubleshooting & Solusi Masalah](#6-troubleshooting--solusi-masalah)

---

## 1. RINGKASAN BERKAS PAKET
Dalam arsip ZIP ini terdapat struktur berkas siap pasang:
- \`httpdocs/\` : Direktori utama web root di Plesk hosting.
  - \`index.html\` : Berkas utama frontend web app.
  - \`.htaccess\` : Konfigurasi Apache untuk HTTPS redirect, SPA rewrite, Gzip & caching.
  - \`web.config\` : Konfigurasi IIS untuk Plesk Windows Server.
  - \`madrasah-data.json\` : Database cadangan master seluruh dokumen, guru, dan siswa.
- \`plesk-nginx.conf\` : Template pengaturan direktif Nginx di panel Plesk.
- \`app.js\` & \`server.js\` : Server backend Node.js untuk Plesk Node.js Selector.
- \`package.json\` : Konfigurasi dependensi Node.js.

---

## 2. METODE 1: PEMASANGAN STATIC WEB HOSTING (Paling Cepat & Mudah)

Langkah-langkah:
1. **Login ke Panel Plesk** madrasah Anda (contoh: \`https://server.madrasah.sch.id:8443\`).
2. Masuk ke menu **Websites & Domains** -> Pilih domain/subdomain yang diinginkan (misal: \`dokumen.mtsn1malang.sch.id\`).
3. Klik tombol **File Manager** -> Buka folder **\`httpdocs\`**.
4. Jika ada file default seperti \`index.html\` bawaan Plesk, hapus atau ganti nama terlebih dahulu.
5. Klik **Upload File** -> Pilih file ZIP ini.
6. Centang file ZIP yang terunggah -> Klik **Extract Files** -> Pilih ekstrak ke dalam \`httpdocs\`.
7. Pastikan berkas \`index.html\` dan \`.htaccess\` berada langsung di dalam folder \`httpdocs\`.
8. Buka website di browser Anda: \`https://nama-domain-madrasah.sch.id\`. Aplikasi AutoMadrasah langsung aktif!

---

## 3. METODE 2: PEMASANGAN NODE.JS SELECTOR DI PLESK

Jika server Plesk Anda mengaktifkan ekstensi **Node.js**:
1. Buka menu **Websites & Domains** -> Klik **Node.js**.
2. Atur konfigurasi berikut:
   - **Node.js Version**: Pilih versi \`18.x\`, \`20.x\`, atau \`22.x\`.
   - **Application Root**: \`/httpdocs\` atau root domain.
   - **Application Startup File**: \`app.js\`.
3. Unggah seluruh isi file ZIP ke folder root.
4. Klik tombol **NPM Install** di panel Plesk.
5. Klik tombol **Restart** aplikasi Node.js.

---

## 4. KONFIGURASI SSL LET'S ENCRYPT GRATIS
Agar tanda tangan digital QR Code TTE berstatus valid & aman:
1. Di panel Plesk, klik menu **SSL/TLS Certificates**.
2. Klik tombol **Install a free basic certificate provided by Let's Encrypt**.
3. Centang opsi:
   - *Secure the domain name*
   - *Include a "www" subdomain*
   - *Redirect from HTTP to HTTPS automatically*
4. Klik **Get it free**. Sertifikat SSL aktif seketika!

---

## 5. KONFIGURASI DOMAIN / SUBDOMAIN MADRASAH
Disarankan menggunakan subdomain resmi madrasah:
- \`dokumen.namamadrasah.sch.id\`
- \`kom.namamadrasah.sch.id\`
- \`tte.namamadrasah.sch.id\`

Cukup buat Subdomain di Plesk -> Ikuti langkah pada **Metode 1**.

---

## 6. TROUBLESHOOTING & SOLUSI MASALAH
1. **Muncul 404 saat merefresh halaman?**
   - Pastikan file \`.htaccess\` sudah terunggah di dalam \`httpdocs\`.
   - Di Plesk, buka **Apache & Nginx Settings** -> Pastikan modul \`mod_rewrite\` aktif.
2. **Perubahan data tidak tersimpan?**
   - AutoMadrasah menggunakan penyimpanan aman browser LocalStorage dan terintegrasi dengan sinkronisasi Cloud.
   - Gunakan fitur **Backup & Restore** di menu Pengaturan untuk memindahkan data antar perangkat operator.

---
*Diterbitkan secara otomatis oleh AutoMadrasah Kemenag RI Generator Module*
`;

  zip.file('PLESK_DEPLOYMENT_GUIDE.md', guideContent);
  zip.file('BACA_PANDUAN_PLESK.txt', `Silakan buka file PLESK_DEPLOYMENT_GUIDE.md untuk panduan lengkap pemasangan di Plesk Hosting.`);

  // 9. Quick bash installer script
  const bashScript = `#!/bin/bash
# AutoMadrasah Plesk Deployer Script
echo "Memulai ekstraksi paket AutoMadrasah ke Plesk httpdocs..."
unzip -o automadrasah-plesk-package.zip -d httpdocs/
chmod 644 httpdocs/.htaccess
chmod 644 httpdocs/index.html
echo "Selesai! Buka domain madrasah Anda di browser."
`;
  zip.file('deploy-plesk.sh', bashScript);

  onProgress?.(90, 'Melakukan kompresi arsip ZIP Plesk...');

  // Generate final blob
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9,
    },
  });

  onProgress?.(100, 'Paket ZIP Plesk siap diunduh!');
  return zipBlob;
};

export const downloadPleskZip = async (
  options: PleskExportOptions,
  onProgress?: (percent: number, message: string) => void
) => {
  const cleanMadrasahName = options.profile.namaMadrasah.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `PLESK_DEPLOY_AUTOMADRASAH_${cleanMadrasahName}_${new Date().toISOString().slice(0, 10)}.zip`;

  onProgress?.(20, 'Menghubungkan ke pembuat paket aplikasi lengkap...');
  try {
    const res = await fetch('/api/export/plesk-bundle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile: options.profile,
        documents: options.documents,
        teachers: options.teachers,
        students: options.students,
        rombels: options.rombels,
        logs: options.logs,
      }),
    });

    if (res.ok) {
      onProgress?.(80, 'Mengunduh paket aplikasi lengkap (.zip)...');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onProgress?.(100, 'Paket aplikasi lengkap siap diekstrak!');
      return;
    }
  } catch (err) {
    console.warn('API bundle exporter failed, falling back to client JSZip generator', err);
  }

  // Fallback to client-side generator
  const blob = await generatePleskDeploymentZip(options, onProgress);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
