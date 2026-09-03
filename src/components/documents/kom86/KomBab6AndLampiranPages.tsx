import React from 'react';
import { KomPageContainer } from './KomPageContainer';
import { KomCintaData } from '../../../data/komCintaDefaultData';

interface Props {
  data: KomCintaData;
}

export const KomBab6AndLampiranPages: React.FC<Props> = ({ data }) => {
  return (
    <>
      {/* =========================================================================
          PAGE 71 (Hal. 63) - BAB VI PENUTUP (KESIMPULAN & SARAN)
          ========================================================================= */}
      <KomPageContainer pageNumber="63" pageIndex={71}>
        <div className="text-center pb-4 border-b border-slate-300">
          <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
            BAB VI<br />PENUTUP
          </h2>
        </div>

        <div className="pt-4 space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            A. Kesimpulan
          </h3>
          <p className="indent-8">
            Kurikulum Operasional Madrasah (KOM) Berbasis Cinta di {data.namaMadrasah} Tahun Pelajaran {data.tahunAjaran} disusun sebagai kompas moral dan pedoman operasional seluruh sivitas akademika madrasah. Berdasarkan seluruh penjabaran bab-bab terdahulu, dapat ditarik beberapa kesimpulan pokok:
          </p>

          <ol className="list-decimal pl-5 space-y-1.5 text-slate-800 text-[11.5px]">
            <li>
              <strong>Pondasi Kurikulum Berbasis Cinta:</strong> Kurikulum ini meletakkan cinta sebagai ruh dan paradigma utama pendidikan madrasah, yang diwujudkan melalui Panca Cinta (Cinta Allah dan Rasul, Cinta Ilmu, Cinta Sesama, Cinta Lingkungan, dan Cinta Tanah Air), menjamin lingkungan belajar yang aman, nyaman, dan ramah anak.
            </li>
            <li>
              <strong>Pembelajaran Mendalam (Deep Learning):</strong> Pendekatan <em>Mindful, Meaningful</em>, dan <em>Joyful Learning</em> membebaskan anak dari tekanan hafalan semata, menghidupkan nalar kritis, serta menumbuhkan kesadaran spiritual dan kecakapan hidup abad 21.
            </li>
            <li>
              <strong>Delapan Dimensi Profil Lulusan:</strong> Menjadi tolok ukur pembinaan karakter santri yang berakar kuat pada nilai Ahlussunnah wal Jama'ah An-Nahdliyyah, unggul prestasi, dan melek literasi teknologi digital.
            </li>
          </ol>

          <div className="pt-2 space-y-1.5">
            <h3 className="font-bold text-slate-950 text-sm">
              B. Saran dan Rekomendasi
            </h3>
            <p className="text-[11.5px]">
              1. <strong>Kepada Dewan Pendidik:</strong> Diharapkan senantiasa memelihara keikhlasan, kesabaran, dan keteladanan akhlak (<em>qudwah hasanah</em>) dalam mendidik santri dengan penuh kelembutan.
            </p>
            <p className="text-[11.5px]">
              2. <strong>Kepada Komite dan Wali Murid:</strong> Diharapkan terus mempererat kemitraan segitiga emas (madrasah, orang tua, masyarakat) dalam mendukung program pembiasaan ibadah anak di rumah.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 72 (Hal. 64) - SARAN LANJUTAN & LEMBAR TANDA TANGAN TPKM
          ========================================================================= */}
      <KomPageContainer pageNumber="64" pageIndex={72}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <div className="space-y-1.5 text-[11.5px]">
            <p>
              3. <strong>Kepada Kantor Kementerian Agama & LP Ma'arif NU:</strong> Diharapkan senantiasa memberikan arahan, supervisi, serta dukungan pembinaan berkelanjutan bagi peningkatan mutu pendidik di {data.namaMadrasah}.
            </p>
            <p>
              4. <strong>Kepada Tokoh Masyarakat & Ulama:</strong> Kami memohon doa restu dan bimbingan agar madrasah ini senantiasa istiqamah mencetak generasi saleh dan salehah yang berbakti kepada agama, nusa, dan bangsa.
            </p>
          </div>

          <p className="indent-8 text-[11.5px] pt-1">
            Semoga Allah Subhanahu wa Ta'ala senantiasa melimpahkan taufiq, hidayah, inayah, serta keberkahan-Nya kepada segenap pengelola, guru, santri, dan seluruh keluarga besar {data.namaMadrasah}. Aamiin Yaa Rabbal 'Aalamiin.
          </p>

          <div className="pt-8 grid grid-cols-2 gap-4 text-center text-xs">
            <div className="space-y-1">
              <p className="text-slate-700">Mengetahui,</p>
              <p className="font-bold text-slate-900">Ketua Tim Pengembang Kurikulum,</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-[11px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold text-slate-900 underline">USTADZ AHMAD MA'RUF, S.Pd.I.</p>
              <p className="text-[11px] text-slate-700">NIP. -</p>
            </div>

            <div className="space-y-1">
              <p className="text-slate-700">Ditetapkan di: {data.desa}</p>
              <p className="font-bold text-slate-900">Kepala {data.namaMadrasah},</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-[11px] text-slate-400 italic">(Tanda Tangan & Cap Madrasah)</span>
              </div>
              <p className="font-bold text-slate-900 underline">{(data as any).namaKepalaMadrasah || data.namaKepala}</p>
              <p className="text-[11px] text-slate-700">NIP. {(data as any).nipKepalaMadrasah || data.nipKepala}</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 73 (Hal. 65) - LAMPIRAN I: SK TPKM MADRASAH
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-lampiran" pageNumber="65" pageIndex={73}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <div className="text-center pb-2 border-b-2 border-slate-900">
            <h3 className="font-bold text-sm uppercase text-slate-950 font-serif">
              LEMBAGA PENDIDIKAN MA'ARIF NU KABUPATEN BANYUMAS<br />
              {data.namaMadrasah.toUpperCase()}
            </h3>
            <p className="text-[10.5px] text-slate-700">
              Alamat: {data.alamat}, Desa {data.desa}, Kec. {data.kecamatan}, Kab. {data.kabupaten} - Jawa Tengah
            </p>
          </div>

          <div className="text-center pt-2 pb-1">
            <h4 className="font-bold text-xs uppercase underline text-slate-950">
              SURAT KEPUTUSAN KEPALA {data.namaMadrasah.toUpperCase()}
            </h4>
            <p className="text-[11px] text-slate-800">
              Nomor: 045/MI.M-2/SK-TPKM/VII/{data.tahunAjaran.split('/')[0]}
            </p>
            <p className="font-semibold text-xs text-slate-900 mt-1">
              TENTANG<br />
              PENETAPAN TIM PENGEMBANG KURIKULUM MADRASAH (TPKM)<br />
              TAHUN PELAJARAN {data.tahunAjaran}
            </p>
          </div>

          <div className="space-y-1.5 text-[11px] text-justify text-slate-800">
            <div className="flex">
              <span className="w-24 font-semibold">Menimbang:</span>
              <span className="flex-1">
                Bahwa dalam rangka memperlancar pelaksanaan implementasi Kurikulum Berbasis Cinta (KBC) dan Kurikulum Merdeka di {data.namaMadrasah}, maka dipandang perlu menetapkan Tim Pengembang Kurikulum Madrasah Tahun Pelajaran {data.tahunAjaran}.
              </span>
            </div>
            <div className="flex">
              <span className="w-24 font-semibold">Mengingat:</span>
              <span className="flex-1">
                1. UU No. 20 Tahun 2003 tentang Sisdiknas; 2. PMA No. 38 Tahun 2024 tentang Kurikulum Madrasah; 3. KMA No. 1503 Tahun 2025 tentang Pedoman Kurikulum Madrasah.
              </span>
            </div>
            <div className="flex">
              <span className="w-24 font-semibold">Memutuskan:</span>
              <span className="flex-1 font-semibold text-slate-900">
                MENETAPKAN KEPUTUSAN KEPALA MADRASAH TENTANG TIM PENGEMBANG KURIKULUM MADRASAH (TPKM) TAHUN PELAJARAN {data.tahunAjaran}.
              </span>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 74 (Hal. 66) - LAMPIRAN I LANJUTAN: SUSUNAN PERSONALIA TPKM
          ========================================================================= */}
      <KomPageContainer pageNumber="66" pageIndex={74}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <p className="font-bold text-[11px] text-slate-900">
            Lampiran Surat Keputusan Kepala {data.namaMadrasah}<br />
            Nomor: 045/MI.M-2/SK-TPKM/VII/{data.tahunAjaran.split('/')[0]}<br />
            Tentang: Susunan Tim Pengembang Kurikulum Madrasah (TPKM) Tahun Pelajaran {data.tahunAjaran}
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10.5px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1.5 w-8 text-center">No</th>
                <th className="border border-slate-400 p-1.5 text-left">Nama / NIP</th>
                <th className="border border-slate-400 p-1.5 text-left w-36">Jabatan Pokok</th>
                <th className="border border-slate-400 p-1.5 text-left w-40">Jabatan dalam Tim</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center">1</td>
                <td className="border border-slate-400 p-1.5 font-semibold">{(data as any).namaKepalaMadrasah || data.namaKepala}</td>
                <td className="border border-slate-400 p-1.5">Kepala Madrasah</td>
                <td className="border border-slate-400 p-1.5 font-bold text-emerald-900">Penanggung Jawab</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center">2</td>
                <td className="border border-slate-400 p-1.5 font-semibold">{(data as any).namaKomite || data.namaKetuaKomite}</td>
                <td className="border border-slate-400 p-1.5">Ketua Komite</td>
                <td className="border border-slate-400 p-1.5 font-bold text-emerald-900">Penasehat / Pengarah</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center">3</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Ustadz Ahmad Ma'ruf, S.Pd.I.</td>
                <td className="border border-slate-400 p-1.5">Guru Senior / Waka Kurikulum</td>
                <td className="border border-slate-400 p-1.5 font-bold">Ketua Tim</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center">4</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Ustadzah Siti Fatimah, S.Pd.</td>
                <td className="border border-slate-400 p-1.5">Guru Kelas I</td>
                <td className="border border-slate-400 p-1.5 font-bold">Sekretaris</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center">5</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Ustadzah Nur Hidayah, S.Pd.</td>
                <td className="border border-slate-400 p-1.5">Bendahara Madrasah</td>
                <td className="border border-slate-400 p-1.5 font-bold">Bendahara</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center">6</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Ustadz Muhammad Rizqi, S.Pd.</td>
                <td className="border border-slate-400 p-1.5">Guru PJOK & Ekstra</td>
                <td className="border border-slate-400 p-1.5">Koordinator P5-RA & Ekstra</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center">7</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Ustadzah Anis Marsela, S.Pd.</td>
                <td className="border border-slate-400 p-1.5">Guru Kelas IV</td>
                <td className="border border-slate-400 p-1.5">Anggota Bidang Asesmen</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-4 flex justify-end text-xs">
            <div className="text-center w-60 space-y-1">
              <p>Ditetapkan di: {data.desa}</p>
              <p className="font-bold">Kepala {data.namaMadrasah},</p>
              <div className="h-16 flex items-center justify-center">
                <span className="text-[11px] text-slate-400 italic">(Cap & TTD)</span>
              </div>
              <p className="font-bold underline">{(data as any).namaKepalaMadrasah || data.namaKepala}</p>
              <p className="text-[11px]">NIP. {(data as any).nipKepalaMadrasah || data.nipKepala}</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 75 (Hal. 67) - LAMPIRAN II: KALENDER PENDIDIKAN MATRIKS
          ========================================================================= */}
      <KomPageContainer pageNumber="67" pageIndex={75}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <div className="text-center pb-2">
            <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-950 font-serif">
              LAMPIRAN II: MATRIKS KALENDER PENDIDIKAN MADRASAH<br />
              TAHUN PELAJARAN {data.tahunAjaran}
            </h3>
          </div>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-20 text-center">Bulan</th>
                <th className="border border-slate-400 p-1 text-center w-24">Rentang Tanggal</th>
                <th className="border border-slate-400 p-1 text-left">Uraian Kegiatan Pokok Madrasah</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Juli 2026</td>
                <td className="border border-slate-400 p-1 text-center">13 - 15 Juli 2026</td>
                <td className="border border-slate-400 p-1">Masa Ta'aruf Siswa Madrasah (MATSAMA) Santri Baru</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Agustus 2026</td>
                <td className="border border-slate-400 p-1 text-center">17 Agustus 2026</td>
                <td className="border border-slate-400 p-1">Peringatan Hari Kemerdekaan Republik Indonesia Ke-81</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">September 2026</td>
                <td className="border border-slate-400 p-1 text-center">21 - 26 Sept 2026</td>
                <td className="border border-slate-400 p-1">Pelaksanaan Asesmen Formatif Tengah Semester Ganjil</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Oktober 2026</td>
                <td className="border border-slate-400 p-1 text-center">22 Oktober 2026</td>
                <td className="border border-slate-400 p-1">Upacara Bendera & Peringatan Hari Santri Nasional</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">November 2026</td>
                <td className="border border-slate-400 p-1 text-center">09 - 21 Nov 2026</td>
                <td className="border border-slate-400 p-1">Pelaksanaan Blok Projek P5-RA Apotek Hidup & Gelar Karya</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Desember 2026</td>
                <td className="border border-slate-400 p-1 text-center">01 - 10 Des 2026<br />19 Des 2026</td>
                <td className="border border-slate-400 p-1">Sumatif Akhir Semester (SAS) Ganjil<br />Penyerahan Raport Digital Madrasah (RDM) Semester I</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Januari 2027</td>
                <td className="border border-slate-400 p-1 text-center">04 Januari 2027</td>
                <td className="border border-slate-400 p-1">Hari Pertama Masuk Sekolah Semester II (Genap)</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Maret 2027</td>
                <td className="border border-slate-400 p-1 text-center">10 - 24 Maret 2027</td>
                <td className="border border-slate-400 p-1">Libur Awal Ramadhan 1448 H & Kegiatan Pesantren Kilat Ramadhan</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">April 2027</td>
                <td className="border border-slate-400 p-1 text-center">05 - 17 April 2027</td>
                <td className="border border-slate-400 p-1">Libur Hari Raya Idul Fitri 1448 H & Halal bi Halal Santri</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Mei 2027</td>
                <td className="border border-slate-400 p-1 text-center">10 - 20 Mei 2027</td>
                <td className="border border-slate-400 p-1">Pelaksanaan Asesmen Madrasah (AM) Kelas VI</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Juni 2027</td>
                <td className="border border-slate-400 p-1 text-center">07 - 16 Juni 2027<br />25 Juni 2027</td>
                <td className="border border-slate-400 p-1">Sumatif Akhir Tahun (SAT) Kenaikan Kelas<br />Penyerahan Buku Raport Semester Genap & Wisuda Tahfidz</td>
              </tr>
            </tbody>
          </table>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 76 (Hal. 68) - LAMPIRAN III: PEMETAAN CP DAN ATP
          ========================================================================= */}
      <KomPageContainer pageNumber="68" pageIndex={76}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <div className="text-center pb-2">
            <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-950 font-serif">
              LAMPIRAN III: CONTOH ALUR TUJUAN PEMBELAJARAN (ATP)<br />
              MATA PELAJARAN FIKIH - FASE A (KELAS I DAN II)
            </h3>
          </div>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-16 text-center">Elemen</th>
                <th className="border border-slate-400 p-1 text-left">Capaian Pembelajaran (CP)</th>
                <th className="border border-slate-400 p-1 text-left">Alur Tujuan Pembelajaran (ATP)</th>
                <th className="border border-slate-400 p-1 w-20 text-center">Panca Cinta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Fikih Ibadah (Fase A)</td>
                <td className="border border-slate-400 p-1">
                  Peserta didik mampu mengenal rukun Islam, melafalkan kalimah syahadatain, mempraktikkan tata cara bersuci (thaharah), wudhu, dan gerakan shalat fardhu secara tertib.
                </td>
                <td className="border border-slate-400 p-1">
                  1.1 Mengenal lima rukun Islam dengan lagu ceria.<br />
                  1.2 Melafalkan dua kalimah syahadat beserta artinya.<br />
                  1.3 Membiasakan doa sebelum dan sesudah berwudhu.<br />
                  1.4 Menirukan tata cara berwudhu dengan hemat air.<br />
                  1.5 Mempraktikkan gerakan shalat fardhu berjamaah.
                </td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-900">
                  Cinta Allah, Cinta Lingkungan (Hemat Air)
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pt-2 text-[11px] text-justify space-y-1 text-slate-800">
            <p className="font-semibold">Prinsip Penyusunan ATP:</p>
            <p className="indent-6">
              1. Disusun dari materi konkret menuju abstrak, disesuaikan dengan kemampuan motorik halus dan kognitif santri Fase A.
            </p>
            <p className="indent-6">
              2. Mengutamakan pembiasaan dan keteladanan langsung di masjid madrasah, bukan sebatas teori hafalan naskah.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 77 (Hal. 69) - LAMPIRAN IV: INSTRUMEN OBSERVASI KBC
          ========================================================================= */}
      <KomPageContainer pageNumber="69" pageIndex={77}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <div className="text-center pb-2">
            <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-950 font-serif">
              LAMPIRAN IV: LEMBAR OBSERVASI IKLIM KELAS BERBASIS CINTA<br />
              (SUPERVISI IMPLEMENTASI KBC DI MADRASAH)
            </h3>
          </div>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-8 text-center">No</th>
                <th className="border border-slate-400 p-1 text-left">Indikator Iklim Kelas Berbasis Cinta</th>
                <th className="border border-slate-400 p-1 text-center w-20">Teramati (Ya/Tidak)</th>
                <th className="border border-slate-400 p-1 text-left">Catatan Praktik Baik</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1">Guru menyambut siswa di pintu dengan senyuman dan sapaan ramah.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Siswa merasa disambut dengan penuh kasih.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1">Kelas bebas dari teriakan kemarahan guru atau cemoohan fisik/verbal.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Suasana dialogis dan santun.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">3</td>
                <td className="border border-slate-400 p-1">Guru memberikan perhatian ekstra kepada siswa yang lambat memahami materi.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Diferensiasi bimbingan individual berjalan baik.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">4</td>
                <td className="border border-slate-400 p-1">Siswa saling membantu kawan kelompoknya tanpa membedakan status sosial.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Budaya gotong royong terwujud nyata.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">5</td>
                <td className="border border-slate-400 p-1">Tersedia sudut baca (pojok literasi) dan tempat sampah pilah di dalam kelas.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Lingkungan kelas bersih dan mendukung Adiwiyata.</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-4 flex justify-between text-xs">
            <div className="text-center w-48 space-y-1">
              <p>Guru Kelas yang Disupervisi,</p>
              <div className="h-14 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold underline">Ustadzah Siti Fatimah, S.Pd.</p>
            </div>

            <div className="text-center w-48 space-y-1">
              <p>Supervisor / Kepala Madrasah,</p>
              <div className="h-14 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold underline">{(data as any).namaKepalaMadrasah || data.namaKepala}</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 78 (Hal. 70) - LAMPIRAN V: BERITA ACARA RAPAT KERJA TPKM
          ========================================================================= */}
      <KomPageContainer pageNumber="70" pageIndex={78}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <div className="text-center pb-2 border-b-2 border-slate-900">
            <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-950 font-serif">
              BERITA ACARA RAPAT KERJA PENYUSUNAN DAN REVIEW DOKUMEN<br />
              KURIKULUM OPERASIONAL MADRASAH (KOM) BERBASIS CINTA<br />
              {data.namaMadrasah.toUpperCase()}<br />
              TAHUN PELAJARAN {data.tahunAjaran}
            </h3>
          </div>

          <div className="pt-2 text-[11px] text-justify space-y-2 text-slate-800">
            <p className="indent-8">
              Pada hari ini, <strong>Sabtu</strong> tanggal <strong>Empat</strong> bulan <strong>Juli</strong> tahun <strong>Dua Ribu Dua Puluh Enam</strong> bertempat di Ruang Guru {data.namaMadrasah}, telah diselenggarakan Rapat Kerja Review dan Finalisasi Dokumen Kurikulum Operasional Madrasah (KOM) Berbasis Cinta Tahun Pelajaran {data.tahunAjaran}.
            </p>
            <p className="indent-8">
              Rapat kerja dihadiri oleh Pengawas Madrasah, Kepala Madrasah, Tim Pengembang Kurikulum Madrasah (TPKM), Dewan Guru, Tenaga Kependidikan, serta Pengurus Komite Madrasah dan perwakilan Tokoh Masyarakat.
            </p>
            <p className="indent-8">
              Berdasarkan hasil musyawarah dan penelaahan mendalam terhadap regulasi KMA No. 1503 Tahun 2025 dan Panduan Kurikulum Berbasis Cinta, seluruh peserta rapat secara bulat <strong>MENYETUJUI</strong> dan <strong>MENGESAHKAN</strong> Dokumen Kurikulum Operasional Madrasah ini untuk diberlakukan secara efektif mulai Tahun Pelajaran {data.tahunAjaran}.
            </p>
            <p className="indent-8">
              Demikian Berita Acara ini dibuat dengan sebenarnya dengan penuh rasa tanggung jawab demi kemajuan mutu pendidikan madrasah, untuk dapat dipergunakan sebagaimana mestinya.
            </p>
          </div>

          <div className="pt-6 grid grid-cols-2 gap-4 text-center text-xs">
            <div className="space-y-1">
              <p className="font-bold text-slate-900">Perwakilan Dewan Guru,</p>
              <div className="h-16 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold underline">Ustadzah Siti Fatimah, S.Pd.</p>
            </div>

            <div className="space-y-1">
              <p className="font-bold text-slate-900">Ketua Komite Madrasah,</p>
              <div className="h-16 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold underline">{(data as any).namaKomite || data.namaKetuaKomite}</p>
            </div>
          </div>

          <div className="pt-4 text-center text-xs">
            <p className="font-bold text-slate-900">Mengetahui & Menyetujui,</p>
            <p className="font-bold text-slate-900">Kepala {data.namaMadrasah},</p>
            <div className="h-16 flex items-center justify-center">
              <span className="text-[10px] text-slate-400 italic">(Tanda Tangan & Cap Madrasah)</span>
            </div>
            <p className="font-bold underline">{(data as any).namaKepalaMadrasah || data.namaKepala}</p>
            <p className="text-[11px]">NIP. {(data as any).nipKepalaMadrasah || data.nipKepala}</p>
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
