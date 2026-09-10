import React, { useRef, useState } from 'react';
import {
  User,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  LogIn,
  X,
  Settings,
  Camera,
  Upload,
  Trash2,
  Lock,
  CheckCircle2,
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
  onUpdateAvatar?: (avatarUrl: string) => void;
  isAdmin?: boolean;
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
  onUpdateAvatar,
  isAdmin = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

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

  // Check if admin dashboard privilege is active
  const canManageSettings = isAdmin || Boolean(userSession);

  // Compress & convert image to high quality Data URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih berkas gambar (PNG, JPG, WEBP).');
      return;
    }

    // Limit to 5MB raw
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar. Maksimal 5 MB.');
      return;
    }

    setIsUploading(true);
    setUploadMessage(null);

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const img = new Image();
      img.onload = () => {
        // Resize to optimal square avatar (max 400x400)
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          if (onUpdateAvatar) {
            onUpdateAvatar(compressedDataUrl);
          }
          setUploadMessage('Foto profil berhasil diperbarui!');
          setTimeout(() => setUploadMessage(null), 3000);
        }
        setIsUploading(false);
      };
      img.src = loadEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleResetAvatar = () => {
    if (onUpdateAvatar) {
      onUpdateAvatar(SUPER_ADMIN_AVATAR);
      setUploadMessage('Foto profil diatur ke standar sistem.');
      setTimeout(() => setUploadMessage(null), 3000);
    }
  };

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
        {/* Hidden file input for avatar upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

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
            {/* Main Avatar with Upload Badge if in Admin Dashboard */}
            <div className="relative group">
              <div className="w-20 h-20 rounded-full ring-4 ring-emerald-400/50 shadow-xl overflow-hidden bg-emerald-800 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {currentAvatar ? (
                  <img
                    src={currentAvatar}
                    alt={adminName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-emerald-200" />
                )}
              </div>

              {/* Upload trigger overlay on avatar (Admin only) */}
              {canManageSettings ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all cursor-pointer ring-2 ring-amber-400"
                  title="Klik untuk ganti foto profil"
                >
                  <Camera className="w-5 h-5 text-amber-300" />
                  <span className="text-[9px] font-bold mt-0.5">Ubah</span>
                </button>
              ) : null}

              <span
                className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-emerald-950 ${
                  userSession ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-white truncate">{adminName}</h3>
              <p className="text-xs text-emerald-200 font-medium">{adminRole}</p>
              <div className="flex items-center space-x-1.5 mt-1.5">
                <span className={`w-2 h-2 rounded-full ${userSession ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                <span className="text-[10px] text-emerald-100 font-mono">
                  {canManageSettings ? 'Dashboard Admin Aktif' : 'Ruang Publik (Tamu)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Upload Success Feedback */}
          {uploadMessage && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-medium">{uploadMessage}</span>
            </div>
          )}

          {/* Dedicated Photo Upload Controls (Admin Only) */}
          {canManageSettings ? (
            <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 flex items-center space-x-1.5">
                  <Camera className="w-4 h-4 text-emerald-700" />
                  <span>Kelola Foto Profil Header & Footer</span>
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">
                  Admin Khusus
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-snug">
                Foto profil ini otomatis disinkronkan ke bilah navigasi Header dan Footer di seluruh portal madrasah.
              </p>
              <div className="flex items-center space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex-1 py-2 px-3 bg-emerald-800 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Memproses...' : 'Unggah Foto Baru'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAvatar}
                  className="py-2 px-3 bg-white hover:bg-rose-50 text-rose-700 border border-slate-200 hover:border-rose-300 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all cursor-pointer"
                  title="Reset ke Foto Bawaan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>
          ) : (
            /* Protected Settings Notice for Non-Admin / Public View */
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-start space-x-2.5 text-xs text-amber-900">
              <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Pengaturan Dilindungi</span>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Pengaturan data madrasah dan fitur unggah foto profil hanya dapat dilakukan melalui <strong>Dashboard Admin</strong>.
                </p>
              </div>
            </div>
          )}

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
                {canManageSettings ? 'Akses Penuh / Terotentikasi' : 'Mode Publik (Tamu)'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Email Madrasah</span>
              <span className="text-slate-700 font-mono text-[11px] truncate max-w-[200px]">{adminEmail}</span>
            </div>
          </div>

          {/* Action Buttons depending on login / admin status */}
          <div className="space-y-2 pt-1">
            {canManageSettings ? (
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
                    <span>Pengaturan Profil Madrasah & Sinkron</span>
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
                    <span>Masuk ke Dashboard Admin untuk Mengatur</span>
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
