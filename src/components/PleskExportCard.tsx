import React, { useState } from 'react';
import {
  Server,
  Download,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  HelpCircle,
  HardDrive,
  Copy,
  ChevronRight,
  Settings2,
  FolderArchive,
  Terminal,
  Database,
} from 'lucide-react';
import { MadrasahProfile, OfficialDocument, Teacher, Student, Rombel, ActivityLog } from '../types';
import { downloadPleskZip } from '../utils/pleskExport';
import { downloadMadrasahSql } from '../utils/sqlExport';

interface PleskExportCardProps {
  profile: MadrasahProfile;
  documents: OfficialDocument[];
  teachers: Teacher[];
  students: Student[];
  rombels: Rombel[];
  logs: ActivityLog[];
  onAddLog?: (action: string) => void;
}

export const PleskExportCard: React.FC<PleskExportCardProps> = ({
  profile,
  documents,
  teachers,
  students,
  rombels,
  logs,
  onAddLog,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingSql, setIsExportingSql] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [customDomain, setCustomDomain] = useState(`${profile.website.replace(/^https?:\/\//, '') || 'madrasah.sch.id'}`);
  const [includeNodeServer, setIncludeNodeServer] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [sqlDownloadSuccess, setSqlDownloadSuccess] = useState(false);

  const handleDownloadSql = () => {
    try {
      setIsExportingSql(true);
      downloadMadrasahSql({
        profile,
        teachers,
        students,
        rombels,
        documents,
        logs,
        dbDialect: 'MYSQL',
      });
      onAddLog?.(`Mengunduh Berkas Database MySQL (.SQL) untuk ${profile.namaMadrasah}`);
      setSqlDownloadSuccess(true);
      setTimeout(() => setSqlDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('SQL export error:', err);
      alert('Gagal membuat berkas SQL. Silakan coba lagi.');
    } finally {
      setIsExportingSql(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      setProgressPercent(10);
      setProgressMessage('Menyiapkan berkas ZIP Plesk Hosting...');

      await downloadPleskZip(
        {
          profile,
          documents,
          teachers,
          students,
          rombels,
          logs,
          includeNodeServer,
          domainName: customDomain,
        },
        (percent, message) => {
          setProgressPercent(percent);
          setProgressMessage(message);
        }
      );

      onAddLog?.(`Mengunduh Paket Deployment Plesk Hosting (.ZIP) siap pasang untuk domain ${customDomain}`);
    } catch (err) {
      console.error('Plesk export error:', err);
      alert('Gagal membuat paket ZIP Plesk. Silakan coba lagi.');
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setProgressPercent(0);
        setProgressMessage('');
      }, 1000);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white p-5 sm:p-6 border border-emerald-700/50 shadow-xl space-y-4">
      {/* Decorative top accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/60">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Plesk Web Hosting Package (.ZIP)
              </h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Plesk Obsidian Ready
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ekspor seluruh sistem AutoMadrasah siap pasang langsung di panel hosting Plesk madrasah.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowConfigModal(true)}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Settings2 className="w-4 h-4 text-emerald-400" />
          <span>Panduan & Konfigurasi</span>
        </button>
      </div>

      {/* Card Content & Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs relative z-10">
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px]">
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Folder httpdocs/</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-snug">
            Termasuk <code>.htaccess</code> (HTTPS rewrite & caching), <code>web.config</code>, dan <code>index.html</code>.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
          <div className="flex items-center space-x-1.5 text-teal-400 font-bold text-[11px]">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Master Data JSON</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-snug">
            Menyematkan snapshot {documents.length} dokumen SK/KOM, {teachers.length} guru, dan {students.length} siswa.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
          <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-[11px]">
            <Terminal className="w-3.5 h-3.5" />
            <span>Node.js / Static Mode</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-snug">
            Kompatibel dengan Static Web Hosting biasa maupun Plesk Node.js Passenger Selector.
          </p>
        </div>
      </div>

      {/* Progress Bar (When exporting) */}
      {isExporting && (
        <div className="space-y-2 p-3 bg-emerald-950/80 rounded-xl border border-emerald-700/60 text-xs">
          <div className="flex justify-between font-mono text-[11px] text-emerald-300">
            <span>{progressMessage}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Download Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 relative z-10">
        <div className="text-[11px] text-slate-400 flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Tersedia paket ZIP lengkap untuk Plesk & berkas dump SQL untuk phpMyAdmin.</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* SQL Dump Download Button */}
          <button
            id="btn-download-sql-dump"
            type="button"
            disabled={isExportingSql}
            onClick={handleDownloadSql}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-emerald-300 hover:text-emerald-200 border border-emerald-700/60 font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            title="Unduh Database MySQL / MariaDB (.SQL) untuk phpMyAdmin / Plesk Database"
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>{sqlDownloadSuccess ? 'SQL Terunduh!' : 'Unduh SQL Database (.sql)'}</span>
          </button>

          {/* ZIP Package Download Button */}
          <button
            id="btn-download-plesk-zip"
            type="button"
            disabled={isExporting}
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-95 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Unduh ZIP Plesk Siap Pasang</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Configuration & Guide Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-5 sm:p-6 space-y-5 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-900/80 text-emerald-400 rounded-xl">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Panduan & Konfigurasi Deployment Plesk
                  </h3>
                  <p className="text-xs text-slate-400">
                    Instalasi mudah di Plesk Obsidian / Onyx Web Hosting
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Custom Options */}
            <div className="space-y-3 bg-slate-800/70 p-4 rounded-2xl border border-slate-700 text-xs">
              <h4 className="font-bold text-emerald-300">Pengaturan Domain Target:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Nama Domain / Subdomain</label>
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="misal: dokumen.mtsn1malang.sch.id"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:border-emerald-500 outline-hidden font-mono"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-5">
                  <input
                    type="checkbox"
                    id="chk-node"
                    checked={includeNodeServer}
                    onChange={(e) => setIncludeNodeServer(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-700 bg-slate-900"
                  />
                  <label htmlFor="chk-node" className="text-xs text-slate-300 cursor-pointer">
                    Sertakan file <code>app.js</code> (Node.js Passenger)
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Step Guide */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white text-sm">3 Langkah Mudah Pemasangan di Plesk:</h4>
              <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
                <li>
                  <strong>Unduh Berkas ZIP:</strong> Klik tombol <em>Unduh ZIP Plesk Siap Pasang</em> di bawah.
                </li>
                <li>
                  <strong>Buka File Manager Plesk:</strong> Masuk ke panel Plesk hosting madrasah &rarr; pilih domain/subdomain &rarr; buka folder <code>httpdocs</code>.
                </li>
                <li>
                  <strong>Upload & Extract:</strong> Unggah file ZIP dan klik tombol <em>Extract Files</em>. File <code>index.html</code> dan <code>.htaccess</code> langsung aktif melayani portal madrasah Anda!
                </li>
              </ol>
            </div>

            {/* .htaccess Preview */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-emerald-400 text-[11px]">.htaccess (Auto SPA Rewrite & SSL):</span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `RewriteEngine On\nRewriteCond %{HTTPS} !=on\nRewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^ index.html [QSA,L]`,
                      'htaccess'
                    )
                  }
                  className="text-[10px] text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedKey === 'htaccess' ? 'Tersalin!' : 'Salin Aturan'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-300 overflow-x-auto">
{`RewriteEngine On
RewriteBase /
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]`}
              </pre>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setShowConfigModal(false);
                    handleDownloadSql();
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-600/50 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>Unduh .SQL Saja</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowConfigModal(false);
                    handleDownload();
                  }}
                  className="w-full sm:w-auto px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh ZIP Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
