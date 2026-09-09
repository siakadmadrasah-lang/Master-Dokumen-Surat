import React from 'react';
import {
  User,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  LogIn,
  X,
  Settings,
} from 'lucide-react';
import { MadrasahProfile } from '../types';
import { UserSession, SUPER_ADMIN_AVATAR } from './LoginPage';

interface AdminProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSession?: UserSession | null;
  profile: MadrasahProfile;
  onOpenDashboard?: () => void;
  onOpenLogin?: () => void;
  onLogout?: () => void;
  onOpenSettings?: () => void;
}

export const AdminProfileModal: React.FC<AdminProfileModalProps> = ({
  isOpen,
  onClose,
  userSession,
  profile,
  onOpenDashboard,
  onOpenLogin,
  onLogout,
  onOpenSettings,
}) => {
  if (!isOpen) return null;

  // Active avatar resolution
  const currentAvatar =
    userSession?.avatarUrl ||
    profile.headerConfig?.adminAvatarUrl ||
    SUPER_ADMIN_AVATAR;

  const adminName = userSession?.name || profile.namaKepala || 'Administrator Madrasah';
  const adminRole = userSession?.roleLabel || (userSession?.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Kepala Madrasah');
  const adminNip = userSession?.nip || profile.nipKepala || 'NIP/ID Belum Diatur';
  const adminEmail = profile.email || 'admin@madrasah.kemenag.go.id';

  return (
    <div
      id="admin-profile-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        id="admin-profile-modal-card"
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Background */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-6 text-white relative">
          <button
            id="close-admin-profile-modal-btn"
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Profil Akun & Administrator Madrasah</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Main Avatar (Photo upload removed) */}
            <div className="w-16 h-16 rounded-full ring-4 ring-emerald-400/40 shadow-lg overflow-hidden bg-emerald-800 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {currentAvatar ? (
                <img
                  src={currentAvatar}
                  alt={adminName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-emerald-200" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-white truncate">{adminName}</h3>
              <p className="text-xs text-emerald-200 font-medium">{adminRole}</p>
              <div className="flex items-center space-x-1.5 mt-1.5">
                <span className={`w-2 h-2 rounded-full ${userSession ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                <span className="text-[10px] text-emerald-100 font-mono">
                  {userSession ? 'Sesi Admin Aktif' : 'Ruang Publik'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Info Details List */}
          <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500">Satuan Pendidikan</span>
              <span className="font-bold text-slate-800 text-right max-w-[200px] truncate">
                {profile.namaMadrasah}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500">NIP / Identitas</span>
              <span className="font-mono text-slate-800 font-semibold">{adminNip}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500">Hak Akses</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                {userSession ? 'Akses Penuh / Terotentikasi' : 'Mode Publik (Tamu)'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Email Madrasah</span>
              <span className="text-slate-700 font-mono text-[11px] truncate max-w-[200px]">{adminEmail}</span>
            </div>
          </div>

          {/* Action Buttons depending on login status */}
          <div className="space-y-2 pt-2">
            {userSession ? (
              <>
                {onOpenDashboard && (
                  <button
                    id="modal-open-dashboard-btn"
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenDashboard();
                    }}
                    className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Buka Dashboard Administrasi</span>
                  </button>
                )}

                {onOpenSettings && (
                  <button
                    id="modal-open-settings-btn"
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSettings();
                    }}
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-slate-600" />
                    <span>Pengaturan Profil Madrasah & Logo</span>
                  </button>
                )}

                {onLogout && (
                  <button
                    id="modal-logout-btn"
                    type="button"
                    onClick={() => {
                      onClose();
                      onLogout();
                    }}
                    className="w-full py-2 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 border border-rose-200 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Keluar dari Akun Admin</span>
                  </button>
                )}
              </>
            ) : (
              <>
                {onOpenLogin && (
                  <button
                    id="modal-login-btn"
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenLogin();
                    }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-amber-300" />
                    <span>Masuk ke Halaman Login Admin</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
