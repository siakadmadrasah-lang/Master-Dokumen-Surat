import { Teacher, Student, MadrasahProfile, SiakadSyncConfig, SiakadSyncResult, StatusKepegawaian } from '../types';

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
    students: '/api.php?action=select&table=site_settings&id=students_data',
    teachers: '/api.php?action=select&table=site_settings&id=data_guru',
    profile: '/api.php?action=select&table=site_settings&id=identitas_madrasah',
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
  let statusKep: StatusKepegawaian = 'GTY';
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

  const rawTglLahir = item.tanggal_lahir || item.tanggalLahir || '';
  const safeTglLahir = (rawTglLahir && String(rawTglLahir).includes('-')) ? String(rawTglLahir) : '1980-01-01';

  return {
    id: item.id ? String(item.id) : `T-${Date.now()}-${idx + 1}`,
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
    signatureUrl: item.foto_url || item.foto || item.signature_url || item.signatureUrl || undefined,
  };
}

// Map raw incoming student object from Siakad / ARD / EMIS into Student schema
export function mapRawToStudent(item: any, idx: number): Student {
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
  const tingkatMatch = rombel.match(/\d+/);
  const tingkat = tingkatMatch ? parseInt(tingkatMatch[0], 10) : Number(item.tingkat || 1);

  const rawTglLahir = item.tanggal_lahir || item.tanggalLahir || '';
  const safeTglLahir = (rawTglLahir && String(rawTglLahir).includes('-')) ? String(rawTglLahir) : '2016-01-01';

  return {
    id: item.id ? String(item.id) : `S-${Date.now()}-${idx + 1}`,
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
