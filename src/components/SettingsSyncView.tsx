import React, { useState } from 'react';
import {
  Settings,
  Save,
  Download,
  Upload,
  RotateCcw,
  Building,
  User,
  MapPin,
  CheckCircle2,
  Database,
  CloudCheck,
  Shield,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';
import { MadrasahProfile, Teacher, Student, OfficialDocument, Rombel, ActivityLog } from '../types';
import { downloadMadrasahSql } from '../utils/sqlExport';

interface SettingsSyncViewProps {
  profile: MadrasahProfile;
  teachers: Teacher[];
  students: Student[];
  rombels?: Rombel[];
  documents: OfficialDocument[];
  logs?: ActivityLog[];
  onUpdateProfile: (profile: MadrasahProfile) => void;
  onResetAllData: () => void;
  onRestoreData: (data: {
    profile?: MadrasahProfile;
    teachers?: Teacher[];
    students?: Student[];
    documents?: OfficialDocument[];
  }) => void;
  onSyncAllDocuments?: () => void;
  onBack?: () => void;
  onAddLog?: (action: string) => void;
}

export const SettingsSyncView: React.FC<SettingsSyncViewProps> = ({
  profile,
  teachers,
  students,
  rombels = [],
  documents,
  logs = [],
  onUpdateProfile,
  onResetAllData,
  onRestoreData,
  onSyncAllDocuments,
  onBack,
  onAddLog,
}) => {
  const [formData, setFormData] = useState<MadrasahProfile>(profile);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [showSyncToast, setShowSyncToast] = useState(false);
  const [showSqlSuccessToast, setShowSqlSuccessToast] = useState(false);

  const handleExportSqlDump = () => {
    try {
      downloadMadrasahSql({
        profile: formData,
        teachers,
        students,
        rombels,
        documents,
        logs,
        dbDialect: 'MYSQL',
      });
      onAddLog?.(`Mengekspor basis data SQL (.sql) untuk ${formData.namaMadrasah}`);
      setShowSqlSuccessToast(true);
      setTimeout(() => setShowSqlSuccessToast(false), 3000);
    } catch (err) {
      console.error('SQL export error:', err);
      alert('Gagal mengekspor database SQL.');
    }
  };

  const handleSyncAll = () => {
    if (onSyncAllDocuments) {
      onSyncAllDocuments();
      setShowSyncToast(true);
      setTimeout(() => setShowSyncToast(false), 3500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  // Full System Export
  const handleExportFullBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      profile: formData,
      teachers,
      students,
      documents,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BACKUP_AUTOMADRASAH_${formData.namaMadrasah.replace(/\s+/g, '_')}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Restore Backup
  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        onRestoreData(parsed);
        alert('Data berhasil dipulihkan dari cadangan!');
      } catch (err) {
        alert('File cadangan tidak valid.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          {onBack && (
            <button
              id="settings-back-btn"
              type="button"
              onClick={onBack}
              className="p-2 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs flex-shrink-0"
              title="Kembali ke Dashboard / Menu Utama"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
          )}
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2 truncate">
              <Settings className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span className="truncate">Pengaturan Profil Madrasah & Sinkronisasi Data</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              Identitas resmi satuan pendidikan, Kop Surat naskah dinas Kemenag, dan cadangan database.
            </p>
          </div>
        </div>

        {showSavedToast && (
          <div className="flex items-center space-x-1.5 bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-xl text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Perubahan Disimpan!</span>
          </div>
        )}
      </div>

      {/* Sync Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium">Penyimpanan Lokal</span>
            <p className="text-xs font-bold text-slate-800">Tersinkronisasi Real-time</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-teal-50 rounded-xl text-teal-700">
            <CloudCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium">Format EMIS & Simpatika</span>
            <p className="text-xs font-bold text-slate-800">Standar Kemenag 450</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 rounded-xl text-amber-700">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-medium">Sertifikat TTE QR</span>
            <p className="text-xs font-bold text-slate-800">Aktif & Tervalidasi</p>
          </div>
        </div>
      </div>

      {/* Direct Sync Action Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-300" />
            <span>Sinkronisasi Massal Semua Dokumen & SK</span>
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Perbarui data GTK ({teachers.length} guru) dan Peserta Didik ({students.length} siswa) ke seluruh {documents.length} dokumen, KOM, dan SK otomatis.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSyncAll}
          className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
          <span>Sinkronkan Sekarang</span>
        </button>
      </div>

      {showSyncToast && (
        <div className="p-3.5 bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Seluruh dokumen KOM dan SK resmi telah berhasil disinkronkan dengan database guru dan siswa terkini!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Identitas Kelembagaan */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-2">
            <Building className="w-4 h-4 text-emerald-700" />
            <span>Identitas Satuan Pendidikan & Kop Surat</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nama Resmi Madrasah*</label>
              <input
                type="text"
                required
                value={formData.namaMadrasah}
                onChange={(e) => setFormData({ ...formData, namaMadrasah: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Jenjang Pendidikan</label>
              <select
                value={formData.jenjang}
                onChange={(e) => setFormData({ ...formData, jenjang: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              >
                <option value="RA">RA (Raudhatul Athfal)</option>
                <option value="MI">MI (Madrasah Ibtidaiyah)</option>
                <option value="MTs">MTs (Madrasah Tsanawiyah)</option>
                <option value="MA">MA (Madrasah Aliyah)</option>
                <option value="MAK">MAK (Madrasah Aliyah Kejuruan)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nomor Statistik Madrasah (NSM)*</label>
              <input
                type="text"
                required
                value={formData.nsm}
                onChange={(e) => setFormData({ ...formData, nsm: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">NPSN (Kemendikbud/Kemenag)*</label>
              <input
                type="text"
                required
                value={formData.npsn}
                onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Peringkat Akreditasi</label>
              <input
                type="text"
                value={formData.akreditasi}
                onChange={(e) => setFormData({ ...formData, akreditasi: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tahun Pelajaran & Semester</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.tahunAjaran}
                  onChange={(e) => setFormData({ ...formData, tahunAjaran: e.target.value })}
                  placeholder="2025/2026"
                  className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                />
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value as any })}
                  className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
                >
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pimpinan & Penandatangan Resmi */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-2">
            <User className="w-4 h-4 text-emerald-700" />
            <span>Kepala Madrasah & Penandatangan Resmi</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Nama Kepala Madrasah (Lengkap Gelar)*</label>
              <input
                type="text"
                required
                value={formData.namaKepala}
                onChange={(e) => setFormData({ ...formData, namaKepala: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">NIP Kepala Madrasah</label>
              <input
                type="text"
                value={formData.nipKepala}
                onChange={(e) => setFormData({ ...formData, nipKepala: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Ketua Komite Madrasah</label>
              <input
                type="text"
                value={formData.namaKetuaKomite || ''}
                onChange={(e) => setFormData({ ...formData, namaKetuaKomite: e.target.value })}
                placeholder="e.g. Sohibul Ikhsan, S.Ag."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Pengawas Pembina Kemenag</label>
              <input
                type="text"
                value={formData.namaPengawas}
                onChange={(e) => setFormData({ ...formData, namaPengawas: e.target.value })}
                placeholder="e.g. H. Amin Purnomo, S.Ag."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">NIP Pengawas Pembina</label>
              <input
                type="text"
                value={formData.nipPengawas || ''}
                onChange={(e) => setFormData({ ...formData, nipPengawas: e.target.value })}
                placeholder="e.g. 197112031998031001"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-emerald-950 block mb-1">
                Kasi Pendidikan Madrasah (Kemenag Banyumas)
              </label>
              <input
                type="text"
                value={formData.namaKasiPenma || ''}
                onChange={(e) => setFormData({ ...formData, namaKasiPenma: e.target.value })}
                placeholder="e.g. Dr. H. M. Wahyu Fauzi Aziz, SH., M.Si"
                className="w-full bg-emerald-50/50 border border-emerald-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-emerald-950 block mb-1">
                NIP Kasi Pendidikan Madrasah
              </label>
              <input
                type="text"
                value={formData.nipKasiPenma || ''}
                onChange={(e) => setFormData({ ...formData, nipKasiPenma: e.target.value })}
                placeholder="e.g. 19771110 200901 1 013"
                className="w-full bg-emerald-50/50 border border-emerald-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Instansi Kantor Kemenag</label>
              <input
                type="text"
                value={formData.kantorKemenag || ''}
                onChange={(e) => setFormData({ ...formData, kantorKemenag: e.target.value })}
                placeholder="Kantor Kementerian Agama Kabupaten Banyumas"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Titimangsa Penetapan (Kota/Kab)*</label>
              <input
                type="text"
                required
                value={formData.titimangsa}
                onChange={(e) => setFormData({ ...formData, titimangsa: e.target.value })}
                placeholder="Contoh: Malang, Surabaya, Sleman"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Resmi Madrasah</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Alamat Lengkap */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>Alamat & Lokasi Madrasah</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-3">
              <label className="font-semibold text-slate-700 block mb-1">Alamat Jalan / Dusun</label>
              <input
                type="text"
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kecamatan</label>
              <input
                type="text"
                value={formData.kecamatan}
                onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kabupaten / Kota</label>
              <input
                type="text"
                value={formData.kabupatenKota}
                onChange={(e) => setFormData({ ...formData, kabupatenKota: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Provinsi</label>
              <input
                type="text"
                value={formData.provinsi}
                onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            id="save-profile-btn"
            type="submit"
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>

      {/* SQL Database Export Section */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-2xl border border-emerald-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-800/80 text-emerald-300 rounded-xl border border-emerald-600/50">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <span>Ekspor Basis Data MySQL / MariaDB (.SQL)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  phpMyAdmin Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Menghasilkan naskah SQL dump standar MySQL dengan tabel profil, guru, siswa, rombel, dokumen SK, dan audit log.
              </p>
            </div>
          </div>

          <button
            id="btn-export-sql-dump-settings"
            type="button"
            onClick={handleExportSqlDump}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Database (.SQL)</span>
          </button>
        </div>

        {showSqlSuccessToast && (
          <div className="p-3 bg-emerald-900/60 border border-emerald-600 text-emerald-200 rounded-xl text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Berkas SQL database berhasil diunduh dan siap diimpor di phpMyAdmin Plesk / cPanel hosting!</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1 border-t border-slate-800">
          <div className="text-slate-400">
            Tabel <code className="text-emerald-400">madrasah_profil</code> (1)
          </div>
          <div className="text-slate-400">
            Tabel <code className="text-emerald-400">guru_gtk</code> ({teachers.length})
          </div>
          <div className="text-slate-400">
            Tabel <code className="text-emerald-400">siswa</code> ({students.length})
          </div>
          <div className="text-slate-400">
            Tabel <code className="text-emerald-400">dokumen_resmi</code> ({documents.length})
          </div>
        </div>
      </div>

      {/* Backup & Reset Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Cadangan JSON & Reset Data Sistem
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="export-full-backup-btn"
            type="button"
            onClick={handleExportFullBackup}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Cadangan (JSON)</span>
          </button>

          <label
            id="restore-backup-label"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Pulihkan Cadangan (JSON)</span>
            <input type="file" accept=".json" onChange={handleRestoreFile} className="hidden" />
          </label>

          <button
            id="reset-sample-data-btn"
            type="button"
            onClick={() => {
              if (window.confirm('Reset seluruh data ke konfigurasi awal standar KMA 450?')) {
                onResetAllData();
              }
            }}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset ke Standar Awal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
