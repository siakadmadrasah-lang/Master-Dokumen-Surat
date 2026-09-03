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
          PAGE 21 (Hal. 13) - LANDASAN HUKUM 22-30 & BAB II VISI
          ========================================================================= */}
      <KomPageContainer pageNumber="13" pageIndex={21}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <ol start={22} className="list-decimal pl-5 space-y-1 text-slate-800 text-[11px]">
            <li>Surat Edaran Dirjen Pendidikan Islam Kemenag RI tentang Pelaksanaan Kalender Pendidikan Madrasah Tahun Pelajaran 2026/2027;</li>
            <li>Pedoman Teknis LP Ma’arif NU Pusat tentang Standar Penyelenggaraan Satuan Pendidikan Ma’arif NU;</li>
            <li>Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Lembaga Pendidikan Ma’arif NU;</li>
            <li>Rencana Strategis (Renstra) Kementerian Agama Kabupaten {data.kabupaten};</li>
            <li>Surat Keputusan Kepala {data.namaMadrasah} tentang Pembentukan Tim Pengembang Kurikulum Madrasah (TPKM) Tahun Pelajaran {data.tahunAjaran};</li>
            <li>Hasil Rapat Kerja dan Evaluasi Kurikulum Bersama Komite Madrasah, Dewan Guru, dan Tokoh Masyarakat {data.namaMadrasah};</li>
            <li>Panduan Kurikulum Berbasis Cinta (KBC) dan Pembelajaran Mendalam (Deep Learning) Direktorat KSKK Madrasah Kemenag RI;</li>
            <li>Petunjuk Teknis Asesmen Madrasah Direktorat Jenderal Pendidikan Islam Kementerian Agama RI;</li>
            <li>Program Kerja Tahunan {data.namaMadrasah} Tahun Pelajaran {data.tahunAjaran}.</li>
          </ol>

          <div id="kom-cinta-bab2" className="text-center pt-4 pb-2 border-b border-slate-300">
            <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
              BAB II<br />VISI, MISI, TUJUAN, SERTA TARGET PENDIDIKAN DI MADRASAH
            </h2>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-bold text-slate-950 text-sm">
              A. Visi {data.namaMadrasah}
            </h3>
            <div className="bg-emerald-50/70 border-l-4 border-emerald-700 p-4 rounded-r-lg my-2">
              <p className="text-sm font-bold text-emerald-950 text-center font-serif tracking-wide leading-relaxed">
                "{data.visi}"
              </p>
              <p className="text-xs font-semibold text-emerald-800 text-center mt-1">
                (Motto: {data.motto})
              </p>
            </div>
            <p className="indent-8 text-[11.5px]">
              Visi tersebut mencerminkan komitmen mendalam madrasah untuk melahirkan insan kamil yang berakar kuat pada nilai spiritualitas tauhid, memiliki kemandirian hidup, unggul dalam kompetisi prestasi, peduli kelestarian semesta, serta adaptif dan piawai dalam memanfaatkan lompatan teknologi modern demi kemaslahatan umat.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 22 (Hal. 14) - INDIKATOR VISI, MISI, TUJUAN
          ========================================================================= */}
      <KomPageContainer pageNumber="14" pageIndex={22}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
            Indikator Visi:
          </h4>
          <ol className="list-alpha pl-5 space-y-1 text-slate-800 text-[11.5px]">
            <li>Terwujudnya pembiasaan ibadah harian yang tertib, khusyuk, dan ikhlas.</li>
            <li>Terbentuknya pribadi santri yang mandiri, percaya diri, dan berintegritas.</li>
            <li>Tercapainya prestasi akademik dan non-akademik di tingkat kecamatan, kabupaten, hingga nasional.</li>
            <li>Terciptanya lingkungan madrasah yang hijau, asri, bersih, sehat, dan ramah anak.</li>
            <li>Tercapainya penguasaan dasar-dasar teknologi informasi, literasi digital yang beretika, dan kecakapan abad 21.</li>
            <li>Terinternalisasinya budaya kasih sayang, empati, dan saling menghargai (Kurikulum Berbasis Cinta).</li>
            <li>Terwujudnya moderasi beragama dalam bingkai Islam Rahmatan lil 'Alamin dan komitmen kebangsaan.</li>
          </ol>

          <div className="pt-2 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">
              B. Misi {data.namaMadrasah}
            </h3>
            <ol className="list-decimal pl-5 space-y-1 text-slate-800 text-[11.5px]">
              <li>Menyelenggarakan tata kelola pembelajaran yang mengintegrasikan nilai keimanan, ketakwaan, dan akhlakul karimah.</li>
              <li>Mengembangkan kemandirian peserta didik melalui pembelajaran aktif, reflektif, dan bermakna (Deep Learning).</li>
              <li>Meningkatkan prestasi akademik dan non-akademik melalui bimbingan intensif dan program unggulan tahfidz.</li>
              <li>Mewujudkan madrasah adiwiyata yang peduli terhadap pelestarian lingkungan dan budaya hemat energi.</li>
              <li>Mengembangkan kecakapan teknologi informasi dan komunikasi (TIK) secara etis, produktif, dan inovatif.</li>
              <li>Menerapkan prinsip Kurikulum Berbasis Cinta (KBC) untuk menjamin rasa aman, bahagia, dan bebas dari perundungan.</li>
              <li>Meneguhkan paham Ahlussunnah wal Jama'ah An-Nahdliyyah serta cinta tanah air dan persaudaraan sesama.</li>
            </ol>
          </div>

          <div className="pt-2 space-y-1.5">
            <h3 className="font-bold text-slate-950 text-sm">
              C. Tujuan Madrasah
            </h3>
            <p className="text-[11.5px]">
              Dalam kurun waktu empat tahun ke depan, {data.namaMadrasah} menetapkan tujuan strategis:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-800 text-[11.5px]">
              <li>Mencapai kelulusan 100% dengan rata-rata nilai kompetensi yang meningkat setiap tahunnya.</li>
              <li>Seluruh siswa kelas I s.d. VI mampu membaca Al-Qur'an secara tartil dan menguasai tahfidz Juz 30.</li>
              <li>Terlaksananya ibadah wajib dan sunnah (shalat dhuha, dzuhur berjamaah) secara istiqamah.</li>
              <li>Siswa mampu mengoperasikan komputer dan perangkat digital secara bijak untuk mendukung pembelajaran.</li>
              <li>Menjuarai minimal 3 cabang perlombaan tingkat kecamatan dan kabupaten setiap tahun ajaran.</li>
              <li>Terwujudnya budaya madrasah ramah anak dengan zero toleransi terhadap kekerasan dan perundungan.</li>
              <li>Terwujudnya predikat Madrasah Adiwiyata Tingkat Kabupaten.</li>
            </ol>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 23 (Hal. 15) - TUJUAN LANJUTAN & TARGET MADRASAH 1 s.d. 5
          ========================================================================= */}
      <KomPageContainer pageNumber="15" pageIndex={23}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <ol start={8} className="list-decimal pl-5 space-y-1 text-slate-800 text-[11.5px]">
            <li>Menghasilkan lulusan yang diterima di jenjang MTs/SMP unggulan dan pondok pesantren terkemuka.</li>
          </ol>

          <div className="pt-2 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">
              D. Target Madrasah
            </h3>
            <p className="text-[11.5px]">
              Target mutu madrasah dijabarkan berdasarkan 8 (delapan) Standar Nasional Pendidikan (SNP):
            </p>

            <div className="space-y-2 text-[11.5px]">
              <div>
                <p className="font-bold text-slate-900">1. Standar Isi</p>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                  <li>Tersusunnya dokumen kurikulum operasional yang disahkan sebelum tahun pelajaran dimulai.</li>
                  <li>Pengembangan modul ajar dan perangkat pembelajaran terdokumentasi 100% oleh setiap pendidik.</li>
                  <li>Penyisipan muatan lokal bahasa jawa dan program tahfidz serta TIK pada seluruh tingkatan kelas.</li>
                  <li>Penerapan tema kokurikuler P5-RA secara kontekstual minimal 2 proyek per tahun.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-slate-900">2. Standar Proses</p>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                  <li>Pembelajaran menerapkan pendekatan mendalam (Deep Learning: mindful, meaningful, joyful).</li>
                  <li>Guru memanfaatkan media pembelajaran digital dan sumber belajar berbasis lingkungan sekitar.</li>
                  <li>Terwujudnya interaksi kelas berbasis cinta kasih, dialogis, dan menghargai keberagaman minat siswa.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-slate-900">3. Standar Kompetensi Lulusan</p>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                  <li>Pencapaian Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) tuntas minimal 85%.</li>
                  <li>Lulusan memiliki hafalan surat-surat pendek Juz 30 dan mampu mempraktikkan shalat fardhu dengan benar.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-slate-900">4. Standar Pendidik dan Tenaga Kependidikan</p>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                  <li>100% guru berkualifikasi akademik S1 yang relevan dengan mata pelajaran yang diampu.</li>
                  <li>Seluruh guru aktif dalam kegiatan KKG, pelatihan IKM, dan penguasaan platform digital kemenag.</li>
                  <li>Peningkatan jumlah guru yang tersertifikasi pendidik profesional.</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-slate-900">5. Standar Sarana dan Prasarana</p>
                <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                  <li>Pemeliharaan berkala terhadap 6 ruang kelas agar selalu bersih, nyaman, dan layak huni.</li>
                  <li>Peningkatan koleksi buku di perpustakaan madrasah baik buku teks maupun bacaan pengayaan.</li>
                  <li>Optimalisasi fungsi laboratorium multimedia/komputer dan sarana internet madrasah.</li>
                  <li>Penyediaan tempat cuci tangan, sanitasi higienis, dan tempat sampah pilah terstandar.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 24 (Hal. 16) - TARGET LANJUTAN STANDAR 5 s.d. 8
          ========================================================================= */}
      <KomPageContainer pageNumber="16" pageIndex={24}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <ul className="list-disc pl-5 space-y-0.5 text-slate-800 text-[11.5px]">
            <li>Pengembangan taman madrasah dan green house dalam rangka program Adiwiyata.</li>
            <li>Penyediaan sarana ibadah masjid as-salafiyah yang representatif untuk pembiasaan shalat berjamaah.</li>
            <li>Peningkatan keamanan lingkungan madrasah dengan pemagaran keliling dan penataan gerbang masuk.</li>
          </ul>

          <div className="pt-2 space-y-2 text-[11.5px]">
            <div>
              <p className="font-bold text-slate-900">6. Standar Pengelolaan</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                <li>Penyusunan Rencana Kerja Madrasah (RKM) dan EDM secara partisipatif, transparan, dan akuntabel.</li>
                <li>Penerapan sistem informasi manajemen madrasah berbasis digital (EMIS, RDM, SIMPATIKA).</li>
                <li>Pelaksanaan supervisi akademik dan manajerial secara terprogram minimal dua kali dalam satu semester.</li>
                <li>Penguatan kemitraan dengan komite madrasah, alumni, yayasan, dan institusi kemasyarakatan.</li>
                <li>Penciptaan iklim kerja yang harmonis, kekeluargaan, dan berorientasi pada peningkatan mutu berkelanjutan.</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-slate-900">7. Standar Pembiayaan</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                <li>Pengelolaan dana Bantuan Operasional Sekolah (BOS) sesuai petunjuk teknis yang transparan dan tepat sasaran.</li>
                <li>Penyusunan Rencana Kegiatan dan Anggaran Madrasah (RKAM) melalui aplikasi e-RKAM secara tertib.</li>
                <li>Penggalian sumber dana swadaya masyarakat dan kemitraan filantropi yang halal dan tidak mengikat.</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-slate-900">8. Standar Penilaian Pendidikan</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                <li>Guru menerapkan prinsip asesmen komprehensif (asesmen awal, asesmen formatif, dan asesmen sumatif).</li>
                <li>Pelaksanaan penilaian harian, asesmen tengah semester, dan asesmen akhir semester yang objektif dan edukatif.</li>
                <li>Pemanfaatan aplikasi Raport Digital Madrasah (RDM) untuk pelaporan hasil belajar secara berkala kepada wali murid.</li>
                <li>Terselenggaranya program remedial dan pengayaan yang terdokumentasi rapi bagi setiap peserta didik.</li>
                <li>Pelaksanaan refleksi hasil penilaian untuk perbaikan mutu rancangan pembelajaran berikutnya.</li>
              </ul>
            </div>
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
