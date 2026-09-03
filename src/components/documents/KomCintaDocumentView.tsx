import React from 'react';
import { MadrasahProfile, OfficialDocument, Teacher, Student } from '../../types';
import { KomCintaData, defaultKomCintaData } from '../../data/komCintaDefaultData';
import { KomComplete78PagesDocument } from './kom86/KomComplete78PagesDocument';
import { CheckCircle2, Printer, Sparkles, FileCheck } from 'lucide-react';

interface KomCintaDocumentViewProps {
  document?: OfficialDocument;
  profile: MadrasahProfile;
  teachers?: Teacher[];
  students?: Student[];
  customData?: KomCintaData;
}

export const KomCintaDocumentView: React.FC<KomCintaDocumentViewProps> = ({
  document,
  profile,
  teachers = [],
  students = [],
  customData,
}) => {
  // Merge customData or document?.contentData with defaultKomCintaData safely
  const rawData: Partial<KomCintaData> = {
    ...defaultKomCintaData,
    ...((document?.contentData as Partial<KomCintaData>) || {}),
    ...(customData || {}),
  };

  const data: KomCintaData = {
    ...defaultKomCintaData,
    ...rawData,
    namaMadrasah: rawData.namaMadrasah || profile.namaMadrasah || defaultKomCintaData.namaMadrasah,
    nsm: rawData.nsm || profile.nsm || defaultKomCintaData.nsm,
    npsn: rawData.npsn || profile.npsn || defaultKomCintaData.npsn,
    alamat: rawData.alamat || profile.alamat || defaultKomCintaData.alamat,
    desa: rawData.desa || (defaultKomCintaData as any).desa || 'Sanggreman',
    kecamatan: rawData.kecamatan || profile.kecamatan || defaultKomCintaData.kecamatan,
    kabupaten: rawData.kabupaten || profile.kabupatenKota?.replace(/^Kabupaten\s+/i, '') || defaultKomCintaData.kabupaten,
    namaKepala: rawData.namaKepala || (rawData as any).namaKepalaMadrasah || profile.namaKepala || defaultKomCintaData.namaKepala,
    nipKepala: rawData.nipKepala || (rawData as any).nipKepalaMadrasah || profile.nipKepala || defaultKomCintaData.nipKepala,
    namaKetuaKomite: rawData.namaKetuaKomite || (rawData as any).namaKomite || profile.namaKetuaKomite || defaultKomCintaData.namaKetuaKomite,
    namaPengawas: rawData.namaPengawas || profile.namaPengawas || defaultKomCintaData.namaPengawas,
    nipPengawas: rawData.nipPengawas || profile.nipPengawas || defaultKomCintaData.nipPengawas,
    tahunAjaran: rawData.tahunAjaran || profile.tahunAjaran || defaultKomCintaData.tahunAjaran,
    
    // Arrays & Nested objects safe normalization
    misi: Array.isArray(rawData.misi) ? rawData.misi : defaultKomCintaData.misi,
    tujuan: Array.isArray(rawData.tujuan) ? rawData.tujuan : typeof (rawData as any).tujuan === 'string' ? [(rawData as any).tujuan] : defaultKomCintaData.tujuan,
    indikatorVisi: Array.isArray(rawData.indikatorVisi) ? rawData.indikatorVisi : defaultKomCintaData.indikatorVisi,
    targetStandar: Array.isArray(rawData.targetStandar) ? rawData.targetStandar : defaultKomCintaData.targetStandar,
    soar: {
      strengths: Array.isArray(rawData.soar?.strengths) ? rawData.soar.strengths : defaultKomCintaData.soar.strengths,
      opportunities: Array.isArray(rawData.soar?.opportunities) ? rawData.soar.opportunities : defaultKomCintaData.soar.opportunities,
      aspirations: Array.isArray(rawData.soar?.aspirations) ? rawData.soar.aspirations : defaultKomCintaData.soar.aspirations,
      results: Array.isArray(rawData.soar?.results) ? rawData.soar.results : defaultKomCintaData.soar.results,
    },
    tahfidzProgram: Array.isArray(rawData.tahfidzProgram) ? rawData.tahfidzProgram : defaultKomCintaData.tahfidzProgram,
    itProgram: Array.isArray(rawData.itProgram) ? rawData.itProgram : defaultKomCintaData.itProgram,
    asramaProgram: Array.isArray(rawData.asramaProgram) ? rawData.asramaProgram : defaultKomCintaData.asramaProgram,
    adiwiyataProgram: Array.isArray(rawData.adiwiyataProgram) ? rawData.adiwiyataProgram : defaultKomCintaData.adiwiyataProgram,
    teachersList: Array.isArray(rawData.teachersList) && rawData.teachersList.length > 0 ? rawData.teachersList : defaultKomCintaData.teachersList,
    siswa3Tahun: Array.isArray(rawData.siswa3Tahun) ? rawData.siswa3Tahun : defaultKomCintaData.siswa3Tahun,
    siswaRombel2026: Array.isArray(rawData.siswaRombel2026) ? rawData.siswaRombel2026 : defaultKomCintaData.siswaRombel2026,
    rekapPendidikanOrtu: Array.isArray(rawData.rekapPendidikanOrtu) ? rawData.rekapPendidikanOrtu : defaultKomCintaData.rekapPendidikanOrtu,
    rekapPekerjaanOrtu: Array.isArray(rawData.rekapPekerjaanOrtu) ? rawData.rekapPekerjaanOrtu : defaultKomCintaData.rekapPekerjaanOrtu,
    prestasiSiswa: Array.isArray(rawData.prestasiSiswa) ? rawData.prestasiSiswa : defaultKomCintaData.prestasiSiswa,
    kemitraanPemerintah: Array.isArray(rawData.kemitraanPemerintah) ? rawData.kemitraanPemerintah : defaultKomCintaData.kemitraanPemerintah,
    kemitraanNonPemerintah: Array.isArray(rawData.kemitraanNonPemerintah) ? rawData.kemitraanNonPemerintah : defaultKomCintaData.kemitraanNonPemerintah,
    pekanEfektifSem1: Array.isArray(rawData.pekanEfektifSem1) ? rawData.pekanEfektifSem1 : defaultKomCintaData.pekanEfektifSem1,
    pekanEfektifSem2: Array.isArray(rawData.pekanEfektifSem2) ? rawData.pekanEfektifSem2 : defaultKomCintaData.pekanEfektifSem2,
    landasanHukum: Array.isArray(rawData.landasanHukum) ? rawData.landasanHukum : defaultKomCintaData.landasanHukum,
    strukturMapel: Array.isArray(rawData.strukturMapel) ? rawData.strukturMapel : defaultKomCintaData.strukturMapel,
    pancaCinta: Array.isArray(rawData.pancaCinta) ? rawData.pancaCinta : defaultKomCintaData.pancaCinta,
    delapanProfilLulusan: Array.isArray(rawData.delapanProfilLulusan) ? rawData.delapanProfilLulusan : defaultKomCintaData.delapanProfilLulusan,
    ekstrakurikulerList: Array.isArray(rawData.ekstrakurikulerList) ? rawData.ekstrakurikulerList : defaultKomCintaData.ekstrakurikulerList,
    pembiasaan: {
      harian: Array.isArray(rawData.pembiasaan?.harian) ? rawData.pembiasaan.harian : defaultKomCintaData.pembiasaan.harian,
      mingguan: Array.isArray(rawData.pembiasaan?.mingguan) ? rawData.pembiasaan.mingguan : defaultKomCintaData.pembiasaan.mingguan,
      tahunan: Array.isArray(rawData.pembiasaan?.tahunan) ? rawData.pembiasaan.tahunan : defaultKomCintaData.pembiasaan.tahunan,
    },
    mediaWajib: Array.isArray(rawData.mediaWajib) ? rawData.mediaWajib : defaultKomCintaData.mediaWajib,
    mediaPilihan: Array.isArray(rawData.mediaPilihan) ? rawData.mediaPilihan : defaultKomCintaData.mediaPilihan,
    kriteriaKenaikan: Array.isArray(rawData.kriteriaKenaikan) ? rawData.kriteriaKenaikan : defaultKomCintaData.kriteriaKenaikan,
    kriteriaKelulusan: Array.isArray(rawData.kriteriaKelulusan) ? rawData.kriteriaKelulusan : defaultKomCintaData.kriteriaKelulusan,
    pengembanganProfesi: Array.isArray(rawData.pengembanganProfesi) ? rawData.pengembanganProfesi : defaultKomCintaData.pengembanganProfesi,
    lampiranList: Array.isArray(rawData.lampiranList) ? rawData.lampiranList : defaultKomCintaData.lampiranList,
    hariEfektifSem1: Array.isArray(rawData.hariEfektifSem1) ? rawData.hariEfektifSem1 : defaultKomCintaData.hariEfektifSem1,
    hariEfektifSem2: Array.isArray(rawData.hariEfektifSem2) ? rawData.hariEfektifSem2 : defaultKomCintaData.hariEfektifSem2,
  };

  return (
    <div id="kom-cinta-doc-container" className="font-sans text-slate-900 leading-[1.75]">
      {/* Banner Notifikasi Verifikasi & Paginasi Standar */}
      <div className="mb-6 p-4 bg-emerald-950 text-white rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-md border border-emerald-800 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm">Dokumen Terstandarisasi 78 Halaman (KMA 1503 Tahun 2025)</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                Spasi 1.5 Resmi
              </span>
            </div>
            <p className="text-xs text-emerald-200">
              Format paginasi tepat 78 halaman dengan alokasi halaman terstruktur per bab untuk validasi pengawas dan verifikator.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Unduh PDF (78 Hal)</span>
          </button>
        </div>
      </div>

      {/* Dokumen Lengkap 78 Halaman */}
      <KomComplete78PagesDocument data={data} />
    </div>
  );
};
