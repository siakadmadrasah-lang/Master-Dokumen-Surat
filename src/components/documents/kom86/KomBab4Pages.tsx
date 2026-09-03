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
          PAGE 1 (Hal. 35) - BAB IV PERENCANAAN RUANG LINGKUP SATUAN PENDIDIKAN & KELAS
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-bab4" pageNumber="35" pageIndex={35}>
        <div className="text-center pb-3 border-b border-slate-300">
          <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
            BAB IV<br />PERENCANAAN PEMBELAJARAN
          </h2>
        </div>

        <div className="pt-3 space-y-2.5 text-[11.5px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
            A. Ruang Lingkup Satuan Pendidikan
          </h3>
          <p className="indent-8">
            Perencanaan pembelajaran pada tingkat satuan pendidikan di {data.namaMadrasah} disusun secara komprehensif, terstruktur, dan berkesinambungan untuk memastikan seluruh proses pendidikan berjalan selaras dengan visi, misi, dan tujuan madrasah yang mengakar pada Kurikulum Berbasis Cinta (KBC).
          </p>

          <div className="space-y-1.5 pl-2">
            <p>
              <strong>1. Capaian Pembelajaran (CP):</strong> Kompetensi pembelajaran yang harus dicapai peserta didik pada setiap fase. Mapel PAI dan Bahasa Arab merujuk pada Keputusan Dirjen Pendis Kemenag RI, sedangkan mapel umum mengacu pada Keputusan Kepala BSKAP Kemendikbudristek.
            </p>
            <p>
              <strong>2. Perumusan Tujuan Pembelajaran (TP):</strong> Pendidik menganalisis kompetensi dan materi pada kalimat CP untuk merumuskan Tujuan Pembelajaran yang operasional, terukur, serta memadukan nilai Panca Cinta dan dimensi profil lulusan madrasah.
            </p>
            <p>
              <strong>3. Penyusunan Alur Tujuan Pembelajaran (ATP):</strong> TP diurutkan secara logis dan sistematis dari fase awal hingga akhir, memperhatikan hierarki keilmuan, tingkat kesulitan, dan kesiapan kognitif santri.
            </p>
            <p>
              <strong>4. Perencanaan Pembelajaran Berbasis Cinta:</strong> Menempatkan keselamatan psikologis anak sebagai prioritas melalui perpaduan olah pikir (intelektual), olah hati (spiritual), olah rasa (empati), dan olah raga (kinestetik) dalam bingkai ketulusan guru.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
              B. Ruang Lingkup Kelas
            </h3>
            <p className="indent-8">
              Pendidik di {data.namaMadrasah} mengembangkan Modul Ajar yang fleksibel, berdiferensiasi, dan kontekstual untuk satu atau beberapa tujuan pembelajaran berdasarkan alur ATP yang telah ditetapkan:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-800 text-[11px]">
              <li><strong>Identitas Modul:</strong> Nama penyusun, fase/kelas, alokasi waktu, target santri reguler maupun bimbingan.</li>
              <li><strong>Profil Lulusan & Panca Cinta:</strong> Karakter spesifik (keimanan, empati, nalar kritis, gotong royong) yang disasar.</li>
              <li><strong>Komponen Inti:</strong> Memuat TP, Pemahaman Bermakna (<em>meaningful</em>), Pertanyaan Pemantik berkesadaran (<em>mindful</em>), Aktivitas menggembirakan (<em>joyful</em>), Asesmen autentik, serta Refleksi Guru dan Peserta Didik di akhir tatap muka.</li>
            </ul>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 2 (Hal. 36) - ASESMEN PEMBELAJARAN, PRINSIP KBC & TABEL KKTP
          ========================================================================= */}
      <KomPageContainer pageNumber="36" pageIndex={36}>
        <div className="space-y-3 text-[11.5px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
            C. Asesmen Pembelajaran Berbasis Cinta
          </h3>
          <p className="indent-8">
            Asesmen merupakan proses pengumpulan dan pengolahan informasi untuk mengetahui kebutuhan belajar, perkembangan, dan pencapaian hasil belajar peserta didik secara holistik tanpa diskriminasi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10.5px]">
            <div className="p-2 bg-emerald-50/70 border border-emerald-300 rounded">
              <p className="font-bold text-emerald-950">1. Asesmen Awal (Diagnostik)</p>
              <p className="text-slate-700 pt-0.5">Memetakan kesiapan kognitif dan non-kognitif (gaya belajar, minat, latar belakang emosional) di awal tahun atau materi baru.</p>
            </div>
            <div className="p-2 bg-blue-50/70 border border-blue-300 rounded">
              <p className="font-bold text-blue-950">2. Asesmen Formatif</p>
              <p className="text-slate-700 pt-0.5">Penilaian selama proses belajar (<em>as & for learning</em>) melalui observasi, kuis interaktif, unjuk kerja ceria, dan jurnal refleksi.</p>
            </div>
            <div className="p-2 bg-purple-50/70 border border-purple-300 rounded">
              <p className="font-bold text-purple-950">3. Asesmen Sumatif</p>
              <p className="text-slate-700 pt-0.5">Penilaian capaian hasil belajar (<em>of learning</em>) pada akhir lingkup materi, akhir semester (SAS), dan akhir jenjang (Asesmen Madrasah).</p>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <h4 className="font-bold text-slate-950 text-xs">
              4. Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)
            </h4>
            <p className="indent-8">
              KKTP menggantikan standar angka KKM tunggal yang kaku dengan rubrik deskriptif berbasis cinta yang menghargai setiap jenjang kemajuan belajar anak secara adil dan memotivasi:
            </p>

            <p className="font-bold text-[10px] text-slate-900 pt-1">
              Tabel 4.1. Contoh Rubrik Penilaian KKTP Berbasis Cinta Mata Pelajaran Al-Qur'an Hadis
            </p>

            <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
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
                  <td className="border border-slate-400 p-1">Belum mampu melafalkan huruf sesuai makhraj.</td>
                  <td className="border border-slate-400 p-1">Makhraj cukup tepat, tajwid belum konsisten.</td>
                  <td className="border border-slate-400 p-1">Melafalkan sebagian besar huruf dengan benar.</td>
                  <td className="border border-slate-400 p-1">Sangat fasih, tartil, dan konsisten mutqin.</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Kelancaran Hafalan</td>
                  <td className="border border-slate-400 p-1">Belum mandiri, butuh tuntunan guru penuh.</td>
                  <td className="border border-slate-400 p-1">Hafal dengan 2-3 bantuan kawan sebaya.</td>
                  <td className="border border-slate-400 p-1">Hafal lancar dari awal hingga akhir ayat.</td>
                  <td className="border border-slate-400 p-1">Sangat lancar tanpa ragu dan fasih.</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Adab & Khusyuk</td>
                  <td className="border border-slate-400 p-1">Kurang khusyuk dan sering bercanda.</td>
                  <td className="border border-slate-400 p-1">Tertib jika diingatkan guru kelas.</td>
                  <td className="border border-slate-400 p-1">Menunjukkan adab mulia dan tenang.</td>
                  <td className="border border-slate-400 p-1">Sangat khusyuk, tawadhu', dan mengagungkan Al-Qur'an.</td>
                </tr>
              </tbody>
            </table>

            <p className="text-[10px] italic text-slate-700">
              *Tindak lanjut: Peserta didik kategori "Perlu Bimbingan" mendapat pendampingan tutorial sebaya penuh kehangatan (tanpa rasa malu), sedangkan kategori "Sangat Baik" dipercaya menjadi mentor cilik.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 3 (Hal. 37) - PELAPORAN RDM, KENAIKAN KELAS & PERENCANAAN KOKURIKULER
          ========================================================================= */}
      <KomPageContainer pageNumber="37" pageIndex={37}>
        <div className="space-y-3 text-[11.5px] leading-relaxed text-justify">
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-950 text-xs">
              5. Pelaporan Hasil Belajar (Raport Digital Madrasah - RDM)
            </h4>
            <p className="indent-8">
              Hasil belajar dilaporkan melalui aplikasi Raport Digital Madrasah (RDM) setiap akhir semester yang memuat deskripsi capaian kompetensi secara naratif yang mendidik, mengapresiasi keunikan santri, dan memberikan panduan pengembangan pribadi secara jelas.
            </p>
          </div>

          <div className="space-y-1.5 border-t border-slate-200 pt-2">
            <h4 className="font-bold text-slate-950 text-xs">
              6. Mekanisme Kenaikan Kelas dan Kelulusan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="p-2.5 bg-slate-50 border border-slate-300 rounded space-y-1">
                <p className="font-bold text-slate-900 border-b border-slate-300 pb-0.5">Kriteria Kenaikan Kelas:</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-slate-800 text-[10.5px]">
                  <li>Menyelesaikan seluruh program belajar pada dua semester.</li>
                  <li>Nilai sikap akhlakul karimah minimal kategori "Baik".</li>
                  <li>Mencapai ketercapaian KKTP pada mata pelajaran esensial.</li>
                  <li>Kehadiran tatap muka minimal 85% hari efektif madrasah.</li>
                  <li>Diputuskan melalui musyawarah rapat dewan guru.</li>
                </ol>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-300 rounded space-y-1">
                <p className="font-bold text-slate-900 border-b border-slate-300 pb-0.5">Kriteria Kelulusan Madrasah:</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-slate-800 text-[10.5px]">
                  <li>Menyelesaikan seluruh program dari kelas I hingga VI.</li>
                  <li>Memperoleh nilai kepribadian akhlak minimal "Baik".</li>
                  <li>Mengikuti Asesmen Madrasah (AM) secara tertib dan jujur.</li>
                  <li>Telah menyelesaikan target hafalan Al-Qur'an Juz 30.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
              D. Perencanaan Kokurikuler (Projek Penguatan Profil P5-RA)
            </h3>
            <p className="indent-8">
              Kepala madrasah membentuk Tim Fasilitator Projek yang merancang modul projek berorientasi isu lingkungan, kewirausahaan, dan kearifan lokal desa Sanggreman dengan tahapan terpadu:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px]">
              <div className="p-2 bg-emerald-50 border border-emerald-300 rounded text-center">
                <p className="font-bold text-emerald-950">1. Pengenalan</p>
                <p className="text-[10px] text-slate-700">Membangun kesadaran isu lingkungan & video edukasi.</p>
              </div>
              <div className="p-2 bg-blue-50 border border-blue-300 rounded text-center">
                <p className="font-bold text-blue-950">2. Kontekstual</p>
                <p className="text-[10px] text-slate-700">Observasi masalah nyata di desa & rumuskan solusi.</p>
              </div>
              <div className="p-2 bg-amber-50 border border-amber-300 rounded text-center">
                <p className="font-bold text-amber-950">3. Aksi Nyata</p>
                <p className="text-[10px] text-slate-700">Budidaya toga herbal, daur ulang & karya nyata.</p>
              </div>
              <div className="p-2 bg-purple-50 border border-purple-300 rounded text-center">
                <p className="font-bold text-purple-950">4. Refleksi</p>
                <p className="text-[10px] text-slate-700">Gelar karya santri & evaluasi tindak lanjut.</p>
              </div>
            </div>

            <p className="text-[11px] text-slate-700 italic pt-0.5">
              *Asesmen projek berfokus pada perkembangan karakter (bukan produk fisik semata) melalui jurnal observasi guru dan portofolio refleksi diri santri.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 4 (Hal. 38) - CONTOH MODUL AJAR: PAI FASE A (LENGKAP & PADAT)
          ========================================================================= */}
      <KomPageContainer pageNumber="38" pageIndex={38}>
        <div className="space-y-2.5 text-[11.5px] leading-relaxed text-justify">
          <div className="border-b border-slate-300 pb-1.5">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
              E. Contoh Modul Ajar: PAI (Al-Qur'an Hadis Fase A Kelas I)
            </h3>
            <div className="p-2 mt-1 bg-slate-50 border border-slate-300 rounded text-[10.5px] space-y-0.5">
              <p><strong>Mapel:</strong> Al-Qur'an Hadis | <strong>Fase/Kelas:</strong> A / I | <strong>Alokasi:</strong> 2 x 35 Menit</p>
              <p><strong>Materi:</strong> Huruf Hijaiyah Berharakat Fathah, Kasrah, Dhommah | <strong>Nilai:</strong> Cinta Allah & Rasul, Cinta Ilmu</p>
              <p><strong>Tujuan Pembelajaran:</strong> Melalui permainan kartu hijaiyah ceria, peserta didik melafalkan huruf hijaiyah berharakat secara tartil dengan gembira dan percaya diri.</p>
            </div>
          </div>

          <div className="space-y-2 text-[11px]">
            <p className="font-bold text-slate-900 text-[11.5px]">Langkah Pembelajaran Berbasis Cinta:</p>

            <div className="p-2 bg-emerald-50/60 border-l-4 border-emerald-600 rounded-r">
              <p className="font-bold text-emerald-950">A. Kegiatan Awal (10 Menit) - Apersepsi Hangat</p>
              <p className="text-slate-800">Menyambut siswa di pintu dengan senyuman dan sapaan ramah. Doa bersama dipimpin santri bergilir. Mindful check-in (menempel stiker perasaan) dan menyanyikan lagu "Tepuk Hijaiyah Ceria".</p>
            </div>

            <div className="p-2 bg-blue-50/60 border-l-4 border-blue-600 rounded-r">
              <p className="font-bold text-blue-950">B. Kegiatan Inti (50 Menit) - Meaningful & Joyful Deep Learning</p>
              <p className="text-slate-800">
                <strong>Meaningful:</strong> Tayangan video keutamaan membaca kalamullah (1 huruf = 10 kebaikan).<br />
                <strong>Mindful:</strong> Guru mendemonstrasikan makhraj huruf fathah. Siswa meletakkan tangan di depan mulut merasakan desir angin huruf.<br />
                <strong>Joyful:</strong> Permainan "Kereta Hijaiyah Ceria" dan pencocokan kartu warna-warni secara berpasangan. Guru memberikan apresiasi spesifik pada kelebihan santri.
              </p>
            </div>

            <div className="p-2 bg-amber-50/60 border-l-4 border-amber-600 rounded-r">
              <p className="font-bold text-amber-950">C. Kegiatan Penutup (10 Menit) - Refleksi & Pesan Kasih</p>
              <p className="text-slate-800">Refleksi gembira siswa, pesan cinta membaca Al-Qur'an bersama orang tua di rumah, doa kafaratul majelis, dan salam hormat kepada guru.</p>
            </div>
          </div>

          <div className="pt-1">
            <p className="font-bold text-[10px] text-slate-900 pb-1">
              Instrumen Asesmen Formatif Harian PAI Fase A:
            </p>
            <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-6 text-center">No</th>
                  <th className="border border-slate-400 p-1 text-left">Nama Santri</th>
                  <th className="border border-slate-400 p-1 text-center w-20">Makhraj</th>
                  <th className="border border-slate-400 p-1 text-center w-20">Harakat</th>
                  <th className="border border-slate-400 p-1 text-center w-20">Keaktifan</th>
                  <th className="border border-slate-400 p-1 text-left">Catatan Guru</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">1</td>
                  <td className="border border-slate-400 p-1 font-semibold">Ahmad Fauzan</td>
                  <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Sangat Baik</td>
                  <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Sangat Baik</td>
                  <td className="border border-slate-400 p-1 text-center">Sangat Aktif</td>
                  <td className="border border-slate-400 p-1">Siap menjadi tutor sebaya kelompoknya.</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">2</td>
                  <td className="border border-slate-400 p-1 font-semibold">Aisyah Nur Rohmah</td>
                  <td className="border border-slate-400 p-1 text-center font-bold text-blue-800">Baik</td>
                  <td className="border border-slate-400 p-1 text-center font-bold text-blue-800">Baik</td>
                  <td className="border border-slate-400 p-1 text-center">Aktif & Tertib</td>
                  <td className="border border-slate-400 p-1">Penguatan harakat dhommah dengan senyum.</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 text-center">3</td>
                  <td className="border border-slate-400 p-1 font-semibold">Bilal Habibi</td>
                  <td className="border border-slate-400 p-1 text-center font-bold text-amber-800">Cukup</td>
                  <td className="border border-slate-400 p-1 text-center font-bold text-amber-800">Cukup</td>
                  <td className="border border-slate-400 p-1 text-center">Cukup Aktif</td>
                  <td className="border border-slate-400 p-1">Dibekali kartu hijaiyah ceria mandiri.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 5 (Hal. 39) - CONTOH MODUL AJAR: BAHASA INDONESIA FASE B (LENGKAP)
          ========================================================================= */}
      <KomPageContainer pageNumber="39" pageIndex={39}>
        <div className="space-y-2.5 text-[11.5px] leading-relaxed text-justify">
          <div className="border-b border-slate-300 pb-1.5">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
              F. Contoh Modul Ajar: Bahasa Indonesia (Fase B Kelas IV)
            </h3>
            <div className="p-2 mt-1 bg-slate-50 border border-slate-300 rounded text-[10.5px] space-y-0.5">
              <p><strong>Mapel:</strong> Bahasa Indonesia | <strong>Fase/Kelas:</strong> B / IV | <strong>Alokasi:</strong> 3 x 35 Menit</p>
              <p><strong>Materi:</strong> Menulis Surat Penuh Kasih untuk Sahabat | <strong>Nilai:</strong> Cinta Sesama, Budaya Santun</p>
              <p><strong>Tujuan Pembelajaran:</strong> Peserta didik mampu menyusun surat pribadi yang runtut dengan ungkapan empati dan kesantunan berbahasa untuk mempererat tali silaturahmi sahabat.</p>
            </div>
          </div>

          <div className="space-y-2 text-[11px]">
            <p className="font-bold text-slate-900 text-[11.5px]">Langkah-Langkah Kegiatan Pembelajaran:</p>

            <div className="p-2 bg-emerald-50/60 border-l-4 border-emerald-600 rounded-r">
              <p className="font-bold text-emerald-950">A. Kegiatan Awal (15 Menit) - Menghayati Kasih Persahabatan</p>
              <p className="text-slate-800">Membaca Asmaul Husna bersama. Guru membacakan contoh surat hangat dari sahabat jauh. Siswa merefleksikan rasa bahagia ketika dihargai dan didoakan oleh teman.</p>
            </div>

            <div className="p-2 bg-blue-50/60 border-l-4 border-blue-600 rounded-r">
              <p className="font-bold text-blue-950">B. Kegiatan Inti (75 Menit) - Menulis Draf & Menghias Amplop</p>
              <p className="text-slate-800">
                <strong>1. Bedah Struktur Surat:</strong> Tanggal, salam pembuka ramah, ungkapan kerinduan, pesan doa tulus, dan penutup.<br />
                <strong>2. Lingkaran Kasih:</strong> Mengambil gulungan nama teman secara rahasia sebagai sahabat pena.<br />
                <strong>3. Menghias Amplop:</strong> Menghias amplop dengan gambar bunga atau ucapan berkah, lalu dimasukkan ke Kotak Pos Madrasah Kasih Sayang.
              </p>
            </div>

            <div className="p-2 bg-amber-50/60 border-l-4 border-amber-600 rounded-r">
              <p className="font-bold text-amber-950">C. Kegiatan Penutup (15 Menit) - Berbagi Kebahagiaan</p>
              <p className="text-slate-800">Surat dibagikan kepada penerima, saling berpelukan dan mengucapkan terima kasih. Guru menegaskan bahwa tutur kata santun dan surat sejuk adalah sedekah.</p>
            </div>
          </div>

          <div className="pt-1">
            <p className="font-bold text-[10px] text-slate-900 pb-1">
              Rubrik Penilaian Menulis Surat Sahabat Penuh Empati:
            </p>
            <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
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
                  <td className="border border-slate-400 p-1 font-semibold">Struktur Surat</td>
                  <td className="border border-slate-400 p-1">Hanya memuat 1-2 bagian.</td>
                  <td className="border border-slate-400 p-1">Memuat 3 bagian surat.</td>
                  <td className="border border-slate-400 p-1">Memuat 4 bagian teratur.</td>
                  <td className="border border-slate-400 p-1">Struktur lengkap & sistematis.</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Muatan Empati & Doa</td>
                  <td className="border border-slate-400 p-1">Tanpa ungkapan kasih.</td>
                  <td className="border border-slate-400 p-1">Ungkapan empati kaku.</td>
                  <td className="border border-slate-400 p-1">Memuat empati tulus.</td>
                  <td className="border border-slate-400 p-1">Sangat menyentuh & penuh doa berkah.</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Kesantunan Bahasa</td>
                  <td className="border border-slate-400 p-1">Banyak kata tidak pantas.</td>
                  <td className="border border-slate-400 p-1">Cukup santun, tanda baca keliru.</td>
                  <td className="border border-slate-400 p-1">Santun dan ejaan benar.</td>
                  <td className="border border-slate-400 p-1">Sangat santun, tata bahasa sempurna.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 6 (Hal. 40) - CONTOH MODUL AJAR: MATEMATIKA FASE B (BERBAGI REZEKI)
          ========================================================================= */}
      <KomPageContainer pageNumber="40" pageIndex={40}>
        <div className="space-y-2.5 text-[11.5px] leading-relaxed text-justify">
          <div className="border-b border-slate-300 pb-1.5">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
              G. Contoh Modul Ajar: Matematika (Fase B Kelas IV)
            </h3>
            <div className="p-2 mt-1 bg-slate-50 border border-slate-300 rounded text-[10.5px] space-y-0.5">
              <p><strong>Mapel:</strong> Matematika | <strong>Fase/Kelas:</strong> B / IV | <strong>Alokasi:</strong> 2 x 35 Menit</p>
              <p><strong>Materi Pokok:</strong> Pecahan Senilai melalui Konsep Berbagi Rezeki Adil | <strong>Nilai:</strong> Keadilan & Kepedulian</p>
              <p><strong>Tujuan Pembelajaran:</strong> Melalui eksplorasi benda konkret origami dan replika kue, santri mampu menemukan pecahan senilai serta mempraktikkan keadilan berbagi rezeki dengan sesama kawan.</p>
            </div>
          </div>

          <div className="space-y-2 text-[11px]">
            <p className="font-bold text-slate-900 text-[11.5px]">Langkah-Langkah Pembelajaran Konkret:</p>

            <div className="p-2 bg-emerald-50/60 border-l-4 border-emerald-600 rounded-r">
              <p className="font-bold text-emerald-950">A. Kegiatan Awal (10 Menit) - Apersepsi Kasih</p>
              <p className="text-slate-800">Guru membawa 1 roti madrasah: "Jika kue ini kita bagikan untuk 4 sahabat kita yang lapar, berapakah bagian yang adil untuk masing-masing agar tiada yang merasa dizalimi?"</p>
            </div>

            <div className="p-2 bg-blue-50/60 border-l-4 border-blue-600 rounded-r">
              <p className="font-bold text-blue-950">B. Kegiatan Inti (50 Menit) - Hands-on Minds-on Learning</p>
              <p className="text-slate-800">
                <strong>1. Origami Lipat (Mindful):</strong> Siswa melipat kertas menjadi 2 bagian (1/2), lalu 4 bagian (2/4), dan 8 bagian (4/8), mengamati langsung kesamaan luas daerah yang diarsir.<br />
                <strong>2. Simulasi Roti Tawar (Meaningful):</strong> Mempraktikkan pembagian balok plastisin kepada kawan kelompok secara adil.<br />
                <strong>3. Nalar Kritis:</strong> Menemukan rumus mengalikan/membagi pembilang dan penyebut dengan angka yang sama.
              </p>
            </div>

            <div className="p-2 bg-amber-50/60 border-l-4 border-amber-600 rounded-r">
              <p className="font-bold text-amber-950">C. Kegiatan Penutup (10 Menit) - Refleksi Keadilan & Tawakal</p>
              <p className="text-slate-800">Refleksi spiritual: Allah Maha Adil dan mencintai hamba-Nya yang dermawan dan jujur dalam menakar.</p>
            </div>
          </div>

          <div className="p-2 bg-emerald-50 border border-emerald-300 rounded text-[10.5px] space-y-1">
            <p className="font-bold text-emerald-950">Lembar Cepat Pemahaman (Exit Ticket Matematika):</p>
            <p>1. Tentukan 2 bentuk pecahan yang senilai dengan 2/3!</p>
            <p>2. Salman memotong semangka menjadi 8 bagian sama besar dan memberikan 4 potong kepada kaum dhuafa. Tuliskan pecahan senilai bagian sedekah Salman!</p>
            <p>3. Tuliskan satu kalimat doa syukur atas nikmat rezeki yang Allah karuniakan hari ini!</p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 7 (Hal. 41) - CONTOH MODUL AJAR: IPAS FASE C (HARMONI EKOSISTEM)
          ========================================================================= */}
      <KomPageContainer pageNumber="41" pageIndex={41}>
        <div className="space-y-2.5 text-[11.5px] leading-relaxed text-justify">
          <div className="border-b border-slate-300 pb-1.5">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
              H. Contoh Modul Ajar: IPAS (Fase C Kelas V)
            </h3>
            <div className="p-2 mt-1 bg-slate-50 border border-slate-300 rounded text-[10.5px] space-y-0.5">
              <p><strong>Mapel:</strong> IPAS | <strong>Fase/Kelas:</strong> C / V | <strong>Alokasi:</strong> 3 x 35 Menit</p>
              <p><strong>Topik:</strong> Harmoni Ekosistem Desa Sanggreman | <strong>Nilai:</strong> Cinta Lingkungan & Mahluk Ciptaan Allah</p>
              <p><strong>Tujuan Pembelajaran:</strong> Melalui observasi ekosistem persawahan di sekitar madrasah, peserta didik menganalisis rantai makanan dan merancang aksi perlindungan fauna sahabat petani tanpa racun kimia berbahaya.</p>
            </div>
          </div>

          <div className="space-y-2 text-[11px]">
            <p className="font-bold text-slate-900 text-[11.5px]">Langkah Pembelajaran Eksplorasi Alam:</p>

            <div className="p-2 bg-emerald-50/60 border-l-4 border-emerald-600 rounded-r">
              <p className="font-bold text-emerald-950">A. Kegiatan Awal (15 Menit) - Mindful Nature Connection</p>
              <p className="text-slate-800">Duduk melingkar di bawah pohon madrasah, mendengarkan desir angin dan kicau burung. Guru bertanya: "Siapa yang menata keselarasan rantai makanan di alam semesta?"</p>
            </div>

            <div className="p-2 bg-blue-50/60 border-l-4 border-blue-600 rounded-r">
              <p className="font-bold text-blue-950">B. Kegiatan Inti (75 Menit) - Jelajah Sawah & Pemetaan Jaring Kehidupan</p>
              <p className="text-slate-800">
                <strong>1. Jelajah Sawah:</strong> Mengamati interaksi padi, belalang, katak, ular sawah, dan burung blekok dipandu petani setempat.<br />
                <strong>2. Diskusi Kritis:</strong> Menelaah bahaya perburuan liar burung pemangsa hama bagi hasil panen desa.<br />
                <strong>3. Diorama Jaring Makanan:</strong> Membuat bagan jaring makanan berwarna dan poster "Sahabat Petani Lestari".
              </p>
            </div>

            <div className="p-2 bg-amber-50/60 border-l-4 border-amber-600 rounded-r">
              <p className="font-bold text-amber-950">C. Kegiatan Penutup (15 Menit) - Ikrar Khalifah Fil Ardh</p>
              <p className="text-slate-800">Presentasi karya poster, doa syukur atas karunia kesuburan tanah Sanggreman, dan ikrar bersama menjaga kelestarian parit irigasi dari sampah plastik.</p>
            </div>
          </div>

          <div className="p-2 bg-emerald-50 border-l-4 border-emerald-700 rounded-r text-[10.5px] italic text-emerald-950">
            "Melalui integrasi Panca Cinta, pembelajaran sains bertransformasi dari sekadar hafalan taksonomi biologi menjadi penghayatan amanah manusia sebagai khalifah pemakmur bumi yang penuh kasih sayang."
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 8 (Hal. 42) - MODUL PROJEK P5-RA APOTEK HIDUP LENGKAP DENGAN RUBRIK
          ========================================================================= */}
      <KomPageContainer pageNumber="42" pageIndex={42}>
        <div className="space-y-2.5 text-[11.5px] leading-relaxed text-justify">
          <div className="border-b border-slate-300 pb-1.5">
            <h3 className="font-bold text-slate-950 text-xs sm:text-sm">
              I. Contoh Modul Projek P5-RA: "Apotek Hidup Mini Madrasah"
            </h3>
            <div className="p-2 mt-1 bg-slate-50 border border-slate-300 rounded text-[10px] space-y-0.5">
              <p><strong>Tema:</strong> Gaya Hidup Berkelanjutan & Kewirausahaan | <strong>Fase/Sasaran:</strong> Fase B (Kelas III & IV)</p>
              <p><strong>Dimensi:</strong> Gotong Royong, Kemandirian, Kreativitas | <strong>Nilai Rahmatan lil 'Alamin:</strong> Keteladanan & Inovasi (Qudwah & Ibtikar)</p>
              <p><strong>Tujuan Projek:</strong> Santri membudidayakan tanaman toga (jahe, kencur, serai) pada media pot daur ulang dan mengolahnya menjadi jamu tradisional higienis untuk warga madrasah.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
            <div className="p-1.5 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">1. Pengenalan (12 JP)</p>
              <p className="text-slate-700">Edukasi khasiat rempah nusantara bersama praktisi herbalis lokal.</p>
            </div>
            <div className="p-1.5 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">2. Kontekstual (18 JP)</p>
              <p className="text-slate-700">Pemanfaatan botol bekas jadi media vertikultur & kompos mandiri.</p>
            </div>
            <div className="p-1.5 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">3. Aksi Nyata (36 JP)</p>
              <p className="text-slate-700">Penanaman, piket rawat, panen, & pembuatan wedang jamu sehat.</p>
            </div>
            <div className="p-1.5 bg-slate-50 border border-slate-300 rounded">
              <p className="font-bold text-slate-900">4. Gelar Karya (12 JP)</p>
              <p className="text-slate-700">Bazar Jamu Santri Sehat saat pertemuan paguyuban orang tua.</p>
            </div>
          </div>

          <div className="pt-1">
            <p className="font-bold text-[10px] text-slate-900 pb-1">
              Rubrik Perkembangan Karakter Peserta Didik Projek P5-RA:
            </p>
            <table className="w-full border-collapse border border-slate-400 text-[9px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-400 p-1 w-24 text-left">Sub-Elemen</th>
                  <th className="border border-slate-400 p-1 text-center">Mulai Berkembang (MB)</th>
                  <th className="border border-slate-400 p-1 text-center">Sedang Berkembang (SB)</th>
                  <th className="border border-slate-400 p-1 text-center">Berkembang Sesuai Harapan (BSH)</th>
                  <th className="border border-slate-400 p-1 text-center">Sangat Berkembang (SAB)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Kolaborasi / Gotong Royong</td>
                  <td className="border border-slate-400 p-1">Masih memilih teman tertentu saat piket tanaman.</td>
                  <td className="border border-slate-400 p-1">Bekerjasama jika diingatkan oleh guru.</td>
                  <td className="border border-slate-400 p-1">Inisiatif berbagi tugas menyiram dan merawat.</td>
                  <td className="border border-slate-400 p-1">Memimpin regu dan membantu regu lain secara sukarela.</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Kemandirian Belajar</td>
                  <td className="border border-slate-400 p-1">Menunggu instruksi guru terus-menerus.</td>
                  <td className="border border-slate-400 p-1">Menanam mandiri setelah diberi contoh.</td>
                  <td className="border border-slate-400 p-1">Disiplin merawat tanaman tanpa diawasi.</td>
                  <td className="border border-slate-400 p-1">Tekun mencatat jurnal tumbuh kembang tanaman di rumah.</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 p-1 font-semibold">Kreativitas Produk Herbal</td>
                  <td className="border border-slate-400 p-1">Meniru persis tanpa variasi kemasan.</td>
                  <td className="border border-slate-400 p-1">Mendesain label botol jamu sederhana.</td>
                  <td className="border border-slate-400 p-1">Kemasan ramah lingkungan & pesan kesehatan menarik.</td>
                  <td className="border border-slate-400 p-1">Inovasi rasa herbal lezat dan mampu promosi santun di bazar.</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-1.5 p-1.5 bg-slate-50 border border-slate-300 rounded text-[9.5px] italic text-slate-700">
              "Projek P5-RA Apotek Hidup menumbuhkan jiwa mandiri dan wirausaha santri sejak dini dengan tetap berpegang teguh pada nilai kelestarian alam dan kearifan lokal."
            </div>
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
