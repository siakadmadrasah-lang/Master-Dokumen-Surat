import React, { useState, useRef } from 'react';
import {
  School,
  Upload,
  Save,
  X,
  Eye,
  CheckCircle2,
  RotateCcw,
  Image as ImageIcon,
  Building,
  User,
  ShieldCheck,
  Check,
  Loader2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { HeaderConfig, MadrasahProfile } from '../types';
import { KemenagLogo, MaarifNuLogo } from './OfficialLogos';
import { notifySuccess } from '../utils/toast';

interface HeaderLogoEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: MadrasahProfile;
  onSaveProfile: (updatedProfile: MadrasahProfile) => void;
  onAddLog?: (action: string) => void;
}

export const HeaderLogoEditorModal: React.FC<HeaderLogoEditorModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onAddLog,
}) => {
  const [formData, setFormData] = useState<MadrasahProfile>(() => {
    const existingHdr = profile.headerConfig || {};
    return {
      ...profile,
      headerConfig: {
        headerTitle: existingHdr.headerTitle || `Ruang Publik ${profile.namaMadrasah}`,
        headerSubtitle:
          existingHdr.headerSubtitle ||
          `Portal Resmi Sistem Administrasi & Transparansi Dokumen Kemenag RI`,
        showLogo: existingHdr.showLogo !== false,
        logoUrl: existingHdr.logoUrl || profile.logoMadrasahUrl || '',
        logoKemenagUrl: existingHdr.logoKemenagUrl || profile.logoKemenagUrl || '',
        adminAvatarUrl: existingHdr.adminAvatarUrl || '',
      },
    };
  });

  const [activeTab, setActiveTab] = useState<'HEADER_TEXT' | 'UPLOAD_LOGO'>('UPLOAD_LOGO');
  const [isSaving, setIsSaving] = useState(false);

  const logoFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const hdr = formData.headerConfig || {};

  const updateHdr = (updates: Partial<HeaderConfig>) => {
    setFormData((prev) => ({
      ...prev,
      headerConfig: {
        ...(prev.headerConfig || {}),
        ...updates,
      },
      // If updating logoUrl, sync to logoMadrasahUrl as well for Kop Surat consistency
      ...(updates.logoUrl !== undefined ? { logoMadrasahUrl: updates.logoUrl } : {}),
      // If updating logoKemenagUrl, sync to logoKemenagUrl as well
      ...(updates.logoKemenagUrl !== undefined ? { logoKemenagUrl: updates.logoKemenagUrl } : {}),
    }));
  };

  // Handle Logo Madrasah File Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih berkas gambar (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target?.result as string;
      updateHdr({ logoUrl: dataUrl });
      notifySuccess('Logo Berhasil Dipilih!', 'Logo madrasah baru siap disimpan.');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSaveProfile(formData);
      onAddLog?.(`Memperbarui konfigurasi Header & Logo untuk ${formData.namaMadrasah}`);
      setIsSaving(false);
      notifySuccess('Pengaturan Header & Logo Disimpan!', 'Perubahan header dan logo madrasah telah aktif di seluruh sistem.');
      onClose();
    }, 400);
  };

  return (
    <div
      id="header-logo-editor-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="header-logo-editor-modal-card"
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-800/60 rounded-xl border border-emerald-600/40">
              <Building className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Edit Header & Upload Logo Resmi</span>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Header & Brand
                </span>
              </h2>
              <p className="text-xs text-emerald-200">
                Atur judul navbar, slogan, logo satuan pendidikan, dan gambar profil admin.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-2 text-xs font-semibold gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('UPLOAD_LOGO')}
            className={`pb-2.5 px-3 transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'UPLOAD_LOGO'
                ? 'border-b-2 border-emerald-700 text-emerald-900 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Logo Madrasah</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('HEADER_TEXT')}
            className={`pb-2.5 px-3 transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'HEADER_TEXT'
                ? 'border-b-2 border-emerald-700 text-emerald-900 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Teks & Slogan Header</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: UPLOAD LOGO */}
          {activeTab === 'UPLOAD_LOGO' && (
            <div className="space-y-5 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Logo Resmi Satuan Pendidikan</h3>
                  <p className="text-slate-500 mt-0.5">
                    Logo akan ditampilkan di Navbar Publik, Navbar Admin, Dokumen Resmi, dan Kop Surat.
                  </p>
                </div>
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hdr.showLogo !== false}
                    onChange={(e) => updateHdr({ showLogo: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-bold text-slate-700">Tampilkan Logo</span>
                </label>
              </div>

              {/* Upload Drop Zone */}
              <div
                onClick={() => logoFileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-600 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-2xl p-6 text-center cursor-pointer transition-all"
              >
                <input
                  ref={logoFileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="font-bold text-slate-800 text-sm">
                  Klik untuk Memilih Logo Madrasah dari Komputer / HP
                </p>
                <p className="text-slate-500 mt-1">
                  Format yang didukung: PNG (transparan disarankan), JPG, SVG, atau WebP (Maks 5 MB).
                </p>
              </div>

              {/* Current Logo Preview Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm p-1.5 flex items-center justify-center overflow-hidden">
                    {hdr.logoUrl ? (
                      <img
                        src={hdr.logoUrl}
                        alt="Logo Madrasah"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <School className="w-8 h-8 text-emerald-700" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-sm block">
                      {hdr.logoUrl ? 'Logo Kustom Madrasah Terpasang' : 'Menggunakan Ikon Default Satuan'}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {hdr.logoUrl ? 'Siap digunakan di seluruh portal' : 'Unggah logo untuk menampilkan lambang resmi madrasah Anda'}
                    </span>
                  </div>
                </div>

                {hdr.logoUrl && (
                  <button
                    type="button"
                    onClick={() => updateHdr({ logoUrl: '' })}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border border-rose-200 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Logo</span>
                  </button>
                )}
              </div>

              {/* Preset Logos */}
              <div>
                <span className="font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Atau Gunakan Logo Standar Yayasan / Kemenag:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => updateHdr({ logoUrl: '' })}
                    className={`p-3 rounded-xl border-2 flex items-center space-x-3 cursor-pointer transition-all ${
                      !hdr.logoUrl ? 'border-emerald-600 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Ikon Madrasah Kemenag</span>
                      <span className="text-[10px] text-slate-500">Standar Vektor Minimalis</span>
                    </div>
                  </div>

                  <div
                    onClick={() => updateHdr({ logoUrl: 'MAARIF_NU' })}
                    className={`p-3 rounded-xl border-2 flex items-center space-x-3 cursor-pointer transition-all ${
                      hdr.logoUrl === 'MAARIF_NU' ? 'border-emerald-600 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <MaarifNuLogo className="w-9 h-9" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">LP Ma'arif NU</span>
                      <span className="text-[10px] text-slate-500">Lambang Bintang Sembilan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HEADER TEXT & SLOGAN */}
          {activeTab === 'HEADER_TEXT' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Nama Satuan Pendidikan (Nama Resmi)
                </label>
                <input
                  type="text"
                  value={formData.namaMadrasah}
                  onChange={(e) => setFormData({ ...formData, namaMadrasah: e.target.value })}
                  placeholder="Contoh: MI Ma'arif NU 2 Sanggreman"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Judul Tampilan Header Publik
                </label>
                <input
                  type="text"
                  value={hdr.headerTitle || ''}
                  onChange={(e) => updateHdr({ headerTitle: e.target.value })}
                  placeholder="Contoh: Ruang Publik MI Ma'arif NU 2 Sanggreman"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500 block mt-1">
                  Judul yang muncul di baris utama pada header ruang publik.
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Slogan / Subtitle Header
                </label>
                <input
                  type="text"
                  value={hdr.headerSubtitle || ''}
                  onChange={(e) => updateHdr({ headerSubtitle: e.target.value })}
                  placeholder="Contoh: Portal Resmi Sistem Administrasi & Transparansi Dokumen Kemenag RI"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white"
                />
                <span className="text-[11px] text-slate-500 block mt-1">
                  Keterangan ringkas atau slogan yang tampil di bawah judul header.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">NSM (Nomor Statistik)</label>
                  <input
                    type="text"
                    value={formData.nsm}
                    onChange={(e) => setFormData({ ...formData, nsm: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 font-mono text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">NPSN</label>
                  <input
                    type="text"
                    value={formData.npsn}
                    onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 font-mono text-slate-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* LIVE HEADER PREVIEW BOX */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pratinjau Live Header:</span>
            </span>

            {/* Header Mockup */}
            <div className="bg-emerald-950 text-white rounded-2xl p-3 sm:p-4 shadow-lg border border-emerald-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-900 border border-emerald-700/60 flex items-center justify-center p-1">
                  {hdr.showLogo !== false && (hdr.logoUrl === 'MAARIF_NU' ? (
                    <MaarifNuLogo className="w-8 h-8" />
                  ) : hdr.logoUrl ? (
                    <img src={hdr.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <School className="w-5 h-5 text-emerald-400" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-xs sm:text-sm text-white">
                      {hdr.headerTitle || `Ruang Publik ${formData.namaMadrasah}`}
                    </span>
                    <span className="px-1.5 py-0.2 bg-emerald-800 text-emerald-200 rounded text-[9px] font-bold border border-emerald-600/50">
                      Portal Resmi
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-300 font-mono">
                    NSM: {formData.nsm} | NPSN: {formData.npsn}
                  </p>
                </div>
              </div>

              {/* Right Profile Picture Button Preview */}
              <div className="flex items-center space-x-2 bg-emerald-900/90 border border-emerald-700/80 px-2.5 py-1.5 rounded-full shadow-sm">
                <div className="w-7 h-7 rounded-full ring-2 ring-emerald-400 overflow-hidden bg-emerald-800 flex items-center justify-center text-white">
                  {hdr.adminAvatarUrl ? (
                    <img src={hdr.adminAvatarUrl} alt="Admin" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-emerald-200" />
                  )}
                </div>
                <span className="text-[11px] font-bold text-emerald-100 hidden sm:inline">
                  Admin Madrasah
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 cursor-pointer"
          >
            Batal
          </button>

          <button
            id="btn-save-header-logo-config"
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2 cursor-pointer transition-all"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Header & Logo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
