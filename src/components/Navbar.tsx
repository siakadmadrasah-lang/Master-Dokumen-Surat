import React from 'react';
import {
  FileText,
  Users,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  Settings,
  Sparkles,
  School,
  FileCheck,
  Globe,
  LogOut,
  User,
  Heart,
  Building,
} from 'lucide-react';
import { MadrasahProfile } from '../types';
import { UserSession, SUPER_ADMIN_AVATAR } from './LoginPage';
import { MaarifNuLogo } from './OfficialLogos';
import { AdminProfileModal } from './AdminProfileModal';

export type ActiveTab =
  | 'DASHBOARD'
  | 'KOM_CINTA'
  | 'GENERATOR'
  | 'DOCUMENTS'
  | 'KOP_SURAT'
  | 'TEACHERS'
  | 'STUDENTS'
  | 'VERIFICATION'
  | 'SETTINGS';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  profile: MadrasahProfile;
  pendingSignCount: number;
  userSession?: UserSession | null;
  onOpenPublicPortal?: () => void;
  onLogout?: () => void;
  onUpdateAvatar?: (avatarUrl: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  pendingSignCount,
  userSession,
  onOpenPublicPortal,
  onLogout,
  onUpdateAvatar,
}) => {
  const [showProfileModal, setShowProfileModal] = React.useState(false);

  const adminAvatarUrl =
    userSession?.avatarUrl ||
    profile.headerConfig?.adminAvatarUrl ||
    SUPER_ADMIN_AVATAR;
  const navItems = [
    { id: 'DASHBOARD' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'KOM_CINTA' as ActiveTab, label: 'KOM CINTA', icon: Heart, highlightBadge: 'KMA 1503' },
    { id: 'GENERATOR' as ActiveTab, label: 'Buat Dokumen (AI)', icon: Sparkles, highlight: true },
    { id: 'DOCUMENTS' as ActiveTab, label: 'Arsip Dokumen', icon: FileText, badge: pendingSignCount },
    { id: 'KOP_SURAT' as ActiveTab, label: 'Kop Surat', icon: Building },
    { id: 'TEACHERS' as ActiveTab, label: 'Database Guru', icon: Users },
    { id: 'STUDENTS' as ActiveTab, label: 'Database Siswa', icon: GraduationCap },
    { id: 'VERIFICATION' as ActiveTab, label: 'Validasi QR TTE', icon: ShieldCheck },
    { id: 'SETTINGS' as ActiveTab, label: 'Profil & Sinkron', icon: Settings },
  ];

  return (
    <header id="main-navbar" className="bg-emerald-950 text-white border-b border-emerald-800/80 sticky top-0 z-40 shadow-lg print:hidden">
      {/* Top Banner with Public Link & Session */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between border-b border-emerald-900/60 text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-700/50">
            {profile.headerConfig?.showLogo !== false && (
              profile.headerConfig?.logoUrl === 'MAARIF_NU' ? (
                <MaarifNuLogo className="w-4 h-4" />
              ) : (profile.headerConfig?.logoUrl || profile.logoMadrasahUrl) ? (
                <img
                  src={profile.headerConfig?.logoUrl || profile.logoMadrasahUrl}
                  alt="Logo"
                  className="w-4 h-4 object-contain rounded-xs"
                />
              ) : (
                <School className="w-3.5 h-3.5 text-emerald-400" />
              )
            )}
            <span className="font-semibold text-emerald-100">{profile.namaMadrasah}</span>
          </div>
          <span className="hidden md:inline-block text-emerald-300/80 font-mono">
            NSM: {profile.nsm} | NPSN: {profile.npsn}
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Public Portal Quick Jump */}
          {onOpenPublicPortal && (
            <button
              id="nav-to-public-portal-btn"
              type="button"
              onClick={onOpenPublicPortal}
              className="flex items-center space-x-1.5 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-200 hover:text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-emerald-700/60 transition-all cursor-pointer"
              title="Buka Ruang Publik untuk Umum / Siswa / Wali Murid"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Ruang Publik</span>
            </button>
          )}

          {/* User Profile Avatar Capsule Button */}
          <button
            id="nav-profile-avatar-btn"
            type="button"
            onClick={() => setShowProfileModal(true)}
            className="group flex items-center space-x-2 bg-emerald-900/80 hover:bg-emerald-800 active:scale-95 pl-1.5 pr-2.5 py-1 rounded-full border border-emerald-700/60 hover:border-amber-400 transition-all cursor-pointer shadow-sm"
            title="Kelola Profil Administrator & Foto"
          >
            <div className="relative">
              <div className="w-6 h-6 rounded-full ring-2 ring-amber-400 overflow-hidden bg-emerald-950 flex items-center justify-center text-white">
                {adminAvatarUrl ? (
                  <img
                    src={adminAvatarUrl}
                    alt="Foto Profil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-3.5 h-3.5 text-amber-300" />
                )}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-emerald-950" />
            </div>

            <span className="text-[11px] font-bold text-white group-hover:text-amber-200 transition-colors max-w-[120px] truncate hidden sm:inline">
              {userSession ? userSession.name.split(' ')[0] : 'Admin'}
            </span>

            <span className="text-emerald-300 text-[9px] bg-emerald-800 px-1.5 py-0.2 rounded font-semibold hidden md:inline">
              {userSession?.role === 'SUPER_ADMIN' ? 'Super Admin' : userSession?.role === 'KEPALA_MADRASAH' ? 'Kamad' : 'Admin'}
            </span>
          </button>

          {/* Logout button */}
          {onLogout && (
            <button
              id="nav-logout-btn"
              type="button"
              onClick={onLogout}
              className="flex items-center space-x-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-rose-800/60 transition-all cursor-pointer"
              title="Keluar dari Akun Admin"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto py-2">
        <div className="flex items-center space-x-1 sm:space-x-2 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id.toLowerCase()}-btn`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/30'
                    : item.highlight
                    ? 'bg-emerald-900/90 text-emerald-200 hover:bg-emerald-800 hover:text-white border border-emerald-700/60'
                    : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-white'
                      : item.highlight
                      ? 'text-amber-300'
                      : 'text-emerald-400'
                  }`}
                />
                <span>{item.label}</span>
                {item.highlightBadge && (
                  <span className="ml-1 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-xs">
                    {item.highlightBadge}
                  </span>
                )}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-1 bg-amber-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin Profile Modal */}
      <AdminProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userSession={userSession}
        profile={profile}
        onOpenSettings={() => setActiveTab('SETTINGS')}
        onLogout={onLogout}
      />
    </header>
  );
};
