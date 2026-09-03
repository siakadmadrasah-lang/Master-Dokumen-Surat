import React from 'react';
import {
  BookOpen,
  Users,
  GraduationCap,
  Briefcase,
  Heart,
  Calendar,
  Award,
  Sparkles,
  Layers,
  FileText,
  CheckCircle2,
  BookmarkCheck,
  Compass,
  ShieldCheck,
} from 'lucide-react';
import { MadrasahProfile, OfficialDocument, Teacher, Student } from '../../types';
import { KemenagLogo, MaarifNuLogo } from '../OfficialLogos';

interface KomDocumentViewProps {
  document: OfficialDocument;
  profile: MadrasahProfile;
  teachers: Teacher[];
  students: Student[];
}

export const KomDocumentView: React.FC<KomDocumentViewProps> = ({
  document,
  profile,
  teachers,
  students,
}) => {
  const content = document.contentData || {};
  const bab1 = content.bab1 || {};
  const bab2 = content.bab2 || {};
  const bab3 = content.bab3 || {};
  const bab4 = content.bab4 || {};
  const bab5 = content.bab5 || {};

  // Compatibility fallbacks for legacy structure
  const visi = bab1.visi || content.visi || 'Terwujudnya Generasi Qurani yang Berakhlakul Karimah, Unggul dalam Prestasi, Inklusif, dan Menjunjung Tinggi Cinta Kasih serta Rahmatan Lil Alamin.';
  const misi = bab1.misi || content.misi || [
    'Menanamkan aqidah yang kokoh dan kecintaan mendalam kepada Allah SWT dan Rasulullah SAW.',
    'Membiasakan budaya saling menghargai, welas asih, anti-perundungan (zero bullying), dan ramah anak di seluruh lingkungan madrasah.',
    'Mengembangkan pembelajaran berdiferensiasi dan mendalam (deep learning) yang memerdekakan potensi akal, hati, dan keterampilan peserta didik.',
    'Menginternalisasi 10 Nilai Rahmatan Lil Alamin serta Penguatan Karakter Profil Pelajar.',
    'Membangun sinergi harmonis antara madrasah, orang tua, komite, dan masyarakat.',
  ];

  const pilarCinta = bab4.pilarCinta || content.pilarCinta || [
    {
      pilar: 'Cinta Allah SWT dan Rasulullah SAW (Mahabbatullah wa Rasulihi)',
      makna: 'Menumbuhkan kesadaran spiritual, keikhlasan niat, ibadah sholat berjamaah, tahfidz, dan keteladanan akhlak mulia Nabi Muhammad SAW.',
      indikator: 'Sholat dhuha & dhuhur berjamaah, pembiasaan doa harian, adab santun, dan tahsin Al-Qur\'an.',
    },
    {
      pilar: 'Cinta Ilmu Pengetahuan (Mahabbatul Ilmi)',
      makna: 'Membangun gairah belajar sepanjang hayat, rasa ingin tahu yang tinggi, bernalar kritis, dan kejujuran ilmiah.',
      indikator: 'Budaya literasi madrasah, eksplorasi sains islami, riset sederhana, dan antusiasme diskusi ilmiah.',
    },
    {
      pilar: 'Cinta Diri Sendiri dan Sesama (Mahabbatun Nafsi wal Ikhwan)',
      makna: 'Menjaga kehormatan diri, kesehatan fisik-mental, empati, tolong-menolong, toleransi, dan komitmen madrasah ramah anak (zero bullying).',
      indikator: 'Saling menyapa (5S), anti-kekerasan verbal/fisik, inklusivitas tanpa diskriminasi, dan kepedulian sosial.',
    },
    {
      pilar: 'Cinta Lingkungan dan Alam Sekitar (Mahabbatul Bi\'ah)',
      makna: 'Menghargai alam semesta sebagai ciptaan Allah SWT, menjaga kebersihan, kelestarian ekosistem, dan hemat energi.',
      indikator: 'Program Madrasah Adiwiyata / Hijau, pilah sampah, hidroponik, sedekah pohon, dan pengurangan plastik.',
    },
    {
      pilar: 'Cinta Tanah Air dan Bangsa (Mahabbatul Wathan)',
      makna: 'Hubbul wathan minal iman, menanamkan jiwa patriotisme, penghargaan keberagaman suku/budaya, dan moderasi beragama.',
      indikator: 'Upacara bendera rutin, penghormatan lambang negara, wawasan kebangsaan, dan kerukunan antarumat beragama.',
    },
  ];

  const strukturKurikulum = bab2.strukturKurikulum || content.strukturKurikulum || [
    { no: 1, mapel: "Al-Qur'an Hadis", jtmIntra: 72, jtmKokurikuler: 24, totalJTM: 96 },
    { no: 2, mapel: 'Akidah Akhlak', jtmIntra: 72, jtmKokurikuler: 24, totalJTM: 96 },
    { no: 3, mapel: 'Fikih', jtmIntra: 72, jtmKokurikuler: 24, totalJTM: 96 },
    { no: 4, mapel: 'Sejarah Kebudayaan Islam (SKI)', jtmIntra: 72, jtmKokurikuler: 24, totalJTM: 96 },
    { no: 5, mapel: 'Pendidikan Pancasila', jtmIntra: 144, jtmKokurikuler: 36, totalJTM: 180 },
    { no: 6, mapel: 'Bahasa Indonesia', jtmIntra: 216, jtmKokurikuler: 72, totalJTM: 288 },
    { no: 7, mapel: 'Matematika', jtmIntra: 180, jtmKokurikuler: 36, totalJTM: 216 },
    { no: 8, mapel: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', jtmIntra: 180, jtmKokurikuler: 36, totalJTM: 216 },
    { no: 9, mapel: 'Bahasa Arab', jtmIntra: 72, jtmKokurikuler: 24, totalJTM: 96 },
    { no: 10, mapel: 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)', jtmIntra: 108, jtmKokurikuler: 36, totalJTM: 144 },
    { no: 11, mapel: 'Seni Budaya dan Prakarya', jtmIntra: 108, jtmKokurikuler: 36, totalJTM: 144 },
    { no: 12, mapel: 'Bahasa Inggris / Informatika', jtmIntra: 72, jtmKokurikuler: 24, totalJTM: 96 },
    { no: 13, mapel: 'Muatan Lokal: Bahasa Daerah (Jawa/Sunda) & Tahfidz', jtmIntra: 72, jtmKokurikuler: 0, totalJTM: 72 },
  ];

  const kokurikulerThemes = bab2.kokurikulerThemes || bab2.temaKokurikuler || bab2.p5raThemes || content.p5raThemes || [
    'Kearifan Lokal & Adab Islami: Meneladani Akhlak Mulia dalam Kehidupan Bermasyarakat',
    'Gaya Hidup Berkelanjutan: Madrasah Hijau Ramah Lingkungan dan Bersih Sampah',
    'Bangunlah Jiwa dan Raganya: Gerakan Madrasah Sehat, Bahagia, dan Zero Bullying',
    'Kewirausahaan Berkah: Kreativitas dan Kemandirian Anak Madrasah',
    'Bhinneka Tunggal Ika & Moderasi Beragama: Menjalin Ukhuwah dalam Keberagaman Bangsa',
  ];

  const rawLampiranList = content.lampiranList || [
    '1. SK Tim Pengembang Kurikulum (TPK) Madrasah',
    '2. Rekapitulasi Beban Kerja & Pembagian Tugas Guru (Sinkron Data GTK)',
    '3. Rekapitulasi Rombongan Belajar & Data Peserta Didik (Sinkron Data Siswa)',
    '4. Kalender Pendidikan Madrasah Tahun Ajaran Berjalan',
    '5. Alur Tujuan Pembelajaran (ATP) Mata Pelajaran',
    '6. Contoh Modul Ajar / RPP Berdiferensiasi & Deep Learning',
    '7. Contoh Panduan / Modul Projek Kokurikuler (KMA 1503/2025)',
    '8. Instrumen Asesmen dan Rubrik KKTP',
    '9. Instrumen Supervisi Klinis & Pembelajaran',
    '10. Panduan dan Program Ekstrakurikuler Madrasah',
    '11. Pedoman Muatan Lokal Keagamaan / Daerah',
    '12. Program Pembiasaan & Ikrar Madrasah Ramah Anak (Anti-Bullying)',
    '13. Rencana Kerja Tahunan Tim TPK',
    '14. Berita Acara & Notulen Rapat Penyusunan KOM',
    '15. Daftar Hadir Rapat Kerja Penyusunan Kurikulum',
    '16. Lembar Validasi / Rekomendasi Pengawas Madrasah Kemenag',
    '17. Instrumen Evaluasi Keterlaksanaan KOM',
  ];

  const lampiranList = rawLampiranList.map((item: any) =>
    typeof item === 'string' ? item : `${item.kode ? item.kode + ': ' : ''}${item.judul || ''}`
  );

  return (
    <div className="space-y-8 text-slate-800 font-sans">
      {/* Quick Section Navigation Bar (Hidden in Print) */}
      <div className="print:hidden bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            Navigasi Cepat Dokumen KOM (KMA 1503/2025 & Berbasis Cinta)
          </span>
          <span className="text-[10px] text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full font-bold border border-emerald-300">
            Struktur Standar KMA 1503/2025: Bab I - V + 17 Lampiran
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <a href="#kom-cover" className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-emerald-900 transition-colors">📑 Halaman Judul</a>
          <a href="#kom-pengesahan" className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-emerald-900 transition-colors">✍️ Lembar Pengesahan</a>
          <a href="#kom-pengantar" className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-emerald-900 transition-colors">📖 Kata Pengantar</a>
          <a href="#kom-daftar-isi" className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-emerald-900 transition-colors">📋 Daftar Isi</a>
          <a href="#kom-bab1" className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-emerald-900 transition-colors">🏛️ Bab I: Karakteristik</a>
          <a href="#kom-bab2" className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-emerald-900 transition-colors">📚 Bab II: Pengorganisasian (KMA 1503)</a>
          <a href="#kom-bab3" className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-emerald-900 transition-colors">📝 Bab III: Perencanaan & Deep Learning</a>
          <a href="#kom-bab4" className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-emerald-900 transition-colors">💖 Bab IV: Kurikulum Berbasis Cinta</a>
          <a href="#kom-bab5" className="px-2.5 py-1 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-emerald-900 transition-colors">🔍 Bab V: Pendampingan & Evaluasi</a>
          <a href="#kom-lampiran" className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold transition-colors">📎 17 Lampiran (Sync Data)</a>
        </div>
      </div>

      {/* =========================================================================
          1. HALAMAN JUDUL (COVER)
          ========================================================================= */}
      <div
        id="kom-cover"
        className="border-4 border-double border-emerald-900/40 rounded-2xl p-6 sm:p-10 text-center space-y-5 bg-gradient-to-b from-emerald-50/30 to-white my-4 print:my-0 print:border-4 print:p-8 print:break-after-page print:min-h-0 print:h-auto print:block"
      >
        <div className="flex justify-center items-center gap-8 mb-2">
          {profile.logoKemenagUrl && !profile.logoKemenagUrl.includes('wikimedia.org') ? (
            <img
              src={profile.logoKemenagUrl}
              alt="Logo Kemenag"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <KemenagLogo className="w-20 h-20 sm:w-24 sm:h-24" />
          )}

          {profile.logoMadrasahUrl ? (
            <img
              src={profile.logoMadrasahUrl}
              alt="Logo Madrasah"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <MaarifNuLogo className="w-20 h-20 sm:w-24 sm:h-24" />
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            DOKUMEN UTAMA KURIKULUM MADRASAH
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 uppercase tracking-tight font-serif">
            KURIKULUM OPERASIONAL MADRASAH (KOM)
          </h1>
          <p className="text-sm sm:text-base font-bold text-emerald-800 uppercase">
            IMPLEMENTASI KURIKULUM MERDEKA BERBASIS CINTA (MAHABBAH)
          </p>
          <div className="inline-block bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold px-3.5 py-1 rounded-full text-xs font-mono">
            SESUAI KEPUTUSAN MENTERI AGAMA (KMA) NOMOR 1503 TAHUN 2025
          </div>
        </div>

        <div className="py-6 space-y-2 border-y border-emerald-900/15">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Disusun & Diberlakukan Oleh:
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 uppercase font-serif">
            {profile.namaMadrasah}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-mono font-semibold">
            NSM: {profile.nsm} | NPSN: {profile.npsn} | Status: {profile.status} | Akreditasi: {profile.akreditasi}
          </p>
          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            {profile.alamat}, {profile.desaKelurahan}, Kec. {profile.kecamatan}, {profile.kabupatenKota}, {profile.provinsi} {profile.kodePos ? `(${profile.kodePos})` : ''}
          </p>
          {profile.email && (
            <p className="text-[11px] text-slate-500 font-mono">
              Email: {profile.email} {profile.website ? `| Website: ${profile.website}` : ''}
            </p>
          )}
        </div>

        <div className="pt-2 text-xs font-bold text-slate-800 space-y-1">
          <p>KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
          <p>KANTOR KEMENTERIAN AGAMA {profile.kabupatenKota?.toUpperCase() || 'KABUPATEN BANYUMAS'}</p>
          <p className="text-emerald-900 font-mono text-base font-extrabold mt-2">
            TAHUN PELAJARAN {document.tahunAjaran}
          </p>
        </div>
      </div>

      {/* =========================================================================
          2. LEMBAR PENGESAHAN
          ========================================================================= */}
      <div id="kom-pengesahan" className="space-y-4 pt-6 border-t-2 border-slate-200 print:break-before-page print:border-none print:pt-0">
        <div className="text-center space-y-1">
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 underline font-serif">
            LEMBAR PENGESAHAN
          </h2>
          <p className="text-xs font-bold text-emerald-900">
            KURIKULUM OPERASIONAL {profile.namaMadrasah.toUpperCase()}
          </p>
          <p className="text-xs text-slate-600 font-mono">Nomor Dokumen: {document.nomorSurat}</p>
        </div>

        <div className="text-justify text-xs sm:text-[12px] leading-relaxed space-y-3">
          <p>
            Setelah melalui proses penyusunan, pengkajian karakteristik satuan pendidikan, perumusan visi, misi, dan tujuan,
            penelaahan struktur kurikulum sesuai <strong>Keputusan Menteri Agama (KMA) Nomor 1503 Tahun 2025</strong>, serta
            pembahasan mendalam bersama <strong>Tim Pengembang Kurikulum (TPK)</strong>, Dewan Pendidik, dan Komite Madrasah
            dengan memperhatikan arahan Pengawas Pembina Kementerian Agama, maka dokumen:
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 my-2 text-xs">
            <table className="w-full">
              <tbody>
                <tr><td className="w-48 font-semibold py-0.5 text-slate-700">Nama Satuan Pendidikan</td><td className="font-bold text-slate-900">: {profile.namaMadrasah}</td></tr>
                <tr><td className="font-semibold py-0.5 text-slate-700">Nomor Statistik Madrasah (NSM)</td><td className="font-mono font-semibold">: {profile.nsm}</td></tr>
                <tr><td className="font-semibold py-0.5 text-slate-700">NPSN</td><td className="font-mono font-semibold">: {profile.npsn}</td></tr>
                <tr><td className="font-semibold py-0.5 text-slate-700">Alamat Madrasah</td><td>: {profile.alamat}, {profile.kabupatenKota}</td></tr>
                <tr><td className="font-semibold py-0.5 text-slate-700">Tahun Pelajaran</td><td className="font-bold text-emerald-900">: {document.tahunAjaran}</td></tr>
                <tr><td className="font-semibold py-0.5 text-slate-700">Regulasi Acuan</td><td className="font-bold text-slate-900">: KMA Nomor 1503 Tahun 2025 & Kurikulum Berbasis Cinta</td></tr>
              </tbody>
            </table>
          </div>

          <p>
            Ditetapkan dan disahkan secara resmi untuk diberlakukan sebagai pedoman dan rujukan operasional
            penyelenggaraan intrakurikuler, kokurikuler, ekstrakurikuler, serta pembiasaan nilai cinta (mahabbah)
            pada <strong>{profile.namaMadrasah}</strong> Tahun Pelajaran {document.tahunAjaran}.
          </p>
        </div>

        {/* 3 Signature Blocks: Komite, Kepala Madrasah, Pengawas/Kemenag */}
        <div className="pt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-600">Menyetujui,</p>
              <p className="font-bold text-slate-900 mt-0.5">Ketua Komite Madrasah</p>
              <div className="h-16 flex items-center justify-center my-2">
                <span className="text-[10px] text-emerald-800 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  [Tertanda Komite]
                </span>
              </div>
              <p className="font-bold underline text-slate-900">{profile.namaKetuaKomite || 'Ketua Komite Madrasah'}</p>
            </div>

            <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-600">Ditetapkan di: {profile.titimangsa || 'Malang'}</p>
              <p className="font-bold text-slate-900 mt-0.5">Kepala {profile.namaMadrasah}</p>
              <div className="h-16 flex items-center justify-center my-2">
                <span className="text-[10px] text-emerald-800 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  [Tertanda & Cap Resmi]
                </span>
              </div>
              <p className="font-bold underline text-slate-900">{profile.namaKepala}</p>
              <p className="font-mono text-[11px] text-slate-600">NIP. {profile.nipKepala || '-'}</p>
            </div>
          </div>

          <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-sm mx-auto text-xs">
            <p className="text-slate-600">Mengesahkan / Mengetahui:</p>
            <p className="font-bold text-slate-900 mt-0.5">Pengawas Madrasah Pembina Kemenag</p>
            <div className="h-16 flex items-center justify-center my-2">
              <span className="text-[10px] text-emerald-800 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                [Validasi Pengawas]
              </span>
            </div>
            <p className="font-bold underline text-slate-900">{profile.namaPengawas || 'Pengawas Madrasah'}</p>
            <p className="font-mono text-[11px] text-slate-600">NIP. {profile.nipPengawas || '-'}</p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. KATA PENGANTAR
          ========================================================================= */}
      <div id="kom-pengantar" className="space-y-3 pt-8 border-t-2 border-slate-200 print:break-before-page print:border-none print:pt-0">
        <div className="text-center space-y-1">
          <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 underline font-serif">
            KATA PENGANTAR KEPALA MADRASAH
          </h3>
        </div>
        <div className="text-justify text-xs sm:text-[12px] leading-relaxed space-y-3 whitespace-pre-line text-slate-700">
          {content.kataPengantar || `Puji dan syukur senantiasa kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Pengasih dan Maha Penyayang, atas limpahan rahmat, taufiq, dan inayah-Nya sehingga dokumen Kurikulum Operasional Madrasah (KOM) ${profile.namaMadrasah} Tahun Pelajaran ${document.tahunAjaran} dapat diselesaikan dengan baik.\n\nDokumen KOM ini disusun berdasarkan Keputusan Menteri Agama (KMA) Nomor 1503 Tahun 2025 tentang Kurikulum Madrasah dan diintegrasikan secara holistik dengan filosofi Kurikulum Berbasis Cinta (Mahabbah). Kurikulum ini dirancang untuk mewujudkan madrasah yang ramah anak, berkeadaban, bernalar kritis, dan berwawasan lingkungan.\n\nTerima kasih dan penghargaan setinggi-tingginya kami sampaikan kepada Tim Pengembang Kurikulum (TPK), seluruh Dewan Guru, Komite Madrasah, serta Pengawas Pembina Kementerian Agama atas dedikasi dan sumbangsih pemikirannya. Semoga Allah SWT senantiasa meridhoi ikhtiar kita bersama.`}
        </div>
        <div className="text-right text-xs pt-4">
          <p>{profile.titimangsa}, {document.tanggalSurat}</p>
          <p className="font-semibold text-slate-900 mt-1">Kepala {profile.namaMadrasah}</p>
          <p className="font-bold underline text-emerald-950 mt-10">{profile.namaKepala}</p>
          <p className="font-mono text-[11px] text-slate-600">NIP. {profile.nipKepala || '-'}</p>
        </div>
      </div>

      {/* =========================================================================
          4. DAFTAR ISI RESMI
          ========================================================================= */}
      <div id="kom-daftar-isi" className="space-y-3 pt-8 border-t-2 border-slate-200 print:break-before-page print:border-none print:pt-0">
        <div className="text-center space-y-1">
          <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900 underline font-serif">
            DAFTAR ISI LENGKAP DOKUMEN KOM
          </h3>
        </div>
        <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-4 sm:p-6 text-xs space-y-3">
          {/* Cover, Pengesahan, Pengantar, Daftar Isi */}
          <div className="space-y-1.5 border-b border-slate-200 pb-2.5 text-slate-700">
            <div className="flex justify-between font-semibold"><span>HALAMAN JUDUL</span><span className="font-mono">i</span></div>
            <div className="flex justify-between font-semibold"><span>LEMBAR PENGESAHAN</span><span className="font-mono">ii</span></div>
            <div className="flex justify-between font-semibold"><span>KATA PENGANTAR</span><span className="font-mono">iii</span></div>
            <div className="flex justify-between font-semibold"><span>DAFTAR ISI</span><span className="font-mono">iv</span></div>
          </div>

          {/* Bab I */}
          <div className="space-y-1">
            <div className="flex justify-between font-bold text-emerald-950 border-b border-dashed border-slate-300 pb-0.5">
              <span>BAB I — KARAKTERISTIK MADRASAH</span>
              <span className="font-mono">1</span>
            </div>
            <div className="pl-4 space-y-0.5 text-slate-600 text-[11px]">
              <div className="flex justify-between"><span>1. Identitas Madrasah</span><span className="font-mono">1</span></div>
              <div className="flex justify-between"><span>2. Karakteristik Peserta Didik</span><span className="font-mono">2</span></div>
              <div className="flex justify-between"><span>3. Karakteristik Pendidik dan Tenaga Kependidikan</span><span className="font-mono">4</span></div>
              <div className="flex justify-between"><span>4. Karakteristik Sosial, Budaya, dan Lingkungan Madrasah</span><span className="font-mono">6</span></div>
              <div className="flex justify-between"><span>5. Potensi dan Kondisi Lingkungan Sekitar</span><span className="font-mono">8</span></div>
              <div className="flex justify-between"><span>6. Analisis Karakteristik Madrasah</span><span className="font-mono">10</span></div>
              <div className="flex justify-between"><span>7. Visi Madrasah</span><span className="font-mono">12</span></div>
              <div className="flex justify-between"><span>8. Misi Madrasah</span><span className="font-mono">13</span></div>
              <div className="flex justify-between"><span>9. Tujuan Madrasah</span><span className="font-mono">14</span></div>
            </div>
          </div>

          {/* Bab II */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between font-bold text-emerald-950 border-b border-dashed border-slate-300 pb-0.5">
              <span>BAB II — PENGORGANISASIAN PEMBELAJARAN (KMA 1503/2025)</span>
              <span className="font-mono">16</span>
            </div>
            <div className="pl-4 space-y-0.5 text-slate-600 text-[11px]">
              <div className="flex justify-between"><span>1. Struktur Kurikulum MI (KMA 1503/2025)</span><span className="font-mono">16</span></div>
              <div className="flex justify-between"><span>2. Intrakurikuler</span><span className="font-mono">18</span></div>
              <div className="flex justify-between font-semibold text-emerald-900"><span>3. Kokurikuler (Penyesuaian KMA 1503/2025)</span><span className="font-mono">20</span></div>
              <div className="flex justify-between"><span>4. Muatan Lokal</span><span className="font-mono">22</span></div>
              <div className="flex justify-between"><span>5. Ekstrakurikuler</span><span className="font-mono">24</span></div>
              <div className="flex justify-between"><span>6. Pengaturan Beban Belajar</span><span className="font-mono">26</span></div>
              <div className="flex justify-between"><span>7. Kalender Pendidikan</span><span className="font-mono">28</span></div>
              <div className="flex justify-between"><span>8. Pengaturan Waktu Pembelajaran</span><span className="font-mono">30</span></div>
              <div className="flex justify-between"><span>9. Program Pengembangan Kompetensi Peserta Didik</span><span className="font-mono">32</span></div>
            </div>
          </div>

          {/* Bab III */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between font-bold text-emerald-950 border-b border-dashed border-slate-300 pb-0.5">
              <span>BAB III — PERENCANAAN PEMBELAJARAN & DEEP LEARNING</span>
              <span className="font-mono">34</span>
            </div>
            <div className="pl-4 space-y-0.5 text-slate-600 text-[11px]">
              <div className="flex justify-between"><span>1. Capaian Pembelajaran (CP)</span><span className="font-mono">34</span></div>
              <div className="flex justify-between"><span>2. Tujuan Pembelajaran (TP)</span><span className="font-mono">36</span></div>
              <div className="flex justify-between"><span>3. Alur Tujuan Pembelajaran (ATP)</span><span className="font-mono">38</span></div>
              <div className="flex justify-between"><span>4. Perencanaan Pembelajaran (RPP / Modul Ajar)</span><span className="font-mono">40</span></div>
              <div className="flex justify-between"><span>5. Modul Ajar / Perangkat Ajar</span><span className="font-mono">42</span></div>
              <div className="flex justify-between"><span>6. Pendekatan Pembelajaran Mendalam (Deep Learning)</span><span className="font-mono">44</span></div>
              <div className="flex justify-between"><span>7. Asesmen Pembelajaran (Diagnostik, Formatif, Sumatif)</span><span className="font-mono">46</span></div>
              <div className="flex justify-between"><span>8. Program Remedial dan Pengayaan</span><span className="font-mono">48</span></div>
              <div className="flex justify-between"><span>9. Kriteria Kenaikan Kelas (KKTP)</span><span className="font-mono">50</span></div>
              <div className="flex justify-between"><span>10. Kriteria Kelulusan Peserta Didik</span><span className="font-mono">52</span></div>
            </div>
          </div>

          {/* Bab IV */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between font-bold text-emerald-950 border-b border-dashed border-slate-300 pb-0.5">
              <span>BAB IV — KURIKULUM BERBASIS CINTA (5 PILAR MAHABBAH)</span>
              <span className="font-mono">54</span>
            </div>
            <div className="pl-4 space-y-0.5 text-slate-600 text-[11px]">
              <div className="flex justify-between"><span>1. Penguatan Implementasi Kurikulum Berbasis Cinta</span><span className="font-mono">54</span></div>
              <div className="flex justify-between"><span>2. Pilar 1: Cinta Allah SWT dan Rasulullah SAW</span><span className="font-mono">56</span></div>
              <div className="flex justify-between"><span>3. Pilar 2: Cinta Ilmu Pengetahuan</span><span className="font-mono">57</span></div>
              <div className="flex justify-between"><span>4. Pilar 3: Cinta Diri Sendiri dan Sesama (Zero Bullying)</span><span className="font-mono">58</span></div>
              <div className="flex justify-between"><span>5. Pilar 4: Cinta Lingkungan dan Alam Sekitar</span><span className="font-mono">59</span></div>
              <div className="flex justify-between"><span>6. Pilar 5: Cinta Tanah Air dan Bangsa</span><span className="font-mono">60</span></div>
              <div className="flex justify-between"><span>7. Implementasi dalam Pembelajaran</span><span className="font-mono">61</span></div>
              <div className="flex justify-between"><span>8. Pembiasaan dan Budaya Positif Madrasah</span><span className="font-mono">63</span></div>
            </div>
          </div>

          {/* Bab V */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between font-bold text-emerald-950 border-b border-dashed border-slate-300 pb-0.5">
              <span>BAB V — PENDAMPINGAN, EVALUASI, DAN PENGEMBANGAN PROFESIONAL</span>
              <span className="font-mono">65</span>
            </div>
            <div className="pl-4 space-y-0.5 text-slate-600 text-[11px]">
              <div className="flex justify-between"><span>1. Pendampingan Implementasi Kurikulum</span><span className="font-mono">65</span></div>
              <div className="flex justify-between"><span>2. Supervisi Akademik dan Klinis</span><span className="font-mono">67</span></div>
              <div className="flex justify-between"><span>3. Evaluasi Kurikulum Operasional Madrasah</span><span className="font-mono">69</span></div>
              <div className="flex justify-between"><span>4. Refleksi Pendidik dalam Pembelajaran</span><span className="font-mono">71</span></div>
              <div className="flex justify-between"><span>5. Pengembangan Profesional Guru (PKB & Pintar Kemenag)</span><span className="font-mono">73</span></div>
              <div className="flex justify-between"><span>6. Tindak Lanjut Hasil Evaluasi</span><span className="font-mono">75</span></div>
            </div>
          </div>

          {/* Lampiran List */}
          <div className="space-y-1 pt-2 border-t border-slate-200">
            <div className="flex justify-between font-bold text-emerald-950">
              <span>LAMPIRAN-LAMPIRAN DOKUMEN KOM (17 ITEM LENGKAP)</span>
              <span className="font-mono">77</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BAB I — KARAKTERISTIK MADRASAH
          ========================================================================= */}
      <div id="kom-bab1" className="space-y-4 pt-8 border-t-2 border-slate-200 print:break-before-page print:border-none print:pt-0">
        <div className="bg-emerald-900 text-white px-4 py-2 rounded-xl flex items-center justify-between shadow-xs">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-300" />
            BAB I — KARAKTERISTIK MADRASAH
          </h3>
          <span className="text-[10px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded font-mono font-bold">KMA 1503/2025</span>
        </div>

        <div className="text-justify text-xs sm:text-[12px] leading-relaxed space-y-4 pl-1 text-slate-800">
          {/* 1. Identitas */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">1</span>
              <span>Identitas Madrasah</span>
            </h4>
            <p className="text-slate-700 mb-2">
              {profile.namaMadrasah} merupakan satuan pendidikan formal berciri khas Islam di bawah naungan Kementerian Agama Republik Indonesia dengan rincian identitas resmi sebagai berikut:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div><span className="text-slate-500 font-medium">Nama Madrasah:</span> <span className="font-bold text-slate-900">{profile.namaMadrasah}</span></div>
              <div><span className="text-slate-500 font-medium">NSM / NPSN:</span> <span className="font-mono font-bold text-slate-900">{profile.nsm} / {profile.npsn}</span></div>
              <div><span className="text-slate-500 font-medium">Jenjang & Status:</span> <span className="font-semibold text-slate-900">{profile.jenjang} ({profile.status})</span></div>
              <div><span className="text-slate-500 font-medium">Akreditasi:</span> <span className="font-bold text-emerald-900">{profile.akreditasi}</span></div>
              <div className="sm:col-span-2"><span className="text-slate-500 font-medium">Alamat:</span> <span className="text-slate-800">{profile.alamat}, {profile.desaKelurahan}, Kec. {profile.kecamatan}, {profile.kabupatenKota}, {profile.provinsi}</span></div>
            </div>
          </div>

          {/* 2. Karakteristik Peserta Didik */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">2</span>
              <span>Karakteristik Peserta Didik</span>
            </h4>
            <p className="text-slate-700">
              {bab1.karakteristikPesertaDidik || `Peserta didik pada ${profile.namaMadrasah} berjumlah ${students.length} orang yang terbagi dalam berbagai rombongan belajar. Peserta didik memiliki latar belakang potensi kecerdasan majemuk (multiple intelligences), minat tahfidz dan keagamaan yang kuat, serta keberagaman gaya belajar (visual, auditori, dan kinestetik). Madrasah menerapkan prinsip pendidikan inklusif, ramah anak, anti-kekerasan, dan non-diskriminasi sehingga seluruh peserta didik mendapatkan ruang tumbuh kembang yang aman, nyaman, dan penuh kasih sayang.`}
            </p>

            {/* Live Student Demographic Snapshot */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 my-2.5">
              <p className="font-bold text-emerald-950 text-[11.5px] mb-1.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                Snapshot Data Agregat Peserta Didik (Sinkron Database Madrasah):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2 rounded-lg border border-emerald-100 text-center">
                  <span className="text-slate-500 text-[10px]">Total Siswa Terdata</span>
                  <p className="font-bold text-sm text-emerald-900">{students.length} Anak</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100 text-center">
                  <span className="text-slate-500 text-[10px]">Laki-laki (L)</span>
                  <p className="font-bold text-sm text-blue-900">{students.filter((s) => s.jenisKelamin === 'L').length} Siswa</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100 text-center">
                  <span className="text-slate-500 text-[10px]">Perempuan (P)</span>
                  <p className="font-bold text-sm text-rose-900">{students.filter((s) => s.jenisKelamin === 'P').length} Siswi</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100 text-center">
                  <span className="text-slate-500 text-[10px]">Rombel Aktif</span>
                  <p className="font-bold text-sm text-purple-900">{Array.from(new Set(students.map((s) => s.rombel))).length} Rombel</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Karakteristik GTK */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">3</span>
              <span>Karakteristik Pendidik dan Tenaga Kependidikan (GTK)</span>
            </h4>
            <p className="text-slate-700">
              {bab1.karakteristikGTK || `Pendidik dan Tenaga Kependidikan (GTK) ${profile.namaMadrasah} berjumlah ${teachers.length} orang dengan kualifikasi akademik sarjana (S1) dan magister (S2). Sebagian besar pendidik telah memiliki Sertifikat Pendidik Profesional, menguasai kompetensi pedagogik modern, literasi digital, serta memiliki komitmen kuat dalam menerapkan pendekatan pedagogi welas asih (pedagogy of love) dan pembelajaran mendalam.`}
            </p>

            {/* Live Teacher Snapshot */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 my-2.5">
              <p className="font-bold text-emerald-950 text-[11.5px] mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                Snapshot Kualifikasi & Status Pendidik (Sinkron Database GTK):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2 rounded-lg border border-emerald-100 text-center">
                  <span className="text-slate-500 text-[10px]">Total Guru & Tendik</span>
                  <p className="font-bold text-sm text-emerald-900">{teachers.length} Orang</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100 text-center">
                  <span className="text-slate-500 text-[10px]">PNS / PPPK</span>
                  <p className="font-bold text-sm text-emerald-800">{teachers.filter((t) => t.statusKepegawaian === 'PNS' || t.statusKepegawaian === 'PPPK').length} Guru</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100 text-center">
                  <span className="text-slate-500 text-[10px]">Tersertifikasi Pendidik</span>
                  <p className="font-bold text-sm text-amber-700">{teachers.filter((t) => t.sertifikasi).length} Guru</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-emerald-100 text-center">
                  <span className="text-slate-500 text-[10px]">Non-ASN / Honorer</span>
                  <p className="font-bold text-sm text-slate-700">{teachers.filter((t) => t.statusKepegawaian === 'NON_PNS' || t.statusKepegawaian === 'HONORER').length} Guru</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Sosial, Budaya, Lingkungan */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">4</span>
              <span>Karakteristik Sosial, Budaya, dan Lingkungan Madrasah</span>
            </h4>
            <p className="text-slate-700">
              {bab1.karakteristikSosialBudaya || `${profile.namaMadrasah} berada di lingkungan masyarakat yang religius, guyub rukun, dan berpegang teguh pada nilai-nilai tradisi keislaman Nusantara. Masyarakat sekitar sangat menghormati nilai-nilai kesopanan, gotong royong, dan memiliki kepercayaan tinggi terhadap pendidikan madrasah sebagai benteng moral dan akidah putra-putrinya.`}
            </p>
          </div>

          {/* 5. Potensi & Kondisi Sekitar */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">5</span>
              <span>Potensi dan Kondisi Lingkungan Sekitar</span>
            </h4>
            <p className="text-slate-700">
              {bab1.potensiLingkungan || `Madrasah memiliki kemitraan strategis dengan pondok pesantren, perguruan tinggi, puskesmas, instansi keagamaan (KUA & Kemenag), serta sentra UMKM dan agribisnis lokal yang menjadi wahana riset, pembelajaran kontekstual, dan penguatan kokurikuler peserta didik.`}
            </p>
          </div>

          {/* 6. Analisis Karakteristik */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">6</span>
              <span>Analisis Karakteristik Madrasah (Kekuatan, Peluang, dan Tantangan)</span>
            </h4>
            <p className="text-slate-700">
              {bab1.analisisKarakteristik || `Berdasarkan analisis konteks internal dan eksternal, madrasah memiliki kekuatan pada komitmen spiritual dan budaya ramah anak, peluang pada digitalisasi pembelajaran dan dukungan komite yang solid, serta tantangan dalam membimbing peserta didik menghadapi disrupsi era kecerdasan buatan (AI) dengan tetap berpegang pada integritas moral Islam.`}
            </p>
          </div>

          {/* 7. Visi */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">7</span>
              <span>Visi Madrasah</span>
            </h4>
            <div className="p-3.5 bg-emerald-50/80 border-l-4 border-emerald-700 rounded-r-xl italic font-serif text-emerald-950 text-xs sm:text-[13px] leading-relaxed">
              &ldquo;{visi}&rdquo;
            </div>
          </div>

          {/* 8. Misi */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">8</span>
              <span>Misi Madrasah</span>
            </h4>
            <ol className="list-decimal pl-5 space-y-1 text-slate-700">
              {misi.map((m: string, idx: number) => (
                <li key={idx}>{m}</li>
              ))}
            </ol>
          </div>

          {/* 9. Tujuan */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">9</span>
              <span>Tujuan Madrasah</span>
            </h4>
            <div className="space-y-2 text-slate-700 text-xs">
              <p><strong>a. Tujuan Jangka Panjang (8 Tahun):</strong> {bab1.tujuan?.jangkaPanjang || bab1.tujuanJangkaPanjang || content.tujuanJangkaPanjang || 'Menghasilkan lulusan madrasah yang kokoh akidah, berakhlak Qurani, hafal juz pilihan, menguasai literasi sains-teknologi, dan berdaya saing global.'}</p>
              <p><strong>b. Tujuan Jangka Menengah (4 Tahun):</strong> {bab1.tujuan?.jangkaMenengah || bab1.tujuanJangkaMenengah || content.tujuanJangkaMenengah || 'Mewujudkan madrasah inklusif ramah anak, terakreditasi Unggul, berprestasi dalam ajang KSM/MYRES, dan menjadi rujukan implementasi Kurikulum Berbasis Cinta.'}</p>
              <p><strong>c. Tujuan Jangka Pendek (T.A {document.tahunAjaran}):</strong> {Array.isArray(bab1.tujuan?.jangkaPendek) ? bab1.tujuan.jangkaPendek.join('; ') : bab1.tujuan?.jangkaPendek || bab1.tujuanJangkaPendek || 'Terlaksananya 100% pembelajaran berdiferensiasi dan mendalam, terbentuknya karakter welas asih tanpa perundungan, dan tuntasnya seluruh modul kokurikuler.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BAB II — PENGORGANISASIAN PEMBELAJARAN (KMA 1503/2025)
          ========================================================================= */}
      <div id="kom-bab2" className="space-y-4 pt-8 border-t-2 border-slate-200 print:break-before-page print:border-none print:pt-0">
        <div className="bg-emerald-900 text-white px-4 py-2 rounded-xl flex items-center justify-between shadow-xs">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-300" />
            BAB II — PENGORGANISASIAN PEMBELAJARAN
          </h3>
          <span className="text-[10px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded font-mono font-bold">Struktur KMA 1503/2025</span>
        </div>

        <div className="text-justify text-xs sm:text-[12px] leading-relaxed space-y-4 pl-1 text-slate-800">
          {/* 1. Struktur Kurikulum */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">1</span>
              <span>Struktur Kurikulum MI (Sesuai KMA Nomor 1503 Tahun 2025)</span>
            </h4>
            <p className="text-slate-700 mb-2">
              Pengorganisasian pembelajaran pada {profile.namaMadrasah} mengacu secara utuh pada Keputusan Menteri Agama (KMA) Nomor 1503 Tahun 2025 dengan proporsi alokasi jam tatap muka intrakurikuler dan kokurikuler sebagai berikut:
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5 w-8 text-center">No</th>
                    <th className="p-2.5">Mata Pelajaran (KMA 1503/2025)</th>
                    <th className="p-2.5 text-center">Intrakurikuler (JP/Thn)</th>
                    <th className="p-2.5 text-center text-emerald-900">Kokurikuler (JP/Thn)</th>
                    <th className="p-2.5 text-center font-bold">Total Beban (JP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {strukturKurikulum.map((row: any) => (
                    <tr key={row.no} className="hover:bg-slate-50">
                      <td className="p-2 text-center font-mono">{row.no}</td>
                      <td className="p-2 font-medium text-slate-900">{row.mapel}</td>
                      <td className="p-2 text-center font-mono">{row.jtmIntra} JP</td>
                      <td className="p-2 text-center font-mono font-semibold text-emerald-800">{row.jtmKokurikuler ?? row.jtmKoku ?? row.jtmP5RA ?? 0} JP</td>
                      <td className="p-2 text-center font-mono font-bold text-emerald-950">{row.totalJTM} JP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Intrakurikuler */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">2</span>
              <span>Intrakurikuler</span>
            </h4>
            <p className="text-slate-700">
              {bab2.intrakurikuler || 'Kegiatan intrakurikuler memuat materi keagamaan khas madrasah (Al-Qur\'an Hadis, Akidah Akhlak, Fikih, SKI, Bahasa Arab) serta mata pelajaran umum terintegrasi nilai keislaman dan sains modern dengan alokasi 70-80% jam tatap muka.'}
            </p>
          </div>

          {/* 3. Kokurikuler (KMA 1503/2025 Penegasan Istilah) */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">3</span>
              <span className="text-emerald-900">Kokurikuler (Penyesuaian Istilah Sesuai KMA 1503/2025)</span>
            </h4>
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1.5">
              <p className="font-semibold text-emerald-950">
                Sesuai dengan regulasi terbaru <strong>KMA Nomor 1503 Tahun 2025</strong>, istilah <em>P5RA (Projek Penguatan Profil Pelajar Pancasila dan Rahmatan Lil Alamin)</em> secara resmi diintegrasikan dan disempurnakan menjadi <strong>Kokurikuler</strong>.
              </p>
              <p className="text-slate-700 text-[11.5px]">
                Kokurikuler dialokasikan sekitar 20-30% dari total jam pelajaran per tahun dan dilaksanakan secara tematik, fleksibel, serta kontekstual melalui tema-tema projek unggulan madrasah:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-800 text-[11.5px] mt-1 font-medium">
                {kokurikulerThemes.map((item: any, idx: number) => {
                  const temaLabel = typeof item === 'string' ? item : `${item.tema || ''}: ${item.fokus || ''}`;
                  return <li key={idx}>{temaLabel}</li>;
                })}
              </ul>
            </div>
          </div>

          {/* 4. Muatan Lokal */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">4</span>
              <span>Muatan Lokal</span>
            </h4>
            <p className="text-slate-700">
              {bab2.muatanLokal || 'Muatan lokal pada madrasah terdiri atas Bahasa Daerah (pelestarian kearifan dan unggah-ungguh) serta Tahfidz Al-Qur\'an Juz 30 dan doa-doa ma\'tsurat harian.'}
            </p>
          </div>

          {/* 5. Ekstrakurikuler */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">5</span>
              <span>Ekstrakurikuler</span>
            </h4>
            {typeof bab2.ekstrakurikuler === 'string' ? (
              <p className="text-slate-700">{bab2.ekstrakurikuler}</p>
            ) : bab2.ekstrakurikuler && typeof bab2.ekstrakurikuler === 'object' ? (
              <div className="space-y-2 text-slate-700 text-xs">
                {bab2.ekstrakurikuler.wajib && (
                  <div>
                    <strong className="text-slate-900">a. Ekstrakurikuler Wajib:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      {Array.isArray(bab2.ekstrakurikuler.wajib)
                        ? bab2.ekstrakurikuler.wajib.map((w: string, i: number) => <li key={i}>{w}</li>)
                        : <li>{String(bab2.ekstrakurikuler.wajib)}</li>}
                    </ul>
                  </div>
                )}
                {bab2.ekstrakurikuler.pilihan && (
                  <div>
                    <strong className="text-slate-900">b. Ekstrakurikuler Pilihan:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-0.5">
                      {Array.isArray(bab2.ekstrakurikuler.pilihan)
                        ? bab2.ekstrakurikuler.pilihan.map((p: string, i: number) => <li key={i}>{p}</li>)
                        : <li>{String(bab2.ekstrakurikuler.pilihan)}</li>}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-700">
                Terdiri dari ekstrakurikuler wajib: Gerakan Pramuka Madrasah, serta ekstrakurikuler pilihan: Hadrah/Banjari, Seni Kaligrafi Islam, Sains Club / Robotika, Qari/Tilawah, Pencak Silat Tapak Suci/Pagar Nusa, Futsal, dan English Club.
              </p>
            )}
          </div>

          {/* 6. Pengaturan Beban Belajar */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">6</span>
              <span>Pengaturan Beban Belajar</span>
            </h4>
            <p className="text-slate-700">
              {bab2.pengaturanBebanBelajar || 'Menggunakan sistem paket dengan durasi 35 menit per jam pelajaran (JP) untuk jenjang Madrasah Ibtidaiyah (MI). Pembelajaran berlangsung 5 hari kerja (Senin s.d. Jumat) dengan total beban 36 - 44 JP per minggu sesuai tingkatan fase.'}
            </p>
          </div>

          {/* 7. Kalender Pendidikan */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">7</span>
              <span>Kalender Pendidikan Madrasah</span>
            </h4>
            <p className="text-slate-700">
              {bab2.kalenderPendidikan || 'Disusun berdasarkan pedoman kalender pendidikan Kantor Wilayah Kementerian Agama Provinsi dengan menetapkan 18 - 20 minggu efektif per semester serta perayaan Hari Besar Islam dan Hari Amal Bakti (HAB) Kemenag.'}
            </p>
          </div>

          {/* 8. Pengaturan Waktu Pembelajaran */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">8</span>
              <span>Pengaturan Waktu Pembelajaran</span>
            </h4>
            <p className="text-slate-700">
              {bab2.pengaturanWaktuPembelajaran || 'Waktu KBM dimulai pukul 07.00 WIB diawali dengan pembiasaan sholat dhuha, tadarus Al-Qur\'an, dan apel cinta madrasah, diakhiri pukul 14.30 WIB setelah sholat dhuhur berjamaah dan evaluasi harian.'}
            </p>
          </div>

          {/* 9. Program Pengembangan Kompetensi */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">9</span>
              <span>Program Pengembangan Kompetensi Peserta Didik</span>
            </h4>
            <p className="text-slate-700">
              {bab2.programPengembanganKompetensi || 'Meliputi bimbingan konseling islami, klinik literasi dan numerasi, kelas akselerasi tahfidz, persiapan Kompetisi Sains Madrasah (KSM), dan festival karya kokurikuler.'}
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BAB III — PERENCANAAN PEMBELAJARAN & DEEP LEARNING
          ========================================================================= */}
      <div id="kom-bab3" className="space-y-4 pt-8 border-t-2 border-slate-200 print:break-before-page print:border-none print:pt-0">
        <div className="bg-emerald-900 text-white px-4 py-2 rounded-xl flex items-center justify-between shadow-xs">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            BAB III — PERENCANAAN PEMBELAJARAN & DEEP LEARNING
          </h3>
          <span className="text-[10px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded font-mono font-bold">Pedagogi Modern</span>
        </div>

        <div className="text-justify text-xs sm:text-[12px] leading-relaxed space-y-4 pl-1 text-slate-800">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">1</span>
              <span>Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), dan Alur Tujuan Pembelajaran (ATP)</span>
            </h4>
            <p className="text-slate-700">
              {bab3.cp_tp_atp || 'Capaian Pembelajaran (CP) diturunkan dari Keputusan Direktur Jenderal Pendidikan Islam dan BSKAP Kemendikbudristek, kemudian dianalisis oleh pendidik dalam forum KKG madrasah untuk menyusun Tujuan Pembelajaran (TP) dan Alur Tujuan Pembelajaran (ATP) yang berkesinambungan lintas fase (Fase A, B, C).'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">2</span>
              <span>Modul Ajar dan Perangkat Pembelajaran Berdiferensiasi</span>
            </h4>
            <p className="text-slate-700">
              {bab3.modulAjar || 'Pendidik menyusun Modul Ajar berdiferensiasi (konten, proses, dan produk) yang adaptif terhadap keberagaman modalitas belajar peserta didik, lengkap dengan lembar kerja peserta didik (LKPD) berbasis pemecahan masalah nyata.'}
            </p>
          </div>

          {/* Deep Learning Concept Box */}
          <div className="p-3.5 bg-teal-50/80 border border-teal-200 rounded-xl text-xs space-y-2">
            <h4 className="font-bold text-teal-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Pendekatan Pembelajaran Mendalam (Deep Learning)</span>
            </h4>
            <p className="text-slate-700">
              Madrasah menerapkan paradigma <strong>Pembelajaran Mendalam (Deep Learning)</strong> yang mencakup 3 pilar esensial:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11.5px]">
              <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                <p className="font-bold text-teal-900 mb-0.5">1. Mindful Learning</p>
                <p className="text-slate-600">Peserta didik belajar dengan penuh kesadaran diri, fokus, hening cipta, dan rasa syukur atas karunia akal.</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                <p className="font-bold text-teal-900 mb-0.5">2. Meaningful Learning</p>
                <p className="text-slate-600">Materi pembelajaran bermakna dan terhubung langsung dengan solusi masalah nyata dalam kehidupan umat.</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                <p className="font-bold text-teal-900 mb-0.5">3. Joyful Learning</p>
                <p className="text-slate-600">Suasana belajar menyenangkan, ramah, interaktif, tanpa intimidasi atau rasa takut salah.</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">3</span>
              <span>Asesmen Pembelajaran Madrasah (KMA 1503/2025)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <p className="font-bold text-blue-950">a. Asesmen Diagnostik (Awal)</p>
                <p className="text-slate-600 text-[11px] mt-0.5">{bab3.asesmenDiagnostik || 'Dilakukan pada awal tahun/bab untuk memetakan kesiapan kognitif, gaya belajar, dan kondisi psikososial siswa.'}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <p className="font-bold text-emerald-950">b. Asesmen Formatif</p>
                <p className="text-slate-600 text-[11px] mt-0.5">{bab3.asesmenFormatif || 'Penilaian berkelanjutan selama proses KBM untuk refleksi guru dan umpan balik perkembangan pemahaman siswa.'}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <p className="font-bold text-amber-950">c. Asesmen Sumatif & Kriteria KKTP</p>
                <p className="text-slate-600 text-[11px] mt-0.5">{bab3.asesmenSumatif || 'Penilaian akhir lingkup materi dan akhir semester dengan Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) berbasis interval.'}</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <p className="font-bold text-purple-950">d. Pelaporan Rapor Digital Madrasah (RDM)</p>
                <p className="text-slate-600 text-[11px] mt-0.5">Integrasi nilai capaian belajar dan deskripsi karakter welas asih secara transparan ke aplikasi RDM Kemenag RI.</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-emerald-100 text-emerald-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">4</span>
              <span>Kriteria Kenaikan Kelas dan Kelulusan</span>
            </h4>
            <p className="text-slate-700 text-xs">
              Peserta didik dinyatakan naik kelas dan lulus apabila menyelesaikan seluruh program pembelajaran, memiliki nilai sikap/karakter minimal kategori BAIK, mencapai kriteria ketuntasan KKTP pada seluruh tujuan pembelajaran, dan memiliki kehadiran minimal 85%.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BAB IV — KURIKULUM BERBASIS CINTA (5 PILAR MAHABBAH)
          ========================================================================= */}
      <div id="kom-bab4" className="space-y-4 pt-8 border-t-2 border-slate-200 print:break-before-page print:border-none print:pt-0">
        <div className="bg-emerald-900 text-white px-4 py-2 rounded-xl flex items-center justify-between shadow-xs">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            BAB IV — KURIKULUM BERBASIS CINTA
          </h3>
          <span className="text-[10px] bg-rose-900 text-rose-100 px-2 py-0.5 rounded font-mono font-bold">5 Pilar Mahabbah</span>
        </div>

        <div className="text-justify text-xs sm:text-[12px] leading-relaxed space-y-4 pl-1 text-slate-800">
          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-rose-100 text-rose-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">1</span>
              <span>Penguatan Implementasi Kurikulum Berbasis Cinta</span>
            </h4>
            <p className="text-slate-700">
              {bab4.pengantarCinta || `Kurikulum Berbasis Cinta (Mahabbah) pada ${profile.namaMadrasah} memposisikan kasih sayang, ketulusan, dan welas asih sebagai ruh utama pendidikan madrasah. Pendidikan tidak sekadar transfer pengetahuan kognitif (transfer of knowledge), melainkan penyemaian nilai kemanusiaan, adab, dan keluhuran budi (transformation of values).`}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-rose-100 text-rose-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">2</span>
              <span>Lima (5) Pilar Kurikulum Berbasis Cinta</span>
            </h4>

            <div className="space-y-2.5">
              {pilarCinta.map((pilar: any, idx: number) => (
                <div key={idx} className="p-3 bg-rose-50/40 border border-rose-200 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-rose-950 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 flex-shrink-0" />
                    <span>Pilar {idx + 1}: {pilar.pilar || pilar.judul}</span>
                  </p>
                  <p className="text-slate-700 text-[11.5px]">{pilar.makna || pilar.deskripsi}</p>
                  {pilar.indikator && (
                    <p className="text-emerald-950 text-[11px] font-medium bg-white/80 p-1.5 rounded-lg border border-rose-100">
                      <strong>Indikator Pembiasaan:</strong> {pilar.indikator}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-rose-100 text-rose-900 rounded-full inline-flex items-center justify-center text-[11px] font-bold">3</span>
              <span>Pembiasaan dan Budaya Positif Madrasah (Zero Bullying & Welas Asih)</span>
            </h4>
            <p className="text-slate-700">
              {bab4.budayaPositif || 'Madrasah secara konsisten mengimplementasikan budaya 5S (Senyum, Sapa, Salam, Sopan, Santun), gerakan madrasah anti-perundungan (zero bullying), penegakan disiplin positif tanpa hukuman fisik, serta pembiasaan ibadah bersama sebagai cerminan madrasah ramah anak.'}
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BAB V — PENDAMPINGAN, EVALUASI, DAN PENGEMBANGAN PROFESIONAL
          ========================================================================= */}
      <div id="kom-bab5" className="space-y-4 pt-8 border-t-2 border-slate-200 print:break-before-page print:border-none print:pt-0">
        <div className="bg-emerald-900 text-white px-4 py-2 rounded-xl flex items-center justify-between shadow-xs">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-300" />
            BAB V — PENDAMPINGAN, EVALUASI, DAN PENGEMBANGAN PROFESIONAL
          </h3>
          <span className="text-[10px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded font-mono font-bold">Penjaminan Mutu</span>
        </div>

        <div className="text-justify text-xs sm:text-[12px] leading-relaxed space-y-3 pl-1 text-slate-800">
          <p>
            <strong>1. Pendampingan Implementasi Kurikulum:</strong> Dilakukan secara berkala oleh Kepala Madrasah, Waka Kurikulum, dan Pengawas Pembina melalui bimbingan teknis penyusunan modul ajar, asesmen, serta integrasi nilai cinta.
          </p>
          <p>
            <strong>2. Supervisi Akademik dan Klinis:</strong> Dilaksanakan per semester dengan pendekatan dialogis, apresiatif, dan kemitraan kolegial untuk menemukan solusi atas kendala pembelajaran di ruang kelas.
          </p>
          <p>
            <strong>3. Evaluasi Kurikulum Operasional Madrasah (KOM):</strong> Dilakukan evaluasi berkala per semester dan evaluasi tahunan bersama seluruh Dewan Pendidik, Tim TPK, dan Komite Madrasah guna penyesuaian kurikulum di tahun ajaran berikutnya.
          </p>
          <p>
            <strong>4. Refleksi Pendidik:</strong> Guru membiasakan lembar refleksi diri dan umpan balik peserta didik di akhir pertemuan untuk terus menyempurnakan kualitas interaksi pembelajaran.
          </p>
          <p>
            <strong>5. Pengembangan Keprofesian Berkelanjutan (PKB):</strong> Pendidik didorong aktif mengikuti KKG/MGMP, pelatihan MOOC di Platform Pintar Kemenag, webinar nasional, serta riset tindakan kelas (PTK).
          </p>
          <p>
            <strong>6. Tindak Lanjut Hasil Evaluasi:</strong> Rekomendasi hasil evaluasi dijadikan dasar dalam penyusunan Rencana Kerja Madrasah (RKM) dan Rencana Kerja dan Anggaran Madrasah (RKAM) berbasis EDM/ERKAM.
          </p>
        </div>
      </div>

      {/* =========================================================================
          LAMPIRAN-LAMPIRAN DOKUMEN KOM (17 ITEM LENGKAP)
          ========================================================================= */}
      <div id="kom-lampiran" className="space-y-6 pt-10 border-t-2 border-slate-300 print:break-before-page print:border-none print:pt-0">
        <div className="text-center space-y-1 mb-4">
          <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-emerald-950 underline font-serif">
            LAMPIRAN-LAMPIRAN RESMI DOKUMEN KOM
          </h3>
          <p className="text-xs font-bold text-slate-600">
            STRUKTUR STANDAR KMA 1503/2025 TERSINKRON LIVE DENGAN MASTER DATA MADRASAH
          </p>
        </div>

        {/* 17 LAMPIRAN INDEX SUMMARY */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-xs">
          <p className="font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
            <BookmarkCheck className="w-4 h-4 text-emerald-700" />
            Daftar 17 Dokumen Lampiran Resmi:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 text-[11.5px]">
            {lampiranList.map((item: string, idx: number) => (
              <div key={idx} className="p-2 bg-white rounded-lg border border-slate-200 flex items-start gap-2 hover:border-emerald-300 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium text-slate-900">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* LAMPIRAN 1: SUSUNAN TIM PENGEMBANG KURIKULUM (TPK) */}
        <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-700" />
              Lampiran 1: Susunan Tim Pengembang Kurikulum (TPK) Madrasah
            </h4>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">Resmi TPK</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2 w-8 text-center">No</th>
                  <th className="p-2">Jabatan dalam Tim</th>
                  <th className="p-2">Nama Pejabat / Pendidik</th>
                  <th className="p-2">Jabatan Kedinasan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2 text-center font-mono">1</td>
                  <td className="p-2 font-bold text-emerald-950">Penanggung Jawab</td>
                  <td className="p-2 font-semibold">{profile.namaKepala}</td>
                  <td className="p-2 text-slate-600">Kepala Madrasah</td>
                </tr>
                <tr>
                  <td className="p-2 text-center font-mono">2</td>
                  <td className="p-2 font-bold text-emerald-950">Ketua Tim TPK</td>
                  <td className="p-2 font-semibold">{teachers[1]?.nama || 'Waka Kurikulum'}</td>
                  <td className="p-2 text-slate-600">Waka Kurikulum / Guru Senior</td>
                </tr>
                <tr>
                  <td className="p-2 text-center font-mono">3</td>
                  <td className="p-2 font-bold text-emerald-950">Sekretaris</td>
                  <td className="p-2 font-semibold">{teachers[2]?.nama || 'Guru PAI'}</td>
                  <td className="p-2 text-slate-600">Guru Kelas / PAI</td>
                </tr>
                <tr>
                  <td className="p-2 text-center font-mono">4</td>
                  <td className="p-2 font-bold text-emerald-950">Koordinator Fase A - B</td>
                  <td className="p-2 font-semibold">{teachers[3]?.nama || 'Guru Kelas'}</td>
                  <td className="p-2 text-slate-600">Guru Kelas</td>
                </tr>
                <tr>
                  <td className="p-2 text-center font-mono">5</td>
                  <td className="p-2 font-bold text-emerald-950">Koordinator Fase C</td>
                  <td className="p-2 font-semibold">{teachers[4]?.nama || 'Guru Kelas'}</td>
                  <td className="p-2 text-slate-600">Guru Kelas</td>
                </tr>
                <tr>
                  <td className="p-2 text-center font-mono">6</td>
                  <td className="p-2 font-bold text-emerald-950">Narasumber / Pembina</td>
                  <td className="p-2 font-semibold">{profile.namaPengawas}</td>
                  <td className="p-2 text-slate-600">Pengawas Madrasah Kemenag</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* LAMPIRAN 2: REKAPITULASI DATA GTK & PEMBAGIAN TUGAS */}
        <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-emerald-700" />
              Lampiran 2: Rekapitulasi Data GTK & Beban Mengajar (Sinkron Master Database)
            </h4>
            <span className="text-[10px] bg-blue-100 text-blue-900 font-mono px-2 py-0.5 rounded font-bold">
              {teachers.length} Guru Terdata
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2 w-8 text-center">No</th>
                  <th className="p-2">Nama Guru & NIP</th>
                  <th className="p-2">Pangkat/Gol</th>
                  <th className="p-2">Mata Pelajaran Diampu</th>
                  <th className="p-2 text-center">Beban (JTM)</th>
                  <th className="p-2">Tugas Tambahan / Wali</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {teachers.map((t, idx) => (
                  <tr key={t.id || idx} className="hover:bg-white">
                    <td className="p-2 text-center font-mono">{idx + 1}</td>
                    <td className="p-2">
                      <span className="font-semibold text-slate-900 block">{t.nama}</span>
                      <span className="font-mono text-[10px] text-slate-500">NIP. {t.nip || '-'}</span>
                    </td>
                    <td className="p-2 text-slate-700">{t.pangkatGol}</td>
                    <td className="p-2 font-medium text-emerald-950">{t.mapelUtama}</td>
                    <td className="p-2 text-center font-mono font-bold text-slate-800">{t.jumlahJam} JP</td>
                    <td className="p-2 text-slate-600">
                      {t.waliKelasDi ? `Wali ${t.waliKelasDi}` : ''}
                      {t.waliKelasDi && t.tugasTambahan ? ' | ' : ''}
                      {t.tugasTambahan || (t.waliKelasDi ? '' : '-')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* LAMPIRAN 3: REKAPITULASI ROMBEL & DATA SISWA */}
        <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-700" />
              Lampiran 3: Rekapitulasi Rombongan Belajar & Peserta Didik (Sinkron Database Siswa)
            </h4>
            <span className="text-[10px] bg-purple-100 text-purple-900 font-mono px-2 py-0.5 rounded font-bold">
              {students.length} Siswa Terdata
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2 w-8 text-center">No</th>
                  <th className="p-2">Rombongan Belajar</th>
                  <th className="p-2 text-center">Laki-Laki (L)</th>
                  <th className="p-2 text-center">Perempuan (P)</th>
                  <th className="p-2 text-center font-bold">Jumlah Siswa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {Array.from(new Set(students.map((s) => s.rombel))).sort().map((rombelName, idx) => {
                  const rombelStudents = students.filter((s) => s.rombel === rombelName);
                  const countL = rombelStudents.filter((s) => s.jenisKelamin === 'L').length;
                  const countP = rombelStudents.filter((s) => s.jenisKelamin === 'P').length;
                  return (
                    <tr key={rombelName} className="hover:bg-white">
                      <td className="p-2 text-center font-mono">{idx + 1}</td>
                      <td className="p-2 font-bold text-slate-900">{rombelName}</td>
                      <td className="p-2 text-center font-mono text-blue-900">{countL}</td>
                      <td className="p-2 text-center font-mono text-rose-900">{countP}</td>
                      <td className="p-2 text-center font-mono font-bold text-emerald-950">{rombelStudents.length} Siswa</td>
                    </tr>
                  );
                })}
                <tr className="bg-emerald-50/90 font-bold text-emerald-950">
                  <td colSpan={2} className="p-2 text-right">TOTAL KESELURUHAN SISWA:</td>
                  <td className="p-2 text-center font-mono">{students.filter((s) => s.jenisKelamin === 'L').length} L</td>
                  <td className="p-2 text-center font-mono">{students.filter((s) => s.jenisKelamin === 'P').length} P</td>
                  <td className="p-2 text-center font-mono text-sm">{students.length} Siswa</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* LAMPIRAN 4: MATRIKS KALENDER PENDIDIKAN */}
        <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-700" />
              Lampiran 4: Matriks Agenda & Kalender Pendidikan Madrasah
            </h4>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-mono px-2 py-0.5 rounded font-bold">T.A {document.tahunAjaran}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <p className="font-bold text-emerald-900 border-b border-slate-100 pb-1">Semester Ganjil:</p>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                <li>• 14 - 16 Juli: Masa Ta&apos;aruf Siswa Madrasah (MATSAMA) Ramah Anak</li>
                <li>• 17 Juli: Hari Pertama KBM Efektif Semester Ganjil</li>
                <li>• 17 Agustus: Peringatan HUT Kemerdekaan RI Ke-80</li>
                <li>• 22 - 27 September: Asesmen Tengah Semester / Formatif Bersama</li>
                <li>• 22 Oktober: Peringatan Hari Santri Nasional (HSN) & Gebyar Kokurikuler</li>
                <li>• 25 Nov: Peringatan Hari Guru Nasional (HGN)</li>
                <li>• 01 - 12 Des: Asesmen Sumatif Akhir Semester (SAS) Ganjil</li>
                <li>• 19 Desember: Pembagian Rapor Digital Madrasah (RDM) Semester Ganjil</li>
                <li>• 22 Des - 03 Jan: Libur Pembelajaran Semester Ganjil</li>
              </ul>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <p className="font-bold text-emerald-900 border-b border-slate-100 pb-1">Semester Genap:</p>
              <ul className="space-y-1 text-slate-700 text-[11px]">
                <li>• 03 Januari: Peringatan Hari Amal Bakti (HAB) Kementerian Agama RI</li>
                <li>• 05 Januari: Hari Pertama KBM Efektif Semester Genap</li>
                <li>• 16 - 21 Maret: Pekan Asesmen Formatif / PTS Genap</li>
                <li>• Ramadhan - Idul Fitri: Libur Awal Ramadhan & Hari Raya Idul Fitri</li>
                <li>• 04 - 16 Mei: Asesmen Madrasah (AM) Tingkat Akhir</li>
                <li>• 01 - 12 Juni: Asesmen Sumatif Akhir Tahun (SAT) & Gelar Karya Kokurikuler</li>
                <li>• 19 Juni: Pembagian Rapor Kenaikan Kelas & Kelulusan (RDM)</li>
                <li>• 22 Juni - 11 Juli: Libur Akhir Tahun Pelajaran</li>
              </ul>
            </div>
          </div>
        </div>

        {/* LAMPIRAN 5: CONTOH ALUR TUJUAN PEMBELAJARAN (ATP) */}
        <div id="kom-lampiran-5" className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3 print:break-before-page print:border-none print:p-0">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-700" />
              Lampiran 5: Contoh Alur Tujuan Pembelajaran (ATP) Berbasis Karakter Cinta
            </h4>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded font-bold">Fase B (Kelas 4)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-slate-300 bg-white">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="border border-slate-300 p-2 w-10 text-center">No</th>
                  <th className="border border-slate-300 p-2 text-left">Elemen & Capaian Pembelajaran (CP)</th>
                  <th className="border border-slate-300 p-2 text-left">Tujuan Pembelajaran (TP)</th>
                  <th className="border border-slate-300 p-2 text-left">Integrasi Pilar Cinta & Dimensi Lulusan</th>
                  <th className="border border-slate-300 p-2 w-16 text-center">Alokasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="border border-slate-300 p-2 text-center font-bold">1</td>
                  <td className="border border-slate-300 p-2 font-medium">
                    <strong>Al-Qur&apos;an Hadis:</strong> Peserta didik mampu membaca, menghafal, dan memahami makna surah-surah pendek dengan tartil.
                  </td>
                  <td className="border border-slate-300 p-2">
                    Membaca dan melafalkan QS. Al-Ma&apos;un dengan tartil serta menjelaskan pesan kepedulian sosial terhadap anak yatim dan fakir miskin.
                  </td>
                  <td className="border border-slate-300 p-2 text-emerald-900 font-semibold">
                    Cinta Sesama & Cinta Kebenaran (Kepedulian Sosial & Akhlak Mulia)
                  </td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold">8 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 text-center font-bold">2</td>
                  <td className="border border-slate-300 p-2 font-medium">
                    <strong>IPAS:</strong> Peserta didik menganalisis hubungan antara bentuk serta fungsi bagian tubuh pada hewan dan tumbuhan.
                  </td>
                  <td className="border border-slate-300 p-2">
                    Mengidentifikasi bagian tumbuhan dan fungsinya melalui observasi taman madrasah serta merawat tanaman dengan penuh kasih sayang.
                  </td>
                  <td className="border border-slate-300 p-2 text-emerald-900 font-semibold">
                    Cinta Alam & Lingkungan (Kelestarian Ekologi & Rasa Syukur)
                  </td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold">10 JP</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 text-center font-bold">3</td>
                  <td className="border border-slate-300 p-2 font-medium">
                    <strong>Pancasila:</strong> Peserta didik memahami bentuk keragaman suku bangsa, sosial, dan budaya di lingkungan sekitar.
                  </td>
                  <td className="border border-slate-300 p-2">
                    Menghargai keragaman budaya Nusantara dan membiasakan musyawarah mufakat di lingkungan kelas.
                  </td>
                  <td className="border border-slate-300 p-2 text-emerald-900 font-semibold">
                    Cinta Tanah Air & Cinta Sesama (Persatuan & Toleransi Tasamuh)
                  </td>
                  <td className="border border-slate-300 p-2 text-center font-mono font-bold">8 JP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* LAMPIRAN 6: CONTOH MODUL AJAR DEEP LEARNING */}
        <div id="kom-lampiran-6" className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3 print:break-before-page print:border-none print:p-0">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-700" />
              Lampiran 6: Format & Contoh Modul Ajar Pendekatan Deep Learning
            </h4>
            <span className="text-[10px] bg-blue-100 text-blue-900 font-mono px-2 py-0.5 rounded font-bold">Mindful, Meaningful, Joyful</span>
          </div>
          <div className="bg-white border border-slate-300 rounded-xl p-4 text-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-b border-slate-200 pb-2">
              <div><strong>Mata Pelajaran:</strong> Akidah Akhlak / PAI</div>
              <div><strong>Fase / Kelas:</strong> Fase C / Kelas 5</div>
              <div><strong>Materi Pokok:</strong> Akhlak Terpuji (Adab Berteman & Kasih Sayang)</div>
              <div><strong>Alokasi Waktu:</strong> 2 x 35 Menit (1 Pertemuan)</div>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-slate-900">Tiga Pilar Pembelajaran Mendalam (Deep Learning):</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="font-bold text-emerald-950">1. Mindful (Bermakna Penuh):</p>
                  <p className="text-[11px] text-slate-700">Refleksi hening awal pelajaran, membangun kesadaran emosional dan niat ikhlas menuntut ilmu.</p>
                </div>
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-bold text-blue-950">2. Meaningful (Kontekstual):</p>
                  <p className="text-[11px] text-slate-700">Menghubungkan materi dengan studi kasus nyata interaksi sosial santri di lingkungan madrasah.</p>
                </div>
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="font-bold text-amber-950">3. Joyful (Menyenangkan):</p>
                  <p className="text-[11px] text-slate-700">Simulasi bermain peran (*role playing*) dan permainan edukatif apresiasi kebaikan teman.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LAMPIRAN 7: MODUL PROJEK KOKURIKULER P5RA */}
        <div id="kom-lampiran-7" className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3 print:break-before-page print:border-none print:p-0">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              Lampiran 7: Modul Projek Kokurikuler P5RA (KMA 1503/2025)
            </h4>
            <span className="text-[10px] bg-purple-100 text-purple-900 font-mono px-2 py-0.5 rounded font-bold">10 Nilai Rahmatan Lil Alamin</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-slate-300 bg-white">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="border border-slate-300 p-2 text-left">Tema Utama Kokurikuler</th>
                  <th className="border border-slate-300 p-2 text-left">Judul Projek & Sasaran Fase</th>
                  <th className="border border-slate-300 p-2 text-left">Dimensi Profil & Nilai RA</th>
                  <th className="border border-slate-300 p-2 text-left">Output & Gelar Karya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11.5px]">
                <tr>
                  <td className="border border-slate-300 p-2 font-bold text-emerald-950">Gaya Hidup Berkelanjutan</td>
                  <td className="border border-slate-300 p-2">Pemanfaatan Sampah Organik & Eco-Brick Madrasah Hijau (Fase B)</td>
                  <td className="border border-slate-300 p-2">Beriman & Bertakwa, Bernalar Kritis, Qudwah (Keteladanan)</td>
                  <td className="border border-slate-300 p-2">Pupuk Kompos & Taman Vertikal Kelas</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2 font-bold text-emerald-950">Kearifan Lokal & Bhinneka Tunggal Ika</td>
                  <td className="border border-slate-300 p-2">Festival Seni Hadrah, Seni Kaligrafi & Kuliner Tradisional (Fase C)</td>
                  <td className="border border-slate-300 p-2">Berkebinekaan Global, Kreatif, Tasamuh (Toleransi) & Muwatanah</td>
                  <td className="border border-slate-300 p-2">Pentas Seni Budaya Santri & Expo Kuliner Halal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* LAMPIRAN 8 - 17: INSTRUMEN SUPERVISI, IKRAR, & VALIDASI RESMI */}
        <div id="kom-lampiran-8-17" className="space-y-4 print:break-before-page">
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Lampiran 8 s.d. 17: Instrumen Asesmen KKTP, Supervisi Klinis, & Berita Acara
              </h4>
              <span className="text-[10px] bg-slate-200 text-slate-800 font-mono px-2 py-0.5 rounded font-bold">10 Lampiran Tambahan</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-emerald-950">Lampiran 8: Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)</p>
                <p className="text-[11px] text-slate-600">Rubrik interval nilai ketuntasan belajar berbasis deskripsi capaian kompetensi.</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-emerald-950">Lampiran 9: Program Inklusi & Layanan Bimbingan Konseling</p>
                <p className="text-[11px] text-slate-600">Identifikasi kebutuhan khusus dan asesmen modalitas belajar peserta didik.</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-emerald-950">Lampiran 10: Instrumen Supervisi Pembelajaran Guru</p>
                <p className="text-[11px] text-slate-600">Lembar telaah RPP/Modul Ajar dan observasi performa mengajar guru di kelas.</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-emerald-950">Lampiran 11: Ikrar Bersama Madrasah Ramah Anak & Anti-Bullying</p>
                <p className="text-[11px] text-slate-600">Piagam komitmen bersama zero tolerance terhadap kekerasan fisik, verbal, & siber.</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-emerald-950">Lampiran 12 & 13: Jadwal Pelajaran & Distribusi Beban Mengajar</p>
                <p className="text-[11px] text-slate-600">Matriks jam mengajar GTK dan ekuivalensi tugas tambahan sesuai SIMPATIKA/EMIS.</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <p className="font-bold text-emerald-950">Lampiran 14 - 17: Berita Acara, Daftar Hadir Pleno & Instrumen Pengawas</p>
                <p className="text-[11px] text-slate-600">Notula rapat pleno penyusunan KOM, dokumentasi TPK, dan rekomendasi pengawas Kemenag.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
