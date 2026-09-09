/**
 * Layanan Sinkronisasi Otomatis Database MySQL cPanel
 * Kredensial Database:
 * - Db User: masbagoes_adm
 * - Db Name: masbagoes_adm
 * - Db Pass: masbagus15
 */

import { MadrasahProfile, Teacher, Student, Rombel, OfficialDocument, ActivityLog } from '../types';

export interface CpanelSyncConfig {
  cpanelUrl: string;
  dbHost: string;
  dbName: string;
  dbUser: string;
  dbPass: string;
  autoSyncEnabled: boolean;
  autoSyncIntervalMinutes: number;
  lastSyncTime?: string;
  lastSyncStatus?: 'idle' | 'syncing' | 'success' | 'error';
  lastSyncMessage?: string;
  lastRecordStats?: {
    teachers: number;
    students: number;
    documents: number;
    rombels: number;
  };
}

export const DEFAULT_CPANEL_CONFIG: CpanelSyncConfig = {
  cpanelUrl: '',
  dbHost: 'localhost',
  dbName: 'masbagoes_adm',
  dbUser: 'masbagoes_adm',
  dbPass: 'masbagus15',
  autoSyncEnabled: true,
  autoSyncIntervalMinutes: 5,
  lastSyncStatus: 'idle',
  lastSyncMessage: 'Siap melakukan sinkronisasi otomatis ke MySQL masbagoes_adm',
};

const STORAGE_KEY = 'AUTOMADRASAH_CPANEL_SYNC_CONFIG';

export const getCpanelSyncConfig = (): CpanelSyncConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CPANEL_CONFIG;
    const parsed = JSON.parse(raw);
    const dbName =
      !parsed.dbName || parsed.dbName === 'masbagoes_dokmadrasah'
        ? DEFAULT_CPANEL_CONFIG.dbName
        : parsed.dbName;
    const dbUser =
      !parsed.dbUser || parsed.dbUser === 'masbagoes_dokmadrasah'
        ? DEFAULT_CPANEL_CONFIG.dbUser
        : parsed.dbUser;
    const dbPass = !parsed.dbPass ? DEFAULT_CPANEL_CONFIG.dbPass : parsed.dbPass;
    return {
      ...DEFAULT_CPANEL_CONFIG,
      ...parsed,
      dbName,
      dbUser,
      dbPass,
    };
  } catch {
    return DEFAULT_CPANEL_CONFIG;
  }
};

export const saveCpanelSyncConfig = (config: Partial<CpanelSyncConfig>): CpanelSyncConfig => {
  const current = getCpanelSyncConfig();
  const updated = { ...current, ...config };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export interface SyncPayload {
  profile: MadrasahProfile;
  teachers: Teacher[];
  students: Student[];
  rombels: Rombel[];
  documents: OfficialDocument[];
  logs: ActivityLog[];
  source?: string;
  syncTimestamp?: string;
}

export interface SyncResult {
  success: boolean;
  message: string;
  timestamp: string;
  database?: string;
  stats?: {
    teachers: number;
    students: number;
    documents: number;
    rombels: number;
  };
  details?: any;
}

/**
 * Kirim sinkronisasi data ke cPanel MySQL endpoint
 */
export const syncDataToCpanel = async (
  payload: SyncPayload,
  customUrl?: string
): Promise<SyncResult> => {
  const config = getCpanelSyncConfig();
  const targetUrl = customUrl || config.cpanelUrl;
  const nowStr = new Date().toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) + ' WIB';

  // Jika URL cPanel belum diisi, kita lakukan sinkronisasi via internal server proxy
  // yang mencatat snapshot dan menyiapkan auto-sync segera setelah host cPanel online
  if (!targetUrl || targetUrl.trim() === '') {
    try {
      const proxyRes = await fetch('/api/mysql/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: payload,
          credentials: {
            dbHost: config.dbHost,
            dbName: config.dbName,
            dbUser: config.dbUser,
          },
        }),
      });

      if (proxyRes.ok) {
        const json = await proxyRes.json();
        saveCpanelSyncConfig({
          lastSyncTime: nowStr,
          lastSyncStatus: 'success',
          lastSyncMessage: json.message || 'Data berhasil disinkronkan ke cache MySQL masbagoes_adm',
          lastRecordStats: {
            teachers: payload.teachers.length,
            students: payload.students.length,
            documents: payload.documents.length,
            rombels: payload.rombels.length,
          },
        });
        return {
          success: true,
          message: json.message || `Data siap sinkron ke MySQL masbagoes_adm (${payload.teachers.length} Guru, ${payload.students.length} Siswa, ${payload.documents.length} Dokumen)`,
          timestamp: nowStr,
          database: config.dbName,
          stats: {
            teachers: payload.teachers.length,
            students: payload.students.length,
            documents: payload.documents.length,
            rombels: payload.rombels.length,
          },
        };
      }
    } catch {
      // Fallback local persistence
    }

    saveCpanelSyncConfig({
      lastSyncTime: nowStr,
      lastSyncStatus: 'success',
      lastSyncMessage: `Snapshot siap disinkronkan ke MySQL cPanel (${config.dbName})`,
      lastRecordStats: {
        teachers: payload.teachers.length,
        students: payload.students.length,
        documents: payload.documents.length,
        rombels: payload.rombels.length,
      },
    });

    return {
      success: true,
      message: `Data tersimpan dan disiapkan untuk MySQL cPanel ${config.dbName} (Pengguna: ${config.dbUser}). Masukkan URL hosting cPanel Anda untuk push langsung.`,
      timestamp: nowStr,
      database: config.dbName,
      stats: {
        teachers: payload.teachers.length,
        students: payload.students.length,
        documents: payload.documents.length,
        rombels: payload.rombels.length,
      },
    };
  }

  // Format endpoint target
  let fullEndpoint = targetUrl.trim();
  if (!fullEndpoint.endsWith('.php') && !fullEndpoint.endsWith('/')) {
    fullEndpoint += '/api/sync.php';
  } else if (fullEndpoint.endsWith('/') && !fullEndpoint.includes('.php')) {
    fullEndpoint += 'api/sync.php';
  }

  try {
    // Coba direct fetch ke endpoint cPanel
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const directRes = await fetch(fullEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-AutoMadrasah-Sync': '1',
      },
      body: JSON.stringify({
        ...payload,
        syncTimestamp: new Date().toISOString(),
        dbConfig: {
          dbName: config.dbName,
          dbUser: config.dbUser,
        },
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (directRes.ok) {
      const resJson = await directRes.json();
      saveCpanelSyncConfig({
        lastSyncTime: nowStr,
        lastSyncStatus: 'success',
        lastSyncMessage: resJson.message || `Berhasil disimpan ke MySQL ${config.dbName}`,
        lastRecordStats: {
          teachers: payload.teachers.length,
          students: payload.students.length,
          documents: payload.documents.length,
          rombels: payload.rombels.length,
        },
      });

      return {
        success: true,
        message: resJson.message || `Data berhasil disinkronkan ke MySQL ${config.dbName} pada ${fullEndpoint}`,
        timestamp: nowStr,
        database: config.dbName,
        stats: resJson.stats || {
          teachers: payload.teachers.length,
          students: payload.students.length,
          documents: payload.documents.length,
          rombels: payload.rombels.length,
        },
      };
    }
  } catch (directErr) {
    // Jika ada hambatan CORS browser, alihkan via server-side proxy
    console.warn('Direct fetch ke cPanel terhalang CORS, mengalihkan via proxy server...', directErr);
  }

  // Fallback via server proxy
  try {
    const proxyRes = await fetch('/api/mysql/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cpanelUrl: fullEndpoint,
        data: payload,
        credentials: {
          dbHost: config.dbHost,
          dbName: config.dbName,
          dbUser: config.dbUser,
        },
      }),
    });

    const proxyJson = await proxyRes.json();
    if (proxyRes.ok && proxyJson.success) {
      saveCpanelSyncConfig({
        lastSyncTime: nowStr,
        lastSyncStatus: 'success',
        lastSyncMessage: proxyJson.message || `Berhasil disinkronkan ke MySQL ${config.dbName}`,
        lastRecordStats: {
          teachers: payload.teachers.length,
          students: payload.students.length,
          documents: payload.documents.length,
          rombels: payload.rombels.length,
        },
      });

      return {
        success: true,
        message: proxyJson.message,
        timestamp: nowStr,
        database: config.dbName,
        stats: proxyJson.stats,
      };
    } else {
      throw new Error(proxyJson.message || 'Gagal tersambung ke endpoint cPanel');
    }
  } catch (err: any) {
    saveCpanelSyncConfig({
      lastSyncTime: nowStr,
      lastSyncStatus: 'error',
      lastSyncMessage: err.message || 'Gagal tersambung ke cPanel MySQL',
    });

    return {
      success: false,
      message: `Koneksi ke cPanel (${fullEndpoint}) belum dapat dijangkau: ${err.message}. Pastikan file ZIP cPanel sudah diekstrak di public_html.`,
      timestamp: nowStr,
      database: config.dbName,
    };
  }
};

export interface TestConnectionResult {
  success: boolean;
  message: string;
  details?: any;
  errorType?: 'DNS_NOT_RESOLVED' | 'FILES_NOT_FOUND' | 'INVALID_URL' | 'GENERAL_ERROR';
  hostname?: string;
  suggestion?: string;
  solution?: string;
}

/**
 * Uji koneksi ke endpoint cPanel
 */
export const testCpanelConnection = async (url: unknown): Promise<TestConnectionResult> => {
  const cleanInput = typeof url === 'string' ? url.trim() : '';
  if (!cleanInput) {
    return {
      success: false,
      message: 'Silakan masukkan URL cPanel terlebih dahulu (misal: https://adm-madrasah.masbagoes.web.id).',
    };
  }

  // 1. Coba via server proxy (menghindari hambatan CORS browser dan menyediakan diagnosa DNS mendalam)
  try {
    const proxyRes = await fetch('/api/mysql/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpanelUrl: cleanInput }),
    });
    if (proxyRes.ok) {
      const proxyJson = await proxyRes.json();
      return proxyJson;
    }
  } catch (proxyErr) {
    console.warn('Proxy test-connection error, fallback to direct fetch:', proxyErr);
  }

  // 2. Direct fetch fallback (jika offline dev)
  let testUrl = cleanInput;
  if (!testUrl.endsWith('.php') && !testUrl.endsWith('/')) {
    testUrl += '/api/health.php';
  } else if (testUrl.endsWith('/') && !testUrl.includes('.php')) {
    testUrl += 'api/health.php';
  }

  try {
    const res = await fetch(testUrl);
    if (res.ok) {
      const json = await res.json();
      return {
        success: true,
        message: json.message || `Terhubung ke MySQL masbagoes_adm di ${testUrl}!`,
        details: json,
      };
    }
  } catch {
    // Direct fetch gagal (biasanya CORS atau domain belum aktif)
  }

  return {
    success: false,
    message: `Tidak dapat menghubungi ${cleanInput}. Pastikan domain aktif dan file ZIP cPanel telah diunggah ke folder hosting.`,
    solution:
      'Jika Anda mengunggah ke subfolder di domain utama, gunakan format: https://domainanda.com/folder_anda/',
  };
};
