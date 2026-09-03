import React from 'react';
import { KomPageContainer } from './KomPageContainer';
import { KomCintaData } from '../../../data/komCintaDefaultData';

interface Props {
  data: KomCintaData;
}

export const KomBab3Pages: React.FC<Props> = ({ data }) => {
  return (
    <>
      {/* =========================================================================
          PAGE 25 (Hal. 17) - BAB III PENGORGANISASIAN & INTRAKURIKULER (FASE A, B, C)
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-bab3" pageNumber="17" pageIndex={25}>
        <div className="text-center pb-3 border-b border-slate-300">
          <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
            BAB III<br />PENGORGANISASIAN PEMBELAJARAN
          </h2>
        </div>

        <div className="pt-3 space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            A. Intrakurikuler
          </h3>
          <p className="indent-8 text-[11.5px]">
            Kegiatan intrakurikuler di {data.namaMadrasah} dirancang untuk memberikan pengalaman belajar yang bermakna, kontekstual, dan berpusat pada peserta didik. Pembelajaran mengintegrasikan muatan kurikulum nasional dengan kekhasan madrasah, muatan lokal bahasa jawa, penguatan literasi dan numerasi, serta penanaman nilai-nilai keislaman Ahlussunnah wal Jama'ah An-Nahdliyyah.
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              1. Struktur Kurikulum
            </h4>
            <p className="text-[11.5px]">
              Struktur kurikulum madrasah ibtidaiyah terbagi ke dalam 3 (tiga) fase perkembangan peserta didik:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-800 text-[11px]">
              <li>
                <strong>Fase A (Kelas I dan II):</strong> Fokus utama pembelajaran adalah penyesuaian diri dari jenjang RA/TK ke pendidikan dasar, pembiasaan adab, penanaman aqidah dasar, penguasaan literasi membaca dan menulis permulaan, serta pengenalan konsep bilangan konkret.
              </li>
              <li>
                <strong>Fase B (Kelas III dan IV):</strong> Pembelajaran diarahkan pada penguatan kompetensi literasi, numerasi tingkat lanjut, pemahaman konsep dasar ilmu pengetahuan alam dan sosial (IPAS), penguasaan ibadah praktis (shalat fardhu), dan pengembangan nalar kritis.
              </li>
              <li>
                <strong>Fase C (Kelas V dan VI):</strong> Peserta didik dilatih untuk berpikir abstrak, melakukan pemecahan masalah (problem solving), penelitian sederhana berbasis lingkungan, serta pembekalan kemandirian dan kepemimpinan menjelang masa pubertas dan transisi ke jenjang lanjutan.
              </li>
            </ul>
            <p className="text-[11px] text-slate-700 italic pt-1">
              Pengorganisasian pembelajaran intrakurikuler dijabarkan ke dalam alokasi waktu tahunan yang mencakup jam tatap muka intrakurikuler dan kokurikuler (P5-RA) sebagaimana disajikan pada tabel struktur kurikulum pada halaman berikutnya.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 26 (Hal. 18) - TABEL 3.1 STRUKTUR KURIKULUM & KETERANGAN LENGKAP (a - g)
          ========================================================================= */}
      <KomPageContainer pageNumber="18" pageIndex={26}>
        <div className="space-y-2 text-[12px] leading-relaxed">
          <p className="font-bold text-slate-950 text-[11px]">
            Tabel 3.1. Struktur Kurikulum {data.namaMadrasah} Tahun Pelajaran {data.tahunAjaran}
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[9.5px] print:break-inside-avoid">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-6 text-center" rowSpan={2}>No</th>
                <th className="border border-slate-400 p-1 text-left" rowSpan={2}>Mata Pelajaran</th>
                <th className="border border-slate-400 p-0.5 text-center" colSpan={2}>Kelas I</th>
                <th className="border border-slate-400 p-0.5 text-center" colSpan={2}>Kelas II</th>
                <th className="border border-slate-400 p-0.5 text-center" colSpan={2}>Kelas III-V</th>
                <th className="border border-slate-400 p-0.5 text-center" colSpan={2}>Kelas VI</th>
              </tr>
              <tr className="bg-slate-50">
                <th className="border border-slate-400 p-0.5 text-center w-7">Intra</th>
                <th className="border border-slate-400 p-0.5 text-center w-7">P5</th>
                <th className="border border-slate-400 p-0.5 text-center w-7">Intra</th>
                <th className="border border-slate-400 p-0.5 text-center w-7">P5</th>
                <th className="border border-slate-400 p-0.5 text-center w-7">Intra</th>
                <th className="border border-slate-400 p-0.5 text-center w-7">P5</th>
                <th className="border border-slate-400 p-0.5 text-center w-7">Intra</th>
                <th className="border border-slate-400 p-0.5 text-center w-7">P5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">1</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Al-Qur'an Hadis</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">64</td><td className="border border-slate-400 p-0.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">2</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Akidah Akhlak</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">64</td><td className="border border-slate-400 p-0.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">3</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Fikih</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">64</td><td className="border border-slate-400 p-0.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">4</td>
                <td className="border border-slate-400 p-0.5 font-semibold">SKI</td>
                <td className="border border-slate-400 p-0.5 text-center">-</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">-</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">64</td><td className="border border-slate-400 p-0.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">5</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Bahasa Arab</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">64</td><td className="border border-slate-400 p-0.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">6</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Pendidikan Pancasila</td>
                <td className="border border-slate-400 p-0.5 text-center">144</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">144</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">144</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">128</td><td className="border border-slate-400 p-0.5 text-center">32</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">7</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Bahasa Indonesia</td>
                <td className="border border-slate-400 p-0.5 text-center">216</td><td className="border border-slate-400 p-0.5 text-center">72</td>
                <td className="border border-slate-400 p-0.5 text-center">252</td><td className="border border-slate-400 p-0.5 text-center">72</td>
                <td className="border border-slate-400 p-0.5 text-center">216</td><td className="border border-slate-400 p-0.5 text-center">72</td>
                <td className="border border-slate-400 p-0.5 text-center">192</td><td className="border border-slate-400 p-0.5 text-center">64</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">8</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Matematika</td>
                <td className="border border-slate-400 p-0.5 text-center">144</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">180</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">180</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">160</td><td className="border border-slate-400 p-0.5 text-center">32</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">9</td>
                <td className="border border-slate-400 p-0.5 font-semibold">IPAS</td>
                <td className="border border-slate-400 p-0.5 text-center">-</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">-</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">180</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">160</td><td className="border border-slate-400 p-0.5 text-center">32</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">10</td>
                <td className="border border-slate-400 p-0.5 font-semibold">PJOK</td>
                <td className="border border-slate-400 p-0.5 text-center">108</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">108</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">108</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">96</td><td className="border border-slate-400 p-0.5 text-center">32</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">11</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Seni dan Budaya (Pilihan)</td>
                <td className="border border-slate-400 p-0.5 text-center">108</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">108</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">108</td><td className="border border-slate-400 p-0.5 text-center">36</td>
                <td className="border border-slate-400 p-0.5 text-center">96</td><td className="border border-slate-400 p-0.5 text-center">32</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">12</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Bahasa Inggris (Pilihan)</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">64</td><td className="border border-slate-400 p-0.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">13</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Muatan Lokal (Bahasa Jawa)</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">64</td><td className="border border-slate-400 p-0.5 text-center">-</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-0.5 text-center">14</td>
                <td className="border border-slate-400 p-0.5 font-semibold">Ke-NU-an / Aswaja</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">72</td><td className="border border-slate-400 p-0.5 text-center">-</td>
                <td className="border border-slate-400 p-0.5 text-center">64</td><td className="border border-slate-400 p-0.5 text-center">-</td>
              </tr>
              <tr className="bg-slate-100 font-bold">
                <td className="border border-slate-400 p-1 text-center" colSpan={2}>TOTAL PER TAHUN</td>
                <td className="border border-slate-400 p-1 text-center">1152</td><td className="border border-slate-400 p-1 text-center">216</td>
                <td className="border border-slate-400 p-1 text-center">1224</td><td className="border border-slate-400 p-1 text-center">216</td>
                <td className="border border-slate-400 p-1 text-center">1440</td><td className="border border-slate-400 p-1 text-center">252</td>
                <td className="border border-slate-400 p-1 text-center">1280</td><td className="border border-slate-400 p-1 text-center">224</td>
              </tr>
            </tbody>
          </table>

          <div className="text-[10px] leading-tight space-y-0.5 text-slate-800 pt-1">
            <p className="font-semibold text-slate-900">Keterangan Tabel 3.1:</p>
            <p><strong>a.</strong> Pembelajaran PAI terbagi 4 mata pelajaran: Al-Qur'an Hadis, Akidah Akhlak, Fikih, dan SKI (mulai kelas III).</p>
            <p><strong>b.</strong> Bahasa Arab diajarkan sejak kelas I dengan penekanan pada mufradat dasar dan percakapan santun harian.</p>
            <p><strong>c.</strong> Alokasi proyek P5-RA diambil 20-30% dari total alokasi jam tatap muka pertahun untuk penguatan karakter santri.</p>
            <p><strong>d.</strong> Bahasa Indonesia difokuskan pada penguasaan menyimak, berbicara, membaca nyaring, dan menulis karangan.</p>
            <p><strong>e.</strong> Matematika mengedepankan nalar kontekstual, kemampuan numerasi terapan, dan pemecahan masalah konkret.</p>
            <p><strong>f.</strong> Muatan lokal Bahasa Jawa melestarikan unggah-ungguh krama alus, sastra, dan tembang dolanan anak.</p>
            <p><strong>g.</strong> Mata pelajaran Ke-NU-an / Aswaja menanamkan akidah Islam Ahlussunnah wal Jama'ah An-Nahdliyyah.</p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 27 (Hal. 19) - TABEL 3.2 SENI, PRINSIP KBC LENGKAP & STRATEGI DEEP LEARNING
          ========================================================================= */}
      <KomPageContainer pageNumber="19" pageIndex={27}>
        <div className="space-y-2.5 text-[11.5px] leading-relaxed text-justify">
          <div>
            <p className="font-bold text-[11px] text-slate-900 pb-1">
              Tabel 3.2. Asesmen Awal Pemilihan Mata Pelajaran Seni dan Budaya
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[10px] print:break-inside-avoid">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-8 text-center">No</th>
                  <th className="border border-slate-400 p-1 text-left">Pilihan Seni</th>
                  <th className="border border-slate-400 p-1 text-center w-24">Kesiapan Guru</th>
                  <th className="border border-slate-400 p-1 text-center w-24">Minat Siswa</th>
                  <th className="border border-slate-400 p-1 text-center w-28">Keputusan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                  <td className="border border-slate-400 p-1 font-semibold">Seni Rupa</td>
                  <td className="border border-slate-400 p-1 text-center">Sangat Siap</td>
                  <td className="border border-slate-400 p-1 text-center">Tinggi (85%)</td>
                  <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Dipilih (Utama)</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">2</td>
                  <td className="border border-slate-400 p-1 font-semibold">Seni Musik</td>
                  <td className="border border-slate-400 p-1 text-center">Siap</td>
                  <td className="border border-slate-400 p-1 text-center">Sedang (65%)</td>
                  <td className="border border-slate-400 p-1 text-center">Pilihan Ekstra</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">3</td>
                  <td className="border border-slate-400 p-1 font-semibold">Seni Tari</td>
                  <td className="border border-slate-400 p-1 text-center">Cukup Siap</td>
                  <td className="border border-slate-400 p-1 text-center">Sedang (50%)</td>
                  <td className="border border-slate-400 p-1 text-center">Pilihan Ekstra</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="indent-8 text-[11px] text-slate-800">
            {data.namaMadrasah} merupakan madrasah reguler yang senantiasa terbuka menerima dan melayani kebutuhan seluruh peserta didik termasuk layanan akomodasi peserta didik berkebutuhan khusus (PDBK) dengan pendekatan individual yang penuh kasih sayang.
          </p>

          <div className="space-y-1 pt-0.5">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12px]">
              2. Prinsip Kurikulum Berbasis Cinta dalam Pembelajaran Intrakurikuler
            </h4>
            <ol className="list-alpha pl-5 space-y-1 text-slate-800 text-[11px]">
              <li>
                <strong>Kasih Sayang dan Keberterimaan:</strong> Guru memandang setiap murid sebagai amanah suci dari Allah Swt. yang memiliki keunikan potensi, bakat, dan kecepatan belajar yang berbeda-beda tanpa penghakiman.
              </li>
              <li>
                <strong>Keselamatan Fisik dan Emosional:</strong> Menghadirkan ruang kelas yang bebas dari ancaman hukuman fisik, cemoohan verbal, diskriminasi, maupun perundungan antar-teman.
              </li>
              <li>
                <strong>Kolaborasi Tanpa Diskriminasi:</strong> Membiasakan kerja sama tim yang rukun, saling menolong, menghargai perbedaan latar belakang keluarga, dan mengikis egoisme pribadi.
              </li>
              <li>
                <strong>Keadilan dan Empati:</strong> Pendidik berlaku adil dalam memberikan perhatian, umpan balik yang membangun, serta mendengarkan aspirasi dan kegelisahan siswa dengan hati terbuka.
              </li>
            </ol>
          </div>

          <div className="space-y-1 pt-0.5">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12px]">
              3. Implementasi Strategi Deep Learning (Pembelajaran Mendalam)
            </h4>
            <p className="text-[11px]">
              Pembelajaran mendalam (<em>Deep Learning</em>) di {data.namaMadrasah} berpijak pada 3 pilar utama:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-800 text-[10.5px]">
              <li><strong>Mindful Learning (Berkesadaran):</strong> Siswa diajak menyadari tujuan belajarnya, fokus pada apa yang dipelajari, dan menghayati proses tanpa terburu-buru.</li>
              <li><strong>Meaningful Learning (Bermakna):</strong> Mengaitkan setiap materi dengan kehidupan nyata, konteks ibadah harian, dan pemecahan masalah lingkungan santri.</li>
              <li><strong>Joyful Learning (Menyenangkan):</strong> Menciptakan kegembiraan belajar melalui eksplorasi, eksperimen sains sederhana, permainan edukatif, dan apresiasi positif.</li>
            </ul>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 28 (Hal. 20) - CONTOH MAPEL, MULOK, & IMPLEMENTASI 8 PROFIL (a - d)
          ========================================================================= */}
      <KomPageContainer pageNumber="20" pageIndex={28}>
        <div className="space-y-3 text-[11.5px] leading-relaxed text-justify">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12px]">
              4. Contoh Penerapan pada Beberapa Mata Pelajaran
            </h4>
            <p className="text-[11px] indent-8">
              Dalam mata pelajaran Fikih wudhu, siswa tidak sekadar menghafal rukun wudhu melainkan diajak praktik kesadaran air bersih, hemat energi, dan refleksi mensucikan hati dari rasa benci. Pada mata pelajaran Matematika, siswa menggunakan konsep pecahan untuk menghitung sedekah dan pembagian makanan secara adil kepada kaum duafa di lingkungan sekitar madrasah.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12px]">
              5. Muatan Lokal dan Cinta Budaya Lokal
            </h4>
            <p className="text-[11px] indent-8">
              Penanaman budi pekerti luhur dilaksanakan melalui pembiasaan basa krama alus kepada orang tua dan guru, tembang macapat dolanan anak, serta pementasan kesenian rebana hadroh santri yang sarat makna shalawat.
            </p>
          </div>

          <div className="space-y-1 pt-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12px]">
              6. Implementasi 8 Profil Lulusan dalam Kegiatan Intrakurikuler
            </h4>
            <p className="text-[11px]">
              Delapan profil lulusan diintegrasikan dalam materi dan pembiasaan kelas sehari-hari:
            </p>
            <ul className="list-none space-y-1.5 text-slate-800 text-[11px]">
              <li>
                <strong>a. Keimanan dan Ketakwaan:</strong> Pembiasaan doa sebelum dan sesudah belajar, zikir asmaul husna, dan tadarus Al-Qur'an tartil setiap pagi.
              </li>
              <li>
                <strong>b. Kewargaan:</strong> Memupuk rasa cinta tanah air Indonesia, menghormati bendera merah putih, dan menjaga persatuan bangsa dalam bingkai kebhinekaan.
              </li>
              <li>
                <strong>c. Penalaran Kritis:</strong> Mendorong siswa bertanya hal-hal esensial, memverifikasi kebenaran informasi, serta mampu memberikan alasan yang logis.
              </li>
              <li>
                <strong>d. Kreativitas:</strong> Menghasilkan karya orisinal berupa gambar, kaligrafi, puisi santri, kerajinan bahan daur ulang, dan ide kreatif di kelas.
              </li>
            </ul>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 29 (Hal. 21) - IMPLEMENTASI 8 PROFIL (e - h) & GAMBAR 3.1 INFOGRAFIS
          ========================================================================= */}
      <KomPageContainer pageNumber="21" pageIndex={29}>
        <div className="space-y-3 text-[11.5px] leading-relaxed text-justify">
          <ul className="list-none space-y-2 text-slate-800 text-[11px]">
            <li>
              <strong>e. Kolaborasi:</strong> Membiasakan kerja kelompok, menghargai pembagian tugas, mendengarkan saran kawan, dan mufakat bersama secara santun.
            </li>
            <li>
              <strong>f. Kemandirian:</strong> Melatih siswa menyiapkan perlengkapan belajar sendiri, bertanggung jawab atas tugas, dan percaya diri tampil di depan publik.
            </li>
            <li>
              <strong>g. Kesehatan:</strong> Membiasakan makan bekal bergizi seimbang, gemar berolahraga, mencuci tangan pakai sabun, dan menjaga sanitasi lingkungan kelas.
            </li>
            <li>
              <strong>h. Komunikasi:</strong> Mampu menyampaikan gagasan dengan tutur kata yang santun, jelas, dan menyimak pembicaraan orang lain dengan penuh hormat.
            </li>
          </ul>

          <div className="text-center pt-2">
            <div className="border border-slate-300 rounded-lg p-3 bg-slate-50 flex flex-col items-center justify-center">
              <div className="w-full max-w-md bg-white border border-emerald-400 rounded-lg p-2.5 shadow-sm">
                <p className="font-bold text-emerald-950 text-[11px] uppercase mb-1.5">
                  DELAPAN DIMENSI PROFIL LULUSAN MADRASAH
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[9.5px] text-slate-800">
                  <span className="p-1 bg-emerald-50 border border-emerald-200 rounded font-semibold">1. Keimanan</span>
                  <span className="p-1 bg-blue-50 border border-blue-200 rounded font-semibold">2. Kewargaan</span>
                  <span className="p-1 bg-amber-50 border border-amber-200 rounded font-semibold">3. Nalar Kritis</span>
                  <span className="p-1 bg-purple-50 border border-purple-200 rounded font-semibold">4. Kreativitas</span>
                  <span className="p-1 bg-rose-50 border border-rose-200 rounded font-semibold">5. Kolaborasi</span>
                  <span className="p-1 bg-teal-50 border border-teal-200 rounded font-semibold">6. Kemandirian</span>
                  <span className="p-1 bg-indigo-50 border border-indigo-200 rounded font-semibold">7. Kesehatan</span>
                  <span className="p-1 bg-cyan-50 border border-cyan-200 rounded font-semibold">8. Komunikasi</span>
                </div>
              </div>
            </div>
            <p className="font-bold text-slate-800 text-[10.5px] pt-1">
              Gambar 3.1 Delapan Dimensi Profil Lulusan {data.namaMadrasah}
            </p>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-[10.5px] text-slate-700 italic">
            "Delapan dimensi profil lulusan ini menjadi kompas utama pendidik di {data.namaMadrasah} dalam menyusun modul ajar, merancang proyek tematik, serta melaksanakan asesmen autentik harian."
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 30 (Hal. 22) - TABEL 3.3 DELAPAN DIMENSI PROFIL LULUSAN LENGKAP
          ========================================================================= */}
      <KomPageContainer pageNumber="22" pageIndex={30}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <p className="font-bold text-[11.5px] text-slate-900">
            Tabel 3.3. Delapan Dimensi Profil Lulusan {data.namaMadrasah}
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px] print:break-inside-avoid">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1.5 w-8 text-center">No</th>
                <th className="border border-slate-400 p-1.5 w-36 text-left">Dimensi Profil</th>
                <th className="border border-slate-400 p-1.5 text-left">Penjelasan & Karakter yang Dibangun</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">1</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Keimanan dan Ketakwaan</td>
                <td className="border border-slate-400 p-1.5">Mengenal sifat-sifat Allah Swt., melaksanakan ibadah shalat dan puasa, berakhlak mulia kepada sesama makhluk ciptaan-Nya.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">2</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Kewargaan</td>
                <td className="border border-slate-400 p-1.5">Memahami hak dan kewajiban sebagai warga negara Indonesia yang taat hukum, cinta tanah air, dan toleran terhadap keberagaman suku/agama.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">3</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Penalaran Kritis</td>
                <td className="border border-slate-400 p-1.5">Mampu memproses informasi, mengidentifikasi akar permasalahan lingkungan, dan mengambil keputusan berdasarkan bukti yang valid.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">4</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Kreativitas</td>
                <td className="border border-slate-400 p-1.5">Menghasilkan gagasan dan karya orisinal yang bermakna, berani mencoba hal baru, serta mampu memodifikasi karya yang sudah ada.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">5</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Kolaborasi</td>
                <td className="border border-slate-400 p-1.5">Bekerjasama secara sukarela demi mencapai tujuan bersama, saling mengisi kekurangan, dan berbagi beban secara proporsional.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">6</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Kemandirian</td>
                <td className="border border-slate-400 p-1.5">Memiliki regulasi diri, motivasi intrinsik untuk belajar, bertanggung jawab atas perbuatannya, dan tidak mudah menyerah saat menghadapi kesulitan.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">7</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Kesehatan</td>
                <td className="border border-slate-400 p-1.5">Menjaga kebugaran jasmani, mengonsumsi makanan halal-thayyib, mengelola emosi secara stabil, dan menjaga kesehatan lingkungan sekitar.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">8</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Komunikasi</td>
                <td className="border border-slate-400 p-1.5">Mengekspresikan pikiran dan perasaan secara santun, menyimak pembicaraan orang lain secara empatik, serta menggunakan bahasa yang efektif.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 31 (Hal. 23) - KOKURIKULER (P5-RA) PENGERTIAN, URGENSI & TUJUAN
          ========================================================================= */}
      <KomPageContainer pageNumber="23" pageIndex={31}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            B. Kokurikuler (Penguatan Profil Pelajar Pancasila dan Profil Pelajar Rahmatan lil 'Alamin)
          </h3>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              1. Pengertian Kokurikuler
            </h4>
            <p className="indent-8 text-[11.5px]">
              Kegiatan kokurikuler merupakan pembelajaran lintas disiplin ilmu yang dirancang untuk mengamati, mengeksplorasi, dan mencari solusi terhadap persoalan di lingkungan sekitar madrasah. Melalui Projek Penguatan Profil Pelajar Pancasila dan Rahmatan lil 'Alamin (P5-RA), peserta didik mempraktikkan langsung nilai-nilai luhur Pancasila dan Islam moderat dalam aksi nyata.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              2. Pentingnya Kokurikuler
            </h4>
            <p className="indent-8 text-[11.5px]">
              Kokurikuler memiliki urgensi fundamental dalam kurikulum merdeka karena memberikan ruang yang fleksibel di luar struktur ketat mata pelajaran reguler:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-800 text-[11px]">
              <li>Siswa mengasah kepekaan sosial terhadap kondisi tetangga, kawan dhuafa, dan kelestarian alam sekitar desa Sanggreman.</li>
              <li>Siswa mengembangkan karakter kepemimpinan, daya tahan mental, dan kemampuan bekerjasama tanpa membedakan status sosial.</li>
              <li>Pembelajaran menjadi kontekstual dan menjawab tantangan global terkait krisis lingkungan dan degradasi moral generasi muda.</li>
            </ul>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              3. Tujuan Kokurikuler
            </h4>
            <p className="indent-8 text-[11.5px]">
              Tujuan kokurikuler adalah memperkuat pencapaian 8 dimensi profil lulusan {data.namaMadrasah} yang selaras dengan nilai-nilai Rahmatan lil 'Alamin (Tawassuth, I'tidal, Tasamuh, Syura, Qudwah, dan Ishlah).
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 33 (Hal. 25) - STRUKTUR KOKURIKULER & EKSTRAKURIKULER
          ========================================================================= */}
      <KomPageContainer pageNumber="25" pageIndex={33}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              4. Struktur Kurikulum Kokurikuler {data.namaMadrasah}
            </h4>
            <p className="text-[11px]">
              Tabel 3.4. Struktur Kegiatan Kokurikuler {data.namaMadrasah}
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[10.5px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1.5 w-16 text-center">Fase / Kelas</th>
                  <th className="border border-slate-400 p-1.5 text-left">Tema Projek P5-RA</th>
                  <th className="border border-slate-400 p-1.5 text-left">Fokus Dimensi / Nilai RA</th>
                  <th className="border border-slate-400 p-1.5 w-24 text-center">Alokasi Waktu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold">Fase A<br />(Kls 1-2)</td>
                  <td className="border border-slate-400 p-1">
                    1. Gaya Hidup Berkelanjutan: "Sampah Plastik Jadi Kawan"<br />
                    2. Kearifan Lokal: "Permainan Tradisional Negeriku"
                  </td>
                  <td className="border border-slate-400 p-1">
                    Keimanan, Kolaborasi, Kreativitas, Nilai Qudwah (Keteladanan)
                  </td>
                  <td className="border border-slate-400 p-1 text-center">
                    216 JP pertahun (2 Projek)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold">Fase B<br />(Kls 3-4)</td>
                  <td className="border border-slate-400 p-1">
                    1. Kewirausahaan: "Apotek Hidup Mini Madrasah"<br />
                    2. Bhinneka Tunggal Ika: "Indahnya Kerukunan Warga Desa"
                  </td>
                  <td className="border border-slate-400 p-1">
                    Kemandirian, Penalaran Kritis, Nilai Tasamuh (Toleransi)
                  </td>
                  <td className="border border-slate-400 p-1 text-center">
                    252 JP pertahun (2 Projek)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold">Fase C<br />(Kls 5-6)</td>
                  <td className="border border-slate-400 p-1">
                    1. Rekayasa & Teknologi: "Pemanfaatan Energi Surya Sederhana"<br />
                    2. Suara Demokrasi: "Pemilihan Ketua Regu yang Jujur"
                  </td>
                  <td className="border border-slate-400 p-1">
                    Komunikasi, Penalaran Kritis, Nilai Syura (Musyawarah)
                  </td>
                  <td className="border border-slate-400 p-1 text-center">
                    252 JP pertahun (Kls 5)<br />224 JP (Kls 6)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 space-y-1.5">
            <h3 className="font-bold text-slate-950 text-sm">
              C. Ekstrakurikuler
            </h3>
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              1. Landasan Kegiatan Ekstrakurikuler
            </h4>
            <p className="text-[11.5px]">
              <strong>a. Panduan Kurikulum Berbasis Cinta (KBC):</strong> Ekstrakurikuler diposisikan sebagai wadah penjelajahan minat dan bakat tanpa tekanan persaingan yang tidak sehat, melainkan memupuk rasa saling menyayangi dan sportifitas.
            </p>
            <p className="text-[11.5px]">
              <strong>b. Panca Cinta:</strong> Mengarahkan kegiatan ekstra untuk memupuk: (1) Cinta Allah dan Rasul, (2) Cinta Ilmu, (3) Cinta Sesama, (4) Cinta Lingkungan, dan (5) Cinta Tanah Air.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 34 (Hal. 26) - TUJUAN & BENTUK EKSTRAKURIKULER
          ========================================================================= */}
      <KomPageContainer pageNumber="26" pageIndex={34}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="text-[11.5px]">
            <strong>c. Regulasi Pembelajaran Mendalam (Deep Learning):</strong> Menekankan penghayatan nilai sportivitas, ketekunan berlatih, kedisiplinan diri, dan kegembiraan berekspresi.
          </p>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              2. Tujuan Kegiatan Ekstrakurikuler
            </h4>
            <ol className="list-alpha pl-5 space-y-1 text-slate-800 text-[11.5px]">
              <li>Mengembangkan potensi minat, bakat, dan kemampuan kepemimpinan siswa secara optimal.</li>
              <li>Menumbuhkan rasa percaya diri, keberanian tampil, dan sportivitas yang tinggi.</li>
              <li>Menghindarkan siswa dari kecanduan gawai dan pengaruh negatif pergaulan bebas.</li>
              <li>Mempersiapkan kontingen madrasah untuk mengikuti kompetisi ajang prestasi santri.</li>
            </ol>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              3. Prinsip Pengorganisasian Ekstrakurikuler
            </h4>
            <ol className="list-alpha pl-5 space-y-1 text-slate-800 text-[11.5px]">
              <li><strong>Partisipatif:</strong> Siswa memilih kegiatan sesuai minat dan bakat alaminya.</li>
              <li><strong>Edukatif:</strong> Setiap kegiatan mengedepankan pembentukan karakter mulia.</li>
              <li><strong>Inklusif:</strong> Terbuka untuk seluruh siswa tanpa diskriminasi fisik atau latar belakang ekonomi.</li>
              <li><strong>Akuntabel:</strong> Memiliki jadwal teratur, target capaian jelas, dan laporan berkala.</li>
            </ol>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              4. Bentuk Kegiatan Ekstrakurikuler
            </h4>
            <p className="text-[11.5px]">
              <strong>a. Ekstrakurikuler Wajib:</strong> (1) Gerakan Pramuka (Gudep Siaga & Penggalang) sebagai wahana pembentukan karakter mandiri dan dasadarma pramuka, serta (2) Pencak Silat Pagar Nusa sebagai seni bela diri kebanggaan warga NU.
            </p>
            <p className="text-[11.5px]">
              <strong>b. Ekstrakurikuler Pilihan:</strong> Terbagi dalam 3 bidang: (1) Olahraga prestasi, (2) Seni budaya Islam, dan (3) Akademik / Keagamaan.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 35 (Hal. 27) - PILIHAN SENI, MEKANISME PELAKSANAAN & INTRO TABEL 3.5
          ========================================================================= */}
      <KomPageContainer pageNumber="27" pageIndex={35}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="text-[11.5px]">
            Bidang seni mencakup drumband gita madrasah, seni hadroh banjari, MTQ/tahfidz lanjutan, dan kaligrafi mushaf. Bidang akademik mencakup Sains Club (KSM) dan English Kids Club untuk melatih percakapan bahasa inggris santri.
          </p>

          <div className="space-y-2 pt-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              5. Mekanisme Pelaksanaan Ekstrakurikuler
            </h4>
            <ol className="list-alpha pl-5 space-y-1.5 text-slate-800 text-[11.5px]">
              <li>
                <strong>Perencanaan:</strong> Pemetaan minat dan bakat siswa di awal tahun pelajaran melalui angket dan asesmen diagnostik non-kognitif, penyusunan silabus ekstra, dan penunjukan pembina berkompeten.
              </li>
              <li>
                <strong>Pelaksanaan:</strong> Kegiatan ekstra dilaksanakan pada sore hari setelah jam tatap muka intrakurikuler (pukul 14.00 - 16.00 WIB) dengan pengawasan ketat dan rasa aman.
              </li>
              <li>
                <strong>Evaluasi:</strong> Dilakukan setiap akhir semester oleh pembina berupa unjuk bakat, pertandingan persahabatan, atau ujian tingkat sabuk silat.
              </li>
              <li>
                <strong>Pelaporan:</strong> Nilai kualitatif capaian ekstrakurikuler (Sangat Baik / Baik / Cukup) dicantumkan secara resmi di lembar Raport Digital Madrasah (RDM).
              </li>
            </ol>
          </div>

          <p className="indent-8 text-[11.5px] pt-1">
            Rincian cabang kegiatan ekstrakurikuler yang diselenggarakan oleh {data.namaMadrasah} pada Tahun Pelajaran {data.tahunAjaran} dapat dilihat pada matriks tabel berikut ini:
          </p>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 36 (Hal. 28) - TABEL 3.5 KEGIATAN EKSTRAKURIKULER
          ========================================================================= */}
      <KomPageContainer pageNumber="28" pageIndex={36}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <p className="font-bold text-[11px] text-slate-900">
            Tabel 3.5. Kegiatan Ekstrakurikuler {data.namaMadrasah}
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-6 text-center">No</th>
                <th className="border border-slate-400 p-1 text-left">Nama Ekstrakurikuler</th>
                <th className="border border-slate-400 p-1 text-left">Sasaran Kelas</th>
                <th className="border border-slate-400 p-1 text-center w-28">Jadwal Latihan</th>
                <th className="border border-slate-400 p-1 text-left">Instruktur / Pembina</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-50 font-bold">
                <td className="border border-slate-400 p-1" colSpan={5}>A. BIDANG OLAHRAGA</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1 font-semibold">Badminton</td>
                <td className="border border-slate-400 p-1">Kelas III - VI</td>
                <td className="border border-slate-400 p-1 text-center">Selasa, 14.30 WIB</td>
                <td className="border border-slate-400 p-1">Pelatih Khusus</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1 font-semibold">Bola Voli</td>
                <td className="border border-slate-400 p-1">Kelas IV - VI</td>
                <td className="border border-slate-400 p-1 text-center">Kamis, 15.00 WIB</td>
                <td className="border border-slate-400 p-1">Guru PJOK</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">3</td>
                <td className="border border-slate-400 p-1 font-semibold">Catur</td>
                <td className="border border-slate-400 p-1">Kelas III - VI</td>
                <td className="border border-slate-400 p-1 text-center">Rabu, 14.30 WIB</td>
                <td className="border border-slate-400 p-1">Guru Pembina</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">4</td>
                <td className="border border-slate-400 p-1 font-semibold">Sepak Bola / Futsal</td>
                <td className="border border-slate-400 p-1">Kelas III - VI</td>
                <td className="border border-slate-400 p-1 text-center">Jum'at, 15.00 WIB</td>
                <td className="border border-slate-400 p-1">Pelatih Mitra</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">5</td>
                <td className="border border-slate-400 p-1 font-semibold">Tenis Meja</td>
                <td className="border border-slate-400 p-1">Kelas III - VI</td>
                <td className="border border-slate-400 p-1 text-center">Senin, 14.30 WIB</td>
                <td className="border border-slate-400 p-1">Guru Pembina</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">6</td>
                <td className="border border-slate-400 p-1 font-semibold">Sepak Takraw</td>
                <td className="border border-slate-400 p-1">Kelas IV - VI</td>
                <td className="border border-slate-400 p-1 text-center">Sabtu, 14.00 WIB</td>
                <td className="border border-slate-400 p-1">Pelatih Khusus</td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td className="border border-slate-400 p-1" colSpan={5}>B. BIDANG SENI DAN BUDAYA</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1 font-semibold">Drumband Gita Madrasah</td>
                <td className="border border-slate-400 p-1">Kelas III - V</td>
                <td className="border border-slate-400 p-1 text-center">Sabtu, 14.30 WIB</td>
                <td className="border border-slate-400 p-1">Pelatih Drumband</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1 font-semibold">MTQ & Tartil Qur'an</td>
                <td className="border border-slate-400 p-1">Kelas I - VI</td>
                <td className="border border-slate-400 p-1 text-center">Rabu, 14.30 WIB</td>
                <td className="border border-slate-400 p-1">Ustadz Pembina</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">3</td>
                <td className="border border-slate-400 p-1 font-semibold">Seni Hadroh / Rebana</td>
                <td className="border border-slate-400 p-1">Kelas III - VI</td>
                <td className="border border-slate-400 p-1 text-center">Kamis, 14.30 WIB</td>
                <td className="border border-slate-400 p-1">Pembina Hadroh</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">4</td>
                <td className="border border-slate-400 p-1 font-semibold">Kaligrafi Islam</td>
                <td className="border border-slate-400 p-1">Kelas IV - VI</td>
                <td className="border border-slate-400 p-1 text-center">Senin, 14.30 WIB</td>
                <td className="border border-slate-400 p-1">Ustadz Kaligrafi</td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td className="border border-slate-400 p-1" colSpan={5}>C. EKSTRAKURIKULER WAJIB</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1 font-semibold">Gerakan Pramuka (Siaga/Penggalang)</td>
                <td className="border border-slate-400 p-1">Kelas I - VI (Wajib)</td>
                <td className="border border-slate-400 p-1 text-center">Jum'at, 13.30 WIB</td>
                <td className="border border-slate-400 p-1">Pembina Gudep</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1 font-semibold">Pencak Silat Pagar Nusa</td>
                <td className="border border-slate-400 p-1">Kelas III - VI (Wajib)</td>
                <td className="border border-slate-400 p-1 text-center">Ahad, 08.00 WIB</td>
                <td className="border border-slate-400 p-1">Pendekar Pagar Nusa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 37 (Hal. 29) - TABEL 3.5 LANJUTAN & TABEL 3.6 PEMBIASAAN
          ========================================================================= */}
      <KomPageContainer pageNumber="29" pageIndex={37}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <p className="font-bold text-[10.5px] text-slate-800">
            Lanjutan Tabel 3.5 Kegiatan Ekstrakurikuler {data.namaMadrasah}
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-6 text-center">No</th>
                <th className="border border-slate-400 p-1 text-left">Nama Ekstrakurikuler</th>
                <th className="border border-slate-400 p-1 text-left">Sasaran Kelas</th>
                <th className="border border-slate-400 p-1 text-center w-28">Jadwal Latihan</th>
                <th className="border border-slate-400 p-1 text-left">Instruktur / Pembina</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-50 font-bold">
                <td className="border border-slate-400 p-1" colSpan={5}>D. BIDANG AKADEMIK</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1 font-semibold">Sains Club (KSM IPA/Matematika)</td>
                <td className="border border-slate-400 p-1">Kelas IV - VI</td>
                <td className="border border-slate-400 p-1 text-center">Rabu, 14.30 WIB</td>
                <td className="border border-slate-400 p-1">Guru Pembina Sains</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1 font-semibold">English Kids Club</td>
                <td className="border border-slate-400 p-1">Kelas III - VI</td>
                <td className="border border-slate-400 p-1 text-center">Kamis, 14.30 WIB</td>
                <td className="border border-slate-400 p-1">Guru Bahasa Inggris</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-2 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">
              D. Kegiatan Pembiasaan (Panca Cinta)
            </h3>
            <p className="text-[11.5px]">
              Tabel 3.6. Kegiatan Pembiasaan {data.namaMadrasah}
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[10px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-24 text-center">Frekuensi</th>
                  <th className="border border-slate-400 p-1 text-left">Jenis Kegiatan Pembiasaan</th>
                  <th className="border border-slate-400 p-1 text-left">Nilai Karakter Panca Cinta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold" rowSpan={4}>Harian</td>
                  <td className="border border-slate-400 p-1">Budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) penyambutan pagi</td>
                  <td className="border border-slate-400 p-1">Cinta Sesama & Budi Pekerti Luhur</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1">Shalat Dhuha berjamaah dan pembacaan Asmaul Husna</td>
                  <td className="border border-slate-400 p-1">Cinta Allah dan Rasul-Nya</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1">Tadarus Juz 'Amma dan menyanyikan lagu Indonesia Raya</td>
                  <td className="border border-slate-400 p-1">Cinta Al-Qur'an & Cinta Tanah Air</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1">Shalat Dzuhur berjamaah dan kultum santri secara bergantian</td>
                  <td className="border border-slate-400 p-1">Kepemimpinan & Ketaatan Ibadah</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold" rowSpan={3}>Mingguan</td>
                  <td className="border border-slate-400 p-1">Upacara Bendera setiap hari Senin dengan petugas santri</td>
                  <td className="border border-slate-400 p-1">Cinta Tanah Air & Kedisiplinan</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1">Senam Kesegaran Jasmani (SKJ) dan sarapan sehat bersama</td>
                  <td className="border border-slate-400 p-1">Kesehatan Jasmani & Kebersamaan</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1">Jum'at Bersih (kebersihan kelas/masjid) dan Jum'at Berinfaq</td>
                  <td className="border border-slate-400 p-1">Cinta Lingkungan & Kedermawanan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 38 (Hal. 30) - TABEL 3.6 LANJUTAN & KALENDER PENDIDIKAN PBE SEMESTER I
          ========================================================================= */}
      <KomPageContainer pageNumber="30" pageIndex={38}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <p className="font-bold text-[10.5px] text-slate-800">
            Lanjutan Tabel 3.6 Kegiatan Pembiasaan (Tahunan)
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-24 text-center">Frekuensi</th>
                <th className="border border-slate-400 p-1 text-left">Jenis Kegiatan Pembiasaan</th>
                <th className="border border-slate-400 p-1 text-left">Nilai Karakter Panca Cinta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 text-center font-bold" rowSpan={3}>Tahunan</td>
                <td className="border border-slate-400 p-1">Peringatan Hari Besar Islam (Maulid Nabi, Isra' Mi'raj, Tahun Baru Hijriyah)</td>
                <td className="border border-slate-400 p-1">Kecintaan kepada Rasulullah Swt.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1">Peringatan Hari Santri Nasional (22 Oktober) dan HUT RI (17 Agustus)</td>
                <td className="border border-slate-400 p-1">Hubbul Wathan minal Iman</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1">Wisuda Tahfidz Juz 30 dan Khotmil Qur'an Akhirussanah</td>
                <td className="border border-slate-400 p-1">Apresiasi Mahakarya Santri</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-2 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">
              A. Kalender Pendidikan
            </h3>
            <p className="text-[11.5px]">
              <strong>1. Permulaan Tahun Pelajaran:</strong> Tahun Pelajaran {data.tahunAjaran} dimulai pada hari Senin, {data.tahunAjaran?.startsWith('2025') ? '14 Juli 2025' : '13 Juli 2026'} diawali dengan Masa Ta'aruf Siswa Madrasah (MATSAMA) selama 3 hari.
            </p>
            <p className="text-[11.5px]">
              <strong>2. Pekan Belajar Efektif (PBE):</strong> Analisis pekan efektif belajar semester ganjil disusun sebagai berikut:
            </p>

            <p className="font-bold text-[10.5px] text-slate-900">
              Tabel 3.7. Analisis Pekan Belajar Efektif Semester I (Ganjil) & Ringkasan Tahunan
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[10px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-8 text-center">No</th>
                  <th className="border border-slate-400 p-1 text-left">Bulan</th>
                  <th className="border border-slate-400 p-1 text-center w-24">Jumlah Minggu</th>
                  <th className="border border-slate-400 p-1 text-center w-24">Minggu Efektif</th>
                  <th className="border border-slate-400 p-1 text-left">Keterangan / Kegiatan Khusus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                  <td className="border border-slate-400 p-1 font-semibold">Juli 2026</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center">3</td>
                  <td className="border border-slate-400 p-1">MATSAMA & Awal Semester</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">2</td>
                  <td className="border border-slate-400 p-1 font-semibold">Agustus 2026</td>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1">HUT Kemerdekaan RI Ke-81</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">3</td>
                  <td className="border border-slate-400 p-1 font-semibold">September 2026</td>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1">Pekan Penilaian Formatif</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1 font-semibold">Oktober 2026</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1">Hari Santri Nasional</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 font-semibold">November 2026</td>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1">Pelaksanaan Projek P5-RA</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">6</td>
                  <td className="border border-slate-400 p-1 font-semibold">Desember 2026</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center">2</td>
                  <td className="border border-slate-400 p-1">SAS & Pembagian Raport</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="border border-slate-400 p-1 text-center" colSpan={2}>TOTAL SEMESTER I</td>
                  <td className="border border-slate-400 p-1 text-center">27</td>
                  <td className="border border-slate-400 p-1 text-center">21</td>
                  <td className="border border-slate-400 p-1">Pekan Efektif Belajar (PBE)</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="border border-slate-400 p-1 text-center" colSpan={2}>TOTAL SEMESTER II</td>
                  <td className="border border-slate-400 p-1 text-center">25</td>
                  <td className="border border-slate-400 p-1 text-center">19</td>
                  <td className="border border-slate-400 p-1">Pekan Efektif Belajar (PBE)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 39 (Hal. 31) - WAKTU BELAJAR EFEKTIF & TABEL 3.8 ALOKASI LIBUR
          ========================================================================= */}
      <KomPageContainer pageNumber="31" pageIndex={39}>
        <div className="space-y-2.5 text-[12px] leading-relaxed">
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              3. Waktu Belajar Efektif dan Tidak Efektif
            </h4>
            <p className="text-[10.5px]">
              Tabel 3.8. Analisis Waktu Belajar Efektif dan Tidak Efektif Semester I dan II
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[10px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 text-left">Kategori Waktu Belajar</th>
                  <th className="border border-slate-400 p-1 text-center w-24">Semester I</th>
                  <th className="border border-slate-400 p-1 text-center w-24">Semester II</th>
                  <th className="border border-slate-400 p-1 text-center w-24">Total 1 Tahun</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1">Jumlah Pekan Kalender</td>
                  <td className="border border-slate-400 p-1 text-center">27 Pekan</td>
                  <td className="border border-slate-400 p-1 text-center">25 Pekan</td>
                  <td className="border border-slate-400 p-1 text-center font-bold">52 Pekan</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1">Pekan Tidak Efektif (Libur/Ujian)</td>
                  <td className="border border-slate-400 p-1 text-center">6 Pekan</td>
                  <td className="border border-slate-400 p-1 text-center">6 Pekan</td>
                  <td className="border border-slate-400 p-1 text-center font-bold">12 Pekan</td>
                </tr>
                <tr className="bg-emerald-50 font-bold">
                  <td className="border border-slate-400 p-1 text-emerald-950">Pekan Efektif Belajar (PBE)</td>
                  <td className="border border-slate-400 p-1 text-center text-emerald-950">21 Pekan</td>
                  <td className="border border-slate-400 p-1 text-center text-emerald-950">19 Pekan</td>
                  <td className="border border-slate-400 p-1 text-center text-emerald-950">40 Pekan</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              4. Pengaturan Waktu Libur
            </h4>
            <p className="indent-8 text-justify text-[11px]">
              Penetapan waktu libur madrasah berpedoman pada Keputusan Menteri Agama, kalender pendidikan Kanwil Kemenag Provinsi Jawa Tengah, dan kalender LP Ma'arif NU.
            </p>

            <p className="font-bold text-[10px] text-slate-900">
              Tabel 3.9. Acuan Alokasi Waktu Minggu Efektif Belajar, Waktu Libur, dan Kegiatan
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-5 text-center">No</th>
                  <th className="border border-slate-400 p-1 text-left">Kegiatan / Peristiwa</th>
                  <th className="border border-slate-400 p-1 text-center w-24">Alokasi Waktu</th>
                  <th className="border border-slate-400 p-1 text-left">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">1</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Minggu Efektif Belajar</td>
                  <td className="border border-slate-400 p-0.5 text-center">36 - 40 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Kegiatan pembelajaran tatap muka</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">2</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Jeda Tengah Semester</td>
                  <td className="border border-slate-400 p-0.5 text-center">Maksimal 1 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Satu minggu setiap semester</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">3</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Jeda Antar Semester</td>
                  <td className="border border-slate-400 p-0.5 text-center">Maksimal 2 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Antara Semester I dan Semester II</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">4</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Libur Akhir Tahun Pelajaran</td>
                  <td className="border border-slate-400 p-0.5 text-center">Maksimal 3 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Penyiapan kegiatan tahun ajaran baru</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">5</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Hari Libur Keagamaan</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 - 4 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Libur awal Ramadhan dan Idul Fitri</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">6</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Hari Libur Umum / Nasional</td>
                  <td className="border border-slate-400 p-0.5 text-center">Maksimal 2 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Sesuai ketetapan Pemerintah RI</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">7</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Hari Libur Khusus Madrasah</td>
                  <td className="border border-slate-400 p-0.5 text-center">Maksimal 1 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Hari lahir LP Ma'arif NU / khusus</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">8</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Kegiatan Khusus Madrasah</td>
                  <td className="border border-slate-400 p-0.5 text-center">Maksimal 3 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Porseni / kemah pramuka / karya wisata</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">9</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Ujian Madrasah / Asesmen Akhir</td>
                  <td className="border border-slate-400 p-0.5 text-center">1 - 2 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Jadwal resmi Kemenag RI</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">10</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Pengolahan Nilai & RDM</td>
                  <td className="border border-slate-400 p-0.5 text-center">1 Minggu</td>
                  <td className="border border-slate-400 p-0.5">Penginputan nilai raport digital</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">11</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Pembagian Raport Semester</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 Hari</td>
                  <td className="border border-slate-400 p-0.5">Pertemuan wali murid & penyerahan raport</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">12</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Matsama Santri Baru</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 Hari</td>
                  <td className="border border-slate-400 p-0.5">Pengenalan lingkungan madrasah kelas I</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">13</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Rapat Kerja Kurikulum TPKM</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 Hari</td>
                  <td className="border border-slate-400 p-0.5">Evaluasi & penyusunan draf kurikulum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 40 (Hal. 32) - PENGATURAN BEBAN BELAJAR DAN JADWAL PELAJARAN
          ========================================================================= */}
      <KomPageContainer pageNumber="32" pageIndex={40}>
        <div className="space-y-2.5 text-[12px] leading-relaxed">
          <p className="text-[11px] italic text-slate-700">
            5. Kalender Pendidikan: Rincian matrik kalender pendidikan tahunan terlampir dalam lampiran dokumen ini.
          </p>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-950 text-sm">
              B. Pengaturan Beban Belajar dan Jadwal Pelajaran
            </h3>
            <p className="text-[11.5px]">
              <strong>1. Beban Belajar:</strong> Sistem yang digunakan adalah paket tatap muka, dengan durasi 1 jam pelajaran (JP) = 35 menit.
            </p>
            <p className="text-[11.5px]">
              <strong>2. Pengaturan Jadwal Pelajaran:</strong> Distribusi beban belajar mata pelajaran 1 s.d. 14 pada setiap fase/kelas:
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-5 text-center">No</th>
                  <th className="border border-slate-400 p-1 text-left">Mata Pelajaran</th>
                  <th className="border border-slate-400 p-1 text-center w-14">Kelas I</th>
                  <th className="border border-slate-400 p-1 text-center w-14">Kelas II</th>
                  <th className="border border-slate-400 p-1 text-center w-14">Kelas III</th>
                  <th className="border border-slate-400 p-1 text-center w-14">Kelas IV-VI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">1</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Al-Qur'an Hadis</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">2</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Akidah Akhlak</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">3</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Fikih</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">4</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Sejarah Kebudayaan Islam</td>
                  <td className="border border-slate-400 p-0.5 text-center">-</td>
                  <td className="border border-slate-400 p-0.5 text-center">-</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">5</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Bahasa Arab</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">6</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Pendidikan Pancasila</td>
                  <td className="border border-slate-400 p-0.5 text-center">4 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">4 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">4 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">4 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">7</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Bahasa Indonesia</td>
                  <td className="border border-slate-400 p-0.5 text-center">6 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">7 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">6 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">6 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">8</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Matematika</td>
                  <td className="border border-slate-400 p-0.5 text-center">4 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">5 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">5 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">5 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">9</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">IPAS</td>
                  <td className="border border-slate-400 p-0.5 text-center">-</td>
                  <td className="border border-slate-400 p-0.5 text-center">-</td>
                  <td className="border border-slate-400 p-0.5 text-center">5 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">5 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">10</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">PJOK</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">11</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Seni dan Budaya (Seni Rupa)</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">3 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">12</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Bahasa Inggris (Pilihan)</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">13</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Muatan Lokal (Bahasa Jawa)</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-0.5 text-center">14</td>
                  <td className="border border-slate-400 p-0.5 font-semibold">Ke-NU-an / Aswaja</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">2 JP</td>
                </tr>
                <tr className="bg-emerald-100 font-bold text-emerald-950">
                  <td className="border border-slate-400 p-0.5 text-center" colSpan={2}>TOTAL JP PER MINGGU</td>
                  <td className="border border-slate-400 p-0.5 text-center">34 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">36 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">42 JP</td>
                  <td className="border border-slate-400 p-0.5 text-center">42 JP</td>
                </tr>
              </tbody>
            </table>

            <div className="pt-1 text-[11px] text-justify space-y-1 text-slate-800">
              <p className="indent-8">
                Pengaturan jadwal pelajaran disusun dengan memperhatikan ritme biologis anak usia sekolah dasar, di mana mata pelajaran yang membutuhkan konsentrasi kognitif tinggi (seperti Matematika, IPAS, dan Bahasa Arab) ditempatkan pada jam-jam awal pembelajaran pagi hari.
              </p>
              <p className="indent-8">
                Mata pelajaran yang bersifat kinetik dan kreatif (seperti PJOK, Seni Rupa, dan Kokurikuler Projek P5-RA) ditempatkan setelah istirahat pertama atau di jam-jam siang guna mempertahankan antusiasme dan kegembiraan belajar peserta didik.
              </p>
            </div>
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
