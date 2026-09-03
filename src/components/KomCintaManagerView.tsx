import React, { useState, useMemo } from 'react';
import { MadrasahProfile, OfficialDocument, Teacher, Student } from '../types';
import { KomCintaData, defaultKomCintaData } from '../data/komCintaDefaultData';
import { KomCintaDocumentView } from './documents/KomCintaDocumentView';
import {
  Heart,
  BookOpen,
  Edit3,
  Printer,
  RotateCcw,
  Save,
  CheckCircle2,
  Sparkles,
  Eye,
  FileCheck,
  Search,
  Compass,
  Layers,
  Award,
  Calendar,
  Users,
  Building,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { PengesahPejabatModal } from './PengesahPejabatModal';

interface KomCintaManagerViewProps {
  profile: MadrasahProfile;
  teachers: Teacher[];
  students: Student[];
  onOpenPrintModal: (doc: OfficialDocument) => void;
  onSaveToArchive?: (doc: OfficialDocument) => void;
  onBack?: () => void;
  onAddLog?: (action: string) => void;
}

export const KomCintaManagerView: React.FC<KomCintaManagerViewProps> = ({
  profile,
  teachers,
  students,
  onOpenPrintModal,
  onSaveToArchive,
  onBack,
  onAddLog,
}) => {
  // Load saved KOM Cinta data from localStorage or fallback to defaultKomCintaData
  const [formData, setFormData] = useState<KomCintaData>(() => {
    try {
      const saved = localStorage.getItem('kom_cinta_custom_data');
      if (saved) {
        return { ...defaultKomCintaData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load kom_cinta_custom_data', e);
    }
    return defaultKomCintaData;
  });

  const [activeSubTab, setActiveSubTab] = useState<'PREVIEW' | 'EDITOR'>('PREVIEW');
  const [editorSection, setEditorSection] = useState<'IDENTITY' | 'VISION' | 'PROGRAMS' | 'CURRICULUM' | 'HABITUATION' | 'CRITERIA'>('IDENTITY');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [showPengesahModal, setShowPengesahModal] = useState(false);

  // Build the corresponding OfficialDocument representation
  const officialDocRepresentation: OfficialDocument = useMemo(() => {
    return {
      id: 'DOC-KOM-CINTA-2026',
      type: 'KOM_CINTA',
      title: `Kurikulum Operasional Madrasah Berbasis Cinta (${formData.namaMadrasah}) T.A ${formData.tahunAjaran}`,
      nomorSurat: formData.nomorSuratPermohonan || '097/LPM/33.17/MI-77/VI/2026',
      tanggalSurat: formData.tanggalPengesahan || '25 Juli 2026',
      tahunAjaran: formData.tahunAjaran,
      semester: 'Ganjil',
      status: 'SIGNED',
      creatorName: `Tim Pengembang Kurikulum (${formData.namaBidangKurikulum})`,
      createdAt: '2026-07-15T08:00:00.000Z',
      updatedAt: new Date().toISOString(),
      version: 1,
      contentData: formData,
      signatures: [
        {
          id: 'SIG-KOM-01',
          role: 'KEPALA_MADRASAH',
          title: 'Kepala Madrasah',
          name: formData.namaKepala,
          nip: formData.nipKepala,
          isSigned: true,
          signedAt: `${formData.tanggalPengesahan} 08:30 WIB`,
          digitalHash: 'SHA256-KMA1503-KOM-CINTA-KAMAD-VALID',
        },
        {
          id: 'SIG-KOM-02',
          role: 'KOMITE',
          title: 'Ketua Komite Madrasah',
          name: formData.namaKetuaKomite,
          isSigned: true,
          signedAt: `${formData.tanggalPengesahan} 09:00 WIB`,
          digitalHash: 'SHA256-KMA1503-KOM-CINTA-KOMITE-VALID',
        },
        {
          id: 'SIG-KOM-03',
          role: 'PENGAWAS',
          title: 'Pengawas Pembina Kemenag',
          name: formData.namaPengawas,
          nip: formData.nipPengawas,
          isSigned: true,
          signedAt: `${formData.tanggalRekomendasi} 10:00 WIB`,
          digitalHash: 'SHA256-KMA1503-KOM-CINTA-PENGAWAS-VALID',
        },
      ],
    };
  }, [formData]);

  const handleSaveData = () => {
    try {
      localStorage.setItem('kom_cinta_custom_data', JSON.stringify(formData));
      if (onSaveToArchive) {
        onSaveToArchive(officialDocRepresentation);
      }
      if (onAddLog) {
        onAddLog(`Menyimpan kustomisasi naskah Kurikulum Berbasis Cinta (KOM CINTA) T.A ${formData.tahunAjaran}`);
      }
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3000);
    } catch (e) {
      console.error('Error saving kom cinta data', e);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan naskah ke template standar PDF resmi MI Ma\'arif NU 2 Sanggreman (KMA 1503 Tahun 2025)?')) {
      setFormData(defaultKomCintaData);
      localStorage.removeItem('kom_cinta_custom_data');
      if (onAddLog) {
        onAddLog('Mereset naskah KOM CINTA ke data template PDF asli');
      }
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 2500);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-800/80 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-700/60">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>KMA 1503 TAHUN 2025 • DEEP LEARNING & PANCA CINTA</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white font-serif">
              Modul KOM CINTA (Kurikulum Operasional Madrasah)
            </h1>
            <p className="text-emerald-200/90 text-xs sm:text-sm max-w-2xl">
              Naskah lengkap 86 halaman buku pedoman kurikulum madrasah berbasis cinta kasih, penguatan karakter <em>Rahmatan lil 'Alamin</em>, struktur pembelajaran mendalam <em>(Deep Learning)</em>, dan integrasi TIK/AI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowPengesahModal(true)}
              className="flex items-center space-x-2 bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl border border-emerald-600/70 shadow-md transition-all cursor-pointer text-xs sm:text-sm active:scale-95"
              title="Modul Khusus Identitas Komite, Pengawas Pembina, dan Kasi Pendma Banyumas"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Modul Pejabat Pengesah</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenPrintModal(officialDocRepresentation)}
              className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all cursor-pointer text-xs sm:text-sm active:scale-95"
              title="Cetak atau ekspor naskah lengkap ke PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Ekspor PDF</span>
            </button>

            <button
              type="button"
              onClick={handleSaveData}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-xs sm:text-sm active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Naskah</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="flex items-center space-x-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 px-3 py-2.5 rounded-xl border border-emerald-700/70 text-xs transition-all cursor-pointer"
              title="Kembalikan ke naskah asli PDF MI Ma'arif NU 2 Sanggreman"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset PDF</span>
            </button>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="mt-4 bg-emerald-800/90 border border-emerald-500 text-emerald-100 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Naskah KOM CINTA berhasil disinkronkan dan disimpan ke arsip resmi!</span>
          </div>
        )}
      </div>

      {/* Main Switcher: Preview vs Editor */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2 bg-slate-200/80 p-1 rounded-xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSubTab('PREVIEW')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'PREVIEW'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4 text-emerald-700" />
            <span>Pratinjau Naskah Lengkap</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('EDITOR')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'EDITOR'
                ? 'bg-white text-emerald-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-4 h-4 text-emerald-700" />
            <span>Sesuaikan / Edit Naskah</span>
          </button>
        </div>

        {/* Quick Chapter Navigation Pills (Preview Mode) */}
        {activeSubTab === 'PREVIEW' && (
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] overflow-x-auto w-full sm:w-auto pb-1">
            <span className="text-slate-600 font-semibold mr-1">Lompat Bab:</span>
            <button
              type="button"
              onClick={() => scrollToSection('kom-cinta-cover')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium"
            >
              Cover
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kom-cinta-pengesahan')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium"
            >
              Pengesahan
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kom-cinta-bab1')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium"
            >
              Bab I
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kom-cinta-bab2')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium"
            >
              Bab II
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kom-cinta-bab3')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium"
            >
              Bab III
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kom-cinta-bab4')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium"
            >
              Bab IV
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kom-cinta-bab5')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium"
            >
              Bab V
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('kom-cinta-lampiran')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium"
            >
              15 Lampiran
            </button>
          </div>
        )}
      </div>

      {/* ======================= SUB TAB 1: PREVIEW MODE ======================= */}
      {activeSubTab === 'PREVIEW' && (
        <div className="bg-slate-100/80 p-4 sm:p-8 rounded-2xl border border-slate-200">
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-12 shadow-xl rounded-xl border border-slate-200">
            <KomCintaDocumentView
              document={officialDocRepresentation}
              profile={profile}
              teachers={teachers}
              students={students}
              customData={formData}
            />
          </div>
        </div>
      )}

      {/* ======================= SUB TAB 2: EDITOR MODE ======================= */}
      {activeSubTab === 'EDITOR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Editor Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-1">
            <p className="text-[11px] font-bold text-slate-600 uppercase px-3 py-1 tracking-wider">
              Bagian Naskah
            </p>
            <button
              type="button"
              onClick={() => setEditorSection('IDENTITY')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                editorSection === 'IDENTITY'
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Building className="w-4 h-4 text-emerald-400" />
              <span>1. Identitas & Pejabat</span>
            </button>

            <button
              type="button"
              onClick={() => setEditorSection('VISION')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                editorSection === 'VISION'
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>2. Visi, Misi & Tujuan</span>
            </button>

            <button
              type="button"
              onClick={() => setEditorSection('PROGRAMS')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                editorSection === 'PROGRAMS'
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>3. Program Unggulan & SOAR</span>
            </button>

            <button
              type="button"
              onClick={() => setEditorSection('CURRICULUM')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                editorSection === 'CURRICULUM'
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>4. Kurikulum & Muatan Lokal</span>
            </button>

            <button
              type="button"
              onClick={() => setEditorSection('HABITUATION')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                editorSection === 'HABITUATION'
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>5. Panca Cinta & Pembiasaan</span>
            </button>

            <button
              type="button"
              onClick={() => setEditorSection('CRITERIA')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                editorSection === 'CRITERIA'
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>6. Kenaikan & Kelulusan</span>
            </button>
          </div>

          {/* Editor Form Panels */}
          <div className="lg:col-span-9 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            {/* SECTION 1: IDENTITY */}
            {editorSection === 'IDENTITY' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-700" />
                  Identitas Madrasah & Pejabat Pengesah
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Madrasah</label>
                    <input
                      type="text"
                      value={formData.namaMadrasah}
                      onChange={(e) => setFormData({ ...formData, namaMadrasah: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tahun Ajaran</label>
                    <input
                      type="text"
                      value={formData.tahunAjaran}
                      onChange={(e) => setFormData({ ...formData, tahunAjaran: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">NSM</label>
                    <input
                      type="text"
                      value={formData.nsm}
                      onChange={(e) => setFormData({ ...formData, nsm: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">NPSN</label>
                    <input
                      type="text"
                      value={formData.npsn}
                      onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Akreditasi</label>
                    <input
                      type="text"
                      value={formData.statusAkreditasi}
                      onChange={(e) => setFormData({ ...formData, statusAkreditasi: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nomor Surat Permohonan</label>
                    <input
                      type="text"
                      value={formData.nomorSuratPermohonan}
                      onChange={(e) => setFormData({ ...formData, nomorSuratPermohonan: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Alamat Madrasah</label>
                    <input
                      type="text"
                      value={formData.alamat}
                      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Madrasah</label>
                    <input
                      type="text"
                      value={formData.namaKepala}
                      onChange={(e) => setFormData({ ...formData, namaKepala: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">NIP Kepala Madrasah</label>
                    <input
                      type="text"
                      value={formData.nipKepala}
                      onChange={(e) => setFormData({ ...formData, nipKepala: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Pengawas Pembina</label>
                    <input
                      type="text"
                      value={formData.namaPengawas}
                      onChange={(e) => setFormData({ ...formData, namaPengawas: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">NIP Pengawas</label>
                    <input
                      type="text"
                      value={formData.nipPengawas}
                      onChange={(e) => setFormData({ ...formData, nipPengawas: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Kasi Penma Kemenag</label>
                    <input
                      type="text"
                      value={formData.namaKasiPenma}
                      onChange={(e) => setFormData({ ...formData, namaKasiPenma: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">NIP Kasi Penma</label>
                    <input
                      type="text"
                      value={formData.nipKasiPenma}
                      onChange={(e) => setFormData({ ...formData, nipKasiPenma: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Ketua Komite</label>
                    <input
                      type="text"
                      value={formData.namaKetuaKomite}
                      onChange={(e) => setFormData({ ...formData, namaKetuaKomite: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Bidang Kurikulum (TPKM)</label>
                    <input
                      type="text"
                      value={formData.namaBidangKurikulum}
                      onChange={(e) => setFormData({ ...formData, namaBidangKurikulum: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: VISION */}
            {editorSection === 'VISION' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-700" />
                  Visi, Misi, Indikator & Tujuan Madrasah
                </h3>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rumusan Visi Madrasah</label>
                  <textarea
                    rows={3}
                    value={formData.visi}
                    onChange={(e) => setFormData({ ...formData, visi: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Motto Madrasah</label>
                  <input
                    type="text"
                    value={formData.motto}
                    onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Misi Madrasah (Satu baris per poin)</label>
                  <textarea
                    rows={6}
                    value={formData.misi.join('\n')}
                    onChange={(e) => setFormData({ ...formData, misi: e.target.value.split('\n').filter(Boolean) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 leading-relaxed font-mono text-[11.5px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tujuan Madrasah (Satu baris per poin)</label>
                  <textarea
                    rows={6}
                    value={formData.tujuan.join('\n')}
                    onChange={(e) => setFormData({ ...formData, tujuan: e.target.value.split('\n').filter(Boolean) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 leading-relaxed font-mono text-[11.5px]"
                  />
                </div>
              </div>
            )}

            {/* SECTION 3: PROGRAMS */}
            {editorSection === 'PROGRAMS' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  Program Unggulan Madrasah & Fasilitas
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Luas Lahan Wakaf</label>
                    <input
                      type="text"
                      value={formData.sarpras.luasLahan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sarpras: { ...formData.sarpras, luasLahan: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Luas Bangunan</label>
                    <input
                      type="text"
                      value={formData.sarpras.luasBangunan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sarpras: { ...formData.sarpras, luasBangunan: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
                  <h4 className="font-bold text-emerald-950 mb-2">Program Unggulan Budaya Lokal: Tahfidz & Doa Harian</h4>
                  <p className="text-slate-600 text-[11.5px] mb-2">
                    Mencakup hafalan surat-surat Juz 30 dan do'a harian dari Kelas I sampai Kelas VI yang dilaksanakan setiap pagi sebelum KBM.
                  </p>
                  <div className="space-y-2">
                    {formData.tahfidzProgram.map((tp, idx) => (
                      <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200">
                        <strong className="text-emerald-900 block">{tp.kelas}</strong>
                        <p className="text-slate-700 text-[11px]">{tp.materi.join(' • ')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: CURRICULUM */}
            {editorSection === 'CURRICULUM' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-700" />
                  Struktur Kurikulum & Muatan Lokal
                </h3>
                <p className="text-slate-600">
                  Struktur Kurikulum disusun mengacu pada <strong>KMA 1503 Tahun 2025</strong> dengan 14 mata pelajaran (termasuk BTA, Bahasa Jawa, Ke-NU-an, TIK, serta Coding & AI).
                </p>

                <div className="overflow-x-auto border rounded-xl">
                  <table className="w-full text-[11px] text-left">
                    <thead className="bg-slate-100 font-bold text-slate-900">
                      <tr>
                        <th className="p-2 w-8">No</th>
                        <th className="p-2">Mata Pelajaran</th>
                        <th className="p-2 w-16 text-center">Kelas 1</th>
                        <th className="p-2 w-16 text-center">Kelas 2</th>
                        <th className="p-2 w-16 text-center">Kelas 3</th>
                        <th className="p-2 w-16 text-center">Kelas 4</th>
                        <th className="p-2 w-16 text-center">Kelas 5</th>
                        <th className="p-2 w-16 text-center">Kelas 6</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.strukturMapel.map((m, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-2 font-mono">{m.no}</td>
                          <td className="p-2 font-semibold text-slate-900">{m.mapel}</td>
                          <td className="p-2 text-center font-mono">{m.k1}</td>
                          <td className="p-2 text-center font-mono">{m.k2}</td>
                          <td className="p-2 text-center font-mono">{m.k3}</td>
                          <td className="p-2 text-center font-mono">{m.k4}</td>
                          <td className="p-2 text-center font-mono">{m.k5}</td>
                          <td className="p-2 text-center font-mono">{m.k6}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECTION 5: HABITUATION */}
            {editorSection === 'HABITUATION' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                  Nilai Panca Cinta & Budaya Pembiasaan Karakter
                </h3>

                <div className="space-y-3">
                  <label className="block font-semibold text-slate-700">Panca Cinta (5 Pilar Nilai)</label>
                  {formData.pancaCinta.map((pc, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-rose-950 block">{pc.pilar}</strong>
                      <p className="text-slate-600 text-[11.5px]">{pc.deskripsi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 6: CRITERIA */}
            {editorSection === 'CRITERIA' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700" />
                  Kriteria Kenaikan Kelas, Kelulusan & 15 Lampiran
                </h3>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kriteria Kenaikan Kelas</label>
                  <textarea
                    rows={4}
                    value={formData.kriteriaKenaikan.join('\n')}
                    onChange={(e) => setFormData({ ...formData, kriteriaKenaikan: e.target.value.split('\n').filter(Boolean) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono text-[11.5px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kriteria Kelulusan (Kelas VI)</label>
                  <textarea
                    rows={4}
                    value={formData.kriteriaKelulusan.join('\n')}
                    onChange={(e) => setFormData({ ...formData, kriteriaKelulusan: e.target.value.split('\n').filter(Boolean) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono text-[11.5px]"
                  />
                </div>
              </div>
            )}

            {/* Bottom Actions inside Editor */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-xs text-rose-700 hover:text-rose-900 font-semibold cursor-pointer"
              >
                Reset ke Standar PDF Asli
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('PREVIEW')}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Lihat Pratinjau
                </button>
                <button
                  type="button"
                  onClick={handleSaveData}
                  className="flex items-center space-x-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Khusus Identitas Pejabat Pengesah Banyumas */}
      <PengesahPejabatModal
        isOpen={showPengesahModal}
        onClose={() => setShowPengesahModal(false)}
        profile={profile}
        komData={formData}
        onSave={(updated) => {
          const updatedFormData = {
            ...formData,
            namaKetuaKomite: updated.namaKetuaKomite,
            namaPengawas: updated.namaPengawas,
            nipPengawas: updated.nipPengawas,
            namaKasiPenma: updated.namaKasiPenma,
            nipKasiPenma: updated.nipKasiPenma,
            tanggalRekomendasi: updated.tanggalRekomendasi || formData.tanggalRekomendasi,
            tanggalPengesahan: updated.tanggalPengesahan || formData.tanggalPengesahan,
          };
          setFormData(updatedFormData);
          try {
            localStorage.setItem('kom_cinta_custom_data', JSON.stringify(updatedFormData));
          } catch (e) {
            console.error(e);
          }
          if (onAddLog) {
            onAddLog(`Penyelarasan Pejabat Pengesah Banyumas (Kasi: ${updated.namaKasiPenma}, Pengawas: ${updated.namaPengawas}, Komite: ${updated.namaKetuaKomite})`);
          }
          setSaveSuccessMsg(true);
          setTimeout(() => setSaveSuccessMsg(false), 3000);
        }}
      />
    </div>
  );
};
