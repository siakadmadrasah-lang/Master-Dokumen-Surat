import {
  MadrasahProfile,
  Teacher,
  Student,
  Rombel,
  OfficialDocument,
  ActivityLog,
} from '../types';

export interface SqlExportOptions {
  profile: MadrasahProfile;
  teachers: Teacher[];
  students: Student[];
  rombels: Rombel[];
  documents: OfficialDocument[];
  logs: ActivityLog[];
  dbDialect?: 'MYSQL' | 'POSTGRES' | 'SQLITE';
}

/**
 * Helper to escape string for MySQL / MariaDB dump
 */
function escapeSql(value: any): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  if (typeof value === 'number') {
    return isNaN(value) ? 'NULL' : String(value);
  }
  if (typeof value === 'boolean') {
    return value ? '1' : '0';
  }
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  const str = String(value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "''")
    .replace(/\0/g, '\\0')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
  return `'${str}'`;
}

/**
 * Generate full SQL dump for MySQL / MariaDB (Plesk, cPanel, phpMyAdmin compatible)
 */
export const generateMadrasahSqlDump = (options: SqlExportOptions): string => {
  const {
    profile,
    teachers = [],
    students = [],
    rombels = [],
    documents = [],
    logs = [],
  } = options;

  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);

  return `-- ====================================================================
-- SISTEM MANAJEMEN DOKUMEN RESMI MADRASAH & KOM (KMA 450/2024)
-- Basis Data SQL Dump untuk MySQL / MariaDB (Plesk & phpMyAdmin Ready)
-- Dihasilkan pada: ${timestamp} WIB
-- Lembaga: ${profile.namaMadrasah} (NSM: ${profile.nsm} / NPSN: ${profile.npsn})
-- Website: ${profile.website || '-'} | Email: ${profile.email || '-'}
-- ====================================================================

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------------------
-- 1. TABEL: madrasah_profil
-- Menyimpan identitas resmi satuan pendidikan dan KMA 450 metadata
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`madrasah_profil\`;
CREATE TABLE \`madrasah_profil\` (
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
  \`titimangsa\` varchar(50) DEFAULT 'Jakarta',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabel Profil Satuan Pendidikan AutoMadrasah';

INSERT INTO \`madrasah_profil\` (
  \`id\`, \`nsm\`, \`npsn\`, \`nama_madrasah\`, \`jenjang\`, \`status\`, \`akreditasi\`, \`alamat\`,
  \`desa_kelurahan\`, \`kecamatan\`, \`kabupaten_kota\`, \`provinsi\`, \`kode_pos\`, \`telepon\`,
  \`email\`, \`website\`, \`nama_kepala\`, \`nip_kepala\`, \`pangkat_gol_kepala\`,
  \`nama_ketua_komite\`, \`nama_pengawas\`, \`nip_pengawas\`, \`tahun_ajaran\`, \`semester\`, \`titimangsa\`
) VALUES (
  'madrasah_active',
  ${escapeSql(profile.nsm)},
  ${escapeSql(profile.npsn)},
  ${escapeSql(profile.namaMadrasah)},
  ${escapeSql(profile.jenjang)},
  ${escapeSql(profile.status)},
  ${escapeSql(profile.akreditasi)},
  ${escapeSql(profile.alamat)},
  ${escapeSql(profile.desaKelurahan)},
  ${escapeSql(profile.kecamatan)},
  ${escapeSql(profile.kabupatenKota)},
  ${escapeSql(profile.provinsi)},
  ${escapeSql(profile.kodePos)},
  ${escapeSql(profile.telepon)},
  ${escapeSql(profile.email)},
  ${escapeSql(profile.website)},
  ${escapeSql(profile.namaKepala)},
  ${escapeSql(profile.nipKepala)},
  ${escapeSql(profile.pangkatGolKepala)},
  ${escapeSql(profile.namaKetuaKomite)},
  ${escapeSql(profile.namaPengawas)},
  ${escapeSql(profile.nipPengawas)},
  ${escapeSql(profile.tahunAjaran)},
  ${escapeSql(profile.semester)},
  ${escapeSql(profile.titimangsa)}
);

-- --------------------------------------------------------------------
-- 2. TABEL: guru_gtk
-- Menyimpan database Guru & Tenaga Kependidikan (Simpatika/EMIS)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`guru_gtk\`;
CREATE TABLE \`guru_gtk\` (
  \`id\` varchar(50) NOT NULL,
  \`nip\` varchar(30) DEFAULT NULL,
  \`nuptk\` varchar(30) DEFAULT NULL,
  \`peg_id\` varchar(30) DEFAULT NULL,
  \`nama\` varchar(150) NOT NULL,
  \`gelar_depan\` varchar(20) DEFAULT NULL,
  \`gelar_belakang\` varchar(30) DEFAULT NULL,
  \`jenis_kelamin\` enum('L','P') NOT NULL DEFAULT 'L',
  \`tempat_lahir\` varchar(100) DEFAULT NULL,
  \`tanggal_lahir\` varchar(30) DEFAULT NULL,
  \`status_kepegawaian\` varchar(50) DEFAULT 'GTT',
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
  PRIMARY KEY (\`id\`),
  KEY \`idx_guru_nip\` (\`nip\`),
  KEY \`idx_guru_nuptk\` (\`nuptk\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Database Pendidik dan Tenaga Kependidikan Madrasah';

${
  teachers.length > 0
    ? `INSERT INTO \`guru_gtk\` (
  \`id\`, \`nip\`, \`nuptk\`, \`peg_id\`, \`nama\`, \`gelar_depan\`, \`gelar_belakang\`, \`jenis_kelamin\`,
  \`tempat_lahir\`, \`tanggal_lahir\`, \`status_kepegawaian\`, \`pangkat_gol\`, \`jabatan_utama\`,
  \`tugas_tambahan\`, \`mapel_utama\`, \`jumlah_jam\`, \`wali_kelas_di\`, \`sertifikasi\`, \`email\`,
  \`telepon\`, \`is_active\`
) VALUES
${teachers
  .map(
    (t) => `(
  ${escapeSql(t.id)},
  ${escapeSql(t.nip)},
  ${escapeSql(t.nuptk)},
  ${escapeSql(t.pegId)},
  ${escapeSql(t.nama)},
  ${escapeSql(t.gelarDepan)},
  ${escapeSql(t.gelarBelakang)},
  ${escapeSql(t.jenisKelamin)},
  ${escapeSql(t.tempatLahir)},
  ${escapeSql(t.tanggalLahir)},
  ${escapeSql(t.statusKepegawaian)},
  ${escapeSql(t.pangkatGol)},
  ${escapeSql(t.jabatanUtama)},
  ${escapeSql(t.tugasTambahan)},
  ${escapeSql(t.mapelUtama)},
  ${t.jumlahJam || 0},
  ${escapeSql(t.waliKelasDi)},
  ${t.sertifikasi ? 1 : 0},
  ${escapeSql(t.email)},
  ${escapeSql(t.telepon)},
  ${t.isActive ? 1 : 0}
)`
  )
  .join(',\n')};`
    : '-- (Tidak ada data guru untuk diimpor)'
}

-- --------------------------------------------------------------------
-- 3. TABEL: siswa
-- Menyimpan database Peserta Didik Aktif Madrasah (EMIS 4.0)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`siswa\`;
CREATE TABLE \`siswa\` (
  \`id\` varchar(50) NOT NULL,
  \`nisn\` varchar(20) NOT NULL,
  \`nis\` varchar(20) NOT NULL,
  \`nik\` varchar(30) DEFAULT NULL,
  \`nama\` varchar(150) NOT NULL,
  \`jenis_kelamin\` enum('L','P') NOT NULL DEFAULT 'L',
  \`tingkat\` int(11) NOT NULL,
  \`rombel\` varchar(50) NOT NULL,
  \`tempat_lahir\` varchar(100) DEFAULT NULL,
  \`tanggal_lahir\` varchar(30) DEFAULT NULL,
  \`nama_ayah\` varchar(100) DEFAULT NULL,
  \`nama_ibu\` varchar(100) DEFAULT NULL,
  \`pekerjaan_ortu\` varchar(100) DEFAULT NULL,
  \`alamat\` text DEFAULT NULL,
  \`desa_kelurahan\` varchar(100) DEFAULT NULL,
  \`kecamatan\` varchar(100) DEFAULT NULL,
  \`kabupaten_kota\` varchar(100) DEFAULT NULL,
  \`provinsi\` varchar(100) DEFAULT NULL,
  \`status_siswa\` varchar(30) NOT NULL DEFAULT 'Aktif',
  \`tahun_masuk\` varchar(10) DEFAULT NULL,
  \`telepon_ortu\` varchar(30) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`idx_siswa_nisn\` (\`nisn\`),
  KEY \`idx_siswa_rombel\` (\`rombel\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Database Peserta Didik Madrasah';

${
  students.length > 0
    ? `INSERT INTO \`siswa\` (
  \`id\`, \`nisn\`, \`nis\`, \`nik\`, \`nama\`, \`jenis_kelamin\`, \`tingkat\`, \`rombel\`,
  \`tempat_lahir\`, \`tanggal_lahir\`, \`nama_ayah\`, \`nama_ibu\`, \`pekerjaan_ortu\`,
  \`alamat\`, \`desa_kelurahan\`, \`kecamatan\`, \`kabupaten_kota\`, \`provinsi\`,
  \`status_siswa\`, \`tahun_masuk\`, \`telepon_ortu\`
) VALUES
${students
  .map(
    (s) => `(
  ${escapeSql(s.id)},
  ${escapeSql(s.nisn)},
  ${escapeSql(s.nis)},
  ${escapeSql(s.nik)},
  ${escapeSql(s.nama)},
  ${escapeSql(s.jenisKelamin)},
  ${s.tingkat || 1},
  ${escapeSql(s.rombel)},
  ${escapeSql(s.tempatLahir)},
  ${escapeSql(s.tanggalLahir)},
  ${escapeSql(s.namaAyah)},
  ${escapeSql(s.namaIbu)},
  ${escapeSql(s.pekerjaanOrtu)},
  ${escapeSql(s.alamat)},
  ${escapeSql(s.desaKelurahan)},
  ${escapeSql(s.kecamatan)},
  ${escapeSql(s.kabupatenKota)},
  ${escapeSql(s.provinsi)},
  ${escapeSql(s.statusSiswa)},
  ${escapeSql(s.tahunMasuk)},
  ${escapeSql(s.teleponOrtu)}
)`
  )
  .join(',\n')};`
    : '-- (Tidak ada data siswa untuk diimpor)'
}

-- --------------------------------------------------------------------
-- 4. TABEL: rombel
-- Menyimpan daftar Rombongan Belajar dan Wali Kelas
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`rombel\`;
CREATE TABLE \`rombel\` (
  \`id\` varchar(50) NOT NULL,
  \`nama\` varchar(50) NOT NULL,
  \`tingkat\` int(11) NOT NULL,
  \`wali_kelas_id\` varchar(50) DEFAULT NULL,
  \`ruangan\` varchar(100) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Daftar Rombongan Belajar';

${
  rombels.length > 0
    ? `INSERT INTO \`rombel\` (\`id\`, \`nama\`, \`tingkat\`, \`wali_kelas_id\`, \`ruangan\`) VALUES
${rombels
  .map(
    (r) => `(
  ${escapeSql(r.id)},
  ${escapeSql(r.nama)},
  ${r.tingkat || 1},
  ${escapeSql(r.waliKelasId)},
  ${escapeSql(r.ruangan)}
)`
  )
  .join(',\n')};`
    : `-- Dibuat otomatis
INSERT INTO \`rombel\` (\`id\`, \`nama\`, \`tingkat\`, \`ruangan\`) VALUES
('RMB-4A', 'Kelas 4A', 4, 'Gedung A R.101'),
('RMB-4B', 'Kelas 4B', 4, 'Gedung A R.102'),
('RMB-5A', 'Kelas 5A', 5, 'Gedung B R.201'),
('RMB-6A', 'Kelas 6A', 6, 'Gedung C R.301');`
}

-- --------------------------------------------------------------------
-- 5. TABEL: dokumen_resmi
-- Menyimpan naskah dinas, SK Pembagian Tugas, KOM KMA 450, Piagam
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`dokumen_resmi\`;
CREATE TABLE \`dokumen_resmi\` (
  \`id\` varchar(50) NOT NULL,
  \`type\` varchar(50) NOT NULL,
  \`nomor_surat\` varchar(150) NOT NULL,
  \`title\` varchar(255) NOT NULL,
  \`tahun_ajaran\` varchar(20) NOT NULL,
  \`semester\` varchar(10) NOT NULL,
  \`tanggal_surat\` varchar(50) NOT NULL,
  \`status\` varchar(30) NOT NULL DEFAULT 'DRAFT',
  \`target_person_id\` varchar(50) DEFAULT NULL,
  \`target_person_name\` varchar(150) DEFAULT NULL,
  \`content_data\` longtext NOT NULL,
  \`signatures\` longtext DEFAULT NULL,
  \`creator_name\` varchar(150) NOT NULL,
  \`version\` int(11) NOT NULL DEFAULT 1,
  \`notes\` text DEFAULT NULL,
  \`created_at\` varchar(50) NOT NULL,
  \`updated_at\` varchar(50) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`idx_dokumen_nomor\` (\`nomor_surat\`),
  KEY \`idx_dokumen_type\` (\`type\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Arsip Master Naskah Dinas & Dokumen Resmi AutoMadrasah';

${
  documents.length > 0
    ? `INSERT INTO \`dokumen_resmi\` (
  \`id\`, \`type\`, \`nomor_surat\`, \`title\`, \`tahun_ajaran\`, \`semester\`,
  \`tanggal_surat\`, \`status\`, \`target_person_id\`, \`target_person_name\`,
  \`content_data\`, \`signatures\`, \`creator_name\`, \`version\`, \`notes\`, \`created_at\`, \`updated_at\`
) VALUES
${documents
  .map(
    (d) => `(
  ${escapeSql(d.id)},
  ${escapeSql(d.type)},
  ${escapeSql(d.nomorSurat)},
  ${escapeSql(d.title)},
  ${escapeSql(d.tahunAjaran)},
  ${escapeSql(d.semester)},
  ${escapeSql(d.tanggalSurat)},
  ${escapeSql(d.status)},
  ${escapeSql(d.targetPersonId)},
  ${escapeSql(d.targetPersonName)},
  ${escapeSql(d.contentData)},
  ${escapeSql(d.signatures)},
  ${escapeSql(d.creatorName || 'Operator Madrasah')},
  ${d.version || 1},
  ${escapeSql(d.notes)},
  ${escapeSql(d.createdAt)},
  ${escapeSql(d.updatedAt)}
)`
  )
  .join(',\n')};`
    : '-- (Tidak ada dokumen untuk diimpor)'
}

-- --------------------------------------------------------------------
-- 6. TABEL: riwayat_aktivitas
-- Menyimpan log audit jejak digital dan pembuatan SK / TTE
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS \`riwayat_aktivitas\`;
CREATE TABLE \`riwayat_aktivitas\` (
  \`id\` varchar(50) NOT NULL,
  \`timestamp\` varchar(50) NOT NULL,
  \`user\` varchar(100) NOT NULL,
  \`action\` text NOT NULL,
  \`document_title\` varchar(255) DEFAULT NULL,
  \`category\` varchar(50) NOT NULL DEFAULT 'SYSTEM',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Log Jejak Digital Audit AutoMadrasah';

${
  logs.length > 0
    ? `INSERT INTO \`riwayat_aktivitas\` (\`id\`, \`timestamp\`, \`user\`, \`action\`, \`document_title\`, \`category\`) VALUES
${logs
  .map(
    (l) => `(
  ${escapeSql(l.id)},
  ${escapeSql(l.timestamp)},
  ${escapeSql(l.user)},
  ${escapeSql(l.action)},
  ${escapeSql(l.documentTitle)},
  ${escapeSql(l.category)}
)`
  )
  .join(',\n')};`
    : `INSERT INTO \`riwayat_aktivitas\` (\`id\`, \`timestamp\`, \`user\`, \`action\`, \`document_title\`, \`category\`) VALUES
('log_init', '${timestamp}', 'Admin Madrasah', 'Inisialisasi Basis Data AutoMadrasah KMA 450/2024', 'Sistem AutoMadrasah', 'SYSTEM');`
}

SET FOREIGN_KEY_CHECKS = 1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- ====================================================================
-- SELESAI EKSPOR BASIS DATA SQL (${documents.length} Dokumen, ${teachers.length} Guru, ${students.length} Siswa)
-- ====================================================================
`;
};

export const downloadMadrasahSql = (options: SqlExportOptions) => {
  const sqlContent = generateMadrasahSqlDump(options);
  const blob = new Blob([sqlContent], { type: 'application/sql;charset=utf-8' });
  const cleanName = options.profile.namaMadrasah.replace(/[^a-zA-Z0-9]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `DATABASE_AUTOMADRASAH_${cleanName}_${dateStr}.sql`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
