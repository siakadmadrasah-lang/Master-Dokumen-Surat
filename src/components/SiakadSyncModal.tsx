import React, { useState, useEffect } from 'react';
import {
  Globe,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  Database,
  Users,
  GraduationCap,
  Key,
  ExternalLink,
  Sliders,
  Check,
  Code,
  Layers,
} from 'lucide-react';
import { Teacher, Student, SiakadSyncConfig } from '../types';
import {
  getSiakadConfig,
  saveSiakadConfig,
  testSiakadConnection,
  fetchSiakadData,
  mapRawToTeacher,
  mapRawToStudent,
} from '../utils/siakadService';

interface SiakadSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySync: (result: {
    teachers?: Teacher[];
    students?: Student[];
    mode: 'MERGE' | 'REPLACE';
  }) => void;
  initialTarget?: 'all' | 'teachers' | 'students';
}

export const SiakadSyncModal: React.FC<SiakadSyncModalProps> = ({
  isOpen,
  onClose,
  onApplySync,
  initialTarget = 'all',
}) => {
  const [config, setConfig] = useState<SiakadSyncConfig>(getSiakadConfig());
  const [target, setTarget] = useState<'all' | 'teachers' | 'students'>(initialTarget);
  const [syncMode, setSyncMode] = useState<'MERGE' | 'REPLACE'>('MERGE');
  
  // Connection state
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Syncing state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'QUICK' | 'SETTINGS' | 'MANUAL'>('QUICK');
  const [manualJson, setManualJson] = useState('');
  const [manualType, setManualType] = useState<'teachers' | 'students'>('teachers');

  useEffect(() => {
    if (isOpen) {
      setConfig(getSiakadConfig());
      setTarget(initialTarget);
      setTestResult(null);
      setSyncResult(null);
    }
  }, [isOpen, initialTarget]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    saveSiakadConfig(config);
    const res = await testSiakadConnection(config);
    setTestResult(res);
    setIsTesting(false);
  };

  const handleSaveConfig = () => {
    saveSiakadConfig(config);
    setTestResult({ success: true, message: 'Konfigurasi SIAKAD berhasil disimpan!' });
  };

  const handleExecuteSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    saveSiakadConfig(config);

    const res = await fetchSiakadData(target, config);
    setSyncResult(res);
    setIsSyncing(false);

    if (res.success && (res.teachers?.length || res.students?.length)) {
      saveSiakadConfig({
        lastSyncAt: new Date().toLocaleString('id-ID'),
        lastSyncStatus: 'SUCCESS',
        lastSyncMessage: res.message,
      });
    }
  };

  const handleConfirmApply = () => {
    if (!syncResult) return;
    onApplySync({
      teachers: syncResult.teachers,
      students: syncResult.students,
      mode: syncMode,
    });
    onClose();
  };

  // Manual JSON parser
  const handleApplyManualJson = () => {
    try {
      const parsed = JSON.parse(manualJson);
      const rawList = Array.isArray(parsed) ? parsed : parsed.data || parsed.items || [];
      if (!Array.isArray(rawList) || rawList.length === 0) {
        alert('Format JSON tidak berisi daftar array yang valid.');
        return;
      }

      if (manualType === 'teachers') {
        const mapped = rawList.map(mapRawToTeacher);
        onApplySync({
          teachers: mapped,
          mode: syncMode,
        });
      } else {
        const mapped = rawList.map(mapRawToStudent);
        onApplySync({
          students: mapped,
          mode: syncMode,
        });
      }
      onClose();
    } catch (err: any) {
      alert(`Gagal parse JSON: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-2xl">
              <Globe className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>Sinkronisasi Data SIAKAD Madrasah</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono">
                  Live API
                </span>
              </h2>
              <p className="text-xs text-emerald-200">
                Hubungkan dan tarik data Guru & Siswa dari <span className="font-semibold underline">siakad-madrasah.jaenalmaskun.biz.id</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('QUICK')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'QUICK'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Tarik Data Otomatis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('SETTINGS')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'SETTINGS'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Kredensial & Endpoint</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('MANUAL')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'MANUAL'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Import JSON / Backup</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: QUICK SYNC */}
          {activeTab === 'QUICK' && (
            <div className="space-y-4">
              {/* Server Info Card */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-700" />
                    <span>Target Server SIAKAD:</span>
                  </div>
                  <a
                    href={config.baseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 mt-0.5"
                  >
                    <span>{config.baseUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="px-3 py-1.5 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isTesting ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-emerald-700" />
                    )}
                    <span>{isTesting ? 'Mengecek...' : 'Uji Koneksi'}</span>
                  </button>
                </div>
              </div>

              {testResult && (
                <div
                  className={`p-3 text-xs rounded-xl border flex items-start gap-2.5 ${
                    testResult.success
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      : 'bg-amber-50 text-amber-900 border-amber-300'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-1.5">
                    <p className="font-semibold text-xs leading-relaxed">{testResult.message}</p>
                    {testResult.details && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {testResult.details.teachersCount !== undefined && (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border border-emerald-200">
                            <Users className="w-3 h-3 text-emerald-700" />
                            {testResult.details.teachersCount} Guru Terdeteksi
                          </span>
                        )}
                        {testResult.details.studentsCount !== undefined && (
                          <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border border-teal-200">
                            <GraduationCap className="w-3 h-3 text-teal-700" />
                            {testResult.details.studentsCount} Siswa Terdeteksi
                          </span>
                        )}
                        {testResult.details.madrasahName && (
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md text-[11px] font-semibold border border-slate-200">
                            {testResult.details.madrasahName}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Target Data Selection */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-2">Pilih Data yang Akan Ditarik:</label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTarget('all')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      target === 'all'
                        ? 'border-emerald-700 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Layers className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                    <div className="text-xs">Semua Data</div>
                    <div className="text-[10px] text-slate-500 font-normal">Guru + Siswa</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTarget('teachers')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      target === 'teachers'
                        ? 'border-emerald-700 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                    <div className="text-xs">Data Guru (GTK)</div>
                    <div className="text-[10px] text-slate-500 font-normal">NIP & Beban Kerja</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTarget('students')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      target === 'students'
                        ? 'border-emerald-700 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                    <div className="text-xs">Data Siswa</div>
                    <div className="text-[10px] text-slate-500 font-normal">NISN & Rombel</div>
                  </button>
                </div>
              </div>

              {/* Merge vs Replace Mode */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-2">Metode Penulisan ke Database:</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <label
                    className={`p-3 rounded-2xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      syncMode === 'MERGE'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="syncMode"
                      checked={syncMode === 'MERGE'}
                      onChange={() => setSyncMode('MERGE')}
                      className="mt-0.5 text-emerald-700"
                    />
                    <div>
                      <div className="text-xs font-bold">Gabungkan (Merge)</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        Perbarui data yang cocok & tambahkan record baru tanpa menghapus data lokal lainnya.
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      syncMode === 'REPLACE'
                        ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="syncMode"
                      checked={syncMode === 'REPLACE'}
                      onChange={() => setSyncMode('REPLACE')}
                      className="mt-0.5 text-amber-700"
                    />
                    <div>
                      <div className="text-xs font-bold">Timpa Semua (Replace)</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        Ganti seluruh database lokal dengan data terkini dari SIAKAD.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Execute Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  id="btn-execute-siakad-sync"
                  onClick={handleExecuteSync}
                  disabled={isSyncing}
                  className="w-full py-3 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSyncing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span>
                    {isSyncing ? 'Sedang Mengunduh Data SIAKAD...' : 'Mulai Sinkronisasi Data Sekarang'}
                  </span>
                </button>
              </div>

              {/* Sync Results Preview */}
              {syncResult && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Hasil Penarikan Data SIAKAD:</span>
                    </h4>
                    <span className="text-[11px] font-mono font-bold text-emerald-800">
                      {syncResult.teachersCount || 0} Guru | {syncResult.studentsCount || 0} Siswa
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{syncResult.message}</p>

                  {syncResult.errors && (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
                      <p className="font-bold">Catatan Koneksi:</p>
                      <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                        {syncResult.errors.map((e: string, i: number) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(syncResult.teachers?.length > 0 || syncResult.students?.length > 0) && (
                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleConfirmApply}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Terapkan ke Database ({syncMode === 'MERGE' ? 'Gabungkan' : 'Timpa'})</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SETTINGS */}
          {activeTab === 'SETTINGS' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  URL Utama Server SIAKAD Madrasah:
                </label>
                <input
                  type="text"
                  value={config.baseUrl}
                  onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                  placeholder="https://siakad-madrasah.jaenalmaskun.biz.id"
                  className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Default domain: <span className="font-semibold text-emerald-800">https://siakad-madrasah.jaenalmaskun.biz.id</span>
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  API Token / Bearer Token / Secret Key (Opsional jika privat):
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={config.apiToken || ''}
                    onChange={(e) => setConfig({ ...config, apiToken: e.target.value })}
                    placeholder="Masukkan token akses jika endpoint SIAKAD terproteksi..."
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Kustomisasi Path Endpoint API:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Endpoint Guru (GTK):</label>
                    <input
                      type="text"
                      value={config.customEndpoints?.teachers || '/api.php?action=select&table=site_settings&id=data_guru'}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          customEndpoints: {
                            ...config.customEndpoints,
                            teachers: e.target.value,
                          },
                        })
                      }
                      placeholder="/api.php?action=select&table=site_settings&id=data_guru"
                      className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Endpoint Siswa:</label>
                    <input
                      type="text"
                      value={config.customEndpoints?.students || '/api.php?action=select&table=site_settings&id=students_data'}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          customEndpoints: {
                            ...config.customEndpoints,
                            students: e.target.value,
                          },
                        })
                      }
                      placeholder="/api.php?action=select&table=site_settings&id=students_data"
                      className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Simpan Pengaturan
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: MANUAL JSON */}
          {activeTab === 'MANUAL' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  Tempel Raw JSON Hasil Export SIAKAD / EMIS:
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={manualType}
                    onChange={(e) => setManualType(e.target.value as any)}
                    className="text-xs font-bold bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800"
                  >
                    <option value="teachers">Format Guru (GTK)</option>
                    <option value="students">Format Peserta Didik (Siswa)</option>
                  </select>
                </div>
              </div>

              <textarea
                rows={8}
                value={manualJson}
                onChange={(e) => setManualJson(e.target.value)}
                placeholder={`[
  {
    "nama": "Drs. H. Syamsul Huda, M.Pd",
    "nip": "197805122003121002",
    "nuptk": "4536756658200023",
    "mapel": "Fiqih",
    "status": "PNS",
    "wali_kelas": "VII A"
  }
]`}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleApplyManualJson}
                  disabled={!manualJson.trim()}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-40"
                >
                  Impor Data JSON
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Sinkronisasi otomatis dengan standar tata persuratan Kemenag RI</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
