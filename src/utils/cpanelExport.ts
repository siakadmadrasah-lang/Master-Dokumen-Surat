/**
 * Generator Paket Deployment cPanel & Sinkronisasi Otomatis MySQL
 * Kredensial Database Terkonfigurasi:
 * - Db User: masbagoes_adm
 * - Db Name: masbagoes_adm
 * - Db Pass: masbagus15
 * - Host: localhost (Standar cPanel)
 */

import JSZip from 'jszip';
import { MadrasahProfile, OfficialDocument, Teacher, Student, Rombel, ActivityLog } from '../types';
import { generateMadrasahSqlDump } from './sqlExport';

export interface CpanelExportOptions {
  profile: MadrasahProfile;
  documents: OfficialDocument[];
  teachers: Teacher[];
  students: Student[];
  rombels: Rombel[];
  logs: ActivityLog[];
  dbName?: string;
  dbUser?: string;
  dbPass?: string;
  dbHost?: string;
  domainName?: string;
}

export const generateCpanelDeploymentZip = async (
  options: CpanelExportOptions,
  onProgress?: (percent: number, message: string) => void
): Promise<Blob> => {
  const zip = new JSZip();
  const {
    profile,
    documents,
    teachers,
    students,
    rombels,
    logs,
    dbName = 'masbagoes_adm',
    dbUser = 'masbagoes_adm',
    dbPass = 'masbagus15',
    dbHost = 'localhost',
    domainName = profile.website?.replace(/^https?:\/\//, '') || 'madrasah.sch.id',
  } = options;

  onProgress?.(10, 'Menyiapkan struktur direktori cPanel public_html, Plesk httpdocs & MySQL...');

  // 1. Root, public_html (cPanel), dan httpdocs (Plesk) folders
  // Menjamin seluruh berkas Plesk tetap utuh saat diekstrak ke cPanel
  const publicHtml = zip.folder('public_html') || zip;
  const httpdocs = zip.folder('httpdocs') || zip;
  const apiFolder = publicHtml.folder('api') || publicHtml;
  const httpdocsApiFolder = httpdocs.folder('api') || httpdocs;
  const rootApiFolder = zip.folder('api') || zip;

  // Helper agar seluruh berkas otomatis tersalin ke public_html, httpdocs, dan root
  const addUniversalFile = (path: string, content: string | Blob | ArrayBuffer) => {
    zip.file(path, content);
    publicHtml.file(path, content);
    httpdocs.file(path, content);
  };

  const addUniversalApiFile = (filename: string, content: string) => {
    rootApiFolder.file(filename, content);
    apiFolder.file(filename, content);
    httpdocsApiFolder.file(filename, content);
  };

  // 2. config.php (Konfigurasi MySQL Resmi Sesuai Permintaan)
  const configPhpContent = `<?php
/**
 * ====================================================================
 * AUTOMADRASAH - KONFIGURASI DATABASE MYSQL CPANEL & PLESK
 * Satuan Pendidikan: ${profile.namaMadrasah} (NSM: ${profile.nsm} | NPSN: ${profile.npsn})
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
define('MADRASAH_NSM', '${profile.nsm || '1234567890'}');
define('TIMEZONE', 'Asia/Jakarta');

date_default_timezone_set(TIMEZONE);
?>`;

  addUniversalFile('config.php', configPhpContent);

  onProgress?.(25, 'Menyusun konektor PDO MySQL & inisialisasi tabel otomatis...');

  // 3. api/db.php (PDO Connection & Auto Table Migration)
  const dbPhpContent = `<?php
/**
 * AutoMadrasah - Konektor Database PDO MySQL
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
        // Coba konek tanpa database spesifik untuk mengecek apakah user ada namun DB belum dibuat
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
                'petunjuk' => 'Pastikan di menu cPanel "MySQL Databases", database [' . DB_NAME . '] dan user [' . DB_USER . '] sudah dibuat dan user diberi ALL PRIVILEGES.'
            ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
}

/**
 * Otomatis inisialisasi seluruh tabel jika belum ada
 */
function initTablesIfNotExist(PDO $pdo) {
    // 1. Profil
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
        \`titimangsa\` varchar(50) DEFAULT 'Banyumas',
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

  addUniversalApiFile('db.php', dbPhpContent);

  onProgress?.(45, 'Menyusun berkas endpoint API Sync otomatis (api/sync.php)...');

  // 4. api/sync.php (Bidirectional Sync Handler with Full CORS)
  const syncPhpContent = `<?php
/**
 * ====================================================================
 * AUTOMADRASAH - ENDPOINT SINKRONISASI OTOMATIS MYSQL CPANEL
 * Mendukung Penyimpanan Real-Time & Penarikan Data Cadangan
 * ====================================================================
 */

// Enable Full CORS for Browser & AI Studio Sync
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-AutoMadrasah-Sync");
header("Content-Type: application/json; charset=utf-8");

// Handle HTTP Pre-flight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

$pdo = getDbConnection();

// METHOD POST: Simpan data dari aplikasi ke database MySQL
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

    $profile   = $payload['profile'] ?? [];
    $teachers  = $payload['teachers'] ?? [];
    $students  = $payload['students'] ?? [];
    $rombels   = $payload['rombels'] ?? [];
    $documents = $payload['documents'] ?? [];
    $logs      = $payload['logs'] ?? [];

    try {
        $pdo->beginTransaction();

        // 1. Simpan Profil Madrasah (Safe Upsert)
        if (!empty($profile['namaMadrasah'])) {
            $stmt = $pdo->prepare("INSERT INTO \`madrasah_profil\` (
                \`id\`, \`nsm\`, \`npsn\`, \`nama_madrasah\`, \`jenjang\`, \`status\`, \`akreditasi\`,
                \`alamat\`, \`desa_kelurahan\`, \`kecamatan\`, \`kabupaten_kota\`, \`provinsi\`, \`kode_pos\`,
                \`telepon\`, \`email\`, \`website\`, \`nama_kepala\`, \`nip_kepala\`, \`pangkat_gol_kepala\`,
                \`nama_ketua_komite\`, \`nama_pengawas\`, \`nip_pengawas\`, \`tahun_ajaran\`, \`semester\`, \`titimangsa\`
            ) VALUES (
                'madrasah_active', :nsm, :npsn, :nama, :jenjang, :status, :akreditasi,
                :alamat, :desa, :kecamatan, :kabupaten, :provinsi, :kode_pos,
                :telepon, :email, :website, :kepala, :nip_kepala, :pangkat_kepala,
                :komite, :pengawas, :nip_pengawas, :tahun_ajaran, :semester, :titimangsa
            ) ON DUPLICATE KEY UPDATE
                \`nsm\` = VALUES(\`nsm\`),
                \`npsn\` = VALUES(\`npsn\`),
                \`nama_madrasah\` = VALUES(\`nama_madrasah\`),
                \`jenjang\` = VALUES(\`jenjang\`),
                \`status\` = VALUES(\`status\`),
                \`akreditasi\` = VALUES(\`akreditasi\`),
                \`alamat\` = VALUES(\`alamat\`),
                \`desa_kelurahan\` = VALUES(\`desa_kelurahan\`),
                \`kecamatan\` = VALUES(\`kecamatan\`),
                \`kabupaten_kota\` = VALUES(\`kabupaten_kota\`),
                \`provinsi\` = VALUES(\`provinsi\`),
                \`kode_pos\` = VALUES(\`kode_pos\`),
                \`telepon\` = VALUES(\`telepon\`),
                \`email\` = VALUES(\`email\`),
                \`website\` = VALUES(\`website\`),
                \`nama_kepala\` = VALUES(\`nama_kepala\`),
                \`nip_kepala\` = VALUES(\`nip_kepala\`),
                \`pangkat_gol_kepala\` = VALUES(\`pangkat_gol_kepala\`),
                \`nama_ketua_komite\` = VALUES(\`nama_ketua_komite\`),
                \`nama_pengawas\` = VALUES(\`nama_pengawas\`),
                \`nip_pengawas\` = VALUES(\`nip_pengawas\`),
                \`tahun_ajaran\` = VALUES(\`tahun_ajaran\`),
                \`semester\` = VALUES(\`semester\`),
                \`titimangsa\` = VALUES(\`titimangsa\`)");

            $stmt->execute([
                ':nsm'            => $profile['nsm'] ?? '',
                ':npsn'           => $profile['npsn'] ?? '',
                ':nama'           => $profile['namaMadrasah'] ?? '',
                ':jenjang'        => $profile['jenjang'] ?? 'MI',
                ':status'         => $profile['status'] ?? 'Swasta',
                ':akreditasi'     => $profile['akreditasi'] ?? 'A',
                ':alamat'         => $profile['alamat'] ?? '',
                ':desa'           => $profile['desaKelurahan'] ?? '',
                ':kecamatan'      => $profile['kecamatan'] ?? '',
                ':kabupaten'      => $profile['kabupatenKota'] ?? '',
                ':provinsi'       => $profile['provinsi'] ?? '',
                ':kode_pos'       => $profile['kodePos'] ?? '',
                ':telepon'        => $profile['telepon'] ?? '',
                ':email'          => $profile['email'] ?? '',
                ':website'        => $profile['website'] ?? '',
                ':kepala'         => $profile['namaKepala'] ?? '',
                ':nip_kepala'     => $profile['nipKepala'] ?? '',
                ':pangkat_kepala' => $profile['pangkatGolKepala'] ?? '',
                ':komite'         => $profile['namaKetuaKomite'] ?? '',
                ':pengawas'       => $profile['namaPengawas'] ?? '',
                ':nip_pengawas'   => $profile['nipPengawas'] ?? '',
                ':tahun_ajaran'   => $profile['tahunAjaran'] ?? '2025/2026',
                ':semester'       => $profile['semester'] ?? '1 (Ganjil)',
                ':titimangsa'     => $profile['titimangsa'] ?? 'Banyumas',
            ]);
        }

        // 2. Simpan Guru (Safe Upsert batch)
        if (is_array($teachers) && count($teachers) > 0) {
            $stmtTeacher = $pdo->prepare("INSERT INTO \`guru_gtk\` (
                \`id\`, \`nip\`, \`nuptk\`, \`peg_id\`, \`nama\`, \`gelar_depan\`, \`gelar_belakang\`,
                \`jenis_kelamin\`, \`tempat_lahir\`, \`tanggal_lahir\`, \`status_kepegawaian\`,
                \`pangkat_gol\`, \`jabatan_utama\`, \`tugas_tambahan\`, \`mapel_utama\`,
                \`jumlah_jam\`, \`wali_kelas_di\`, \`sertifikasi\`, \`email\`, \`telepon\`, \`is_active\`,
                \`signature_url\`, \`raw_data\`
            ) VALUES (
                :id, :nip, :nuptk, :peg_id, :nama, :gelar_depan, :gelar_belakang,
                :jk, :tempat_lahir, :tanggal_lahir, :status_kep,
                :pangkat_gol, :jabatan, :tugas_tambahan, :mapel,
                :jam, :wali, :sertifikasi, :email, :telepon, :active,
                :signature, :raw
            ) ON DUPLICATE KEY UPDATE
                \`nip\` = VALUES(\`nip\`),
                \`nuptk\` = VALUES(\`nuptk\`),
                \`peg_id\` = VALUES(\`peg_id\`),
                \`nama\` = VALUES(\`nama\`),
                \`gelar_depan\` = VALUES(\`gelar_depan\`),
                \`gelar_belakang\` = VALUES(\`gelar_belakang\`),
                \`jenis_kelamin\` = VALUES(\`jenis_kelamin\`),
                \`tempat_lahir\` = VALUES(\`tempat_lahir\`),
                \`tanggal_lahir\` = VALUES(\`tanggal_lahir\`),
                \`status_kepegawaian\` = VALUES(\`status_kepegawaian\`),
                \`pangkat_gol\` = VALUES(\`pangkat_gol\`),
                \`jabatan_utama\` = VALUES(\`jabatan_utama\`),
                \`tugas_tambahan\` = VALUES(\`tugas_tambahan\`),
                \`mapel_utama\` = VALUES(\`mapel_utama\`),
                \`jumlah_jam\` = VALUES(\`jumlah_jam\`),
                \`wali_kelas_di\` = VALUES(\`wali_kelas_di\`),
                \`sertifikasi\` = VALUES(\`sertifikasi\`),
                \`email\` = VALUES(\`email\`),
                \`telepon\` = VALUES(\`telepon\`),
                \`is_active\` = VALUES(\`is_active\`),
                \`signature_url\` = COALESCE(VALUES(\`signature_url\`), \`signature_url\`),
                \`raw_data\` = VALUES(\`raw_data\`)");

            foreach ($teachers as $t) {
                if (empty($t['id'])) continue;
                $stmtTeacher->execute([
                    ':id'             => $t['id'],
                    ':nip'            => $t['nip'] ?? '',
                    ':nuptk'          => $t['nuptk'] ?? '',
                    ':peg_id'         => $t['pegId'] ?? '',
                    ':nama'           => $t['nama'] ?? 'Guru',
                    ':gelar_depan'    => $t['gelarDepan'] ?? '',
                    ':gelar_belakang' => $t['gelarBelakang'] ?? '',
                    ':jk'             => ($t['jenisKelamin'] ?? 'L') === 'P' ? 'P' : 'L',
                    ':tempat_lahir'   => $t['tempatLahir'] ?? '',
                    ':tanggal_lahir'  => $t['tanggalLahir'] ?? '',
                    ':status_kep'     => $t['statusKepegawaian'] ?? 'GTY',
                    ':pangkat_gol'    => $t['pangkatGol'] ?? '',
                    ':jabatan'        => $t['jabatanUtama'] ?? 'Guru',
                    ':tugas_tambahan' => $t['tugasTambahan'] ?? '',
                    ':mapel'          => $t['mapelUtama'] ?? '',
                    ':jam'            => intval($t['jumlahJam'] ?? 24),
                    ':wali'           => $t['waliKelasDi'] ?? '',
                    ':sertifikasi'    => !empty($t['sertifikasi']) ? 1 : 0,
                    ':email'          => $t['email'] ?? '',
                    ':telepon'        => $t['telepon'] ?? '',
                    ':active'         => isset($t['isActive']) && !$t['isActive'] ? 0 : 1,
                    ':signature'      => $t['signatureUrl'] ?? null,
                    ':raw'            => json_encode($t, JSON_UNESCAPED_UNICODE),
                ]);
            }
        }

        // 3. Simpan Siswa (Safe Upsert batch)
        if (is_array($students) && count($students) > 0) {
            $stmtStudent = $pdo->prepare("INSERT INTO \`siswa\` (
                \`id\`, \`nisn\`, \`nis\`, \`nik\`, \`nama\`, \`jenis_kelamin\`, \`rombel\`,
                \`tingkat\`, \`tempat_lahir\`, \`tanggal_lahir\`, \`nama_ayah\`, \`nama_ibu\`,
                \`pekerjaan_ortu\`, \`alamat\`, \`status_siswa\`, \`raw_data\`
            ) VALUES (
                :id, :nisn, :nis, :nik, :nama, :jk, :rombel,
                :tingkat, :tempat_lahir, :tanggal_lahir, :ayah, :ibu,
                :pekerjaan, :alamat, :status, :raw
            ) ON DUPLICATE KEY UPDATE
                \`nisn\` = VALUES(\`nisn\`),
                \`nis\` = VALUES(\`nis\`),
                \`nik\` = VALUES(\`nik\`),
                \`nama\` = VALUES(\`nama\`),
                \`jenis_kelamin\` = VALUES(\`jenis_kelamin\`),
                \`rombel\` = VALUES(\`rombel\`),
                \`tingkat\` = VALUES(\`tingkat\`),
                \`tempat_lahir\` = VALUES(\`tempat_lahir\`),
                \`tanggal_lahir\` = VALUES(\`tanggal_lahir\`),
                \`nama_ayah\` = VALUES(\`nama_ayah\`),
                \`nama_ibu\` = VALUES(\`nama_ibu\`),
                \`pekerjaan_ortu\` = VALUES(\`pekerjaan_ortu\`),
                \`alamat\` = VALUES(\`alamat\`),
                \`status_siswa\` = VALUES(\`status_siswa\`),
                \`raw_data\` = VALUES(\`raw_data\`)");

            foreach ($students as $s) {
                if (empty($s['id'])) continue;
                $stmtStudent->execute([
                    ':id'            => $s['id'],
                    ':nisn'          => $s['nisn'] ?? '',
                    ':nis'           => $s['nis'] ?? '',
                    ':nik'           => $s['nik'] ?? '',
                    ':nama'          => $s['nama'] ?? 'Siswa',
                    ':jk'            => ($s['jenisKelamin'] ?? 'L') === 'P' ? 'P' : 'L',
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

        // 4. Simpan Dokumen Resmi & SK (Safe Upsert batch)
        if (is_array($documents) && count($documents) > 0) {
            $stmtDoc = $pdo->prepare("INSERT INTO \`dokumen_resmi\` (
                \`id\`, \`document_type\`, \`nomor_surat\`, \`judul\`, \`tahun_ajaran\`,
                \`tanggal_terbit\`, \`status\`, \`qr_code_hash\`, \`signer_name\`,
                \`signer_nip\`, \`signer_role\`, \`content_json\`
            ) VALUES (
                :id, :doc_type, :nomor, :judul, :tahun_ajaran,
                :tanggal, :status, :qr_hash, :signer_name,
                :signer_nip, :signer_role, :content_json
            ) ON DUPLICATE KEY UPDATE
                \`document_type\` = VALUES(\`document_type\`),
                \`nomor_surat\` = VALUES(\`nomor_surat\`),
                \`judul\` = VALUES(\`judul\`),
                \`tahun_ajaran\` = VALUES(\`tahun_ajaran\`),
                \`tanggal_terbit\` = VALUES(\`tanggal_terbit\`),
                \`status\` = VALUES(\`status\`),
                \`qr_code_hash\` = VALUES(\`qr_code_hash\`),
                \`signer_name\` = VALUES(\`signer_name\`),
                \`signer_nip\` = VALUES(\`signer_nip\`),
                \`signer_role\` = VALUES(\`signer_role\`),
                \`content_json\` = VALUES(\`content_json\`)");

            foreach ($documents as $d) {
                if (empty($d['id'])) continue;
                $stmtDoc->execute([
                    ':id'           => $d['id'],
                    ':doc_type'     => $d['documentType'] ?? 'SK_PEMBAGIAN_TUGAS',
                    ':nomor'        => $d['nomorSurat'] ?? '',
                    ':judul'        => $d['judul'] ?? 'Dokumen Resmi',
                    ':tahun_ajaran' => $d['tahunAjaran'] ?? '2025/2026',
                    ':tanggal'      => $d['tanggalTerbit'] ?? date('Y-m-d'),
                    ':status'       => $d['status'] ?? 'DRAFT',
                    ':qr_hash'      => $d['qrCodeHash'] ?? null,
                    ':signer_name'  => $d['signerName'] ?? '',
                    ':signer_nip'   => $d['signerNip'] ?? null,
                    ':signer_role'  => $d['signerRole'] ?? 'Kepala Madrasah',
                    ':content_json' => json_encode($d, JSON_UNESCAPED_UNICODE),
                ]);
            }
        }

        // 5. Update Status Sinkronisasi
        $stmtSync = $pdo->prepare("INSERT INTO \`sync_status\` (
            \`id\`, \`last_sync_at\`, \`teachers_count\`, \`students_count\`, \`documents_count\`, \`client_ip\`
        ) VALUES (
            1, NOW(), :teachers, :students, :docs, :ip
        ) ON DUPLICATE KEY UPDATE
            \`last_sync_at\` = NOW(),
            \`teachers_count\` = VALUES(\`teachers_count\`),
            \`students_count\` = VALUES(\`students_count\`),
            \`documents_count\` = VALUES(\`documents_count\`),
            \`client_ip\` = VALUES(\`client_ip\`)");
        $stmtSync->execute([
            ':teachers' => count($teachers),
            ':students' => count($students),
            ':docs'     => count($documents),
            ':ip'       => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
        ]);
        $stmtSync->execute([
            ':teachers' => count($teachers),
            ':students' => count($students),
            ':docs'     => count($documents),
            ':ip'       => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
        ]);

        $pdo->commit();

        // Tulis file cadangan JSON lokal di cPanel
        @file_put_contents(__DIR__ . '/../madrasah-data.json', json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        echo json_encode([
            'success'   => true,
            'message'   => 'Sinkronisasi berhasil! Data tersimpan otomatis di database MySQL ' . DB_NAME,
            'database'  => DB_NAME,
            'user'      => DB_USER,
            'timestamp' => date('Y-m-d H:i:s'),
            'stats'     => [
                'teachers'  => count($teachers),
                'students'  => count($students),
                'documents' => count($documents),
                'rombels'   => count($rombels),
            ],
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;

    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal menyimpan transaksi ke database MySQL: ' . $e->getMessage(),
        ]);
        exit;
    }
}

// METHOD GET: Ambil snapshot data terkini dari MySQL
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Ambil profil
        $stmtProfile = $pdo->query("SELECT * FROM \`madrasah_profil\` WHERE \`id\` = 'madrasah_active' LIMIT 1");
        $dbProfile = $stmtProfile->fetch();

        // Ambil guru
        $stmtTeachers = $pdo->query("SELECT * FROM \`guru_gtk\` ORDER BY \`nama\` ASC");
        $dbTeachers = [];
        while ($row = $stmtTeachers->fetch()) {
            if (!empty($row['raw_data'])) {
                $dbTeachers[] = json_decode($row['raw_data'], true);
            } else {
                $dbTeachers[] = $row;
            }
        }

        // Ambil siswa
        $stmtStudents = $pdo->query("SELECT * FROM \`siswa\` ORDER BY \`nama\` ASC");
        $dbStudents = [];
        while ($row = $stmtStudents->fetch()) {
            if (!empty($row['raw_data'])) {
                $dbStudents[] = json_decode($row['raw_data'], true);
            } else {
                $dbStudents[] = $row;
            }
        }

        // Ambil dokumen
        $stmtDocs = $pdo->query("SELECT * FROM \`dokumen_resmi\` ORDER BY \`updated_at\` DESC");
        $dbDocs = [];
        while ($row = $stmtDocs->fetch()) {
            if (!empty($row['content_json'])) {
                $dbDocs[] = json_decode($row['content_json'], true);
            } else {
                $dbDocs[] = $row;
            }
        }

        // Ambil status sinkronisasi
        $stmtSync = $pdo->query("SELECT * FROM \`sync_status\` WHERE \`id\` = 1 LIMIT 1");
        $syncStatus = $stmtSync->fetch();

        echo json_encode([
            'success'    => true,
            'database'   => DB_NAME,
            'user'       => DB_USER,
            'profile'    => $dbProfile ?: null,
            'teachers'   => $dbTeachers,
            'students'   => $dbStudents,
            'documents'  => $dbDocs,
            'syncStatus' => $syncStatus ?: null,
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Gagal membaca data dari MySQL: ' . $e->getMessage(),
        ]);
        exit;
    }
}
?>`;

  addUniversalApiFile('sync.php', syncPhpContent);

  onProgress?.(60, 'Menyusun berkas verifikasi koneksi (api/health.php & api/test.php)...');

  // 5. api/health.php (JSON diagnostic health check)
  const healthPhpContent = `<?php
/**
 * AutoMadrasah - Endpoint Cek Status MySQL & Server cPanel
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . '/db.php';

try {
    $pdo = getDbConnection();

    // Hitung record pada setiap tabel
    $tables = ['madrasah_profil', 'guru_gtk', 'siswa', 'rombel', 'dokumen_resmi', 'activity_logs', 'sync_status'];
    $counts = [];

    foreach ($tables as $tbl) {
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM \`$tbl\`");
            $res = $stmt->fetch();
            $counts[$tbl] = intval($res['cnt'] ?? 0);
        } catch (Exception $e) {
            $counts[$tbl] = 'Tabel belum ada / error: ' . $e->getMessage();
        }
    }

    echo json_encode([
        'status'         => 'connected',
        'success'        => true,
        'message'        => 'Koneksi ke database MySQL cPanel [' . DB_NAME . '] berhasil aktif!',
        'database'       => DB_NAME,
        'user'           => DB_USER,
        'host'           => DB_HOST,
        'php_version'    => phpversion(),
        'server_time'    => date('Y-m-d H:i:s T'),
        'table_counts'   => $counts,
        'sync_endpoint'  => (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]" . dirname($_SERVER['REQUEST_URI']) . "/sync.php",
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

  addUniversalApiFile('health.php', healthPhpContent);

  // 6. api/test.php (Visual browser-based diagnostics)
  const testPhpContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Tes Koneksi MySQL cPanel - AutoMadrasah</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 p-6 text-slate-800">
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <div class="flex items-center space-x-3 mb-4">
      <div class="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
        AM
      </div>
      <div>
        <h1 class="font-bold text-lg text-slate-900">Uji Koneksi MySQL cPanel AutoMadrasah</h1>
        <p class="text-xs text-slate-500">Database: <code class="text-emerald-700 font-bold">${dbName}</code> | User: <code class="text-emerald-700 font-bold">${dbUser}</code></p>
      </div>
    </div>
    <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-4 text-xs space-y-1">
      <p class="font-bold text-emerald-900">Status Koneksi PDO:</p>
      <?php
      require_once __DIR__ . '/db.php';
      try {
          $pdo = getDbConnection();
          echo '<p class="text-emerald-700 font-semibold">✓ Berhasil terhubung ke database [' . DB_NAME . '] di host [' . DB_HOST . ']!</p>';
          
          $stmt = $pdo->query("SHOW TABLES");
          $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
          echo '<p class="text-slate-600 mt-2 font-medium">Tabel terdeteksi (' . count($tables) . '): ' . implode(', ', $tables) . '</p>';
      } catch (Exception $e) {
          echo '<p class="text-rose-600 font-bold">✗ Gagal: ' . htmlspecialchars($e->getMessage()) . '</p>';
      }
      ?>
    </div>
    <div class="text-xs text-slate-500 border-t pt-3 flex justify-between items-center">
      <span>AutoMadrasah KMA 450/2024</span>
      <a href="../" class="text-emerald-700 font-bold hover:underline">Buka Aplikasi Web &rarr;</a>
    </div>
  </div>
</body>
</html>`;

  addUniversalApiFile('test.php', testPhpContent);

  onProgress?.(70, 'Menyiapkan .htaccess cPanel Apache / LiteSpeed...');

  // 7. .htaccess for cPanel LiteSpeed / Apache
  const htaccessContent = `# ====================================================================
# AUTOMADRASAH CPANEL HOSTING & MYSQL SYNC CONFIGURATION (.htaccess)
# Kompatibel dengan cPanel Apache 2.4+ / LiteSpeed Web Server
# Satuan Pendidikan: ${profile.namaMadrasah} (NSM: ${profile.nsm})
# ====================================================================

# 1. DIRECTORY INDEX PRIORITY
DirectoryIndex index.html index.php

# 2. ENFORCE HTTPS REDIRECTION (cPanel AutoSSL / Let's Encrypt)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Paksa HTTPS
    RewriteCond %{HTTPS} !=on
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # JANGAN REWRITE request ke folder /api/ atau berkas fisik nyata
    RewriteCond %{REQUEST_URI} ^/api/ [NC]
    RewriteRule ^ - [L]

    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # SINGLE PAGE APPLICATION (SPA) ROUTING REWRITE
    RewriteRule ^ index.html [QSA,L]
</IfModule>

# 3. ENABLE CORS FOR CPANEL REST SYNC API
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
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# 5. MIME TYPES
<IfModule mod_mime.c>
    AddType application/json .json
    AddType image/svg+xml .svg
    AddType font/woff2 .woff2
    AddDefaultCharset UTF-8
</IfModule>
`;

  addUniversalFile('.htaccess', htaccessContent);

  onProgress?.(80, 'Menyematkan database.sql siap impor untuk phpMyAdmin...');

  // 8. database.sql with exact database and table creation
  const baseSql = generateMadrasahSqlDump({
    profile,
    teachers,
    students,
    rombels,
    documents,
    logs,
    dbDialect: 'MYSQL',
  });

  const fullCpanelSql = `-- ====================================================================
-- AUTOMADRASAH CPANEL MYSQL DATABASE DUMP
-- Database Name: ${dbName}
-- Database User: ${dbUser}
-- Standar: phpMyAdmin cPanel / MariaDB 10.4+ / MySQL 8.0+
-- Dibuat pada: ${new Date().toLocaleString('id-ID')}
-- ====================================================================

CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`${dbName}\`;

${baseSql}

-- Berikan hak akses untuk user ${dbUser} jika dijalankan oleh root/admin cPanel:
-- GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${dbUser}'@'localhost' IDENTIFIED BY '${dbPass}';
-- FLUSH PRIVILEGES;
`;

  addUniversalFile('database.sql', fullCpanelSql);

  // 9. Snapshot data JSON
  const dataSnapshot = {
    profile,
    teachers,
    students,
    rombels,
    documents,
    logs,
    exportedAt: new Date().toISOString(),
    cpanelConfig: {
      dbHost,
      dbName,
      dbUser,
    },
  };
  const jsonSnapshot = JSON.stringify(dataSnapshot, null, 2);
  addUniversalFile('madrasah-data.json', jsonSnapshot);

  // 10. Starter index.html & index.php
  const indexPhpContent = `<?php
/**
 * AutoMadrasah cPanel Entry Point
 */
if (file_exists(__DIR__ . '/index.html')) {
    include __DIR__ . '/index.html';
} elseif (file_exists(__DIR__ . '/public_html/index.html')) {
    include __DIR__ . '/public_html/index.html';
} else {
    echo "<h1>AutoMadrasah Siap di cPanel</h1><p>Database: ${dbName} | Pengguna: ${dbUser}</p>";
}
?>`;

  addUniversalFile('index.php', indexPhpContent);

  // Production index.html Starter
  const indexHtmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AutoMadrasah - ${profile.namaMadrasah}</title>
  <meta name="description" content="Sistem Otomatisasi Dokumen Resmi Kemenag RI, SK Pembagian Tugas, KOM KMA 450/2024, dan TTE Digital QR Code." />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏛️</text></svg>">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
  <div id="root">
    <!-- Header -->
    <header class="bg-emerald-950 text-white p-4 border-b border-emerald-800 shadow-md">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center font-bold text-lg text-emerald-300">
            AM
          </div>
          <div>
            <h1 class="font-bold text-base leading-tight">${profile.namaMadrasah}</h1>
            <p class="text-xs text-emerald-300">NSM: ${profile.nsm} | NPSN: ${profile.npsn} • KMA 450/2024</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span class="px-3 py-1 bg-emerald-900 text-emerald-200 rounded-full text-xs font-semibold border border-emerald-700 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            cPanel & MySQL Auto-Sync Aktif
          </span>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <h2 class="text-lg font-bold text-slate-900">Portal Dokumen Resmi & Sinkronisasi MySQL</h2>
            <p class="text-xs text-slate-500 mt-1">
              Paket AutoMadrasah telah terpasang pada cPanel hosting. Tersambung ke database <code class="bg-slate-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">${dbName}</code>.
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <a href="api/test.php" target="_blank" class="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold border border-emerald-200 transition-colors">
              Uji Koneksi MySQL &rarr;
            </a>
            <a href="api/health.php" target="_blank" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors">
              Status API JSON
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-6">
          <div class="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
            <h3 class="font-bold text-emerald-950 text-sm mb-1">Dokumen Resmi & SK</h3>
            <p class="text-emerald-800">${documents.length} dokumen tersertifikasi TTE QR Code tersimpan di tabel <code class="font-mono">dokumen_resmi</code>.</p>
          </div>
          <div class="p-4 bg-blue-50/70 rounded-xl border border-blue-200">
            <h3 class="font-bold text-blue-950 text-sm mb-1">Database GTK (Guru)</h3>
            <p class="text-blue-800">${teachers.length} guru aktif tersimpan di tabel <code class="font-mono">guru_gtk</code>.</p>
          </div>
          <div class="p-4 bg-amber-50/70 rounded-xl border border-amber-200">
            <h3 class="font-bold text-amber-950 text-sm mb-1">Peserta Didik (Siswa)</h3>
            <p class="text-amber-800">${students.length} siswa tersimpan di tabel <code class="font-mono">siswa</code>.</p>
          </div>
        </div>

        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <h4 class="font-bold text-slate-800 mb-2">Endpoint REST API Siap Digunakan:</h4>
          <ul class="space-y-1.5 text-slate-600">
            <li><span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono rounded text-[10px] font-bold">POST</span> <code class="font-mono font-semibold">/api/sync.php</code> : Menyimpan / mengupdate data dari AutoMadrasah ke database MySQL.</li>
            <li><span class="px-2 py-0.5 bg-blue-100 text-blue-800 font-mono rounded text-[10px] font-bold">GET</span> <code class="font-mono font-semibold">/api/sync.php</code> : Menarik data terkini dari database MySQL.</li>
            <li><span class="px-2 py-0.5 bg-slate-200 text-slate-800 font-mono rounded text-[10px] font-bold">GET</span> <code class="font-mono font-semibold">/api/health.php</code> : Memeriksa koneksi dan jumlah baris data MySQL.</li>
          </ul>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
      © ${new Date().getFullYear()} ${profile.namaMadrasah} • AutoMadrasah cPanel & MySQL Auto-Sync Package
    </footer>
  </div>
</body>
</html>`;

  addUniversalFile('index.html', indexHtmlContent);

  onProgress?.(85, 'Menyematkan berkas kompabilitas Plesk & IIS (web.config, plesk-nginx.conf, app.js)...');

  // 11. web.config for Plesk on Windows Server / IIS (Aman jika dihosting di Plesk / IIS)
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
        <rule name="AutoMadrasah API Direct" stopProcessing="true">
          <match url="^api/(.*)" />
          <action type="None" />
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

  addUniversalFile('web.config', webConfigContent);

  // 12. plesk-nginx.conf for Plesk Reverse Proxy
  const nginxConfContent = `# ====================================================================
# PLESK & CPANEL NGINX REVERSE PROXY DIRECTIVES
# Satuan Pendidikan: ${profile.namaMadrasah}
# ====================================================================

# 1. API Pass-through
location /api/ {
    try_files $uri $uri/ =404;
}

# 2. SPA Fallback Routing
location / {
    try_files $uri $uri/ /index.html;
}

# 3. Static Asset Caching
location ~* \\.(?:css|js|jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc|woff2|woff)$ {
    expires 1M;
    access_log off;
    add_header Cache-Control "public";
}

# 4. Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
`;

  addUniversalFile('plesk-nginx.conf', nginxConfContent);

  // 13. Node.js Express Passenger Server for Plesk / cPanel Node.js Selector
  const serverJsContent = `// AutoMadrasah Express Server for cPanel & Plesk Node.js Selector
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Menemukan direktori web statis baik di public_html, httpdocs, atau root
const staticDir = fs.existsSync(path.join(__dirname, 'public_html'))
  ? path.join(__dirname, 'public_html')
  : (fs.existsSync(path.join(__dirname, 'httpdocs'))
      ? path.join(__dirname, 'httpdocs')
      : __dirname);

app.use(express.static(staticDir));
app.use(express.json());

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    madrasah: '${profile.namaMadrasah}',
    version: '1.0.0',
    platform: 'cPanel & Plesk Dual-Compatible Node.js',
    database: '${dbName}',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/data', (req, res) => {
  const dataPath = path.join(staticDir, 'madrasah-data.json');
  if (fs.existsSync(dataPath)) {
    res.sendFile(dataPath);
  } else {
    res.json({ status: 'ok', madrasah: '${profile.namaMadrasah}' });
  }
});

// SPA Fallback for all other routes
app.get('*', (req, res) => {
  const indexPath = path.join(staticDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('<h1>AutoMadrasah Server Ready</h1><p>${profile.namaMadrasah}</p>');
  }
});

app.listen(PORT, () => {
  console.log('AutoMadrasah Server running on port ' + PORT);
});
`;

  addUniversalFile('app.js', serverJsContent);
  addUniversalFile('server.js', serverJsContent);

  const packageJsonContent = {
    name: `automadrasah-${profile.namaMadrasah.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    version: '1.0.0',
    description: `AutoMadrasah Universal Deployment Package for ${profile.namaMadrasah}`,
    main: 'app.js',
    scripts: {
      start: 'node app.js',
    },
    dependencies: {
      express: '^4.21.2',
    },
  };

  addUniversalFile('package.json', JSON.stringify(packageJsonContent, null, 2));

  // 14. Panduan Lengkap Plesk (PLESK_DEPLOYMENT_GUIDE.md)
  const pleskGuideContent = `# PANDUAN LENGKAP DEPLOYMENT PLESK OBSIDIAN / ONYX
**Satuan Pendidikan**: ${profile.namaMadrasah}
**NSM**: ${profile.nsm} | **NPSN**: ${profile.npsn}

Paket ZIP ini kompatibel 100% dengan Plesk Control Panel maupun cPanel:
1. Web Root Direktori di Plesk: \`httpdocs\`
2. Database: \`${dbName}\` (MariaDB / MySQL)
3. Ekstrak ZIP langsung di root domain hosting Anda, folder \`httpdocs/\` dan \`public_html/\` akan otomatis terisi seluruh berkas lengkap tanpa kehilangan file sebelumnya.
`;
  addUniversalFile('PLESK_DEPLOYMENT_GUIDE.md', pleskGuideContent);
  addUniversalFile('BACA_PANDUAN_PLESK.txt', `PANDUAN PLESK:
Ekstrak arsip ini ke httpdocs di Plesk Anda. Berkas web.config, plesk-nginx.conf, database.sql, dan REST API sudah siap.`);

  // 15. Surat & Jaminan Keamanan Berkas Lama (Anti-Hilang)
  const fileSecurityContent = `================================================================================
INFORMASI JAMINAN KEUTUHAN BERKAS PLESK & CPANEL (TIDAK AKAN HILANG)
Lembaga : ${profile.namaMadrasah}
NSM     : ${profile.nsm} | NPSN: ${profile.npsn}
Database: ${dbName} (MySQL / MariaDB)
================================================================================

PERTANYAAN PENTING:
"Apakah file lengkap dari Plesk yang sebelumnya diunggah ke cPanel akan hilang
setelah ditimpa oleh file ZIP ini?"

JAWABAN RESMI:
SAMA SEKALI TIDAK AKAN HILANG.

PENJELASAN TEKNIS & KEAMANAN:
1. ARSIP UNIVERSAL HYBRID (cPanel + Plesk):
   Paket ZIP ini didesain secara khusus sebagai paket gabungan universal:
   - Direktori \`public_html/\` (standar cPanel)
   - Direktori \`httpdocs/\` (standar Plesk Obsidian/Onyx)
   - Direktori Root (fallback server)
   Semua berkas Plesk lengkap (termasuk \`web.config\`, \`plesk-nginx.conf\`,
   server Node.js \`app.js\`, \`server.js\`, \`package.json\`, dan panduan Plesk)
   disertakan secara lengkap di dalam ZIP ini.

2. KEAMANAN TIMPA (OVERWRITE BEHAVIOR):
   - Sistem ekstraksi cPanel File Manager (unzip) hanya menimpa (overwrite)
     berkas yang memiliki nama persis sama.
   - Berkas/folder lain yang ada di hosting Anda (misal: folder \`uploads/\`,
     foto guru/siswa, lampiran PDF lama, dokumen arsip lokal, dsb.)
     SAMA SEKALI TIDAK AKAN TERHAPUS.

3. KONEKSI DATABASE SINKRONISASI:
   - Database MySQL yang ditargetkan adalah: ${dbName}
   - Pengguna MySQL: ${dbUser}
   - Skema database di \`database.sql\` dan REST API di \`/api/sync.php\`
     menggunakan klausa UPDATE/REPLACE yang aman tanpa menghapus data tabel lainnya.

4. CARA EKSTRAKSI YANG DIREKOMENDASIKAN:
   - Jika mengekstrak di direktori home cPanel (\`/home/username\`):
     Folder \`public_html/\` dan \`httpdocs/\` otomatis diperbarui bersamaan.
   - Jika mengekstrak langsung di dalam \`public_html\`:
     Seluruh berkas web dan API langsung aktif tanpa perlu memindahkan folder.

Diterbitkan otomatis oleh Sistem AutoMadrasah Kemenag RI
================================================================================
`;
  addUniversalFile('JAMINAN_KEAMANAN_BERKAS.txt', fileSecurityContent);

  onProgress?.(90, 'Menyusun buku panduan instalasi cPanel (CPANEL_DEPLOY_GUIDE.md)...');

  // 11. Complete Indonesian Deployment Guide for cPanel
  const guideContent = `# PANDUAN LENGKAP INSTALASI & SINKRONISASI OTOMATIS CPANEL DENGAN MYSQL
**Satuan Pendidikan**: ${profile.namaMadrasah}
**NSM**: ${profile.nsm} | **NPSN**: ${profile.npsn}
**Versi**: 1.0.0 (KMA 450/2024 & Kurikulum Berbasis Cinta)

---

## PENTING: JAMINAN KEUTUHAN BERKAS PLESK DI CPANEL (TIDAK AKAN HILANG)
Jika Anda sebelumnya mengunggah berkas dari **Plesk** ke hosting cPanel Anda, **SEMUA BERKAS LENGKAP PLESK ANDA TETAP AMAN DAN TIDAK AKAN HILANG**:
1. **Paket Universal Dual-Platform**: ZIP ini secara otomatis menyertakan folder \`public_html/\` (standar cPanel) DAN \`httpdocs/\` (standar Plesk), beserta berkas \`web.config\`, \`plesk-nginx.conf\`, serta server Node.js (\`app.js\`, \`server.js\`, \`package.json\`).
2. **Sistem Ekstraksi Aman**: cPanel File Manager saat mengekstrak ZIP ini hanya memperbarui berkas yang bersesuaian, **TIDAK MENGHAPUS** folder/berkas lampiran PDF, foto, berkas pendaftaran, atau direktori kustom madrasah yang sudah ada.
3. Seluruh data disinkronkan langsung ke database MySQL \`${dbName}\`.

---

## KREDENSIAL DATABASE MYSQL YANG DIKONFIGURASIKAN:
- **Database Host**: \`${dbHost}\`
- **Database Name**: \`${dbName}\`
- **Database User**: \`${dbUser}\`
- **Password**: \`${dbPass}\`

---

## DAFTAR BERKAS DI DALAM PAKET ZIP INI:
1. \`public_html/\` : Folder utama web root cPanel.
   - \`config.php\` : Berkas konfigurasi koneksi MySQL cPanel.
   - \`api/db.php\` : Konektor PDO MySQL dengan inisialisasi tabel otomatis (*Auto Migration*).
   - \`api/sync.php\` : Endpoint REST API sinkronisasi data dua arah (POST: simpan, GET: tarik data).
   - \`api/health.php\` : Endpoint verifikasi koneksi MySQL dan status tabel.
   - \`api/test.php\` : Halaman web pengujian koneksi database langsung di browser.
   - \`.htaccess\` : Konfigurasi LiteSpeed / Apache, HTTPS AutoSSL redirect, dan CORS header.
   - \`database.sql\` : Skema SQL dump siap impor di phpMyAdmin.
   - \`madrasah-data.json\` : Cadangan data snapshot JSON lengkap.
   - \`index.html\` & \`index.php\` : Halaman beranda web portal madrasah.

---

## LANGKAH-LANGKAH PEMASANGAN DI CPANEL:

### LANGKAH 1: MEMBUAT DATABASE & USER DI CPANEL
1. Buka dan login ke panel **cPanel** hosting madrasah Anda (misal: \`https://namadomain.sch.id:2083\`).
2. Masuk ke menu **MySQL Databases** (atau **MySQL Database Wizard**).
3. **Buat Database Baru**:
   - Beri nama database: \`${dbName}\`
   - Klik **Create Database**.
4. **Buat Pengguna MySQL Baru**:
   - Username: \`${dbUser}\`
   - Password: \`${dbPass}\`
   - Klik **Create User**.
5. **Hubungkan User ke Database**:
   - Pada bagian *Add User to Database*, pilih User: \`${dbUser}\` dan Database: \`${dbName}\`.
   - Klik **Add**.
   - Centang opsi **ALL PRIVILEGES** (Semua Hak Akses).
   - Klik **Make Changes**.

---

### LANGKAH 2: EKSTRAK FILE ZIP KE PUBLIC_HTML
1. Di cPanel, buka menu **File Manager**.
2. Masuk ke folder **\`public_html\`** (atau subdomain madrasah Anda).
3. Klik tombol **Upload** di bagian atas -> Pilih berkas ZIP ini (\`AUTOMADRASAH_CPANEL_MYSQL_SYNC.zip\`).
4. Setelah selesai diunggah, klik kanan berkas ZIP -> Klik **Extract** -> Ekstrak ke dalam \`public_html\`.
5. Pastikan berkas \`config.php\`, folder \`api/\`, \`.htaccess\`, dan \`index.html\` sudah berada di dalam \`public_html\`.

---

### LANGKAH 3 (OPSIONAL): IMPOR DATABASE.SQL
*Catatan: Sistem AutoMadrasah memiliki fitur **Auto-Create Tables** saat pertama kali API diakses. Namun jika ingin mengimpor manual melalui phpMyAdmin:*
1. Di cPanel, buka menu **phpMyAdmin**.
2. Pilih database \`${dbName}\` di bilah kiri.
3. Klik tab **Import** di bagian atas.
4. Klik **Choose File** -> Pilih berkas \`database.sql\`.
5. Klik **Go** / **Kirim**. Seluruh tabel dan data awal akan langsung terbuat!

---

### LANGKAH 4: PENGUJIAN KONEKSI
Buka browser dan akses alamat berikut:
\`https://namadomain.sch.id/api/test.php\`
Atau:
\`https://namadomain.sch.id/api/health.php\`

Jika muncul status **connected** atau tanda centang hijau, maka koneksi ke database MySQL \`${dbName}\` telah aktif dan siap digunakan secara otomatis!

---

### LANGKAH 5: MENGHUBUNGKAN AUTO-SYNC DARI APLIKASI
1. Buka aplikasi AutoMadrasah di komputer Anda.
2. Masuk ke menu **Pengaturan & Sinkronisasi** (atau klik kartu **cPanel & MySQL Auto-Sync** di Dashboard).
3. Pada isian **URL Endpoint cPanel**, masukkan:
   \`https://namadomain.sch.id/api/sync.php\`
4. Aktifkan opsi **Penyimpanan Otomatis (Real-time Auto-Sync)**.
5. Klik tombol **Sinkronkan Sekarang ke MySQL**.
6. Selesai! Seluruh perubahan data profil, guru, siswa, SK pembagian tugas, dan KOM akan otomatis tersimpan langsung ke MySQL cPanel Anda!

---
*Diterbitkan otomatis oleh Generator AutoMadrasah Kemenag RI*
`;

  addUniversalFile('CPANEL_DEPLOY_GUIDE.md', guideContent);

  const quickTxt = `PANDUAN SINGKAT CPANEL & MYSQL (DUAL-PLATFORM CPANEL + PLESK):
1. Buat Database "${dbName}" dan User "${dbUser}" (Password: "${dbPass}") di cPanel -> MySQL Databases. Beri ALL PRIVILEGES.
2. Upload dan Ekstrak ZIP ini di folder public_html (atau httpdocs untuk Plesk).
3. SEMUA BERKAS LENGKAP PLESK (web.config, plesk-nginx.conf, node app.js, dsb.) SUDAH DISERTAKAN LENGKAP DAN TIDAK AKAN HILANG.
4. Buka https://namadomain/api/health.php untuk memastikan status "connected".
5. Buka file CPANEL_DEPLOY_GUIDE.md atau JAMINAN_KEAMANAN_BERKAS.txt untuk panduan lengkap.`;

  addUniversalFile('BACA_PANDUAN_CPANEL.txt', quickTxt);

  onProgress?.(98, 'Mengompresi seluruh arsip berkas cPanel ZIP...');

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    },
    (metadata) => {
      onProgress?.(
        Math.round(metadata.percent),
        `Mengompresi arsip ZIP cPanel: ${Math.round(metadata.percent)}%`
      );
    }
  );

  onProgress?.(100, 'Paket ZIP cPanel & MySQL Auto-Sync siap diunduh!');
  return zipBlob;
};

/**
 * Trigger otomatis unduh berkas ZIP cPanel di browser
 * Mengunduh paket aplikasi web React lengkap (Vite SPA) + backend PHP REST API & MySQL dump
 */
export const downloadCpanelZip = async (
  options: CpanelExportOptions,
  onProgress?: (percent: number, message: string) => void
): Promise<void> => {
  const safeName = options.profile.namaMadrasah
    ? options.profile.namaMadrasah.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()
    : 'MADRASAH';
  const fileName = `AUTOMADRASAH_CPANEL_FULL_APP_${safeName}_${Date.now()}.zip`;

  onProgress?.(15, 'Menghubungkan ke pembuat paket aplikasi cPanel lengkap...');

  // 1. Coba request paket produksi lengkap (React App dist + PHP MySQL REST API) dari server
  try {
    const res = await fetch('/api/export/cpanel-bundle', {
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
        dbName: options.dbName || 'masbagoes_adm',
        dbUser: options.dbUser || 'masbagoes_adm',
        dbPass: options.dbPass || 'masbagus15',
        dbHost: options.dbHost || 'localhost',
        domainName: options.domainName || 'dok-madrasah.masbagoes.web.id',
      }),
    });

    if (res.ok) {
      onProgress?.(80, 'Mengunduh paket aplikasi cPanel lengkap (.zip)...');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      onProgress?.(100, 'Paket aplikasi cPanel lengkap siap dipasang!');
      return;
    }
  } catch (err) {
    console.warn('Gagal memanggil API exporter server, beralih ke generator JSZip client:', err);
  }

  // 2. Fallback client-side generator jika server API tidak dapat dijangkau
  const blob = await generateCpanelDeploymentZip(options, onProgress);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
