import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Printer,
  Sparkles,
  FileText,
  ShieldCheck,
  ChevronUp,
  School,
  LayoutDashboard,
  Users,
  GraduationCap,
  Settings,
  Heart,
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { MadrasahProfile, OfficialDocument } from '../types';

interface StickyActionFooterProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onBack: () => void;
  onOpenPrintModal: () => void;
  profile: MadrasahProfile;
  pendingSignCount: number;
}

export const StickyActionFooter: React.FC<StickyActionFooterProps> = ({
  activeTab,
  setActiveTab,
  onBack,
  onOpenPrintModal,
  profile,
  pendingSignCount,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Module Labels map
  const moduleNames: Record<ActiveTab, { name: string; icon: any }> = {
    DASHBOARD: { name: 'Dashboard Progres', icon: LayoutDashboard },
    KOM_CINTA: { name: 'Modul KOM CINTA (KMA 1503)', icon: Heart },
    GENERATOR: { name: 'Generator SK & KOM (AI)', icon: Sparkles },
    DOCUMENTS: { name: 'Arsip Dokumen Resmi', icon: FileText },
    TEACHERS: { name: 'Database Guru (GTK)', icon: Users },
    STUDENTS: { name: 'Database Peserta Didik', icon: GraduationCap },
    VERIFICATION: { name: 'Validasi QR TTE', icon: ShieldCheck },
    SETTINGS: { name: 'Profil & Sinkronisasi', icon: Settings },
  };

  const currentModule = moduleNames[activeTab] || { name: 'Dashboard', icon: LayoutDashboard };
  const CurrentIcon = currentModule.icon;

  return (
    <div className="fixed bottom-3 sm:bottom-4 inset-x-0 z-40 px-3 sm:px-6 pointer-events-none print:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Floating Action Capsule Bar */}
        <div className="w-full bg-emerald-950/95 backdrop-blur-lg text-white border border-emerald-700/70 shadow-2xl rounded-2xl p-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 pointer-events-auto transition-all">
          {/* Left Section: Back Button / Current Module Pill */}
          <div className="flex items-center space-x-2 min-w-0">
            {activeTab !== 'DASHBOARD' ? (
              <button
                id="sticky-back-button"
                onClick={onBack}
                className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-950/50 cursor-pointer flex-shrink-0"
                title="Kembali ke Dashboard / Menu Sebelumnya"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-100" />
                <span className="hidden xs:inline sm:inline">Kembali</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('DASHBOARD')}
                className="hidden sm:flex items-center space-x-1.5 bg-emerald-900/90 text-emerald-200 px-3 py-1.5 rounded-xl text-xs font-medium border border-emerald-700/60"
              >
                <School className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate max-w-[140px] font-semibold">{profile.namaMadrasah}</span>
              </button>
            )}

            {/* Active Module Indicator */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-900/60 rounded-lg text-emerald-200 text-xs border border-emerald-800/60 truncate">
              <CurrentIcon className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[200px] text-[11px] sm:text-xs font-medium">
                {currentModule.name}
              </span>
            </div>
          </div>

          {/* Center & Right Section: Quick Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
            {/* Quick Print Button (Iconic) */}
            <button
              id="sticky-print-button"
              onClick={onOpenPrintModal}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-950/40 active:scale-95 transition-all cursor-pointer"
              title="Buka Studio Cetak & Ekspor Dokumen Resmi"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-100 animate-pulse" />
              <span className="hidden sm:inline">Cetak Dokumen</span>
              <span className="sm:hidden text-[11px]">Cetak</span>
            </button>

            {/* Quick Generator Button */}
            {activeTab !== 'GENERATOR' && (
              <button
                id="sticky-generator-button"
                onClick={() => setActiveTab('GENERATOR')}
                className="hidden md:flex items-center space-x-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-700/60 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Buat SK / KOM</span>
              </button>
            )}

            {/* Quick Archive with Pending Count */}
            {activeTab !== 'DOCUMENTS' && (
              <button
                id="sticky-documents-button"
                onClick={() => setActiveTab('DOCUMENTS')}
                className="flex items-center space-x-1 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-700/60 transition-all cursor-pointer relative"
                title="Arsip Dokumen"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden lg:inline">Arsip</span>
                {pendingSignCount > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-1">
                    {pendingSignCount}
                  </span>
                )}
              </button>
            )}

            {/* Quick Verification Button */}
            {activeTab !== 'VERIFICATION' && (
              <button
                id="sticky-verify-button"
                onClick={() => setActiveTab('VERIFICATION')}
                className="hidden sm:flex items-center space-x-1 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-emerald-700/60 transition-all cursor-pointer"
                title="Validasi QR TTE"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline">Validasi TTE</span>
              </button>
            )}

            {/* Scroll to top button */}
            {showScrollTop && (
              <button
                id="sticky-scroll-top-button"
                onClick={scrollToTop}
                className="p-1.5 sm:p-2 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 hover:text-white rounded-xl transition-all cursor-pointer shadow-xs"
                title="Kembali ke Bagian Atas Halaman"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
