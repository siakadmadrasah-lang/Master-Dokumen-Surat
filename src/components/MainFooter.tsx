import React, { useState, useEffect } from 'react';
import {
  School,
  FileCheck2,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  GraduationCap,
  Sparkles,
  Printer,
  FileText,
  Settings,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  HeartHandshake,
  CheckCircle,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { MadrasahProfile } from '../types';
import { ActiveTab } from './Navbar';
import { KemenagLogo } from './OfficialLogos';

interface MainFooterProps {
  profile: MadrasahProfile;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPrintModal?: () => void;
  documentCount?: number;
  teacherCount?: number;
  studentCount?: number;
}

export const MainFooter: React.FC<MainFooterProps> = ({
  profile,
  activeTab,
  setActiveTab,
  onOpenPrintModal,
  documentCount = 0,
  teacherCount = 0,
  studentCount = 0,
}) => {
  // Live Clock State
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
      );
      setDateString(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="main-footer" className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-slate-300 border-t-2 border-emerald-800/80 mt-12 print:hidden relative overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner: Status & Live Clock */}
      <div className="border-b border-emerald-900/60 bg-emerald-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3 flex-wrap gap-y-1">
            <div className="flex items-center space-x-2 bg-emerald-900/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-700/50 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold">Sistem AutoMadrasah Terhubung</span>
            </div>
            <span className="text-emerald-400/80 font-mono text-[11px]">
              KMA 450/2024 & KMA 1503/2025 Standardized
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-mono text-emerald-200/90">
            <div className="flex items-center space-x-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-emerald-900/60">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{dateString}</span>
              <span className="text-emerald-400 font-bold">{timeString}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Identity & Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {profile.logoKemenagUrl && !profile.logoKemenagUrl.includes('wikimedia.org') ? (
                <img
                  src={profile.logoKemenagUrl}
                  alt="Logo Kemenag"
                  className="w-11 h-11 object-contain flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <KemenagLogo className="w-11 h-11 flex-shrink-0" />
              )}
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base leading-tight">
                  {profile.namaMadrasah}
                </h4>
                <p className="text-[11px] text-emerald-400 font-mono">
                  NSM: {profile.nsm} • NPSN: {profile.npsn}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Platform otomatisasi tata naskah dinas, dokumen kurikulum, dan Surat Keputusan resmi Kementerian Agama RI dengan Tanda Tangan Elektronik (TTE) tersertifikasi QR Hash.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-1.5">
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                Akreditasi {profile.akreditasi || 'A (Unggul)'}
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                T.A {profile.tahunAjaran}
              </span>
              <span className="bg-amber-900/40 text-amber-300 border border-amber-700/50 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                Fase A-B-C Ready
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Modul Dokumen & Tata Usaha</span>
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('DASHBOARD')}
                  className={`w-full text-left flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'DASHBOARD'
                      ? 'bg-emerald-800/60 text-white font-bold'
                      : 'text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/60'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Dashboard Utama</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('KOM_CINTA')}
                  className={`w-full text-left flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'KOM_CINTA'
                      ? 'bg-emerald-800/60 text-white font-bold'
                      : 'text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/60'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                    <span>Modul KOM CINTA</span>
                  </span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded font-mono">
                    KMA 1503
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('GENERATOR')}
                  className={`w-full text-left flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'GENERATOR'
                      ? 'bg-emerald-800/60 text-white font-bold'
                      : 'text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/60'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Generator SK & KOM (AI)</span>
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                    AI Auto
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('DOCUMENTS')}
                  className={`w-full text-left flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'DOCUMENTS'
                      ? 'bg-emerald-800/60 text-white font-bold'
                      : 'text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/60'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Arsip Dokumen Resmi</span>
                  </span>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                    {documentCount} Dok
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('TEACHERS')}
                  className={`w-full text-left flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'TEACHERS'
                      ? 'bg-emerald-800/60 text-white font-bold'
                      : 'text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/60'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Database Guru (GTK)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                    {teacherCount} GTK
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('STUDENTS')}
                  className={`w-full text-left flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'STUDENTS'
                      ? 'bg-emerald-800/60 text-white font-bold'
                      : 'text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/60'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Database Peserta Didik</span>
                  </span>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                    {studentCount} Siswa
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('VERIFICATION')}
                  className={`w-full text-left flex items-center justify-between py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'VERIFICATION'
                      ? 'bg-emerald-800/60 text-white font-bold'
                      : 'text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/60'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Validasi QR TTE</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Regulatory References */}
          <div className="space-y-3">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Standar Regulasi Kemenag</span>
            </h5>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">KMA No. 450 Tahun 2024:</strong> Pedoman Implementasi Kurikulum pada Madrasah.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">KMA No. 1503 Tahun 2025:</strong> Pedoman Kurikulum Berbasis Cinta & Pembelajaran Mendalam.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">PMA No. 9 Tahun 2016:</strong> Pedoman Tata Naskah Dinas Kementerian Agama RI.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Permendikbudristek No. 46/2023:</strong> Pembentukan Tim TPPK Satuan Pendidikan.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Studio Cetak */}
          <div className="space-y-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Studio Cetak & Kontak</span>
            </h5>

            {/* Quick Print CTA Box */}
            {onOpenPrintModal && (
              <button
                id="footer-open-print-modal-btn"
                onClick={onOpenPrintModal}
                className="w-full bg-emerald-800/80 hover:bg-emerald-700 text-white p-3 rounded-xl border border-emerald-600/50 shadow-md transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-emerald-950 rounded-lg group-hover:scale-105 transition-transform">
                    <Printer className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">Buka Studio Cetak</p>
                    <p className="text-[10px] text-emerald-200">Cetak A4 / F4 & PDF Instan</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}

            <div className="space-y-1.5 text-xs text-slate-400 pt-1">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">
                  {profile.alamat || 'Jl. Raya Madrasah No. 01'}, {profile.titimangsa || 'Kabupaten/Kota'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] font-mono">{profile.email || 'madrasah@kemenag.go.id'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] font-mono">{profile.telepon || '(0341) 555-1234'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & System Integrity */}
      <div className="border-t border-emerald-950 bg-slate-950 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-400">{profile.namaMadrasah}</strong>. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span className="text-emerald-500 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>AutoMadrasah v2.5 Suite</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">PMA 9/2016 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
