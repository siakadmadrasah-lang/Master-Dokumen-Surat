import React, { useState, useEffect } from 'react';
import {
  Server,
  Download,
  Database,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  HardDrive,
  FolderArchive,
  ArrowRight,
  Settings,
} from 'lucide-react';
import { MadrasahProfile, OfficialDocument, Teacher, Student, Rombel, ActivityLog } from '../types';
import { downloadCpanelZip } from '../utils/cpanelExport';
import { downloadMadrasahSql } from '../utils/sqlExport';
import {
  getCpanelSyncConfig,
  saveCpanelSyncConfig,
  syncDataToCpanel,
  testCpanelConnection,
  CpanelSyncConfig,
} from '../utils/cpanelSyncService';

interface CpanelExportCardProps {
  profile: MadrasahProfile;
  documents: OfficialDocument[];
  teachers: Teacher[];
  students: Student[];
  rombels: Rombel[];
  logs: ActivityLog[];
  onAddLog?: (action: string) => void;
}

export const CpanelExportCard: React.FC<CpanelExportCardProps> = ({
  profile,
  documents,
  teachers,
  students,
  rombels,
  logs,
  onAddLog,
}) => {
  const [syncConfig, setSyncConfig] = useState<CpanelSyncConfig>(getCpanelSyncConfig);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Export State
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [exportPercent, setExportPercent] = useState(0);
  const [exportMessage, setExportMessage] = useState('');

  // Sync State
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
    timestamp?: string;
  } | null>(null);

  // Testing Connection State
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Guide Modal
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showSqlToast, setShowSqlToast] = useState(false);

  // Copy helper
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Handle manual sync to MySQL
  const handleTriggerSync = async () => {
    try {
      setIsSyncing(true);
      setSyncFeedback(null);

      const result = await syncDataToCpanel(
        {
          profile,
          teachers,
          students,
          rombels,
          documents,
          logs,
        },
        syncConfig.cpanelUrl
      );

      const updated = getCpanelSyncConfig();
      setSyncConfig(updated);

      if (result.success) {
        setSyncFeedback({
          type: 'success',
          message: result.message,
          timestamp: result.timestamp,
        });
        onAddLog?.(`Sinkronisasi otomatis ke database MySQL ${syncConfig.dbName} (${teachers.length} Guru, ${students.length} Siswa, ${documents.length} Dokumen)`);
      } else {
        setSyncFeedback({
          type: 'error',
          message: result.message,
        });
      }
    } catch (err: any) {
      setSyncFeedback({
        type: 'error',
        message: err.message || 'Gagal sinkronisasi data ke cPanel MySQL',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Test cPanel connection
  const handleTestConnection = async () => {
    try {
      setIsTesting(true);
      setTestResult(null);
      const res = await testCpanelConnection(syncConfig.cpanelUrl);
      setTestResult(res);
    } finally {
      setIsTesting(false);
    }
  };

  // Download cPanel ZIP
  const handleDownloadZip = async () => {
    try {
      setIsExportingZip(true);
      setExportPercent(5);
      setExportMessage('Menyiapkan berkas cPanel & skrip MySQL...');

      await downloadCpanelZip(
        {
          profile,
          documents,
          teachers,
          students,
          rombels,
          logs,
          dbName: syncConfig.dbName,
          dbUser: syncConfig.dbUser,
          dbPass: syncConfig.dbPass,
          dbHost: syncConfig.dbHost,
        },
        (percent, message) => {
          setExportPercent(percent);
          setExportMessage(message);
        }
      );

      onAddLog?.(`Mengunduh Paket Deployment cPanel & MySQL Auto-Sync (${syncConfig.dbName})`);
    } catch (err) {
      console.error('Download cPanel zip error:', err);
      alert('Gagal membuat berkas ZIP cPanel. Silakan coba lagi.');
    } finally {
      setIsExportingZip(false);
    }
  };

  // Download SQL dump
  const handleDownloadSql = () => {
    try {
      downloadMadrasahSql({
        profile,
        teachers,
        students,
        rombels,
        documents,
        logs,
        dbDialect: 'MYSQL',
      });
      setShowSqlToast(true);
      setTimeout(() => setShowSqlToast(false), 3500);
      onAddLog?.(`Mengunduh Naskah SQL MySQL ${syncConfig.dbName} untuk phpMyAdmin`);
    } catch (err) {
      console.error('SQL export error:', err);
      alert('Gagal membuat berkas SQL.');
    }
  };

  return (
    <div id="cpanel-mysql-sync-card" className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-emerald-700/60 shadow-md space-y-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-800/80 pb-5">
        <div className="flex items-start sm:items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                cPanel Hosting & Penyimpanan Otomatis MySQL
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                Auto-Sync Ready
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Paket ZIP siap ekstrak di <code className="bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono">public_html</code> dengan konektor PDO MySQL dan endpoint sinkronisasi dua arah.
            </p>
          </div>
        </div>

        {/* Quick Actions in Header */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowGuideModal(true)}
            className="px-3.5 py-2 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-600/60 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Panduan cPanel</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadSql}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Unduh .SQL</span>
          </button>
        </div>
      </div>

      {showSqlToast && (
        <div className="p-3 bg-emerald-900/80 border border-emerald-500 text-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Berkas SQL database berhasil diunduh! Siap diimpor ke database <strong>{syncConfig.dbName}</strong> melalui phpMyAdmin cPanel.</span>
        </div>
      )}

      {/* Database Credentials Overview */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-emerald-800/50 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            Akun & Skema Database MySQL Terkonfigurasi
          </span>
          <span className="text-emerald-400 text-[11px] font-medium">Host: <code className="font-mono bg-emerald-950 px-1 py-0.5 rounded border border-emerald-800">localhost</code></span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Database Name */}
          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-[10px] text-slate-400 block">Db Name</span>
              <span className="font-mono font-bold text-emerald-300 text-xs truncate block" title={syncConfig.dbName}>
                {syncConfig.dbName}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(syncConfig.dbName, 'dbname')}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Salin Nama Database"
            >
              {copiedField === 'dbname' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Database User */}
          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-[10px] text-slate-400 block">Db User</span>
              <span className="font-mono font-bold text-teal-300 text-xs truncate block" title={syncConfig.dbUser}>
                {syncConfig.dbUser}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(syncConfig.dbUser, 'dbuser')}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Salin User Database"
            >
              {copiedField === 'dbuser' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Database Password */}
          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-[10px] text-slate-400 block">Password</span>
              <span className="font-mono font-bold text-amber-300 text-xs truncate block">
                {showPassword ? syncConfig.dbPass : '••••••••••••'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? 'Sembunyikan' : 'Tampilkan'}
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(syncConfig.dbPass, 'dbpass')}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Salin Password"
              >
                {copiedField === 'dbpass' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Sync Configuration & Live Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Auto-Sync Controls & Target URL */}
        <div className="p-4 bg-slate-950/60 rounded-xl border border-emerald-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>URL Hosting cPanel Anda:</span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="toggle-auto-sync"
                checked={syncConfig.autoSyncEnabled}
                onChange={(e) => {
                  const updated = saveCpanelSyncConfig({ autoSyncEnabled: e.target.checked });
                  setSyncConfig(updated);
                }}
                className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="toggle-auto-sync" className="text-[11px] text-slate-300 font-semibold cursor-pointer select-none">
                Penyimpanan Otomatis Aktif
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="https://madrasah.sch.id (atau kosongkan untuk sync lokal/proxy)"
              value={syncConfig.cpanelUrl}
              onChange={(e) => {
                const updated = saveCpanelSyncConfig({ cpanelUrl: e.target.value });
                setSyncConfig(updated);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-hidden font-mono"
            />
            {syncConfig.cpanelUrl && (
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-bold border border-slate-600 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                {isTesting ? 'Menguji...' : 'Uji'}
              </button>
            )}
          </div>

          {testResult && (
            <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${testResult.success ? 'bg-emerald-950/80 border border-emerald-600 text-emerald-200' : 'bg-rose-950/80 border border-rose-700 text-rose-200'}`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
              <span className="truncate">{testResult.message}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">
              Terakhir Disinkronkan: <strong className="text-slate-200">{syncConfig.lastSyncTime || 'Belum pernah'}</strong>
            </span>
            <button
              type="button"
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menyimpan...' : 'Sinkronkan Sekarang'}</span>
            </button>
          </div>
        </div>

        {/* Right: ZIP Deployment Download Box */}
        <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/80 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <FolderArchive className="w-4 h-4 text-emerald-400" />
                <span>Paket ZIP Aplikasi Web Lengkap (Full React App + MySQL REST API)</span>
              </h4>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                Full Production SPA
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Paket ini berisi <strong>seluruh aplikasi web AutoMadrasah lengkap</strong> (Portal Dokumen Resmi, Login Admin, SK Pembagian Tugas, KOM 78 Halaman, Arsip & Cetak PDF, Verifikasi TTE QR Code) beserta berkas backend PHP MySQL (<code className="text-emerald-300 font-mono">api/sync.php</code>, <code className="text-emerald-300 font-mono">api/health.php</code>, <code className="text-emerald-300 font-mono">config.php</code>, <code className="text-emerald-300 font-mono">database.sql</code>). Saat diekstrak di <code className="text-emerald-300 font-mono">public_html</code>, domain Anda akan menampilkan aplikasi web secara penuh.
            </p>
          </div>

          {isExportingZip ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-emerald-300">
                <span>{exportMessage}</span>
                <span>{exportPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${exportPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleDownloadZip}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-emerald-500/20"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Unduh ZIP Aplikasi Lengkap cPanel (Full App + MySQL)</span>
            </button>
          )}

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-emerald-900/60">
            <span>Kompatibel: cPanel (public_html) & Plesk</span>
            <a
              href={`https://${syncConfig.domainName}/api/status.php`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-300 hover:text-emerald-200 underline flex items-center gap-1"
            >
              <span>Status API di Domain</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Sync Feedback Alert */}
      {syncFeedback && (
        <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-fade-in ${syncFeedback.type === 'success' ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-200' : 'bg-rose-950/80 border border-rose-600 text-rose-200'}`}>
          {syncFeedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-bold">{syncFeedback.message}</p>
            {syncFeedback.timestamp && (
              <p className="text-[11px] text-emerald-400/80 mt-0.5">Waktu Sinkronisasi: {syncFeedback.timestamp}</p>
            )}
          </div>
        </div>
      )}

      {/* cPanel Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-slate-900 text-white rounded-2xl border border-emerald-700 max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-2.5">
                <Server className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm sm:text-base text-white">Panduan Pemasangan & Auto-Sync di cPanel</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto text-xs space-y-4 text-slate-300 leading-relaxed">
              <div className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-xl space-y-1">
                <span className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider block">Kredensial Sesuai Konfigurasi Anda:</span>
                <p>Database: <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono font-bold text-white">{syncConfig.dbName}</code></p>
                <p>Pengguna: <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono font-bold text-white">{syncConfig.dbUser}</code></p>
                <p>Password: <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono font-bold text-white">{syncConfig.dbPass}</code></p>
              </div>

              <div>
                <h4 className="font-bold text-sm text-emerald-400 mb-1">Langkah 1: Siapkan Database di cPanel</h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>Login ke panel cPanel madrasah Anda (misal: <code className="text-emerald-300">https://namadomain.sch.id:2083</code>).</li>
                  <li>Buka menu <strong>MySQL Databases</strong>.</li>
                  <li>Buat database dengan nama <strong>{syncConfig.dbName}</strong>.</li>
                  <li>Buat user dengan nama <strong>{syncConfig.dbUser}</strong> dan password <strong>{syncConfig.dbPass}</strong>.</li>
                  <li>Tambahkan user ke database dan centang <strong>ALL PRIVILEGES</strong>.</li>
                </ol>
              </div>

              <div>
                <h4 className="font-bold text-sm text-emerald-400 mb-1">Langkah 2: Ekstrak ZIP ke Folder public_html</h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>Klik tombol <strong>Unduh ZIP cPanel</strong> di kartu AutoMadrasah.</li>
                  <li>Di cPanel, buka menu <strong>File Manager</strong> lalu buka folder <strong>public_html</strong>.</li>
                  <li>Upload berkas ZIP tersebut dan klik kanan lalu pilih <strong>Extract</strong>.</li>
                  <li>Pastikan file <code className="text-emerald-300">config.php</code> dan folder <code className="text-emerald-300">api/</code> sudah berada di public_html.</li>
                </ol>
              </div>

              <div>
                <h4 className="font-bold text-sm text-emerald-400 mb-1">Langkah 3: Uji Koneksi & Nikmati Auto-Sync</h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>Buka alamat <code className="text-emerald-300">https://domain-anda/api/test.php</code> di browser. Jika muncul tanda centang hijau, maka database MySQL telah terhubung!</li>
                  <li>Tabel database akan dibuat otomatis saat sinkronisasi pertama kali dijalankan.</li>
                  <li>Masukkan URL domain Anda pada kartu AutoMadrasah dan klik <strong>Sinkronkan Sekarang</strong>.</li>
                </ol>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
