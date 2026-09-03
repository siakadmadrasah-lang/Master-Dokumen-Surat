import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Building2,
  Save,
  RotateCcw,
  X,
  FileCheck2,
  Sparkles,
  Award,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { MadrasahProfile } from '../types';
import { KomCintaData } from '../data/komCintaDefaultData';

interface PengesahPejabatModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: MadrasahProfile;
  komData?: KomCintaData;
  onSave: (updated: {
    namaKetuaKomite: string;
    namaPengawas: string;
    nipPengawas: string;
    namaKasiPenma: string;
    nipKasiPenma: string;
    kantorKemenag: string;
    tanggalRekomendasi?: string;
    tanggalPengesahan?: string;
  }) => void;
}

export const PengesahPejabatModal: React.FC<PengesahPejabatModalProps> = ({
  isOpen,
  onClose,
  profile,
  komData,
  onSave,
}) => {
  const [namaKetuaKomite, setNamaKetuaKomite] = useState(
    komData?.namaKetuaKomite || profile.namaKetuaKomite || 'Sohibul Ikhsan, S.Ag.'
  );
  const [namaPengawas, setNamaPengawas] = useState(
    komData?.namaPengawas || profile.namaPengawas || 'H. Amin Purnomo, S.Ag.'
  );
  const [nipPengawas, setNipPengawas] = useState(
    komData?.nipPengawas || profile.nipPengawas || '197112031998031001'
  );
  const [namaKasiPenma, setNamaKasiPenma] = useState(
    komData?.namaKasiPenma || profile.namaKasiPenma || 'Dr. H. M. Wahyu Fauzi Aziz, SH., M.Si'
  );
  const [nipKasiPenma, setNipKasiPenma] = useState(
    komData?.nipKasiPenma || profile.nipKasiPenma || '19771110 200901 1 013'
  );
  const [kantorKemenag, setKantorKemenag] = useState(
    profile.kantorKemenag || 'Kantor Kementerian Agama Kabupaten Banyumas'
  );
  const [tanggalRekomendasi, setTanggalRekomendasi] = useState(
    komData?.tanggalRekomendasi || '15 Juli 2026'
  );
  const [tanggalPengesahan, setTanggalPengesahan] = useState(
    komData?.tanggalPengesahan || '25 Juli 2026'
  );
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      namaKetuaKomite,
      namaPengawas,
      nipPengawas,
      namaKasiPenma,
      nipKasiPenma,
      kantorKemenag,
      tanggalRekomendasi,
      tanggalPengesahan,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleResetBanyumas = () => {
    setNamaKetuaKomite('Sohibul Ikhsan, S.Ag.');
    setNamaPengawas('H. Amin Purnomo, S.Ag.');
    setNipPengawas('197112031998031001');
    setNamaKasiPenma('Dr. H. M. Wahyu Fauzi Aziz, SH., M.Si');
    setNipKasiPenma('19771110 200901 1 013');
    setKantorKemenag('Kantor Kementerian Agama Kabupaten Banyumas');
    setTanggalRekomendasi('15 Juli 2026');
    setTanggalPengesahan('25 Juli 2026');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/60 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold">Modul Identitas Pejabat & Pengesah Dokumen</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                  Kemenag Banyumas
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Penyelarasan otomatis untuk Lembar Pengesahan KOM 78 Hal, Rekomendasi, & SK TPKM
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Pejabat 1: Komite Madrasah */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span>1. KETUA KOMITE MADRASAH</span>
              </div>
              <span className="text-[10.5px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded-md">
                Pihak Penyetuju Kurikulum
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama Lengkap Ketua Komite (Beserta Gelar)*
                </label>
                <input
                  type="text"
                  value={namaKetuaKomite}
                  onChange={(e) => setNamaKetuaKomite(e.target.value)}
                  placeholder="Contoh: Sohibul Ikhsan, S.Ag."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Pejabat 2: Pengawas Pembina */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>2. PENGAWAS PEMBINA MADRASAH</span>
              </div>
              <span className="text-[10.5px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded-md">
                Pemberi Rekomendasi Validasi
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama Lengkap Pengawas Pembina (Beserta Gelar)*
                </label>
                <input
                  type="text"
                  value={namaPengawas}
                  onChange={(e) => setNamaPengawas(e.target.value)}
                  placeholder="Contoh: H. Amin Purnomo, S.Ag."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  NIP Pengawas Pembina*
                </label>
                <input
                  type="text"
                  value={nipPengawas}
                  onChange={(e) => setNipPengawas(e.target.value)}
                  placeholder="Contoh: 197112031998031001"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tanggal Surat Rekomendasi Pengawas
                </label>
                <input
                  type="text"
                  value={tanggalRekomendasi}
                  onChange={(e) => setTanggalRekomendasi(e.target.value)}
                  placeholder="Contoh: 15 Juli 2026"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Pejabat 3: Kasi Pendma Kantor Kemenag Kabupaten Banyumas */}
          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs sm:text-sm">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>3. KASI PENDIDIKAN MADRASAH KEMENAG BANYUMAS</span>
              </div>
              <span className="text-[10.5px] px-2 py-0.5 bg-emerald-200 text-emerald-900 font-bold rounded-md">
                Pihak Pengesah Kurikulum
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nama Lengkap Kasi Pendidikan Madrasah (Lengkap Gelar)*
                </label>
                <input
                  type="text"
                  value={namaKasiPenma}
                  onChange={(e) => setNamaKasiPenma(e.target.value)}
                  placeholder="Contoh: Dr. H. M. Wahyu Fauzi Aziz, SH., M.Si"
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  NIP Kasi Pendidikan Madrasah*
                </label>
                <input
                  type="text"
                  value={nipKasiPenma}
                  onChange={(e) => setNipKasiPenma(e.target.value)}
                  placeholder="Contoh: 19771110 200901 1 013"
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-slate-900 font-mono focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">
                  Instansi Kantor Kementerian Agama
                </label>
                <input
                  type="text"
                  value={kantorKemenag}
                  onChange={(e) => setKantorKemenag(e.target.value)}
                  placeholder="Contoh: Kantor Kementerian Agama Kabupaten Banyumas"
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tanggal Penetapan Pengesahan
                </label>
                <input
                  type="text"
                  value={tanggalPengesahan}
                  onChange={(e) => setTanggalPengesahan(e.target.value)}
                  placeholder="Contoh: 25 Juli 2026"
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetBanyumas}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Standar Pejabat Banyumas</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan & Terapkan Pejabat</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
