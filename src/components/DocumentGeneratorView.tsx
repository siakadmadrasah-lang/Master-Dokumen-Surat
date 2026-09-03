import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Save,
  CheckCircle2,
  FileText,
  Eye,
  Search,
  Wand2,
  Filter,
  UserCheck,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  BookOpen,
  ArrowRightLeft,
  FileCheck2,
  ShieldAlert,
  Mail,
  RefreshCw,
  Heart,
  Layers,
  ChevronRight,
  Plus,
  Trash2,
  ArrowLeft,
  Printer,
} from 'lucide-react';
import {
  MadrasahProfile,
  Teacher,
  Student,
  OfficialDocument,
  DocumentType,
} from '../types';
import {
  DOCUMENT_TYPES,
  DocumentTypeOption,
  generateDocumentNumber,
  createDefaultDocumentPayload,
  syncDocumentWithDatabase,
} from '../utils/documentTemplates';
import { OfficialDocumentSheet } from './OfficialDocumentSheet';

interface DocumentGeneratorViewProps {
  profile: MadrasahProfile;
  teachers: Teacher[];
  students: Student[];
  documents: OfficialDocument[];
  initialDocType?: DocumentType;
  editingDoc?: OfficialDocument | null;
  onSaveDocument: (doc: OfficialDocument) => void;
  onOpenSignModal: (signer: any, doc: OfficialDocument) => void;
  onBack?: () => void;
  onOpenPrintModal?: (doc?: OfficialDocument) => void;
}

export const DocumentGeneratorView: React.FC<DocumentGeneratorViewProps> = ({
  profile,
  teachers,
  students,
  documents,
  initialDocType = 'KOM',
  editingDoc = null,
  onSaveDocument,
  onOpenSignModal,
  onBack,
  onOpenPrintModal,
}) => {
  const docType: DocumentType = (initialDocType as DocumentType) || 'KOM';
  const [selectedType, setSelectedType] = useState<DocumentType>(docType);
  const [activeTab, setActiveTab] = useState<'FORM' | 'PREVIEW'>('FORM');
  const [komChapterTab, setKomChapterTab] = useState<'PENGANTAR' | 'BAB1' | 'BAB2' | 'BAB3' | 'BAB4' | 'BAB5' | 'LAMPIRAN'>('BAB1');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const [currentDoc, setCurrentDoc] = useState<OfficialDocument>(() => {
    if (editingDoc) return editingDoc;
    const defaultPayload = createDefaultDocumentPayload(
      docType,
      profile,
      teachers,
      students
    );
    return {
      ...defaultPayload,
      id: `DOC-${docType}-${Date.now()}`,
      nomorSurat: generateDocumentNumber(docType, profile, documents.length),
    } as OfficialDocument;
  });

  // AI Loading states
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiPromptCustom, setAiPromptCustom] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiErrorMessage, setAiErrorMessage] = useState<string | null>(null);

  // Sync editingDoc if provided
  useEffect(() => {
    if (editingDoc) {
      setCurrentDoc(editingDoc);
      setSelectedType(editingDoc.type);
    }
  }, [editingDoc]);

  // Sync with live database handler
  const handleSyncWithLiveDb = () => {
    const synced = syncDocumentWithDatabase(currentDoc, profile, teachers, students);
    setCurrentDoc(synced);
    setSyncFeedback('✅ Dokumen berhasil disinkronkan dengan data Guru & Siswa terkini!');
    setTimeout(() => setSyncFeedback(null), 4000);
  };

  // Handle Changing Document Type
  const handleTypeChange = (newType: DocumentType) => {
    setSelectedType(newType);
    const defaultPayload = createDefaultDocumentPayload(newType, profile, teachers, students);
    setCurrentDoc({
      ...defaultPayload,
      id: `DOC-${newType}-${Date.now()}`,
      nomorSurat: generateDocumentNumber(newType, profile, documents.length),
    } as OfficialDocument);
  };

  // Filtered document types list
  const filteredDocTypes = DOCUMENT_TYPES.filter((dt) => {
    const matchesCategory = categoryFilter === 'ALL' || dt.category === categoryFilter;
    const matchesSearch =
      dt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dt.badgeText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Student Selector for Student Docs
  const handleStudentSelect = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    setCurrentDoc((prev) => {
      const updatedContent = { ...prev.contentData, studentData: student };
      return {
        ...prev,
        targetPersonId: student.id,
        targetPersonName: student.nama,
        title:
          prev.type === 'SURAT_AKTIF_SISWA'
            ? `Surat Keterangan Aktif Belajar - ${student.nama}`
            : prev.type === 'SURAT_MUTASI_SISWA'
            ? `Surat Keterangan Pindah / Mutasi Siswa - ${student.nama}`
            : prev.type === 'SURAT_DISPENSASI_SISWA'
            ? `Surat Dispensasi Siswa Delegasi Lomba - ${student.nama}`
            : prev.type === 'SURAT_REKOMENDASI'
            ? `Surat Rekomendasi Siswa Berprestasi - ${student.nama}`
            : prev.title,
        contentData: updatedContent,
      };
    });
  };

  // Teacher Selector for Teacher Docs
  const handleTeacherSelect = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    if (!teacher) return;

    setCurrentDoc((prev) => {
      const updatedContent = { ...prev.contentData, teacherData: teacher };
      return {
        ...prev,
        targetPersonId: teacher.id,
        targetPersonName: teacher.nama,
        title: `Surat Tugas Pelatihan / Dinas - ${teacher.nama}`,
        contentData: updatedContent,
      };
    });
  };

  // Save Document handler
  const handleSave = (status: 'DRAFT' | 'READY_FOR_SIGN' = 'READY_FOR_SIGN') => {
    const updated = {
      ...currentDoc,
      status: currentDoc.status === 'SIGNED' ? 'SIGNED' : status,
      updatedAt: new Date().toISOString(),
    };
    onSaveDocument(updated);
  };

  // AI Generation for KOM Berbasis Cinta
  const handleGenerateKomWithAi = async () => {
    setIsAiGenerating(true);
    setAiErrorMessage(null);
    try {
      const response = await fetch('/api/ai/generate-kom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          madrasahName: profile.namaMadrasah,
          jenjang: profile.jenjang,
          kepalaMadrasah: profile.namaKepala,
          lokasi: `${profile.desaKelurahan}, ${profile.kecamatan}, ${profile.kabupatenKota}`,
          karakteristik: aiPromptCustom || 'Madrasah ramah anak, berbasis tahfidz, sains, dan berwawasan lingkungan adiwiyata',
          visiMisi: currentDoc.contentData?.visi,
          fokusNilaiCinta: 'Cinta Allah & Rasul, Cinta Sesama & Anti-Bullying, Cinta Ilmu, Cinta Lingkungan & Moderasi Beragama',
          kurikulumVersion: 'KMA 450 Tahun 2024',
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        const aiRes = data.data;
        setCurrentDoc((prev) => ({
          ...prev,
          contentData: {
            ...prev.contentData,
            visi: aiRes.visiMisiTujuan || prev.contentData.visi,
            tujuan: aiRes.visiMisiTujuan || prev.contentData.tujuan,
            pilarCinta: [
              {
                judul: 'Cinta Allah & Rasul (Mahabbatullah wa Rasulihi)',
                deskripsi: 'Pondasi utama ibadah khusyuk, tahfidz, dan keteladanan akhlak mulia.',
              },
              {
                judul: 'Cinta Diri & Sesama (Mahabbatun Nafs wal Ikhwan)',
                deskripsi: 'Madrasah ramah anak, anti-kekerasan, empati, dan gotong royong.',
              },
              {
                judul: 'Cinta Ilmu & Kebenaran (Mahabbatul Ilm)',
                deskripsi: 'Semangat bernalar kritis, riset ilmiah madrasah, dan kejujuran akademik.',
              },
              {
                judul: 'Cinta Lingkungan & Bangsa (Mahabbatul Bi\'ah wal Wathan)',
                deskripsi: 'Madrasah hijau, hemat energi, dan komitmen moderasi beragama membela NKRI.',
              },
            ],
            aiGeneratedAnalysis: aiRes.analisisKarakteristik,
            aiGeneratedPerencanaan: aiRes.perencanaanPembelajaran,
          },
        }));
        setShowAiModal(false);
      } else {
        setAiErrorMessage(data.error || 'Gagal menghubungi asisten AI.');
      }
    } catch (err: any) {
      console.error('AI KOM error:', err);
      setAiErrorMessage(err.message || 'Koneksi AI gagal.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  // AI Legal Consideration Generator for SK
  const handleGenerateSkLegalWithAi = async () => {
    setIsAiGenerating(true);
    setAiErrorMessage(null);
    try {
      const response = await fetch('/api/ai/generate-sk-legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jenisSK: currentDoc.title,
          tahunAjaran: currentDoc.tahunAjaran,
          nomorSK: currentDoc.nomorSurat,
          namaMadrasah: profile.namaMadrasah,
          jenjang: profile.jenjang,
          halKhusus: aiPromptCustom || 'Sesuai regulasi KMA 450 Tahun 2024 dan beban kerja guru',
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        const legalData = data.data;
        setCurrentDoc((prev) => ({
          ...prev,
          contentData: {
            ...prev.contentData,
            menimbang: legalData.menimbang || prev.contentData.menimbang,
            mengingat: legalData.mengingat || prev.contentData.mengingat,
            memperhatikan: legalData.memperhatikan || prev.contentData.memperhatikan,
            diktum: {
              kesatu: legalData.diktumPertama || prev.contentData.diktum?.kesatu,
              kedua: legalData.diktumKedua || prev.contentData.diktum?.kedua,
              ketiga: legalData.diktumKetiga || prev.contentData.diktum?.ketiga,
              keempat: legalData.diktumKeempat || prev.contentData.diktum?.keempat,
              kelima: legalData.diktumKelima || prev.contentData.diktum?.kelima,
            },
          },
        }));
        setShowAiModal(false);
      } else {
        setAiErrorMessage(data.error || 'Gagal generate konsiderans hukum.');
      }
    } catch (err: any) {
      console.error('AI SK Legal error:', err);
      setAiErrorMessage(err.message || 'Koneksi AI gagal.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          {onBack && (
            <button
              id="generator-back-btn"
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
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-2 truncate">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 flex-shrink-0" />
              <span className="truncate">Studio Generator Dokumen & SK Madrasah</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
              Standar KMA 450/2024, integrasi database siswa/guru, dan TTE QR Code resmi Kemenag.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
            <button
              id="view-tab-form-btn"
              type="button"
              onClick={() => setActiveTab('FORM')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer text-xs ${
                activeTab === 'FORM'
                  ? 'bg-white text-emerald-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              id="view-tab-preview-btn"
              type="button"
              onClick={() => setActiveTab('PREVIEW')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer text-xs ${
                activeTab === 'PREVIEW'
                  ? 'bg-white text-emerald-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pratinjau Lembar</span>
            </button>
          </div>

          <button
            id="sync-live-db-btn"
            type="button"
            onClick={handleSyncWithLiveDb}
            className="px-3 py-1.5 sm:py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
            title="Sinkronkan data siswa & guru terbaru ke dokumen ini"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sync Data</span>
          </button>

          <button
            id="open-ai-assist-btn"
            type="button"
            onClick={() => setShowAiModal(true)}
            className="px-3 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Asisten</span>
          </button>

          <button
            id="save-doc-btn"
            type="button"
            onClick={() => handleSave('READY_FOR_SIGN')}
            className="px-3.5 py-1.5 sm:py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan</span>
          </button>
        </div>
      </div>

      {/* Sync Feedback Toast Notification */}
      {syncFeedback && (
        <div className="p-3 bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center justify-between shadow-md">
          <span>{syncFeedback}</span>
          <button type="button" onClick={() => setSyncFeedback(null)} className="text-emerald-200 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Document Type Picker Card with Filters & Search */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div>
            <span className="text-xs font-bold text-slate-800 block uppercase tracking-wider">
              Pilih Jenis Dokumen / SK Resmi ({filteredDocTypes.length} Pilihan):
            </span>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="search-doc-type-input"
              type="text"
              placeholder="Cari SK / jenis surat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'ALL', label: 'Semua' },
            { id: 'SK_KEPALA', label: 'SK Kepala Madrasah (Wajib)' },
            { id: 'KURIKULUM', label: 'Kurikulum & P5RA' },
            { id: 'MODUL_AJAR', label: 'Modul Ajar / RPP' },
            { id: 'SURAT_KETERANGAN', label: 'Layanan Siswa' },
            { id: 'SURAT_TUGAS', label: 'GTK & Dinas' },
            { id: 'PIAGAM', label: 'Piagam Komitmen' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer text-[11px] ${
                categoryFilter === cat.id
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-2.5 max-h-72 overflow-y-auto pr-1">
          {filteredDocTypes.map((dt) => {
            const isSelected = selectedType === dt.type;
            return (
              <button
                key={dt.type}
                id={`doc-type-${dt.type.toLowerCase()}-btn`}
                type="button"
                onClick={() => handleTypeChange(dt.type)}
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1.5 cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs ring-2 ring-emerald-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 text-slate-700 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {dt.badgeText}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                </div>
                <h4 className="text-xs font-bold leading-snug line-clamp-2">{dt.title}</h4>
                <p className="text-[10px] text-slate-500 line-clamp-1">{dt.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Form Editor or Sheet Preview */}
      {activeTab === 'FORM' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left 2 Cols: Form Fields */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
            {/* Header Data */}
            <div className="border-b border-slate-100 pb-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Informasi & Nomor Dokumen
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Judul Dokumen Resmi
                  </label>
                  <input
                    id="input-doc-title"
                    type="text"
                    value={currentDoc.title}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, title: e.target.value })}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nomor Surat / SK
                  </label>
                  <input
                    id="input-doc-number"
                    type="text"
                    value={currentDoc.nomorSurat}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, nomorSurat: e.target.value })}
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Tanggal Penetapan / Surat
                  </label>
                  <input
                    id="input-doc-date"
                    type="text"
                    value={currentDoc.tanggalSurat}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, tanggalSurat: e.target.value })}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Tahun Pelajaran & Semester
                  </label>
                  <input
                    id="input-doc-semester"
                    type="text"
                    value={`${currentDoc.tahunAjaran} (${currentDoc.semester})`}
                    disabled
                    className="w-full text-xs bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Target Person Pickers if Student/Teacher Doc */}
            {(selectedType === 'SURAT_AKTIF_SISWA' ||
              selectedType === 'SURAT_MUTASI_SISWA' ||
              selectedType === 'SURAT_DISPENSASI_SISWA' ||
              selectedType === 'SURAT_REKOMENDASI') && (
              <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                <label className="text-xs font-bold text-emerald-950 flex items-center space-x-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-700" />
                  <span>Pilih Siswa dari Database Madrasah (Auto-Fill Data):</span>
                </label>
                <select
                  id="select-target-student"
                  value={currentDoc.targetPersonId || ''}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full text-xs bg-white border border-emerald-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-hidden"
                >
                  <option value="">-- Pilih Nama Peserta Didik --</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nama} ({s.rombel || 'Kelas'} - NISN: {s.nisn})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedType === 'SURAT_TUGAS_GURU' && (
              <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                <label className="text-xs font-bold text-emerald-950 flex items-center space-x-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  <span>Pilih Guru yang Ditugaskan (Auto-Fill Data):</span>
                </label>
                <select
                  id="select-target-teacher"
                  value={currentDoc.targetPersonId || ''}
                  onChange={(e) => handleTeacherSelect(e.target.value)}
                  className="w-full text-xs bg-white border border-emerald-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:outline-hidden"
                >
                  <option value="">-- Pilih Nama Guru --</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nama} ({t.mapelUtama} - NIP: {t.nip || '-'})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* KOM Specific fields (Multi-Chapter Editor) */}
            {selectedType === 'KOM' && (
              <div className="space-y-4 p-4 bg-slate-50/80 border border-slate-200 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-700" />
                      Editor Bab & Isi Dokumen KOM (KMA 1503/2025)
                    </h3>
                    <p className="text-[11px] text-slate-500">Kelola 5 Bab & 17 Lampiran Kurikulum Operasional Madrasah Berbasis Cinta.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSyncWithLiveDb}
                    className="self-start sm:self-auto px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3 h-3 text-emerald-700" />
                    <span>Sync Live Data</span>
                  </button>
                </div>

                {/* Sub-tabs for KOM Chapters */}
                <div className="flex flex-wrap gap-1 bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setKomChapterTab('PENGANTAR')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      komChapterTab === 'PENGANTAR' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Kata Pengantar
                  </button>
                  <button
                    type="button"
                    onClick={() => setKomChapterTab('BAB1')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      komChapterTab === 'BAB1' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bab I: Karakteristik & Visi
                  </button>
                  <button
                    type="button"
                    onClick={() => setKomChapterTab('BAB2')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      komChapterTab === 'BAB2' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bab II: Organisasi & Kokurikuler
                  </button>
                  <button
                    type="button"
                    onClick={() => setKomChapterTab('BAB3')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      komChapterTab === 'BAB3' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bab III: Perencanaan & Deep Learning
                  </button>
                  <button
                    type="button"
                    onClick={() => setKomChapterTab('BAB4')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      komChapterTab === 'BAB4' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bab IV: Kurikulum Berbasis Cinta
                  </button>
                  <button
                    type="button"
                    onClick={() => setKomChapterTab('BAB5')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      komChapterTab === 'BAB5' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Bab V: Pendampingan & Evaluasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setKomChapterTab('LAMPIRAN')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      komChapterTab === 'LAMPIRAN' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    17 Lampiran
                  </button>
                </div>

                {/* Content based on selected chapter */}
                {komChapterTab === 'PENGANTAR' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Naskah Kata Pengantar Kepala Madrasah
                      </label>
                      <textarea
                        rows={6}
                        value={currentDoc.contentData?.kataPengantar || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: { ...currentDoc.contentData, kataPengantar: e.target.value },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {komChapterTab === 'BAB1' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        2. Karakteristik Peserta Didik (Auto Sync: {students.length} Siswa)
                      </label>
                      <textarea
                        rows={3}
                        value={currentDoc.contentData?.bab1?.karakteristikPesertaDidik || currentDoc.contentData?.bab1_karakteristik?.karakteristikSiswa || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              bab1: {
                                ...currentDoc.contentData?.bab1,
                                karakteristikPesertaDidik: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        3. Karakteristik GTK (Auto Sync: {teachers.length} Guru)
                      </label>
                      <textarea
                        rows={3}
                        value={currentDoc.contentData?.bab1?.karakteristikGTK || currentDoc.contentData?.bab1_karakteristik?.karakteristikGTK || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              bab1: {
                                ...currentDoc.contentData?.bab1,
                                karakteristikGTK: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        4. Karakteristik Sosial, Budaya, dan Lingkungan Madrasah
                      </label>
                      <textarea
                        rows={2}
                        value={currentDoc.contentData?.bab1?.karakteristikSosialBudaya || currentDoc.contentData?.bab1_karakteristik?.analisisSosialBudaya || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              bab1: {
                                ...currentDoc.contentData?.bab1,
                                karakteristikSosialBudaya: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        7. Visi Madrasah
                      </label>
                      <textarea
                        rows={2}
                        value={currentDoc.contentData?.bab1?.visi || currentDoc.contentData?.visi || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              visi: e.target.value,
                              bab1: { ...currentDoc.contentData?.bab1, visi: e.target.value },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        8. Misi Madrasah (1 baris = 1 butir misi)
                      </label>
                      <textarea
                        rows={4}
                        value={currentDoc.contentData?.bab1?.misi?.join('\n') || currentDoc.contentData?.misi?.join('\n') || ''}
                        onChange={(e) => {
                          const list = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              misi: list,
                              bab1: { ...currentDoc.contentData?.bab1, misi: list },
                            },
                          });
                        }}
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden font-mono"
                      />
                    </div>
                  </div>
                )}

                {komChapterTab === 'BAB2' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Tema Kokurikuler (Penyesuaian KMA 1503/2025)
                      </label>
                      <div className="space-y-1.5">
                        {(currentDoc.contentData?.bab2?.kokurikulerThemes || currentDoc.contentData?.bab2?.temaKokurikuler || currentDoc.contentData?.p5raThemes || []).map((tema: any, idx: number) => {
                          const val = typeof tema === 'string' ? tema : `${tema.tema || ''}: ${tema.fokus || ''}`;
                          return (
                            <input
                              key={idx}
                              type="text"
                              value={val}
                              onChange={(e) => {
                                const updated = [...(currentDoc.contentData?.bab2?.kokurikulerThemes || currentDoc.contentData?.p5raThemes || [])];
                                updated[idx] = e.target.value;
                                setCurrentDoc({
                                  ...currentDoc,
                                  contentData: {
                                    ...currentDoc.contentData,
                                    p5raThemes: updated,
                                    bab2: { ...currentDoc.contentData?.bab2, kokurikulerThemes: updated },
                                  },
                                });
                              }}
                              className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                            />
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Muatan Lokal & Ekstrakurikuler
                      </label>
                      <textarea
                        rows={2}
                        value={currentDoc.contentData?.bab2?.muatanLokal || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              bab2: { ...currentDoc.contentData?.bab2, muatanLokal: e.target.value },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {komChapterTab === 'BAB3' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Capaian Pembelajaran (CP), TP, & Alur Tujuan Pembelajaran (ATP)
                      </label>
                      <textarea
                        rows={3}
                        value={currentDoc.contentData?.bab3?.cp_tp_atp || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              bab3: { ...currentDoc.contentData?.bab3, cp_tp_atp: e.target.value },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Asesmen Formatif & Kriteria Kenaikan Kelas (KKTP)
                      </label>
                      <input
                        type="text"
                        value={currentDoc.contentData?.bab3?.asesmenFormatif || currentDoc.contentData?.asesmenPembelajaran?.formatif || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              bab3: { ...currentDoc.contentData?.bab3, asesmenFormatif: e.target.value },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {komChapterTab === 'BAB4' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Pengantar Kurikulum Berbasis Cinta (Mahabbah)
                      </label>
                      <textarea
                        rows={3}
                        value={currentDoc.contentData?.bab4?.pengantarCinta || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              bab4: { ...currentDoc.contentData?.bab4, pengantarCinta: e.target.value },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Pembiasaan & Budaya Positif (Zero Bullying & Welas Asih)
                      </label>
                      <textarea
                        rows={2}
                        value={currentDoc.contentData?.bab4?.budayaPositif || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              bab4: { ...currentDoc.contentData?.bab4, budayaPositif: e.target.value },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {komChapterTab === 'BAB5' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Pendampingan, Supervisi Klinis, dan Evaluasi KOM
                      </label>
                      <textarea
                        rows={3}
                        value={currentDoc.contentData?.bab5?.supervisiAkademik || currentDoc.contentData?.pendampinganEvaluasi?.supervisi || ''}
                        onChange={(e) =>
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: {
                              ...currentDoc.contentData,
                              bab5: { ...currentDoc.contentData?.bab5, supervisiAkademik: e.target.value },
                            },
                          })
                        }
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {komChapterTab === 'LAMPIRAN' && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-slate-700 font-semibold">17 Lampiran Resmi KOM (Tersinkron Master Data):</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                      {(currentDoc.contentData?.lampiranList || []).map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 flex-shrink-0" />
                          <span>{typeof item === 'string' ? item : `${item.kode ? item.kode + ': ' : ''}${item.judul || ''}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Form Fields for MODUL_AJAR */}
            {selectedType === 'MODUL_AJAR' && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    Editor Modul Ajar Berbasis Cinta (Deep Learning)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Konfigurasi komponen Modul Ajar: Identitas, Capaian, Nilai Cinta, Langkah Pembelajaran, & Asesmen.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Pendidik / Penyusun Modul
                    </label>
                    <select
                      value={currentDoc.contentData?.namaPenyusun || ''}
                      onChange={(e) =>
                        setCurrentDoc({
                          ...currentDoc,
                          contentData: { ...currentDoc.contentData, namaPenyusun: e.target.value },
                        })
                      }
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    >
                      <option value="">-- Pilih Guru Penyusun --</option>
                      {teachers.map((t) => (
                        <option key={t.id} value={t.nama}>
                          {t.nama} ({t.mapelUtama || t.jabatanUtama})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Mata Pelajaran
                    </label>
                    <input
                      type="text"
                      value={currentDoc.contentData?.mataPelajaran || ''}
                      onChange={(e) =>
                        setCurrentDoc({
                          ...currentDoc,
                          contentData: { ...currentDoc.contentData, mataPelajaran: e.target.value },
                        })
                      }
                      placeholder="e.g. Al-Qur'an Hadis / IPAS / Matematika"
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Fase & Rombel / Kelas
                    </label>
                    <input
                      type="text"
                      value={currentDoc.contentData?.faseKelas || ''}
                      onChange={(e) =>
                        setCurrentDoc({
                          ...currentDoc,
                          contentData: { ...currentDoc.contentData, faseKelas: e.target.value },
                        })
                      }
                      placeholder="e.g. Fase B / Kelas IV"
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Alokasi Waktu
                    </label>
                    <input
                      type="text"
                      value={currentDoc.contentData?.alokasiWaktu || ''}
                      onChange={(e) =>
                        setCurrentDoc({
                          ...currentDoc,
                          contentData: { ...currentDoc.contentData, alokasiWaktu: e.target.value },
                        })
                      }
                      placeholder="e.g. 3 x 35 Menit (1 Pertemuan)"
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Dimensi Profil Lulusan & P5-RA
                  </label>
                  <input
                    type="text"
                    value={currentDoc.contentData?.dimensiP5RA || ''}
                    onChange={(e) =>
                      setCurrentDoc({
                        ...currentDoc,
                        contentData: { ...currentDoc.contentData, dimensiP5RA: e.target.value },
                      })
                    }
                    placeholder="e.g. Beriman Bertakwa (Taaddub), Gotong Royong (Tasyawur), Berkeadaban (Tasamuh)"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Fokus Pilar Nilai Cinta (Mahabbah)
                  </label>
                  <input
                    type="text"
                    value={currentDoc.contentData?.nilaiCintaMadrasah || ''}
                    onChange={(e) =>
                      setCurrentDoc({
                        ...currentDoc,
                        contentData: { ...currentDoc.contentData, nilaiCintaMadrasah: e.target.value },
                      })
                    }
                    placeholder="e.g. Mahabbatun Nafs wal Ikhwan (Kasih Sayang terhadap Teman dan Anti-Bullying)"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Tujuan Pembelajaran (TP)
                  </label>
                  <textarea
                    rows={2}
                    value={currentDoc.contentData?.tujuanPembelajaran || ''}
                    onChange={(e) =>
                      setCurrentDoc({
                        ...currentDoc,
                        contentData: { ...currentDoc.contentData, tujuanPembelajaran: e.target.value },
                      })
                    }
                    placeholder="Tuliskan capaian dan tujuan pembelajaran terukur..."
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Pemahaman Bermakna (Deep Learning)
                  </label>
                  <input
                    type="text"
                    value={currentDoc.contentData?.pemahamanBermakna || ''}
                    onChange={(e) =>
                      setCurrentDoc({
                        ...currentDoc,
                        contentData: { ...currentDoc.contentData, pemahamanBermakna: e.target.value },
                      })
                    }
                    placeholder="Pesan esensial dan hikmah nyata yang dialami peserta didik..."
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Langkah-Langkah Pembelajaran (Mindful, Meaningful, & Joyful)
                  </label>
                  <div className="space-y-2">
                    {(currentDoc.contentData?.langkahPembelajaran || [
                      { tahap: 'Pendahuluan (15 Menit)', deskripsi: '' },
                      { tahap: 'Kegiatan Inti Berdiferensiasi (75 Menit)', deskripsi: '' },
                      { tahap: 'Penutup & Refleksi Cinta (15 Menit)', deskripsi: '' },
                    ]).map((step: any, idx: number) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <input
                          type="text"
                          value={step.tahap || ''}
                          onChange={(e) => {
                            const steps = [...(currentDoc.contentData?.langkahPembelajaran || [])];
                            steps[idx] = { ...steps[idx], tahap: e.target.value };
                            setCurrentDoc({
                              ...currentDoc,
                              contentData: { ...currentDoc.contentData, langkahPembelajaran: steps },
                            });
                          }}
                          className="w-full text-xs font-bold bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                        />
                        <textarea
                          rows={2}
                          value={step.deskripsi || ''}
                          onChange={(e) => {
                            const steps = [...(currentDoc.contentData?.langkahPembelajaran || [])];
                            steps[idx] = { ...steps[idx], deskripsi: e.target.value };
                            setCurrentDoc({
                              ...currentDoc,
                              contentData: { ...currentDoc.contentData, langkahPembelajaran: steps },
                            });
                          }}
                          placeholder="Uraian kegiatan guru dan siswa..."
                          className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Rancangan Asesmen (Diagnostik, Formatif, Sumatif)
                  </label>
                  <textarea
                    rows={2}
                    value={currentDoc.contentData?.asesmen || ''}
                    onChange={(e) =>
                      setCurrentDoc({
                        ...currentDoc,
                        contentData: { ...currentDoc.contentData, asesmen: e.target.value },
                      })
                    }
                    placeholder="Bentuk dan instrumen asesmen..."
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* General Menimbang & Mengingat for SK */}
            {currentDoc.contentData?.menimbang && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Konsiderans Hukum (Menimbang & Mengingat)
                </h3>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Poin Menimbang
                  </label>
                  <div className="space-y-1.5">
                    {currentDoc.contentData.menimbang.map((m: string, idx: number) => (
                      <input
                        key={idx}
                        type="text"
                        value={m}
                        onChange={(e) => {
                          const updated = [...currentDoc.contentData.menimbang];
                          updated[idx] = e.target.value;
                          setCurrentDoc({
                            ...currentDoc,
                            contentData: { ...currentDoc.contentData, menimbang: updated },
                          });
                        }}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="space-y-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span>Penandatangan Digital (TTE)</span>
              </h3>

              <div className="space-y-2">
                {currentDoc.signatures.map((sig, idx) => (
                  <div
                    key={sig.id || idx}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{sig.name}</p>
                      <p className="text-[11px] text-slate-600">{sig.title}</p>
                      <span
                        className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          sig.isSigned
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sig.isSigned ? '✓ Sudah TTE' : 'Belum Ditandatangani'}
                      </span>
                    </div>

                    {!sig.isSigned && (
                      <button
                        type="button"
                        onClick={() => onOpenSignModal(sig, currentDoc)}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold shadow-xs cursor-pointer"
                      >
                        TTE Sekarang
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-900 text-white p-4 sm:p-5 rounded-2xl shadow-xs space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 text-emerald-300">
                <Award className="w-4 h-4" />
                <span>Kepatuhan Regulasi KMA 450</span>
              </h4>
              <p className="text-[11px] text-emerald-100 leading-relaxed">
                Dokumen ini telah disesuaikan dengan format resmi Kementerian Agama RI. Setelah
                ditandatangani secara digital, QR Code akan otomatis tertaut dan dapat divalidasi.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Preview Sheet View with Action Toolbar */
        <div className="space-y-4">
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setActiveTab('FORM')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Editor</span>
              </button>
              <span className="text-xs text-slate-500 hidden sm:inline">• Pratinjau Dokumen Siap Cetak</span>
            </div>

            <div className="flex items-center space-x-2">
              {onOpenPrintModal ? (
                <button
                  type="button"
                  onClick={() => onOpenPrintModal(currentDoc)}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Ekspor PDF</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Dokumen</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleSave}
                className="px-3.5 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simpan Dokumen</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-100 p-2 sm:p-6 rounded-2xl border border-slate-200 overflow-hidden">
            <OfficialDocumentSheet
              document={currentDoc}
              profile={profile}
              teachers={teachers}
              students={students}
              onOpenSignModal={(signer) => onOpenSignModal(signer, currentDoc)}
            />
          </div>
        </div>
      )}

      {/* AI Assistance Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Asisten AI Kurikulum & Hukum Kemenag
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Bantu susun redaksi resmi berbasis KMA 450 Tahun 2024
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {aiErrorMessage && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
                {aiErrorMessage}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Karakteristik / Catatan Khusus Madrasah:
              </label>
              <textarea
                rows={3}
                value={aiPromptCustom}
                onChange={(e) => setAiPromptCustom(e.target.value)}
                placeholder="Contoh: Madrasah riset dan tahfidz di pedesaan dengan keunggulan adiwiyata..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Batal
              </button>

              {selectedType === 'KOM' ? (
                <button
                  type="button"
                  disabled={isAiGenerating}
                  onClick={handleGenerateKomWithAi}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isAiGenerating ? 'Memproses KOM...' : 'Generate Redaksi KOM'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isAiGenerating}
                  onClick={handleGenerateSkLegalWithAi}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isAiGenerating ? 'Memproses SK...' : 'Generate Redaksi SK'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
