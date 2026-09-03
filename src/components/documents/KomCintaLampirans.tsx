import React from 'react';
import { MadrasahProfile, OfficialDocument, Teacher, Student } from '../../types';
import {
  FileText,
  CheckCircle2,
  Award,
  ShieldCheck,
  Calendar,
  Users,
  Building,
  Heart,
  Sparkles,
  BookOpen,
  GraduationCap,
  Briefcase,
  Check,
  MapPin,
  Clock,
  Camera,
} from 'lucide-react';
import { MaarifNuLogo, KemenagLogo } from '../OfficialLogos';
import { KomCintaData, defaultKomCintaData } from '../../data/komCintaDefaultData';

interface KomCintaLampiransProps {
  document?: OfficialDocument;
  profile: MadrasahProfile;
  teachers?: Teacher[];
  students?: Student[];
  data: KomCintaData;
}

export const KomCintaLampirans: React.FC<KomCintaLampiransProps> = ({
  document,
  profile,
  teachers = [],
  students = [],
  data: inputData,
}) => {
  const data: KomCintaData = {
    ...defaultKomCintaData,
    ...(inputData || {}),
    lampiranList: Array.isArray(inputData?.lampiranList) ? inputData.lampiranList : defaultKomCintaData.lampiranList,
    hariEfektifSem1: Array.isArray(inputData?.hariEfektifSem1) ? inputData.hariEfektifSem1 : defaultKomCintaData.hariEfektifSem1,
    hariEfektifSem2: Array.isArray(inputData?.hariEfektifSem2) ? inputData.hariEfektifSem2 : defaultKomCintaData.hariEfektifSem2,
    teachersList: Array.isArray(inputData?.teachersList) && inputData.teachersList.length > 0 ? inputData.teachersList : defaultKomCintaData.teachersList,
    siswaRombel2026: Array.isArray(inputData?.siswaRombel2026) ? inputData.siswaRombel2026 : defaultKomCintaData.siswaRombel2026,
    strukturMapel: Array.isArray(inputData?.strukturMapel) ? inputData.strukturMapel : defaultKomCintaData.strukturMapel,
  };
  return (
    <div className="space-y-10 print:space-y-8 leading-[1.75]">
      {/* =========================================================================
          HALAMAN PENGANTAR LAMPIRAN (Hal. 78)
          ========================================================================= */}
      <div
        id="lampiran-daftar-isi"
        className="space-y-5 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 78
        </div>
        <div className="text-center space-y-1 mb-4">
          <div className="inline-block px-3 py-1 bg-emerald-900 text-emerald-100 rounded-full text-xs font-bold uppercase tracking-widest mb-1">
            BAGIAN LAMPIRAN NASKAH RESMI
          </div>
          <h2 className="text-base sm:text-xl font-extrabold uppercase tracking-wider text-emerald-950 underline font-serif">
            DAFTAR LAMPIRAN DOKUMEN KURIKULUM BERBASIS CINTA
          </h2>
          <p className="text-xs text-slate-700 font-bold uppercase">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="bg-slate-50/90 border border-slate-300 rounded-xl p-6 shadow-xs">
          <p className="text-xs text-slate-700 mb-3 text-justify leading-relaxed">
            Lampiran-lampiran berikut merupakan bagian yang tidak terpisahkan dari naskah utama Kurikulum {data.namaMadrasah} Tahun Pelajaran {data.tahunAjaran} berdasarkan Keputusan Menteri Agama (KMA) Nomor 1503 Tahun 2025:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-slate-300 bg-white">
              <thead className="bg-emerald-900 text-white text-[11px] uppercase">
                <tr>
                  <th className="border border-slate-300 p-2 w-14 text-center">No</th>
                  <th className="border border-slate-300 p-2 text-left">Judul Dokumen Lampiran</th>
                  <th className="border border-slate-300 p-2 w-28 text-center">Nomor SK / Hal</th>
                  <th className="border border-slate-300 p-2 w-28 text-center">Status Keabsahan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11.5px]">
                {data.lampiranList.map((lamp, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="border border-slate-300 p-2 text-center font-bold text-emerald-950">
                      {idx + 1}
                    </td>
                    <td className="border border-slate-300 p-2 font-medium text-slate-800">
                      {lamp.replace(/^Lampiran\s*\d+:\s*/i, '')}
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-mono text-slate-600">
                      Hal. {79 + idx}
                    </td>
                    <td className="border border-slate-300 p-2 text-center text-emerald-700 font-semibold">
                      ✓ Sah Terlampir
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 1: INSTRUMEN VALIDASI PENGAWAS PEMBINA KEMENAG (Hal. 79)
          ========================================================================= */}
      <div
        id="lampiran-1"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 79
        </div>

        {/* Kop Surat Kemenag / LP Ma'arif */}
        <div className="border-b-[3px] border-double border-slate-900 pb-2 flex items-center justify-between gap-4">
          <KemenagLogo className="w-14 h-14 flex-shrink-0" />
          <div className="text-center flex-1 space-y-0.5">
            <p className="text-[11px] font-bold text-slate-800 uppercase">
              KEMENTERIAN AGAMA REPUBLIK INDONESIA
            </p>
            <p className="text-[10px] font-semibold text-slate-700 uppercase">
              KANTOR KEMENTERIAN AGAMA KABUPATEN {data.kabupaten.toUpperCase()}
            </p>
            <h3 className="text-xs sm:text-sm font-extrabold text-emerald-950 uppercase">
              POKJAWAS MADRASAH KABUPATEN {data.kabupaten.toUpperCase()}
            </h3>
            <p className="text-[9px] text-slate-600">
              Sekretariat: Kantor Kemenag Kab. {data.kabupaten} • Pengawas Pembina: {data.namaPengawas}
            </p>
          </div>
          <MaarifNuLogo className="w-14 h-14 flex-shrink-0" />
        </div>

        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 1
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            INSTRUMEN VALIDASI DAN VERIFIKASI KURIKULUM MADRASAH
          </h2>
          <p className="text-[11px] font-bold text-slate-800">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran} (KMA 1503 TAHUN 2025)
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 text-[11.5px] space-y-1">
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3 font-semibold text-slate-700">Nama Madrasah</span>
            <span className="col-span-9 font-bold text-emerald-950">: {data.namaMadrasah}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3 font-semibold text-slate-700">NSM / NPSN</span>
            <span className="col-span-9 font-mono">: {data.nsm} / {data.npsn}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3 font-semibold text-slate-700">Nama Kepala Madrasah</span>
            <span className="col-span-9 font-bold">: {data.namaKepala} (NIP. {data.nipKepala})</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3 font-semibold text-slate-700">Pengawas Pembina</span>
            <span className="col-span-9 font-bold">: {data.namaPengawas} (NIP. {data.nipPengawas})</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-3 font-semibold text-slate-700">Tanggal Verifikasi</span>
            <span className="col-span-9 font-mono">: {data.tanggalRekomendasi}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10.5px] border border-slate-300 bg-white">
            <thead className="bg-slate-100 font-bold text-slate-900 uppercase">
              <tr>
                <th className="border border-slate-300 p-1.5 w-10 text-center">No</th>
                <th className="border border-slate-300 p-1.5 text-left">Komponen / Aspek Penelaahan Kurikulum</th>
                <th className="border border-slate-300 p-1.5 w-20 text-center">Kesesuaian</th>
                <th className="border border-slate-300 p-1.5 w-16 text-center">Skor (1-4)</th>
                <th className="border border-slate-300 p-1.5 text-left">Catatan Penelaahan Pengawas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { no: '1', aspek: 'Kelengkapan Cover, Lembar Pengesahan 3 Pihak, dan Kata Pengantar', ses: 'Sesuai', skor: '4', cat: 'Format baku & TTE sah lengkap' },
                { no: '2', aspek: 'Bab I: Karakteristik Madrasah, Profil Sarpras, dan Analisis SOAR', ses: 'Sesuai', skor: '4', cat: 'Analisis mendalam & kontekstual' },
                { no: '3', aspek: 'Bab II: Visi, Misi, Tujuan, dan 8 Dimensi Profil Lulusan', ses: 'Sesuai', skor: '4', cat: 'Selaras dengan visi Kemenag & LP Ma’arif' },
                { no: '4', aspek: 'Bab III: Penerapan Pilar Panca Cinta & Pendekatan Deep Learning', ses: 'Sesuai', skor: '4', cat: 'Sangat inovatif sesuai KMA 1503/2025' },
                { no: '5', aspek: 'Bab IV: Struktur Kurikulum Intrakurikuler, Mulok, P5RA & Koding AI', ses: 'Sesuai', skor: '4', cat: 'Beban belajar & ekuivalensi jam tepat' },
                { no: '6', aspek: 'Bab V: Perencanaan Pembelajaran, ATP, Modul Ajar, dan Asesmen', ses: 'Sesuai', skor: '4', cat: 'Memuat asesmen diagnostik, formatif & sumatif' },
                { no: '7', aspek: 'Bab VI: Pendampingan, Evaluasi, PKB Guru, dan Penutup', ses: 'Sesuai', skor: '4', cat: 'Jadwal supervisi klinis terstruktur' },
                { no: '8', aspek: 'Kelengkapan 15 Dokumen Lampiran Resmi', ses: 'Sesuai', skor: '4', cat: 'Lampiran 1 s.d. 15 lengkap terlampir' },
              ].map((row, rIdx) => (
                <tr key={rIdx}>
                  <td className="border border-slate-300 p-1.5 text-center font-bold">{row.no}</td>
                  <td className="border border-slate-300 p-1.5 font-medium">{row.aspek}</td>
                  <td className="border border-slate-300 p-1.5 text-center text-emerald-800 font-bold">{row.ses}</td>
                  <td className="border border-slate-300 p-1.5 text-center font-bold font-mono">{row.skor}</td>
                  <td className="border border-slate-300 p-1.5 text-slate-700">{row.cat}</td>
                </tr>
              ))}
              <tr className="bg-emerald-50/80 font-bold text-emerald-950">
                <td colSpan={3} className="border border-slate-300 p-2 text-right">
                  TOTAL SKOR / NILAI KELAYAKAN AKHIR (%):
                </td>
                <td className="border border-slate-300 p-2 text-center font-mono text-xs">
                  32 / 32
                </td>
                <td className="border border-slate-300 p-2 font-bold text-xs">
                  100% (PREDIKAT: SANGAT BAIK / LAYAK DILAKSANAKAN)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-slate-300 rounded-lg p-3 text-[11px] space-y-1">
          <p className="font-bold text-slate-900">Rekomendasi Pengawas Pembina:</p>
          <p className="text-justify italic text-slate-700">
            "Dokumen Kurikulum {data.namaMadrasah} Tahun Ajaran {data.tahunAjaran} telah memenuhi seluruh kaidah substantif dan regulatif KMA Nomor 1503 Tahun 2025 serta siap disahkan dan diterapkan secara penuh pada proses pembelajaran."
          </p>
        </div>

        <div className="flex justify-end pt-4 text-xs">
          <div className="text-center w-64 space-y-1">
            <p>{data.kabupaten}, {data.tanggalRekomendasi}</p>
            <p className="font-bold text-slate-900">Pengawas Pembina Madrasah</p>
            <div className="h-14 flex items-center justify-center font-serif text-emerald-800 italic text-xs">
              (Tanda Tangan & Cap Sah)
            </div>
            <p className="font-bold underline text-slate-900">{data.namaPengawas}</p>
            <p className="font-mono text-[10.5px] text-slate-600">NIP. {data.nipPengawas}</p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 2: SK KEPALA MADRASAH TENTANG TPKM (Hal. 80)
          ========================================================================= */}
      <div
        id="lampiran-2"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 80
        </div>

        {/* KOP RESMI */}
        <div className="border-b-[3px] border-double border-slate-900 pb-2 flex items-center justify-between gap-4">
          <MaarifNuLogo className="w-14 h-14 flex-shrink-0" />
          <div className="text-center flex-1 space-y-0.5">
            <p className="text-[11px] font-bold text-slate-800 uppercase">
              LEMBAGA PENDIDIKAN MA'ARIF NU CABANG {data.kabupaten.toUpperCase()}
            </p>
            <h3 className="text-xs sm:text-sm font-extrabold text-emerald-950 uppercase">
              {data.namaMadrasah}
            </h3>
            <p className="text-[9.5px] text-slate-600">
              NSM: {data.nsm} | NPSN: {data.npsn} | Alamat: {data.alamat} - {data.kecamatan}
            </p>
          </div>
          <KemenagLogo className="w-14 h-14 flex-shrink-0" />
        </div>

        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 2
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            KEPUTUSAN KEPALA {data.namaMadrasah.toUpperCase()}
          </h2>
          <p className="text-[11px] font-mono font-bold text-slate-700">
            NOMOR: 042/MI-77/SK-TPKM/VII/{data.tahunAjaran.substring(0, 4)}
          </p>
          <p className="text-xs font-bold text-slate-800 uppercase">
            TENTANG TIM PENGEMBANG KURIKULUM MADRASAH (TPKM) TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="text-xs sm:text-[11.5px] space-y-2 leading-relaxed">
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-2 font-bold text-slate-800">Menimbang</span>
            <div className="col-span-10 space-y-1 text-justify">
              <p>a. bahwa dalam rangka memperlancar proses penyusunan Kurikulum Operasional Madrasah Berbasis Cinta sesuai KMA 1503 Tahun 2025, perlu dibentuk Tim Pengembang Kurikulum Madrasah;</p>
              <p>b. bahwa nama-nama yang tercantum dalam lampiran keputusan ini dipandang cakap dan mampu untuk melaksanakan tugas tersebut.</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-2 font-bold text-slate-800">Mengingat</span>
            <div className="col-span-10 space-y-0.5 text-justify">
              <p>1. UU No. 20 Tahun 2003 tentang Sistem Pendidikan Nasional;</p>
              <p>2. KMA No. 1503 Tahun 2025 tentang Kurikulum Madrasah Berbasis Cinta;</p>
              <p>3. PMA No. 9 Tahun 2016 tentang Tata Naskah Dinas Kementerian Agama.</p>
            </div>
          </div>

          <div className="text-center font-bold py-1 text-slate-900 uppercase">MEMUTUSKAN:</div>

          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-2 font-bold text-slate-800">Menetapkan</span>
            <div className="col-span-10 space-y-1 text-justify">
              <p><strong>PERTAMA:</strong> Membentuk Tim Pengembang Kurikulum Madrasah (TPKM) {data.namaMadrasah} Tahun Ajaran {data.tahunAjaran} dengan susunan personalia sebagaimana tercantum dalam tabel berikut:</p>
            </div>
          </div>
        </div>

        {/* Tabel Susunan TPKM */}
        <div className="overflow-x-auto">
          <table className="w-full text-[10.5px] border border-slate-300 bg-white">
            <thead className="bg-slate-100 font-bold text-slate-900 uppercase">
              <tr>
                <th className="border border-slate-300 p-1.5 w-10 text-center">No</th>
                <th className="border border-slate-300 p-1.5 text-left">Nama Lengkap & NIP</th>
                <th className="border border-slate-300 p-1.5 text-left">Jabatan Kedinasan</th>
                <th className="border border-slate-300 p-1.5 text-left">Jabatan dalam TPKM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { no: '1', nama: data.namaKepala, nip: data.nipKepala, jab: 'Kepala Madrasah', role: 'Penanggung Jawab Utama' },
                { no: '2', nama: data.namaKetuaKomite, nip: '-', jab: 'Ketua Komite Madrasah', role: 'Pengarah & Penasihat' },
                { no: '3', nama: data.namaBidangKurikulum, nip: data.nipBidangKurikulum, jab: 'Waka Kurikulum', role: 'Ketua Pelaksana TPKM' },
                { no: '4', nama: teachers[0]?.nama || 'Siti Aminah, S.Pd.I', nip: teachers[0]?.nip || '198805122019032005', jab: 'Guru Kelas / Pendidik', role: 'Sekretaris TPKM' },
                { no: '5', nama: teachers[1]?.nama || 'Nurul Hidayati, S.Pd', nip: teachers[1]?.nip || '199204152020122008', jab: 'Guru / Bendahara', role: 'Bendahara TPKM' },
                { no: '6', nama: teachers[2]?.nama || 'Ahmad Fauzi, S.Pd', nip: teachers[2]?.nip || '198507202014061003', jab: 'Guru Mapel / Koordinator', role: 'Pokja Fase A (Kelas I-II)' },
                { no: '7', nama: teachers[3]?.nama || 'Muhammad Rofi, M.Pd', nip: teachers[3]?.nip || '198210102009011012', jab: 'Guru Mapel / Koordinator', role: 'Pokja Fase B (Kelas III-IV)' },
                { no: '8', nama: teachers[4]?.nama || 'Zainab, S.Ag', nip: teachers[4]?.nip || '197903142005012004', jab: 'Guru Mapel / Koordinator', role: 'Pokja Fase C (Kelas V-VI)' },
                { no: '9', nama: teachers[5]?.nama || 'Wahyu Pratama, S.Kom', nip: teachers[5]?.nip || '-', jab: 'Guru TIK & Operator', role: 'Pokja Koding & AI Madrasah' },
                { no: '10', nama: teachers[6]?.nama || 'Dewi Lestari, S.Pd', nip: teachers[6]?.nip || '-', jab: 'Guru BK / Pembina', role: 'Pokja P5RA & Karakter Cinta' },
              ].map((m, idx) => (
                <tr key={idx}>
                  <td className="border border-slate-300 p-1.5 text-center font-bold">{m.no}</td>
                  <td className="border border-slate-300 p-1.5">
                    <p className="font-bold text-slate-900">{m.nama}</p>
                    <p className="font-mono text-[9.5px] text-slate-500">NIP. {m.nip}</p>
                  </td>
                  <td className="border border-slate-300 p-1.5 text-slate-700">{m.jab}</td>
                  <td className="border border-slate-300 p-1.5 font-bold text-emerald-950">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end pt-3 text-xs">
          <div className="text-center w-60 space-y-1">
            <p>Ditetapkan di: {data.desa}</p>
            <p>Pada tanggal: {data.tanggalPengesahan}</p>
            <p className="font-bold text-slate-900">Kepala Madrasah,</p>
            <div className="h-12 flex items-center justify-center font-serif text-emerald-800 italic text-xs">
              (Tanda Tangan & Cap)
            </div>
            <p className="font-bold underline text-slate-900">{data.namaKepala}</p>
            <p className="font-mono text-[10px] text-slate-600">NIP. {data.nipKepala}</p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 3: SK PENETAPAN KURIKULUM (KOM CINTA) (Hal. 81)
          ========================================================================= */}
      <div
        id="lampiran-3"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 81
        </div>

        <div className="border-b-[3px] border-double border-slate-900 pb-2 flex items-center justify-between gap-4">
          <MaarifNuLogo className="w-14 h-14 flex-shrink-0" />
          <div className="text-center flex-1 space-y-0.5">
            <p className="text-[11px] font-bold text-slate-800 uppercase">
              LEMBAGA PENDIDIKAN MA'ARIF NU CABANG {data.kabupaten.toUpperCase()}
            </p>
            <h3 className="text-xs sm:text-sm font-extrabold text-emerald-950 uppercase">
              {data.namaMadrasah}
            </h3>
            <p className="text-[9.5px] text-slate-600">
              Alamat: {data.alamat} • NSM: {data.nsm} • NPSN: {data.npsn}
            </p>
          </div>
          <KemenagLogo className="w-14 h-14 flex-shrink-0" />
        </div>

        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 3
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            SURAT KEPUTUSAN KEPALA MADRASAH
          </h2>
          <p className="text-[11px] font-mono font-bold text-slate-700">
            NOMOR: 045/MI-77/SK-KOM/VII/{data.tahunAjaran.substring(0, 4)}
          </p>
          <p className="text-xs font-bold text-slate-800 uppercase">
            TENTANG PENETAPAN DAN PEMBERLAKUAN KURIKULUM BERBASIS CINTA (KMA 1503/2025)
          </p>
        </div>

        <div className="text-xs sm:text-[11.5px] space-y-2 leading-relaxed text-justify">
          <p className="indent-8">
            Kepala {data.namaMadrasah}, menimbang perlunya pedoman operasional penyelenggaraan pendidikan yang bermutu, inklusif, dan humanis, dengan ini memutuskan menetapkan Kurikulum Operasional Madrasah Berbasis Cinta ({data.namaMadrasah}) Tahun Ajaran {data.tahunAjaran} sebagai acuan resmi pembelajaran seluruh kelas (Fase A, B, dan C).
          </p>
          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 space-y-1">
            <p className="font-bold text-slate-900">Diktum Ketetapan:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-800 text-[11px]">
              <li>Memberlakukan Kurikulum Berbasis Cinta pada seluruh jenjang kelas I s.d. VI terhitung sejak tanggal 25 Juli 2026.</li>
              <li>Mewajibkan seluruh pendidik dan tenaga kependidikan mempedomani naskah kurikulum dalam perencanaan, pelaksanaan, dan asesmen pembelajaran.</li>
              <li>Kurikulum ini dievaluasi secara berkala pada setiap akhir semester dan tahun pelajaran demi perbaikan berkelanjutan.</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-between items-end pt-4 text-xs">
          <div className="text-center w-56 space-y-1">
            <p className="font-semibold text-slate-700">Menyetujui,</p>
            <p className="font-bold text-slate-900">Ketua Komite Madrasah</p>
            <div className="h-12 flex items-center justify-center font-serif text-emerald-800 italic text-xs">
              (Tanda Tangan)
            </div>
            <p className="font-bold underline text-slate-900">{data.namaKetuaKomite}</p>
          </div>

          <div className="text-center w-56 space-y-1">
            <p>{data.desa}, {data.tanggalPengesahan}</p>
            <p className="font-bold text-slate-900">Kepala Madrasah</p>
            <div className="h-12 flex items-center justify-center font-serif text-emerald-800 italic text-xs">
              (Tanda Tangan & Cap Sah)
            </div>
            <p className="font-bold underline text-slate-900">{data.namaKepala}</p>
            <p className="font-mono text-[10px] text-slate-600">NIP. {data.nipKepala}</p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 4: SK & TABEL KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP) (Hal. 82)
          ========================================================================= */}
      <div
        id="lampiran-4"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 82
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 4
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP) MAPEL
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border border-slate-300 bg-white">
            <thead className="bg-emerald-900 text-white font-bold uppercase">
              <tr>
                <th className="border border-slate-300 p-1.5 w-8 text-center">No</th>
                <th className="border border-slate-300 p-1.5 text-left">Mata Pelajaran</th>
                <th className="border border-slate-300 p-1.5 w-16 text-center">Fase A (I-II)</th>
                <th className="border border-slate-300 p-1.5 w-16 text-center">Fase B (III-IV)</th>
                <th className="border border-slate-300 p-1.5 w-16 text-center">Fase C (V-VI)</th>
                <th className="border border-slate-300 p-1.5 text-left">Deskripsi Ketercapaian Minimal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { no: '1', mapel: "Al-Qur'an Hadis", fA: '75', fB: '76', fC: '78', desc: 'Mampu membaca tartil, hafal surat pendek & memahami makna dasar' },
                { no: '2', mapel: 'Akidah Akhlak', fA: '75', fB: '76', fC: '78', desc: 'Memahami rukun iman, asmaul husna, dan berakhlak mulia penuh cinta' },
                { no: '3', mapel: 'Fikih', fA: '75', fB: '76', fC: '78', desc: 'Praktik thaharah, wudhu, shalat wajib & sunnah secara benar dan tertib' },
                { no: '4', mapel: 'Sejarah Kebudayaan Islam (SKI)', fA: '-', fB: '75', fC: '77', desc: 'Meneladani perjuangan Nabi Muhammad SAW & para sahabat/ulama' },
                { no: '5', mapel: 'Pendidikan Pancasila', fA: '75', fB: '76', fC: '77', desc: 'Menerapkan gotong royong, toleransi, dan kesadaran berbangsa' },
                { no: '6', mapel: 'Bahasa Indonesia', fA: '74', fB: '75', fC: '76', desc: 'Keterampilan menyimak, berbicara, membaca nyaring & menulis teks' },
                { no: '7', mapel: 'Matematika', fA: '72', fB: '73', fC: '75', desc: 'Pemahaman bilangan, operasi hitung, geometri dan pemecahan masalah' },
                { no: '8', mapel: 'IPAS (Ilmu Pengetahuan Alam & Sosial)', fA: '-', fB: '74', fC: '76', desc: 'Inkuiri ilmiah lingkungan hidup, sains dasar, dan keragaman sosial' },
                { no: '9', mapel: 'Bahasa Inggris', fA: '72', fB: '73', fC: '75', desc: 'Percakapan sederhana sehari-hari dan pengenalan kosakata kontekstual' },
                { no: '10', mapel: 'Bahasa Arab', fA: '74', fB: '75', fC: '76', desc: 'Pengucapan mufrodat, hiwar sederhana, dan qiraah teks keislaman' },
                { no: '11', mapel: 'Koding & Literasi AI', fA: '75', fB: '76', fC: '78', desc: 'Logika algoritma visual (Scratch/Blockly) dan pemanfaatan AI etis' },
                { no: '12', mapel: 'Muatan Lokal (B. Jawa & Ke-NU-an)', fA: '75', fB: '75', fC: '77', desc: 'Unggah-ungguh basa krama serta nilai Ahlussunnah wal Jamaah' },
              ].map((r, idx) => (
                <tr key={idx}>
                  <td className="border border-slate-300 p-1.5 text-center font-bold">{r.no}</td>
                  <td className="border border-slate-300 p-1.5 font-bold text-slate-900">{r.mapel}</td>
                  <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-emerald-900">{r.fA}</td>
                  <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-emerald-900">{r.fB}</td>
                  <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-emerald-900">{r.fC}</td>
                  <td className="border border-slate-300 p-1.5 text-slate-700">{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interval Kriteria Nilai */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-[10.5px]">
          <div className="bg-rose-50 border border-rose-200 p-2 rounded">
            <strong className="text-rose-900 block font-bold">0 - 60 (Perlu Bimbingan)</strong>
            <p className="text-slate-600">Belum mencapai tujuan, perlu remedial total</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-2 rounded">
            <strong className="text-amber-900 block font-bold">61 - 74 (Cukup)</strong>
            <p className="text-slate-600">Mencapai sebagian tujuan, remedial pada bagian tertentu</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-2 rounded">
            <strong className="text-blue-900 block font-bold">75 - 85 (Baik)</strong>
            <p className="text-slate-600">Mencapai tujuan secara tuntas sesuai standar</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-2 rounded">
            <strong className="text-emerald-900 block font-bold">86 - 100 (Sangat Baik)</strong>
            <p className="text-slate-600">Melampaui tujuan, diberikan pengayaan & tutor sebaya</p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 5: SK KRITERIA KENAIKAN KELAS DAN KELULUSAN (Hal. 83)
          ========================================================================= */}
      <div
        id="lampiran-5"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 83
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 5
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            SK KRITERIA KENAIKAN KELAS DAN KELULUSAN SISWA
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • SESUAI KMA NOMOR 1503 TAHUN 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11.5px] leading-relaxed">
          <div className="bg-emerald-50/70 border border-emerald-300 p-3.5 rounded-xl space-y-2">
            <h4 className="font-bold text-emerald-950 text-xs uppercase border-b border-emerald-200 pb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              A. Kriteria Kenaikan Kelas (Fase A, B, C)
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-800">
              <li>Menyelesaikan seluruh program pembelajaran dalam dua semester pada tahun ajaran yang bersangkutan.</li>
              <li>Memperoleh nilai sikap dan perilaku minimal <strong>BAIK</strong> (berdasarkan pemantauan karakter Panca Cinta).</li>
              <li>Kehadiran tatap muka minimal <strong>85%</strong> dari total hari efektif belajar madrasah (kecuali izin sakit resmi).</li>
              <li>Menuntaskan target hafalan Tahfidz Al-Qur'an Juz 30 dan praktik ibadah shalat sesuai jenjang kelas.</li>
              <li>Mengikuti seluruh rangkaian kegiatan Projek P5RA minimal 2 projek per tahun.</li>
            </ol>
          </div>

          <div className="bg-amber-50/70 border border-amber-300 p-3.5 rounded-xl space-y-2">
            <h4 className="font-bold text-amber-950 text-xs uppercase border-b border-amber-200 pb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-700" />
              B. Kriteria Kelulusan (Tingkat Akhir Kelas VI)
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-800">
              <li>Menyelesaikan seluruh program pembelajaran dari kelas I sampai dengan kelas VI secara lengkap.</li>
              <li>Memperoleh nilai sikap/perilaku minimal <strong>BAIK</strong> selama menempuh pendidikan di madrasah.</li>
              <li>Mengikuti Asesmen Madrasah (AM) untuk seluruh mata pelajaran yang diujikan.</li>
              <li>Dinyatakan lulus Ujian Praktik Ubudiyah (Shalat Jenazah, Tahlil, Doa Harian) dan Tasmi' Tahfidz Juz 30.</li>
              <li>Kelulusan ditetapkan melalui Rapat Pleno Dewan Guru dan disahkan oleh Kepala Madrasah.</li>
            </ol>
          </div>
        </div>

        <div className="bg-white border border-slate-300 rounded-lg p-3 text-[11px] space-y-1">
          <p className="font-bold text-slate-900">Mekanisme Pengambilan Keputusan:</p>
          <p className="text-justify text-slate-700">
            Penetapan kenaikan kelas dan kelulusan mengedepankan prinsip objektivitas, keadilan, akuntabilitas, dan kasih sayang (humanistik), sehingga tidak ada peserta didik yang ditinggalkan melainkan diberikan intervensi khusus bila memiliki kendala belajar.
          </p>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 6: SK PEMBAGIAN TUGAS GURU & GTK (Hal. 84)
          ========================================================================= */}
      <div
        id="lampiran-6"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 84
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 6
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            SK PEMBAGIAN TUGAS MENGAJAR DAN TUGAS TAMBAHAN GTK
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border border-slate-300 bg-white">
            <thead className="bg-slate-100 font-bold text-slate-900 uppercase">
              <tr>
                <th className="border border-slate-300 p-1.5 w-8 text-center">No</th>
                <th className="border border-slate-300 p-1.5 text-left">Nama Pendidik & NIP</th>
                <th className="border border-slate-300 p-1.5 text-left">Mata Pelajaran Diampu</th>
                <th className="border border-slate-300 p-1.5 w-14 text-center">Kelas</th>
                <th className="border border-slate-300 p-1.5 w-12 text-center">JTM</th>
                <th className="border border-slate-300 p-1.5 text-left">Tugas Tambahan / Ekuivalensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {teachers.length > 0 ? (
                teachers.map((t, idx) => (
                  <tr key={t.id || idx}>
                    <td className="border border-slate-300 p-1.5 text-center font-bold">{idx + 1}</td>
                    <td className="border border-slate-300 p-1.5">
                      <p className="font-bold text-slate-900">{t.nama}</p>
                      <p className="font-mono text-[9px] text-slate-500">NIP. {t.nip}</p>
                    </td>
                    <td className="border border-slate-300 p-1.5 text-slate-800">{t.mataPelajaran || 'Guru Kelas'}</td>
                    <td className="border border-slate-300 p-1.5 text-center font-bold text-emerald-900">{t.rombelBinaan || 'Fase A/B/C'}</td>
                    <td className="border border-slate-300 p-1.5 text-center font-mono font-bold">{t.jamMengajar || 24}</td>
                    <td className="border border-slate-300 p-1.5 text-slate-700">{t.jabatan || 'Wali Kelas / Pembina Ekskul'}</td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td className="border border-slate-300 p-1.5 text-center font-bold">1</td>
                    <td className="border border-slate-300 p-1.5 font-bold">{data.namaKepala}</td>
                    <td className="border border-slate-300 p-1.5">Manajerial & Supervisi</td>
                    <td className="border border-slate-300 p-1.5 text-center">I-VI</td>
                    <td className="border border-slate-300 p-1.5 text-center font-mono">24</td>
                    <td className="border border-slate-300 p-1.5">Kepala Madrasah</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-1.5 text-center font-bold">2</td>
                    <td className="border border-slate-300 p-1.5 font-bold">{data.namaBidangKurikulum}</td>
                    <td className="border border-slate-300 p-1.5">Guru Kelas IV / PAI</td>
                    <td className="border border-slate-300 p-1.5 text-center">IV</td>
                    <td className="border border-slate-300 p-1.5 text-center font-mono">28</td>
                    <td className="border border-slate-300 p-1.5">Waka Kurikulum</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 7: SK PENETAPAN MUATAN LOKAL MADRASAH (Hal. 85)
          ========================================================================= */}
      <div
        id="lampiran-7"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 85
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 7
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            SK PENETAPAN MUATAN LOKAL DAN KODING AI MADRASAH
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="space-y-3 text-[11.5px] leading-relaxed text-justify">
          <p className="indent-8">
            Berdasarkan Peraturan Gubernur Jawa Tengah Nomor 57 Tahun 2013 dan KMA Nomor 1503 Tahun 2025, {data.namaMadrasah} menetapkan 4 (empat) program muatan lokal unggulan berkarakter:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-50 border border-slate-300 p-3 rounded-xl space-y-1">
              <strong className="text-emerald-950 font-bold block text-xs">1. Bahasa Jawa (Unggah-Ungguh Basa)</strong>
              <p className="text-slate-700 text-[11px]">
                Alokasi: 2 JP/minggu (Kelas I s.d. VI). Fokus pada penanaman etika tata krama, tembang macapat, geguritan, dan aksara Jawa.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-300 p-3 rounded-xl space-y-1">
              <strong className="text-emerald-950 font-bold block text-xs">2. Ke-NU-an / Aswaja An-Nahdliyyah</strong>
              <p className="text-slate-700 text-[11px]">
                Alokasi: 2 JP/minggu (Kelas III s.d. VI). Mengenalkan sejarah perjuangan NU, tradisi tahlil, istighotsah, dan sikap wasathiyah (moderat).
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-300 p-3 rounded-xl space-y-1">
              <strong className="text-emerald-950 font-bold block text-xs">3. Baca Tulis Al-Qur'an (BTA) & Tahfidz</strong>
              <p className="text-slate-700 text-[11px]">
                Alokasi: 2 JP/minggu + Pembiasaan Pagi. Target lulusan hafal Juz 30 mutqin dan mahir makharijul huruf dengan metode Yanbu'a/Qiraati.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-300 p-3 rounded-xl space-y-1">
              <strong className="text-emerald-950 font-bold block text-xs">4. Koding Visual & Literasi AI Madrasah</strong>
              <p className="text-slate-700 text-[11px]">
                Alokasi: 2 JP/minggu (Fase B dan C). Melatih logika komputasi anak dengan Scratch for Kids, Blockly, dan etika kecerdasan buatan Islam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 8: SOP MUTASI DAN PERPINDAHAN SISWA (Hal. 86)
          ========================================================================= */}
      <div
        id="lampiran-8"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 86
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 8
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            STANDAR OPERASIONAL PROSEDUR (SOP) MUTASI SISWA
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="space-y-3 text-[11.5px] leading-relaxed">
          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">A. Prosedur Mutasi Masuk (Siswa Pindahan)</h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-700">
              <li>Surat Permohonan Pindah dari Orang Tua/Wali Murid.</li>
              <li>Surat Keterangan Pindah Resmi dari madrasah/sekolah asal (lengkap nomor EMIS/Dapodik).</li>
              <li>Buku Rapor Asli dan fotokopi yang telah dilegalisir kepala madrasah/sekolah asal.</li>
              <li>Fotokopi Akta Kelahiran, Kartu Keluarga, dan KTP Orang Tua/Wali.</li>
              <li>Surat Keterangan Kelakuan Baik / Bebas Masalah dari madrasah/sekolah asal.</li>
              <li>Mengikuti asesmen diagnostik kognitif dan baca Al-Qur'an untuk penempatan kelas yang tepat.</li>
            </ol>
          </div>

          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs">B. Prosedur Mutasi Keluar</h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-700">
              <li>Surat Permohonan Pengunduran Diri/Pindah dari Orang Tua/Wali bermaterai Rp 10.000.</li>
              <li>Surat Keterangan Siap Menerima dari madrasah/sekolah tujuan.</li>
              <li>Penyelesaian seluruh administrasi madrasah dan pengembalian buku pinjaman perpustakaan.</li>
              <li>Penerbitan Surat Keterangan Pindah Resmi (Format Kemenag) dan update status pada sistem EMIS 4.0.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 9: TATA TERTIB & IKRAR DISIPLIN POSITIF (Hal. 87)
          ========================================================================= */}
      <div
        id="lampiran-9"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 87
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 9
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            TATA TERTIB & IKRAR MADRASAH CINTA RAMAH ANAK
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • ZERO BULLYING & DISIPLIN POSITIF
          </p>
        </div>

        <div className="space-y-3 text-[11px] leading-relaxed">
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1 text-center font-serif">
            <p className="font-bold text-emerald-950 text-xs">IKRAR MADRASAH BERBASIS CINTA</p>
            <p className="italic text-emerald-900 text-[11px]">
              "Kami warga {data.namaMadrasah} berikrar: Menjunjung tinggi cinta kepada Allah dan Rasul, menyayangi sesama, menolak segala bentuk perundungan (bullying) dan kekerasan fisik/verbal, serta saling tolong-menolong dalam kebaikan dan takwa."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-slate-300 p-3 rounded-lg bg-white space-y-1">
              <strong className="text-slate-900 font-bold block text-xs">Hak Peserta Didik:</strong>
              <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                <li>Mendapatkan perlakuan kasih sayang tanpa diskriminasi.</li>
                <li>Mendapatkan pengajaran berkualitas, ramah, dan menyenangkan.</li>
                <li>Merasa aman, nyaman, dan terlindungi di lingkungan madrasah.</li>
                <li>Mengembangkan minat bakat di bidang akademik, seni, IT & tahfidz.</li>
              </ul>
            </div>

            <div className="border border-slate-300 p-3 rounded-lg bg-white space-y-1">
              <strong className="text-slate-900 font-bold block text-xs">Kewajiban Peserta Didik:</strong>
              <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                <li>Hadir 15 menit sebelum bel masuk pukul 06.45 WIB.</li>
                <li>Mengikuti shalat dhuha dan tadarus pagi dengan khusyuk.</li>
                <li>Menghormati guru, orang tua, dan menyayangi adik/kakak kelas.</li>
                <li>Menjaga kebersihan madrasah dan membuang sampah pada tempatnya.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 10: JADWAL PELAJARAN MINGGUAN & BLOK P5RA (Hal. 88)
          ========================================================================= */}
      <div
        id="lampiran-10"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 88
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 10
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            JADWAL PELAJARAN MINGGUAN DAN BLOK PROJEK P5RA
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border border-slate-300 bg-white">
            <thead className="bg-emerald-900 text-white font-bold uppercase">
              <tr>
                <th className="border border-slate-300 p-1.5 w-20 text-center">Hari</th>
                <th className="border border-slate-300 p-1.5 w-24 text-center">Waktu (WIB)</th>
                <th className="border border-slate-300 p-1.5 text-left">Kegiatan / Mata Pelajaran Utama</th>
                <th className="border border-slate-300 p-1.5 w-32 text-center">Kategori</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                { hari: 'Senin', waktu: '06.45 - 07.30', keg: 'Upacara Bendera & Pembiasaan Karakter Cinta Tanah Air', kat: 'Pembiasaan' },
                { hari: 'Senin', waktu: '07.30 - 12.00', keg: "Tematik Intrakurikuler (B. Indonesia, MTK, Al-Qur'an Hadis)", kat: 'Intrakurikuler' },
                { hari: 'Selasa', waktu: '06.45 - 07.15', keg: 'Shalat Dhuha Berjamaah & Tadarus Juz 30', kat: 'Mahabbah Ilahiyyah' },
                { hari: 'Selasa', waktu: '07.15 - 12.00', keg: 'Akidah Akhlak, IPAS, Bahasa Arab, Fikih', kat: 'Intrakurikuler' },
                { hari: 'Rabu', waktu: '06.45 - 07.15', keg: 'Literasi Digital & Asmaul Husna Bersama', kat: 'Pembiasaan' },
                { hari: 'Rabu', waktu: '07.15 - 12.00', keg: 'Matematika, Pendidikan Pancasila, Koding Visual & AI', kat: 'Intrakurikuler' },
                { hari: 'Kamis', waktu: '06.45 - 07.15', keg: 'Shalat Dhuha Berjamaah & Mufrodat B. Arab/Inggris', kat: 'Pembiasaan' },
                { hari: 'Kamis', waktu: '07.15 - 12.00', keg: 'SKI, PJOK, Bahasa Jawa (Unggah-Ungguh), Seni Budaya', kat: 'Intrakurikuler' },
                { hari: 'Jumat', waktu: '06.45 - 07.30', keg: "Senam Ceria, Bersih Lingkungan & Shadaqah Subuh", kat: 'Cinta Lingkungan' },
                { hari: 'Jumat', waktu: '07.30 - 10.45', keg: 'Projek P5RA (Tema Gaya Hidup Berkelanjutan & Bhinneka)', kat: 'Kokurikuler (P5RA)' },
                { hari: 'Sabtu', waktu: '06.45 - 07.15', keg: 'Istighotsah Kubro & Tahlil Pagi', kat: 'Mahabbah Ilahiyyah' },
                { hari: 'Sabtu', waktu: '07.15 - 11.30', keg: 'Kegiatan Ekstrakurikuler Wajib Pramuka & Pilihan (Silat/Robotik)', kat: 'Ekstrakurikuler' },
              ].map((j, idx) => (
                <tr key={idx}>
                  <td className="border border-slate-300 p-1.5 text-center font-bold text-slate-900">{j.hari}</td>
                  <td className="border border-slate-300 p-1.5 text-center font-mono">{j.waktu}</td>
                  <td className="border border-slate-300 p-1.5 font-medium">{j.keg}</td>
                  <td className="border border-slate-300 p-1.5 text-center font-semibold text-emerald-800">{j.kat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 11: KALENDER AKADEMIK RESMI MADRASAH (Hal. 89)
          ========================================================================= */}
      <div
        id="lampiran-11"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 89
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 11
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            KALENDER AKADEMIK RESMI MADRASAH TAHUN AJARAN {data.tahunAjaran}
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • KEMENAG KABUPATEN {data.kabupaten.toUpperCase()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10.5px]">
          <div className="border border-slate-300 rounded-lg p-3 bg-white space-y-2">
            <h4 className="font-bold text-emerald-950 uppercase border-b pb-1 text-xs">
              Semester Ganjil ({data.tahunAjaran.substring(0, 4)})
            </h4>
            <ul className="space-y-1 text-slate-700">
              <li>• <strong>15 - 17 Juli 2026:</strong> Masa Ta'aruf Siswa Madrasah (Matsama)</li>
              <li>• <strong>18 Juli 2026:</strong> Hari Pertama Efektif Belajar Semester Ganjil</li>
              <li>• <strong>17 Agustus 2026:</strong> Upacara HUT Kemerdekaan RI Ke-81</li>
              <li>• <strong>21 - 26 September 2026:</strong> Penilaian Sumatif Tengah Semester (PSTS)</li>
              <li>• <strong>22 Oktober 2026:</strong> Peringatan Hari Santri Nasional (HSN)</li>
              <li>• <strong>25 Nov 2026:</strong> Peringatan Hari Guru Nasional (HGN)</li>
              <li>• <strong>01 - 10 Des 2026:</strong> Penilaian Sumatif Akhir Semester (PSAS)</li>
              <li>• <strong>19 Desember 2026:</strong> Pembagian Rapor Semester Ganjil (RDM)</li>
              <li>• <strong>21 - 31 Des 2026:</strong> Libur Akhir Semester Ganjil</li>
            </ul>
          </div>

          <div className="border border-slate-300 rounded-lg p-3 bg-white space-y-2">
            <h4 className="font-bold text-emerald-950 uppercase border-b pb-1 text-xs">
              Semester Genap ({data.tahunAjaran.substring(5, 9)})
            </h4>
            <ul className="space-y-1 text-slate-700">
              <li>• <strong>04 Januari 2027:</strong> Hari Pertama Efektif Semester Genap</li>
              <li>• <strong>03 Januari 2027:</strong> Peringatan Hari Amal Bakti (HAB) Kemenag RI</li>
              <li>• <strong>15 - 20 Maret 2027:</strong> Penilaian Sumatif Tengah Semester Genap</li>
              <li>• <strong>10 - 24 April 2027:</strong> Asesmen Madrasah (AM) Utama Kelas VI</li>
              <li>• <strong>02 Mei 2027:</strong> Peringatan Hari Pendidikan Nasional (Hardiknas)</li>
              <li>• <strong>01 - 09 Juni 2027:</strong> Penilaian Sumatif Akhir Tahun (PSAT)</li>
              <li>• <strong>19 Juni 2027:</strong> Pembagian Rapor Kenaikan Kelas & Ijazah</li>
              <li>• <strong>21 Juni - 10 Juli 2027:</strong> Libur Akhir Tahun Ajaran</li>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 12: BERITA ACARA & NOTULEN RAPAT PLENO PENYUSUNAN KURIKULUM (Hal. 90)
          ========================================================================= */}
      <div
        id="lampiran-12"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 90
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 12
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            BERITA ACARA RAPAT PLENO PENYUSUNAN KURIKULUM MADRASAH
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="space-y-3 text-[11.5px] leading-relaxed text-justify">
          <p className="indent-8">
            Pada hari ini <strong>Sabtu</strong> tanggal <strong>Dua Puluh Lima</strong> bulan <strong>Juli</strong> tahun <strong>Dua Ribu Dua Puluh Enam</strong>, bertempat di Aula Pertemuan {data.namaMadrasah}, telah diselenggarakan Rapat Pleno Penetapan dan Pengesahan Kurikulum Berbasis Cinta (KMA 1503 Tahun 2025) yang dihadiri oleh Pengawas Pembina, Kepala Madrasah, Komite Madrasah, serta segenap Dewan Guru dan Tenaga Kependidikan.
          </p>

          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 space-y-1">
            <p className="font-bold text-slate-900">Hasil Keputusan Rapat Pleno:</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-800 text-[11px]">
              <li>Menyetujui secara bulat naskah dokumen Kurikulum {data.namaMadrasah} Tahun Ajaran {data.tahunAjaran}.</li>
              <li>Menetapkan penerapan pendekatan Deep Learning (Mindful, Meaningful, Joyful) serta 5 pilar Panca Cinta pada seluruh kelas.</li>
              <li>Mengintegrasikan literasi digital koding dan kecerdasan buatan (AI) etis sebagai muatan keunggulan madrasah.</li>
              <li>Mengajukan permohonan pengesahan naskah kurikulum kepada Kepala Kantor Kementerian Agama Kabupaten {data.kabupaten}.</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-between items-end pt-4 text-xs">
          <div className="text-center w-56 space-y-1">
            <p className="font-bold text-slate-900">Ketua Komite Madrasah,</p>
            <div className="h-12 flex items-center justify-center font-serif text-emerald-800 italic text-xs">
              (Tanda Tangan Sah)
            </div>
            <p className="font-bold underline text-slate-900">{data.namaKetuaKomite}</p>
          </div>

          <div className="text-center w-56 space-y-1">
            <p className="font-bold text-slate-900">Kepala Madrasah,</p>
            <div className="h-12 flex items-center justify-center font-serif text-emerald-800 italic text-xs">
              (Tanda Tangan & Cap Sah)
            </div>
            <p className="font-bold underline text-slate-900">{data.namaKepala}</p>
            <p className="font-mono text-[10px] text-slate-600">NIP. {data.nipKepala}</p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 13: MATRIKS ANALISIS HARI & MINGGU EFEKTIF (Hal. 91)
          ========================================================================= */}
      <div
        id="lampiran-13"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 91
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 13
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            MATRIKS ANALISIS HARI DAN MINGGU EFEKTIF BELAJAR
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[10.5px]">
          <div>
            <h4 className="font-bold text-emerald-950 mb-1.5 uppercase text-xs">
              Semester Ganjil ({data.tahunAjaran.substring(0, 4)})
            </h4>
            <table className="w-full border border-slate-300 bg-white">
              <thead className="bg-slate-100 font-bold">
                <tr>
                  <th className="border border-slate-300 p-1 text-left">Bulan</th>
                  <th className="border border-slate-300 p-1 text-center">Minggu</th>
                  <th className="border border-slate-300 p-1 text-center">Hari Efektif</th>
                  <th className="border border-slate-300 p-1 text-center">Hari Libur</th>
                </tr>
              </thead>
              <tbody>
                {data.hariEfektifSem1.map((g, idx) => (
                  <tr key={idx}>
                    <td className="border border-slate-300 p-1">{g.bulan}</td>
                    <td className="border border-slate-300 p-1 text-center font-mono">{g.minggu}</td>
                    <td className="border border-slate-300 p-1 text-center font-mono font-bold text-emerald-900">{g.hariEfektif}</td>
                    <td className="border border-slate-300 p-1 text-center font-mono text-slate-600">{g.hariNonEfektif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h4 className="font-bold text-emerald-950 mb-1.5 uppercase text-xs">
              Semester Genap ({data.tahunAjaran.substring(5, 9)})
            </h4>
            <table className="w-full border border-slate-300 bg-white">
              <thead className="bg-slate-100 font-bold">
                <tr>
                  <th className="border border-slate-300 p-1 text-left">Bulan</th>
                  <th className="border border-slate-300 p-1 text-center">Minggu</th>
                  <th className="border border-slate-300 p-1 text-center">Hari Efektif</th>
                  <th className="border border-slate-300 p-1 text-center">Hari Libur</th>
                </tr>
              </thead>
              <tbody>
                {data.hariEfektifSem2.map((g, idx) => (
                  <tr key={idx}>
                    <td className="border border-slate-300 p-1">{g.bulan}</td>
                    <td className="border border-slate-300 p-1 text-center font-mono">{g.minggu}</td>
                    <td className="border border-slate-300 p-1 text-center font-mono font-bold text-emerald-900">{g.hariEfektif}</td>
                    <td className="border border-slate-300 p-1 text-center font-mono text-slate-600">{g.hariNonEfektif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 14: CONTOH MODUL AJAR DEEP LEARNING BERBASIS CINTA (Hal. 92)
          ========================================================================= */}
      <div
        id="lampiran-14"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 92
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 14
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            CONTOH MODUL AJAR DEEP LEARNING & KURIKULUM BERBASIS CINTA
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • MATA PELAJARAN IPAS / PAI (FASE B KELAS IV)
          </p>
        </div>

        <div className="space-y-3 text-[11px] leading-relaxed">
          {/* Identitas Modul */}
          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 space-y-1">
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-3 font-semibold text-slate-700">Mata Pelajaran / Fase</span>
              <span className="col-span-9 font-bold">: IPAS / Fase B (Kelas IV Semester Ganjil)</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-3 font-semibold text-slate-700">Topik / Alokasi Waktu</span>
              <span className="col-span-9 font-bold">: Harmoni Ekosistem & Cinta Lingkungan / 2 JP (2 x 35 Menit)</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-3 font-semibold text-slate-700">Pilar Panca Cinta</span>
              <span className="col-span-9 font-bold text-emerald-900">: Cinta Lingkungan Hidup & Cinta Allah Sang Pencipta</span>
            </div>
          </div>

          {/* 3 Tahap Deep Learning */}
          <div className="space-y-2">
            <div className="border border-emerald-300 bg-emerald-50/50 p-2.5 rounded-lg space-y-1">
              <h5 className="font-bold text-emerald-950 uppercase text-[11.5px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                1. Mindful Learning (Sadar & Hadir Utuh - 15 Menit)
              </h5>
              <p className="text-justify text-slate-800">
                Guru mengajak peserta didik hening sejenak (Mindful Breathing), bersyukur atas udara bersih yang dihirup ciptaan Allah SWT, lalu mengamati tanaman di halaman madrasah dengan penuh ketenangan.
              </p>
            </div>

            <div className="border border-blue-300 bg-blue-50/50 p-2.5 rounded-lg space-y-1">
              <h5 className="font-bold text-blue-950 uppercase text-[11.5px] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                2. Meaningful Learning (Bermakna & Relevan - 40 Menit)
              </h5>
              <p className="text-justify text-slate-800">
                Peserta didik berdiskusi kelompok mengidentifikasi rantai makanan dan dampak perusakan hutan/sampah plastik terhadap kelangsungan makhluk hidup, menghubungkannya dengan firman Allah (QS. Ar-Rum: 41).
              </p>
            </div>

            <div className="border border-amber-300 bg-amber-50/50 p-2.5 rounded-lg space-y-1">
              <h5 className="font-bold text-amber-950 uppercase text-[11.5px] flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-700" />
                3. Joyful Learning (Menggembirakan & Bermakna Kasih - 15 Menit)
              </h5>
              <p className="text-justify text-slate-800">
                Peserta didik membuat komitmen aksi nyata "Satu Siswa Satu Tanaman" dan memilah sampah botol plastik untuk didaur ulang menjadi pot hidroponik dengan penuh keceriaan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN 15: DOKUMENTASI FOTO LOKAKARYA & SOSIALISASI (Hal. 93)
          ========================================================================= */}
      <div
        id="lampiran-15"
        className="space-y-4 pt-8 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0"
      >
        <div className="text-right text-[11px] font-mono text-slate-500 print:text-slate-800">
          Hal. 93
        </div>

        <div className="text-center space-y-1 mb-2">
          <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold uppercase">
            LAMPIRAN 15
          </span>
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-900 underline font-serif">
            DOKUMENTASI FOTO KEGIATAN PENYUSUNAN DAN SOSIALISASI KURIKULUM
          </h2>
          <p className="text-xs font-bold text-slate-800 uppercase">
            {data.namaMadrasah} • TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
          <div className="border border-slate-300 rounded-xl p-3 bg-white space-y-2">
            <div className="h-32 bg-slate-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-slate-300 text-slate-400">
              <Camera className="w-8 h-8 mb-1 text-slate-400" />
              <span className="font-semibold text-[10.5px]">Foto Rapat Pleno TPKM Bersama Pengawas</span>
            </div>
            <p className="text-center font-bold text-slate-800">
              Dokumentasi 1: Rapat Pleno Penyusunan Kurikulum KMA 1503/2025
            </p>
          </div>

          <div className="border border-slate-300 rounded-xl p-3 bg-white space-y-2">
            <div className="h-32 bg-slate-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-slate-300 text-slate-400">
              <Users className="w-8 h-8 mb-1 text-slate-400" />
              <span className="font-semibold text-[10.5px]">Foto Sosialisasi Kurikulum kepada Komite & Wali Murid</span>
            </div>
            <p className="text-center font-bold text-slate-800">
              Dokumentasi 2: Sosialisasi Pilar Panca Cinta & Program Unggulan Madrasah
            </p>
          </div>

          <div className="border border-slate-300 rounded-xl p-3 bg-white space-y-2">
            <div className="h-32 bg-slate-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-slate-300 text-slate-400">
              <Sparkles className="w-8 h-8 mb-1 text-slate-400" />
              <span className="font-semibold text-[10.5px]">Foto Workshop Penyusunan Modul Ajar Deep Learning Guru</span>
            </div>
            <p className="text-center font-bold text-slate-800">
              Dokumentasi 3: In-House Training (IHT) Pengembangan Modul Ajar
            </p>
          </div>

          <div className="border border-slate-300 rounded-xl p-3 bg-white space-y-2">
            <div className="h-32 bg-slate-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-slate-300 text-slate-400">
              <ShieldCheck className="w-8 h-8 mb-1 text-slate-400" />
              <span className="font-semibold text-[10.5px]">Foto Penandatanganan Berita Acara & Rekomendasi Pengawas</span>
            </div>
            <p className="text-center font-bold text-slate-800">
              Dokumentasi 4: Penandatanganan Pengesahan Dokumen Resmi Kemenag
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 font-mono">
          --- AKHIR DOKUMEN UTAMA & LAMPIRAN RESMI KURIKULUM BERBASIS CINTA KMA 1503 TAHUN 2025 ---
        </div>
      </div>
    </div>
  );
};
