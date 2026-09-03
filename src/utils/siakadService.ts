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
  const tingkatMatch = String(rombel).match(/\d+/);
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
 * Safely parse JSON or handle HTML/error responses without throwing SyntaxError
 */
async function safeFetchJson(url: string, options?: RequestInit): Promise<{ ok: boolean; data: any; isHtml: boolean; rawText: string }> {
  try {
    const res = await fetch(url, options);
    const rawText = await res.text();
    const trimmed = rawText.trim();
    if (trimmed.startsWith('<') || trimmed.startsWith('<!doctype') || trimmed.startsWith('<!DOCTYPE')) {
      return { ok: false, data: null, isHtml: true, rawText };
    }
    try {
      const data = JSON.parse(rawText);
      return { ok: res.ok, data, isHtml: false, rawText };
    } catch {
      return { ok: false, data: null, isHtml: false, rawText };
    }
  } catch (err: any) {
    return { ok: false, data: null, isHtml: false, rawText: err.message || 'Network error' };
  }
}

/**
 * Direct Client-Side Fetch to SIAKAD API
 * (SIAKAD server has Access-Control-Allow-Origin: * so browser can connect directly)
 */
async function fetchSiakadDirect(
  baseUrl: string,
  target: 'all' | 'teachers' | 'students' | 'profile',
  apiToken?: string
): Promise<SiakadSyncResult> {
  const root = baseUrl.replace(/\/$/, '');
  const headers: Record<string, string> = {
    'Accept': 'application/json, */*',
  };
  if (apiToken) {
    headers['Authorization'] = `Bearer ${apiToken}`;
  }

  let teachers: Teacher[] = [];
  let students: Student[] = [];
  let profileData: any = null;
  const errors: string[] = [];

  // Helper to extract list from site_settings or table API
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
    return [];
  };

  // 1. Fetch Teachers
  if (target === 'all' || target === 'teachers') {
    const teacherUrls = [
      `${root}/api.php?action=select&table=site_settings&id=data_guru`,
      `${root}/api.php?action=select&table=site_settings`,
    ];
    let fetched = false;
    for (const url of teacherUrls) {
      const res = await safeFetchJson(url, { headers });
      if (res.data) {
        const list = extractList(res.data, 'guru');
        if (Array.isArray(list) && list.length > 0) {
          teachers = list.map(mapRawToTeacher);
          fetched = true;
          break;
        }
      }
    }
    if (!fetched) {
      errors.push(`Data guru di ${root} tidak ditemukan`);
    }
  }

  // 2. Fetch Students
  if (target === 'all' || target === 'students') {
    const studentUrls = [
      `${root}/api.php?action=select&table=site_settings&id=students_data`,
      `${root}/api.php?action=select&table=site_settings`,
    ];
    let fetched = false;
    for (const url of studentUrls) {
      const res = await safeFetchJson(url, { headers });
      if (res.data) {
        const list = extractList(res.data, 'siswa');
        if (Array.isArray(list) && list.length > 0) {
          students = list.map(mapRawToStudent);
          fetched = true;
          break;
        }
      }
    }
    if (!fetched) {
      errors.push(`Data siswa di ${root} tidak ditemukan`);
    }
  }

  // 3. Fetch Profile
  if (target === 'all' || target === 'profile') {
    const pRes = await safeFetchJson(`${root}/api.php?action=select&table=site_settings&id=identitas_madrasah`, { headers });
    if (pRes.data?.data?.value) {
      profileData = pRes.data.data.value;
    }
  }

  const hasData = teachers.length > 0 || students.length > 0;
  return {
    success: hasData || errors.length === 0,
    message: hasData
      ? `Berhasil sinkronisasi langsung: ${teachers.length} Guru & ${students.length} Siswa dari ${root}`
      : `Terhubung ke ${root}, namun data belum tersedia.`,
    teachersCount: teachers.length,
    studentsCount: students.length,
    teachers: teachers.length > 0 ? teachers : undefined,
    students: students.length > 0 ? students : undefined,
    profile: profileData || undefined,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Execute Sync request via Backend Proxy with seamless direct Client-Side Fallback
 */
export async function fetchSiakadData(
  target: 'all' | 'teachers' | 'students' | 'profile',
  configOverrides?: Partial<SiakadSyncConfig>
): Promise<SiakadSyncResult> {
  const config = { ...getSiakadConfig(), ...(configOverrides || {}) };
  const baseUrl = (config.baseUrl || 'https://siakad-madrasah.jaenalmaskun.biz.id').replace(/\/$/, '');

  // 1. Attempt backend proxy first
  try {
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

    const rawText = await response.text();
    if (!rawText.trim().startsWith('<') && !rawText.trim().startsWith('<!')) {
      const data = JSON.parse(rawText);
      if (data && (data.teachers?.length || data.students?.length || data.success)) {
        return data;
      }
    }
  } catch (backendError: any) {
    console.warn('Backend proxy sync failed, switching to direct client fetch:', backendError);
  }

  // 2. Direct client fallback (utilizes CORS Access-Control-Allow-Origin: *)
  try {
    const directResult = await fetchSiakadDirect(baseUrl, target, config.apiToken);
    return directResult;
  } catch (directError: any) {
    return {
      success: false,
      message: `Gagal menyinkronkan data dengan ${baseUrl}: ${directError.message || 'Periksa koneksi internet'}`,
      errors: [directError.message || 'Koneksi gagal'],
    };
  }
}

/**
 * Test Connection to Siakad with safe parsing and direct fallback
 */
export async function testSiakadConnection(configOverrides?: Partial<SiakadSyncConfig>): Promise<{
  success: boolean;
  message: string;
  details?: any;
  teachersCount?: number;
  studentsCount?: number;
  madrasahName?: string;
}> {
  const config = { ...getSiakadConfig(), ...(configOverrides || {}) };
  const baseUrl = (config.baseUrl || 'https://siakad-madrasah.jaenalmaskun.biz.id').replace(/\/$/, '');

  // 1. Try Backend Proxy
  try {
    const res = await fetch('/api/siakad/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        baseUrl,
        apiToken: config.apiToken,
      }),
    });

    const rawText = await res.text();
    if (!rawText.trim().startsWith('<') && !rawText.trim().startsWith('<!')) {
      const data = JSON.parse(rawText);
      if (data && typeof data.success === 'boolean') {
        return data;
      }
    }
  } catch {
    // If backend proxy fails or returns HTML, continue to direct client probe
  }

  // 2. Direct client probe (CORS enabled on SIAKAD server)
  try {
    const headers: Record<string, string> = { 'Accept': 'application/json, */*' };
    if (config.apiToken) {
      headers['Authorization'] = `Bearer ${config.apiToken}`;
    }

    const [identitasRes, guruRes, siswaRes] = await Promise.all([
      safeFetchJson(`${baseUrl}/api.php?action=select&table=site_settings&id=identitas_madrasah`, { headers }),
      safeFetchJson(`${baseUrl}/api.php?action=select&table=site_settings&id=data_guru`, { headers }),
      safeFetchJson(`${baseUrl}/api.php?action=select&table=site_settings&id=students_data`, { headers }),
    ]);

    const madrasahName = identitasRes.data?.data?.value?.nama_madrasah || identitasRes.data?.nama_madrasah || '';
    const teachersList = Array.isArray(guruRes.data?.data?.value)
      ? guruRes.data.data.value
      : Array.isArray(guruRes.data?.data)
      ? guruRes.data.data
      : [];
    const studentsList = Array.isArray(siswaRes.data?.data?.value)
      ? siswaRes.data.data.value
      : Array.isArray(siswaRes.data?.data)
      ? siswaRes.data.data
      : [];

    const isOnline = Boolean(identitasRes.data || guruRes.data || siswaRes.data);
    if (!isOnline) {
      return {
        success: false,
        message: `Tidak dapat terhubung ke ${baseUrl}. Server tidak merespons atau sedang offline.`,
      };
    }

    return {
      success: true,
      teachersCount: teachersList.length,
      studentsCount: studentsList.length,
      madrasahName: madrasahName || 'SIAKAD Madrasah',
      message: `Koneksi berhasil! Terhubung ke SIAKAD ${madrasahName ? `(${madrasahName})` : ''} - Terdeteksi ${teachersList.length} Guru & ${studentsList.length} Siswa di database.`,
      details: {
        teachersCount: teachersList.length,
        studentsCount: studentsList.length,
        madrasahName: madrasahName || 'SIAKAD Madrasah',
        targetUrl: baseUrl,
      },
    };
  } catch (directError: any) {
    return {
      success: false,
      message: `Koneksi ke ${baseUrl} gagal: ${directError.message || 'Tidak dapat menjangkau server'}`,
    };
  }
}
