import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  Users,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Printer,
  History,
  FileCheck2,
  Layers,
  Heart,
  HelpCircle,
  Award,
  ChevronRight,
  BookOpen,
  Info,
  Server,
} from 'lucide-react';
import {
  MadrasahProfile,
  OfficialDocument,
  Teacher,
  Student,
  ActivityLog,
  DocumentType,
  Rombel,
} from '../types';
import { ActiveTab } from './Navbar';
import { PleskExportCard } from './PleskExportCard';

interface DashboardViewProps {
  profile: MadrasahProfile;
  documents: OfficialDocument[];
  teachers: Teacher[];
  students: Student[];
  rombels?: Rombel[];
  logs: ActivityLog[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectDocument: (doc: OfficialDocument) => void;
  onCreateNewDocument: (type?: string) => void;
  onAddLog?: (action: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  documents,
  teachers,
  students,
  rombels = [],
  logs,
  setActiveTab,
  onSelectDocument,
  onCreateNewDocument,
  onAddLog,
}) => {
  const [showDocGuideModal, setShowDocGuideModal] = useState(false);

  const signedDocs = documents.filter((d) => d.status === 'SIGNED');
  const pendingDocs = documents.filter((d) => d.status === 'READY_FOR_SIGN' || d.status === 'DRAFT');

  // Semester Mandatories Checklist (Official Kemenag & KMA 450/2024 Standards)
  const mandatoryDocs: {
    title: string;
    type: DocumentType;
    basis: string;
    description: string;
    category: string;
    doc?: OfficialDocument;
  }[] = [
    {
      title: 'Kurikulum Operasional Madrasah (KOM)',
      type: 'KOM',
      basis: 'KMA 450 Tahun 2024',
      description: 'Pedoman kurikulum resmi berlandaskan pilar Mahabbah & P5RA',
      category: 'Kurikulum',
      doc: documents.find((d) => d.type === 'KOM'),
    },
    {
      title: 'SK Pembagian Tugas Guru & Beban Kerja',
      type: 'SK_BEBAN_MENGAJAR',
      basis: 'Juknis Beban GTK Kemenag',
      description: 'Rincian jam mengajar tatap muka, ekuivalensi, & tugas tambahan',
      category: 'SK Wajib',
      doc: documents.find((d) => d.type === 'SK_BEBAN_MENGAJAR'),
    },
    {
      title: 'SK Tim Pengembang Kurikulum (TPK)',
      type: 'SK_TIM_TPK',
      basis: 'KMA 450/2024 & Kemenag',
      description: 'Penetapan tim penyusun KOM & validasi Kankemenag',
      category: 'SK Wajib',
      doc: documents.find((d) => d.type === 'SK_TIM_TPK'),
    },
    {
      title: 'SK Tim Fasilitator Projek P5RA',
      type: 'SK_TIM_P5RA',
      basis: 'KMA 450 Tahun 2024',
      description: 'Koordinator dan fasilitator projek Rahmatan Lil Alamin',
      category: 'SK P5RA',
      doc: documents.find((d) => d.type === 'SK_TIM_P5RA'),
    },
    {
      title: 'SK Wali Kelas & Pembina Ekskul',
      type: 'SK_WALI_KELAS',
      basis: 'Standar Pengelolaan',
      description: 'Penetapan wali kelas rombel & pembimbing bakat minat',
      category: 'SK Kesiswaan',
      doc: documents.find((d) => d.type === 'SK_WALI_KELAS'),
    },
    {
      title: 'SK Panitia PPDB Madrasah',
      type: 'SK_PPDB',
      basis: 'Juknis PPDB Dirjen Pendis',
      description: 'Panitia seleksi & penerimaan murid baru madrasah',
      category: 'SK Kesiswaan',
      doc: documents.find((d) => d.type === 'SK_PPDB'),
    },
    {
      title: 'SK Panitia MATSAMA',
      type: 'SK_MATSAMA',
      basis: 'Juknis MATSAMA Kemenag',
      description: 'Panitia masa ta\'aruf orientasi siswa baru ramah anak',
      category: 'SK Kesiswaan',
      doc: documents.find((d) => d.type === 'SK_MATSAMA'),
    },
    {
      title: 'SK Tim Pencegahan Kekerasan (TPPK)',
      type: 'SK_TPPK',
      basis: 'Permendikbud 46/2023 & Pendis',
      description: 'Satgas anti-bullying dan madrasah ramah anak',
      category: 'SK Perlindungan',
      doc: documents.find((d) => d.type === 'SK_TPPK'),
    },
    {
      title: 'SK Tim Manajemen Dana BOS',
      type: 'SK_TIM_BOS',
      basis: 'Juknis BOS Kemenag',
      description: 'Pengelola anggaran, SPJ, dan pelaporan EDM-ERKAM',
      category: 'SK Keuangan',
      doc: documents.find((d) => d.type === 'SK_TIM_BOS'),
    },
    {
      title: 'SK Penetapan KKTP & Kelulusan',
      type: 'SK_KKTP_KELULUSAN',
      basis: 'PPA Kemenag RI',
      description: 'Standar ketuntasan tujuan belajar dan kriteria kelulusan',
      category: 'SK Akademik',
      doc: documents.find((d) => d.type === 'SK_KKTP_KELULUSAN'),
    },
    {
      title: 'SK Panitia Asesmen Madrasah & ANBK',
      type: 'SK_PANITIA_UJIAN',
      basis: 'POS Asesmen Kemenag',
      description: 'Panitia pelaksana ujian, proktor, teknisi, & pengawas',
      category: 'SK Asesmen',
      doc: documents.find((d) => d.type === 'SK_PANITIA_UJIAN'),
    },
    {
      title: 'Piagam Ikrar Madrasah Ramah Anak',
      type: 'IKRAR_MADRASAH_CINTA',
      basis: 'Pilar Mahabbah Kemenag',
      description: 'Naskah komitmen bersama anti-kekerasan & cinta kasih',
      category: 'Piagam',
      doc: documents.find((d) => d.type === 'IKRAR_MADRASAH_CINTA'),
    },
  ];

  const completedMandatoryCount = mandatoryDocs.filter((m) => m.doc && m.doc.status === 'SIGNED').length;
  const progressPercent = Math.round((completedMandatoryCount / mandatoryDocs.length) * 100);

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-4 sm:p-6 md:p-8 shadow-xl border border-emerald-700/50">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-800/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-600/40">
              <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
              <span>Sistem Dokumen Madrasah Berbasis Cinta & KMA 450/2024</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Administrasi Resmi {profile.namaMadrasah}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Otomatisasi pembuatan Kurikulum Operasional Madrasah (KOM), Surat Keputusan (SK) Kepala Madrasah,
              Surat Layanan Siswa dengan Tanda Tangan Elektronik (TTE) tersertifikasi QR Code Kemenag.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              id="dash-quick-kom-btn"
              type="button"
              onClick={() => onCreateNewDocument('KOM')}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-bold rounded-xl text-xs shadow-lg shadow-amber-950/20 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Generate KOM Berbasis Cinta</span>
            </button>
            <button
              id="dash-quick-sk-guide-btn"
              type="button"
              onClick={() => setShowDocGuideModal(true)}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Info className="w-4 h-4 text-emerald-300" />
              <span>Daftar SK & Dokumen Wajib</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Documents */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">Total Dokumen</p>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900">{documents.length}</h3>
            <span className="text-[10px] text-emerald-700 font-medium">Tersimpan dalam sistem</span>
          </div>
        </div>

        {/* Signed TTE */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">Dokumen Sah TTE</p>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900">{signedDocs.length}</h3>
            <span className="text-[10px] text-teal-700 font-medium">QR Code Terverifikasi</span>
          </div>
        </div>

        {/* Teacher Database */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100/80 text-blue-800 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">Database Guru (GTK)</p>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900">{teachers.length}</h3>
            <span className="text-[10px] text-blue-700 font-medium">Sinkron Distribusi Beban</span>
          </div>
        </div>

        {/* Students Database */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">Peserta Didik</p>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900">{students.length}</h3>
            <span className="text-[10px] text-amber-700 font-medium">Siap Layanan Surat</span>
          </div>
        </div>
      </div>

      {/* Plesk Web Hosting ZIP Exporter Card - Exclusively on Admin Dashboard */}
      <PleskExportCard
        profile={profile}
        documents={documents}
        teachers={teachers}
        students={students}
        rombels={rombels}
        logs={logs}
        onAddLog={onAddLog}
      />

      {/* Main Grid: Checklist SK & Progress (Left) + Activity Log (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left 2 Cols: Mandatory Documents Progress & Checklist */}
        <div className="lg:col-span-2 space-y-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 sm:pb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-2">
                <FileCheck2 className="w-5 h-5 text-emerald-700" />
                <span>Monitoring Dokumen & SK Wajib Madrasah (KMA 450)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Target kelengkapan dokumen administrasi dan legalitas madrasah tahun ajaran {profile.tahunAjaran}.
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-bold text-emerald-950 font-mono">
                {completedMandatoryCount} dari {mandatoryDocs.length} Selesai Sah
              </span>
              <div className="w-full sm:w-36 bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* List of Mandatory SKs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto pr-1">
            {mandatoryDocs.map((item, idx) => {
              const isReady = !!item.doc;
              const isSigned = item.doc?.status === 'SIGNED';

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
                    isSigned
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : isReady
                      ? 'border-amber-200 bg-amber-50/30'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500 block">
                        {item.category} • {item.basis}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[10.5px] text-slate-500 line-clamp-1">{item.description}</p>
                    </div>

                    <div className="flex-shrink-0">
                      {isSigned ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Sah TTE</span>
                        </span>
                      ) : isReady ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          <Clock className="w-3 h-3" />
                          <span>Draft</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                          Belum Ada
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-end">
                    {item.doc ? (
                      <button
                        type="button"
                        onClick={() => onSelectDocument(item.doc!)}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center space-x-1 cursor-pointer"
                      >
                        <span>Buka Lembar Resmi</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onCreateNewDocument(item.type)}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[11px] font-bold shadow-xs cursor-pointer flex items-center space-x-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Buat Dokumen Ini</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Activity History & Quick Action */}
        <div className="space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <History className="w-4 h-4 text-emerald-700" />
              <span>Aktivitas Sistem Terbaru</span>
            </h3>

            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {logs.slice(0, 6).map((log) => (
                <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5 text-xs">
                  <p className="font-semibold text-slate-800 leading-snug">{log.action}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                    <span>{log.user}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-950 text-white p-4 sm:p-5 rounded-2xl shadow-xs space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Validasi Digital TTE Kemenag</span>
            </h4>
            <p className="text-[11px] text-emerald-100 leading-relaxed">
              Setiap dokumen yang telah ditandatangani digital memiliki QR Code verifikasi resmi dan
              enkripsi hash SHA-256 yang diakui dalam supervisi Kemenag.
            </p>
          </div>
        </div>
      </div>

      {/* Guide Modal: List of Essential Madrasah Documents */}
      {showDocGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Daftar Surat & SK Wajib Kepala Madrasah (KMA 450/2024)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Panduan dokumen administrasi wajib untuk akreditasi & supervisi pengawas
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDocGuideModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                <p className="font-bold text-emerald-950">1. Dokumen Kurikulum & Pembelajaran:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11.5px]">
                  <li><strong>Kurikulum Operasional Madrasah (KOM)</strong> Berbasis Cinta & Nilai Mahabbah (KMA 450/2024)</li>
                  <li><strong>SK Tim Pengembang Kurikulum (TPK)</strong> untuk pengesahan kurikulum madrasah</li>
                  <li><strong>SK Tim Fasilitator Projek P5RA</strong> (Profil Pelajar Pancasila & Rahmatan Lil Alamin)</li>
                  <li><strong>SK Kriteria Ketuntasan (KKTP) & Kriteria Kelulusan</strong> peserta didik</li>
                  <li><strong>Modul Ajar / RPP Berbasis Nilai Cinta</strong> berdiferensiasi</li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                <p className="font-bold text-blue-950">2. SK Kepegawaian & GTK (Guru & Tenaga Kependidikan):</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11.5px]">
                  <li><strong>SK Pembagian Tugas Guru & Beban Mengajar</strong> (JTM, ekuivalensi, Simpatika)</li>
                  <li><strong>SK Penetapan Wali Kelas & Pembina Ekstrakurikuler</strong></li>
                  <li><strong>Surat Perintah Tugas Dinas Guru</strong> (pelatihan, workshop Kemenag, MGMP/KKG)</li>
                </ul>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                <p className="font-bold text-amber-950">3. SK Kesiswaan, PPDB, & Perlindungan Anak:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11.5px]">
                  <li><strong>SK Panitia PPDB</strong> (Penerimaan Peserta Didik Baru)</li>
                  <li><strong>SK Panitia MATSAMA</strong> (Masa Ta'aruf Siswa Madrasah)</li>
                  <li><strong>SK Satgas TPPK</strong> (Pencegahan & Penanganan Kekerasan / Anti-Bullying)</li>
                  <li><strong>Piagam Ikrar & Deklarasi Madrasah Ramah Anak</strong></li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-slate-900">4. SK Asesmen, Keuangan, & Layanan Siswa:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11.5px]">
                  <li><strong>SK Panitia Asesmen Madrasah (AM) & ANBK</strong></li>
                  <li><strong>SK Tim Manajemen Dana BOS Madrasah</strong> (EDM/ERKAM)</li>
                  <li><strong>Surat Keterangan Aktif Belajar, Mutasi, Dispensasi Lomba, dan Rekomendasi Siswa</strong></li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowDocGuideModal(false)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
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
