import React from 'react';
import { BookOpen, Sparkles, Layers, Cpu, Heart, Award, Star } from 'lucide-react';

interface KomCapaianPembelajaranProps {
  namaMadrasah: string;
  tahunAjaran: string;
}

export const KomCapaianPembelajaran: React.FC<KomCapaianPembelajaranProps> = ({
  namaMadrasah,
  tahunAjaran,
}) => {
  return (
    <div id="kom-cp-lengkap-container" className="space-y-6 pt-4 text-xs sm:text-[12.5px] leading-[1.75]">
      {/* HEADER SECTION C */}
      <div className="bg-emerald-950 text-white p-4 rounded-xl space-y-1 shadow-xs print:break-before-page">
        <div className="flex justify-between items-center text-[11px] font-mono text-emerald-300">
          <span>BAB IV : SUB-BAB C</span>
          <span>Hal. 36 - 67</span>
        </div>
        <h4 className="text-sm sm:text-base font-bold uppercase tracking-wide flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          C. Perencanaan Lingkup Satuan Pendidikan: Capaian Pembelajaran (CP) Seluruh Fase & Mata Pelajaran
        </h4>
        <p className="text-[11.5px] text-emerald-100 font-medium">
          Rincian Elemen, Capaian Pembelajaran (CP), dan Alur Tujuan Pembelajaran (ATP) Berbasis Karakter Cinta & Profil Lulusan KMA 1503 Tahun 2025 di {namaMadrasah}.
        </p>
      </div>

      {/* =========================================================================
          1. KELOMPOK PENDIDIKAN AGAMA ISLAM (PAI)
          ========================================================================= */}
      
      {/* 1.1 AL-QUR'AN HADIS */}
      <div id="cp-quran-hadis" className="border border-slate-300 rounded-xl p-4 bg-white space-y-3 print:break-before-page">
        <div className="flex justify-between items-center border-b border-emerald-800/20 pb-2">
          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">1</span>
            Mata Pelajaran: Al-Qur&apos;an Hadis (Fase A, B, dan C)
          </h5>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">KMA 1503/2025</span>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Hal. 38</span>
          </div>
        </div>
        <p className="text-justify text-slate-700">
          <strong>Rasional:</strong> Membimbing peserta didik mencintai Al-Qur&apos;an dan Hadis Nabi SAW sebagai pedoman hidup utama, memiliki kemampuan membaca secara tartil dengan kaidah tajwid yang benar, menghafal, memahami arti kandungan ayat dan hadis, serta mengamalkannya dalam interaksi sosial sehari-hari dengan penuh kasih sayang.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-300">
            <thead className="bg-emerald-900 text-white font-bold text-left">
              <tr>
                <th className="border border-slate-300 p-2 w-28">Fase / Kelas</th>
                <th className="border border-slate-300 p-2 w-36">Elemen</th>
                <th className="border border-slate-300 p-2">Capaian Pembelajaran (CP)</th>
                <th className="border border-slate-300 p-2 w-48">Integrasi Pilar Cinta & Dimensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top">
                  Fase A<br />(Kelas 1 & 2)
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">
                  • Ilmu Tajwid<br />
                  • Al-Qur&apos;an<br />
                  • Hadis
                </td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Peserta didik mampu mengenal, melafalkan, dan menulis huruf hijaiyyah bersambung dan harakatnya secara tepat.</p>
                  <p>• Mampu melafalkan dan menghafal Surah Al-Fatihah, An-Nas, Al-Falaq, Al-Ikhlas, Al-Lahab, An-Nasr, dan Al-Kafirun dengan makharijul huruf yang fasih.</p>
                  <p>• Mampu melafalkan dan memahami pesan hadis tentang kebersihan dan hadis tentang kasih sayang terhadap sesama makhluk.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">
                  Cinta Allah & Rasul, Cinta Diri & Sesama (Beriman & Berakhlak Mulia)
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top">
                  Fase B<br />(Kelas 3 & 4)
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">
                  • Tajwid Gunnah, Idzhar, Idgham<br />
                  • Surah-Surah Pendek<br />
                  • Hadis Sosial
                </td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Menerapkan hukum bacaan Gunnah, Idzhar, dan Idgham (Bighunnah & Bilaghunnah) saat tilawah Al-Qur&apos;an.</p>
                  <p>• Membaca, menghafal, dan memahami makna isi pokok QS. Al-Ma&apos;un, Al-Kautsar, Al-Quraisy, Al-Fil, dan Al-Humazah.</p>
                  <p>• Menghafal dan mengimplementasikan hadis tentang niat, hadis menjaga silaturahmi, dan hadis menghormati orang tua dan guru.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">
                  Cinta Sesama & Cinta Lingkungan (Peduli Fakir Miskin & Yatim)
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top">
                  Fase C<br />(Kelas 5 & 6)
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">
                  • Tajwid Ikhfa, Iqlab, Mad<br />
                  • Surah Pilihan<br />
                  • Hadis Kepemimpinan & Kejujuran
                </td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Menguasai kaidah hukum bacaan Ikhfa Haqiqi, Iqlab, Mim Sukun, dan Mad Thabi&apos;i / Mad Far&apos;i secara tartil.</p>
                  <p>• Membaca dan menganalisis kandungan QS. Al-Qadr, Al-&apos;Alaq, At-Tin, Al-Insyirah, dan Adh-Dhuha tentang ilmu dan kemanusiaan.</p>
                  <p>• Menghafal dan merefleksikan hadis tentang taqwa, amal shalih, ciri-ciri kemunafikan, dan sifat jujur dalam kehidupan berbangsa.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">
                  Cinta Kebenaran & Cinta Tanah Air (Integritas Moral & Pemimpin Adil)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 1.2 AKIDAH AKHLAK */}
      <div id="cp-akidah-akhlak" className="border border-slate-300 rounded-xl p-4 bg-white space-y-3 print:break-before-page">
        <div className="flex justify-between items-center border-b border-emerald-800/20 pb-2">
          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">2</span>
            Mata Pelajaran: Akidah Akhlak (Fase A, B, dan C)
          </h5>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">KMA 1503/2025</span>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Hal. 43</span>
          </div>
        </div>
        <p className="text-justify text-slate-700">
          <strong>Rasional:</strong> Membentuk karakter santri yang kokoh dalam bertauhid sesuai paham Ahlussunnah wal Jama&apos;ah An-Nahdliyyah, berhias dengan akhlak terpuji (*akhlakul mahmudah*), dan menjauhi perbuatan tercela (*akhlakul madzmumah*) dengan pendekatan Deep Learning (Mindful, Meaningful, Joyful).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-300">
            <thead className="bg-emerald-900 text-white font-bold text-left">
              <tr>
                <th className="border border-slate-300 p-2 w-28">Fase / Kelas</th>
                <th className="border border-slate-300 p-2 w-36">Elemen</th>
                <th className="border border-slate-300 p-2">Capaian Pembelajaran (CP)</th>
                <th className="border border-slate-300 p-2 w-48">Integrasi Pilar Cinta & Dimensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 font-semibold align-top">• Akidah Islamiah<br />• Asmaul Husna<br />• Akhlak Terpuji<br />• Adab Islami</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Memahami rukun iman, kalimat tayyibah Basmalah, Hamdalah, Ta&apos;awwudz, dan Kalimat Syahadat.</p>
                  <p>• Meneladani Asmaul Husna Ar-Rahman, Ar-Rahim, Al-Malik, dan Al-Quddus dalam kehidupan sehari-hari.</p>
                  <p>• Membiasakan sikap jujur, percaya diri, santun kepada orang tua dan guru, serta adab makan, minum, dan buang air.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Allah, Cinta Guru & Orang Tua, Nilai Qudwah (Keteladanan)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 font-semibold align-top">• Rukun Iman Kitab/Rasul<br />• Asmaul Husna<br />• Akhlak Sosial<br />• Menghindari Tercela</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Memahami sifat-sifat wajib, mustahil, dan jaiz bagi Allah SWT serta keimanan kepada Kitab-kitab Suci dan Rasulullah SAW.</p>
                  <p>• Mempraktikkan nilai As-Salam, Al-Mu&apos;min, Al-Karim, dan Al-Hadi dalam pertemanan kelas tanpa membedakan latar belakang.</p>
                  <p>• Menerapkan sikap syukur, tawadhu&apos;, tabah, tolong-menolong, dan menjauhi sifat sombong (*takabbur*), kikir, dan marah berlebihan.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Sesama, Tasamuh (Toleransi), Anti-Bullying</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 font-semibold align-top">• Hari Akhir & Takdir<br />• Asmaul Husna Lanjutan<br />• Adab Bertamu & Alam<br />• Penyakit Hati</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Memahami konsep hari akhir (kiamat), surga-neraka, serta qada dan qadar Allah SWT sebagai landasan ketenangan jiwa.</p>
                  <p>• Meneladani Asmaul Husna Al-Ghaffar, Al-Hakim, Al-Wakil, dan Al-Jalil dalam menghadapi dinamika sosial.</p>
                  <p>• Menerapkan adab bertamu, bermedia sosial yang santun, kepedulian lingkungan, serta menghindari penyakit hati hasad, riya&apos;, dan gibah.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Kebenaran & Lingkungan, I&apos;tidal (Adil & Tegak Lurus)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 1.3 FIKIH */}
      <div id="cp-fikih" className="border border-slate-300 rounded-xl p-4 bg-white space-y-3 print:break-before-page">
        <div className="flex justify-between items-center border-b border-emerald-800/20 pb-2">
          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">3</span>
            Mata Pelajaran: Fikih Ibadah & Muamalah (Fase A, B, dan C)
          </h5>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">KMA 1503/2025</span>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Hal. 48</span>
          </div>
        </div>
        <p className="text-justify text-slate-700">
          <strong>Rasional:</strong> Membekali peserta didik dengan pemahaman syariat Islam yang aplikatif, tata cara bersuci, ibadah mahdhah yang sah dan tertib, serta muamalah yang adil dan maslahat bagi sesama manusia sesuai mazhab Syafi&apos;i.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-300">
            <thead className="bg-emerald-900 text-white font-bold text-left">
              <tr>
                <th className="border border-slate-300 p-2 w-28">Fase / Kelas</th>
                <th className="border border-slate-300 p-2 w-36">Elemen</th>
                <th className="border border-slate-300 p-2">Capaian Pembelajaran (CP)</th>
                <th className="border border-slate-300 p-2 w-48">Integrasi Pilar Cinta & Dimensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 font-semibold align-top">• Thaharah (Bersuci)<br />• Rukun Islam<br />• Shalat Fardhu 5 Waktu</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Memahami tata cara bersuci dari najis, istinja&apos;, dan wudhu/tayamum dengan tertib dan benar.</p>
                  <p>• Memahami rukun Islam dan melafalkan bacaan serta gerakan shalat fardhu lima waktu secara mandiri.</p>
                  <p>• Mempraktikkan adab azan, iqamah, dan kebiasaan shalat berjamaah di musholla madrasah.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Ibadah, Disiplin Waktu, Kebersihan Diri & Tempat</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 font-semibold align-top">• Shalat Sunnah<br />• Puasa Ramadhan<br />• Zakat Fitrah<br />• Tanda Baligh</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Memahami syarat sah dan rukun shalat sunnah Rawatib, Dhuha, Tahajud, Witir, serta shalat bagi orang sakit/musafir.</p>
                  <p>• Memahami ketentuan dan hikmah puasa Ramadhan, puasa sunnah, serta tata cara pembayaran zakat fitrah.</p>
                  <p>• Mengetahui tanda-tanda baligh (*ihtilam & haid*) serta tata cara mandi wajib bersuci dari hadas besar.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Sesama (Kedermawanan Zakat), Tanggung Jawab Diri</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 font-semibold align-top">• Shalat Jumat & Idain<br />• Makanan Halal-Haram<br />• Qurban & Aqiqah<br />• Muamalah Islami</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Memahami ketentuan shalat Jumat, shalat Idul Fitri & Idul Adha, serta shalat Gerhana (*Kusuf/Khusuf*).</p>
                  <p>• Menganalisis kehalalan dan keharaman makanan, minuman, dan binatang sembelihan serta dampak gizinya bagi tubuh.</p>
                  <p>• Memahami tata cara kurban dan aqiqah, serta dasar-dasar jual beli yang jujur (*al-bai&apos;*), pinjam meminjam, dan larangan riba.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Keadilan & Kejujuran Finansial, Kepekaan Sosial</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 1.4 SEJARAH KEBUDAYAAN ISLAM (SKI) & BAHASA ARAB */}
      <div id="cp-ski-bahasa-arab" className="border border-slate-300 rounded-xl p-4 bg-white space-y-3 print:break-before-page">
        <div className="flex justify-between items-center border-b border-emerald-800/20 pb-2">
          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">4</span>
            Mata Pelajaran: Sejarah Kebudayaan Islam (SKI) & Bahasa Arab
          </h5>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">KMA 1503/2025</span>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Hal. 53</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-300">
            <thead className="bg-emerald-900 text-white font-bold text-left">
              <tr>
                <th className="border border-slate-300 p-2 w-32">Mata Pelajaran</th>
                <th className="border border-slate-300 p-2 w-28">Fase</th>
                <th className="border border-slate-300 p-2">Elemen & Capaian Pembelajaran</th>
                <th className="border border-slate-300 p-2 w-48">Integrasi Pilar Cinta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={2}>
                  Sejarah Kebudayaan Islam (SKI)
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Periode Makkah & Madinah:</strong> Menganalisis kondisi jazirah Arab pra-Islam, kerasulan Nabi Muhammad SAW, ketabahan sahabat menghadapi boikot, peristiwa Isra&apos; Mi&apos;raj, serta Piagam Madinah sebagai teladan toleransi dan persaudaraan lintas agama (*Ukhuwah Insaniyah*).</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">
                  Cinta Rasulullah & Keteladanan Akhlak, Tasamuh (Toleransi Madinah)
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Khulafaur Rasyidin & Wali Songo:</strong> Meneladani kepemimpinan Abu Bakar, Umar, Utsman, Ali RA, serta metode dakwah damai Wali Songo di Nusantara yang menghargai kearifan budaya lokal dan mendirikan tatanan masyarakat yang harmonis.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">
                  Cinta Tanah Air & Budaya Bangsa (Muwatanah & Kearifan Dakwah)
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={3}>
                  Bahasa Arab
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Menyimak & Berbicara:</strong> Mengenal kosakata perkenalan diri (*Ta&apos;aruf*), alat tulis di kelas, nama warna, dan anggota tubuh melalui lagu edukatif dan percakapan sederhana.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">
                  Cinta Bahasa Al-Qur&apos;an, Komunikasi Santun
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Membaca & Menulis:</strong> Membaca teks pendek tentang alamat (*Al-Unwan*), keluarga (*Al-Usrah*), profesi (*Al-Mihnah*), dan kebun binatang dengan intonasi fasih serta menulis kalimat tanya sederhana.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">
                  Kecintaan Literasi Bahasa Arab & Kehangatan Keluarga
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Literasi Bahasa Komprehensif:</strong> Memahami teks naratif tentang waktu (*As-Sa&apos;ah*), hobi (*Al-Hiwayah*), aktivitas harian madrasah, dan di laboratorium; menyusun karangan deskripsi pendek dengan tata bahasa dasar (*Isim Isyarah, Dhomir, Dzorof*).</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">
                  Kemandirian Berbahasa Global & Wawasan Keilmuan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          2. KELOMPOK MATA PELAJARAN UMUM
          ========================================================================= */}

      {/* 2.1 PENDIDIKAN PANCASILA & BAHASA INDONESIA */}
      <div id="cp-pancasila-indonesia" className="border border-slate-300 rounded-xl p-4 bg-white space-y-3 print:break-before-page">
        <div className="flex justify-between items-center border-b border-emerald-800/20 pb-2">
          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">5</span>
            Mata Pelajaran: Pendidikan Pancasila & Bahasa Indonesia
          </h5>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">Nasional Terintegrasi</span>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Hal. 58</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-300">
            <thead className="bg-emerald-900 text-white font-bold text-left">
              <tr>
                <th className="border border-slate-300 p-2 w-32">Mata Pelajaran</th>
                <th className="border border-slate-300 p-2 w-28">Fase</th>
                <th className="border border-slate-300 p-2">Elemen & Capaian Pembelajaran</th>
                <th className="border border-slate-300 p-2 w-48">Integrasi Pilar Cinta & Karakter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={3}>
                  Pendidikan Pancasila
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Mengenal simbol-simbol Garuda Pancasila, menaati aturan di rumah dan madrasah, menghargai identitas diri dan teman sebaya yang majemuk, serta mengenal lambang NKRI.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Tanah Air, Taat Norma & Tata Tertib</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Memahami makna sila-sila Pancasila dalam keseharian, membedakan hak dan kewajiban warga kelas, mengapresiasi keragaman suku bangsa, budaya, dan agama di Indonesia, serta menjaga kerukunan lingkungan RT/Desa.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Sesama, Persatuan Bhinneka Tunggal Ika</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Menganalisis penerapan nilai-nilai luhur Pancasila dalam sejarah perjuangan, membiasakan musyawarah mufakat, mematuhi norma hukum dan kesusilaan, serta berperan aktif menjaga keutuhan NKRI dari ancaman intoleransi.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Kebenaran & Keadilan, Jiwa Demokratis</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={3}>
                  Bahasa Indonesia
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Menyimak, Membaca, Berbicara, Menulis:</strong> Menyimak instruksi lisan dan cerita bergambar; membaca kata dengan fonik dan suku kata terbuka/tertutup; mengekspresikan gagasan dan perasaan santun; menulis tegak bersambung dan kalimat sederhana.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Literasi Dasar, Komunikasi Empatik, Kejujuran</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Pemahaman Teks & Ekspresi:</strong> Menemukan gagasan pokok dan pendukung teks narasi/deskripsi; menyampaikan pendapat dalam diskusi kelas; menulis teks petunjuk dan karangan narasi imajinatif dengan EYD yang tertib.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Bernalar Kritis, Kreativitas Bahasa, Cinta Literasi</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Literasi Kritis & Kreatif:</strong> Menganalisis teks eksplanasi, pidato persuasif, dan laporan investigasi sederhana; melakukan wawancara santun; menulis cerpen bertema kasih sayang dan artikel opini madrasah.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Kebenaran, Berpikir Analitis & Kolaboratif</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.2 MATEMATIKA & ILMU PENGETAHUAN ALAM DAN SOSIAL (IPAS) */}
      <div id="cp-matematika-ipas" className="border border-slate-300 rounded-xl p-4 bg-white space-y-3 print:break-before-page">
        <div className="flex justify-between items-center border-b border-emerald-800/20 pb-2">
          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">6</span>
            Mata Pelajaran: Matematika & IPAS
          </h5>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">Sains & Numerasi</span>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Hal. 62</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-300">
            <thead className="bg-emerald-900 text-white font-bold text-left">
              <tr>
                <th className="border border-slate-300 p-2 w-32">Mata Pelajaran</th>
                <th className="border border-slate-300 p-2 w-28">Fase</th>
                <th className="border border-slate-300 p-2">Elemen & Capaian Pembelajaran</th>
                <th className="border border-slate-300 p-2 w-48">Integrasi Pilar Cinta & Karakter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={3}>
                  Matematika
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Bilangan cacah s.d. 100, penjumlahan & pengurangan; pola gambar, pengukuran panjang/berat tidak baku, pengenalan bangun datar segitiga, segiempat, lingkaran dan diagram turus.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Numerasi Berpikir Kritis, Ketelitian & Kejujuran</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Bilangan cacah s.d. 10.000, perkalian & pembagian bersusun, pecahan senilai & desimal sederhana; keliling dan luas bangun datar, pengukuran sudut, penyajian diagram batang.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Problem Solving, Logika Analitis, Tanggung Jawab</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Operasi hitung bilangan bulat, pecahan, persen, rasio/skala; FPB & KPK; bangun ruang kubus, balok, prisma, tabung serta volume; pengolahan data mean, median, modus dan peluang.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Kemandirian Matematis, Presisi & Integritas Ilmiah</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={2}>
                  IPAS (Ilmu Pengetahuan Alam & Sosial)
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Sains & Sosial Terpadu:</strong> Mengidentifikasi bagian tumbuhan & fungsinya, siklus hidup hewan, wujud zat dan perubahannya, gaya magnet dan gerak, serta peta wilayah lokal dan kearifan masyarakat agraris.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Alam & Lingkungan Hidup, Rasa Syukur Ekologis</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Eksplorasi Alam & Dinamika Bangsa:</strong> Menganalisis sistem organ pernapasan, pencernaan, dan peredaran darah manusia; jaring-jaring makanan ekosistem; energi alternatif; tata surya; serta sejarah perjuangan kemerdekaan RI dan letak geografis Indonesia di dunia.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Tanah Air, Kesadaran Global, Konservasi Energi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.3 SENI BUDAYA, PJOK, & BAHASA INGGRIS */}
      <div id="cp-seni-pjok-inggris" className="border border-slate-300 rounded-xl p-4 bg-white space-y-3 print:break-before-page">
        <div className="flex justify-between items-center border-b border-emerald-800/20 pb-2">
          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">7</span>
            Mata Pelajaran: Seni Budaya & Prakarya, PJOK, serta Bahasa Inggris
          </h5>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">Kreativitas & Raga</span>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Hal. 65</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-300">
            <thead className="bg-emerald-900 text-white font-bold text-left">
              <tr>
                <th className="border border-slate-300 p-2 w-32">Mata Pelajaran</th>
                <th className="border border-slate-300 p-2 w-28">Fase</th>
                <th className="border border-slate-300 p-2">Elemen & Capaian Pembelajaran</th>
                <th className="border border-slate-300 p-2 w-48">Integrasi Pilar Cinta & Karakter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={3}>
                  Seni Budaya & Prakarya
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Eksplorasi garis, bentuk, dan warna alami; bernyanyi lagu anak dan lagu daerah berirama riang; menirukan gerak tumbuhan dan hewan di alam sekitar.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Joyful Learning, Keindahan Alam Ciptaan Ilahi</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Menggambar ilustrasi bertema lingkungan, membuat anyaman dan kolase dari bahan daur ulang; memainkan alat musik ritmis/melodis sederhana; memperagakan gerak tari kreasi Nusantara.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Kreativitas, Cinta Lingkungan (Adiwiyata), Kebersamaan</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Membuat karya seni kaligrafi Arab kontemporer dan batik jumputan; menyanyikan lagu wajib nasional dan ansambel musik; merancang pameran dan pergelaran seni madrasah.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Seni Islami & Budaya Nusantara, Jiwa Estetik</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={3}>
                  PJOK (Jasmani & Kesehatan)
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Mempraktikkan pola gerak dasar lokomotor, non-lokomotor, dan manipulatif; menjaga kebersihan kuku, gigi, pakaian, dan cuci tangan pakai sabun.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Diri Sendiri, Kebersihan & Kebugaran Raga</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Menguasai variasi gerak dasar permainan bola besar (futsal/voli) dan bola kecil (kasti/bulutangkis); senam lantai; serta menjaga kebersihan lingkungan sekolah dari sarang nyamuk.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Sportivitas, Kerjasama Tim, Fairplay Islami</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Menerapkan taktik permainan beregu; gerak dasar atletik lari, lompat, lempar; aktivitas kebugaran jasmani terukur; pemahaman bahaya merokok, NAPZA, dan edukasi kesehatan reproduksi.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Kesehatan Jasmani & Rohani, Disiplin Hidup Sehat</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={3}>
                  Bahasa Inggris
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Listening & Speaking: Merespon salam (*Greetings*), memperkenalkan diri (*My name is...*), menyebutkan angka 1-20, warna, dan benda kelas dalam bahasa Inggris.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Kecakapan Komunikasi Multibahasa Sejak Dini</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Reading & Writing: Membaca teks bergambar tentang anggota keluarga (*Family*), makanan & minuman halal, waktu/jam, dan rutinitas harian (*Daily routine*).</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Wawasan Global, Kebiasaan Sehat & Teratur</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Literasi Komprehensif: Memahami dialog dan teks pendek deskripsi tempat wisata, resep kuliner sederhana, mendeskripsikan hewan peliharaan, dan bercerita pengalaman liburan.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Komunikasi Internasional Santun & Percaya Diri</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          3. KELOMPOK MUATAN LOKAL DAERAH & MUATAN KHUSUS MADRASAH CINTA
          ========================================================================= */}

      {/* 3.1 BAHASA JAWA, ASWAJA KE-NU-AN, & CODING/AI */}
      <div id="cp-mulok-aswaja-coding" className="border border-slate-300 rounded-xl p-4 bg-white space-y-3 print:break-before-page">
        <div className="flex justify-between items-center border-b border-emerald-800/20 pb-2">
          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span className="w-6 h-6 rounded bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">8</span>
            Muatan Lokal Wajib & Keunggulan Khusus (Bahasa Jawa, Aswaja NU, & Coding/AI)
          </h5>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">Khas Ma&apos;arif NU</span>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Hal. 67</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-300">
            <thead className="bg-emerald-900 text-white font-bold text-left">
              <tr>
                <th className="border border-slate-300 p-2 w-36">Mata Pelajaran</th>
                <th className="border border-slate-300 p-2 w-28">Fase</th>
                <th className="border border-slate-300 p-2">Elemen & Capaian Pembelajaran</th>
                <th className="border border-slate-300 p-2 w-48">Integrasi Pilar Cinta & Karakter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={3}>
                  Muatan Lokal: Bahasa Jawa
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Menyimak dongeng fabel kewan, melafalkan tembang dolanan (*Gundhul Pacul, Mentok-Mentok*), dan membiasakan unggah-ungguh basa ngoko-krama lugu marang wong tuwa.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Basa Ibu, Tata Krama & Budi Pekerti Luhur</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Membaca dan menulis Aksara Jawa legena (20 aksara) dan sandhangan swara (wulu, suku, pepet, taling, taling tarung); mengapresiasi crita wayang Pandhawa; nulis geguritan prasaja.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Pelestarian Warisan Luhur Nusantara & Karakter Satria</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Menguasai Aksara Jawa pasangan dan sandhangan panyigeg; pacelathon krama alus; nembang macapat Gambuh dan Mijil kanthi titi laras bener; mangerteni crita wayang Ramayana/Mahabarata.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Kearifan Budaya Jawa & Kematangan Budi</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={3}>
                  Ke-NU-an / Aswaja (Ahlussunnah wal Jama&apos;ah)
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase A (Kls 1-2)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Mengenal lambang Nahdlatul Ulama (bintang sembilan & tali jagat), tradisi salam santri, dan melantunkan Sholawat Badar serta Sholawat Nariyah.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Ulama & Habaib, Mahabbah Rasulullah</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 3-4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Memahami sejarah berdirinya Jam&apos;iyyah NU, peran Hadratusy Syaikh KH. Hasyim Asy&apos;ari & KH. Wahab Chasbullah; mempraktikkan amaliyah tahlilan, ziarah kubur, yasinan, dan maulidan.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Ukhuwah Islamiyah, Nilai Mabadi&apos; Khaira Ummah</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• Menganalisis 4 pilar moderasi Aswaja: <em>Tawassuth</em> (moderat), <em>Tawazun</em> (seimbang), <em>I&apos;tidal</em> (adil), dan <em>Tasamuh</em> (toleran); memahami peran Resolusi Jihad 22 Oktober 1945 dalam mempertahankan NKRI.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Cinta Tanah Air Sebagian dari Iman (Hubbul Wathan Minal Iman)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-bold text-emerald-950 bg-slate-50 align-top" rowSpan={2}>
                  Muatan Pilihan: Coding & Artificial Intelligence (AI)
                </td>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase B (Kls 4)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>Computational Thinking & Block Coding:</strong> Mengenal logika algoritma sekuensial, percabangan sederhana, pemrograman visual menggunakan Scratch / Blockly; membuat animasi edukasi bertema adab santri dan etika berinternet ramah anak.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Logika Kritis, Kreativitas Digital, Cyber Safety</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold align-top">Fase C (Kls 5-6)</td>
                <td className="border border-slate-300 p-2 space-y-1">
                  <p>• <strong>AI Literacy & Digital Project:</strong> Memahami konsep dasar kecerdasan buatan (AI) ramah anak, pengenalan prompt engineering sederhana, pembuatan game kuis interaktif Islami, dan analisis dampak positif-negatif teknologi pintar.</p>
                </td>
                <td className="border border-slate-300 p-2 text-emerald-900 font-medium align-top">Hebat Teknologi Berakhlak Mulia, Problem Solving Modern</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
