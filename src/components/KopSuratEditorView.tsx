import React, { useState } from 'react';
import {
  FileText,
  Save,
  RotateCcw,
  CheckCircle2,
  Building,
  Image as ImageIcon,
  Sliders,
  Printer,
  Sparkles,
  Layers,
  ArrowLeft,
  Upload,
  Eye,
  Check,
  AlignLeft,
  AlignCenter,
  Globe,
  Phone,
  Mail,
  MapPin,
  FileCheck,
  Loader2,
} from 'lucide-react';
import { MadrasahProfile, KopSuratConfig } from '../types';
import { OfficialLetterhead } from './OfficialLetterhead';
import { KemenagLogo, MaarifNuLogo } from './OfficialLogos';
import { notifySuccess } from '../utils/toast';

interface KopSuratEditorViewProps {
  profile: MadrasahProfile;
  onUpdateProfile: (updatedProfile: MadrasahProfile) => void;
  onBack?: () => void;
  onAddLog?: (action: string) => void;
}

export const KopSuratEditorView: React.FC<KopSuratEditorViewProps> = ({
  profile,
  onUpdateProfile,
  onBack,
  onAddLog,
}) => {
  const [formData, setFormData] = useState<MadrasahProfile>(() => {
    // initialize kopSuratConfig if not present
    const existing = profile.kopSuratConfig || {};
    return {
      ...profile,
      kopSuratConfig: {
        baris1Instansi:
          existing.baris1Instansi || 'KEMENTERIAN AGAMA REPUBLIK INDONESIA',
        baris2Wilayah:
          existing.baris2Wilayah ||
          `KANTOR KEMENTERIAN AGAMA ${profile.kabupatenKota?.toUpperCase() || 'KABUPATEN BANYUMAS'}`,
        namaMadrasahKop:
          existing.namaMadrasahKop || profile.namaMadrasah,
        showLogoKiri: existing.showLogoKiri !== false,
        showLogoKanan: existing.showLogoKanan !== false,
        logoKiriUrl: existing.logoKiriUrl || profile.logoKemenagUrl || '',
        logoKananUrl: existing.logoKananUrl || profile.logoMadrasahUrl || '',
        logoKiriSize: existing.logoKiriSize || 'MD',
        logoKananSize: existing.logoKananSize || 'MD',
        showBasmalah: existing.showBasmalah !== false,
        garisPemisahStyle: existing.garisPemisahStyle || 'DOUBLE',
        warnaGaris: existing.warnaGaris || '#0f172a',
        customIdentitasText: existing.customIdentitasText || '',
        customAlamatText: existing.customAlamatText || '',
        customKontakText: existing.customKontakText || '',
      },
    };
  });

  const [activeSubTab, setActiveSubTab] = useState<'TEKS' | 'LOGO' | 'ALAMAT' | 'GARIS' | 'TEMPLATE'>('TEKS');
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SAVED'>('IDLE');

  const cfg: KopSuratConfig = formData.kopSuratConfig || {};

  const updateCfg = (updates: Partial<KopSuratConfig>) => {
    setFormData((prev) => ({
      ...prev,
      kopSuratConfig: {
        ...(prev.kopSuratConfig || {}),
        ...updates,
      },
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaveStatus('SAVING');

    setTimeout(() => {
      onUpdateProfile(formData);
      onAddLog?.(`Memperbarui konfigurasi desain Kop Surat resmi untuk ${formData.namaMadrasah}`);
      setSaveStatus('SAVED');
      setShowSavedToast(true);
      notifySuccess(
        'Penyimpanan Berhasil!',
        `Desain Kop Surat resmi ${formData.namaMadrasah} telah berhasil disimpan dan diterapkan ke seluruh dokumen.`
      );

      setTimeout(() => {
        setSaveStatus('IDLE');
        setShowSavedToast(false);
      }, 3500);
    }, 300);
  };

  const handleResetToStandard = () => {
    if (window.confirm('Kembalikan desain Kop Surat ke Standar Resmi Kemenag RI?')) {
      const resetProfile: MadrasahProfile = {
        ...formData,
        kopSuratConfig: {
          baris1Instansi: 'KEMENTERIAN AGAMA REPUBLIK INDONESIA',
          baris2Wilayah: `KANTOR KEMENTERIAN AGAMA ${formData.kabupatenKota?.toUpperCase() || 'KABUPATEN BANYUMAS'}`,
          namaMadrasahKop: formData.namaMadrasah,
          showLogoKiri: true,
          showLogoKanan: true,
          logoKiriUrl: '',
          logoKananUrl: '',
          logoKiriSize: 'MD',
          logoKananSize: 'MD',
          showBasmalah: true,
          garisPemisahStyle: 'DOUBLE',
          warnaGaris: '#0f172a',
          customIdentitasText: '',
          customAlamatText: '',
          customKontakText: '',
        },
      };
      setFormData(resetProfile);
      onUpdateProfile(resetProfile);
      onAddLog?.('Mereset Kop Surat ke Standar Resmi Kemenag RI');
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3000);
    }
  };

  // Preset Handlers
  const applyPreset = (type: 'KEMENAG_NEGERI' | 'MAARIF_NU' | 'YAYASAN_ISLAM' | 'MINIMALIS') => {
    let presetCfg: Partial<KopSuratConfig> = {};

    if (type === 'KEMENAG_NEGERI') {
      presetCfg = {
        baris1Instansi: 'KEMENTERIAN AGAMA REPUBLIK INDONESIA',
        baris2Wilayah: `KANTOR KEMENTERIAN AGAMA ${formData.kabupatenKota?.toUpperCase() || 'KABUPATEN BANYUMAS'}`,
        namaMadrasahKop: formData.namaMadrasah,
        showLogoKiri: true,
        showLogoKanan: false,
        garisPemisahStyle: 'DOUBLE',
        warnaGaris: '#0f172a',
        showBasmalah: true,
      };
    } else if (type === 'MAARIF_NU') {
      presetCfg = {
        baris1Instansi: 'LEMBAGA PENDIDIKAN MA\'ARIF NU',
        baris2Wilayah: `PENGURUS CABANG LP MA'ARIF NU ${formData.kabupatenKota?.toUpperCase() || 'KABUPATEN BANYUMAS'}`,
        namaMadrasahKop: formData.namaMadrasah.includes('MA\'ARIF')
          ? formData.namaMadrasah
          : `MI MA'ARIF NU 01 ${formData.desaKelurahan?.toUpperCase() || 'SANGGREMAN'}`,
        showLogoKiri: true,
        showLogoKanan: true,
        garisPemisahStyle: 'DOUBLE',
        warnaGaris: '#065f46',
        showBasmalah: true,
      };
    } else if (type === 'YAYASAN_ISLAM') {
      presetCfg = {
        baris1Instansi: 'YAYASAN PENDIDIKAN DAN SOSIAL ISLAM',
        baris2Wilayah: `MADRASAH IBTIDAIYAH SWASTA WILAYAH ${formData.kecamatan?.toUpperCase() || 'RAWALO'}`,
        namaMadrasahKop: formData.namaMadrasah,
        showLogoKiri: true,
        showLogoKanan: true,
        garisPemisahStyle: 'THICK',
        warnaGaris: '#0f172a',
        showBasmalah: true,
      };
    } else if (type === 'MINIMALIS') {
      presetCfg = {
        baris1Instansi: 'KEMENTERIAN AGAMA REPUBLIK INDONESIA',
        baris2Wilayah: `KANTOR KEMENTERIAN AGAMA ${formData.kabupatenKota?.toUpperCase() || 'KABUPATEN BANYUMAS'}`,
        namaMadrasahKop: formData.namaMadrasah,
        showLogoKiri: true,
        showLogoKanan: false,
        garisPemisahStyle: 'SINGLE',
        warnaGaris: '#0f172a',
        showBasmalah: false,
      };
    }

    updateCfg(presetCfg);
  };

  // Image Upload helper (base64)
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>, target: 'kiri' | 'kanan') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file logo terlalu besar. Disarankan maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const b64 = evt.target?.result as string;
      if (target === 'kiri') {
        updateCfg({ logoKiriUrl: b64, showLogoKiri: true });
      } else {
        updateCfg({ logoKananUrl: b64, showLogoKanan: true });
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePrintTest = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 min-w-0">
          {onBack && (
            <button
              id="btn-back-kop-editor"
              type="button"
              onClick={onBack}
              className="p-2 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
              title="Kembali ke Pengaturan / Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
          )}
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2 truncate">
              <Building className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>Studio Editor Lengkap Kop Surat Resmi</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              Sesuaikan logo ganda, hirarki instansi dinas Kemenag RI, alamat lengkap, dan garis pemisah.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={handleResetToStandard}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Reset ke Standar Kemenag RI"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Standar</span>
          </button>

          <button
            type="button"
            onClick={handlePrintTest}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
            title="Uji Cetak Halaman Kop Surat"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Uji Cetak</span>
          </button>

          <button
            id="btn-save-kop-surat"
            type="button"
            disabled={saveStatus === 'SAVING'}
            onClick={() => handleSave()}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer shadow-md active:scale-95 ${
              saveStatus === 'SAVED'
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 scale-102'
                : saveStatus === 'SAVING'
                ? 'bg-emerald-800 text-emerald-200 cursor-wait'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-emerald-900/20'
            }`}
          >
            {saveStatus === 'SAVING' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                <span>Menyimpan Kop...</span>
              </>
            ) : saveStatus === 'SAVED' ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>✓ Berhasil Disimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Kop Surat</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showSavedToast && (
        <div
          id="kop-save-success-toast"
          role="status"
          className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-2xl flex items-center gap-2.5 animate-fade-in shadow-xs"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 animate-bounce" />
          <span>Penyimpanan Berhasil! Desain Kop Surat resmi telah diperbarui dan langsung diterapkan ke seluruh dokumen naskah dinas, SK, dan cetak PDF.</span>
        </div>
      )}

      {/* LIVE PREVIEW A4 CARD */}
      <div className="bg-slate-900/95 text-white p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-300">
              Pratinjau Langsung (WYSIWYG Standar Naskah Dinas Kemenag RI)
            </span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/60">
            A4 Standard Sheet
          </span>
        </div>

        {/* Paper Container */}
        <div className="bg-white text-slate-900 rounded-xl p-5 sm:p-8 md:p-10 shadow-xl border border-slate-200 overflow-x-auto min-w-[320px]">
          {/* Live Letterhead */}
          <OfficialLetterhead profile={formData} />

          {/* Simulated Document Body to demonstrate letterhead context */}
          <div className="mt-4 pt-2 text-[11px] sm:text-xs text-slate-600 font-sans space-y-2 border-t border-dashed border-slate-200">
            <div className="flex justify-between text-[10px] font-mono text-slate-400 pb-1">
              <span>[SIMULASI BADAN SURAT RESMI DI BAWAH KOP]</span>
              <span>Nomor: B-142/{formData.nsm.slice(0, 4)}/PP.00/07/{formData.tahunAjaran.slice(0, 4)}</span>
            </div>
            <p className="font-semibold text-slate-800 text-center uppercase tracking-wide text-xs">
              SURAT KETERANGAN AKTIF BELAJAR SISWA
            </p>
            <p className="text-slate-600 text-justify leading-relaxed">
              Yang bertanda tangan di bawah ini Kepala {formData.namaMadrasah}, menerangkan bahwa peserta didik yang bersangkutan adalah benar terdaftar aktif pada Tahun Pelajaran {formData.tahunAjaran}.
            </p>
          </div>
        </div>
      </div>

      {/* EDITOR CONTROLS TABS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/80 px-4 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('TEKS')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer border-b-2 ${
              activeSubTab === 'TEKS'
                ? 'bg-white text-emerald-900 border-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>1. Teks Instansi & Nama</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('LOGO')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer border-b-2 ${
              activeSubTab === 'LOGO'
                ? 'bg-white text-emerald-900 border-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>2. Logo Kiri & Logo Kanan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('ALAMAT')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer border-b-2 ${
              activeSubTab === 'ALAMAT'
                ? 'bg-white text-emerald-900 border-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>3. Identitas, Alamat & Kontak</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('GARIS')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer border-b-2 ${
              activeSubTab === 'GARIS'
                ? 'bg-white text-emerald-900 border-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>4. Gaya Garis & Basmalah</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('TEMPLATE')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer border-b-2 ${
              activeSubTab === 'TEMPLATE'
                ? 'bg-white text-emerald-900 border-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>5. Template 1-Klik</span>
          </button>
        </div>

        {/* Tab 1: TEKS HIRARKI */}
        {activeSubTab === 'TEKS' && (
          <div className="p-6 space-y-4 text-xs">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-3.5 rounded-xl">
              <p className="font-semibold">
                Sesuai Keputusan Menteri Agama (KMA) dan Tata Naskah Dinas Kementerian Agama RI:
              </p>
              <p className="text-[11px] text-emerald-900 mt-1">
                Kop surat memuat hirarki instansi tingkat pertama (Pusat/Yayasan), tingkat kedua (Kanwil/Kantor Kab-Kota), dan nama resmi satuan pendidikan bersangkutan.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Baris 1: Instansi Induk / Tertinggi (Huruf Kapital)
                </label>
                <input
                  type="text"
                  value={cfg.baris1Instansi || ''}
                  onChange={(e) => updateCfg({ baris1Instansi: e.target.value })}
                  placeholder="KEMENTERIAN AGAMA REPUBLIK INDONESIA"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
                <div className="flex gap-2 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-500">Preset Cepat:</span>
                  <button
                    type="button"
                    onClick={() => updateCfg({ baris1Instansi: 'KEMENTERIAN AGAMA REPUBLIK INDONESIA' })}
                    className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md font-medium"
                  >
                    Kemenag RI
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCfg({ baris1Instansi: "LEMBAGA PENDIDIKAN MA'ARIF NU" })}
                    className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md font-medium"
                  >
                    LP Ma'arif NU
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCfg({ baris1Instansi: 'YAYASAN PENDIDIKAN DAN SOSIAL ISLAM' })}
                    className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md font-medium"
                  >
                    Yayasan Pendidikan Islam
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Baris 2: Wilayah / Kantor Kabupaten-Kota / Pengurus Cabang
                </label>
                <input
                  type="text"
                  value={cfg.baris2Wilayah || ''}
                  onChange={(e) => updateCfg({ baris2Wilayah: e.target.value })}
                  placeholder={`KANTOR KEMENTERIAN AGAMA ${formData.kabupatenKota?.toUpperCase() || 'KABUPATEN BANYUMAS'}`}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Baris 3: Nama Resmi Madrasah (Judul Utama Kop - Tebal & Menonjol)*
                </label>
                <input
                  type="text"
                  value={cfg.namaMadrasahKop || formData.namaMadrasah}
                  onChange={(e) => updateCfg({ namaMadrasahKop: e.target.value })}
                  placeholder="MADRASAH IBTIDAIYAH NEGERI 1 BANYUMAS"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-emerald-950 focus:bg-white focus:border-emerald-600 focus:outline-hidden text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: LOGO KIRI & KANAN */}
        {activeSubTab === 'LOGO' && (
          <div className="p-6 space-y-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Kiri */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-slate-900">Logo Sisi Kiri (Kemenag / Instansi)</span>
                  </div>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cfg.showLogoKiri !== false}
                      onChange={(e) => updateCfg({ showLogoKiri: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    <span className="text-[11px] font-semibold text-slate-700">Tampilkan</span>
                  </label>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-1 shadow-xs flex-shrink-0">
                    {cfg.logoKiriUrl ? (
                      <img src={cfg.logoKiriUrl} alt="Logo Kiri" className="w-12 h-12 object-contain" />
                    ) : (
                      <KemenagLogo className="w-12 h-12" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <label className="font-semibold text-slate-700 block text-[11px]">Pilih Ukuran:</label>
                    <div className="flex gap-1.5">
                      {(['SM', 'MD', 'LG'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => updateCfg({ logoKiriSize: sz })}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                            cfg.logoKiriSize === sz || (!cfg.logoKiriSize && sz === 'MD')
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {sz === 'SM' ? 'Kecil' : sz === 'MD' ? 'Standar' : 'Besar'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-slate-700 block text-[11px]">
                    Ganti Gambar Logo Kiri:
                  </label>
                  <div className="flex gap-2">
                    <label className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-2xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah File (PNG/JPG)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadImage(e, 'kiri')}
                        className="hidden"
                      />
                    </label>
                    {cfg.logoKiriUrl && (
                      <button
                        type="button"
                        onClick={() => updateCfg({ logoKiriUrl: '' })}
                        className="px-2.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-[11px] font-semibold"
                        title="Kembalikan ke Logo Kemenag Resmi"
                      >
                        Reset Logo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Logo Kanan */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-4 h-4 text-emerald-700" />
                    <span className="font-bold text-slate-900">Logo Sisi Kanan (Madrasah / Yayasan)</span>
                  </div>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cfg.showLogoKanan !== false}
                      onChange={(e) => updateCfg({ showLogoKanan: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    <span className="text-[11px] font-semibold text-slate-700">Tampilkan</span>
                  </label>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-1 shadow-xs flex-shrink-0">
                    {cfg.logoKananUrl ? (
                      <img src={cfg.logoKananUrl} alt="Logo Kanan" className="w-12 h-12 object-contain" />
                    ) : (
                      <MaarifNuLogo className="w-12 h-12" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <label className="font-semibold text-slate-700 block text-[11px]">Pilih Ukuran:</label>
                    <div className="flex gap-1.5">
                      {(['SM', 'MD', 'LG'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => updateCfg({ logoKananSize: sz })}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                            cfg.logoKananSize === sz || (!cfg.logoKananSize && sz === 'MD')
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {sz === 'SM' ? 'Kecil' : sz === 'MD' ? 'Standar' : 'Besar'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-slate-700 block text-[11px]">
                    Ganti Gambar Logo Kanan:
                  </label>
                  <div className="flex gap-2">
                    <label className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-2xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah File (PNG/JPG)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadImage(e, 'kanan')}
                        className="hidden"
                      />
                    </label>
                    {cfg.logoKananUrl && (
                      <button
                        type="button"
                        onClick={() => updateCfg({ logoKananUrl: '' })}
                        className="px-2.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-[11px] font-semibold"
                        title="Kembalikan ke Logo LP Ma'arif Resmi"
                      >
                        Reset Logo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: ALAMAT & KONTAK */}
        {activeSubTab === 'ALAMAT' && (
          <div className="p-6 space-y-4 text-xs">
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Baris Nomor Statistik (NSM / NPSN / Akreditasi)
                </label>
                <input
                  type="text"
                  value={
                    cfg.customIdentitasText ||
                    `NSM: ${formData.nsm} | NPSN: ${formData.npsn} | Akreditasi: ${formData.akreditasi}`
                  }
                  onChange={(e) => updateCfg({ customIdentitasText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-[11.5px] focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Format standar: NSM: [Nomor] | NPSN: [Nomor] | Akreditasi: [A/B/Unggul]
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Baris Alamat Lengkap & Kode Pos
                </label>
                <input
                  type="text"
                  value={
                    cfg.customAlamatText ||
                    `${formData.alamat}${formData.desaKelurahan ? `, ${formData.desaKelurahan}` : ''}${
                      formData.kecamatan ? `, Kec. ${formData.kecamatan}` : ''
                    }, ${formData.kabupatenKota || ''}, ${formData.provinsi || ''}${
                      formData.kodePos ? ` - Kode Pos: ${formData.kodePos}` : ''
                    }`
                  }
                  onChange={(e) => updateCfg({ customAlamatText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Baris Kontak (Telepon, Email & Website)
                </label>
                <input
                  type="text"
                  value={
                    cfg.customKontakText ||
                    `Telp: ${formData.telepon || '(0281) 6841234'} | Email: ${formData.email}${
                      formData.website ? ` | Website: ${formData.website}` : ''
                    }`
                  }
                  onChange={(e) => updateCfg({ customKontakText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: GAYA GARIS & BASMALAH */}
        {activeSubTab === 'GARIS' && (
          <div className="p-6 space-y-5 text-xs">
            <div>
              <label className="font-bold text-slate-800 block mb-2">Gaya Garis Pemisah Kop Surat:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'DOUBLE', label: 'Garis Ganda (Double)', desc: 'Standar Resmi Kemenag RI' },
                  { id: 'SINGLE', label: 'Garis Tunggal', desc: 'Sederhana & Ramping' },
                  { id: 'THICK', label: 'Garis Tebal 3px', desc: 'Tegas & Formal' },
                  { id: 'NONE', label: 'Tanpa Garis', desc: 'Bersih Tanpa Pembatas' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateCfg({ garisPemisahStyle: item.id as any })}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      (cfg.garisPemisahStyle || 'DOUBLE') === item.id
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-700 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Warna Garis Pemisah:</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={cfg.warnaGaris || '#0f172a'}
                    onChange={(e) => updateCfg({ warnaGaris: e.target.value })}
                    className="w-10 h-10 p-0.5 rounded-lg border border-slate-300 cursor-pointer"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateCfg({ warnaGaris: '#0f172a' })}
                      className="px-2.5 py-1 text-[11px] bg-slate-900 text-white rounded-md font-medium"
                    >
                      Hitam Pekat
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCfg({ warnaGaris: '#065f46' })}
                      className="px-2.5 py-1 text-[11px] bg-emerald-800 text-white rounded-md font-medium"
                    >
                      Hijau Kemenag
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCfg({ warnaGaris: '#1e3a8a' })}
                      className="px-2.5 py-1 text-[11px] bg-blue-900 text-white rounded-md font-medium"
                    >
                      Biru Navy
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1.5">Kaligrafi Basmalah di Bawah Kop:</label>
                <label className="flex items-center space-x-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cfg.showBasmalah !== false}
                    onChange={(e) => updateCfg({ showBasmalah: e.target.checked })}
                    className="rounded text-emerald-600"
                  />
                  <div>
                    <span className="font-bold text-slate-800 block text-xs">
                      Tampilkan Basmalah Arab
                    </span>
                    <span className="text-[10px] text-slate-500 font-serif">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (Standar Surat Resmi Madrasah)
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: TEMPLATE 1-KLIK */}
        {activeSubTab === 'TEMPLATE' && (
          <div className="p-6 space-y-4 text-xs">
            <p className="text-slate-600">
              Pilih salah satu template desain Kop Surat siap pakai di bawah ini untuk langsung menerapkannya:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => applyPreset('KEMENAG_NEGERI')}
                className="p-4 border border-slate-200 hover:border-emerald-600 rounded-2xl bg-white hover:bg-emerald-50/40 transition-all cursor-pointer space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-emerald-700" />
                    <span>1. Standar Madrasah Negeri (Kemenag RI)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Resmi
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Logo Kemenag RI di kiri, tanpa logo kanan, garis ganda resmi hitam pekat, basmalah Arab di bawahnya.
                </p>
                <button
                  type="button"
                  className="px-3 py-1 bg-emerald-700 text-white rounded-lg font-bold text-[10px]"
                >
                  Terapkan Template Ini
                </button>
              </div>

              <div
                onClick={() => applyPreset('MAARIF_NU')}
                className="p-4 border border-slate-200 hover:border-emerald-600 rounded-2xl bg-white hover:bg-emerald-50/40 transition-all cursor-pointer space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <span>2. Standar LP Ma'arif NU (Swasta)</span>
                  </span>
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                    Dual Logo
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Logo Kemenag RI di kiri & Logo LP Ma'arif NU di kanan, baris instansi LP Ma'arif NU, garis ganda warna hijau Kemenag.
                </p>
                <button
                  type="button"
                  className="px-3 py-1 bg-teal-700 text-white rounded-lg font-bold text-[10px]"
                >
                  Terapkan Template Ini
                </button>
              </div>

              <div
                onClick={() => applyPreset('YAYASAN_ISLAM')}
                className="p-4 border border-slate-200 hover:border-emerald-600 rounded-2xl bg-white hover:bg-emerald-50/40 transition-all cursor-pointer space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-emerald-700" />
                    <span>3. Standar Yayasan Pendidikan Islam</span>
                  </span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">
                    Yayasan
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Baris 1 atas nama Yayasan, baris 2 wilayah, garis pembatas tebal formal 3px.
                </p>
                <button
                  type="button"
                  className="px-3 py-1 bg-indigo-700 text-white rounded-lg font-bold text-[10px]"
                >
                  Terapkan Template Ini
                </button>
              </div>

              <div
                onClick={() => applyPreset('MINIMALIS')}
                className="p-4 border border-slate-200 hover:border-emerald-600 rounded-2xl bg-white hover:bg-emerald-50/40 transition-all cursor-pointer space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-slate-700" />
                    <span>4. Modern Minimalis</span>
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full font-bold">
                    Modern
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Garis tunggal tipis modern, tata letak bersih dan ringkas.
                </p>
                <button
                  type="button"
                  className="px-3 py-1 bg-slate-800 text-white rounded-lg font-bold text-[10px]"
                >
                  Terapkan Template Ini
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kop surat otomatis disimpan ke database browser dan diekspor ke cPanel MySQL.</span>
          </div>

          <div className="flex items-center space-x-3">
            {saveStatus === 'SAVED' && (
              <div
                id="footer-kop-saved-badge"
                role="status"
                className="flex items-center space-x-1.5 text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl text-xs font-bold animate-fade-in"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                <span>Tersimpan!</span>
              </div>
            )}

            <button
              type="button"
              id="btn-save-kop-surat-footer"
              disabled={saveStatus === 'SAVING'}
              onClick={() => handleSave()}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center space-x-2 cursor-pointer shadow-sm active:scale-95 ${
                saveStatus === 'SAVED'
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 scale-102'
                  : saveStatus === 'SAVING'
                  ? 'bg-emerald-800 text-emerald-200 cursor-wait'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-md'
              }`}
            >
              {saveStatus === 'SAVING' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                  <span>Menyimpan Perubahan...</span>
                </>
              ) : saveStatus === 'SAVED' ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>✓ Berhasil Disimpan!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Kop Surat</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
