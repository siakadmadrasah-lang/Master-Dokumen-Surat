import React from 'react';
import { KomPageContainer } from './KomPageContainer';
import { KomCintaData } from '../../../data/komCintaDefaultData';
import { KomPetaLokasiViewer } from './KomPetaLokasiViewer';

interface Props {
  data: KomCintaData;
}

export const KomBab1Pages: React.FC<Props> = ({ data }) => {
  return (
    <>
      {/* =========================================================================
          PAGE 9 (Hal. 1) - BAB I & PROFIL MADRASAH
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-bab1" pageNumber="1" pageIndex={9}>
        <div className="text-center pb-4 border-b border-slate-300">
          <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
            BAB I<br />ANALISIS KARAKTERISTIK MADRASAH
          </h2>
        </div>

        <div className="pt-4 space-y-3 text-[12px] leading-relaxed">
          <h3 className="font-bold text-slate-950 text-sm">
            A. Karakteristik Madrasah
          </h3>
          <p className="font-semibold text-slate-900">
            PROFIL RA/MADRASAH
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[11px]">
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1.5 w-8 text-center font-semibold">1.</td>
                <td className="border border-slate-400 p-1.5 w-44 font-semibold">Nama Madrasah</td>
                <td className="border border-slate-400 p-1.5">{data.namaMadrasah}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">2.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">NSM</td>
                <td className="border border-slate-400 p-1.5 font-mono">{data.nsm}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">3.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">NPSN</td>
                <td className="border border-slate-400 p-1.5 font-mono">{data.npsn}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">4.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Status Akreditasi</td>
                <td className="border border-slate-400 p-1.5">{data.statusAkreditasi}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">5.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Alamat Lengkap</td>
                <td className="border border-slate-400 p-1.5">{data.alamat} Kec. {data.kecamatan} Kab. {data.kabupaten}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">6.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">SK Kemenkumham Yayasan</td>
                <td className="border border-slate-400 p-1.5">{data.aktaYayasan}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">7.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Status Tanah & Bangunan</td>
                <td className="border border-slate-400 p-1.5">{data.statusTanah} / {data.statusBangunan}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">8.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Luas Tanah & Bangunan</td>
                <td className="border border-slate-400 p-1.5">{data.luasTanah} / {data.luasBangunan}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">9.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Rombongan Belajar</td>
                <td className="border border-slate-400 p-1.5">6 Rombel (Kelas I s.d. VI)</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">10.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Sumber Listrik & Air</td>
                <td className="border border-slate-400 p-1.5">{data.sarpras.listrik} / {data.sarpras.air}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">11.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Akses Internet</td>
                <td className="border border-slate-400 p-1.5">{data.sarpras.internet}</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-semibold">12.</td>
                <td className="border border-slate-400 p-1.5 font-semibold">Email & Website</td>
                <td className="border border-slate-400 p-1.5">{data.email} | {data.website}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 10 (Hal. 2) - GAMBAR 1.1 & DATA SARPRAS
          ========================================================================= */}
      <KomPageContainer pageNumber="2" pageIndex={10}>
        <div className="space-y-4 text-[12px] leading-relaxed">
          {/* Peta dan Denah Wilayah Geografis Madrasah (Gambar 1.1) */}
          <KomPetaLokasiViewer data={data} />

          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[13px]">
              Data Kepemilikan Lahan, Bangunan dan Sarana Prasarana
            </h4>

            <table className="w-full border-collapse border border-slate-400 text-[11px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1.5 w-10 text-center">No</th>
                  <th className="border border-slate-400 p-1.5 text-left">Jenis Sarana / Prasarana</th>
                  <th className="border border-slate-400 p-1.5 w-28 text-center">Jumlah / Luas</th>
                  <th className="border border-slate-400 p-1.5 w-24 text-center">Kondisi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                  <td className="border border-slate-400 p-1">Luas Lahan / Tanah</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.luasLahan}</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">2</td>
                  <td className="border border-slate-400 p-1">Luas Bangunan</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.luasBangunan}</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">3</td>
                  <td className="border border-slate-400 p-1">Ruang Kelas</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.ruangKelas} Ruang</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1">Ruang Kepala Madrasah</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.ruangKepala} Ruang</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1">Ruang Guru</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.ruangGuru} Ruang</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">6</td>
                  <td className="border border-slate-400 p-1">Ruang Perpustakaan</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.ruangPerpus} Ruang</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">7</td>
                  <td className="border border-slate-400 p-1">Ruang UKS</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.ruangUKS} Ruang</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">8</td>
                  <td className="border border-slate-400 p-1">Toilet Guru & Siswa</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.toilet} Unit</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">9</td>
                  <td className="border border-slate-400 p-1">Ruang Multimedia / Lab Komputer</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.ruangMultimedia} Ruang</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">10</td>
                  <td className="border border-slate-400 p-1">Masjid / Musholla</td>
                  <td className="border border-slate-400 p-1 text-center">{data.sarpras.masjid} Unit</td>
                  <td className="border border-slate-400 p-1 text-center">Baik</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 11 (Hal. 3) - SOAR & BAGAN ANALISIS
          ========================================================================= */}
      <KomPageContainer pageNumber="3" pageIndex={11}>
        <div className="space-y-3.5 text-[12px] leading-relaxed text-justify">
          <h4 className="font-bold text-slate-950 text-sm">
            1. Karakteristik Madrasah
          </h4>
          <p className="indent-8">
            Pengembangan kurikulum di {data.namaMadrasah} diawali dengan evaluasi diri madrasah menggunakan pendekatan analisis <strong>SOAR</strong> (<em>Strengths, Opportunities, Aspirations, Results</em>). Analisis ini berfokus pada kekuatan internal dan peluang masa depan yang dapat diwujudkan secara kolaboratif bersama seluruh ekosistem pendidikan madrasah.
          </p>

          <div className="text-center py-2">
            <div className="border border-slate-300 rounded-lg p-3 bg-slate-50 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2 w-full max-w-sm text-[11px]">
                <div className="bg-emerald-100 p-2.5 rounded border border-emerald-300 font-semibold text-emerald-950">
                  STRENGTHS (Kekuatan)
                </div>
                <div className="bg-blue-100 p-2.5 rounded border border-blue-300 font-semibold text-blue-950">
                  OPPORTUNITIES (Peluang)
                </div>
                <div className="bg-amber-100 p-2.5 rounded border border-amber-300 font-semibold text-amber-950">
                  ASPIRATIONS (Aspirasi)
                </div>
                <div className="bg-purple-100 p-2.5 rounded border border-purple-300 font-semibold text-purple-950">
                  RESULTS (Hasil Terukur)
                </div>
              </div>
            </div>
            <p className="font-bold text-slate-800 text-[11px] pt-1.5">
              Gambar 1.2 Bagan Analisis SOAR
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <h5 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              a. Strengths (Kekuatan Internal):
            </h5>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-800">
              <li>
                <strong>Keberagaman dan Kualitas Sumber Daya Manusia:</strong> Mayoritas pendidik telah berpendidikan S1 dan aktif mengikuti program peningkatan kompetensi guru melalui KKG dan pelatihan Kurikulum Merdeka.
              </li>
              <li>
                <strong>Jumlah Siswa yang Besar:</strong> Tingginya minat masyarakat menyekolahkan putra-putrinya di {data.namaMadrasah} menjadi modal sosial yang kokoh dalam membangun atmosfer belajar yang dinamis.
              </li>
              <li>
                <strong>Fasilitas yang Representatif:</strong> Ketersediaan ruang belajar yang memadai, sarana ibadah masjid as-salafiyah, serta lingkungan yang kondusif untuk tumbuh kembang siswa.
              </li>
            </ol>
          </div>

          <div className="space-y-1 pt-1">
            <h5 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              b. Opportunities (Peluang Eksternal):
            </h5>
            <ol className="list-decimal pl-5 space-y-1 text-slate-800">
              <li>
                <strong>Program Pengembangan Sumber Daya Manusia:</strong> Peluang sinergi dengan Kementerian Agama, LP Ma'arif NU, dan perguruan tinggi untuk pelatihan guru dan tenaga kependidikan.
              </li>
            </ol>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 12 (Hal. 4) - OPPORTUNITIES LANJUTAN, ASPIRATIONS, RESULTS
          ========================================================================= */}
      <KomPageContainer pageNumber="4" pageIndex={12}>
        <div className="space-y-3.5 text-[12px] leading-relaxed text-justify">
          <ol start={2} className="list-decimal pl-5 space-y-1.5 text-slate-800">
            <li>
              <strong>Kolaborasi dengan Komunitas dan Industri:</strong> Membuka jejaring kemitraan strategis dengan instansi pemerintah (Puskesmas, Kepolisian), dunia usaha, dan lembaga sosial keagamaan.
            </li>
            <li>
              <strong>Pemberdayaan Siswa dalam Kegiatan Ekstrakurikuler:</strong> Potensi besar pengembangan minat dan bakat di bidang kepramukaan, seni hadroh, olahraga pencak silat, dan sains.
            </li>
            <li>
              <strong>Pemanfaatan Teknologi dalam Pembelajaran:</strong> Dukungan fasilitas internet dan lab komputer untuk integrasi literasi digital dan pembelajaran mendalam (deep learning).
            </li>
          </ol>

          <div className="space-y-2 pt-1">
            <h5 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              c. Aspirations (Aspirasi):
            </h5>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-800">
              <li>
                <strong>Menjadi Lembaga Pendidikan Terdepan:</strong> Mewujudkan madrasah rujukan unggulan di tingkat kecamatan dan kabupaten dalam perpaduan ilmu agama dan teknologi.
              </li>
              <li>
                <strong>Penguatan Identitas Budaya dan Agama:</strong> Menanamkan nilai-nilai Ahlussunnah wal Jama'ah An-Nahdliyyah, adab sopan santun, dan cinta tanah air pada setiap lulusan.
              </li>
              <li>
                <strong>Pengembangan Inovasi dalam Pembelajaran:</strong> Menerapkan pendekatan Kurikulum Berbasis Cinta (KBC) dan pembelajaran berbasis proyek (PBL) yang menyenangkan.
              </li>
              <li>
                <strong>Peningkatan Keterlibatan Komunitas:</strong> Mengokohkan peran komite madrasah, wali murid, dan tokoh masyarakat dalam mengawal kemajuan madrasah.
              </li>
            </ol>
          </div>

          <div className="space-y-2 pt-1">
            <h5 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              d. Results (Hasil yang Diharapkan):
            </h5>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-800">
              <li>
                <strong>Prestasi Akademik dan Non-Akademik yang Meningkat:</strong> Siswa meraih kejuaraan di berbagai ajang kompetisi sains, tahfidz, seni, dan olahraga.
              </li>
              <li>
                <strong>Kualitas Pendidikan yang Unggul:</strong> Terpenuhinya Standar Nasional Pendidikan (SNP) secara maksimal dengan capaian pembelajaran yang terukur.
              </li>
              <li>
                <strong>Penguatan Karakter Siswa:</strong> Lahirnya generasi berakhlak mulia, toleran, jujur, berjiwa wirausaha, serta peduli terhadap sesama dan lingkungan hidup.
              </li>
              <li>
                <strong>Citra Positif Madrasah:</strong> Kepercayaan publik yang kian meningkat dan pengakuan reputasi kelembagaan di mata masyarakat luas.
              </li>
            </ol>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 13 (Hal. 5) - PROGRAM UNGGULAN LOKAL (TAHFIDZ KELAS I - IV)
          ========================================================================= */}
      <KomPageContainer pageNumber="5" pageIndex={13}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <h4 className="font-bold text-slate-950 text-sm">
            2. Kekhasan / Keunggulan Madrasah
          </h4>
          <p className="indent-8 text-justify">
            Sebagai madrasah ibtidaiyah di bawah naungan LP Ma'arif NU yang mengusung nilai Kurikulum Berbasis Cinta (KBC), {data.namaMadrasah} merancang program unggulan khas yang memadukan kearifan budaya lokal, penguatan keagamaan, dan wawasan global.
          </p>

          <h5 className="font-bold text-slate-900 text-xs sm:text-[12.5px] pt-1">
            a. Program Unggulan Budaya Lokal (Tahfidzul Qur'an)
          </h5>
          <p className="text-justify">
            Program tahfidz bertujuan menanamkan kecintaan mendalam terhadap Al-Qur'an sejak usia dini dengan metode tartil dan setoran berkala.
          </p>

          <p className="font-bold text-[11.5px] text-slate-900 pt-1">
            Tabel 1.1. Program Unggulan Budaya Lokal {data.namaMadrasah}
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[11px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-2 w-16 text-center">Kelas</th>
                <th className="border border-slate-400 p-2 text-left">Target Hafalan Surat</th>
                <th className="border border-slate-400 p-2 w-32 text-center">Waktu & Metode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-2 text-center font-bold">Kelas I</td>
                <td className="border border-slate-400 p-2">
                  Hafalan Surat Pendek Juz 30 (Surat An-Nas s.d. Al-Kafirun), pengenalan makharijul huruf dan adab membaca Al-Qur'an.
                </td>
                <td className="border border-slate-400 p-2 text-center">
                  Pembiasaan pagi 15 menit & jam pelajaran PAI (Metode Talqin)
                </td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2 text-center font-bold">Kelas II</td>
                <td className="border border-slate-400 p-2">
                  Hafalan Surat Pendek Juz 30 (Surat Al-Kautsar s.d. Ad-Dhuha), penguatan tajwid dasar (Ghunnah, Mad Thabi'i).
                </td>
                <td className="border border-slate-400 p-2 text-center">
                  Setoran harian & muroja'ah klasikal
                </td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2 text-center font-bold">Kelas III</td>
                <td className="border border-slate-400 p-2">
                  Hafalan Surat Al-Lail s.d. Al-A'la, pembiasaan tartil dan pemahaman arti ringkas ayat-ayat pilihan.
                </td>
                <td className="border border-slate-400 p-2 text-center">
                  Bimbingan guru tahfidz 2x sepekan
                </td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2 text-center font-bold">Kelas IV</td>
                <td className="border border-slate-400 p-2">
                  Hafalan Surat At-Thariq s.d. Al-Infithar, penguasaan hukum nun mati/tanwin dan mim mati secara mendalam.
                </td>
                <td className="border border-slate-400 p-2 text-center">
                  Setoran mandiri & simulasi tasmi' kelas
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 14 (Hal. 6) - LANJUTAN TAHFIDZ & PROGRAM UNGGULAN GLOBAL (TIK)
          ========================================================================= */}
      <KomPageContainer pageNumber="6" pageIndex={14}>
        <div className="space-y-2.5 text-[11px] leading-relaxed">
          <p className="font-bold text-[11px] text-slate-800">
            Lanjutan Tabel 1.1 Program Unggulan Budaya Lokal {data.namaMadrasah}
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10.5px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1.5 w-16 text-center">Kelas</th>
                <th className="border border-slate-400 p-1.5 text-left">Target Hafalan Surat</th>
                <th className="border border-slate-400 p-1.5 w-32 text-center">Waktu & Metode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">Kelas V</td>
                <td className="border border-slate-400 p-1.5">
                  Hafalan Surat Al-Buruj, Al-Insyiqaq, Al-Muthaffifin, Al-Infithar, At-Takwir, 'Abasa, Doa Qunut, Ayat Kursi. Penguatan makhraj, wakaf wal ibtida', dan muroja'ah intensif 1/2 Juz 30.
                </td>
                <td className="border border-slate-400 p-1.5 text-center">
                  Muroja'ah pagi 07.00-07.30 & bimbingan guru tahfidz
                </td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1.5 text-center font-bold">Kelas VI</td>
                <td className="border border-slate-400 p-1.5">
                  Muroja'ah tuntas Juz 30 (Surat An-Nazi'at, An-Naba' s.d. An-Nas) secara mutqin, niat dan doa sesudah sholat Dhuha, Tahsin Juz 30 & Surat Al-Baqarah ayat 284-286, Ujian Tasmi' terbuka, dan Wisuda Khotmil Qur'an.
                </td>
                <td className="border border-slate-400 p-1.5 text-center">
                  Ujian Tasmi' Terbuka & Wisuda Khotmil Qur'an
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pt-1 space-y-1.5">
            <h5 className="font-bold text-slate-900 text-xs sm:text-[12px]">
              b. Program Unggulan Global (Keterampilan Teknologi Informasi)
            </h5>
            <p className="text-justify text-[11px] text-slate-800 indent-6">
              Menyiapkan peserta didik agar tangguh, cakap, dan berdaya saing di era digitalisasi Society 5.0 dan kecerdasan buatan (AI) melalui penguasaan literasi digital yang berkarakter Islami. Program ini membekali santri keterampilan aplikasi komputer perkantoran, desain grafis dakwah, logika komputasional, serta etika berinternet sehat (cyber ethics).
            </p>

            <p className="font-bold text-[11px] text-slate-900 pt-0.5">
              Tabel 1.2. Program Unggulan Global di Madrasah
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[10.5px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-14 text-center">Kelas</th>
                  <th className="border border-slate-400 p-1 text-left">Materi Keterampilan TIK</th>
                  <th className="border border-slate-400 p-1 w-28 text-center">Target Capaian</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold">Kelas I</td>
                  <td className="border border-slate-400 p-1">Pengenalan perangkat keras komputer (CPU, monitor, keyboard, mouse), prosedur menyalakan/mematikan komputer, pengenalan aplikasi Paint.</td>
                  <td className="border border-slate-400 p-1 text-center">Motorik digital</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold">Kelas II</td>
                  <td className="border border-slate-400 p-1">Menggambar kreatif, mewarnai ornamen Islami, pengenalan toolbar drawing Paint, membuat kartu ucapan hari besar Islam sederhana.</td>
                  <td className="border border-slate-400 p-1 text-center">Kreativitas visual</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold">Kelas III</td>
                  <td className="border border-slate-400 p-1">Dasar Ms Word (mengetik teks doa dan hadits pendek, pemformatan font, warna teks, perataan paragraf, penyimpanan file).</td>
                  <td className="border border-slate-400 p-1 text-center">Literasi naskah</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold">Kelas IV</td>
                  <td className="border border-slate-400 p-1">Ms Word lanjutan (penyisipan tabel, gambar, border, layout naskah rapi), pengenalan dasar Ms Excel (tabel data sederhana) dan Canva poster dakwah.</td>
                  <td className="border border-slate-400 p-1 text-center">Penyusunan tugas</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold">Kelas V</td>
                  <td className="border border-slate-400 p-1">Pengenalan CorelDraw dasar / pengolahan grafis sederhana, Ms PowerPoint presentasi multimedia, etika internet sehat & keamanan data pribadi.</td>
                  <td className="border border-slate-400 p-1 text-center">Presentasi digital</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-bold">Kelas VI</td>
                  <td className="border border-slate-400 p-1">Penguasaan terpadu Ms Office (Word, Excel, PowerPoint), penyusunan laporan mini project, pengenalan logika komputasi, algoritma dasar, dan pemanfaatan AI edukatif secara bijak.</td>
                  <td className="border border-slate-400 p-1 text-center">Komputasi & AI</td>
                </tr>
              </tbody>
            </table>

            <div className="pt-1 text-justify text-[10.5px] text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900">Strategi Pembelajaran dan Sarana TIK:</p>
              <p className="indent-6">
                Pembelajaran TIK dilaksanakan terjadwal 1 (satu) Jam Pelajaran (JP) per pekan di Laboratorium Multimedia madrasah secara praktik langsung. Pendekatan pembelajaran berbasis proyek (Project-Based Learning) diterapkan dengan mengintegrasikan tugas TIK ke dalam mata pelajaran umum dan muatan keagamaan, disertai penanaman adab bermedia digital yang santun dan bertanggung jawab.
              </p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 15 (Hal. 7) - PROGRAM ASRAMA, ADIWIYATA, PROFIL PTK
          ========================================================================= */}
      <KomPageContainer pageNumber="7" pageIndex={15}>
        <div className="space-y-2 text-[11px] leading-relaxed text-justify">
          <h5 className="font-bold text-slate-900 text-xs sm:text-[12px]">
            c. Program Unggulan Madrasah Lainnya
          </h5>

          <div className="space-y-1">
            <p className="font-bold text-slate-800 text-[11px]">
              1. Program Asrama / Pondok Pesantren Mitra
            </p>
            <p className="text-[10.5px] text-slate-700 indent-6 leading-relaxed">
              Sebagai komitmen melestarikan tradisi keilmuan Islam Ahlussunnah wal Jama'ah dan membangun kemandirian santri, {data.namaMadrasah} menjalin kemitraan sinergis dengan Pondok Pesantren As-Salafiyah / Madin. Program asrama ini dirancang untuk membiasakan amaliah ibadah praktis, penguatan akhlakul karimah, pendalaman kitab kuning salaf (turats), serta pembentukan karakter disiplin santri.
            </p>

            <p className="font-semibold text-[10.5px] text-slate-800">
              Tabel 1.3. Program Unggulan Asrama / Mitra Pesantren
            </p>
            <table className="w-full border-collapse border border-slate-400 text-[10px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-8 text-center">No</th>
                  <th className="border border-slate-400 p-1 w-44 text-left">Nama Program</th>
                  <th className="border border-slate-400 p-1 text-left">Kegiatan Utama & Materi</th>
                  <th className="border border-slate-400 p-1 w-28 text-center">Waktu Pelaksanaan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                  <td className="border border-slate-400 p-1 font-semibold">Pembiasaan 'Ubudhiyah</td>
                  <td className="border border-slate-400 p-1">Shalat fardhu berjamaah 5 waktu, wirid ratibul haddad, dzikir ba'da shalat, dan shalat dhuha.</td>
                  <td className="border border-slate-400 p-1 text-center">Setiap hari</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">2</td>
                  <td className="border border-slate-400 p-1 font-semibold">Kajian Kitab Kuning (Salaf)</td>
                  <td className="border border-slate-400 p-1">Kajian kitab Safinatun Najah, Mabadiul Fiqhiyyah, Aqidatul Awam, dan Al-Akhlaq lil Banin/Banat.</td>
                  <td className="border border-slate-400 p-1 text-center">Ba'da Maghrib s.d. Isya</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">3</td>
                  <td className="border border-slate-400 p-1 font-semibold">Tahfidz & Tahsin Al-Qur'an</td>
                  <td className="border border-slate-400 p-1">Bimbingan makharijul huruf bersanad, tadarus bersama, dan penguatan muroja'ah Juz 30.</td>
                  <td className="border border-slate-400 p-1 text-center">Ba'da Subuh</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1 font-semibold">Qiyamul Lail & Muhasabah</td>
                  <td className="border border-slate-400 p-1">Shalat Tahajud, Shalat Tasbih bersama, muhasabah malam Jum'at, dan tadris mufradat bahasa Arab.</td>
                  <td className="border border-slate-400 p-1 text-center">Malam Jum'at & Ahad</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-1 space-y-1">
            <p className="font-bold text-slate-800 text-[11px]">
              2. Program Madrasah Adiwiyata (Ramah Lingkungan Hidup)
            </p>
            <p className="text-[10.5px] text-slate-700 indent-6 leading-relaxed">
              {data.namaMadrasah} menerapkan Gerakan Peduli dan Berbudaya Lingkungan Hidup di Madrasah (PBLHM) sebagai perwujudan Islam Rahmatan lil 'Alamin. Melalui program Madrasah Adiwiyata, seluruh ekosistem madrasah berpartisipasi aktif dalam pelestarian fungsi lingkungan hidup yang mencakup 6 (enam) aspek Perilaku Ramah Lingkungan Hidup (PRLH):
            </p>

            <ul className="list-disc pl-5 space-y-0.5 text-[10px] text-slate-800">
              <li><strong>Kebersihan & Sanitasi:</strong> Piket harian, gerakan Jum'at Bersih, pemeliharaan toilet sehat dan drainase bebas jentik nyamuk.</li>
              <li><strong>Pengelolaan Sampah (3R):</strong> Pemilahan sampah organik dan anorganik, Bank Sampah Berkah, serta karya ecobrick daur ulang.</li>
              <li><strong>Penanaman & Pemeliharaan Tanaman:</strong> Gerakan satu santri satu pohon, penghijauan pekarangan, dan taman Apotek Hidup (TOGA).</li>
              <li><strong>Konservasi Air:</strong> Pembuatan sumur biopori, penampungan air hujan, dan pemanfaatan kembali air wudhu untuk menyiram kebun madrasah.</li>
              <li><strong>Konservasi Energi Listrik:</strong> Budaya hemat listrik (mematikan lampu/kipas saat ruangan kosong) dan optimalisasi ventilasi alami kelas.</li>
              <li><strong>Inovasi Ramah Lingkungan:</strong> Kampanye madrasah ramah lingkungan bebas sampah plastik (zero single-use plastic) pada kantin sehat.</li>
            </ul>

            <p className="font-semibold text-[10.5px] text-slate-800 pt-0.5">
              Tabel 1.4. Program Adiwiyata Madrasah {data.namaMadrasah}
            </p>
            <table className="w-full border-collapse border border-slate-400 text-[10px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-8 text-center">No</th>
                  <th className="border border-slate-400 p-1 w-44 text-left">Program Adiwiyata</th>
                  <th className="border border-slate-400 p-1 text-left">Sasaran & Indikator Keberhasilan Terukur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                  <td className="border border-slate-400 p-1 font-semibold">Green Madrasah & Apotek Hidup</td>
                  <td className="border border-slate-400 p-1">Pekarangan hijau tertata rapi, ketersediaan 20+ varietas tanaman obat keluarga (TOGA), dan pohon perindang rindang.</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">2</td>
                  <td className="border border-slate-400 p-1 font-semibold">Bank Sampah & 3R Berkelanjutan</td>
                  <td className="border border-slate-400 p-1">100% kelas memiliki tempat sampah terpilah (organik, anorganik, B3), reduksi sampah plastik sebesar 70%, dan operasional Bank Sampah.</td>
                </tr>
              </tbody>
            </table>

            <p className="text-[10px] text-justify text-slate-700 italic leading-relaxed pt-0.5">
              Seluruh program keunggulan di atas dievaluasi berkala setiap akhir semester melalui Rapat Evaluasi Mutu Madrasah bersama Komite Madrasah guna menjamin pencapaian Standar Kompetensi Lulusan (SKL) yang beriman, mandiri, peduli lingkungan, dan berdaya saing global sesuai sasaran KMA Nomor 450 Tahun 2024.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 16 (Hal. 8) - TABEL 1.5 DATA KUALIFIKASI PTK & ANALISIS KOMPETENSI
          ========================================================================= */}
      <KomPageContainer pageNumber="8" pageIndex={16}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[13px]">
              3. Peta Profil Pendidik, Tenaga Kependidikan, Peserta Didik dan Orang Tua di Madrasah
            </h4>
            <h5 className="font-bold text-slate-900 text-xs">
              a. Profil Pendidik dan Tenaga Kependidikan
            </h5>
            <p className="indent-8 text-[11.5px] text-justify text-slate-800 leading-relaxed">
              Pendidik dan Tenaga Kependidikan {data.namaMadrasah} memiliki kualifikasi akademik yang relevan dengan tugas profesinya. Keseluruhan guru telah berijazah Strata 1 (S1) dan berkomitmen menerapkan Kurikulum Berbasis Cinta (KBC) dan Pembelajaran Mendalam (Deep Learning) dalam setiap proses interaksi edukatif.
            </p>
          </div>

          <p className="font-bold text-[11px] text-slate-900 pt-0.5">
            Tabel 1.5. Data Kualifikasi Pendidik dan Tenaga Kependidikan Tahun Pelajaran {data.tahunAjaran}
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10.5px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1.5 text-center w-8">No</th>
                <th className="border border-slate-400 p-1.5 text-left">Nama Pendidik / Tendik</th>
                <th className="border border-slate-400 p-1.5 text-center w-24">Pendidikan</th>
                <th className="border border-slate-400 p-1.5 text-left">Jabatan / Tugas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1 font-semibold">Jaenal Maskun, S.Pd.I</td>
                <td className="border border-slate-400 p-1 text-center">S1 PAI</td>
                <td className="border border-slate-400 p-1">Guru Kelas / Bid. Kurikulum</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1 font-semibold">Yuli Setiyani, S.Pd</td>
                <td className="border border-slate-400 p-1 text-center">S1 PGSD</td>
                <td className="border border-slate-400 p-1">Guru Kelas</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">3</td>
                <td className="border border-slate-400 p-1 font-semibold">Fatkhul Mubarok, S.Pd</td>
                <td className="border border-slate-400 p-1 text-center">S1 PAI</td>
                <td className="border border-slate-400 p-1">Guru Kelas</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">4</td>
                <td className="border border-slate-400 p-1 font-semibold">Siti Rochimah, S.Pd.I</td>
                <td className="border border-slate-400 p-1 text-center">S1 PAI</td>
                <td className="border border-slate-400 p-1">Kepala Madrasah</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">5</td>
                <td className="border border-slate-400 p-1 font-semibold">Rokhimah, S.Pd</td>
                <td className="border border-slate-400 p-1 text-center">S1 PGSD</td>
                <td className="border border-slate-400 p-1">Guru Kelas</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">6</td>
                <td className="border border-slate-400 p-1 font-semibold">Siti Sapariyah, S.Pd.I</td>
                <td className="border border-slate-400 p-1 text-center">S1 PAI</td>
                <td className="border border-slate-400 p-1">Guru PAI</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">7</td>
                <td className="border border-slate-400 p-1 font-semibold">Indah Zubaidah, S.Pd</td>
                <td className="border border-slate-400 p-1 text-center">S1 PGSD</td>
                <td className="border border-slate-400 p-1">Guru Kelas</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">8</td>
                <td className="border border-slate-400 p-1 font-semibold">Saniyah, S.Pd</td>
                <td className="border border-slate-400 p-1 text-center">S1 PAI</td>
                <td className="border border-slate-400 p-1">Guru Bahasa Arab</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">9</td>
                <td className="border border-slate-400 p-1 font-semibold">Nurul Mustofa, S.Pd</td>
                <td className="border border-slate-400 p-1 text-center">S1 PAI</td>
                <td className="border border-slate-400 p-1">Tenaga Kependidikan / TU</td>
              </tr>
            </tbody>
          </table>

          <p className="text-[11px] text-justify text-slate-700 italic">
            Catatan: Distribusi tenaga pendidik dan kependidikan di atas telah memenuhi kriteria rasio kecukupan guru kelas dan guru mata pelajaran sesuai standar teknis Kementerian Agama Republik Indonesia.
          </p>

          <div className="pt-1.5 space-y-1.5">
            <h5 className="font-bold text-slate-900 text-xs">
              Program Peningkatan Kompetensi Berkelanjutan (PKB) Pendidik
            </h5>
            <p className="indent-8 text-[11px] text-justify text-slate-800 leading-relaxed">
              Dalam rangka menjaga mutu layanan pembelajaran bermakna, seluruh pendidik secara aktif diikutsertakan dalam forum Kelompok Kerja Guru (KKG), bimbingan teknis implementasi kurikulum merdeka, pelatihan pemanfaatan media digital berbasis AI edukasi, serta workshop pendampingan literasi dan numerasi yang diselenggarakan oleh Kementerian Agama Kabupaten dan Balai Diklat Keagamaan.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 17 (Hal. 9) - REKAP PESERTA DIDIK, TAMATAN & PRESTASI
          ========================================================================= */}
      <KomPageContainer pageNumber="9" pageIndex={17}>
        <div className="space-y-3.5 text-[12px] leading-relaxed">
          <div className="space-y-1.5">
            <h5 className="font-bold text-slate-900 text-xs sm:text-[12.5px]">
              b. Rekapitulasi Data Peserta Didik
            </h5>
            <p className="font-semibold text-slate-800 text-[11px]">
              1) Rekapitulasi Data Siswa Tiga Tahun Terakhir
            </p>
            <p className="text-[11px] text-slate-700">
              Tabel 1.6. Rekapitulasi Siswa Madrasah pada Tiga Tahun Terakhir
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[11px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1.5 text-center">Tahun Pelajaran</th>
                  <th className="border border-slate-400 p-1.5 text-center w-24">Laki-laki</th>
                  <th className="border border-slate-400 p-1.5 text-center w-24">Perempuan</th>
                  <th className="border border-slate-400 p-1.5 text-center w-24">Total Siswa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center font-semibold">2024/2025</td>
                  <td className="border border-slate-400 p-1.5 text-center">31</td>
                  <td className="border border-slate-400 p-1.5 text-center">28</td>
                  <td className="border border-slate-400 p-1.5 text-center font-bold">59</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center font-semibold">2025/2026</td>
                  <td className="border border-slate-400 p-1.5 text-center">33</td>
                  <td className="border border-slate-400 p-1.5 text-center">29</td>
                  <td className="border border-slate-400 p-1.5 text-center font-bold">62</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center font-semibold">2026/2027</td>
                  <td className="border border-slate-400 p-1.5 text-center">32</td>
                  <td className="border border-slate-400 p-1.5 text-center">29</td>
                  <td className="border border-slate-400 p-1.5 text-center font-bold">61</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5">
            <h5 className="font-bold text-slate-900 text-xs sm:text-[12.5px]">
              2) Data Tamatan Siswa Madrasah
            </h5>
            <p className="font-semibold text-slate-800 text-[11px]">
              Tabel 1.7. Rekapitulasi Tamatan Siswa Madrasah pada Tiga Tahun Terakhir
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[11px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1.5 text-center">Tahun Kelulusan</th>
                  <th className="border border-slate-400 p-1.5 text-center w-28">Jumlah Peserta</th>
                  <th className="border border-slate-400 p-1.5 text-center w-28">Jumlah Lulus</th>
                  <th className="border border-slate-400 p-1.5 text-center w-28">Persentase</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center font-semibold">2023/2024</td>
                  <td className="border border-slate-400 p-1.5 text-center">12</td>
                  <td className="border border-slate-400 p-1.5 text-center">12</td>
                  <td className="border border-slate-400 p-1.5 text-center font-bold text-emerald-800">100%</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center font-semibold">2024/2025</td>
                  <td className="border border-slate-400 p-1.5 text-center">14</td>
                  <td className="border border-slate-400 p-1.5 text-center">14</td>
                  <td className="border border-slate-400 p-1.5 text-center font-bold text-emerald-800">100%</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center font-semibold">2025/2026</td>
                  <td className="border border-slate-400 p-1.5 text-center">11</td>
                  <td className="border border-slate-400 p-1.5 text-center">11</td>
                  <td className="border border-slate-400 p-1.5 text-center font-bold text-emerald-800">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5">
            <h5 className="font-bold text-slate-900 text-xs sm:text-[12.5px]">
              3) Data Prestasi Siswa Madrasah
            </h5>
            <p className="font-semibold text-slate-800 text-[11px]">
              A. Prestasi Siswa {data.namaMadrasah}
            </p>
            <p className="text-[11px] text-slate-700">
              Tabel 1.8. Data Prestasi {data.namaMadrasah}
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[11px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1.5 w-8 text-center">No</th>
                  <th className="border border-slate-400 p-1.5 text-left">Nama Siswa</th>
                  <th className="border border-slate-400 p-1.5 text-left">Jenis Lomba / Cabang</th>
                  <th className="border border-slate-400 p-1.5 text-center w-28">Tingkat</th>
                  <th className="border border-slate-400 p-1.5 text-center w-28">Prestasi / Juara</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">1</td>
                  <td className="border border-slate-400 p-1.5 font-semibold">Aqila</td>
                  <td className="border border-slate-400 p-1.5">Tahfidz Juz 30</td>
                  <td className="border border-slate-400 p-1.5 text-center">Kecamatan</td>
                  <td className="border border-slate-400 p-1.5 text-center font-bold">Juara Ke 2</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">2</td>
                  <td className="border border-slate-400 p-1.5 font-semibold">M. Rizky Pratama</td>
                  <td className="border border-slate-400 p-1.5">Lomba MTQ PAI</td>
                  <td className="border border-slate-400 p-1.5 text-center">Kecamatan</td>
                  <td className="border border-slate-400 p-1.5 text-center font-bold">Juara Ke 3</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">3</td>
                  <td className="border border-slate-400 p-1.5 font-semibold">Tim Rebana Madrasah</td>
                  <td className="border border-slate-400 p-1.5">Festival Seni Santri</td>
                  <td className="border border-slate-400 p-1.5 text-center">Kabupaten</td>
                  <td className="border border-slate-400 p-1.5 text-center font-bold">Harapan I</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 18 (Hal. 10) - TABEL 1.9 REKAP SISWA ROMBEL & TABEL 1.10/1.11 ORTU
          ========================================================================= */}
      <KomPageContainer pageNumber="10" pageIndex={18}>
        <div className="space-y-3.5 text-[12px] leading-relaxed">
          <div className="space-y-1.5">
            <h5 className="font-bold text-slate-900 text-xs sm:text-[12.5px]">
              b Rekapitulasi Data Siswa Tahun Pelajaran {data.tahunAjaran}
            </h5>
            <p className="font-semibold text-slate-800 text-[11px]">
              Tabel 1.9. Rekapitulasi Siswa {data.namaMadrasah} Berdasarkan Rombongan Belajar
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[11px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1.5 text-center w-16">Kelas</th>
                  <th className="border border-slate-400 p-1.5 text-center w-24">Laki-laki</th>
                  <th className="border border-slate-400 p-1.5 text-center w-24">Perempuan</th>
                  <th className="border border-slate-400 p-1.5 text-center w-24">Jumlah</th>
                  <th className="border border-slate-400 p-1.5 text-center w-24">Rombel</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-semibold">Kelas I</td>
                  <td className="border border-slate-400 p-1 text-center">6</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center font-bold">11</td>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-semibold">Kelas II</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center">6</td>
                  <td className="border border-slate-400 p-1 text-center font-bold">11</td>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-semibold">Kelas III</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1 text-center font-bold">9</td>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-semibold">Kelas IV</td>
                  <td className="border border-slate-400 p-1 text-center">6</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center font-bold">11</td>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-semibold">Kelas V</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1 text-center font-bold">9</td>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center font-semibold">Kelas VI</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 text-center font-bold">10</td>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="border border-slate-400 p-1.5 text-center">TOTAL</td>
                  <td className="border border-slate-400 p-1.5 text-center">32</td>
                  <td className="border border-slate-400 p-1.5 text-center">29</td>
                  <td className="border border-slate-400 p-1.5 text-center">61</td>
                  <td className="border border-slate-400 p-1.5 text-center">6</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5">
            <h5 className="font-bold text-slate-900 text-xs sm:text-[12.5px]">
              c. Rekapitulasi Data Orang Tua Siswa
            </h5>
            <p className="font-semibold text-slate-800 text-[11px]">
              1) Rekapitulasi Data Orang Tua Siswa Berdasarkan Pendidikan Formal Terakhir
            </p>
            <p className="text-[11px] text-slate-700">
              Tabel 1.10. Rekapitulasi Data Orang Tua Siswa Berdasarkan Pendidikan Formal
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[11px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1.5 w-10 text-center">No</th>
                  <th className="border border-slate-400 p-1.5 text-left">Pendidikan Formal Terakhir</th>
                  <th className="border border-slate-400 p-1.5 text-center w-32">Jumlah Orang Tua</th>
                  <th className="border border-slate-400 p-1.5 text-center w-28">Persentase</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">1</td>
                  <td className="border border-slate-400 p-1.5">SD / Sederajat</td>
                  <td className="border border-slate-400 p-1.5 text-center">21</td>
                  <td className="border border-slate-400 p-1.5 text-center">34.4%</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">2</td>
                  <td className="border border-slate-400 p-1.5">SMP / MTs / Sederajat</td>
                  <td className="border border-slate-400 p-1.5 text-center">20</td>
                  <td className="border border-slate-400 p-1.5 text-center">32.8%</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">3</td>
                  <td className="border border-slate-400 p-1.5">SMA / MA / SMK</td>
                  <td className="border border-slate-400 p-1.5 text-center">17</td>
                  <td className="border border-slate-400 p-1.5 text-center">27.9%</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">4</td>
                  <td className="border border-slate-400 p-1.5">Sarjana (S1 / D4)</td>
                  <td className="border border-slate-400 p-1.5 text-center">3</td>
                  <td className="border border-slate-400 p-1.5 text-center">4.9%</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="border border-slate-400 p-1.5 text-center" colSpan={2}>JUMLAH TOTAL</td>
                  <td className="border border-slate-400 p-1.5 text-center">61</td>
                  <td className="border border-slate-400 p-1.5 text-center">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5">
            <p className="font-semibold text-slate-800 text-[11px]">
              2) Rekapitulasi Data Orang Tua Siswa Berdasarkan Pekerjaan
            </p>
            <p className="text-[11px] text-slate-700">
              Tabel 1.11. Rekapitulasi Data Orang Tua Siswa Berdasarkan Pekerjaan
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[11px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1.5 w-10 text-center">No</th>
                  <th className="border border-slate-400 p-1.5 text-left">Jenis Pekerjaan</th>
                  <th className="border border-slate-400 p-1.5 text-center w-32">Jumlah Orang Tua</th>
                  <th className="border border-slate-400 p-1.5 text-center w-28">Persentase</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">1</td>
                  <td className="border border-slate-400 p-1.5">PNS / TNI / POLRI</td>
                  <td className="border border-slate-400 p-1.5 text-center">0</td>
                  <td className="border border-slate-400 p-1.5 text-center">0.0%</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">2</td>
                  <td className="border border-slate-400 p-1.5">Petani / Peternak</td>
                  <td className="border border-slate-400 p-1.5 text-center">45</td>
                  <td className="border border-slate-400 p-1.5 text-center">73.8%</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1.5 text-center">3</td>
                  <td className="border border-slate-400 p-1.5">Buruh Harian Lepas / Pedagang / Lainnya</td>
                  <td className="border border-slate-400 p-1.5 text-center">16</td>
                  <td className="border border-slate-400 p-1.5 text-center">26.2%</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="border border-slate-400 p-1.5 text-center" colSpan={2}>JUMLAH TOTAL</td>
                  <td className="border border-slate-400 p-1.5 text-center">61</td>
                  <td className="border border-slate-400 p-1.5 text-center">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 19 (Hal. 11) - KEMITRAAN & LANDASAN HUKUM (1 s.d. 8)
          ========================================================================= */}
      <KomPageContainer pageNumber="11" pageIndex={19}>
        <div className="space-y-3.5 text-[12px] leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[13px]">
              4. Kemitraan / Kerjasama Madrasah dengan Pihak Lain
            </h4>
            <div className="space-y-2 text-justify text-[11.5px] text-slate-800">
              <p>
                <strong>a. Kemitraan Pemerintahan:</strong> Bekerja sama secara aktif dengan Puskesmas Rawalo dalam pemeriksaan kesehatan berkala, skrining gigi anak, imunisasi BIAS, penyuluhan gizi seimbang serta pembinaan UKS; bekerja sama dengan Polsek Rawalo dan Koramil Rawalo dalam pembinaan ketertiban, kedisiplinan baris-berbaris, serta pencegahan perundungan (anti-bullying); serta bermitra dengan KUA Rawalo dalam bimbingan keagamaan dasar.
              </p>
              <p>
                <strong>b. Kemitraan Non Pemerintahan:</strong> Sinergi erat dengan Ta'mir Masjid As-Salafiyah dalam pembiasaan shalat berjamaah dan peringatan hari besar Islam (PHBI); Pemerintah Desa Sanggreman dalam kegiatan sosial kemasyarakatan dan kepemudaan; Madin As-Salafiyah dalam penguatan kajian kitab kuning dan tahsin Al-Qur'an; serta Komite Madrasah dan paguyuban wali murid dalam penggalangan dana peduli yatim dan pengembangan sarana madrasah.
              </p>
            </div>
          </div>

          <div className="pt-2 space-y-2 text-justify">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm border-b border-slate-300 pb-1">
              B. Landasan Hukum Pengembangan Kurikulum Madrasah
            </h3>
            <p className="text-[11px] text-slate-700 indent-6">
              Pengembangan Kurikulum Operasional Madrasah (KOM) {data.namaMadrasah} berlandaskan pada peraturan perundang-undangan Republik Indonesia dan pedoman teknis kementerian terkait sebagai berikut:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-800 text-[11px]">
              <li>
                Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional (Lembaran Negara Republik Indonesia Tahun 2003 Nomor 78, Tambahan Lembaran Negara Republik Indonesia Nomor 4301);
              </li>
              <li>
                Undang-Undang Nomor 14 Tahun 2005 tentang Guru dan Dosen (Lembaran Negara Republik Indonesia Tahun 2005 Nomor 157, Tambahan Lembaran Negara Republik Indonesia Nomor 4586);
              </li>
              <li>
                Peraturan Pemerintah Nomor 19 Tahun 2005 tentang Standar Nasional Pendidikan sebagaimana telah beberapa kali diubah terakhir dengan Peraturan Pemerintah Nomor 57 Tahun 2021 tentang Standar Nasional Pendidikan;
              </li>
              <li>
                Peraturan Pemerintah Nomor 4 Tahun 2022 tentang Perubahan Atas Peraturan Pemerintah Nomor 57 Tahun 2021 tentang Standar Nasional Pendidikan;
              </li>
              <li>
                Peraturan Menteri Agama Nomor 90 Tahun 2013 tentang Penyelenggaraan Pendidikan Madrasah sebagaimana telah beberapa kali diubah terakhir dengan Peraturan Menteri Agama Nomor 60 Tahun 2015;
              </li>
              <li>
                Peraturan Menteri Agama Nomor 42 Tahun 2016 tentang Organisasi dan Tata Kerja Kementerian Agama;
              </li>
              <li>
                Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 5 Tahun 2022 tentang Standar Kompetensi Lulusan pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah;
              </li>
              <li>
                Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 7 Tahun 2022 tentang Standar Isi pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah;
              </li>
            </ol>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 20 (Hal. 12) - LANDASAN HUKUM LENGKAP LANJUTAN (9 s.d. 30)
          ========================================================================= */}
      <KomPageContainer pageNumber="12" pageIndex={20}>
        <div className="space-y-2 text-[10.5px] leading-relaxed text-justify">
          <p className="font-semibold text-slate-800 text-[11px] mb-1">
            Landasan Hukum Pengembangan Kurikulum (Lanjutan):
          </p>
          <ol start={9} className="list-decimal pl-5 space-y-1 text-slate-800">
            <li>Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 16 Tahun 2022 tentang Standar Proses pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah;</li>
            <li>Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 21 Tahun 2022 tentang Standar Penilaian Pendidikan pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah;</li>
            <li>Keputusan Menteri Agama Nomor 183 Tahun 2019 tentang Kurikulum Pendidikan Agama Islam dan Bahasa Arab pada Madrasah;</li>
            <li>Keputusan Menteri Agama Nomor 184 Tahun 2019 tentang Pedoman Implementasi Kurikulum pada Madrasah;</li>
            <li>Keputusan Menteri Agama Nomor 347 Tahun 2022 tentang Pedoman Implementasi Kurikulum Merdeka pada Madrasah;</li>
            <li>Keputusan Menteri Agama Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Raudhatul Athfal, Madrasah Ibtidaiyah, Madrasah Tsanawiyah, Madrasah Aliyah, dan Madrasah Aliyah Kejuruan;</li>
            <li>Keputusan Menteri Pendidikan Dasar dan Menengah Republik Indonesia Nomor 10 Tahun 2025 tentang Standar Kompetensi Lulusan;</li>
            <li>Keputusan Direktur Jenderal Pendidikan Islam Nomor 2762 Tahun 2023 tentang Panduan Pengembangan Kurikulum Operasional Madrasah (KOM);</li>
            <li>Keputusan Direktur Jenderal Pendidikan Islam Nomor 3211 Tahun 2022 tentang Capaian Pembelajaran PAI dan Bahasa Arab Kurikulum Merdeka pada Madrasah;</li>
            <li>Keputusan Kepala BSKAP Kemendikbudristek Nomor 032/H/KR/2024 tentang Capaian Pembelajaran pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah;</li>
            <li>Keputusan Menteri Agama Nomor 1503 Tahun 2025 tentang Penguatan Kurikulum Nasional, Pembelajaran Mendalam (Deep Learning), dan Kurikulum Berbasis Cinta pada Madrasah;</li>
            <li>Keputusan Direktur Jenderal Pendidikan Islam Nomor 9941 Tahun 2025 tentang Capaian Pembelajaran Pendidikan Agama Islam dan Bahasa Arab pada Madrasah;</li>
            <li>Peraturan Daerah Provinsi Jawa Tengah Nomor 9 Tahun 2012 tentang Bahasa, Sastra, dan Aksara Jawa;</li>
            <li>Surat Edaran Dirjen Pendidikan Islam Kemenag RI tentang Pelaksanaan Kalender Pendidikan Madrasah Tahun Pelajaran {data.tahunAjaran};</li>
            <li>Pedoman Teknis LP Ma’arif NU Pusat tentang Standar Penyelenggaraan Satuan Pendidikan Ma’arif NU;</li>
            <li>Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Lembaga Pendidikan Ma’arif NU;</li>
            <li>Rencana Strategis (Renstra) Kementerian Agama Kabupaten {data.kabupaten};</li>
            <li>Surat Keputusan Kepala {data.namaMadrasah} tentang Pembentukan Tim Pengembang Kurikulum Madrasah (TPKM) Tahun Pelajaran {data.tahunAjaran};</li>
            <li>Hasil Rapat Kerja dan Evaluasi Kurikulum Bersama Komite Madrasah, Dewan Guru, dan Tokoh Masyarakat {data.namaMadrasah};</li>
            <li>Panduan Kurikulum Berbasis Cinta (KBC) dan Pembelajaran Mendalam (Deep Learning) Direktorat KSKK Madrasah Kemenag RI;</li>
            <li>Petunjuk Teknis Asesmen Madrasah Direktorat Jenderal Pendidikan Islam Kementerian Agama RI;</li>
            <li>Program Kerja Tahunan {data.namaMadrasah} Tahun Pelajaran {data.tahunAjaran}.</li>
          </ol>
          <p className="text-[10px] text-slate-600 italic pt-1 text-center">
            (Seluruh regulasi di atas menjadi dasar yuridis formal operasionalisasi pembelajaran pada BAB II s.d. BAB VI)
          </p>
        </div>
      </KomPageContainer>
    </>
  );
};
