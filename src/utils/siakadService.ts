import { Teacher, Student, MadrasahProfile, SiakadSyncConfig, SiakadSyncResult } from '../types';

const SIAKAD_CONFIG_KEY = 'automadrasah_siakad_config_v1';

export const DEFAULT_SIAKAD_CONFIG: SiakadSyncConfig = {
  baseUrl: 'https://siakad-madrasah.jaenalmaskun.biz.id',
  apiToken: '',
  username: '',
  password: '',
  autoSync: false,
  lastSyncAt: undefined,
  lastSyncStatus: 'IDLE',
  lastSyncMessage: 'Belum pernah disinkronkan',
  customEndpoints: {
    students: '/api/v1/students',
    teachers: '/api/v1/teachers',
    profile: '/api/v1/school-profile',
  },
};

export function getSiakadConfig(): SiakadSyncConfig {
  try {
    const raw = localStorage.getItem(SIAKAD_CONFIG_KEY);
    if (!raw) return DEFAULT_SIAKAD_CONFIG;
    return { ...DEFAULT_SIAKAD_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SIAKAD_CONFIG;
  }
}

export function saveSiakadConfig(config: Partial<SiakadSyncConfig>): SiakadSyncConfig {
  const current = getSiakadConfig();
  const updated: SiakadSyncConfig = { ...current, ...config };
  try {
    localStorage.setItem(SIAKAD_CONFIG_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save Siakad config', err);
  }
  return updated;
}

// Map raw incoming teacher object from Siakad / ARD / EMIS into Teacher schema
export function mapRawToTeacher(item: any, idx: number): Teacher {
  const nama = item.nama || item.name || item.nama_lengkap || item.nama_guru || `Guru #${idx + 1}`;
  const nip = item.nip || item.NIP || (item.nip === '-' ? '' : item.nip) || '';
  const nuptk = item.nuptk || item.NUPTK || (item.nuptk === '-' ? '' : item.nuptk) || '';
  const pegId = item.peg_id || item.pegId || item.id_pegawai || '';
  
  let jk: 'L' | 'P' = 'L';
  const rawJk = (item.jenis_kelamin || item.jk || item.gender || 'L').toString().toUpperCase();
  if (rawJk.startsWith('P') || rawJk === 'WANITA' || rawJk === 'FEMALE') {
    jk = 'P';
  }

  return {
    id: item.id ? String(item.id) : `T-${Date.now()}-${idx + 1}`,
    nama: nama,
    gelarDepan: item.gelar_depan || item.gelarDepan || '',
    gelarBelakang: item.gelar_belakang || item.gelarBelakang || (nama.includes(',') ? nama.split(',').slice(1).join(',').trim() : ''),
    nip: nip,
    nuptk: nuptk,
    pegId: pegId,
    jenisKelamin: jk,
    tempatLahir: item.tempat_lahir || item.tempatLahir || 'Malang',
    tanggalLahir: item.tanggal_lahir || item.tanggalLahir || '1985-05-15',
    statusKepegawaian: item.status_kepegawaian || item.statusKepegawaian || (nip ? 'PNS' : 'GTY'),
    pangkatGol: item.pangkat_gol || item.pangkatGol || (nip ? 'Penata Muda / III/a' : 'Guru Tetap'),
    jabatanUtama: item.jabatan_utama || item.jabatan || item.jabatanUtama || 'Guru Mata Pelajaran',
    tugasTambahan: item.tugas_tambahan || item.tugasTambahan || (item.wali_kelas ? `Wali Kelas ${item.wali_kelas}` : ''),
    mapelUtama: item.mapel_utama || item.mapel || item.mata_pelajaran || 'Pendidikan Agama Islam',
    jumlahJam: Number(item.jumlah_jam || item.jumlahJam || item.jp || 24),
    waliKelasDi: item.wali_kelas || item.waliKelasDi || item.kelas_wali || '',
    sertifikasi: Boolean(item.sertifikasi === true || item.sertifikasi === '1' || item.is_certified === true),
    telepon: item.telepon || item.no_hp || item.phone || '08123456789',
    email: item.email || `${nama.toLowerCase().replace(/[^a-z0-9]/g, '')}@madrasah.sch.id`,
    isActive: item.is_active !== undefined ? Boolean(item.is_active) : true,
    signatureUrl: item.signature_url || item.signatureUrl || undefined,
  };
}

// Map raw incoming student object from Siakad / ARD / EMIS into Student schema
export function mapRawToStudent(item: any, idx: number): Student {
  const nama = item.nama || item.name || item.nama_lengkap || item.nama_siswa || `Siswa #${idx + 1}`;
  const nisn = item.nisn || item.NISN || `00${Date.now().toString().slice(-8)}${idx}`;
  const nis = item.nis || item.NIS || `MI-${2025000 + idx + 1}`;
  const nik = item.nik || item.NIK || `350700000000${(idx + 1).toString().padStart(4, '0')}`;
  
  let jk: 'L' | 'P' = 'L';
  const rawJk = (item.jenis_kelamin || item.jk || item.gender || 'L').toString().toUpperCase();
  if (rawJk.startsWith('P') || rawJk === 'WANITA' || rawJk === 'PEREMPUAN' || rawJk === 'FEMALE') {
    jk = 'P';
  }

  const rombel = item.rombel || item.kelas || item.nama_kelas || 'Kelas 1 A';
  const tingkatMatch = rombel.match(/\d+/);
  const tingkat = tingkatMatch ? parseInt(tingkatMatch[0], 10) : Number(item.tingkat || 1);

  return {
    id: item.id ? String(item.id) : `S-${Date.now()}-${idx + 1}`,
    nisn: nisn,
    nis: nis,
    nik: nik,
    nama: nama,
    jenisKelamin: jk,
    rombel: rombel,
    tingkat: isNaN(tingkat) ? 1 : tingkat,
    tempatLahir: item.tempat_lahir || item.tempatLahir || 'Malang',
    tanggalLahir: item.tanggal_lahir || item.tanggalLahir || '2015-08-20',
    namaAyah: item.nama_ayah || item.ayah || item.namaAyah || 'Bapak Siswa',
    namaIbu: item.nama_ibu || item.ibu || item.namaIbu || 'Ibu Siswa',
    pekerjaanOrtu: item.pekerjaan_ortu || item.pekerjaan || item.pekerjaanOrtu || 'Wiraswasta',
    alamat: item.alamat || item.alamat_lengkap || 'Jl. Madrasah No. 10',
    desaKelurahan: item.desa || item.kelurahan || item.desaKelurahan || 'Sukamaju',
    kecamatan: item.kecamatan || 'Kepanjen',
    kabupatenKota: item.kabupaten || item.kabupatenKota || 'Kabupaten Malang',
    provinsi: item.provinsi || 'Jawa Timur',
    statusSiswa: item.status || item.statusSiswa || 'Aktif',
    tahunMasuk: String(item.tahun_masuk || item.tahunMasuk || '2024'),
    teleponOrtu: item.telepon_ortu || item.no_hp_ortu || item.teleponOrtu || '085700000000',
  };
}

/**
 * Execute Sync request via Backend Proxy or direct fetch
 */
export async function fetchSiakadData(
  target: 'all' | 'teachers' | 'students' | 'profile',
  configOverrides?: Partial<SiakadSyncConfig>
): Promise<SiakadSyncResult> {
  const config = { ...getSiakadConfig(), ...(configOverrides || {}) };
  const baseUrl = (config.baseUrl || 'https://siakad-madrasah.jaenalmaskun.biz.id').replace(/\/$/, '');

  try {
    // Attempt backend proxy first to avoid browser CORS limitation
    const response = await fetch('/api/siakad/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        baseUrl,
        apiToken: config.apiToken,
        username: config.username,
        password: config.password,
        target,
        customEndpoints: config.customEndpoints,
      }),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error || `Server proxy mengembalikan status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (backendError: any) {
    console.warn('Backend proxy sync failed, attempting direct or client fallback:', backendError);

    // If backend proxy had an error or not available, provide informative error or direct fallback
    return {
      success: false,
      message: `Gagal menyinkronkan data dengan ${baseUrl}: ${backendError.message}`,
      errors: [backendError.message],
    };
  }
}

/**
 * Test Connection to Siakad
 */
export async function testSiakadConnection(configOverrides?: Partial<SiakadSyncConfig>): Promise<{ success: boolean; message: string; details?: any }> {
  const config = { ...getSiakadConfig(), ...(configOverrides || {}) };
  const baseUrl = (config.baseUrl || 'https://siakad-madrasah.jaenalmaskun.biz.id').replace(/\/$/, '');

  try {
    const res = await fetch('/api/siakad/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        baseUrl,
        apiToken: config.apiToken,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: `Koneksi ke ${baseUrl} gagal: ${error.message}`,
    };
  }
}
