import React, { useState, useMemo } from 'react';
import {
  School,
  Globe,
  ShieldCheck,
  Search,
  FileText,
  Users,
  GraduationCap,
  Sparkles,
  Heart,
  Award,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Send,
  Eye,
  Printer,
  FileCheck2,
  Clock,
  LogIn,
  Compass,
  Layers,
  Cpu,
  Bookmark,
  Check,
  Building,
} from 'lucide-react';
import {
  MadrasahProfile,
  OfficialDocument,
  Teacher,
  Student,
  DocumentType,
} from '../types';
import { KomCintaDocumentView } from './documents/KomCintaDocumentView';
import { KomCintaData, defaultKomCintaData } from '../data/komCintaDefaultData';

interface PublicPortalViewProps {
  profile: MadrasahProfile;
  documents: OfficialDocument[];
  teachers: Teacher[];
  students: Student[];
  onOpenLogin: () => void;
  onSelectDocument: (doc: OfficialDocument) => void;
}

export const PublicPortalView: React.FC<PublicPortalViewProps> = ({
  profile,
  documents,
  teachers,
  students,
  onOpenLogin,
  onSelectDocument,
}) => {
  const [activePublicTab, setActivePublicTab] = useState<'OVERVIEW' | 'KOM_CINTA' | 'DOCUMENTS' | 'VERIFY' | 'TEACHERS' | 'STUDENT_SERVICE'>('OVERVIEW');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [komCintaSectionFilter, setKomCintaSectionFilter] = useState<'ALL' | 'COVER' | 'PENGESAHAN' | 'BAB1' | 'BAB2' | 'BAB3' | 'BAB4' | 'BAB5' | 'LAMPIRAN'>('ALL');

  // Load latest custom data from localStorage if available (saved by admin) or fallback to default
  const komCintaData: KomCintaData = useMemo(() => {
    try {
      const saved = localStorage.getItem('kom_cinta_custom_data');
      if (saved) {
        return {
          ...defaultKomCintaData,
          ...JSON.parse(saved),
          namaMadrasah: profile.namaMadrasah,
          nsm: profile.nsm,
          npsn: profile.npsn,
          alamat: profile.alamat,
          kecamatan: profile.kecamatan,
          kabupaten: profile.kabupatenKota?.replace(/^Kabupaten\s+/i, '') || 'Banyumas',
          namaKepala: profile.namaKepala,
          nipKepala: profile.nipKepala,
          namaKetuaKomite: profile.namaKetuaKomite || defaultKomCintaData.namaKetuaKomite,
          namaPengawas: profile.namaPengawas || defaultKomCintaData.namaPengawas,
          nipPengawas: profile.nipPengawas || defaultKomCintaData.nipPengawas,
          tahunAjaran: profile.tahunAjaran || defaultKomCintaData.tahunAjaran,
        };
      }
    } catch (e) {
      console.error('Failed to load kom_cinta_custom_data in public view', e);
    }
    return {
      ...defaultKomCintaData,
      namaMadrasah: profile.namaMadrasah,
      nsm: profile.nsm,
      npsn: profile.npsn,
      alamat: profile.alamat,
      kecamatan: profile.kecamatan,
      kabupaten: profile.kabupatenKota?.replace(/^Kabupaten\s+/i, '') || 'Banyumas',
      namaKepala: profile.namaKepala,
      nipKepala: profile.nipKepala,
      namaKetuaKomite: profile.namaKetuaKomite || defaultKomCintaData.namaKetuaKomite,
      namaPengawas: profile.namaPengawas || defaultKomCintaData.namaPengawas,
      nipPengawas: profile.nipPengawas || defaultKomCintaData.nipPengawas,
      tahunAjaran: profile.tahunAjaran || defaultKomCintaData.tahunAjaran,
    };
  }, [profile]);

  // Construct official KOM CINTA document reference for print/verification
  const komCintaDoc = useMemo(() => {
    const existing = documents.find((d) => d.type === 'KOM_CINTA');
    if (existing) {
      return {
        ...existing,
        title: existing.title || `Kurikulum ${profile.namaMadrasah} Berbasis Cinta (KMA 1503/2025) T.A ${profile.tahunAjaran || '2025/2026'}`,
        tahunAjaran: profile.tahunAjaran || existing.tahunAjaran || '2025/2026',
        contentData: {
          ...defaultKomCintaData,
          ...((existing.contentData as any) || {}),
          ...komCintaData,
        },
      } as OfficialDocument;
    }
    return {
      id: 'DOC-KOM-CINTA-2026',
      type: 'KOM_CINTA' as DocumentType,
      title: `Kurikulum ${profile.namaMadrasah} Berbasis Cinta (KMA 1503/2025) T.A ${profile.tahunAjaran || '2025/2026'}`,
      nomorSurat: '097/LPM/33.17/MI-77/VI/2026',
      tanggalSurat: '25 Juli 2026',
      tahunAjaran: profile.tahunAjaran || '2025/2026',
      semester: 'Ganjil',
      status: 'SIGNED',
      creatorName: 'Tim Pengembang Kurikulum Madrasah (TPKM)',
      createdAt: '2026-07-15T08:00:00.000Z',
      updatedAt: '2026-07-25T11:00:00.000Z',
      version: 1,
      contentData: komCintaData,
      signatures: [
        {
          id: 'SIG-KOMCINTA-01',
          role: 'KEPALA_MADRASAH',
          title: 'Kepala Madrasah',
          name: profile.namaKepala,
          nip: profile.nipKepala,
          isSigned: true,
          signedAt: '25 Juli 2026 08:30 WIB',
          digitalHash: 'SHA256-KMA1503-KOM-CINTA-KAMAD-VALID',
        },
        {
          id: 'SIG-KOMCINTA-02',
          role: 'KOMITE',
          title: 'Ketua Komite Madrasah',
          name: profile.namaKetuaKomite || 'H. Ahmad Muzaki',
          isSigned: true,
          signedAt: '25 Juli 2026 09:00 WIB',
          digitalHash: 'SHA256-KMA1503-KOM-CINTA-KOMITE-VALID',
        },
        {
          id: 'SIG-KOMCINTA-03',
          role: 'PENGAWAS',
          title: 'Pengawas Pembina Kemenag',
          name: profile.namaPengawas || 'Drs. H. Mulyono, M.Pd.I',
          nip: profile.nipPengawas || '196803121994032001',
          isSigned: true,
          signedAt: '20 Juli 2026 10:00 WIB',
          digitalHash: 'SHA256-KMA1503-KOM-CINTA-PENGAWAS-VALID',
        },
      ],
    } as OfficialDocument;
  }, [documents, profile, komCintaData]);

  // Interactive Self-Service Student Request State
  const [requestNisn, setRequestNisn] = useState('');
  const [requestNama, setRequestNama] = useState('');
  const [requestType, setRequestType] = useState('SURAT_AKTIF');
  const [requestKeperluan, setRequestKeperluan] = useState('');
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);

  // Quick Verification State
  const [verifyCode, setVerifyCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<OfficialDocument | null | 'NOT_FOUND'>(null);

  // Filtered documents for public view
  const publicDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' ||
      (selectedCategory === 'KOM_CINTA' && doc.type === 'KOM_CINTA') ||
      (selectedCategory === 'KOM' && (doc.type === 'KOM' || doc.type === 'KOM_CINTA')) ||
      (selectedCategory === 'SK' && doc.type.startsWith('SK_')) ||
      (selectedCategory === 'SURAT' && doc.type.startsWith('SURAT_')) ||
      (selectedCategory === 'PIAGAM' && doc.type === 'IKRAR_MADRASAH_CINTA');
    return matchesSearch && matchesCategory;
  });

  const handleQuickVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;

    const trimmed = verifyCode.trim().toLowerCase();
    
    // Check if searching for KOM CINTA
    if (
      trimmed.includes('kma 1503') ||
      trimmed.includes('kma-1503') ||
      trimmed.includes('kom cinta') ||
      trimmed.includes('kom-cinta') ||
      trimmed.includes('097/lpm/33.17')
    ) {
      setVerificationResult(komCintaDoc);
      return;
    }

    const found = documents.find(
      (d) =>
        d.nomorSurat?.toLowerCase().includes(trimmed) ||
        d.id?.toLowerCase().includes(trimmed) ||
        d.signatures?.some((s) => s.digitalHash?.toLowerCase().includes(trimmed))
    );

    if (found) {
      setVerificationResult(found);
    } else {
      setVerificationResult('NOT_FOUND');
    }
  };

  const handleStudentRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestNama || !requestNisn) return;

    const matchingStudent = students.find(
      (s) => s.nisn === requestNisn || s.nama.toLowerCase().includes(requestNama.toLowerCase())
    );

    const trackingId = `REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setRequestSuccess(
      `Permohonan berhasil dikirim dengan Kode Registrasi: ${trackingId}. Status siswa: ${
        matchingStudent ? 'Terverifikasi Aktif di Rombel ' + matchingStudent.rombel : 'Dalam proses verifikasi operator'
      }. Dokumen akan diterbitkan dalam 1x24 jam kerja.`
    );
    setRequestNama('');
    setRequestNisn('');
    setRequestKeperluan('');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Floating Official Public Header */}
      <header className="bg-emerald-950 text-white border-b border-emerald-800 sticky top-0 z-40 shadow-xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Brand & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-900/40 border border-emerald-400/30">
              <School className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  Ruang Publik {profile.namaMadrasah}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-800 text-emerald-200 rounded text-[10px] font-bold border border-emerald-600/50">
                  Portal Resmi
                </span>
              </div>
              <p className="text-[11px] text-emerald-300 font-mono">
                NSM: {profile.nsm} | NPSN: {profile.npsn} • Akreditasi {profile.akreditasi || 'A'}
              </p>
            </div>
          </div>

          {/* Right Action: Admin Login */}
          <button
            id="public-portal-login-btn"
            type="button"
            onClick={onOpenLogin}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-slate-950 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4 text-slate-950" />
            <span className="hidden sm:inline">Masuk Dashboard Admin</span>
            <span className="sm:hidden">Login Admin</span>
          </button>
        </div>

        {/* Public Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-emerald-900/60 overflow-x-auto flex items-center space-x-1 sm:space-x-2 py-1.5">
          {[
            { id: 'OVERVIEW' as const, label: 'Beranda & Profil', icon: School },
            { id: 'KOM_CINTA' as const, label: 'KOM CINTA', icon: Heart, highlightBadge: 'KMA 1503' },
            { id: 'DOCUMENTS' as const, label: 'Transparansi Dokumen & SK', icon: FileText, count: documents.length },
            { id: 'VERIFY' as const, label: 'Validasi QR TTE', icon: ShieldCheck },
            { id: 'TEACHERS' as const, label: 'Direktori GTK & Guru', icon: Users, count: teachers.length },
            { id: 'STUDENT_SERVICE' as const, label: 'Layanan Mandiri Siswa', icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePublicTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePublicTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-emerald-200 hover:bg-emerald-900/80 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{tab.label}</span>
                {tab.highlightBadge && (
                  <span className="text-[9px] bg-rose-600 px-1.5 py-0.5 rounded-full text-white font-bold ml-0.5 shadow-xs">
                    {tab.highlightBadge}
                  </span>
                )}
                {tab.count !== undefined && (
                  <span className="text-[10px] bg-emerald-900 px-1.5 py-0.2 rounded-full text-emerald-300 font-bold ml-0.5">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* VIEW 1: OVERVIEW & PROFILE */}
        {activePublicTab === 'OVERVIEW' && (
          <div className="space-y-6 animate-fade-in">
            {/* Grand Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white p-6 sm:p-10 shadow-2xl border border-emerald-700/60">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center space-x-2 bg-emerald-800/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-600/40">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    <span>Madrasah Mandiri Berprestasi • Kurikulum Berbasis Cinta (KMA 1503/2025)</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {profile.namaMadrasah}
                  </h1>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                    Selamat datang di Portal Informasi Publik dan Transparansi Dokumen Resmi Kementerian Agama RI.
                    Menyajikan keterbukaan naskah dinas, kurikulum operasional berbasis cinta (KMA 1503/2025), direktori pendidik, serta verifikasi keaslian dokumen berbasis Tanda Tangan Elektronik (TTE).
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActivePublicTab('KOM_CINTA')}
                      className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-950/40 transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Modul KOM CINTA (KMA 1503)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePublicTab('DOCUMENTS')}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Jelajahi Dokumen Resmi</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePublicTab('VERIFY')}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs border border-white/20 transition-all flex items-center space-x-2 cursor-pointer backdrop-blur-md"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>Verifikasi QR TTE</span>
                    </button>
                  </div>
                </div>

                {/* Right Badge Summary */}
                <div className="lg:col-span-4 bg-emerald-900/60 backdrop-blur-md p-5 rounded-2xl border border-emerald-700/60 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    Identitas Satuan Pendidikan
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-emerald-800/80 pb-1">
                      <span className="text-emerald-200">Status Madrasah</span>
                      <span className="font-bold text-white">{profile.status} ({profile.jenjang})</span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-800/80 pb-1">
                      <span className="text-emerald-200">Akreditasi BAN-S/M</span>
                      <span className="font-bold text-amber-300">Peringkat {profile.akreditasi || 'A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-800/80 pb-1">
                      <span className="text-emerald-200">Kepala Madrasah</span>
                      <span className="font-bold text-white">{profile.namaKepala}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-200">Tahun Pelajaran</span>
                      <span className="font-bold text-white">{profile.tahunAjaran} ({profile.semester})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Showcase: KOM CINTA Banner */}
            <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-7 rounded-3xl border border-rose-800/50 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2.5 max-w-3xl">
                  <div className="inline-flex items-center space-x-2 bg-rose-900/60 text-rose-200 px-3 py-1 rounded-full text-xs font-bold border border-rose-700/40">
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                    <span>Inovasi Kurikulum Madrasah KMA 1503 Tahun 2025</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Kurikulum Madrasah Berbasis Cinta (KOM CINTA)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Pedoman operasional madrasah 86 halaman yang mengintegrasikan pendekatan <strong>Deep Learning</strong> (Mindful, Meaningful, Joyful), pilar <strong>Panca Cinta</strong>, literasi digital koding & kecerdasan buatan (AI), serta 15 lampiran dokumen resmi.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-emerald-300 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mahabbah Ilahiyyah</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-rose-300 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>Cinta Diri & Sesama (Anti-Bullying)</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-blue-300 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Deep Learning & Koding AI</span>
                    </span>
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-amber-300 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Cinta Lingkungan & Bangsa</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setActivePublicTab('KOM_CINTA')}
                    className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-950/50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Buka Modul KOM CINTA Publik</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectDocument(komCintaDoc)}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs border border-white/20 transition-all flex items-center justify-center space-x-2 cursor-pointer backdrop-blur-md"
                  >
                    <Printer className="w-4 h-4 text-emerald-300" />
                    <span>Cetak / Unduh PDF (86 Hal)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold">Dokumen Resmi</p>
                  <h3 className="text-xl font-extrabold text-slate-900">{documents.length}</h3>
                  <span className="text-[10px] text-emerald-700 font-medium">Terbuka & Sah</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold">Pendidik & GTK</p>
                  <h3 className="text-xl font-extrabold text-slate-900">{teachers.length}</h3>
                  <span className="text-[10px] text-blue-700 font-medium">Guru Bersertifikasi</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold">Peserta Didik</p>
                  <h3 className="text-xl font-extrabold text-slate-900">{students.length}</h3>
                  <span className="text-[10px] text-amber-700 font-medium">Siswa Aktif</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold">Sertifikasi TTE</p>
                  <h3 className="text-xl font-extrabold text-slate-900">100%</h3>
                  <span className="text-[10px] text-teal-700 font-medium">QR Code Sah Kemenag</span>
                </div>
              </div>
            </div>

            {/* Love-Based Curriculum Spotlight */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-rose-100 rounded-2xl text-rose-700">
                  <Heart className="w-6 h-6 fill-rose-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Pilar Kurikulum Operasional Madrasah (KOM) Berbasis Cinta
                  </h3>
                  <p className="text-xs text-slate-500">
                    Implementasi KMA Nomor 1503 Tahun 2025 yang mengedepankan pendekatan humanis & kasih sayang
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <h4 className="font-bold text-emerald-950 text-sm flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>1. Mahabbah Ilahiyyah</span>
                  </h4>
                  <p className="text-emerald-900 leading-relaxed">
                    Menumbuhkan cinta kepada Allah SWT dan Rasul-Nya melalui ibadah yang bermakna, shalat dhuha/dzuhur berjamaah, dan tadarus Al-Qur'an harian.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <h4 className="font-bold text-blue-950 text-sm flex items-center space-x-1.5">
                    <Heart className="w-4 h-4 text-blue-700" />
                    <span>2. Ukhuwah & Anti-Kekerasan</span>
                  </h4>
                  <p className="text-blue-900 leading-relaxed">
                    Menciptakan lingkungan madrasah ramah anak, bebas dari perundungan (anti-bullying), serta saling menguatkan antar sesama murid dan guru.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <h4 className="font-bold text-amber-950 text-sm flex items-center space-x-1.5">
                    <Globe className="w-4 h-4 text-amber-700" />
                    <span>3. Rahmatan Lil Alamin (P5RA)</span>
                  </h4>
                  <p className="text-amber-900 leading-relaxed">
                    Penguatan projek profil pelajar Pancasila yang menghargai keberagaman, cinta lingkungan hidup, serta kontribusi positif bagi bangsa dan negara.
                  </p>
                </div>
              </div>
            </div>

            {/* Address & Contact Bar */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="space-y-1 text-center sm:text-left">
                <p className="font-bold text-white flex items-center space-x-1.5 justify-center sm:justify-start">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{profile.alamat}, {profile.desaKelurahan}, Kec. {profile.kecamatan}, {profile.kabupatenKota}, {profile.provinsi} {profile.kodePos}</span>
                </p>
                <p className="text-slate-400">
                  Telepon: {profile.telepon || '(0341) 555-1234'} • Email: {profile.email || 'madrasah@kemenag.go.id'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActivePublicTab('STUDENT_SERVICE')}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Ajukan Surat Mandiri</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* VIEW: KOM CINTA PUBLIC VIEWER (READ-ONLY TRANSPARENCY MODULE) */}
        {activePublicTab === 'KOM_CINTA' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Official Header Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 text-white p-6 sm:p-8 rounded-3xl border border-emerald-700/60 shadow-xl space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-rose-600 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-xs flex items-center space-x-1.5">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>KMA 1503 Tahun 2025</span>
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-800 text-emerald-200 text-xs font-bold rounded-lg border border-emerald-600/60">
                      Naskah Lengkap 86 Halaman
                    </span>
                    <span className="px-2.5 py-0.5 bg-teal-900/80 text-teal-300 text-xs font-bold rounded-lg border border-teal-600/60 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                      <span>TTE Kemenag Terverifikasi Sah</span>
                    </span>
                    <span className="px-2.5 py-0.5 bg-amber-900/70 text-amber-200 text-xs font-semibold rounded-lg">
                      Mode Publik: Akses Terbuka Transparan
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Kurikulum Operasional Madrasah Berbasis Cinta (KOM CINTA)
                  </h1>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-3xl">
                    Naskah dinas resmi {profile.namaMadrasah} Tahun Ajaran {profile.tahunAjaran}.
                    Disusun oleh Tim Pengembang Kurikulum Madrasah (TPKM), disetujui Komite Madrasah, dan divalidasi oleh Pengawas Pembina Kementerian Agama RI.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-2.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelectDocument(komCintaDoc)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak / Unduh PDF Naskah</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePublicTab('VERIFY')}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs border border-white/20 transition-all flex items-center space-x-2 cursor-pointer backdrop-blur-md"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Cek Hash & QR TTE</span>
                  </button>
                </div>
              </div>

              {/* Endorsement Summary Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-emerald-800/80 text-xs">
                <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-700/50 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-300 font-semibold uppercase">Kepala Madrasah</p>
                    <p className="font-bold text-white truncate">{profile.namaKepala}</p>
                    <p className="text-[10px] text-emerald-400 font-mono">TTE Sah • 25 Juli 2026</p>
                  </div>
                </div>

                <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-700/50 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-300 font-semibold uppercase">Ketua Komite</p>
                    <p className="font-bold text-white truncate">{profile.namaKetuaKomite || 'H. Ahmad Muzaki'}</p>
                    <p className="text-[10px] text-emerald-400 font-mono">TTE Sah • 25 Juli 2026</p>
                  </div>
                </div>

                <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-700/50 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-300 font-semibold uppercase">Pengawas Pembina Kemenag</p>
                    <p className="font-bold text-white truncate">{profile.namaPengawas || 'Drs. H. Mulyono, M.Pd.I'}</p>
                    <p className="text-[10px] text-emerald-400 font-mono">Validasi Sah Kemenag</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar Bento Cards (Panca Cinta Highlights) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-emerald-500 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900">Cinta Allah & Rasul</h4>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Pembiasaan shalat dhuha/dzuhur berjamaah, tahfidz Juz 30, dan tadarus Al-Qur'an harian.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-rose-500 transition-all">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900">Cinta Diri & Sesama</h4>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Gerakan anti-perundungan (zero bullying), madrasah ramah anak, dan empati sosial.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-blue-500 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900">Cinta Ilmu & AI</h4>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Deep Learning (Mindful, Meaningful, Joyful), koding visual, dan literasi kecerdasan buatan etis.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-teal-500 transition-all">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                  4
                </div>
                <h4 className="text-xs font-bold text-slate-900">Cinta Lingkungan</h4>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Adiwiyata, pemilahan sampah organik/anorganik, konservasi energi, dan green madrasah.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1.5 hover:border-amber-500 transition-all">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  5
                </div>
                <h4 className="text-xs font-bold text-slate-900">Cinta Tanah Air</h4>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Moderasi beragama (Wasathiyah), wawasan kebangsaan, cinta budaya lokal, dan bela negara.
                </p>
              </div>
            </div>

            {/* Chapter Quick Jump Selector */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-slate-800">Navigasi Bab Dokumen Resmi:</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'kom-cinta-cover', label: 'Cover Depan' },
                  { id: 'kom-cinta-pengesahan', label: 'Lembar Pengesahan' },
                  { id: 'kom-cinta-bab1', label: 'Bab I: Karakteristik & SOAR' },
                  { id: 'kom-cinta-bab2', label: 'Bab II: Visi Misi' },
                  { id: 'kom-cinta-bab3', label: 'Bab III: Panca Cinta & Deep Learning' },
                  { id: 'kom-cinta-bab4', label: 'Bab IV: Pengorganisasian & Coding AI' },
                  { id: 'kom-cinta-bab5', label: 'Bab V: Evaluasi' },
                  { id: 'kom-cinta-lampiran', label: '15 Lampiran Resmi' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Read-Only Document Reader Container */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-4 sm:p-8 lg:p-12 space-y-8 relative">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-700">
                    Naskah Kurikulum Resmi Terverifikasi Sah
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectDocument(komCintaDoc)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Dokumen Ini</span>
                </button>
              </div>

              {/* Render the complete 86-page KomCintaDocumentView */}
              <div className="overflow-x-auto">
                <KomCintaDocumentView
                  document={komCintaDoc}
                  profile={profile}
                  teachers={teachers}
                  students={students}
                  customData={komCintaData}
                />
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <p>Naskah ini merupakan dokumen publik resmi yang dilindungi hak cipta madrasah dan diverifikasi Kemenag RI.</p>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold transition-all cursor-pointer"
                >
                  Kembali ke Atas ↑
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: TRANSPARANSI DOKUMEN & SK RESMI */}
        {activePublicTab === 'DOCUMENTS' && (
          <div className="space-y-4 animate-fade-in">
            {/* Header & Filter */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-emerald-700" />
                    <span>Katalog Transparansi Dokumen Resmi Madrasah</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Masyarakat, wali murid, dan pengawas dapat melihat dan memverifikasi dokumen naskah dinas resmi.
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul atau nomor surat..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-emerald-600 outline-hidden"
                  />
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { id: 'ALL', label: 'Semua Dokumen' },
                  { id: 'KOM_CINTA', label: 'KOM CINTA (KMA 1503)' },
                  { id: 'KOM', label: 'Kurikulum (KOM)' },
                  { id: 'SK', label: 'Surat Keputusan (SK)' },
                  { id: 'SURAT', label: 'Surat Layanan Siswa' },
                  { id: 'PIAGAM', label: 'Piagam & Ikrar' },
                ].map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === category.id
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {publicDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 uppercase">
                        {doc.type.replace(/_/g, ' ')}
                      </span>
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        <ShieldCheck className="w-3 h-3 text-teal-700" />
                        <span>TTE Sah</span>
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {doc.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 font-mono truncate">
                      No: {doc.nomorSurat}
                    </p>

                    <div className="text-[11px] text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex justify-between">
                        <span>Penetapan:</span>
                        <span className="font-semibold">{doc.tanggalSurat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Penandatangan:</span>
                        <span className="font-semibold text-emerald-950 truncate max-w-[130px]">
                          {doc.signatures?.[0]?.name || profile.namaKepala}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectDocument(doc)}
                    className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Lihat Lembar Sah & TTE QR</span>
                  </button>
                </div>
              ))}

              {publicDocuments.length === 0 && (
                <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2 text-slate-500">
                  <FileText className="w-8 h-8 mx-auto text-slate-400" />
                  <p className="text-xs font-medium">Tidak ada dokumen yang sesuai dengan pencarian Anda.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: VALIDASI QR TTE */}
        {activePublicTab === 'VERIFY' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Verifikasi Keaslian Naskah Dinas & QR Code TTE
                </h3>
                <p className="text-xs text-slate-500">
                  Masukkan Nomor Surat, Kode Hash TTE, atau ID Dokumen yang tertera pada lembar fisik
                </p>
              </div>

              <form onSubmit={handleQuickVerify} className="space-y-3 pt-2">
                <div className="relative">
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="Contoh: KMA-450, 001/SK-KOM/MTs/2025, atau kode hash..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-600 outline-hidden font-mono"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Cek Keabsahan Dokumen</span>
                </button>
              </form>

              {/* Result display */}
              {verificationResult && verificationResult !== 'NOT_FOUND' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left space-y-2 animate-fade-in">
                  <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>DOKUMEN ASLI & TERVERIFIKASI KEMENAG RI</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{verificationResult.title}</h4>
                  <p className="text-[11px] text-slate-600 font-mono">No: {verificationResult.nomorSurat}</p>
                  <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-emerald-200">
                    <p>Satuan: <strong>{profile.namaMadrasah}</strong></p>
                    <p>Status: <strong className="text-emerald-700">Tanda Tangan Elektronik Sah</strong></p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectDocument(verificationResult)}
                    className="mt-2 text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Buka Lembar Resmi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {verificationResult === 'NOT_FOUND' && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-left text-xs text-rose-800 animate-fade-in">
                  <p className="font-bold">Dokumen Tidak Ditemukan</p>
                  <p className="text-[11px] text-rose-700 mt-0.5">
                    Nomor surat atau kode hash yang Anda masukkan tidak terdaftar dalam basis data resmi madrasah.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 4: DIREKTORI GURU & GTK */}
        {activePublicTab === 'TEACHERS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-emerald-700" />
                  <span>Direktori Guru & Tenaga Kependidikan (GTK)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tenaga pendidik profesional tersertifikasi pada {profile.namaMadrasah}.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">
                {teachers.length} Pendidik Aktif
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start space-x-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {teacher.nama.charAt(0)}
                  </div>
                  <div className="min-w-0 space-y-1 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {teacher.gelarDepan ? teacher.gelarDepan + ' ' : ''}
                      {teacher.nama}
                      {teacher.gelarBelakang ? ', ' + teacher.gelarBelakang : ''}
                    </h4>
                    <p className="text-[11px] text-emerald-700 font-semibold truncate">
                      {teacher.mapelUtama || teacher.jabatanUtama}
                    </p>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                      <span>NIP: {teacher.nip || '-'}</span>
                      <span>•</span>
                      <span className="text-teal-700 font-semibold">{teacher.statusKepegawaian}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: LAYANAN MANDIRI SISWA & PERMOHONAN SURAT */}
        {activePublicTab === 'STUDENT_SERVICE' && (
          <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Permohonan Surat Keterangan Siswa Online
                  </h3>
                  <p className="text-xs text-slate-500">
                    Layanan mandiri bagi wali murid & siswa untuk mengajukan Surat Aktif Belajar atau Mutasi.
                  </p>
                </div>
              </div>

              {requestSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-950 space-y-1 animate-fade-in">
                  <div className="flex items-center space-x-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Permohonan Diterima!</span>
                  </div>
                  <p className="leading-relaxed">{requestSuccess}</p>
                </div>
              )}

              <form onSubmit={handleStudentRequestSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Nama Lengkap Siswa</label>
                  <input
                    type="text"
                    value={requestNama}
                    onChange={(e) => setRequestNama(e.target.value)}
                    placeholder="Contoh: Muhammad Rayhan..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-hidden"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">NISN (10 Digit)</label>
                    <input
                      type="text"
                      value={requestNisn}
                      onChange={(e) => setRequestNisn(e.target.value)}
                      placeholder="Contoh: 0098765432"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-hidden font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Jenis Layanan</label>
                    <select
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-hidden"
                    >
                      <option value="SURAT_AKTIF">Surat Keterangan Aktif Belajar (Kemenag)</option>
                      <option value="SURAT_MUTASI">Surat Keterangan Pindah / Mutasi</option>
                      <option value="SURAT_DISPENSASI">Surat Keterangan Dispensasi Lomba</option>
                      <option value="SURAT_REKOMENDASI">Surat Rekomendasi Beasiswa / Lanjutan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Keperluan / Keterangan</label>
                  <textarea
                    rows={2}
                    value={requestKeperluan}
                    onChange={(e) => setRequestKeperluan(e.target.value)}
                    placeholder="Contoh: Pengajuan beasiswa PIP / Keperluan administrasi kedinasan..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer pt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Permohonan Surat Resmi</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Public Footer */}
      <footer className="bg-emerald-950 text-white border-t border-emerald-900 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400 space-y-2">
          <p>© {new Date().getFullYear()} {profile.namaMadrasah} • Portal Ruang Publik & Transparansi Kemenag RI</p>
          <p className="text-[11px] font-mono text-emerald-300/80">
            KMA Nomor 450 Tahun 2024 • Standar Naskah Dinas & Tanda Tangan Elektronik Terverifikasi
          </p>
        </div>
      </footer>
    </div>
  );
};
