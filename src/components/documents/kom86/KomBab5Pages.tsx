import React from 'react';
import { KomPageContainer } from './KomPageContainer';
import { KomCintaData } from '../../../data/komCintaDefaultData';

interface Props {
  data: KomCintaData;
}

export const KomBab5Pages: React.FC<Props> = ({ data }) => {
  return (
    <>
      {/* =========================================================================
          PAGE 65 (Hal. 57) - BAB V PENDAMPINGAN
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-bab5" pageNumber="57" pageIndex={65}>
        <div className="text-center pb-4 border-b border-slate-300">
          <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
            BAB V<br />PENDAMPINGAN, EVALUASI, DAN PENGEMBANGAN PROFESIONAL
          </h2>
        </div>

        <div className="pt-4 space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            A. Pendampingan
          </h3>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              1. Pengertian dan Tujuan Pendampingan
            </h4>
            <p className="indent-8">
              Pendampingan merupakan proses pemberian bantuan teknis, pedagogis, dan psikologis secara terencana dan berkelanjutan oleh kepala madrasah, pengawas madrasah, dan guru senior kepada rekan sejawat. Pendampingan bertujuan memastikan bahwa implementasi Kurikulum Berbasis Cinta (KBC) dan strategi Pembelajaran Mendalam (<em>Deep Learning</em>) berjalan optimal, menyenangkan, dan memecahkan kendala teknis di lapangan.
            </p>

            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1">
              2. Bentuk dan Pendekatan Pendampingan
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-800 text-[11.5px]">
              <li>
                <strong>Mentoring:</strong> Proses pendampingan di mana guru senior yang lebih berpengalaman berbagi wawasan, modul ajar, dan strategi manajemen kelas penuh kasih kepada guru pemula.
              </li>
              <li>
                <strong>Coaching:</strong> Dialog kemitraan yang setara untuk menggali potensi, ide-ide segar, dan refleksi mandiri guru dalam mengatasi tantangan belajar siswa di kelasnya.
              </li>
              <li>
                <strong>Peer Observation (Observasi Teman Sejawat):</strong> Kunjungan kelas antar-guru secara kolaboratif untuk saling belajar praktik baik pembelajaran, memberikan umpan balik apresiatif tanpa mencari kesalahan.
              </li>
            </ul>

            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1">
              3. Sasaran Pendampingan
            </h4>
            <p className="indent-8">
              Sasaran utama pendampingan adalah seluruh guru kelas, guru mata pelajaran PAI, guru mata pelajaran umum, serta guru muatan lokal di lingkungan {data.namaMadrasah}.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 66 (Hal. 58) - TABEL 5.1 PROGRAM PENDAMPINGAN & EVALUASI
          ========================================================================= */}
      <KomPageContainer pageNumber="58" pageIndex={66}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <p className="font-bold text-[10.5px] text-slate-900">
            Tabel 5.1. Program Pendampingan Implementasi Kurikulum Berbasis Cinta
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-6 text-center">No</th>
                <th className="border border-slate-400 p-1 text-left">Fokus Pendampingan</th>
                <th className="border border-slate-400 p-1 text-left">Bentuk Kegiatan</th>
                <th className="border border-slate-400 p-1 text-center w-24">Waktu</th>
                <th className="border border-slate-400 p-1 text-left">Pendamping</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1 font-semibold">Penyusunan Modul Ajar Berbasis Cinta</td>
                <td className="border border-slate-400 p-1">Workshop bedah CP, TP, ATP, dan modul diferensiasi</td>
                <td className="border border-slate-400 p-1 text-center">Juli (Awal TP)</td>
                <td className="border border-slate-400 p-1">Pengawas & Kepala Madrasah</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1 font-semibold">Strategi Deep Learning di Kelas</td>
                <td className="border border-slate-400 p-1">Coaching klinis dan simulasi peer teaching</td>
                <td className="border border-slate-400 p-1 text-center">Agustus - September</td>
                <td className="border border-slate-400 p-1">Guru Inti / Narasumber</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">3</td>
                <td className="border border-slate-400 p-1 font-semibold">Penyusunan Rubrik Asesmen KKTP</td>
                <td className="border border-slate-400 p-1">Focus Group Discussion (FGD) di KKG Madrasah</td>
                <td className="border border-slate-400 p-1 text-center">Oktober</td>
                <td className="border border-slate-400 p-1">Tim Pengembang Kurikulum</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">4</td>
                <td className="border border-slate-400 p-1 font-semibold">Fasilitasi Projek P5-RA</td>
                <td className="border border-slate-400 p-1">Mentoring tim fasilitator projek dan gelar karya</td>
                <td className="border border-slate-400 p-1 text-center">November & April</td>
                <td className="border border-slate-400 p-1">Koordinator Projek P5-RA</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-2 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">
              B. Evaluasi Kurikulum Madrasah
            </h3>
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              1. Evaluasi Pembelajaran
            </h4>
            <p className="indent-8 text-justify text-[11.5px]">
              Evaluasi pembelajaran dilakukan secara periodik untuk mengukur efektivitas interaksi guru-siswa, ketercapaian tujuan pembelajaran, dan kenyamanan iklim kelas santri. Evaluasi meliputi: (a) Evaluasi harian oleh masing-masing guru, (b) Evaluasi tengah semester bersama kepala madrasah, dan (c) Evaluasi akhir semester melalui analisis hasil Raport Digital Madrasah.
            </p>

            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1">
              2. Evaluasi Kurikulum Operasional Madrasah (Tahunan)
            </h4>
            <p className="indent-8 text-justify text-[11.5px]">
              Dilaksanakan pada setiap akhir tahun pelajaran oleh Tim Pengembang Kurikulum Madrasah (TPKM) dengan melibatkan komite madrasah, perwakilan wali murid, dan pengawas pembina.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 67 (Hal. 59) - INSTRUMEN DATA EVALUASI & TABEL 5.2 MATRIKS EVALUASI
          ========================================================================= */}
      <KomPageContainer pageNumber="57" pageIndex={67}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
            3. Instrumen dan Sumber Data Evaluasi
          </h4>
          <p className="indent-8 text-[11.5px]">
            Evaluasi didasarkan pada data empiris yang valid, antara lain: lembar instrumen supervisi akademik kepala madrasah, hasil Asesmen Kompetensi Madrasah Indonesia (AKMI), nilai Asesmen Nasional (ANBK), rekapitulasi capaian RDM, angket kepuasan wali murid terhadap iklim madrasah ramah anak, dan catatan anekdot bimbingan konseling.
          </p>

          <p className="font-bold text-[10.5px] text-slate-900 pt-1">
            Tabel 5.2. Matriks Evaluasi Kurikulum Operasional {data.namaMadrasah}
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-24 text-left">Komponen</th>
                <th className="border border-slate-400 p-1 text-left">Fokus Evaluasi</th>
                <th className="border border-slate-400 p-1 text-left">Metode / Sumber Data</th>
                <th className="border border-slate-400 p-1 text-center w-24">Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Visi, Misi, Tujuan</td>
                <td className="border border-slate-400 p-1">Relevansi visi dengan perkembangan zaman dan harapan masyarakat desa</td>
                <td className="border border-slate-400 p-1">Musyawarah kerja TPKM bersama komite & yayasan</td>
                <td className="border border-slate-400 p-1 text-center">4-5 tahun sekali / berkala</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Pengorganisasian Pembelajaran</td>
                <td className="border border-slate-400 p-1">Kesesuaian beban JP, struktur mapel, efektivitas P5-RA, dan peminat ekstra</td>
                <td className="border border-slate-400 p-1">Rapat koordinasi dewan guru & angket siswa</td>
                <td className="border border-slate-400 p-1 text-center">Tiap akhir semester</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Rencana Pembelajaran</td>
                <td className="border border-slate-400 p-1">Kualitas modul ajar, penerapan pilar deep learning, asesmen autentik</td>
                <td className="border border-slate-400 p-1">Supervisi akademik & telaah dokumen modul ajar</td>
                <td className="border border-slate-400 p-1 text-center">Setiap bulan / triwulan</td>
              </tr>
            </tbody>
          </table>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 68 (Hal. 60) - TABEL 5.2 LANJUTAN & PENGEMBANGAN PROFESIONAL
          ========================================================================= */}
      <KomPageContainer pageNumber="60" pageIndex={68}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="font-bold text-[10.5px] text-slate-800">
            Lanjutan Tabel 5.2 Matriks Evaluasi Kurikulum
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-24 text-left">Komponen</th>
                <th className="border border-slate-400 p-1 text-left">Fokus Evaluasi</th>
                <th className="border border-slate-400 p-1 text-left">Metode / Sumber Data</th>
                <th className="border border-slate-400 p-1 text-center w-24">Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Pendampingan & PKB</td>
                <td className="border border-slate-400 p-1">Dampak pelatihan terhadap perubahan perilaku mengajar di kelas</td>
                <td className="border border-slate-400 p-1">Observasi kelas pasca-pelatihan & laporan refleksi guru</td>
                <td className="border border-slate-400 p-1 text-center">Akhir tahun ajaran</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Iklim & Budaya Madrasah</td>
                <td className="border border-slate-400 p-1">Penurunan insiden perundungan, kebersihan adiwiyata, keterlibatan ortu</td>
                <td className="border border-slate-400 p-1">Survei lingkungan belajar & catatan pengaduan komite</td>
                <td className="border border-slate-400 p-1 text-center">Tiap semester</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-2 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">
              C. Pengembangan Profesional Guru dan Tenaga Kependidikan
            </h3>
            <p className="indent-8 text-[11.5px]">
              Madrasah berkomitmen meningkatkan kompetensi pedagogik, profesional, sosial, dan kepribadian pendidik melalui:
            </p>

            <div className="space-y-1.5 text-[11.5px]">
              <p>
                <strong>1. Program Rutin KKG (Kelompok Kerja Guru):</strong> Guru aktif mengikuti pertemuan KKG MI Kecamatan Jatilawang setiap bulan untuk berbagi perangkat ajar, kisi-kisi soal, dan inovasi media IT.
              </p>
              <p>
                <strong>2. Workshop dan Bimbingan Teknis:</strong> Mengikutsertakan guru dalam pelatihan kurikulum berbasis cinta, pembelajaran berdiferensiasi, penanganan anak inklusi, dan bimbingan konseling dasar.
              </p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 69 (Hal. 61) - PELATIHAN MANDIRI & TABEL 5.3 RENCANA PKB
          ========================================================================= */}
      <KomPageContainer pageNumber="61" pageIndex={69}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <div className="space-y-1.5 text-[11.5px]">
            <p>
              <strong>3. Pelatihan Mandiri (Platform Pintar Kemenag & MOOC):</strong> Seluruh guru diwajibkan menyelesaikan kursus daring bersertifikat pada platform resmi Kementerian Agama RI secara mandiri.
            </p>
            <p>
              <strong>4. Studi Tiru dan Best Practice:</strong> Kunjungan silaturahmi ke madrasah rujukan berprestasi untuk mengadopsi sistem manajemen madrasah berbasis cinta dan tata kelola adiwiyata.
            </p>
          </div>

          <p className="font-bold text-[10.5px] text-slate-900 pt-1">
            Tabel 5.3. Rencana Pengembangan Keprofesian Berkelanjutan (PKB) Pendidik dan Tenaga Kependidikan
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-6 text-center">No</th>
                <th className="border border-slate-400 p-1 text-left">Nama Kegiatan PKB</th>
                <th className="border border-slate-400 p-1 text-left">Sasaran</th>
                <th className="border border-slate-400 p-1 text-left">Narasumber / Penyelenggara</th>
                <th className="border border-slate-400 p-1 text-center w-24">Jadwal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1 font-semibold">Pelatihan Metodologi Deep Learning</td>
                <td className="border border-slate-400 p-1">Semua Guru Kelas & Mapel</td>
                <td className="border border-slate-400 p-1">Instruktur Nasional Kemenag</td>
                <td className="border border-slate-400 p-1 text-center">Juli 2026</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1 font-semibold">Bimtek Pemanfaatan Canva & AI Edukasi</td>
                <td className="border border-slate-400 p-1">Guru Muda & Tenaga IT</td>
                <td className="border border-slate-400 p-1">Relawan TIK Madrasah</td>
                <td className="border border-slate-400 p-1 text-center">September 2026</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">3</td>
                <td className="border border-slate-400 p-1 font-semibold">Pelatihan Konseling Penuh Cinta (Anti-Bullying)</td>
                <td className="border border-slate-400 p-1">Seluruh Pendidik & Tendik</td>
                <td className="border border-slate-400 p-1">Psikolog Pendidikan / LP Ma'arif</td>
                <td className="border border-slate-400 p-1 text-center">November 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 70 (Hal. 62) - TABEL 5.3 LANJUTAN & MONITORING TINDAK LANJUT
          ========================================================================= */}
      <KomPageContainer pageNumber="62" pageIndex={70}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="font-bold text-[10.5px] text-slate-800">
            Lanjutan Tabel 5.3 Rencana PKB Pendidik dan Tenaga Kependidikan
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-6 text-center">No</th>
                <th className="border border-slate-400 p-1 text-left">Nama Kegiatan PKB</th>
                <th className="border border-slate-400 p-1 text-left">Sasaran</th>
                <th className="border border-slate-400 p-1 text-left">Narasumber / Penyelenggara</th>
                <th className="border border-slate-400 p-1 text-center w-24">Jadwal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 text-center">4</td>
                <td className="border border-slate-400 p-1 font-semibold">Bimtek Tata Kelola e-RKAM dan EMIS 4.0</td>
                <td className="border border-slate-400 p-1">Kepala Madrasah, Bendahara, Operator</td>
                <td className="border border-slate-400 p-1">Kankemenag Kabupaten Banyumas</td>
                <td className="border border-slate-400 p-1 text-center">Januari 2027</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">5</td>
                <td className="border border-slate-400 p-1 font-semibold">Workshop Penulisan Karya Tulis Ilmiah / PTK</td>
                <td className="border border-slate-400 p-1">Guru Sertifikasi & Guru Senior</td>
                <td className="border border-slate-400 p-1">Dosen Praktisi Universitas Mitra</td>
                <td className="border border-slate-400 p-1 text-center">Februari 2027</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-2 space-y-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              Monitoring dan Tindak Lanjut Hasil Pengembangan Profesional
            </h4>
            <p className="indent-8 text-[11.5px]">
              Kepala madrasah melakukan pemantauan berkala terhadap tindak lanjut hasil pelatihan yang diikuti oleh guru. Setiap pendidik yang telah mengikuti bimbingan teknis atau pelatihan diwajibkan melakukan pengimbasan (desiminasi ilmu) kepada rekan sejawat dalam forum KKG internal madrasah.
            </p>
            <p className="indent-8 text-[11.5px]">
              Hasil pengimbasan dan implementasi praktik baik di kelas dijadikan bahan pertimbangan dalam Penilaian Kinerja Guru (PKG) tahunan dan pemberian reward penghargaan guru berprestasi tingkat madrasah.
            </p>
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
