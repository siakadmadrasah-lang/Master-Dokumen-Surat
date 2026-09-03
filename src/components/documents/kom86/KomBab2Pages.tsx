import React from 'react';
import { KomPageContainer } from './KomPageContainer';
import { KomCintaData } from '../../../data/komCintaDefaultData';

interface Props {
  data: KomCintaData;
}

export const KomBab2Pages: React.FC<Props> = ({ data }) => {
  return (
    <>
      {/* =========================================================================
          PAGE 21 (Hal. 13) - BAB II: VISI, INDIKATOR VISI & MISI
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-bab2" pageNumber="13" pageIndex={21} className="print:break-before-page">
        <div className="space-y-3.5 text-[12px] leading-relaxed text-justify">
          <div className="text-center pb-3 border-b border-slate-300">
            <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
              BAB II<br />VISI, MISI, TUJUAN, SERTA TARGET PENDIDIKAN DI MADRASAH
            </h2>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="font-bold text-slate-950 text-sm">
              A. Visi {data.namaMadrasah}
            </h3>
            <div className="bg-emerald-50/70 border-l-4 border-emerald-700 p-3.5 rounded-r-lg my-1.5">
              <p className="text-sm font-bold text-emerald-950 text-center font-serif tracking-wide leading-relaxed">
                "{data.visi}"
              </p>
              <p className="text-xs font-semibold text-emerald-800 text-center mt-1">
                (Motto: {data.motto})
              </p>
            </div>
            <p className="indent-8 text-[11.5px] text-slate-800">
              Visi tersebut mencerminkan komitmen mendalam madrasah untuk melahirkan insan kamil yang berakar kuat pada nilai spiritualitas tauhid, memiliki kemandirian hidup, unggul dalam kompetisi prestasi, peduli kelestarian semesta, serta adaptif dan piawai dalam memanfaatkan lompatan teknologi modern demi kemaslahatan umat.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              Indikator Visi:
            </h4>
            <ol className="list-alpha pl-5 space-y-1 text-slate-800 text-[11px]">
              <li>Terwujudnya pembiasaan ibadah harian yang tertib, khusyuk, dan ikhlas.</li>
              <li>Terbentuknya pribadi santri yang mandiri, percaya diri, dan berintegritas.</li>
              <li>Tercapainya prestasi akademik dan non-akademik di tingkat kecamatan, kabupaten, hingga nasional.</li>
              <li>Terciptanya lingkungan madrasah yang hijau, asri, bersih, sehat, dan ramah anak.</li>
              <li>Tercapainya penguasaan dasar-dasar teknologi informasi, literasi digital yang beretika, dan kecakapan abad 21.</li>
              <li>Terinternalisasinya budaya kasih sayang, empati, dan saling menghargai (Kurikulum Berbasis Cinta).</li>
              <li>Terwujudnya moderasi beragama dalam bingkai Islam Rahmatan lil 'Alamin dan komitmen kebangsaan.</li>
            </ol>
          </div>

          <div className="space-y-1.5 pt-1">
            <h3 className="font-bold text-slate-950 text-sm">
              B. Misi {data.namaMadrasah}
            </h3>
            <ol className="list-decimal pl-5 space-y-1 text-slate-800 text-[11px]">
              <li>Menyelenggarakan tata kelola pembelajaran yang mengintegrasikan nilai keimanan, ketakwaan, dan akhlakul karimah.</li>
              <li>Mengembangkan kemandirian peserta didik melalui pembelajaran aktif, reflektif, dan bermakna (Deep Learning).</li>
              <li>Meningkatkan prestasi akademik dan non-akademik melalui bimbingan intensif dan program unggulan tahfidz.</li>
              <li>Mewujudkan madrasah adiwiyata yang peduli terhadap pelestarian lingkungan dan budaya hemat energi.</li>
              <li>Mengembangkan kecakapan teknologi informasi dan komunikasi (TIK) secara etis, produktif, dan inovatif.</li>
              <li>Menerapkan prinsip Kurikulum Berbasis Cinta (KBC) untuk menjamin rasa aman, bahagia, dan bebas dari perundungan.</li>
              <li>Meneguhkan paham Ahlussunnah wal Jama'ah An-Nahdliyyah serta cinta tanah air dan persaudaraan sesama.</li>
            </ol>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 22 (Hal. 14) - TUJUAN MADRASAH LENGKAP & TARGET STANDAR 1-2
          ========================================================================= */}
      <KomPageContainer pageNumber="14" pageIndex={22}>
        <div className="space-y-3.5 text-[12px] leading-relaxed text-justify">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-950 text-sm border-b border-slate-300 pb-1">
              C. Tujuan Madrasah
            </h3>
            <p className="text-[11.5px] text-slate-800">
              Dalam kurun waktu empat tahun ke depan, {data.namaMadrasah} menetapkan tujuan strategis penyelenggaraan pendidikan sebagai berikut:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-800 text-[11px]">
              <li>Mencapai tingkat kelulusan 100% dengan rata-rata nilai kompetensi akademik dan keagamaan yang meningkat secara berkelanjutan setiap tahunnya.</li>
              <li>Seluruh peserta didik kelas I s.d. VI mampu membaca Al-Qur'an secara tartil sesuai kaidah tajwid dan menguasai target hafalan juz 30 secara tuntas.</li>
              <li>Terlaksananya pembiasaan ibadah wajib dan sunnah (shalat dhuha, shalat dzuhur berjamaah, doa harian) secara istiqamah dan berkesadaran penuh.</li>
              <li>Peserta didik memiliki kecakapan digital dasar dan mampu memanfaatkan perangkat teknologi informasi secara bijak dan etis dalam pembelajaran.</li>
              <li>Mampu meraih kejuaraan minimal 3 (tiga) cabang perlombaan tingkat kecamatan dan kabupaten pada setiap tahun ajaran baik bidang sains, seni, maupun olahraga.</li>
              <li>Terwujudnya iklim madrasah ramah anak dengan prinsip zero tolerance terhadap segala bentuk kekerasan fisik, verbal, maupun perundungan digital.</li>
              <li>Terwujudnya predikat Madrasah Adiwiyata Tingkat Kabupaten Banyumas melalui pembudayaan perilaku hidup bersih, sehat, dan pelestarian lingkungan.</li>
              <li>Menghasilkan lulusan yang berakhlak mulia serta berdaya saing tinggi sehingga dapat diterima di madrasah tsanawiyah, SMP unggulan, maupun pondok pesantren pilihan.</li>
            </ol>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="font-bold text-slate-950 text-sm border-b border-slate-300 pb-1">
              D. Target Madrasah
            </h3>
            <p className="text-[11px] text-slate-700">
              Target mutu madrasah dijabarkan secara rinci berdasarkan 8 (delapan) Standar Nasional Pendidikan (SNP):
            </p>

            <div className="space-y-2 text-[11px]">
              <div>
                <p className="font-bold text-slate-900">1. Standar Isi</p>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                  <li>Tersusunnya dokumen kurikulum operasional madrasah yang telah divalidasi dan disahkan sebelum tahun pelajaran dimulai.</li>
                  <li>Pengembangan modul ajar dan perangkat kurikulum terdokumentasi 100% secara lengkap oleh setiap pendidik.</li>
                  <li>Penyisipan muatan lokal bahasa jawa, tahfidz Al-Qur'an, dan literasi teknologi informasi pada seluruh tingkatan kelas.</li>
                  <li>Penerapan tema kokurikuler P5-RA secara kontekstual minimal 2 (dua) proyek pada setiap tahun ajaran.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-slate-900">2. Standar Proses</p>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                  <li>Pembelajaran menerapkan pendekatan mendalam (Deep Learning: mindful, meaningful, and joyful learning).</li>
                  <li>Pendidik memanfaatkan media digital, bahan ajar interaktif, dan sumber belajar kontekstual berbasis potensi lingkungan madrasah.</li>
                  <li>Terwujudnya suasana kelas berbasis kasih sayang, dialogis, apresiatif, dan menghargai keragaman bakat serta gaya belajar peserta didik.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 23 (Hal. 15) - TARGET STANDAR 3, 4, & 5
          ========================================================================= */}
      <KomPageContainer pageNumber="15" pageIndex={23}>
        <div className="space-y-3.5 text-[12px] leading-relaxed text-justify">
          <div className="space-y-3 text-[11px]">
            <div>
              <p className="font-bold text-slate-900 text-xs">3. Standar Kompetensi Lulusan (SKL)</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-800 mt-1">
                <li>Pencapaian Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) tuntas minimal 85% pada seluruh mata pelajaran wajib dan muatan lokal.</li>
                <li>Lulusan memiliki hafalan surat-surat pendek Juz 30 secara mutqin dan terbiasa melaksanakan shalat fardhu dengan tata cara yang benar.</li>
                <li>Peserta didik memiliki karakter akhlakul karimah yang tercermin dalam tutur kata santun, sikap hormat kepada orang tua/guru, dan kepedulian sosial sesama.</li>
                <li>Tercapainya kecakapan berpikir kritis, kreatif, kolaboratif, dan komunikatif sesuai tuntutan keterampilan abad ke-21.</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-slate-900 text-xs">4. Standar Pendidik dan Tenaga Kependidikan (PTK)</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-800 mt-1">
                <li>100% guru berkualifikasi akademik Strata 1 (S1) yang relevan dan linier dengan bidang tugas mengajar masing-masing.</li>
                <li>Seluruh guru aktif dalam kegiatan Kelompok Kerja Guru (KKG), seminar keilmuan, dan pelatihan implementasi Kurikulum Berbasis Cinta.</li>
                <li>Peningkatan kompetensi pedagogik dan profesional guru secara berkala melalui platform pembelajaran digital Kementerian Agama RI.</li>
                <li>Peningkatan persentase guru yang memiliki sertifikasi pendidik profesional melalui program PPG.</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-slate-900 text-xs">5. Standar Sarana dan Prasarana</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-800 mt-1">
                <li>Pemeliharaan rutin terhadap 6 ruang kelas agar selalu bersih, memiliki sirkulasi udara yang baik, pencahayaan memadai, dan nyaman untuk belajar.</li>
                <li>Peningkatan kelengkapan koleksi buku perpustakaan madrasah baik buku teks utama, buku pendamping, maupun buku pengayaan keislaman.</li>
                <li>Optimalisasi fasilitas pojok baca kelas dan laboratorium multimedia/komputer untuk penguatan literasi dan numerasi siswa.</li>
                <li>Penyediaan fasilitas sanitasi yang higienis, tempat cuci tangan berair mengalir, serta pemilahan tempat sampah organik dan anorganik.</li>
                <li>Pengembangan taman hijau madrasah dan pemagaran keliling madrasah guna menjamin keamanan seluruh warga madrasah.</li>
              </ul>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 24 (Hal. 16) - TARGET STANDAR 6, 7, 8 & MUTU LULUSAN
          ========================================================================= */}
      <KomPageContainer pageNumber="16" pageIndex={24}>
        <div className="space-y-3.5 text-[12px] leading-relaxed text-justify">
          <div className="space-y-2.5 text-[11px]">
            <div>
              <p className="font-bold text-slate-900 text-xs">6. Standar Pengelolaan</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-800 mt-0.5">
                <li>Penyusunan Rencana Kerja Jangka Menengah (RKJM), Rencana Kerja Tahunan (RKT), dan Evaluasi Diri Madrasah (EDM) secara partisipatif dan transparan.</li>
                <li>Optimalisasi pemanfaatan aplikasi pengelolaan data madrasah secara terintegrasi (EMIS 4.0, SIMPATIKA, dan Raport Digital Madrasah / RDM).</li>
                <li>Pelaksanaan supervisi akademik dan manajerial secara terprogram minimal dua kali dalam satu tahun ajaran oleh Kepala Madrasah dan Pengawas.</li>
                <li>Penguatan jalinan kemitraan yang harmonis dengan Komite Madrasah, LP Ma'arif NU Banyumas, alumni, dan tokoh masyarakat sekitar.</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-slate-900 text-xs">7. Standar Pembiayaan</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-800 mt-0.5">
                <li>Pengelolaan dana Bantuan Operasional Sekolah (BOS) secara transparan, akuntabel, dan tepat waktu sesuai petunjuk teknis yang berlaku.</li>
                <li>Penyusunan dan pelaporan Rencana Kegiatan dan Anggaran Madrasah (RKAM) melalui aplikasi elektronik e-RKAM secara tertib.</li>
                <li>Pengembangan sumber penerimaan madrasah yang sah, halal, dan tidak mengikat demi pemenuhan program penunjang mutu pendidikan.</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-slate-900 text-xs">8. Standar Penilaian Pendidikan</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-800 mt-0.5">
                <li>Pendidik menyusun dan melaksanakan asesmen yang komprehensif, mencakup asesmen awal (diagnostik), asesmen formatif, dan asesmen sumatif.</li>
                <li>Pelaksanaan penilaian autentik yang mengukur aspek kognitif, afektif berbasis cinta kasih, dan psikomotorik secara seimbang.</li>
                <li>Pemanfaatan Raport Digital Madrasah (RDM) untuk penyampaian laporan capaian hasil belajar kepada orang tua/wali murid secara periodik.</li>
                <li>Pelaksanaan analisis hasil penilaian untuk dasar tindak lanjut program remedial, pengayaan, dan penyempurnaan desain pembelajaran berikutnya.</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-300">
            <h4 className="font-bold text-xs uppercase text-slate-950 text-center mb-1">
              Komitmen Target Mutu Lulusan {data.namaMadrasah}
            </h4>
            <p className="text-[11px] text-slate-700 text-center italic">
              Dengan berlandaskan pada 8 Standar Nasional Pendidikan di atas, madrasah berikrar untuk mewujudkan generasi pembelajar yang berakidah kokoh, berwawasan luas, berakhlak mulia, dan siap menyongsong masa depan dengan penuh rasa cinta dan percaya diri.
            </p>
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
