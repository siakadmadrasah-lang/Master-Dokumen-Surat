import React, { useState } from 'react';
import {
  Sparkles,
  Save,
  X,
  Eye,
  Heart,
  FileText,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Palette,
  Image as ImageIcon,
  Check,
  Globe,
  Loader2,
} from 'lucide-react';
import { HeroConfig, MadrasahProfile } from '../types';
import { notifySuccess } from '../utils/toast';
import { TypewriterTitle } from './TypewriterTitle';

interface HeroEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: MadrasahProfile;
  onSaveHero: (updatedHero: HeroConfig) => void;
  onOpenPublicPortal?: () => void;
  onAddLog?: (action: string) => void;
}

export const HeroEditorModal: React.FC<HeroEditorModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveHero,
  onOpenPublicPortal,
  onAddLog,
}) => {
  const defaultHero: HeroConfig = {
    badgeText: 'Madrasah Mandiri Berprestasi • Kurikulum Berbasis Cinta (KMA 1503/2025)',
    title: profile.namaMadrasah || "MI Ma'arif NU 2 Sanggreman",
    subtitle:
      'Selamat datang di Portal Informasi Publik dan Transparansi Dokumen Resmi Kementerian Agama RI. Menyajikan keterbukaan naskah dinas, kurikulum operasional berbasis cinta (KMA 1503/2025), direktori pendidik, serta verifikasi keaslian dokumen berbasis Tanda Tangan Elektronik (TTE).',
    ctaText1: 'Modul KOM CINTA (KMA 1503)',
    ctaText2: 'Jelajahi Dokumen Resmi',
    ctaText3: 'Verifikasi QR TTE',
    showCta1: true,
    showCta2: true,
    showCta3: true,
    bannerGradient: 'EMERALD',
    bannerImageUrl: '',
  };

  const [formData, setFormData] = useState<HeroConfig>(() => ({
    ...defaultHero,
    ...(profile.heroConfig || {}),
  }));

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'STYLING' | 'PREVIEW'>('CONTENT');

  if (!isOpen) return null;

  const gradientOptions = [
    {
      id: 'EMERALD' as const,
      name: 'Emerald Kemenag (Resmi)',
      classes: 'from-emerald-950 via-teal-950 to-emerald-900 border-emerald-700/60',
      badgeBg: 'bg-emerald-800/80 text-emerald-200 border-emerald-600/40',
    },
    {
      id: 'NAVY' as const,
      name: 'Navy Akademik',
      classes: 'from-slate-950 via-blue-950 to-indigo-950 border-blue-700/60',
      badgeBg: 'bg-blue-800/80 text-blue-200 border-blue-600/40',
    },
    {
      id: 'ROSE' as const,
      name: 'Rose Mahabbah (Cinta Kasih)',
      classes: 'from-rose-950 via-slate-950 to-teal-950 border-rose-700/60',
      badgeBg: 'bg-rose-800/80 text-rose-200 border-rose-600/40',
    },
    {
      id: 'PURPLE' as const,
      name: 'Ungu Prestasi',
      classes: 'from-purple-950 via-indigo-950 to-slate-950 border-purple-700/60',
      badgeBg: 'bg-purple-800/80 text-purple-200 border-purple-600/40',
    },
    {
      id: 'AMBER' as const,
      name: 'Emas Berkah',
      classes: 'from-amber-950 via-emerald-950 to-slate-950 border-amber-700/60',
      badgeBg: 'bg-amber-900/80 text-amber-200 border-amber-600/40',
    },
  ];

  const currentGradient = gradientOptions.find((g) => g.id === formData.bannerGradient) || gradientOptions[0];

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSaveHero(formData);
      onAddLog?.(`Memperbarui tampilan Hero Ruang Publik untuk ${profile.namaMadrasah}`);
      setIsSaving(false);
      notifySuccess('Tampilan Hero Disimpan!', 'Perubahan tampilan hero ruang publik berhasil diperbarui.');
      onClose();
    }, 400);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Kembalikan teks dan tampilan Hero ke pengaturan bawaan standar Kemenag?')) {
      setFormData(defaultHero);
    }
  };

  return (
    <div
      id="hero-editor-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="hero-editor-modal-card"
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-800/60 rounded-xl border border-emerald-600/40">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Editor Tampilan Hero Beranda Publik</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Admin Only
                </span>
              </h2>
              <p className="text-xs text-emerald-200">
                Fitur ini dikelola eksklusif di Dashboard Admin untuk mengatur naskah, badge, dan tema beranda umum.
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
            onClick={() => setActiveTab('CONTENT')}
            className={`pb-2.5 px-3 transition-colors cursor-pointer ${
              activeTab === 'CONTENT'
                ? 'border-b-2 border-emerald-700 text-emerald-900 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Teks & Tombol Aksi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('STYLING')}
            className={`pb-2.5 px-3 transition-colors cursor-pointer ${
              activeTab === 'STYLING'
                ? 'border-b-2 border-emerald-700 text-emerald-900 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Tema Warna & Background
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('PREVIEW')}
            className={`pb-2.5 px-3 transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'PREVIEW'
                ? 'border-b-2 border-emerald-700 text-emerald-900 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Pratinjau Langsung (Live Preview)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: CONTENT */}
          {activeTab === 'CONTENT' && (
            <div className="space-y-4 text-xs">
              {/* Badge Text */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Label Badge Atas (Sub-heading Slogan)
                </label>
                <input
                  type="text"
                  value={formData.badgeText || ''}
                  onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                  placeholder="Contoh: Madrasah Mandiri Berprestasi • Kurikulum Berbasis Cinta (KMA 1503/2025)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Headline Title */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Judul Utama Hero (Headline Madrasah)*
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: MI Ma'arif NU 2 Sanggreman"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-emerald-700 mt-1 flex items-center space-x-1 font-medium">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Judul ini otomatis ditampilkan dengan animasi mengetik (typewriter effect) di Ruang Publik.</span>
                </p>
              </div>

              {/* Subtitle / Description */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Deskripsi / Kata Sambutan Portal Publik
                </label>
                <textarea
                  rows={3}
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Tuliskan sambutan dan penjelasan portal transparansi dokumen madrasah..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 leading-relaxed focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 border-t border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 block">Konfigurasi Tombol Aksi (CTA)</span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Button 1 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Tombol 1 (KOM CINTA)</span>
                      <input
                        type="checkbox"
                        checked={formData.showCta1 !== false}
                        onChange={(e) => setFormData({ ...formData, showCta1: e.target.checked })}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.ctaText1 || ''}
                      onChange={(e) => setFormData({ ...formData, ctaText1: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900"
                    />
                  </div>

                  {/* Button 2 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Tombol 2 (Dokumen Resmi)</span>
                      <input
                        type="checkbox"
                        checked={formData.showCta2 !== false}
                        onChange={(e) => setFormData({ ...formData, showCta2: e.target.checked })}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.ctaText2 || ''}
                      onChange={(e) => setFormData({ ...formData, ctaText2: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900"
                    />
                  </div>

                  {/* Button 3 */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Tombol 3 (Verifikasi QR)</span>
                      <input
                        type="checkbox"
                        checked={formData.showCta3 !== false}
                        onChange={(e) => setFormData({ ...formData, showCta3: e.target.checked })}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.ctaText3 || ''}
                      onChange={(e) => setFormData({ ...formData, ctaText3: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STYLING & BACKGROUND */}
          {activeTab === 'STYLING' && (
            <div className="space-y-5 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-2">
                  Pilihan Tema Gradasi Hero Banner:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gradientOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, bannerGradient: opt.id })}
                      className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer text-left ${
                        formData.bannerGradient === opt.id
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${opt.classes} shadow-xs`} />
                        <span className="font-bold text-slate-800">{opt.name}</span>
                      </div>
                      {formData.bannerGradient === opt.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Banner Image URL */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  URL Gambar Background / Banner Madrasah (Opsional)
                </label>
                <input
                  type="url"
                  value={formData.bannerImageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, bannerImageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... atau tautan gambar gedung madrasah"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Bila diisi, gambar gedung/lingkungan madrasah akan disematkan secara halus di latar belakang hero.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE PREVIEW */}
          {(activeTab === 'PREVIEW' || true) && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pratinjau Hero di Ruang Publik:</span>
                </span>
                <span className="text-[10px] text-slate-500">Otomatis Terbarui</span>
              </div>

              {/* Mockup Container */}
              <div
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${currentGradient.classes} text-white p-6 sm:p-8 shadow-xl border`}
                style={
                  formData.bannerImageUrl
                    ? {
                        backgroundImage: `linear-gradient(to right, rgba(2, 44, 34, 0.95), rgba(4, 47, 46, 0.9)), url(${formData.bannerImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : undefined
                }
              >
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold border ${currentGradient.badgeBg}`}>
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                      <span>{formData.badgeText || 'Madrasah Mandiri Berprestasi'}</span>
                    </div>

                    <div className="h-9 sm:h-12 flex items-center overflow-hidden max-w-full">
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-none whitespace-nowrap overflow-hidden max-w-full">
                        <TypewriterTitle
                          titles={[formData.title || profile.namaMadrasah, 'Kurikulum Berbasis Cinta (KMA 1503/2025)']}
                          typingSpeed={60}
                          deletingSpeed={30}
                          pauseDuration={2800}
                        />
                      </h1>
                    </div>

                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                      {formData.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.showCta1 !== false && (
                        <div className="px-3.5 py-2 bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center space-x-1.5">
                          <Heart className="w-3.5 h-3.5 fill-white" />
                          <span>{formData.ctaText1 || 'Modul KOM CINTA'}</span>
                        </div>
                      )}
                      {formData.showCta2 !== false && (
                        <div className="px-3.5 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md flex items-center space-x-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{formData.ctaText2 || 'Jelajahi Dokumen'}</span>
                        </div>
                      )}
                      {formData.showCta3 !== false && (
                        <div className="px-3.5 py-2 bg-white/10 text-white font-semibold rounded-xl text-xs border border-white/20 flex items-center space-x-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                          <span>{formData.ctaText3 || 'Verifikasi QR'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mockup Badge Profile Right */}
                  <div className="lg:col-span-4 bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-2 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      Identitas Satuan
                    </span>
                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between border-b border-white/10 pb-1">
                        <span className="text-emerald-200">Jenjang</span>
                        <span className="font-bold">{profile.jenjang} ({profile.status})</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-1">
                        <span className="text-emerald-200">Akreditasi</span>
                        <span className="font-bold text-amber-300">Peringkat {profile.akreditasi || 'A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-200">Tahun Ajaran</span>
                        <span className="font-bold">{profile.tahunAjaran}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-3 py-2 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer hover:bg-slate-200/60 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Standar</span>
            </button>
            {onOpenPublicPortal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPublicPortal();
                }}
                className="px-3 py-2 text-emerald-700 hover:text-emerald-900 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer hover:bg-emerald-50 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lihat Ruang Publik</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              id="btn-save-hero-config"
              type="button"
              disabled={isSaving}
              onClick={() => handleSave()}
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
                  <span>Simpan Perubahan Hero</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
