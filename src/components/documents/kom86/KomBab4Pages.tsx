import React from 'react';
import { KomPageContainer } from './KomPageContainer';
import { KomCintaData } from '../../../data/komCintaDefaultData';

interface Props {
  data: KomCintaData;
}

export const KomBab4Pages: React.FC<Props> = ({ data }) => {
  return (
    <>
      {/* =========================================================================
          PAGE 43 (Hal. 35) - BAB IV PERENCANAAN RUANG LINGKUP SATUAN PENDIDIKAN
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-bab4" pageNumber="35" pageIndex={43}>
        <div className="text-center pb-4 border-b border-slate-300">
          <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
            BAB IV<br />PERENCANAAN PEMBELAJARAN
          </h2>
        </div>

        <div className="pt-4 space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            A. Ruang Lingkup Satuan Pendidikan
          </h3>
          <p className="indent-8">
            Perencanaan pembelajaran pada tingkat satuan pendidikan di {data.namaMadrasah} disusun secara komprehensif, terstruktur, dan berkesinambungan untuk memastikan seluruh proses pendidikan berjalan selaras dengan visi, misi, dan tujuan madrasah yang mengakar pada Kurikulum Berbasis Cinta.
          </p>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              1. Capaian Pembelajaran (CP)
            </h4>
            <p className="indent-8">
              Capaian Pembelajaran (CP) merupakan kompetensi pembelajaran yang harus dicapai peserta didik pada setiap fase perkembangan. Di madrasah, CP mata pelajaran PAI dan Bahasa Arab merujuk pada Keputusan Direktur Jenderal Pendidikan Islam, sedangkan CP mata pelajaran umum mengacu pada Keputusan Kepala BSKAP Kemendikbudristek.
            </p>

            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1">
              2. Perumusan Tujuan Pembelajaran (TP)
            </h4>
            <p className="indent-8">
              Pendidik menganalisis kompetensi dan lingkup materi pada setiap kalimat CP untuk merumuskan Tujuan Pembelajaran (TP) yang operasional, terukur, dan kontekstual dengan memasukkan nilai-nilai Panca Cinta dan profil lulusan madrasah.
            </p>

            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1">
              3. Penyusunan Alur Tujuan Pembelajaran (ATP)
            </h4>
            <p className="indent-8">
              Tujuan Pembelajaran yang telah dirumuskan kemudian diurutkan secara sistematis dan logis dalam Alur Tujuan Pembelajaran (ATP) dari fase awal hingga akhir, memperhatikan hierarki keilmuan, tingkat kesulitan, dan kesiapan kognitif santri.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 44 (Hal. 36) - RUANG LINGKUP KELAS & MODUL AJAR KBC
          ========================================================================= */}
      <KomPageContainer pageNumber="36" pageIndex={44}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
            4. Perencanaan Pembelajaran Berbasis Cinta
          </h4>
          <p className="indent-8">
            Perencanaan pembelajaran menempatkan keselamatan psikologis anak sebagai prioritas. Rencana pembelajaran memadukan olah pikir (intelektual), olah hati (spiritual), olah rasa (estetika-empati), dan olah raga (kinestetik) dalam bingkai kasih sayang guru.
          </p>

          <div className="pt-2 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">
              B. Ruang Lingkup Kelas
            </h3>
            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
              1. Modul Ajar (MA) / Rencana Pelaksanaan Pembelajaran
            </h4>
            <p className="indent-8">
              Pendidik di {data.namaMadrasah} mengembangkan Modul Ajar yang fleksibel, diferensiatif, dan kontekstual. Modul Ajar disusun untuk satu atau beberapa tujuan pembelajaran berdasarkan ATP yang telah disepakati.
            </p>

            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1">
              2. Komponen Modul Ajar Berbasis Cinta
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-800 text-[11.5px]">
              <li><strong>Identitas Modul:</strong> Nama penyusun, madrasah, fase/kelas, mata pelajaran, alokasi waktu.</li>
              <li><strong>Profil Lulusan & Panca Cinta:</strong> Dimensi profil dan nilai cinta spesifik yang disasar.</li>
              <li><strong>Sarana & Prasarana:</strong> Sumber belajar alami, media digital, dan alat peraga ramah lingkungan.</li>
              <li><strong>Target Peserta Didik:</strong> Pemetaan kesiapan santri reguler dan santri yang butuh bimbingan khusus.</li>
              <li><strong>Model Pembelajaran:</strong> Problem Based Learning, Project Based Learning, Inquiry, Discovery.</li>
            </ul>

            <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1">
              3. Komponen Inti Pembelajaran
            </h4>
            <p className="indent-8">
              Memuat Tujuan Pembelajaran, Pemahaman Bermakna (<em>meaningful</em>), Pertanyaan Pemantik berkesadaran (<em>mindful</em>), Kegiatan Pembelajaran yang menggembirakan (<em>joyful</em>), Asesmen Autentik, serta Refleksi Guru dan Peserta Didik di akhir tatap muka.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 45 (Hal. 37) - ASESMEN PEMBELAJARAN
          ========================================================================= */}
      <KomPageContainer pageNumber="37" pageIndex={45}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            C. Asesmen Pembelajaran
          </h3>
          <p className="indent-8">
            Asesmen merupakan proses pengumpulan dan pengolahan informasi untuk mengetahui kebutuhan belajar, perkembangan, dan pencapaian hasil belajar peserta didik secara holistik.
          </p>

          <div className="space-y-2 text-[11.5px]">
            <div>
              <p className="font-bold text-slate-900">1. Asesmen Awal (Diagnostik)</p>
              <p className="indent-6">
                Dilakukan di awal tahun ajaran atau sebelum memulai lingkup materi baru untuk memetakan kesiapan kognitif (pemahaman awal materi) dan non-kognitif (gaya belajar, latar belakang keluarga, minat santri).
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-900">2. Asesmen Formatif</p>
              <p className="indent-6">
                Berfungsi sebagai <em>assessment as learning</em> (penilaian sebagai proses belajar) dan <em>assessment for learning</em> (penilaian untuk perbaikan pembelajaran). Dilakukan secara kontinu selama proses belajar berlangsung melalui observasi, tanya jawab, kuis singkat, unjuk kerja, dan jurnal refleksi.
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-900">3. Asesmen Sumatif</p>
              <p className="indent-6">
                Berfungsi sebagai <em>assessment of learning</em> (penilaian atas capaian hasil belajar). Dilakukan pada akhir lingkup materi, akhir semester (SAS), dan akhir jenjang madrasah (Asesmen Madrasah).
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-900">4. Prinsip Asesmen Berbasis Cinta</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-800">
                <li><strong>Humanis:</strong> Tidak menakut-nakuti anak dengan nilai angka mati atau ancaman tinggal kelas.</li>
                <li><strong>Mendidik:</strong> Umpan balik berfokus pada kemajuan pribadi anak dan solusi perbaikan.</li>
                <li><strong>Berkeadilan:</strong> Mengakomodasi keragaman kecepatan belajar santri tanpa diskriminasi.</li>
                <li><strong>Memotivasi:</strong> Membangkitkan rasa percaya diri anak bahwa mereka mampu berkembang lebih baik.</li>
              </ul>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 46 (Hal. 38) - KKTP & TABEL 4.1 CONTOH RUBRIK
          ========================================================================= */}
      <KomPageContainer pageNumber="38" pageIndex={46}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
            5. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
          </h4>
          <p className="indent-8 text-[11.5px]">
            KKTP diturunkan langsung dari indikator tujuan pembelajaran dan tidak lagi menggunakan standar tunggal angka KKM kaku, melainkan menggunakan tiga pendekatan: (a) Pendekatan Rubrik, (b) Pendekatan Interval Nilai, dan (c) Pendekatan Deskripsi Kriteria.
          </p>

          <p className="font-bold text-[10.5px] text-slate-900 pt-1">
            Tabel 4.1. Contoh Rubrik Penilaian KKTP Berbasis Cinta Mata Pelajaran Al-Qur'an Hadis
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-28 text-left">Kriteria Asesmen</th>
                <th className="border border-slate-400 p-1 text-center">Perlu Bimbingan (0-60)</th>
                <th className="border border-slate-400 p-1 text-center">Cukup (61-75)</th>
                <th className="border border-slate-400 p-1 text-center">Baik (76-88)</th>
                <th className="border border-slate-400 p-1 text-center">Sangat Baik (89-100)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Ketepatan Makhraj & Tajwid</td>
                <td className="border border-slate-400 p-1">Belum mampu melafalkan huruf hijaiyah sesuai makhraj.</td>
                <td className="border border-slate-400 p-1">Melafalkan huruf dengan makhraj cukup tepat, tajwid belum konsisten.</td>
                <td className="border border-slate-400 p-1">Melafalkan sebagian besar huruf dengan makhraj dan tajwid yang benar.</td>
                <td className="border border-slate-400 p-1">Sangat fasih, tartil, dan konsisten menerapkan hukum tajwid.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Kelancaran Hafalan</td>
                <td className="border border-slate-400 p-1">Belum hafal ayat secara mandiri, butuh tuntunan penuh.</td>
                <td className="border border-slate-400 p-1">Hafal dengan beberapa kali bantuan guru atau kawan.</td>
                <td className="border border-slate-400 p-1">Hafal lancar dari awal hingga akhir dengan 1-2 kali jeda.</td>
                <td className="border border-slate-400 p-1">Sangat lancar, tanpa ragu, dan mutqin.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Sikap Berkesadaran (Adab)</td>
                <td className="border border-slate-400 p-1">Kurang khusyuk dan sering bercanda saat membaca Al-Qur'an.</td>
                <td className="border border-slate-400 p-1">Duduk tertib jika diingatkan oleh guru.</td>
                <td className="border border-slate-400 p-1">Menunjukkan adab membaca Al-Qur'an secara sadar dan tenang.</td>
                <td className="border border-slate-400 p-1">Sangat khusyuk, tawadhu', dan mengagungkan kalamullah.</td>
              </tr>
            </tbody>
          </table>

          <p className="text-[10.5px] italic text-slate-700 pt-1">
            Catatan Tindak Lanjut: Siswa pada kategori "Perlu Bimbingan" diberikan pendampingan tutorial sebaya dengan penuh kelembutan (tanpa rasa malu), sedangkan kategori "Sangat Baik" diarahkan menjadi tutor sebaya.
          </p>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 47 (Hal. 39) - RAPORT RDM, KENAIKAN KELAS & INTRO MODUL PROJEK
          ========================================================================= */}
      <KomPageContainer pageNumber="39" pageIndex={47}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
            6. Pelaporan Hasil Belajar (RDM)
          </h4>
          <p className="indent-8 text-[11.5px]">
            Hasil belajar dilaporkan melalui buku Raport Digital Madrasah (RDM) setiap akhir semester yang memuat deskripsi capaian kompetensi secara naratif yang mendidik, mengapresiasi kelebihan santri, dan memberikan rekomendasi pengembangan potensi diri secara jelas.
          </p>

          <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1">
            7. Mekanisme Kenaikan Kelas dan Kelulusan
          </h4>
          <div className="space-y-1.5 text-[11.5px]">
            <p className="font-bold text-slate-900">a. Kriteria Kenaikan Kelas:</p>
            <ol className="list-decimal pl-5 space-y-0.5 text-slate-800">
              <li>Menyelesaikan seluruh program pembelajaran pada dua semester di tahun ajaran bersangkutan.</li>
              <li>Memiliki nilai sikap kepribadian dan akhlakul karimah minimal kategori "Baik".</li>
              <li>Mencapai ketercapaian tujuan pembelajaran (KKTP) pada seluruh mata pelajaran esensial.</li>
              <li>Kehadiran tatap muka di kelas minimal 85% dari total hari efektif belajar madrasah.</li>
              <li>Diputuskan melalui musyawarah rapat dewan guru madrasah.</li>
            </ol>

            <p className="font-bold text-slate-900 pt-1">b. Kriteria Kelulusan:</p>
            <ol className="list-decimal pl-5 space-y-0.5 text-slate-800">
              <li>Menyelesaikan seluruh program pembelajaran dari kelas I sampai kelas VI.</li>
              <li>Memperoleh nilai sikap/perilaku minimal Baik selama di madrasah.</li>
              <li>Mengikuti Asesmen Madrasah (AM) yang diselenggarakan oleh madrasah.</li>
              <li>Telah menyelesaikan target tahfidz Al-Qur'an Juz 30.</li>
            </ol>
          </div>

          <div className="pt-2 space-y-1.5">
            <h3 className="font-bold text-slate-950 text-sm">
              D. Perencanaan Kokurikuler (Modul Projek P5-RA)
            </h3>
            <p className="indent-8 text-[11.5px]">
              Kepala madrasah membentuk Tim Fasilitator Projek yang bertugas merancang modul projek, mendampingi peserta didik, dan memfasilitasi keterlibatan orang tua dan masyarakat sekitar.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 48 (Hal. 40) - ALUR PROJEK & CONTOH MODUL AJAR PAI FASE A
          ========================================================================= */}
      <KomPageContainer pageNumber="40" pageIndex={48}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px]">
            2. Alur Pelaksanaan Projek P5-RA
          </h4>
          <ol className="list-decimal pl-5 space-y-1 text-slate-800 text-[11.5px]">
            <li><strong>Tahap Pengenalan:</strong> Membangun kesadaran santri terhadap tema projek melalui video edukasi, cerita inspiratif, dan kunjungan lapangan.</li>
            <li><strong>Tahap Kontekstualisasi:</strong> Menggali permasalahan nyata di sekitar madrasah/desa dan merumuskan rencana aksi pemecahannya.</li>
            <li><strong>Tahap Aksi:</strong> Mewujudkan solusi nyata bersama dalam bentuk karya, budidaya tanaman herbal, kampanye kebersihan, atau produk daur ulang.</li>
            <li><strong>Tahap Refleksi & Tindak Lanjut:</strong> Mengevaluasi proses aksi, merayakan keberhasilan bersama, dan menyusun komitmen pemeliharaan berkelanjutan.</li>
          </ol>

          <h4 className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1">
            3. Asesmen Projek Profil
          </h4>
          <p className="indent-8 text-[11.5px]">
            Asesmen projek berfokus pada perkembangan karakter (bukan produk akhir semata) melalui jurnal observasi guru, rubrik perkembangan dimensi profil, dan portofolio refleksi diri santri.
          </p>

          <div className="pt-2 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">
              E. Contoh Modul Ajar: PAI (Al-Qur'an Hadis Fase A Kelas I)
            </h3>
            <div className="p-2.5 bg-slate-50 border border-slate-300 rounded text-[11px] space-y-1">
              <p><strong>Mata Pelajaran:</strong> Al-Qur'an Hadis | <strong>Fase/Kelas:</strong> A / I | <strong>Alokasi Waktu:</strong> 2 x 35 Menit</p>
              <p><strong>Elemen:</strong> Al-Qur'an | <strong>Materi:</strong> Mengenal Huruf Hijaiyah Berharakat Fathah, Kasrah, Dhommah</p>
              <p><strong>Dimensi Profil:</strong> Keimanan dan Ketakwaan, Kolaborasi, Komunikasi</p>
              <p><strong>Nilai Panca Cinta:</strong> Cinta Allah dan Rasul-Nya, Cinta Ilmu</p>
              <p><strong>Tujuan Pembelajaran:</strong> Melalui permainan kartu hijaiyah ceria, peserta didik mampu melafalkan huruf hijaiyah berharakat secara tartil dengan penuh percaya diri dan senang hati.</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 49 (Hal. 41) - MODUL PAI PERTEMUAN 1
          ========================================================================= */}
      <KomPageContainer pageNumber="41" pageIndex={49}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="font-bold text-slate-900 text-xs">
            Langkah-Langkah Kegiatan Pembelajaran (Pertemuan 1):
          </p>

          <div className="space-y-2 text-[11.5px]">
            <div className="p-2 bg-emerald-50/60 border-l-4 border-emerald-600 rounded-r">
              <p className="font-bold text-emerald-950">A. Kegiatan Awal (10 Menit) - Apersepsi Penuh Cinta</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-800 text-[11px]">
                <li>Guru menyambut siswa di pintu kelas dengan senyuman hangat, salam, dan sentuhan lembut di pundak.</li>
                <li>Membuka kelas dengan doa bersama yang dipimpin oleh ketua kelas secara bergiliran.</li>
                <li>Guru menanyakan kabar perasaan siswa hari ini (<em>Mindful Check-in</em>: menempel stiker emotikon senang/sedih).</li>
                <li>Menyanyikan lagu "Tepuk Huruf Hijaiyah" bersama-sama untuk membangkitkan suasana gembira (<em>Joyful</em>).</li>
              </ul>
            </div>

            <div className="p-2 bg-blue-50/60 border-l-4 border-blue-600 rounded-r">
              <p className="font-bold text-blue-950">B. Kegiatan Inti (50 Menit) - Pembelajaran Mendalam (Deep Learning)</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-800 text-[11px]">
                <li><strong>Meaningful (Bermakna):</strong> Guru menampilkan video animasi tentang indahnya membaca Al-Qur'an dan menjelaskan bahwa setiap satu huruf yang dibaca bernilai sepuluh kebaikan dari Allah Swt.</li>
                <li><strong>Mindful (Berkesadaran):</strong> Guru mendemonstrasikan pengucapan huruf hijaiyah berharakat fathah dengan gerakan bibir yang jelas. Siswa diminta meletakkan jari di depan mulut untuk merasakan desah angin makhraj huruf secara sadar.</li>
                <li>Siswa menirukan pelafalan secara klasikal, kelompok, dan mandiri dengan bimbingan penuh kelembutan.</li>
                <li>Guru membagikan "Kartu Ceria Hijaiyah" warna-warni. Setiap siswa berpasangan saling mencocokkan huruf dan harakat.</li>
              </ul>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 50 (Hal. 42) - MODUL PAI PERTEMUAN 2
          ========================================================================= */}
      <KomPageContainer pageNumber="42" pageIndex={50}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <div className="space-y-2 text-[11.5px]">
            <div className="p-2 bg-blue-50/60 border-l-4 border-blue-600 rounded-r">
              <p className="font-bold text-blue-950">Lanjutan Kegiatan Inti (Joyful Learning):</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-800 text-[11px]">
                <li><strong>Permainan Edukatif "Kereta Hijaiyah":</strong> Siswa berbaris rapi membentuk gerbong kereta. Setiap kali guru menyebutkan huruf tertentu, gerbong yang membawa kartu tersebut melaju dengan riang.</li>
                <li>Guru memberikan pujian spesifik (misalnya: "Maa syaa Allah, makhraj huruf Jim ananda Salman sangat jernih dan fasih!") untuk membangun harga diri anak.</li>
                <li>Bagi santri yang masih tertukar melafalkan harakat, guru memberikan bimbingan individual dengan perumpamaan sederhana (fathah tersenyum lebar, kasrah tersenyum manis, dhommah membulatkan bibir).</li>
              </ul>
            </div>

            <div className="p-2 bg-amber-50/60 border-l-4 border-amber-600 rounded-r">
              <p className="font-bold text-amber-950">C. Kegiatan Penutup (10 Menit) - Refleksi & Doa</p>
              <ul className="list-disc pl-5 space-y-0.5 text-slate-800 text-[11px]">
                <li>Guru bersama siswa menyimpulkan materi yang telah dipelajari dengan riang gembira.</li>
                <li>Refleksi emosional: Siswa mengungkapkan apa yang paling disukai dari pembelajaran hari ini.</li>
                <li>Guru memberikan pesan cinta: "Mari kita baca Al-Qur'an setiap hari di rumah bersama ayah dan bunda tercinta."</li>
                <li>Menutup kelas dengan doa kafaratul majelis dan saling bersalaman dengan guru.</li>
              </ul>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 51 (Hal. 43) - MODUL PAI INSTRUMEN ASESMEN
          ========================================================================= */}
      <KomPageContainer pageNumber="43" pageIndex={51}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <p className="font-bold text-slate-900 text-xs">
            Instrumen Asesmen Formatif Modul PAI Fase A:
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-6 text-center">No</th>
                <th className="border border-slate-400 p-1 text-left">Nama Peserta Didik</th>
                <th className="border border-slate-400 p-1 text-center w-24">Makhraj Huruf</th>
                <th className="border border-slate-400 p-1 text-center w-24">Bunyi Harakat</th>
                <th className="border border-slate-400 p-1 text-center w-24">Keaktifan/Sikap</th>
                <th className="border border-slate-400 p-1 text-left">Catatan Guru</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1 font-semibold">Ahmad Fauzan</td>
                <td className="border border-slate-400 p-1 text-center text-emerald-800 font-bold">Sangat Baik</td>
                <td className="border border-slate-400 p-1 text-center text-emerald-800 font-bold">Sangat Baik</td>
                <td className="border border-slate-400 p-1 text-center">Sangat Aktif</td>
                <td className="border border-slate-400 p-1">Siap menjadi tutor sebaya kelompoknya.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1 font-semibold">Aisyah Nur Rohmah</td>
                <td className="border border-slate-400 p-1 text-center text-blue-800 font-bold">Baik</td>
                <td className="border border-slate-400 p-1 text-center text-blue-800 font-bold">Baik</td>
                <td className="border border-slate-400 p-1 text-center">Aktif & Tertib</td>
                <td className="border border-slate-400 p-1">Perlu penguatan pada harakat dhommah.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">3</td>
                <td className="border border-slate-400 p-1 font-semibold">Bilal Habibi</td>
                <td className="border border-slate-400 p-1 text-center text-amber-800 font-bold">Cukup</td>
                <td className="border border-slate-400 p-1 text-center text-amber-800 font-bold">Cukup</td>
                <td className="border border-slate-400 p-1 text-center">Cukup Aktif</td>
                <td className="border border-slate-400 p-1">Diberikan kartu huruf untuk dibawa pulang.</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-2 text-[11px] text-slate-700 italic">
            "Guru senantiasa memberikan senyuman dan kata-kata motivasi pada lembar kerja santri sebagai wujud apresiasi tulus."
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 52 (Hal. 44) - MODUL BAHASA INDONESIA FASE B
          ========================================================================= */}
      <KomPageContainer pageNumber="44" pageIndex={52}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            F. Contoh Modul Ajar: Bahasa Indonesia (Fase B Kelas IV)
          </h3>

          <div className="p-2.5 bg-slate-50 border border-slate-300 rounded text-[11px] space-y-1">
            <p><strong>Mata Pelajaran:</strong> Bahasa Indonesia | <strong>Fase/Kelas:</strong> B / IV | <strong>Alokasi Waktu:</strong> 3 x 35 Menit</p>
            <p><strong>Bab:</strong> Menulis Surat Penuh Kasih untuk Sahabat | <strong>Materi:</strong> Struktur Surat Pribadi & Kosakata Sopan</p>
            <p><strong>Dimensi Profil:</strong> Kewargaan, Kolaborasi, Komunikasi</p>
            <p><strong>Nilai Panca Cinta:</strong> Cinta Sesama, Cinta Budaya Santun</p>
            <p><strong>Tujuan Pembelajaran:</strong> Peserta didik mampu menyusun surat pribadi yang runtut dengan menggunakan ungkapan empati dan kesantunan berbahasa untuk mempererat tali silaturahmi antarteman.</p>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-950 text-xs">
              Langkah Pembelajaran:
            </h4>
            <p className="font-bold text-slate-900 text-[11.5px]">A. Kegiatan Awal (15 Menit)</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-800 text-[11px]">
              <li>Guru membuka dengan salam santun dan membaca Asmaul Husna bersama.</li>
              <li>Guru membacakan selembar "Surat Misterius dari Sahabat Jauh" yang berisi ucapan terima kasih dan doa tulus. Siswa mendengarkan dengan penuh penghayatan (<em>Mindful Listening</em>).</li>
              <li>Siswa berdiskusi singkat: bagaimana perasaanmu jika menerima surat yang manis seperti itu?</li>
            </ul>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 53 (Hal. 45) - MODUL BAHASA INDONESIA DISKUSI
          ========================================================================= */}
      <KomPageContainer pageNumber="45" pageIndex={53}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="font-bold text-slate-900 text-[11.5px]">B. Kegiatan Inti (75 Menit) - Deep Learning</p>

          <div className="space-y-2 text-[11px] text-slate-800">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">1. Telaah Struktur Surat (Meaningful):</p>
              <p>Guru mengajak siswa membedah unsur surat pribadi (tempat dan tanggal surat, salam pembuka yang ramah, paragraf pembuka yang menanyakan kabar, isi surat yang berisi curahan hati/dukungan, salam penutup, dan tanda tangan sahabat).</p>
            </div>

            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">2. Kolaborasi Lingkaran Kasih:</p>
              <p>Siswa dibagi ke dalam kelompok kecil (4-5 siswa). Setiap siswa mengambil satu gulungan nama teman sekelasnya secara acak untuk menjadi "Sahabat Rahasia" yang akan dikirimi surat cinta persahabatan.</p>
            </div>

            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">3. Menulis Draf Surat:</p>
              <p>Siswa menuliskan draf surat dengan mengingat kebaikan yang pernah dilakukan oleh teman tersebut, memberikan kata-kata penyemangat, dan meminta maaf jika pernah berbuat salah.</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 54 (Hal. 46) - MODUL BAHASA INDONESIA PRESENTASI
          ========================================================================= */}
      <KomPageContainer pageNumber="46" pageIndex={54}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <div className="space-y-2 text-[11px] text-slate-800">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">4. Menghias Amplop Surat (Joyful & Kreativitas):</p>
              <p>Siswa menghias amplop surat menggunakan pensil warna, gambar bunga, atau stiker doa berkah. Proses ini melatih sentuhan rasa seni dan ketulusan hati anak.</p>
            </div>

            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">5. Kotak Pos Madrasah Kasih Sayang:</p>
              <p>Setiap siswa memasukkan surat yang telah selesai ke dalam kotak pos kelas yang dibuat dari kardus bekas daur ulang.</p>
            </div>
          </div>

          <div className="pt-2 space-y-1 text-[11.5px]">
            <p className="font-bold text-slate-900">C. Kegiatan Penutup (15 Menit)</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-800 text-[11px]">
              <li>Guru membagikan surat kepada para pemiliknya. Suasana kelas dipenuhi kehangatan dan rasa haru gembira saat santri membaca surat dari sahabatnya.</li>
              <li>Siswa saling berpelukan dan mengucapkan terima kasih kepada sahabatnya.</li>
              <li>Guru memberikan penguatan karakter: "Perkataan yang baik dan tulisan yang menyejukkan adalah sedekah yang dicintai Allah Swt."</li>
              <li>Ditutup dengan doa bersama.</li>
            </ul>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 55 (Hal. 47) - LKPD & RUBRIK BAHASA INDONESIA
          ========================================================================= */}
      <KomPageContainer pageNumber="47" pageIndex={55}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <p className="font-bold text-slate-900 text-xs">
            Rubrik Penilaian Menulis Surat Sahabat (Bahasa Indonesia Fase B):
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-28 text-left">Aspek Penilaian</th>
                <th className="border border-slate-400 p-1 text-center">Skor 1 (Kurang)</th>
                <th className="border border-slate-400 p-1 text-center">Skor 2 (Cukup)</th>
                <th className="border border-slate-400 p-1 text-center">Skor 3 (Baik)</th>
                <th className="border border-slate-400 p-1 text-center">Skor 4 (Sangat Baik)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Kelengkapan Struktur Surat</td>
                <td className="border border-slate-400 p-1">Hanya memuat 1-2 bagian surat.</td>
                <td className="border border-slate-400 p-1">Memuat 3-4 bagian surat.</td>
                <td className="border border-slate-400 p-1">Memuat 5 bagian surat secara runtut.</td>
                <td className="border border-slate-400 p-1">Struktur lengkap, rapi, dan sistematis.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Muatan Kasih Sayang & Empati</td>
                <td className="border border-slate-400 p-1">Tidak ada ungkapan kasih sayang/empati.</td>
                <td className="border border-slate-400 p-1">Ungkapan empati kaku dan sangat singkat.</td>
                <td className="border border-slate-400 p-1">Memuat kalimat empati dan apresiasi yang tulus.</td>
                <td className="border border-slate-400 p-1">Sangat menyentuh, penuh kehangatan dan doa yang mendalam.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Penggunaan Bahasa Santun</td>
                <td className="border border-slate-400 p-1">Banyak menggunakan kata kurang pantas.</td>
                <td className="border border-slate-400 p-1">Cukup santun, tanda baca belum tepat.</td>
                <td className="border border-slate-400 p-1">Bahasa santun, ejaan sebagian besar benar.</td>
                <td className="border border-slate-400 p-1">Bahasa sangat santun, ejaan dan tanda baca sempurna.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 56 (Hal. 48) - MODUL MATEMATIKA FASE B
          ========================================================================= */}
      <KomPageContainer pageNumber="48" pageIndex={56}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            G. Contoh Modul Ajar: Matematika (Fase B Kelas IV)
          </h3>

          <div className="p-2.5 bg-slate-50 border border-slate-300 rounded text-[11px] space-y-1">
            <p><strong>Mata Pelajaran:</strong> Matematika | <strong>Fase/Kelas:</strong> B / IV | <strong>Alokasi Waktu:</strong> 2 x 35 Menit</p>
            <p><strong>Materi Pokok:</strong> Pecahan Senilai melalui Konsep Berbagi Rezeki</p>
            <p><strong>Dimensi Profil:</strong> Penalaran Kritis, Kolaborasi, Kemandirian</p>
            <p><strong>Nilai Panca Cinta:</strong> Cinta Sesama, Keadilan, Kepedulian Sosial</p>
            <p><strong>Tujuan Pembelajaran:</strong> Melalui eksplorasi benda konkret roti potong dan kertas origami, peserta didik mampu menemukan konsep pecahan senilai serta menerapkannya dalam praktik keadilan berbagi dengan sesama kawan.</p>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-950 text-xs">
              Langkah-Langkah Pembelajaran:
            </h4>
            <p className="font-bold text-slate-900 text-[11.5px]">A. Kegiatan Awal (10 Menit)</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-800 text-[11px]">
              <li>Guru menyapa dengan senyum ceria, memimpin doa, dan mengecek kehadiran.</li>
              <li>Apersepsi: Guru membawa 1 potong kue tart madrasah. "Jika kue ini kita potong untuk 4 teman kita, berapakah bagian yang adil untuk masing-masing teman?"</li>
            </ul>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 57 (Hal. 49) - MODUL MATEMATIKA SIMULASI
          ========================================================================= */}
      <KomPageContainer pageNumber="49" pageIndex={57}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="font-bold text-slate-900 text-[11.5px]">B. Kegiatan Inti (50 Menit) - Hands-on Learning</p>

          <div className="space-y-2 text-[11px] text-slate-800">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">1. Eksplorasi Lipat Kertas Origami (Mindful):</p>
              <p>Siswa melipat kertas origami menjadi 2 bagian yang sama (1/2), kemudian melipat lagi menjadi 4 bagian (2/4), dan 8 bagian (4/8). Siswa melihat secara langsung bahwa luas daerah yang diarsir besarnya sama.</p>
            </div>

            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">2. Simulasi Roti Kasih Sayang (Meaningful):</p>
              <p>Setiap kelompok diberikan replika roti tawar dari plastisin. Siswa mempraktikkan pembagian kue kepada anggota kelompoknya secara adil dan menghitung perbandingan nilai pecahannya.</p>
            </div>

            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">3. Menemukan Pola Rumus (Penalaran Kritis):</p>
              <p>Siswa menyimpulkan bahwa pecahan senilai dapat diperoleh dengan mengalikan atau membagi pembilang dan penyebut dengan angka yang sama.</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 58 (Hal. 50) - MODUL MATEMATIKA ASESMEN & REFLEKSI
          ========================================================================= */}
      <KomPageContainer pageNumber="50" pageIndex={58}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="font-bold text-slate-900 text-[11.5px]">C. Kegiatan Penutup (10 Menit)</p>
          <ul className="list-disc pl-5 space-y-0.5 text-slate-800 text-[11px]">
            <li>Siswa melakukan refleksi diri: "Apa yang saya rasakan ketika saya bisa berbagi rezeki secara adil kepada sahabat?"</li>
            <li>Guru memberikan penguatan nilai tauhid: Allah Maha Adil dan mencintai hamba-Nya yang berlaku adil dan dermawan dalam menimbang dan membagi.</li>
            <li>Ditutup dengan doa hamdalah bersama.</li>
          </ul>

          <div className="pt-2 space-y-2">
            <p className="font-bold text-slate-900 text-xs">
              Asesmen Formatif Cepat (Exit Ticket Matematika):
            </p>
            <div className="p-2.5 bg-emerald-50/70 border border-emerald-300 rounded text-[11px] space-y-1">
              <p>1. Tentukan 2 pecahan yang senilai dengan 3/4!</p>
              <p>2. Jika Fatimah memiliki 6 potong cokelat dan memberikan 3 potong kepada Aisyah, berapa bagian pecahan senilai yang diperoleh Aisyah?</p>
              <p>3. Tuliskan satu kalimat rasa syukurmu atas nikmat rezeki hari ini!</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 59 (Hal. 51) - MODUL IPAS FASE C
          ========================================================================= */}
      <KomPageContainer pageNumber="51" pageIndex={59}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            H. Contoh Modul Ajar: IPAS (Fase C Kelas V)
          </h3>

          <div className="p-2.5 bg-slate-50 border border-slate-300 rounded text-[11px] space-y-1">
            <p><strong>Mata Pelajaran:</strong> IPAS | <strong>Fase/Kelas:</strong> C / V | <strong>Alokasi Waktu:</strong> 3 x 35 Menit</p>
            <p><strong>Topik:</strong> Harmoni Ekosistem Desa Sanggreman | <strong>Materi:</strong> Rantai Makanan & Jaring-Jaring Kehidupan</p>
            <p><strong>Dimensi Profil:</strong> Keimanan (Karakter Khalifah fil Ardh), Nalar Kritis, Kolaborasi</p>
            <p><strong>Nilai Panca Cinta:</strong> Cinta Lingkungan, Cinta Seluruh Mahluk Allah</p>
            <p><strong>Tujuan Pembelajaran:</strong> Melalui observasi ekosistem sawah di sekitar madrasah, peserta didik mampu menganalisis hubungan timbal balik antarmakhluk hidup dan merancang aksi perlindungan rantai makanan alami tanpa racun pestisida berbahaya.</p>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-950 text-xs">
              Langkah-Langkah Pembelajaran:
            </h4>
            <p className="font-bold text-slate-900 text-[11.5px]">A. Kegiatan Awal (15 Menit)</p>
            <p className="text-[11px] text-slate-800">
              Guru mengajak siswa duduk melingkar di bawah pohon rindang halaman madrasah, memejamkan mata sejenak, mendengarkan kicauan burung dan desir angin (<em>Mindful Nature Connection</em>). Guru bertanya: "Siapa yang menciptakan keseimbangan alam yang sempurna ini?"
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 60 (Hal. 52) - MODUL IPAS EKSPLORASI LAPANGAN
          ========================================================================= */}
      <KomPageContainer pageNumber="52" pageIndex={60}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="font-bold text-slate-900 text-[11.5px]">B. Kegiatan Inti (75 Menit) - Observasi Lingkungan</p>

          <div className="space-y-2 text-[11px] text-slate-800">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">1. Jelajah Sawah Sanggreman (Outdoor Learning):</p>
              <p>Siswa berjalan tertib ke area persawahan di samping madrasah dipandu oleh guru dan petani setempat. Siswa mencatat makhluk hidup yang dijumpai (padi, belalang, katak, ular sawah, burung blekok).</p>
            </div>

            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">2. Diskusi Kritis Pemecahan Masalah:</p>
              <p>Petani menjelaskan dampak jika burung pemakan hama diburu sembarangan. Siswa menyadari bahwa merusak satu mata rantai makanan akan menimbulkan kepunahan dan bencana hama bagi manusia.</p>
            </div>

            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">3. Pemetaan Jaring Makanan:</p>
              <p>Kembali ke kelas, tiap kelompok menyusun bagan jaring-jaring makanan menggunakan gambar berwarna dan menarik benang penghubung antarorganisme.</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 61 (Hal. 53) - MODUL IPAS DIORAMA & PENUTUP
          ========================================================================= */}
      <KomPageContainer pageNumber="53" pageIndex={61}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <div className="p-2 bg-slate-50 border border-slate-300 rounded text-[11px] text-slate-800">
            <p className="font-bold text-slate-900">4. Pembuatan Poster "Lindungi Satwa Sahabat Petani":</p>
            <p>Setiap kelompok membuat poster kampanye penyelamatan satwa pemangsa hama untuk dipasang di majalah dinding madrasah dan gardu warga desa.</p>
          </div>

          <div className="pt-2 space-y-1 text-[11.5px]">
            <p className="font-bold text-slate-900">C. Kegiatan Penutup (15 Menit)</p>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-800 text-[11px]">
              <li>Presentasi poster oleh perwakilan kelompok dengan penuh percaya diri.</li>
              <li>Guru memimpin doa rasa syukur atas karunia tanah yang subur di desa Sanggreman.</li>
              <li>Siswa berkomitmen tidak mengganggu sarang burung dan tidak membuang sampah plastik di parit irigasi sawah.</li>
            </ul>
          </div>

          <div className="pt-2 p-2 bg-emerald-50 border-l-4 border-emerald-700 rounded-r text-[10.5px] italic text-emerald-950">
            "Melalui integrasi Panca Cinta, pembelajaran sains berubah dari sekadar hafalan taksonomi biologi menjadi penghayatan amanah manusia sebagai khalifah pemakmur bumi."
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 62 (Hal. 54) - MODUL PROJEK P5-RA APOTEK HIDUP
          ========================================================================= */}
      <KomPageContainer pageNumber="54" pageIndex={62}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-sm">
            I. Contoh Modul Projek P5-RA: "Apotek Hidup Mini Madrasah"
          </h3>

          <div className="p-2.5 bg-slate-50 border border-slate-300 rounded text-[11px] space-y-1">
            <p><strong>Tema Projek:</strong> Kewirausahaan & Gaya Hidup Berkelanjutan</p>
            <p><strong>Fase/Sasaran:</strong> Fase B (Kelas III dan IV) | <strong>Durasi:</strong> 3 Minggu (Blok Semester Ganjil)</p>
            <p><strong>Dimensi Profil:</strong> Kemandirian, Gotong Royong/Kolaborasi, Kreativitas</p>
            <p><strong>Nilai Rahmatan lil 'Alamin:</strong> Qudwah (Keteladanan), Tathawwur wa Ibtikar (Dinamis & Inovatif)</p>
            <p><strong>Tujuan Projek:</strong> Peserta didik mengenal kekayaan tanaman obat tradisional nusantara (jahe, kunyit, kencur, serai), mempraktikkan budidaya ramah lingkungan pada lahan sempit, dan mengolahnya menjadi minuman herbal sehat untuk warga madrasah.</p>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-950 text-xs">
              Tahapan Pelaksanaan Projek:
            </h4>
            <p className="font-bold text-slate-900 text-[11px]">1. Tahap Pengenalan (Minggu I - 12 JP):</p>
            <p className="text-[11px] text-slate-800">
              Sosialisasi projek kepada santri dan wali murid. Mengundang narasumber praktisi herbalis lokal desa Sanggreman untuk memperkenalkan khasiat rempah nusantara sebagai warisan leluhur yang berkah.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 63 (Hal. 55) - MODUL PROJEK P5-RA TAHAP AKSI
          ========================================================================= */}
      <KomPageContainer pageNumber="55" pageIndex={63}>
        <div className="space-y-3 text-[12px] leading-relaxed text-justify">
          <div className="space-y-2 text-[11px] text-slate-800">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">2. Tahap Kontekstualisasi (Minggu II - 18 JP):</p>
              <p>Siswa mengamati sudut halaman madrasah yang kosong. Mengumpulkan botol dan galon bekas sebagai media tanam vertikultur (zero waste). Membuat pupuk kompos dari dedaunan kering taman madrasah.</p>
            </div>

            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">3. Tahap Aksi Nyata (Minggu III - 36 JP):</p>
              <p>Siswa menanam rimpang kunyit, jahe emprit, kencur, dan lidah buaya. Setiap kelompok merawat tanamannya secara bergiliran dengan jadwal piket penyiraman.</p>
              <p className="pt-1">Setelah panen mini, siswa didampingi guru dan komite madrasah membuat minuman herbal tradisional "Beras Kencur Hangat" dan "Wedang Jahe Manis Gula Jawa" yang higienis.</p>
            </div>

            <div className="p-2 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">4. Tahap Refleksi dan Gelar Karya:</p>
              <p>Penyelenggaraan "Bazar Jamu Santri Sehat" di halaman madrasah saat hari pertemuan wali murid.</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 64 (Hal. 56) - RUBRIK PENILAIAN PROJEK P5-RA
          ========================================================================= */}
      <KomPageContainer pageNumber="56" pageIndex={64}>
        <div className="space-y-3 text-[12px] leading-relaxed">
          <p className="font-bold text-slate-900 text-xs">
            Rubrik Perkembangan Karakter Projek P5-RA Apotek Hidup:
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[10px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-28 text-left">Sub-Elemen Profil</th>
                <th className="border border-slate-400 p-1 text-center">Mulai Berkembang (MB)</th>
                <th className="border border-slate-400 p-1 text-center">Sedang Berkembang (SB)</th>
                <th className="border border-slate-400 p-1 text-center">Berkembang Sesuai Harapan (BSH)</th>
                <th className="border border-slate-400 p-1 text-center">Sangat Berkembang (SAB)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Kerjasama / Kolaborasi</td>
                <td className="border border-slate-400 p-1">Masih memilih teman tertentu dalam merawat pot tanaman.</td>
                <td className="border border-slate-400 p-1">Mau bekerjasama dalam kelompok jika diingatkan guru.</td>
                <td className="border border-slate-400 p-1">Inisiatif berbagi tugas menyiram dan merawat tanaman dengan adil.</td>
                <td className="border border-slate-400 p-1">Mampu memimpin kelompok dan membantu kelompok lain yang kesulitan.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Kemandirian Belajar</td>
                <td className="border border-slate-400 p-1">Menunggu instruksi guru untuk setiap langkah penanaman.</td>
                <td className="border border-slate-400 p-1">Mampu menanam sendiri setelah melihat contoh.</td>
                <td className="border border-slate-400 p-1">Disiplin merawat tanaman tanpa perlu diawasi secara terus-menerus.</td>
                <td className="border border-slate-400 p-1">Menunjukkan ketekunan luar biasa dan mencatat pertumbuhan tanaman di rumah.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold">Kreativitas Produk Herbal</td>
                <td className="border border-slate-400 p-1">Meniru persis resep tanpa inovasi kemasan.</td>
                <td className="border border-slate-400 p-1">Mampu mendesain label botol jamu sederhana.</td>
                <td className="border border-slate-400 p-1">Menghasilkan kemasan botol ramah lingkungan dengan pesan kesehatan unik.</td>
                <td className="border border-slate-400 p-1">Inovasi rasa herbal yang lezat dan mampu mempromosikan secara santun di bazar.</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-2 p-2 bg-slate-50 border border-slate-300 rounded text-[10.5px] italic text-slate-700">
            "Projek P5-RA ini menjadi bukti nyata bahwa madrasah ibtidaiyah mampu menumbuhkan jiwa mandiri dan wirausaha santri sejak dini dengan tetap berpegang teguh pada nilai kelestarian alam."
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
