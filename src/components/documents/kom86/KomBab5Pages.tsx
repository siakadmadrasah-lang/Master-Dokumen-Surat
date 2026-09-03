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
          PAGE 1 (Hal. 43) - BAB V PENDAMPINGAN, TABEL 5.1 & EVALUASI
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-bab5" pageNumber="43" pageIndex={43}>
        <div className="text-center pb-3 border-b border-slate-300">
          <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
            BAB V<br />PENDAMPINGAN, EVALUASI, DAN PENGEMBANGAN PROFESIONAL
          </h2>
        </div>

        <div className="pt-3 space-y-2.5 text-[11.5px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
            A. Pendampingan Implementasi Kurikulum Berbasis Cinta
          </h3>
          <p className="indent-8">
            Pendampingan merupakan proses pemberian bantuan teknis, pedagogis, dan psikologis secara terencana dan berkelanjutan oleh kepala madrasah, pengawas madrasah, dan guru senior kepada rekan sejawat. Tujuannya memastikan implementasi Kurikulum Berbasis Cinta (KBC) dan strategi <em>Deep Learning</em> (Mindful, Meaningful, Joyful) terlaksana dengan konsisten.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10.5px]">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">Mentoring Penuh Kasih</p>
              <p className="text-slate-700 pt-0.5">Guru senior berbagi modul diferensiasi dan manajemen kelas damai kepada guru pemula.</p>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">Coaching Setara</p>
              <p className="text-slate-700 pt-0.5">Dialog reflektif untuk menggali potensi dan solusi kreatif menghadapi tantangan belajar santri.</p>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">Peer Observation</p>
              <p className="text-slate-700 pt-0.5">Kunjungan kelas kolaboratif antar-rekan sejawat untuk saling mengadopsi praktik baik.</p>
            </div>
          </div>

          <div className="pt-1 space-y-1">
            <p className="font-bold text-[10px] text-slate-900">
              Tabel 5.1. Program Pendampingan Implementasi Kurikulum Berbasis Cinta
            </p>
            <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
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
                  <td className="border border-slate-400 p-1 font-semibold">Penyusunan Modul Ajar KBC</td>
                  <td className="border border-slate-400 p-1">Workshop bedah CP, TP, ATP, & diferensiasi</td>
                  <td className="border border-slate-400 p-1 text-center">Juli (Awal TP)</td>
                  <td className="border border-slate-400 p-1">Pengawas & Kamad</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">2</td>
                  <td className="border border-slate-400 p-1 font-semibold">Strategi Deep Learning</td>
                  <td className="border border-slate-400 p-1">Coaching klinis dan simulasi peer teaching</td>
                  <td className="border border-slate-400 p-1 text-center">Agustus - Sept</td>
                  <td className="border border-slate-400 p-1">Guru Inti / Narasumber</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">3</td>
                  <td className="border border-slate-400 p-1 font-semibold">Rubrik Asesmen KKTP</td>
                  <td className="border border-slate-400 p-1">Focus Group Discussion (FGD) di KKG Madrasah</td>
                  <td className="border border-slate-400 p-1 text-center">Oktober</td>
                  <td className="border border-slate-400 p-1">TPKM Madrasah</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1 font-semibold">Fasilitasi Projek P5-RA</td>
                  <td className="border border-slate-400 p-1">Mentoring tim fasilitator & gelar karya</td>
                  <td className="border border-slate-400 p-1 text-center">November & April</td>
                  <td className="border border-slate-400 p-1">Koordinator Projek</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
              B. Evaluasi Kurikulum Madrasah
            </h3>
            <p className="indent-8">
              Evaluasi kurikulum dilakukan bertingkat: <strong>(1) Evaluasi Pembelajaran</strong> harian oleh guru kelas dan tengah semester bersama kepala madrasah; serta <strong>(2) Evaluasi Kurikulum Operasional Tahunan</strong> oleh TPKM dengan melibatkan komite madrasah, wali murid, dan pengawas pembina pada setiap akhir tahun pelajaran.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 2 (Hal. 44) - TABEL 5.2 MATRIKS EVALUASI KURIKULUM LENGKAP & PKB INTRO
          ========================================================================= */}
      <KomPageContainer pageNumber="44" pageIndex={44}>
        <div className="space-y-3 text-[11.5px] leading-relaxed text-justify">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12px]">
              3. Instrumen dan Sumber Data Evaluasi
            </h4>
            <p className="indent-8">
              Evaluasi didasarkan pada data empiris yang valid, antara lain: lembar supervisi akademik kepala madrasah, hasil Asesmen Kompetensi Madrasah Indonesia (AKMI), nilai ANBK, rekapitulasi capaian RDM, angket kepuasan wali murid, dan catatan observasi iklim ramah anak.
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-bold text-[10px] text-slate-900">
              Tabel 5.2. Matriks Evaluasi Kurikulum Operasional {data.namaMadrasah}
            </p>
            <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
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
                  <td className="border border-slate-400 p-1">Relevansi visi dengan perkembangan zaman dan harapan masyarakat</td>
                  <td className="border border-slate-400 p-1">Musyawarah kerja TPKM bersama komite & yayasan</td>
                  <td className="border border-slate-400 p-1 text-center">4-5 tahun / berkala</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Pengorganisasian Pembelajaran</td>
                  <td className="border border-slate-400 p-1">Kesesuaian beban JP, struktur mapel, efektivitas P5-RA & ekstra</td>
                  <td className="border border-slate-400 p-1">Rapat koordinasi dewan guru & angket santri</td>
                  <td className="border border-slate-400 p-1 text-center">Tiap akhir semester</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Rencana Pembelajaran</td>
                  <td className="border border-slate-400 p-1">Kualitas modul ajar, pilar deep learning, asesmen autentik</td>
                  <td className="border border-slate-400 p-1">Supervisi akademik & telaah dokumen modul ajar</td>
                  <td className="border border-slate-400 p-1 text-center">Setiap bulan / triwulan</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Pendampingan & PKB</td>
                  <td className="border border-slate-400 p-1">Dampak pelatihan terhadap perubahan perilaku mengajar di kelas</td>
                  <td className="border border-slate-400 p-1">Observasi kelas pasca-pelatihan & laporan guru</td>
                  <td className="border border-slate-400 p-1 text-center">Akhir tahun ajaran</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Iklim & Budaya Madrasah</td>
                  <td className="border border-slate-400 p-1">Nol perundungan, kebersihan adiwiyata, keterlibatan aktif ortu</td>
                  <td className="border border-slate-400 p-1">Survei lingkungan belajar & rekap BK</td>
                  <td className="border border-slate-400 p-1 text-center">Tiap semester</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
              C. Pengembangan Profesional Pendidik dan Tenaga Kependidikan
            </h3>
            <p className="indent-8">
              Madrasah berkomitmen meningkatkan kompetensi pedagogik, profesional, sosial, dan kepribadian seluruh pendidik melalui program terencana:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
              <div className="p-2 bg-slate-50 border border-slate-300 rounded">
                <p className="font-bold text-slate-900">1. Program Rutin KKG Kecamatan</p>
                <p className="text-slate-700 pt-0.5">Aktif dalam forum KKG MI Jatilawang setiap bulan guna menyelaraskan perangkat ajar dan media inovatif.</p>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-300 rounded">
                <p className="font-bold text-slate-900">2. Workshop & Bimbingan Teknis</p>
                <p className="text-slate-700 pt-0.5">Pelatihan berkala tentang kurikulum berbasis cinta, diferensiasi belajar, dan penanganan inklusi.</p>
              </div>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 3 (Hal. 45) - TABEL 5.3 RENCANA PKB LENGKAP & MONITORING TINDAK LANJUT
          ========================================================================= */}
      <KomPageContainer pageNumber="45" pageIndex={45}>
        <div className="space-y-3 text-[11.5px] leading-relaxed text-justify">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">3. Pelatihan Mandiri (MOOC Pintar)</p>
              <p className="text-slate-700 pt-0.5">Seluruh pendidik diwajibkan menyelesaikan kursus daring bersertifikat pada platform resmi Kemenag RI secara mandiri.</p>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">4. Studi Tiru & Best Practice</p>
              <p className="text-slate-700 pt-0.5">Kunjungan ke madrasah rujukan berprestasi untuk menimba praktik baik tata kelola madrasah cinta dan adiwiyata.</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-bold text-[10px] text-slate-900">
              Tabel 5.3. Rencana Pengembangan Keprofesian Berkelanjutan (PKB) Pendidik dan Tenaga Kependidikan
            </p>
            <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
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
                  <td className="border border-slate-400 p-1 font-semibold">Pelatihan Konseling Kasih (Anti-Bullying)</td>
                  <td className="border border-slate-400 p-1">Seluruh Pendidik & Tendik</td>
                  <td className="border border-slate-400 p-1">Psikolog Pendidikan / LP Ma'arif</td>
                  <td className="border border-slate-400 p-1 text-center">November 2026</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">4</td>
                  <td className="border border-slate-400 p-1 font-semibold">Bimtek Tata Kelola e-RKAM & EMIS 4.0</td>
                  <td className="border border-slate-400 p-1">Kamad, Bendahara, Operator</td>
                  <td className="border border-slate-400 p-1">Kankemenag Kab. Banyumas</td>
                  <td className="border border-slate-400 p-1 text-center">Januari 2027</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">5</td>
                  <td className="border border-slate-400 p-1 font-semibold">Workshop Karya Tulis Ilmiah / PTK</td>
                  <td className="border border-slate-400 p-1">Guru Sertifikasi & Guru Senior</td>
                  <td className="border border-slate-400 p-1">Dosen Praktisi Universitas Mitra</td>
                  <td className="border border-slate-400 p-1 text-center">Februari 2027</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12px]">
              Monitoring dan Tindak Lanjut Hasil Pengembangan Profesional
            </h4>
            <p className="indent-8">
              Kepala madrasah melakukan pemantauan berkala terhadap tindak lanjut hasil pelatihan yang diikuti oleh guru. Setiap pendidik yang telah mengikuti bimbingan teknis atau pelatihan diwajibkan melakukan pengimbasan (desiminasi ilmu) kepada rekan sejawat dalam forum KKG internal madrasah.
            </p>
            <p className="indent-8">
              Hasil pengimbasan dan implementasi praktik baik di kelas dijadikan bahan pertimbangan dalam Penilaian Kinerja Guru (PKG) tahunan serta apresiasi guru berprestasi tingkat madrasah.
            </p>
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
