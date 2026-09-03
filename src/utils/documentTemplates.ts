import { MadrasahProfile, Teacher, Student, OfficialDocument, DocumentType } from '../types';
import { defaultKomCintaData } from '../data/komCintaDefaultData';

export interface DocumentTypeOption {
  type: DocumentType;
  title: string;
  category: 'KURIKULUM' | 'SK_KEPALA' | 'SURAT_KETERANGAN' | 'SURAT_TUGAS' | 'MODUL_AJAR' | 'PIAGAM';
  description: string;
  badgeText: string;
  iconName: string;
}

export const DOCUMENT_TYPES: DocumentTypeOption[] = [
  // --- KURIKULUM & PERANGKAT ---
  {
    type: 'KOM_CINTA',
    title: 'Kurikulum Berbasis Cinta (KOM CINTA) - KMA 1503/2025 & Deep Learning',
    category: 'KURIKULUM',
    description: 'Naskah lengkap 86 halaman buku pedoman kurikulum madrasah (KMA 1503/2025, Deep Learning, Panca Cinta, Coding & AI, dan 15 Lampiran).',
    badgeText: 'KMA 1503 Resep',
    iconName: 'Heart',
  },
  {
    type: 'KOM',
    title: 'Kurikulum Operasional Madrasah (KOM) - KMA 1503/2025 & Berbasis Cinta',
    category: 'KURIKULUM',
    description: 'Struktur kurikulum resmi sesuai KMA 1503/2025 terintegrasi Kurikulum Berbasis Cinta (5 Pilar Mahabbah, Pembelajaran Mendalam, dan Kokurikuler).',
    badgeText: 'KMA 1503/2025',
    iconName: 'BookOpen',
  },
  {
    type: 'MODUL_AJAR',
    title: 'Modul Ajar / RPP Berbasis Nilai Cinta',
    category: 'MODUL_AJAR',
    description: 'Perencanaan pembelajaran berdiferensiasi dengan integrasi karakter kasih sayang dan profil Rahmatan Lil Alamin.',
    badgeText: 'Perangkat Ajar',
    iconName: 'FileText',
  },
  {
    type: 'IKRAR_MADRASAH_CINTA',
    title: 'Piagam Deklarasi Madrasah Ramah Anak & Berbasis Cinta',
    category: 'PIAGAM',
    description: 'Naskah komitmen bersama anti-bullying, cinta kedamaian, dan perlindungan anak di madrasah.',
    badgeText: 'Piagam Resmi',
    iconName: 'HeartHandshake',
  },

  // --- SURAT KEPUTUSAN KEPALA MADRASAH (SK KAMAD WAJIB) ---
  {
    type: 'SK_BEBAN_MENGAJAR',
    title: 'SK Pembagian Tugas Guru & Beban Mengajar',
    category: 'SK_KEPALA',
    description: 'Surat Keputusan resmi Kepala Madrasah beserta lampiran rincian jam tatap muka dan ekuivalensi.',
    badgeText: 'SK Wajib',
    iconName: 'FileSpreadsheet',
  },
  {
    type: 'SK_TIM_TPK',
    title: 'SK Tim Pengembang Kurikulum (TPK) Madrasah',
    category: 'SK_KEPALA',
    description: 'Penetapan susunan tim penyusun dan pengembang Kurikulum Madrasah (KOM) Tahun Pelajaran.',
    badgeText: 'SK Wajib',
    iconName: 'Users',
  },
  {
    type: 'SK_TIM_P5RA',
    title: 'SK Tim Fasilitator Projek P5RA (KMA 450)',
    category: 'SK_KEPALA',
    description: 'Penetapan koordinator dan tim fasilitator Projek Penguatan Profil Pelajar Pancasila & Rahmatan Lil Alamin.',
    badgeText: 'SK P5RA',
    iconName: 'Sparkles',
  },
  {
    type: 'SK_WALI_KELAS',
    title: 'SK Wali Kelas & Pembina Ekstrakurikuler',
    category: 'SK_KEPALA',
    description: 'Penetapan resmi wali kelas tiap rombongan belajar dan pembina ekstrakurikuler madrasah.',
    badgeText: 'SK Kesiswaan',
    iconName: 'GraduationCap',
  },
  {
    type: 'SK_PPDB',
    title: 'SK Panitia Penerimaan Peserta Didik Baru (PPDB)',
    category: 'SK_KEPALA',
    description: 'Penetapan panitia, jalur seleksi, dan mekanisme penerimaan murid baru madrasah.',
    badgeText: 'SK Kesiswaan',
    iconName: 'UserCheck',
  },
  {
    type: 'SK_MATSAMA',
    title: 'SK Panitia Masa Ta\'aruf Siswa Madrasah (MATSAMA)',
    category: 'SK_KEPALA',
    description: 'Penetapan panitia orientasi dan pengenalan lingkungan madrasah ramah anak.',
    badgeText: 'SK Kesiswaan',
    iconName: 'Users',
  },
  {
    type: 'SK_TPPK',
    title: 'SK Tim Pencegahan dan Penanganan Kekerasan (TPPK)',
    category: 'SK_KEPALA',
    description: 'Satgas pencegahan perundungan, bullying, dan kekerasan di lingkungan satuan pendidikan.',
    badgeText: 'SK Perlindungan',
    iconName: 'ShieldAlert',
  },
  {
    type: 'SK_PANITIA_UJIAN',
    title: 'SK Panitia Asesmen Madrasah / ANBK / Ujian',
    category: 'SK_KEPALA',
    description: 'Penetapan susunan panitia, proktor, teknisi, dan pengawas asesmen madrasah.',
    badgeText: 'SK Asesmen',
    iconName: 'Award',
  },
  {
    type: 'SK_KKTP_KELULUSAN',
    title: 'SK Kriteria Ketuntasan (KKTP) & Kelulusan',
    category: 'SK_KEPALA',
    description: 'Penetapan kriteria ketuntasan tujuan pembelajaran, kenaikan kelas, dan kriteria kelulusan.',
    badgeText: 'SK Akademik',
    iconName: 'CheckCircle2',
  },
  {
    type: 'SK_TIM_BOS',
    title: 'SK Tim Manajemen Dana BOS Madrasah',
    category: 'SK_KEPALA',
    description: 'Penetapan penanggung jawab, bendahara, dan tim pengelola anggaran BOS Kemenag.',
    badgeText: 'SK Keuangan',
    iconName: 'Briefcase',
  },

  // --- SURAT KETERANGAN & LAYANAN SISWA ---
  {
    type: 'SURAT_AKTIF_SISWA',
    title: 'Surat Keterangan Aktif Belajar Siswa',
    category: 'SURAT_KETERANGAN',
    description: 'Surat resmi keaktifan belajar siswa untuk beasiswa, tunjangan, dan administrasi perbankan.',
    badgeText: 'Layanan Siswa',
    iconName: 'GraduationCap',
  },
  {
    type: 'SURAT_MUTASI_SISWA',
    title: 'Surat Keterangan Pindah / Mutasi Siswa',
    category: 'SURAT_KETERANGAN',
    description: 'Surat pengantar resmi mutasi keluar siswa ke madrasah / sekolah tujuan.',
    badgeText: 'Layanan Siswa',
    iconName: 'ArrowRightLeft',
  },
  {
    type: 'SURAT_REKOMENDASI',
    title: 'Surat Rekomendasi Siswa Berprestasi / Studi',
    category: 'SURAT_KETERANGAN',
    description: 'Rekomendasi resmi melanjutkan ke jenjang MTs/MA/PT favorit atau beasiswa unggulan.',
    badgeText: 'Layanan Siswa',
    iconName: 'Award',
  },
  {
    type: 'SURAT_DISPENSASI_SISWA',
    title: 'Surat Dispensasi Siswa Delegasi Lomba',
    category: 'SURAT_TUGAS',
    description: 'Surat izin/dispensasi bagi siswa yang mengikuti KSM, MYRES, Aksioma, Porseni, atau event resmi.',
    badgeText: 'Izin Kegiatan',
    iconName: 'FileCheck2',
  },

  // --- SURAT DINAS GTK & HUBUNGAN MASYARAKAT ---
  {
    type: 'SURAT_TUGAS_GURU',
    title: 'Surat Tugas / Perintah Tugas Dinas Guru',
    category: 'SURAT_TUGAS',
    description: 'Surat tugas dinas menghadiri workshop, pelatihan Kemenag, MGMP/KKG, atau pembimbingan lomba.',
    badgeText: 'Dinas GTK',
    iconName: 'Briefcase',
  },
  {
    type: 'SURAT_PEMBERITAHUAN_ORTU',
    title: 'Surat Pemberitahuan / Undangan Wali Murid',
    category: 'SURAT_TUGAS',
    description: 'Surat dinas pemberitahuan kegiatan madrasah, rapat komite, atau sosialisasi program.',
    badgeText: 'Humas / Ortu',
    iconName: 'Mail',
  },
];

// Helper to generate auto doc number based on category and profile
export const generateDocumentNumber = (
  type: DocumentType,
  profile: MadrasahProfile,
  existingDocCount: number
): string => {
  const jenjangCode = profile.jenjang || 'MI';
  const seq = String(existingDocCount + 1).padStart(3, '0');
  const month = new Date().getMonth() + 1;
  const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const romanMonth = romanMonths[month - 1];
  const year = new Date().getFullYear();

  switch (type) {
    case 'KOM':
      return `450/${jenjangCode}.01/PP.00.4/${seq}/${year}`;
    case 'SK_BEBAN_MENGAJAR':
    case 'SK_TIM_TPK':
    case 'SK_TIM_P5RA':
    case 'SK_KKTP_KELULUSAN':
      return `B-${seq}/${jenjangCode}.01/PP.00.4/${romanMonth}/${year}`;
    case 'SK_WALI_KELAS':
    case 'SK_PPDB':
    case 'SK_MATSAMA':
    case 'SK_TPPK':
      return `B-${seq}/${jenjangCode}.01/PP.00.1/${romanMonth}/${year}`;
    case 'SK_PANITIA_UJIAN':
      return `B-${seq}/${jenjangCode}.01/PP.00.2/${romanMonth}/${year}`;
    case 'SK_TIM_BOS':
      return `B-${seq}/${jenjangCode}.01/KU.01.1/${romanMonth}/${year}`;
    case 'SURAT_AKTIF_SISWA':
    case 'SURAT_MUTASI_SISWA':
    case 'SURAT_DISPENSASI_SISWA':
    case 'SURAT_REKOMENDASI':
      return `B-${seq}/${jenjangCode}.01/PP.00.4/${romanMonth}/${year}`;
    case 'SURAT_TUGAS_GURU':
      return `B-${seq}/${jenjangCode}.01/KP.01.2/${romanMonth}/${year}`;
    case 'SURAT_PEMBERITAHUAN_ORTU':
      return `B-${seq}/${jenjangCode}.01/HM.01/${romanMonth}/${year}`;
    case 'MODUL_AJAR':
      return `MA/${jenjangCode}/${seq}/${year}`;
    case 'IKRAR_MADRASAH_CINTA':
      return `DKL-${seq}/${jenjangCode}.01/${year}`;
    default:
      return `B-${seq}/${jenjangCode}/${romanMonth}/${year}`;
  }
};

// Default Content Builder when creating a new document
export const createDefaultDocumentPayload = (
  type: DocumentType,
  profile: MadrasahProfile,
  teachers: Teacher[],
  students: Student[],
  targetId?: string
): Partial<OfficialDocument> => {
  const dateNow = new Date();
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dateNow.toLocaleDateString('id-ID', options);

  let title = '';
  let contentData: Record<string, any> = {};
  let targetPersonName = '';

  if (type === 'KOM_CINTA') {
    const tahunPelajaranStr = profile.tahunAjaran || '2025/2026';
    title = `Kurikulum Madrasah Berbasis Cinta (${profile.namaMadrasah}) - KMA 1503/2025 T.P ${tahunPelajaranStr}`;
    contentData = {
      ...defaultKomCintaData,
      namaMadrasah: profile.namaMadrasah,
      nsm: profile.nsm,
      npsn: profile.npsn,
      alamat: profile.alamat,
      kecamatan: profile.kecamatan,
      kabupaten: profile.kabupatenKota?.replace(/^Kabupaten\s+/i, '') || 'Banyumas',
      namaKepala: profile.namaKepala,
      nipKepala: profile.nipKepala,
      namaKetuaKomite: profile.namaKetuaKomite,
      namaPengawas: profile.namaPengawas,
      nipPengawas: profile.nipPengawas,
      tahunAjaran: tahunPelajaranStr,
    };
  } else if (type === 'KOM') {
    const tahunPelajaranStr = profile.tahunAjaran || '2026/2027';
    title = `Kurikulum Operasional Madrasah (KOM) - T.P ${tahunPelajaranStr}`;
    contentData = {
      kurikulumBasis: 'KMA Nomor 1503 Tahun 2025 & Kurikulum Berbasis Cinta',
      tahunPelajaran: tahunPelajaranStr,
      kataPengantar: `Puji dan syukur senantiasa kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas limpahan rahmat, taufik, dan inayah-Nya, sehingga Dokumen Kurikulum Operasional Madrasah (KOM) pada ${profile.namaMadrasah} Tahun Pelajaran ${tahunPelajaranStr} ini dapat tersusun dengan baik.

Dokumen Kurikulum Operasional Madrasah ini disusun sebagai pedoman utama penyelenggaraan seluruh proses pembelajaran, pembinaan karakter, dan penciptaan ekosistem madrasah yang bermutu dan berdaya saing, berlandaskan Keputusan Menteri Agama (KMA) Nomor 1503 Tahun 2025 tentang Kurikulum pada Madrasah, serta diperkuat dengan paradigma luhur "Kurikulum Berbasis Cinta".

Kurikulum Berbasis Cinta bukan kurikulum yang menggantikan kurikulum sebelumnya, melainkan menjadi ruh dan penguatan utama dalam implementasi kurikulum madrasah. Melalui internalisasi Cinta kepada Allah dan Rasul, Cinta Ilmu, Cinta Diri dan Sesama, Cinta Lingkungan, serta Cinta Tanah Air, madrasah berikhtiar melahirkan insan kamil yang beriman kokoh, berakhlak mulia, cerdas, berkeadaban, dan menebarkan rahmat bagi semesta alam (Rahmatan Lil Alamin).

Kami menyampaikan penghargaan dan terima kasih yang setinggi-tingginya kepada Tim Pengembang Kurikulum (TPK), segenap Dewan Pendidik, Tenaga Kependidikan, Pengurus Komite Madrasah, serta Pengawas Pembina Kementerian Agama atas sinergi, dedikasi, dan kontribusinya. Semoga dokumen ini dapat diimplementasikan secara konsisten dan bermakna demi kemajuan pendidikan madrasah tercinta.`,

      daftarIsi: [
        { nomor: '', judul: 'HALAMAN JUDUL', halaman: 'i' },
        { nomor: '', judul: 'LEMBAR PENGESAHAN', halaman: 'ii' },
        { nomor: '', judul: 'KATA PENGANTAR', halaman: 'iii' },
        { nomor: '', judul: 'DAFTAR ISI', halaman: 'iv' },
        {
          nomor: 'BAB I',
          judul: 'KARAKTERISTIK MADRASAH',
          halaman: '1',
          subBab: [
            '1. Identitas Madrasah',
            '2. Karakteristik Peserta Didik',
            '3. Karakteristik Pendidik dan Tenaga Kependidikan',
            '4. Karakteristik Sosial, Budaya, dan Lingkungan Madrasah',
            '5. Potensi dan Kondisi Lingkungan Sekitar',
            '6. Analisis Karakteristik Madrasah',
            '7. Visi Madrasah',
            '8. Misi Madrasah',
            '9. Tujuan Madrasah',
          ],
        },
        {
          nomor: 'BAB II',
          judul: 'PENGORGANISASIAN PEMBELAJARAN',
          halaman: '12',
          subBab: [
            `1. Struktur Kurikulum ${profile.jenjang || 'MI'} (KMA 1503/2025)`,
            '2. Intrakurikuler',
            '3. Kokurikuler (Pengganti Istilah P5RA sesuai KMA 1503/2025)',
            '4. Muatan Lokal',
            '5. Ekstrakurikuler',
            '6. Pengaturan Beban Belajar',
            '7. Kalender Pendidikan',
            '8. Pengaturan Waktu Pembelajaran',
            '9. Program Pengembangan Kompetensi Peserta Didik',
          ],
        },
        {
          nomor: 'BAB III',
          judul: 'PERENCANAAN PEMBELAJARAN',
          halaman: '24',
          subBab: [
            '1. Capaian Pembelajaran (CP)',
            '2. Tujuan Pembelajaran (TP)',
            '3. Alur Tujuan Pembelajaran (ATP)',
            '4. Perencanaan Pembelajaran',
            '5. Modul Ajar / Perangkat Pembelajaran',
            '6. Pembelajaran Mendalam (Deep Learning)',
            '7. Asesmen Pembelajaran',
            '8. Remedial dan Pengayaan',
            '9. Kriteria Kenaikan Kelas',
            '10. Kriteria Kelulusan',
          ],
        },
        {
          nomor: 'BAB IV',
          judul: 'KURIKULUM BERBASIS CINTA',
          halaman: '36',
          subBab: [
            '1. Hakikat dan Landasan Filosofis Kurikulum Berbasis Cinta',
            '2. Cinta kepada Allah dan Rasul',
            '3. Cinta Ilmu',
            '4. Cinta Diri dan Sesama',
            '5. Cinta Lingkungan',
            '6. Cinta Tanah Air',
            '7. Implementasi Nilai-Nilai Cinta dalam Pembelajaran',
            '8. Budaya Positif Madrasah',
          ],
        },
        {
          nomor: 'BAB V',
          judul: 'PENDAMPINGAN, EVALUASI, DAN PENGEMBANGAN PROFESIONAL',
          halaman: '45',
          subBab: [
            '1. Pendampingan Implementasi Kurikulum',
            '2. Supervisi Pembelajaran',
            '3. Evaluasi Pelaksanaan KOM',
            '4. Refleksi Guru',
            '5. Pengembangan Profesional Guru',
            '6. Tindak Lanjut Hasil Evaluasi',
          ],
        },
        {
          nomor: 'LAMPIRAN',
          judul: 'LAMPIRAN DOKUMEN KOM',
          halaman: '52',
          subBab: [
            '1. SK Tim Pengembang Kurikulum (TPK)',
            '2. Struktur Kurikulum Madrasah',
            '3. Kalender Pendidikan',
            '4. Jadwal Pelajaran',
            '5. Pembagian Tugas Guru',
            '6. Program Kokurikuler',
            '7. Program Ekstrakurikuler',
            '8. Program Muatan Lokal',
            '9. Kriteria Kenaikan Kelas',
            '10. Kriteria Kelulusan',
            '11. Contoh ATP (Alur Tujuan Pembelajaran)',
            '12. Contoh Modul Ajar / RPP Terpadu',
            '13. Instrumen Asesmen Pembelajaran',
            '14. Program Supervisi Akademik',
            '15. Berita Acara Rapat Penyusunan KOM',
            '16. Daftar Hadir Rapat Penyusunan KOM',
            '17. Dokumentasi Kegiatan Penyusunan KOM',
          ],
        },
      ],

      // BAB I — KARAKTERISTIK MADRASAH
      bab1: {
        identitasMadrasah: {
          nama: profile.namaMadrasah,
          nsm: profile.nsm,
          npsn: profile.npsn,
          jenjang: profile.jenjang,
          status: profile.status,
          akreditasi: profile.akreditasi,
          alamat: profile.alamat,
          desaKelurahan: profile.desaKelurahan,
          kecamatan: profile.kecamatan,
          kabupatenKota: profile.kabupatenKota,
          provinsi: profile.provinsi,
          telepon: profile.telepon,
          email: profile.email,
          website: profile.website,
        },
        karakteristikPesertaDidik: `Peserta didik pada ${profile.namaMadrasah} berjumlah ${students.length} orang yang terbagi dalam berbagai rombongan belajar. Peserta didik memiliki latar belakang potensi kecerdasan majemuk (multiple intelligences), minat tahfidz dan keagamaan yang kuat, serta keberagaman gaya belajar (visual, auditori, dan kinestetik). Madrasah menerapkan prinsip pendidikan inklusif, ramah anak, anti-kekerasan, dan non-diskriminasi sehingga seluruh peserta didik mendapatkan ruang tumbuh kembang yang aman, nyaman, dan penuh kasih sayang.`,
        karakteristikGTK: `Pendidik dan Tenaga Kependidikan (GTK) ${profile.namaMadrasah} berjumlah ${teachers.length} orang dengan kualifikasi akademik sarjana (S1) dan magister (S2). Sebagian besar pendidik telah memiliki Sertifikat Pendidik Profesional, menguasai kompetensi pedagogik modern, literasi digital, serta memiliki komitmen kuat dalam menerapkan pendekatan pedagogi welas asih (pedagogy of love) dan pembelajaran berdiferensiasi.`,
        karakteristikSosialBudaya: `Madrasah berakar pada lingkungan masyarakat yang religius, santun, menjunjung nilai gotong royong, dan memiliki kepedulian tinggi terhadap pendidikan moral spiritual. Tradisi keislaman Nusantara, kearifan lokal, dan moderasi beragama menjadi fondasi kokoh yang mengintegrasikan nilai-nilai Islam Rahmatan Lil Alamin dalam kehidupan sehari-hari madrasah.`,
        potensiLingkunganSekitar: `Madrasah berlokasi strategis dan memiliki kemitraan aktif dengan Kantor Kementerian Agama, Pondok Pesantren mitra, Perguruan Tinggi, Komite Madrasah, Puskesmas Ramah Anak, serta instansi kebudayaan dan lingkungan hidup setempat. Potensi ini dimanfaatkan secara optimal sebagai sumber belajar autentik bagi peserta didik.`,
        analisisKarakteristik: `Berdasarkan analisis konteks (SWOT), kekuatan utama madrasah terletak pada integritas religius, budaya kasih sayang tanpa perundungan, tenaga pendidik yang adaptif, serta dukungan orang tua yang luar biasa. Peluang kemajuan teknologi dan transformasi digital dimanfaatkan melalui digitalisasi pembelajaran dan penguatan riset madrasah. Madrasah secara berkala menganalisis tantangan zaman untuk merespons dinamika era kecerdasan buatan dengan tetap mempertahankan benteng moral spiritual.`,
        visi: `Terwujudnya Generasi Qurani di ${profile.namaMadrasah} yang Beriman dan Bertakwa, Berakhlak Mulia, Unggul dalam Prestasi, Berwawasan Global, serta Menjunjung Tinggi Nilai Cinta Kasih dan Rahmatan Lil Alamin.`,
        misi: [
          'Menumbuhkan keimanan, ketakwaan, dan kecintaan yang mendalam kepada Allah SWT dan Rasulullah SAW dalam setiap tarikan nafas pembelajaran.',
          'Membudayakan sikap saling menyayangi, welas asih, anti-kekerasan (zero bullying), dan kesetaraan dalam ekosistem madrasah ramah anak.',
          'Melaksanakan pembelajaran mendalam (deep learning) dan berdiferensiasi yang memerdekakan potensi akal, rasa, dan keterampilan peserta didik.',
          'Menginternalisasi nilai-nilai moderasi beragama dan profil pelajar berkeadaban dalam kehidupan bermasyarakat, berbangsa, dan bernegara.',
          'Mewujudkan tata kelola madrasah yang profesional, transparan, akuntabel, serta berorientasi pada mutu dan prestasi berkelanjutan.',
        ],
        tujuan: {
          jangkaPanjang: `Mempersiapkan lulusan ${profile.namaMadrasah} yang berkepribadian kokoh, hafal juz Al-Qur'an pilihan, berwawasan iptek kontemporer, berdaya saing global, serta berjiwa pembelajar sepanjang hayat yang menebar kedamaian bagi semesta.`,
          jangkaMenengah: `Mengembangkan madrasah rujukan berstandar unggul, mempertahankan akreditasi predikat A (Unggul), memperluas jejaring prestasi sains, tahfidz, robotika, dan riset madrasah, serta menjadi pelopor Madrasah Berbasis Cinta dan Ramah Anak.`,
          jangkaPendek: [
            `Mengimplementasikan secara utuh struktur kurikulum KMA 1503/2025 dan Kurikulum Berbasis Cinta pada Tahun Pelajaran ${tahunPelajaranStr}.`,
            'Mencapai 100% ketuntasan Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) pada semua mata pelajaran.',
            'Melaksanakan kegiatan kokurikuler terintegrasi lintas disiplin ilmu dengan fokus penguatan karakter dan karya nyata.',
            'Menerapkan budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) dan program pembiasaan ibadah harian berkesinambungan.',
            'Meningkatkan kapasitas kompetensi profesional dan pedagogik seluruh guru melalui pelatihan berkala.',
          ],
        },
      },

      // BAB II — PENGORGANISASIAN PEMBELAJARAN
      bab2: {
        strukturKurikulumJenjang: `Struktur Kurikulum ${profile.jenjang || 'MI'} mengacu secara resmi pada Keputusan Menteri Agama (KMA) Nomor 1503 Tahun 2025. Pengorganisasian pembelajaran di madrasah mencakup kegiatan Intrakurikuler, Kokurikuler, Muatan Lokal, dan Ekstrakurikuler yang diatur secara proporsional.`,
        strukturKurikulumTabel: [
          { no: 1, mapel: "Al-Qur'an Hadis", jtmIntra: 72, jtmKoku: 0, totalJTM: 72 },
          { no: 2, mapel: 'Akidah Akhlak', jtmIntra: 72, jtmKoku: 0, totalJTM: 72 },
          { no: 3, mapel: 'Fikih', jtmIntra: 72, jtmKoku: 0, totalJTM: 72 },
          { no: 4, mapel: 'Sejarah Kebudayaan Islam (SKI)', jtmIntra: 72, jtmKoku: 0, totalJTM: 72 },
          { no: 5, mapel: 'Bahasa Arab', jtmIntra: 72, jtmKoku: 0, totalJTM: 72 },
          { no: 6, mapel: 'Pendidikan Pancasila', jtmIntra: 144, jtmKoku: 36, totalJTM: 180 },
          { no: 7, mapel: 'Bahasa Indonesia', jtmIntra: 216, jtmKoku: 54, totalJTM: 270 },
          { no: 8, mapel: 'Matematika', jtmIntra: 180, jtmKoku: 36, totalJTM: 216 },
          { no: 9, mapel: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', jtmIntra: 180, jtmKoku: 36, totalJTM: 216 },
          { no: 10, mapel: 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)', jtmIntra: 108, jtmKoku: 36, totalJTM: 144 },
          { no: 11, mapel: 'Seni dan Budaya (Rupa / Musik / Teater)', jtmIntra: 108, jtmKoku: 36, totalJTM: 144 },
          { no: 12, mapel: 'Bahasa Inggris', jtmIntra: 72, jtmKoku: 0, totalJTM: 72 },
          { no: 13, mapel: 'Muatan Lokal: Tahfidzul Qur\'an & Bahasa Daerah', jtmIntra: 72, jtmKoku: 0, totalJTM: 72 },
        ],
        intrakurikuler: `Kegiatan intrakurikuler dirancang untuk memberikan pengalaman belajar mendalam terhadap materi pokok pada mata pelajaran Pendidikan Agama Islam (Al-Qur'an Hadis, Akidah Akhlak, Fikih, SKI), Bahasa Arab, mata pelajaran Umum, dan Muatan Lokal. Proses pembelajaran mengedepankan diferensiasi proses, konten, dan produk guna memfasilitasi keunikan setiap peserta didik.`,
        kokurikuler: `Sesuai dengan regulasi KMA Nomor 1503 Tahun 2025, pelaksanaan penguatan karakter yang sebelumnya diistilahkan sebagai P5RA kini disempurnakan menjadi kegiatan **Kokurikuler**. Kegiatan kokurikuler dilaksanakan dengan alokasi beban waktu 20-30% dari total struktur kurikulum, bertujuan memperkuat karakter kebangsaan, nilai-nilai spiritual, akhlak mulia, kemandirian, nalar kritis, kreativitas, dan sikap Rahmatan Lil Alamin melalui proyek berbasis pemecahan masalah kontekstual di madrasah dan lingkungan sekitar.`,
        temaKokurikuler: [
          { tema: 'Kearifan Lokal dan Budaya Santun Islami', fokus: 'Menumbuhkan kecintaan terhadap warisan adab dan tradisi luhur Nusantara yang selaras dengan nilai-nilai syariat.' },
          { tema: 'Gaya Hidup Berkelanjutan dan Madrasah Hijau (Green Madrasah)', fokus: 'Melatih kepedulian peserta didik terhadap kelestarian alam, pengelolaan sampah zero-waste, dan konservasi energi.' },
          { tema: 'Bangun Jiwa dan Raganya: Harmoni Tanpa Perundungan', fokus: 'Membangun ketahanan mental, kesadaran hidup sehat, empati, anti-bullying, dan budaya saling menghargai.' },
          { tema: 'Kewirausahaan Berkah dan Inovasi Kreatif', fokus: 'Mengasah kreativitas, etos kerja pantang menyerah, kejujuran, dan kepekaan ekonomi sosial sejak dini.' },
        ],
        muatanLokal: `Muatan lokal yang dikembangkan di ${profile.namaMadrasah} meliputi Tahfidzul Qur'an, Pengenalan Kitab Akhlak Dasar, dan Bahasa Daerah (Bahasa Jawa/Sunda sesuai kearifan wilayah). Program muatan lokal dirancang untuk melestarikan khazanah tradisi keislaman dan budaya luhur daerah.`,
        ekstrakurikuler: {
          wajib: ['Pendidikan Kepramukaan Gudep Madrasah (sebagai wahana pembentukan watak kepemimpinan, kemandirian, dan kedisiplinan)'],
          pilihan: [
            'Tahfidz & Seni Baca Al-Qur\'an (Tilawah/Tartil)',
            'Klub Sains & Olimpiade Matematika (KSM / OSN)',
            'Robotika & Coding Madrasah Digital',
            'English & Arabic Speaking Club',
            'Futsal, Bulu Tangkis, & Olahraga Prestasi',
            'Seni Hadrah / Banjari, Kaligrafi Islam, dan Seni Musik Religi',
            'Dokter Kecil / Palang Merah Remaja (PMR) Ramah Kesehatan',
          ],
        },
        pengaturanBebanBelajar: `Beban belajar diatur menggunakan sistem paket. Satu jam pelajaran (JP) berdurasi 35 menit untuk jenjang MI (40 menit untuk MTs, 45 menit untuk MA). Alokasi waktu pembelajaran terdistribusi secara efektif selama 5 atau 6 hari kerja dalam sepekan dengan total pekan efektif berkisar antara 36–38 pekan per tahun pelajaran.`,
        kalenderPendidikan: `Kalender pendidikan madrasah disusun berdasarkan pedoman Ditjen Pendidikan Islam Kementerian Agama dan Kantor Wilayah Kemenag Provinsi, yang memuat rentang waktu permulaan tahun ajaran, masa Pengenalan Lingkungan Madrasah (MATSAMA), pekan efektif belajar, jeda tengah semester, asesmen madrasah, libur hari besar keagamaan dan nasional, hingga pembagian buku laporan hasil belajar (Rapor Digital Madrasah).`,
        pengaturanWaktuPembelajaran: `Jadwal harian madrasah dimulai pukul 06.45 WIB dengan kegiatan penyambutan 5S dan pembiasaan sholat Dhuha berjamaah serta tadarus pagi. Pembelajaran tatap muka efektif berlangsung dari pukul 07.15 WIB hingga 14.30 WIB diselingi waktu istirahat dan Sholat Dhuhur berjamaah di musholla madrasah.`,
        programPengembanganKompetensi: `Program pengembangan kompetensi dirancang menyeluruh meliputi program bimbingan intensif olimpiade sains/riset, matrikulasi literasi dan numerasi dasar, klinik pembelajaran remedial bagi siswa berkebutuhan khusus, serta program akselerasi pembinaan minat bakat kepemimpinan.`,
      },

      // BAB III — PERENCANAAN PEMBELAJARAN
      bab3: {
        capaianPembelajaran: `Capaian Pembelajaran (CP) merupakan kompetensi pembelajaran yang harus dicapai peserta didik pada setiap fase perkembangan, mengacu pada Keputusan Dirjen Pendis Kemenag dan standar kurikulum nasional terbaru. CP diintegrasikan dengan kedalaman nilai-nilai keislaman.`,
        tujuanPembelajaran: `Tujuan Pembelajaran (TP) dirumuskan oleh pendidik dari Capaian Pembelajaran dengan memperhatikan kompetensi inti dan lingkup materi. Perumusan TP memadukan aspek kognitif tingkat tinggi (HOTS), keterampilan psikomotorik, dan penanaman afektif berbasis welas asih.`,
        alurTujuanPembelajaran: `Alur Tujuan Pembelajaran (ATP) disusun secara logis dan runtut dari yang sederhana menuju kompleks, menghubungkan keterkaitan antar materi dalam satu fase agar proses konstruksi pengetahuan peserta didik terjadi secara utuh dan terarah.`,
        perencanaanPembelajaran: `Perencanaan pembelajaran disusun dalam bentuk dokumen yang fleksibel, jelas, dan esensial, mencakup tujuan pembelajaran, langkah kegiatan belajar aktif, media pembelajaran inovatif, dan instrumen asesmen otentik.`,
        modulAjarPerangkat: `Modul Ajar disusun oleh pendidik dengan format yang memerdekakan kreativitas guru, mengakomodasi diferensiasi konten, proses, dan produk, serta menyisipkan pesan hikmah keislaman dan refleksi kebaikan dalam setiap topik pembahasan.`,
        pembelajaranMendalam: `Penerapan Pembelajaran Mendalam (Deep Learning) menekankan pada 3 pilar utama: Meaningful Learning (Pembelajaran Bermakna yang mengaitkan materi dengan kehidupan nyata dan keagungan ciptaan Allah), Joyful Learning (Pembelajaran yang Menggembirakan tanpa tekanan psikologis), serta Mindful Learning (Pembelajaran yang Menumbuhkan Kesadaran Penuh, fokus, dan refleksi diri peserta didik).`,
        asesmenPembelajaran: {
          asesmenAwal: 'Asesmen Diagnostik / Awal dilakukan pada awal tahun atau awal lingkup materi untuk memetakan kesiapan, minat, dan profil gaya belajar peserta didik sebagai dasar diferensiasi pembelajaran.',
          asesmenFormatif: 'Asesmen Formatif terintegrasi dalam seluruh proses KBM harian, bertujuan memberikan umpan balik (feedback) yang konstruktif, memotivasi, dan memperbaiki kualitas proses belajar.',
          asesmenSumatif: 'Asesmen Sumatif dilaksanakan pada akhir lingkup materi, akhir semester, dan akhir fase/jenjang untuk mengukur pencapaian tujuan pembelajaran dan dilaporkan dalam Rapor Digital Madrasah (RDM).',
          kktp: 'Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) ditentukan oleh pendidik menggunakan pendekatan rubrik deskriptif, skala interval, atau taksonomi kompetensi secara objektif dan adil.',
        },
        remedialDanPengayaan: `Program Remedial diberikan kepada peserta didik yang belum mencapai KKTP melalui bimbingan perorangan, tutor sebaya, atau modifikasi tugas. Program Pengayaan diberikan kepada peserta didik yang telah melampaui KKTP melalui penugasan riset mini, pengayaan materi lanjutan, atau tantangan proyek kreatif.`,
        kriteriaKenaikanKelas: [
          'Menyelesaikan seluruh program pembelajaran pada semester 1 dan semester 2 pada tahun ajaran yang bersangkutan.',
          'Mencapai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) pada seluruh mata pelajaran intrakurikuler dan muatan lokal.',
          'Memperoleh nilai sikap/karakter minimal kategori "Baik" yang mencerminkan akhlak karimah dan ketaatan ibadah.',
          'Mengikuti seluruh rangkaian kegiatan kokurikuler dan pembiasaan budaya positif madrasah.',
          'Memiliki persentase kehadiran tatap muka minimal 85% dari total hari efektif belajar (kecuali dengan alasan sakit atau izin resmi).',
        ],
        kriteriaKelulusan: [
          'Menyelesaikan seluruh program pembelajaran dari Fase A hingga Fase C (untuk jenjang MI) atau fase akhir jenjang terkait.',
          'Memperoleh nilai perilaku/sikap minimal kategori "Baik".',
          'Mengikuti Asesmen Madrasah (AM) dan/atau evaluasi akhir yang diselenggarakan oleh satuan pendidikan.',
          'Telah tuntas menempuh seluruh target hafalan juz Al-Qur\'an / muatan lokal yang ditetapkan madrasah.',
          'Ditetapkan lulus melalui rapat pleno Dewan Pendidik dan Kepala Madrasah.',
        ],
      },

      // BAB IV — KURIKULUM BERBASIS CINTA
      bab4: {
        penjelasanUmum: 'Kurikulum Berbasis Cinta bukan kurikulum yang menggantikan kurikulum sebelumnya, tetapi menjadi penguatan dalam implementasi kurikulum madrasah. Nilai cinta menjadi ruh dan pondasi filosofis yang melandasi seluruh interaksi, proses pembelajaran, relasi guru-siswa, dan budaya madrasah.',
        pilarCinta: [
          {
            pilar: 'Cinta kepada Allah dan Rasul',
            deskripsi: 'Menjadi puncak dan muara dari seluruh pendidikan di madrasah. Ditanamkan melalui penghayatan tauhid yang mendalam, sholat berjamaah dengan khusyuk, keteladanan akhlak Nabi Muhammad SAW, kecintaan membaca dan mentadabburi Al-Qur\'an, serta menjadikan setiap aktivitas belajar sebagai bentuk ibadah taqarrub kepada Allah SWT.',
          },
          {
            pilar: 'Cinta Ilmu',
            deskripsi: 'Menumbuhkan rasa ingin tahu (curiosity) yang tak pernah padam, semangat literasi, kegemaran membaca, nalar kritis, dan kejujuran ilmiah. Peserta didik dididik untuk memandang ilmu sebagai pelita kehidupan yang harus diamalkan dengan penuh kerendahan hati demi kemaslahatan umat.',
          },
          {
            pilar: 'Cinta Diri dan Sesama',
            deskripsi: 'Menumbuhkan penghargaan terhadap martabat diri sendiri, menjaga kesehatan raga dan jiwa, serta menebarkan rasa empati, tolong-menolong, saling menghormati keberagaman, dan menolak keras segala bentuk perundungan (zero bullying), kekerasan fisik, maupun verbal di lingkungan madrasah.',
          },
          {
            pilar: 'Cinta Lingkungan',
            deskripsi: 'Menghayati alam semesta sebagai ayat-ayat kauniyah Allah yang harus dirawat dan dijaga. Diwujudkan melalui pembiasaan hidup bersih, peduli lingkungan, gerakan pilah sampah, hemat air dan energi, penghijauan madrasah, serta gaya hidup berkelanjutan yang ramah lingkungan.',
          },
          {
            pilar: 'Cinta Tanah Air',
            deskripsi: 'Menanamkan komitmen kebangsaan, kesetiaan pada NKRI, penghormatan terhadap Pancasila dan UUD 1945, serta semangat bela negara. Mengembangkan sikap moderasi beragama (wasathiyah) yang toleran, cinta damai, dan bangga terhadap keragaman budaya bangsa Indonesia.',
          },
        ],
        implementasiDalamPembelajaran: `Implementasi nilai-nilai cinta diintegrasikan dalam seluruh mata pelajaran melalui pendekatan pedagogi welas asih (compassionate teaching). Pendidik berperan sebagai orang tua kedua yang membimbing dengan kelembutan, kesabaran, dan keteladanan. Proses KBM dirancang agar menyenangkan, tidak membebani secara destruktif, menghargai setiap progres sekecil apa pun dari siswa, dan merayakan keberhasilan bersama.`,
        budayaPositifMadrasah: [
          'Budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) yang menyambut kedatangan siswa setiap pagi di gerbang madrasah.',
          'Mindful Morning & Tadarus Cinta Al-Qur\'an sebelum memulai jam pertama pelajaran.',
          'Sholat Dhuha dan Sholat Dhuhur Berjamaah yang tertib dan khusyuk.',
          'Deklarasi Madrasah Ramah Anak dan Satgas Anti-Perundungan / TPPK yang aktif mendampingi siswa.',
          'Jumat Berkah Kasih Sayang: Infaq sukarela peduli teman yatim/dhuafa dan gerakan kebersihan lingkungan bersama.',
          'Lingkar Dialog Hati (Circle Time) wali kelas dengan peserta didik untuk mendengarkan curahan hati dan refleksi perasaan.',
        ],
      },

      // BAB V — PENDAMPINGAN, EVALUASI, DAN PENGEMBANGAN PROFESIONAL
      bab5: {
        pendampinganImplementasi: `Pendampingan implementasi kurikulum dilakukan secara sistematis dan berjenjang oleh Kepala Madrasah, Waka Kurikulum, serta Pengawas Madrasah Kemenag melalui model pendampingan klinis, bimbingan teman sejawat (peer mentoring), dan komunitas belajar (Kombel) madrasah yang berbasis reflektif dan kolaboratif.`,
        supervisiPembelajaran: `Supervisi akademik pembelajaran dilaksanakan secara terjadwal dengan prinsip keterbukaan, kemitraan, dan pembinaan konstruktif. Supervisi tidak berorientasi pada vonis kesalahan administrasi, melainkan mendiagnosis kendala pembelajaran, memberikan alternatif strategi pedagogik, dan mengapresiasi inovasi guru.`,
        evaluasiPelaksanaanKOM: `Evaluasi dokumen dan pelaksanaan KOM dilakukan secara berkala (harian melalui jurnal refleksi, bulanan dalam rapat dewan guru, semesteran bersama komite, dan tahunan dalam review akbar kurikulum) untuk memastikan relevansi, efektivitas, dan kesesuaian dengan kebutuhan nyata peserta didik.`,
        refleksiGuru: `Refleksi guru merupakan instrumen wajib yang dilaksanakan di akhir setiap unit pembelajaran untuk menilai sejauh mana tujuan tercapai, respon emosional siswa, efektivitas media belajar, dan area yang memerlukan perbaikan pada pertemuan selanjutnya.`,
        pengembanganProfesional: `Pengembangan profesional guru difasilitasi melalui partisipasi aktif dalam KKG/MGMP, pelatihan mandiri di Platform Pintar Kemenag, workshop penulisan karya ilmiah/modul ajar, studi tiru ke madrasah rujukan, serta seminar nasional pendidikan Islam.`,
        tindakLanjutEvaluasi: `Hasil evaluasi dan supervisi ditindaklanjuti secara nyata dalam bentuk program pembinaan khusus, penyempurnaan alokasi waktu dan perangkat ajar, pengadaan sarana penunjang pembelajaran yang lebih adaptif, serta pembaruan dokumen KOM untuk tahun pelajaran berikutnya.`,
      },

      // LAMPIRAN
      lampiranList: [
        { kode: 'Lampiran 1', judul: 'SK Tim Pengembang Kurikulum (TPK) Madrasah' },
        { kode: 'Lampiran 2', judul: 'Struktur Kurikulum Madrasah (Intra & Kokurikuler)' },
        { kode: 'Lampiran 3', judul: 'Kalender Pendidikan Madrasah' },
        { kode: 'Lampiran 4', judul: 'Jadwal Pelajaran Tatap Muka' },
        { kode: 'Lampiran 5', judul: 'Pembagian Tugas Guru dan Beban Kerja' },
        { kode: 'Lampiran 6', judul: 'Program Kokurikuler Madrasah' },
        { kode: 'Lampiran 7', judul: 'Program Ekstrakurikuler Wajib & Pilihan' },
        { kode: 'Lampiran 8', judul: 'Program Muatan Lokal' },
        { kode: 'Lampiran 9', judul: 'Kriteria Kenaikan Kelas' },
        { kode: 'Lampiran 10', judul: 'Kriteria Kelulusan Peserta Didik' },
        { kode: 'Lampiran 11', judul: 'Contoh Alur Tujuan Pembelajaran (ATP)' },
        { kode: 'Lampiran 12', judul: 'Contoh Modul Ajar / Perangkat Pembelajaran' },
        { kode: 'Lampiran 13', judul: 'Instrumen Asesmen Pembelajaran' },
        { kode: 'Lampiran 14', judul: 'Program Supervisi Pembelajaran Kepala Madrasah' },
        { kode: 'Lampiran 15', judul: 'Berita Acara Rapat Penyusunan Dokumen KOM' },
        { kode: 'Lampiran 16', judul: 'Daftar Hadir Rapat Penyusunan KOM' },
        { kode: 'Lampiran 17', judul: 'Dokumentasi Kegiatan Penyusunan KOM' },
      ],
    };
  } else if (type === 'SK_BEBAN_MENGAJAR') {
    title = `Pembagian Tugas Guru dalam Kegiatan Proses Belajar Mengajar, Bimbingan, dan Tugas Tambahan Tahun Pelajaran ${profile.tahunAjaran}`;
    contentData = {
      menimbang: [
        `bahwa dalam rangka memperlancar jalannya proses belajar mengajar, kegiatan bimbingan konseling, dan optimalisasi implementasi Kurikulum pada Madrasah di ${profile.namaMadrasah} Tahun Pelajaran ${profile.tahunAjaran}, perlu menetapkan pembagian tugas guru;`,
        `bahwa untuk menjamin tertib administrasi, pemerataan beban kerja minimal 24 jam tatap muka dan maksimal sesuai regulasi, serta akuntabilitas kinerja pendidik, dipandang perlu menerbitkan Surat Keputusan Kepala Madrasah;`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah Ibtidaiyah tentang Pembagian Tugas Guru dalam Kegiatan Belajar Mengajar dan Tugas Tambahan Tahun Pelajaran ${profile.tahunAjaran};`,
      ],
      mengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional (Lembaran Negara Republik Indonesia Tahun 2003 Nomor 78, Tambahan Lembaran Negara Republik Indonesia Nomor 4301);',
        'Undang-Undang Nomor 14 Tahun 2005 tentang Guru dan Dosen (Lembaran Negara Republik Indonesia Tahun 2005 Nomor 157, Tambahan Lembaran Negara Republik Indonesia Nomor 4586);',
        'Peraturan Pemerintah Nomor 74 Tahun 2008 tentang Guru sebagaimana telah diubah dengan Peraturan Pemerintah Nomor 19 Tahun 2017;',
        'Peraturan Pemerintah Nomor 17 Tahun 2010 tentang Pengelolaan dan Penyelenggaraan Pendidikan sebagaimana telah diubah dengan Peraturan Pemerintah Nomor 66 Tahun 2010;',
        'Peraturan Pemerintah Nomor 57 Tahun 2021 tentang Standar Nasional Pendidikan sebagaimana telah diubah dengan Peraturan Pemerintah Nomor 4 Tahun 2022;',
        'Peraturan Menteri Agama Nomor 90 Tahun 2013 tentang Penyelenggaraan Pendidikan Madrasah sebagaimana telah beberapa kali diubah terakhir dengan Peraturan Menteri Agama Nomor 66 Tahun 2016;',
        'Peraturan Menteri Agama Nomor 58 Tahun 2017 tentang Kepala Madrasah sebagaimana telah diubah dengan Peraturan Menteri Agama Nomor 24 Tahun 2018;',
        'Peraturan Menteri Agama Nomor 19 Tahun 2019 tentang Organisasi dan Tata Kerja Kementerian Agama;',
        'Keputusan Menteri Agama Nomor 9 Tahun 2016 tentang Pedoman Tata Naskah Dinas Kementerian Agama;',
        'Keputusan Menteri Agama Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Madrasah;',
        'Keputusan Menteri Agama Nomor 1503 Tahun 2025 tentang Pedoman Kurikulum pada Madrasah;',
        'Keputusan Direktur Jenderal Pendidikan Islam tentang Petunjuk Teknis Perhitungan Beban Kerja Guru Madrasah yang Berlaku;',
      ],
      memperhatikan: [
        `Hasil Rapat Dewan Pendidik, Tenaga Kependidikan, dan Komite Madrasah ${profile.namaMadrasah} pada tanggal ${profile.titimangsa ? `di ${profile.titimangsa}` : ''} tentang Pembagian Tugas Mengajar dan Beban Kerja Guru Tahun Pelajaran ${profile.tahunAjaran}.`,
      ],
      diktum: {
        kesatu: `Menetapkan Pembagian Tugas Guru dalam Proses Belajar Mengajar, Pembimbingan, dan Pelaksanaan Kokurikuler pada Tahun Pelajaran ${profile.tahunAjaran} sebagaimana tercantum dalam Lampiran I Keputusan ini.`,
        kedua: `Menugaskan guru untuk melaksanakan tugas tambahan (seperti Wakil Kepala Madrasah, Wali Kelas, Pembina Ekstrakurikuler, Kepala Perpustakaan/Laboratorium, Koordinator Kokurikuler, Operator Simpatika/EMIS) sebagaimana tercantum dalam Lampiran I dan II Keputusan ini.`,
        ketiga: `Masing-masing guru wajib melaksanakan tugas dengan penuh tanggung jawab, menyusun perangkat pembelajaran berbasis cinta dan deep learning, melaksanakan asesmen bermakna, serta melaporkan pelaksanaan tugasnya secara berkala kepada Kepala Madrasah.`,
        keempat: `Segala biaya yang timbul sebagai akibat ditetapkannya keputusan ini dibebankan pada Anggaran Pendapatan dan Belanja Madrasah (RKAM) melalui DIPA / Dana Bantuan Operasional Sekolah (BOS) atau sumber dana lain yang sah dan tidak mengikat.`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dengan ketentuan apabila di kemudian hari terdapat kekeliruan akan diadakan perbaikan dan penyempurnaan sebagaimana mestinya.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Bapak/Ibu Pendidik dan Tenaga Kependidikan yang bersangkutan untuk diketahui dan dilaksanakan',
        'Arsip Madrasah',
      ],
      guruList: teachers.map((t, idx) => ({
        id: t.id,
        nama: t.nama,
        nip: t.nip || '-',
        pangkatGol: t.pangkatGol || 'Penata / III.c',
        mapel: t.mapelUtama || (idx === 0 ? 'Guru Kelas I' : 'Guru Mapel'),
        tugasTambahan: t.tugasTambahan || (idx === 0 ? 'Wali Kelas' : idx === 1 ? 'Waka Kurikulum' : '-'),
        jumlahJam: t.jumlahJam || 24,
        waliKelas: t.waliKelasDi || `Kelas ${idx + 1}`,
      })),
    };
  } else if (type === 'SK_TIM_TPK') {
    title = `Penetapan Tim Pengembang Kurikulum Operasional Madrasah (TPK) Tahun Pelajaran ${profile.tahunAjaran}`;
    contentData = {
      menimbang: [
        `bahwa dalam rangka penyusunan, pengembangan, dan evaluasi Kurikulum Operasional Madrasah (KOM) yang adaptif, berbasis cinta kasih, dan sesuai KMA 450 Tahun 2024 serta KMA 1503 Tahun 2025 di ${profile.namaMadrasah}, perlu dibentuk Tim Pengembang Kurikulum;`,
        `bahwa mereka yang namanya tercantum dalam lampiran keputusan ini dipandang cakap, berdedikasi tinggi, dan memenuhi syarat kompetensi untuk ditetapkan sebagai Tim Pengembang Kurikulum;`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah tentang Tim Pengembang Kurikulum (TPK) Tahun Pelajaran ${profile.tahunAjaran};`,
      ],
      mengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;',
        'Undang-Undang Nomor 14 Tahun 2005 tentang Guru dan Dosen;',
        'Peraturan Pemerintah Nomor 57 Tahun 2021 jo. PP No. 4 Tahun 2022 tentang Standar Nasional Pendidikan;',
        'Peraturan Menteri Agama Nomor 90 Tahun 2013 jo. PMA No. 66 Tahun 2016 tentang Penyelenggaraan Pendidikan Madrasah;',
        'Peraturan Menteri Agama Nomor 58 Tahun 2017 jo. PMA No. 24 Tahun 2018 tentang Kepala Madrasah;',
        'Keputusan Menteri Agama Nomor 9 Tahun 2016 tentang Pedoman Tata Naskah Dinas Kementerian Agama;',
        'Keputusan Menteri Agama Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Madrasah;',
        'Keputusan Menteri Agama Nomor 1503 Tahun 2025 tentang Pedoman Kurikulum pada Madrasah;',
        'Panduan Penyusunan Kurikulum Operasional Madrasah (KOM) Direktorat KSKK Madrasah Ditjen Pendidikan Islam Kemenag RI;',
      ],
      memperhatikan: [
        `Hasil Rapat Kerja Dewan Pendidik, Pengawas Pembina, dan Pengurus Komite ${profile.namaMadrasah} tentang Pembentukan Tim Pengembang Kurikulum Madrasah Tahun Pelajaran ${profile.tahunAjaran}.`,
      ],
      diktum: {
        kesatu: `Membentuk dan menetapkan Susunan Tim Pengembang Kurikulum (TPK) ${profile.namaMadrasah} Tahun Pelajaran ${profile.tahunAjaran} sebagaimana tercantum dalam Lampiran yang merupakan bagian tidak terpisahkan dari Keputusan ini.`,
        kedua: `Tim Pengembang Kurikulum bertugas menyusun naskah akademis, menganalisis karakteristik madrasah, merumuskan visi-misi-tujuan, mengorganisasikan pembelajaran berbasis cinta dan deep learning, menyusun perencanaan pembelajaran & modul ajar, serta merancang instrumen evaluasi KOM.`,
        ketiga: `Dalam melaksanakan tugasnya, Tim Pengembang Kurikulum bertanggung jawab dan melaporkan hasil kerja penyusunan dokumen kurikulum secara tertulis kepada Kepala Madrasah untuk selanjutnya dimintakan validasi Pengawas dan rekomendasi Kepala Kankemenag.`,
        keempat: `Segala biaya yang timbul sebagai akibat ditetapkannya keputusan ini dibebankan pada Anggaran Pendapatan dan Belanja Madrasah (RKAM) melalui DIPA / Dana Bantuan Operasional Sekolah (BOS).`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dengan ketentuan apabila di kemudian hari terdapat kekeliruan akan diadakan perbaikan dan penyempurnaan sebagaimana mestinya.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Masing-masing anggota Tim Pengembang Kurikulum untuk diketahui dan dilaksanakan',
        'Arsip Madrasah',
      ],
      susunanTim: [
        { jabatanTim: 'Penanggung Jawab', nama: profile.namaKepala, jabatanKedinasan: 'Kepala Madrasah', tugas: 'Memberikan arahan kebijakan, memonitor progres, dan mengesahkan dokumen kurikulum' },
        { jabatanTim: 'Ketua Tim', nama: teachers[1]?.nama || 'Waka Kurikulum', jabatanKedinasan: 'Waka Kurikulum', tugas: 'Mengkoordinir seluruh tahapan penyusunan 5 Bab dan 17 Lampiran Dokumen KOM' },
        { jabatanTim: 'Sekretaris', nama: teachers[2]?.nama || 'Guru Senior', jabatanKedinasan: 'Guru PAI / Kelas', tugas: 'Notulensi rapat, kompilasi draft instrumen, dan penataan berkas administrasi KOM' },
        { jabatanTim: 'Koordinator Fase A (Kelas 1-2)', nama: teachers[0]?.nama || 'Guru Kelas 1', jabatanKedinasan: 'Guru Kelas Fase A', tugas: 'Penyusunan alur tujuan pembelajaran dan modul ajar penguatan fondasi literasi-numerasi' },
        { jabatanTim: 'Koordinator Fase B (Kelas 3-4)', nama: teachers[3]?.nama || 'Guru Kelas 4', jabatanKedinasan: 'Guru Kelas Fase B', tugas: 'Penyusunan perangkat pembelajaran terintegrasi Kurikulum Berbasis Cinta' },
        { jabatanTim: 'Koordinator Fase C (Kelas 5-6)', nama: teachers[4]?.nama || 'Guru Kelas 6', jabatanKedinasan: 'Guru Kelas Fase C', tugas: 'Penyusunan perangkat asesmen komprehensif dan persiapan Asesmen Madrasah' },
        { jabatanTim: 'Koordinator Kokurikuler (P5RA)', nama: teachers[2]?.nama || 'Guru PAI', jabatanKedinasan: 'Koordinator Projek', tugas: 'Merancang modul kokurikuler dengan tema kearifan lokal & rahmatan lil alamin' },
        { jabatanTim: 'Narasumber / Konsultan Ahli', nama: profile.namaPengawas, jabatanKedinasan: 'Pengawas Madrasah Kemenag', tugas: 'Memberikan bimbingan teknis, validasi materi, dan instrumen supervisi kurikulum' },
        { jabatanTim: 'Perwakilan Komite / Wali Murid', nama: profile.namaKetuaKomite, jabatanKedinasan: 'Ketua Komite Madrasah', tugas: 'Memberikan masukan kebutuhan riil masyarakat dan aspirasi wali murid' },
      ],
    };
  } else if (type === 'SK_TIM_P5RA') {
    title = `Penetapan Tim Fasilitator Kokurikuler Projek Penguatan Profil Pelajar Pancasila dan Rahmatan Lil Alamin (P5RA) Tahun Pelajaran ${profile.tahunAjaran}`;
    contentData = {
      menimbang: [
        `bahwa dalam rangka mewujudkan profil pelajar Indonesia yang berkarakter Pancasila, moderat, dan berakhlak mulia (Rahmatan Lil Alamin) sesuai amanat KMA 450 Tahun 2024 dan KMA 1503 Tahun 2025 di ${profile.namaMadrasah}, perlu diselenggarakan kegiatan Kokurikuler P5RA;`,
        `bahwa agar pelaksanaan projek kokurikuler berjalan secara terencana, berdampak nyata, dan terdokumentasi dengan baik, perlu ditetapkan Tim Fasilitator Projek;`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah tentang Tim Fasilitator Kokurikuler P5RA Tahun Pelajaran ${profile.tahunAjaran};`,
      ],
      mengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;',
        'Peraturan Pemerintah Nomor 57 Tahun 2021 jo. PP No. 4 Tahun 2022 tentang Standar Nasional Pendidikan;',
        'Peraturan Menteri Agama Nomor 90 Tahun 2013 jo. PMA No. 66 Tahun 2016 tentang Penyelenggaraan Pendidikan Madrasah;',
        'Keputusan Menteri Agama Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Madrasah;',
        'Keputusan Menteri Agama Nomor 1503 Tahun 2025 tentang Pedoman Kurikulum pada Madrasah;',
        'Panduan Pengembangan Kokurikuler P5RA Direktorat KSKK Madrasah Ditjen Pendis Kemenag RI;',
      ],
      memperhatikan: [
        `Hasil Rapat Dewan Guru ${profile.namaMadrasah} tentang Pemilihan Tema Kokurikuler P5RA dan Pembagian Beban Fasilitasi Projek.`,
      ],
      diktum: {
        kesatu: `Menetapkan Susunan Tim Fasilitator Kokurikuler Projek Penguatan Profil Pelajar Pancasila dan Rahmatan Lil Alamin (P5RA) Tahun Pelajaran ${profile.tahunAjaran} sebagaimana tercantum dalam Lampiran Keputusan ini.`,
        kedua: `Tim Fasilitator bertugas merancang modul projek, memfasilitasi aktivitas siswa dalam sistem blok waktu, mendampingi pembuatan karya/aksi nyata bernilai cinta, dan melakukan asesmen dimensi P5RA.`,
        ketiga: `Masing-masing fasilitator wajib mendokumentasikan proses, portofolio perkembangan karakter siswa, dan menyelenggarakan Gelar Karya / Festival Panen Belajar di akhir semester.`,
        keempat: `Segala biaya yang timbul sebagai akibat ditetapkannya keputusan ini dibebankan pada DIPA / Dana BOS Madrasah.`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dengan ketentuan apabila di kemudian hari terdapat kekeliruan akan diperbaiki sebagaimana mestinya.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kementerian Agama`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Masing-masing fasilitator projek untuk diketahui dan dilaksanakan',
        'Arsip Madrasah',
      ],
      susunanTim: [
        { jabatanTim: 'Penanggung Jawab', nama: profile.namaKepala, tema: 'Semua Tema', peran: 'Pengarah kebijakan alokasi 20-30% jam pelajaran untuk kokurikuler dan monitoring efektivitas projek' },
        { jabatanTim: 'Koordinator Utama P5RA', nama: teachers[1]?.nama || 'Waka Kurikulum', tema: 'Lintas Fase (Fase A-C)', peran: 'Penyusunan jadwal blok projek, panduan modul kokurikuler, dan standarisasi instrumen asesmen' },
        { jabatanTim: 'Fasilitator Tema 1 (Kearifan Lokal & Budaya Damai)', nama: teachers[2]?.nama || 'Guru PAI', tema: 'Fase A & B (Kelas 1-4)', peran: 'Membimbing eksplorasi tradisi luhur, kuliner sehat halal, dan kesenian islami bernilai toleransi (tasamuh)' },
        { jabatanTim: 'Fasilitator Tema 2 (Gaya Hidup Berkelanjutan & Cinta Bumi)', nama: teachers[4]?.nama || 'Guru Sains/Kelas', tema: 'Fase B & C (Kelas 3-6)', peran: 'Mendampingi proyek pemilahan sampah organik, penghijauan madrasah ramah anak, dan hemat energi' },
        { jabatanTim: 'Fasilitator Tema 3 (Bangunlah Jiwa dan Raganya)', nama: teachers[3]?.nama || 'Guru PJOK/BK', tema: 'Fase A-C (Kelas 1-6)', peran: 'Kampanye anti-perundungan (zero bullying), senam cinta madrasah, dan pembiasaan makan gizi seimbang' },
        { jabatanTim: 'Koordinator Dokumentasi & Gelar Karya', nama: teachers[0]?.nama || 'Guru Seni/IT', tema: 'Festival Panen Karya', peran: 'Pengelolaan pameran karya siswa, digitalisasi rapor P5RA, dan publikasi media madrasah' },
      ],
    };
  } else if (type === 'SK_WALI_KELAS') {
    title = `Penetapan Wali Kelas dan Pembina Ekstrakurikuler Tahun Pelajaran ${profile.tahunAjaran}`;
    const waliList = teachers
      .filter((t) => t.waliKelasDi)
      .map((t, idx) => ({
        rombel: t.waliKelasDi || `Kelas ${idx + 1}A`,
        namaWali: t.nama,
        nip: t.nip || '-',
        ruang: `R. ${idx + 1}`,
        jumlahSiswa: 28,
      }));

    contentData = {
      menimbang: [
        `bahwa demi ketertiban administrasi kelas, efektivitas bimbingan emosional spiritual, dan pendampingan karakter kasih sayang peserta didik di ${profile.namaMadrasah}, perlu ditetapkan Wali Kelas;`,
        `bahwa untuk mewadahi, membina, dan menyalurkan potensi, minat, bakat, serta kepemimpinan peserta didik secara optimal, perlu ditunjuk Pembina Ekstrakurikuler;`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah tentang Penetapan Wali Kelas dan Pembina Ekstrakurikuler Tahun Pelajaran ${profile.tahunAjaran};`,
      ],
      mengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;',
        'Peraturan Pemerintah Nomor 17 Tahun 2010 tentang Pengelolaan dan Penyelenggaraan Pendidikan;',
        'Peraturan Menteri Agama Nomor 90 Tahun 2013 jo. PMA No. 66 Tahun 2016 tentang Penyelenggaraan Pendidikan Madrasah;',
        'Keputusan Menteri Agama Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Madrasah;',
        'Keputusan Menteri Agama Nomor 1503 Tahun 2025 tentang Pedoman Kurikulum pada Madrasah;',
      ],
      memperhatikan: [
        `Hasil Rapat Dewan Guru ${profile.namaMadrasah} tentang Pemetaan Rombongan Belajar dan Program Kegiatan Ekstrakurikuler Tahun Pelajaran ${profile.tahunAjaran}.`,
      ],
      diktum: {
        kesatu: `Menetapkan Wali Kelas pada setiap rombongan belajar Tahun Pelajaran ${profile.tahunAjaran} sebagaimana tercantum dalam Lampiran I Keputusan ini.`,
        kedua: `Menetapkan Pembina Ekstrakurikuler Wajib dan Pilihan Tahun Pelajaran ${profile.tahunAjaran} sebagaimana tercantum dalam Lampiran II Keputusan ini.`,
        ketiga: `Wali Kelas bertanggung jawab penuh atas pengelolaan administrasi kelas, absensi, pembinaan disiplin positif, komunikasi berkala dengan wali murid, serta pengisian Buku Laporan Hasil Belajar (Rapor Digital Madrasah).`,
        keempat: `Pembina Ekstrakurikuler bertugas menyusun program kerja tahunan, memfasilitasi latihan rutin, menjaga keselamatan siswa, dan mengantarkan prestasi siswa dalam berbagai ajang kompetisi resmi.`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dengan ketentuan apabila di kemudian hari terdapat kekeliruan akan diperbaiki sebagaimana mestinya.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kementerian Agama`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Bapak/Ibu Wali Kelas dan Pembina Ekstrakurikuler yang bersangkutan',
        'Arsip Madrasah',
      ],
      waliKelasList: waliList.length ? waliList : [
        { rombel: 'Kelas 1A (Fase A)', namaWali: teachers[0]?.nama || 'Ustadzah Siti Aminah, S.Pd', nip: teachers[0]?.nip || '-', ruang: 'R. 101', jumlahSiswa: 28 },
        { rombel: 'Kelas 2A (Fase A)', namaWali: teachers[1]?.nama || 'Ustadz Ahmad Fauzi, S.Pd.I', nip: teachers[1]?.nip || '-', ruang: 'R. 102', jumlahSiswa: 28 },
        { rombel: 'Kelas 3A (Fase B)', namaWali: teachers[2]?.nama || 'Ustadzah Nurul Hidayah, S.Pd', nip: teachers[2]?.nip || '-', ruang: 'R. 201', jumlahSiswa: 30 },
        { rombel: 'Kelas 4A (Fase B)', namaWali: teachers[3]?.nama || 'Ustadz Ridwan Malik, M.Pd', nip: teachers[3]?.nip || '-', ruang: 'R. 202', jumlahSiswa: 30 },
        { rombel: 'Kelas 5A (Fase C)', namaWali: teachers[4]?.nama || 'Ustadzah Dewi Kartika, S.Si', nip: teachers[4]?.nip || '-', ruang: 'R. 301', jumlahSiswa: 32 },
        { rombel: 'Kelas 6A (Fase C)', namaWali: teachers[5]?.nama || 'Ustadz Muhammad Yusuf, M.Pd', nip: teachers[5]?.nip || '-', ruang: 'R. 302', jumlahSiswa: 32 },
      ],
      ekskulList: [
        { namaEkskul: 'Gerakan Pramuka Gugus Depan Madrasah', kategori: 'Wajib', pembina: teachers[2]?.nama || 'Kak Ridwan Malik, S.Pd (KMD)', jadwal: 'Jumat, 14.00 - 16.00 WIB', tempat: 'Halaman & Lapangan Madrasah' },
        { namaEkskul: 'Tahfidzul Qur\'an & Seni Tilawah (Tartil)', kategori: 'Pilihan Unggulan', pembina: teachers[1]?.nama || 'Ustadz Ahmad Fauzi, S.Pd.I (Al-Hafizh)', jadwal: 'Sabtu, 07.30 - 09.30 WIB', tempat: 'Mushalla Utama Madrasah' },
        { namaEkskul: 'Robotika, Coding Cilik & Sains Club', kategori: 'Pilihan Prestasi', pembina: teachers[4]?.nama || 'Ustadzah Dewi Kartika, S.Si', jadwal: 'Rabu, 14.30 - 16.00 WIB', tempat: 'Laboratorium Komputer & STEM' },
        { namaEkskul: 'Seni Hadrah / Banjari & Qasidah Modern', kategori: 'Pilihan Seni Islami', pembina: teachers[3]?.nama || 'Ustadz Hasan Basri, S.Sn', jadwal: 'Kamis, 15.00 - 16.30 WIB', tempat: 'Aula Kreativitas Seni' },
        { namaEkskul: 'Futsal, Bulu Tangkis & Pencak Silat Pagar Nusa', kategori: 'Pilihan Olahraga', pembina: teachers[0]?.nama || 'Ustadz Fajar Nugroho, S.Pd (PJOK)', jadwal: 'Selasa, 15.30 - 17.00 WIB', tempat: 'Gelanggang Olahraga Madrasah' },
        { namaEkskul: 'English & Arabic Young Club (Bilingual)', kategori: 'Pilihan Bahasa', pembina: teachers[5]?.nama || 'Ustadzah Laila Fitriani, M.Pd', jadwal: 'Senin, 14.30 - 15.45 WIB', tempat: 'Ruang Multimedia Bahasa' },
      ],
    };
  } else if (type === 'SK_PPDB') {
    title = `Penetapan Panitia Penerimaan Peserta Didik Baru (PPDB) Tahun Pelajaran ${profile.tahunAjaran}`;
    contentData = {
      menimbang: [
        `bahwa dalam rangka memperlancar proses penerimaan peserta didik baru yang objektif, transparan, akuntabel, nondiskriminatif, dan berkeadilan di ${profile.namaMadrasah} Tahun Pelajaran ${profile.tahunAjaran}, perlu dibentuk Panitia PPDB;`,
        `bahwa mereka yang namanya tercantum dalam lampiran keputusan ini dipandang mampu dan berintegritas untuk melaksanakan tugas kepanitiaan;`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah tentang Panitia PPDB Tahun Pelajaran ${profile.tahunAjaran};`,
      ],
      mengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;',
        'Peraturan Pemerintah Nomor 17 Tahun 2010 tentang Pengelolaan dan Penyelenggaraan Pendidikan;',
        'Peraturan Menteri Agama Nomor 90 Tahun 2013 jo. PMA No. 66 Tahun 2016 tentang Penyelenggaraan Pendidikan Madrasah;',
        'Keputusan Direktur Jenderal Pendidikan Islam Kementerian Agama RI tentang Petunjuk Teknis Penerimaan Peserta Didik Baru (PPDB) pada RA, MI, MTs, MA, dan MAK;',
      ],
      memperhatikan: [
        `Hasil Rapat Dewan Guru dan Pengurus Komite ${profile.namaMadrasah} tentang Daya Tampung Rombongan Belajar dan Mekanisme Seleksi Pemetaan Karakter Calon Siswa Baru.`,
      ],
      diktum: {
        kesatu: `Membentuk dan menetapkan Panitia Penerimaan Peserta Didik Baru (PPDB) ${profile.namaMadrasah} Tahun Pelajaran ${profile.tahunAjaran} dengan susunan personalia sebagaimana tercantum dalam Lampiran Keputusan ini.`,
        kedua: `Panitia bertugas menyusun juknis operasional PPDB madrasah, mempublikasikan informasi pendaftaran online/offline, memverifikasi dokumen calon siswa, melaksanakan observasi kesiapan belajar ramah anak, dan mengumumkan hasil seleksi secara transparan.`,
        ketiga: `Panitia bertanggung jawab langsung dan wajib menyampaikan laporan pertanggungjawaban pelaksanaan PPDB kepada Kepala Madrasah dan Kantor Kemenag.`,
        keempat: `Segala biaya pelaksanaan dibebankan pada DIPA / Dana BOS Madrasah atau anggaran madrasah yang sah sesuai juknis BOS Kemenag.`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dan apabila terdapat kekeliruan akan diperbaiki sebagaimana mestinya.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kementerian Agama`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Panitia PPDB yang bersangkutan untuk diketahui dan dilaksanakan',
        'Arsip Madrasah',
      ],
      susunanPanitia: [
        { jabatanPanitia: 'Penanggung Jawab', nama: profile.namaKepala, unsur: 'Kepala Satuan Pendidikan', tugas: 'Pengarah umum kebijakan kuota rombel dan penanggung jawab mutlak pelaksanaan PPDB' },
        { jabatanPanitia: 'Ketua Panitia', nama: teachers[2]?.nama || 'Waka Kesiswaan', unsur: 'Waka Kesiswaan', tugas: 'Mengkoordinir seluruh tahapan sosialisasi, pendaftaran, dan penetapan hasil seleksi' },
        { jabatanPanitia: 'Sekretaris', nama: teachers[3]?.nama || 'Operator EMIS', unsur: 'Operator EMIS / Simpatika', tugas: 'Pemberkasan formulir, digitalisasi data siswa pada EMIS 4.0, dan korespondensi' },
        { jabatanPanitia: 'Bendahara', nama: teachers[5]?.nama || 'Bendahara Madrasah', unsur: 'Bendahara Madrasah', tugas: 'Pengelolaan administrasi keuangan pendaftaran dan kelengkapan seragam siswa' },
        { jabatanPanitia: 'Koordinator Observasi & Pemetaan Kesiapan', nama: teachers[1]?.nama || 'Guru Kelas 1', unsur: 'Guru Senior Fase A', tugas: 'Melakukan observasi minat, motorik, kemandirian anak, dan baca Al-Qur\'an secara menyenangkan tanpa tes calistung formal' },
        { jabatanPanitia: 'Seksi Publikasi & Humas', nama: teachers[4]?.nama || 'Guru IT', unsur: 'Humas Madrasah', tugas: 'Pembuatan banner, konten medsos, dan pelayanan meja informasi ramah orang tua' },
      ],
      jadwalKegiatan: [
        { tahap: '1. Sosialisasi & Publikasi PPDB Ramah Anak', waktu: 'Maret - April 2025', keterangan: 'Media Sosial, Brosur, dan Spanduk' },
        { tahap: '2. Pendaftaran Jalur Prestasi & Tahfidz', waktu: '01 - 15 Mei 2025', keterangan: 'Online & Meja Pelayanan Madrasah' },
        { tahap: '3. Pendaftaran Jalur Reguler & Zonasi', waktu: '16 Mei - 20 Juni 2025', keterangan: 'Sekretariat PPDB Madrasah' },
        { tahap: '4. Observasi Pemetaan Kesiapan Belajar', waktu: '23 - 25 Juni 2025', keterangan: 'Ruang Kelas Ramah Anak' },
        { tahap: '5. Pengumuman Kelulusan & Daftar Ulang', waktu: '28 Juni - 05 Juli 2025', keterangan: 'Papan Pengumuman & Website Madrasah' },
      ],
    };
  } else if (type === 'SK_MATSAMA') {
    title = `Penetapan Panitia Masa Ta'aruf Siswa Madrasah (MATSAMA) Tahun Pelajaran ${profile.tahunAjaran}`;
    contentData = {
      menimbang: [
        `bahwa dalam rangka mengorientasikan peserta didik baru terhadap lingkungan fisik, budaya islami, moderasi beragama, dan atmosfer madrasah ramah anak berbasis cinta kasih di ${profile.namaMadrasah}, perlu diselenggarakan Masa Ta'aruf Siswa Madrasah (MATSAMA);`,
        `bahwa agar kegiatan MATSAMA berlangsung edukatif, inspiratif, menyenangkan, serta bebas dari perundungan dan kekerasan fisik, perlu dibentuk Panitia Pelaksana;`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah tentang Panitia MATSAMA Tahun Pelajaran ${profile.tahunAjaran};`,
      ],
      mengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;',
        'Peraturan Menteri Pendidikan dan Kebudayaan Nomor 18 Tahun 2016 tentang Pengenalan Lingkungan Sekolah bagi Siswa Baru;',
        'Keputusan Direktur Jenderal Pendidikan Islam Kementerian Agama RI tentang Petunjuk Teknis Pelaksanaan Masa Ta\'aruf Siswa Madrasah (MATSAMA);',
        'Pedoman Implementasi Moderasi Beragama dan Madrasah Ramah Anak Kementerian Agama RI;',
      ],
      memperhatikan: [
        `Hasil Rapat Kerja Guru dan Tenaga Kependidikan ${profile.namaMadrasah} tentang Persiapan Awal Tahun Pelajaran dan Rancangan Rundown MATSAMA Edukatif.`,
      ],
      diktum: {
        kesatu: `Membentuk dan menetapkan Panitia Pelaksana Masa Ta'aruf Siswa Madrasah (MATSAMA) ${profile.namaMadrasah} Tahun Pelajaran ${profile.tahunAjaran} sebagaimana tercantum dalam Lampiran Keputusan ini.`,
        kedua: `Panitia bertugas menyusun agenda MATSAMA yang memuat materi nilai-nilai panca cinta madrasah (Cinta Allah-Rasul, Cinta Ilmu, Cinta Lingkungan, Cinta Sesama, Cinta Tanah Air), moderasi beragama, pengenalan tata tertib ramah anak, dan simulasi pembiasaan ibadah.`,
        ketiga: `Panitia dilarang keras membebankan tugas/atribut yang memberatkan atau mengarah pada perundungan (bullying), serta wajib mendampingi peserta didik baru dengan prinsip kasih sayang.`,
        keempat: `Segala biaya pelaksanaan dibebankan pada DIPA / Dana BOS Madrasah.`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dan apabila terdapat kekeliruan akan diperbaiki sebagaimana mestinya.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kementerian Agama`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Panitia MATSAMA untuk diketahui dan dilaksanakan',
        'Arsip Madrasah',
      ],
      susunanPanitia: [
        { jabatanPanitia: 'Penanggung Jawab', nama: profile.namaKepala, unsur: 'Kepala Madrasah', tugas: 'Pengarah utama dan penanggung jawab kelancaran serta keamanan siswa selama MATSAMA' },
        { jabatanPanitia: 'Ketua Panitia', nama: teachers[2]?.nama || 'Waka Kesiswaan', unsur: 'Waka Kesiswaan', tugas: 'Memimpin teknis pelaksanaan, mengontrol rundown kegiatan, dan koordinasi pemateri' },
        { jabatanPanitia: 'Sekretaris & Acara', nama: teachers[4]?.nama || 'Guru Muda', unsur: 'Pendidik', tugas: 'Menyusun jadwal kegiatan, lembar refleksi emosi bahagia siswa, dan administrasi' },
        { jabatanPanitia: 'Koordinator Disiplin Positif & Ramah Anak', nama: teachers[1]?.nama || 'Guru BK / Kelas', unsur: 'Guru BK / Kelas 1', tugas: 'Menjaga kenyamanan psikologis peserta didik baru dan memfasilitasi games keakraban' },
        { jabatanPanitia: 'Seksi Konsumsi & P3K', nama: teachers[3]?.nama || 'Tenaga Kependidikan', unsur: 'UKS Madrasah', tugas: 'Menyiapkan air minum sehat, kudapan bergizi halal, dan posko kesehatan' },
      ],
      jadwalKegiatan: [
        { tahap: 'Hari Ke-1 : Ta\'aruf Lingkungan & Guru Ramah', waktu: 'Hari Pertama Masuk (07.30 - 10.30 WIB)', keterangan: 'Penyambutan senyum sapa salam, parade guru, dan tur keliling madrasah' },
        { tahap: 'Hari Ke-2 : Nilai Moderasi & Cinta Kasih (Anti-Bullying)', waktu: 'Hari Kedua (07.30 - 10.30 WIB)', keterangan: 'Dongeng keteladanan Nabi, ikrar anti-bullying, dan pohon kebaikan' },
        { tahap: 'Hari Ke-3 : Gebyar Bakat & Penanaman Pohon Cinta', waktu: 'Hari Ketiga (07.30 - 11.00 WIB)', keterangan: 'Ajang unjuk kebolehan cilik, pembagian pin sahabat madrasah, dan doa bersama' },
      ],
    };
  } else if (type === 'SK_TPPK') {
    title = `Penetapan Tim Pencegahan dan Penanganan Kekerasan (TPPK) di Lingkungan Madrasah`;
    contentData = {
      menimbang: [
        `bahwa satuan pendidikan madrasah harus menjadi ruang yang aman, nyaman, inklusif, dan bebas dari segala bentuk kekerasan fisik, psikis, perundungan, kekerasan seksual, dan diskriminasi;`,
        `bahwa untuk mengimplementasikan kebijakan pencegahan, pelaporan yang cepat, serta penanganan kasus kekerasan secara komprehensif di ${profile.namaMadrasah}, perlu dibentuk Tim Satgas TPPK lintas unsur;`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah tentang Tim Pencegahan dan Penanganan Kekerasan (TPPK);`,
      ],
      mengingat: [
        'Undang-Undang Nomor 35 Tahun 2014 tentang Perubahan atas Undang-Undang Nomor 23 Tahun 2002 tentang Perlindungan Anak;',
        'Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 46 Tahun 2023 tentang Pencegahan dan Penanganan Kekerasan di Lingkungan Satuan Pendidikan;',
        'Keputusan Direktur Jenderal Pendidikan Islam Kementerian Agama RI tentang Petunjuk Teknis Penyelenggaraan Madrasah Ramah Anak;',
        'Keputusan Menteri Agama Nomor 1503 Tahun 2025 tentang Kurikulum pada Madrasah Berbasis Cinta Kasih;',
      ],
      memperhatikan: [
        `Hasil Musyawarah Bersama Kepala Madrasah, Dewan Guru, Pengurus Komite, dan Perwakilan Wali Murid tentang Komitmen Zero Tolerance terhadap Kekerasan di Madrasah.`,
      ],
      diktum: {
        kesatu: `Membentuk dan menetapkan Susunan Tim Pencegahan dan Penanganan Kekerasan (TPPK) di lingkungan ${profile.namaMadrasah} sebagaimana tercantum dalam Lampiran Keputusan ini.`,
        kedua: `TPPK bertugas merancang program preventif pencegahan kekerasan, menyediakan kanal pengaduan rahasia (kotak curhat & hotline), menindaklanjuti laporan dugaan kekerasan dengan asas perlindungan korban, dan merekomendasikan sanksi edukatif.`,
        ketiga: `Dalam melaksanakan tugasnya, TPPK wajib mengedepankan prinsip kepentingan terbaik bagi anak, kerahasiaan identitas korban, keadilan, dan non-diskriminasi.`,
        keempat: `Segala biaya yang timbul dibebankan pada DIPA / Dana BOS Madrasah atau pos anggaran yang sah.`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dengan masa kerja selama 2 (dua) tahun dan dapat diperpanjang sesuai kebutuhan.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Kepala Dinas Pemberdayaan Perempuan dan Perlindungan Anak (DP3A) ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kementerian Agama`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Masing-masing anggota TPPK untuk diketahui dan dilaksanakan',
        'Arsip Madrasah',
      ],
      susunanTim: [
        { jabatanTim: 'Penanggung Jawab', nama: profile.namaKepala, unsur: 'Kepala Satuan Pendidikan', tugas: 'Menjamin ketersediaan fasilitas aman dan mengambil keputusan tindakan pencegahan kekerasan tingkat madrasah' },
        { jabatanTim: 'Ketua Tim TPPK', nama: teachers[1]?.nama || 'Guru Senior', unsur: 'Perwakilan Pendidik', tugas: 'Memimpin investigasi awal, verifikasi laporan dugaan kekerasan, dan koordinasi dengan pihak eksternal' },
        { jabatanTim: 'Sekretaris & Konselor', nama: teachers[2]?.nama || 'Guru BK / Kelas', unsur: 'Perwakilan Guru BK', tugas: 'Mengelola kanal pengaduan, konseling pemulihan psikologis korban, dan dokumentasi berkas' },
        { jabatanTim: 'Anggota Perwakilan Wali Murid', nama: profile.namaKetuaKomite, unsur: 'Komite Madrasah / Tokoh Masyarakat', tugas: 'Menjadi jembatan komunikasi dengan orang tua siswa dan pengawasan independen' },
        { jabatanTim: 'Anggota Administrasi & Keamanan', nama: 'Staff Tata Usaha & Satpam', unsur: 'Tenaga Kependidikan', tugas: 'Patroli berkala titik rawan madrasah (kamar mandi, sudut kantin, gerbang) dan logistik' },
      ],
    };
  } else if (type === 'SK_PANITIA_UJIAN') {
    title = `Penetapan Panitia Asesmen Madrasah (AM) dan Asesmen Nasional Berbasis Komputer (ANBK) Tahun Pelajaran ${profile.tahunAjaran}`;
    contentData = {
      menimbang: [
        `bahwa dalam rangka mengukur ketercapaian kompetensi lulusan peserta didik dan pemetaan mutu pendidikan di ${profile.namaMadrasah}, perlu diselenggarakan Asesmen Madrasah (AM) dan ANBK Tahun Pelajaran ${profile.tahunAjaran};`,
        `bahwa demi kelancaran, objektivitas, integritas, dan ketertiban administrasi pelaksanaan ujian, perlu dibentuk Panitia Pelaksana;`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah tentang Panitia Asesmen Madrasah dan ANBK Tahun Pelajaran ${profile.tahunAjaran};`,
      ],
      mengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;',
        'Peraturan Pemerintah Nomor 57 Tahun 2021 jo. PP No. 4 Tahun 2022 tentang Standar Nasional Pendidikan;',
        'Peraturan Menteri Agama Nomor 90 Tahun 2013 jo. PMA No. 66 Tahun 2016 tentang Penyelenggaraan Pendidikan Madrasah;',
        'Prosedur Operasional Standar (POS) Penyelenggaraan Asesmen Madrasah Direktorat KSKK Madrasah Ditjen Pendidikan Islam Kemenag RI;',
        'Prosedur Operasional Standar (POS) Asesmen Nasional Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP);',
      ],
      memperhatikan: [
        `Hasil Rapat Dewan Guru ${profile.namaMadrasah} tentang Pembentukan Panitia, Jadwal, dan Kesiapan Sarana CBT/Kertas Asesmen Madrasah.`,
      ],
      diktum: {
        kesatu: `Membentuk dan menetapkan Panitia Asesmen Madrasah (AM) dan ANBK Tahun Pelajaran ${profile.tahunAjaran} dengan susunan sebagaimana tercantum dalam Lampiran Keputusan ini.`,
        kedua: `Panitia bertugas menyiapkan kisi-kisi dan naskah soal/bank soal digital, menyusun jadwal pengawasan silang, menyiapkan server CBT dan perangkat client, menjaga kerahasiaan instrumen asesmen, serta memproses rekapitulasi nilai akhir.`,
        ketiga: `Panitia bertanggung jawab penuh kepada Kepala Madrasah dan wajib menyampaikan laporan pelaksanaan asesmen secara tertulis.`,
        keempat: `Segala biaya pelaksanaan dibebankan pada DIPA / Dana BOS Madrasah sesuai ketentuan peraturan perundang-undangan.`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dan apabila terdapat kekeliruan akan diperbaiki sebagaimana mestinya.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kementerian Agama`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Panitia yang bersangkutan untuk diketahui dan dilaksanakan',
        'Arsip Madrasah',
      ],
      susunanPanitia: [
        { jabatanPanitia: 'Penanggung Jawab', nama: profile.namaKepala, jabatanKedinasan: 'Kepala Madrasah', tugas: 'Penanggung jawab umum keberlangsungan asesmen dan pengesahan hasil nilai kelulusan' },
        { jabatanPanitia: 'Ketua Panitia', nama: teachers[1]?.nama || 'Waka Kurikulum', jabatanKedinasan: 'Waka Kurikulum', tugas: 'Mengkoordinir penyusunan kisi-kisi, master soal, dan tata tertib pengawasan' },
        { jabatanPanitia: 'Sekretaris', nama: teachers[2]?.nama || 'Waka Kesiswaan', jabatanKedinasan: 'Guru PAI', tugas: 'Penggandaan naskah/token, kartu peserta ujian, daftar hadir, dan berita acara ujian' },
        { jabatanPanitia: 'Bendahara', nama: teachers[5]?.nama || 'Bendahara Madrasah', jabatanKedinasan: 'Guru PAI', tugas: 'Pencairan honorarium pengawas, proktor, teknisi, dan konsumsi asesmen' },
        { jabatanPanitia: 'Proktor Utama ANBK/AM-CBT', nama: teachers[4]?.nama || 'Operator IT', jabatanKedinasan: 'Kepala Lab Komputer', tugas: 'Sinkronisasi VHD/CBT pusat, pembagian akun peserta, dan upload hasil respon siswa' },
        { jabatanPanitia: 'Teknisi Jaringan & Listrik', nama: 'M. Irfan, A.Md', jabatanKedinasan: 'Teknisi IT / Listrik', tugas: 'Memastikan stabilitas koneksi internet bandwidth tinggi dan pasokan listrik genset cadangan' },
      ],
    };
  } else if (type === 'SK_KKTP_KELULUSAN') {
    title = `Penetapan Kriteria Ketercapaian Tujuan Pembelajaran (KKTP), Kriteria Kenaikan Kelas, dan Kriteria Kelulusan Tahun Pelajaran ${profile.tahunAjaran}`;
    contentData = {
      menimbang: [
        `bahwa dalam rangka memberikan acuan baku penilaian hasil belajar, ketuntasan capaian pembelajaran, dasar pertimbangan kenaikan kelas serta kelulusan peserta didik di ${profile.namaMadrasah}, perlu ditetapkan Kriteria Ketercapaian Tujuan Pembelajaran (KKTP);`,
        `bahwa penetapan kriteria ketuntasan harus memperhatikan karakteristik peserta didik, kompleksitas materi, daya dukung madrasah, dan prinsip Kurikulum Berbasis Cinta (Mahabbah);`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah tentang Penetapan KKTP, Kenaikan Kelas, dan Kelulusan Tahun Pelajaran ${profile.tahunAjaran};`,
      ],
      mengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;',
        'Peraturan Pemerintah Nomor 57 Tahun 2021 jo. PP No. 4 Tahun 2022 tentang Standar Nasional Pendidikan;',
        'Peraturan Menteri Agama Nomor 90 Tahun 2013 jo. PMA No. 66 Tahun 2016 tentang Penyelenggaraan Pendidikan Madrasah;',
        'Keputusan Menteri Agama Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Madrasah;',
        'Keputusan Menteri Agama Nomor 1503 Tahun 2025 tentang Pedoman Kurikulum pada Madrasah;',
        'Panduan Pembelajaran dan Asesmen (PPA) Direktorat KSKK Madrasah Ditjen Pendis Kemenag RI;',
      ],
      memperhatikan: [
        `Hasil Rapat Pleno Dewan Pendidik ${profile.namaMadrasah} tentang Analisis Ketuntasan Belajar dan Kriteria Kenaikan Kelas / Kelulusan Tahun Pelajaran ${profile.tahunAjaran}.`,
      ],
      diktum: {
        kesatu: `Menetapkan Interval Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) untuk seluruh mata pelajaran pada Fase A, Fase B, dan Fase C sebagaimana tercantum dalam Lampiran I Keputusan ini.`,
        kedua: `Menetapkan Kriteria Kenaikan Kelas dan Kriteria Kelulusan dari Satuan Pendidikan bagi peserta didik ${profile.namaMadrasah} sebagaimana tercantum dalam Lampiran II Keputusan ini.`,
        ketiga: `KKTP digunakan oleh seluruh guru sebagai acuan refleksi diagnostik, pemberian bimbingan remedial diferensiasi bagi yang belum tuntas, dan program pengayaan bagi yang melampaui ketuntasan.`,
        keempat: `Keputusan ini dijadikan pedoman resmi dalam penulisan Buku Laporan Hasil Belajar (RDM) dan Surat Keterangan Lulus (SKL).`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dan apabila terdapat kekeliruan akan diperbaiki sebagaimana mestinya.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kementerian Agama`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Bapak/Ibu Pendidik di lingkungan madrasah untuk dipedomani',
        'Arsip Madrasah',
      ],
      rentangNilai: [
        { interval: '0% - 65%', kategori: 'Belum Mencapai Ketuntasan', tindakLanjut: 'Perlu bimbingan intensif dan remedial menyeluruh pada seluruh indikator materi pokok' },
        { interval: '66% - 75%', kategori: 'Mencapai Ketuntasan Sebagian', tindakLanjut: 'Diberikan intervensi remedial khusus pada indikator tujuan pembelajaran yang belum tercapai' },
        { interval: '76% - 85%', kategori: 'Mencapai Ketuntasan Baik', tindakLanjut: 'Tuntas, dapat melanjutkan ke materi berikutnya tanpa perlu remedial pembelajaran' },
        { interval: '86% - 100%', kategori: 'Mencapai Ketuntasan Sangat Baik', tindakLanjut: 'Tuntas dengan istimewa, diberikan materi pengayaan berbasis pemecahan masalah (HOTS)' },
      ],
      kriteriaKenaikan: [
        'Menyelesaikan seluruh program pembelajaran pada semester ganjil dan genap pada tahun pelajaran yang bersangkutan.',
        'Memiliki nilai sikap spiritual dan sosial minimal berkategori BAIK (B) berdasarkan observasi karakter welas asih.',
        'Mencapai kriteria ketuntasan tujuan pembelajaran (KKTP) pada seluruh mata pelajaran intra-kurikuler dan kokurikuler.',
        'Tingkat kehadiran tatap muka minimal 85% dari total hari efektif belajar, di luar ketidakhadiran dengan alasan sakit/izin resmi.',
        'Berdasarkan musyawarah rapat pleno dewan guru dengan mempertimbangkan kemajuan belajar komprehensif siswa.',
      ],
      kriteriaKelulusan: [
        'Menyelesaikan seluruh program pembelajaran dari kelas 1 sampai dengan kelas 6 yang dibuktikan dengan buku rapor lengkap.',
        'Memperoleh nilai sikap dan perilaku minimal BAIK pada seluruh semester.',
        'Mengikuti seluruh rangkaian Asesmen Madrasah (AM) yang diselenggarakan oleh satuan pendidikan.',
        'Lulus ujian praktik keagamaan madrasah (Kemampuan Baca Tulis Al-Qur\'an, Praktik Shalat Fardhu/Jenazah, dan Hafalan Juz Amma).',
        'Dinyatakan lulus dalam rapat pleno dewan guru yang dituangkan dalam Berita Acara Kelulusan.',
      ],
    };
  } else if (type === 'SK_TIM_BOS') {
    title = `Penetapan Tim Manajemen Bantuan Operasional Sekolah (BOS) Madrasah Tahun Pelajaran ${profile.tahunAjaran}`;
    contentData = {
      menimbang: [
        `bahwa dalam rangka mewujudkan tata kelola keuangan yang transparan, akuntabel, efektif, efisien, dan tepat sasaran pada pengelolaan Dana BOS di ${profile.namaMadrasah}, perlu dibentuk Tim Manajemen BOS Madrasah;`,
        `bahwa mereka yang namanya tercantum dalam lampiran keputusan ini dipandang memiliki kompetensi integritas dan kecakapan tata kelola keuangan madrasah;`,
        `bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah tentang Tim Manajemen BOS Tahun Pelajaran ${profile.tahunAjaran};`,
      ],
      mengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;',
        'Peraturan Pemerintah Nomor 17 Tahun 2010 tentang Pengelolaan dan Penyelenggaraan Pendidikan;',
        'Peraturan Menteri Keuangan tentang Pengelolaan Dana Alokasi Khusus Nonfisik;',
        'Peraturan Menteri Agama Nomor 19 Tahun 2019 tentang Organisasi dan Tata Kerja Kementerian Agama;',
        'Keputusan Direktur Jenderal Pendidikan Islam Kementerian Agama RI tentang Petunjuk Teknis Pengelolaan Bantuan Operasional Sekolah (BOS) pada Madrasah yang Berlaku;',
      ],
      memperhatikan: [
        `Hasil Rapat Kerja Dewan Pendidik, Pengurus Komite, dan Tenaga Administrasi ${profile.namaMadrasah} tentang Penyusunan Rencana Kerja dan Anggaran Madrasah (RKAM/e-RKAM).`,
      ],
      diktum: {
        kesatu: `Membentuk dan menetapkan Tim Manajemen Bantuan Operasional Sekolah (BOS) ${profile.namaMadrasah} Tahun Pelajaran ${profile.tahunAjaran} dengan susunan sebagaimana tercantum dalam Lampiran Keputusan ini.`,
        kedua: `Tim Manajemen BOS bertugas menyusun RKAM berbasis Evaluasi Diri Madrasah (EDM), memverifikasi keabsahan bukti pengeluaran (SPJ), menginput transaksi pada aplikasi e-RKAM/Portal BOS, dan mempublikasikan rekapitulasi penerimaan/penggunaan dana.`,
        ketiga: `Tim Manajemen BOS bertanggung jawab penuh atas keabsahan material dan formal penggunaan dana serta melaporkan realisasi triwulan/semesteran kepada Kepala Kankemenag.`,
        keempat: `Segala biaya operasional tim manajemen dibebankan pada komponen penggunaan dana BOS madrasah sesuai ketentuan juknis resmi Kemenag.`,
        kelima: `Keputusan ini mulai berlaku pada tanggal ditetapkan, dan apabila terdapat kekeliruan akan diadakan perbaikan sebagaimana mestinya.`,
      },
      tembusan: [
        `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pejabat Pembuat Komitmen (PPK) BOS Kemenag ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
        `Pengawas Madrasah Pembina Kementerian Agama`,
        `Ketua Komite ${profile.namaMadrasah}`,
        'Tim Manajemen BOS yang bersangkutan untuk dipedomani',
        'Arsip Madrasah',
      ],
      susunanTim: [
        { jabatanTim: 'Penanggung Jawab', nama: profile.namaKepala, unsur: 'Kepala Satuan Pendidikan', tugas: 'Penanggung jawab mutlak (KPA) atas seluruh perencanaan dan realisasi penggunaan anggaran Dana BOS madrasah' },
        { jabatanTim: 'Bendahara BOS Madrasah', nama: teachers[5]?.nama || 'Bendahara Madrasah', unsur: 'Bendahara Madrasah', tugas: 'Menatausahakan pembukuan kas umum, kas pembantu, pemungutan/penyetoran pajak, dan pelaporan SPJ' },
        { jabatanTim: 'Anggota / Operator e-RKAM & EMIS', nama: teachers[4]?.nama || 'Operator Data', unsur: 'Operator Data Madrasah', tugas: 'Input anggaran RKAM, sinkronisasi data siswa EMIS-Portal BOS, dan upload bukti SPJ digital' },
        { jabatanTim: 'Anggota Tim Verifikasi & Pengadaan', nama: teachers[1]?.nama || 'Waka Sarpras/Kurikulum', unsur: 'Pendidik Senior', tugas: 'Memverifikasi spesifikasi barang/jasa pendidikan, penerimaan buku pelajaran, dan kelayakan harga pasar' },
        { jabatanTim: 'Pengawas Independen / Wali Murid', nama: profile.namaKetuaKomite, unsur: 'Komite Madrasah', tugas: 'Melakukan pemantauan independen terhadap transparansi dan kemanfaatan dana bagi peserta didik' },
      ],
    };
  } else if (type === 'SURAT_AKTIF_SISWA') {
    const student = students.find((s) => s.id === targetId) || students[0];
    targetPersonName = student ? student.nama : 'Peserta Didik';
    title = `Surat Keterangan Aktif Belajar - ${targetPersonName}`;
    contentData = {
      studentData: student,
      keperluan: 'Persyaratan Pengajuan Tunjangan Kinerja / Beasiswa Program Indonesia Pintar (PIP) dan Rekening Tabungan SimPel',
      catatanKelakuan: 'Berkelakuan Baik, Rajin, dan Aktif Mengikuti Pembelajaran di Madrasah',
    };
  } else if (type === 'SURAT_MUTASI_SISWA') {
    const student = students.find((s) => s.id === targetId) || students[0];
    targetPersonName = student ? student.nama : 'Peserta Didik';
    title = `Surat Keterangan Pindah / Mutasi Siswa - ${targetPersonName}`;
    contentData = {
      studentData: student,
      madrasahTujuan: 'Madrasah Ibtidaiyah Negeri 2 Surabaya',
      kabupatenTujuan: 'Kota Surabaya',
      provinsiTujuan: 'Jawa Timur',
      alasanPindah: 'Mengikuti Perpindahan Tugas / Domisili Orang Tua',
      tanggalPermohonan: formattedDate,
    };
  } else if (type === 'SURAT_REKOMENDASI') {
    const student = students.find((s) => s.id === targetId) || students[0];
    targetPersonName = student ? student.nama : 'Peserta Didik';
    title = `Surat Rekomendasi Siswa Berprestasi - ${targetPersonName}`;
    contentData = {
      studentData: student,
      tujuanRekomendasi: 'Pendaftaran Jalur Prestasi / Beasiswa Pendidikan Madrasah Unggulan',
      catatanPrestasi: 'Merupakan peserta didik teladan, berperingkat 3 besar kelas, hafizh 2 Juz Al-Qur\'an, dan memiliki budi pekerti luhur.',
      rekomendasiTeks: 'Kepala Madrasah memberikan rekomendasi penuh kepada yang bersangkutan untuk diterima pada satuan pendidikan/program yang dituju.',
    };
  } else if (type === 'SURAT_TUGAS_GURU') {
    const teacher = teachers.find((t) => t.id === targetId) || teachers[1] || teachers[0];
    targetPersonName = teacher ? teacher.nama : 'Guru Madrasah';
    title = `Surat Tugas Pelatihan / Dinas - ${targetPersonName}`;
    contentData = {
      teacherData: teacher,
      dasarSurat: `Surat Kepala Kantor Kementerian Agama ${profile.kabupatenKota} Nomor B-1205/Kk.13.35/PP.00/08/2025`,
      tugas: 'Sebagai Peserta Bimbingan Teknis Implementasi Kurikulum Berbasis Cinta dan Pengembangan Modul P5RA',
      tempat: `Balai Diklat Keagamaan / Kantor Kemenag ${profile.kabupatenKota}`,
      waktuPelaksanaan: '2 Hari Kerja (08.00 s.d 16.00 WIB)',
      bebanBiaya: 'DIPA Kementerian Agama dan Dana BOS Madrasah',
    };
  } else if (type === 'SURAT_DISPENSASI_SISWA') {
    const student = students.find((s) => s.id === targetId) || students[0];
    targetPersonName = student ? student.nama : 'Peserta Didik';
    title = `Surat Dispensasi Siswa Delegasi Lomba - ${targetPersonName}`;
    contentData = {
      studentData: student,
      namaKegiatan: 'Kompetisi Sains Madrasah (KSM) & Ajang Kreasi Seni Islami Tingkat Kabupaten/Kota',
      penyelenggara: `Kantor Kementerian Agama ${profile.kabupatenKota}`,
      tempat: `MAN 1 ${profile.kabupatenKota}`,
      tanggalKegiatan: formattedDate,
      keterangan: 'Diberikan izin/dispensasi tidak mengikuti KBM reguler untuk mewakili madrasah pada ajang perlombaan tersebut.',
    };
  } else if (type === 'SURAT_PEMBERITAHUAN_ORTU') {
    title = `Surat Undangan Rapat Pertemuan Wali Murid & Sosialisasi Program Madrasah`;
    contentData = {
      hal: 'Undangan Rapat Awal Tahun Pelajaran & Sosialisasi Program Madrasah Berbasis Cinta',
      lampiran: '1 Berkas Rundown Acara',
      hariTanggal: `Sabtu, ${formattedDate}`,
      waktu: '08.30 - 11.30 WIB',
      tempat: `Aula Pertemuan Utama ${profile.namaMadrasah}`,
      agenda: [
        'Sosialisasi Kurikulum Operasional Madrasah (KOM) & KMA 450 Tahun 2024',
        'Pemaparan Program Ekstrakurikuler, Tahfidz, dan Pembiasaan Nilai Cinta',
        'Musyawarah Pembentukan Komite Rombel dan Tabungan Siswa',
      ],
      catatan: 'Mengingat pentingnya agenda ini, dimohon kehadiran Bapak/Ibu Wali Murid tepat waktu.',
    };
  } else if (type === 'MODUL_AJAR') {
    title = `Modul Ajar Berbasis Cinta: Nilai Welas Asih & Moderasi Beragama`;
    contentData = {
      namaPenyusun: teachers[1]?.nama || profile.namaKepala,
      satuanPendidikan: profile.namaMadrasah,
      faseKelas: 'Fase B / Kelas 4',
      mataPelajaran: 'Pendidikan Agama Islam / Tematik Integratif',
      alokasiWaktu: '3 x 35 Menit (1 Pertemuan)',
      dimensiP5RA: 'Beriman Bertakwa (Taadub), Gotong Royong (Tasyawur), Berkeadaban (Tasamuh)',
      nilaiCintaMadrasah: 'Mahabbatun Nafs wal Ikhwan (Kasih Sayang terhadap Teman dan Anti-Bullying)',
      tujuanPembelajaran: 'Peserta didik mampu mendemonstrasikan perilaku saling tolong menolong, menghormati perbedaan, dan menyebarkan salam cinta damai di lingkungan madrasah.',
      pemahamanBermakna: 'Kebaikan kecil yang dilakukan dengan cinta dan ketulusan akan melahirkan kedamaian bersama.',
      langkahPembelajaran: [
        { tahap: 'Pendahuluan (15 Menit)', deskripsi: 'Pembiasaan doa bersama, menyanyikan lagu Mars Madrasah, asesmen diagnostik emosi (Roda Emosi Bahagia), apersepsi kisah keteladanan Rasulullah SAW.' },
        { tahap: 'Kegiatan Inti Berdiferensiasi (75 Menit)', deskripsi: 'Diferensiasi Proses: Siswa dibagi dalam kelompok minat (Visual: menganalisis poster cinta kasih, Auditori: mendengarkan kisah teladan, Kinestetik: bermain peran simulasi empati teman sakit).' },
        { tahap: 'Penutup & Refleksi Cinta (15 Menit)', deskripsi: 'Siswa menuliskan satu "Kartu Kebaikan & Terima Kasih" untuk temannya, kesimpulan bersama, dan doa penutup.' },
      ],
      asesmen: 'Asesmen Formatif: Lembar Observasi Sikap Welas Asih dan Jurnal Refleksi Diri.',
    };
  } else if (type === 'IKRAR_MADRASAH_CINTA') {
    title = `Piagam Deklarasi Komitmen Madrasah Ramah Anak & Berbasis Cinta`;
    contentData = {
      poinDeklarasi: [
        'Mewujudkan madrasah yang aman, nyaman, bersih, sehat, inklusif, dan ramah bagi seluruh peserta didik.',
        'Mengharamkan segala bentuk kekerasan fisik, verbal, perundungan (bullying), diskriminasi, dan intoleransi.',
        'Mendidik dengan hati nurani, penuh kasih sayang (rahmah), dan keteladanan akhlak terpuji (uswah hasanah).',
        'Menghormati setiap keunikan, potensi fitrah, dan bakat peserta didik tanpa membeda-bedakan latar belakang.',
        'Membangun ekosistem belajar yang menyenangkan, kreatif, dan berwawasan lingkungan lestari.',
      ],
      tanggalDeklarasi: formattedDate,
      saksiPihak: [
        { peran: 'Kepala Madrasah', nama: profile.namaKepala },
        { peran: 'Ketua Komite', nama: profile.namaKetuaKomite },
        { peran: 'Perwakilan Guru', nama: teachers[1]?.nama || 'Wakil Guru' },
        { peran: 'Perwakilan Siswa (Ketua OSIM)', nama: 'M. Rayyan Al-Farizi' },
        { peran: 'Pengawas Madrasah', nama: profile.namaPengawas },
      ],
    };
  }

  // Signatures configuration
  const signatures: any[] = [];
  if (type === 'KOM' || type === 'IKRAR_MADRASAH_CINTA') {
    signatures.push(
      {
        id: `SIG-KEPALA-${Date.now()}`,
        role: 'KEPALA_MADRASAH',
        title: 'Kepala Madrasah',
        name: profile.namaKepala,
        nip: profile.nipKepala,
        isSigned: false,
      },
      {
        id: `SIG-KOMITE-${Date.now()}`,
        role: 'KOMITE',
        title: 'Ketua Komite Madrasah',
        name: profile.namaKetuaKomite,
        isSigned: false,
      },
      {
        id: `SIG-PENGAWAS-${Date.now()}`,
        role: 'PENGAWAS',
        title: 'Pengawas Madrasah Kemenag',
        name: profile.namaPengawas,
        nip: profile.nipPengawas,
        isSigned: false,
      }
    );
  } else {
    signatures.push({
      id: `SIG-KEPALA-${Date.now()}`,
      role: 'KEPALA_MADRASAH',
      title: 'Kepala Madrasah',
      name: profile.namaKepala,
      nip: profile.nipKepala,
      isSigned: false,
    });
  }

  return {
    type,
    title,
    tanggalSurat: formattedDate,
    tahunAjaran: profile.tahunAjaran,
    semester: profile.semester,
    status: 'DRAFT',
    targetPersonId: targetId,
    targetPersonName,
    contentData,
    signatures,
    creatorName: 'Admin / Pengembang Kurikulum',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
  };
};

/**
 * Synchronizes a single document with the latest profile, teacher, and student master data
 */
export const syncDocumentWithDatabase = (
  doc: OfficialDocument,
  profile: MadrasahProfile,
  teachers: Teacher[],
  students: Student[]
): OfficialDocument => {
  const updatedContent = { ...doc.contentData };

  // Sync profile metadata
  const updatedDoc: OfficialDocument = {
    ...doc,
    tahunAjaran: profile.tahunAjaran,
    semester: profile.semester,
    updatedAt: new Date().toISOString(),
  };

  // Sync Signatures if signatory person's name or NIP changed in Profile
  if (updatedDoc.signatures && updatedDoc.signatures.length > 0) {
    updatedDoc.signatures = updatedDoc.signatures.map((sig) => {
      if (sig.role === 'KEPALA_MADRASAH') {
        return { ...sig, name: profile.namaKepala, nip: profile.nipKepala };
      }
      if (sig.role === 'KOMITE') {
        return { ...sig, name: profile.namaKetuaKomite };
      }
      if (sig.role === 'PENGAWAS') {
        return { ...sig, name: profile.namaPengawas, nip: profile.nipPengawas };
      }
      return sig;
    });
  }

  // Type specific synchronization
  if (doc.type === 'KOM') {
    if (updatedContent.bab1) {
      updatedContent.bab1.karakteristikPesertaDidik = `Peserta didik pada ${profile.namaMadrasah} berjumlah ${students.length} orang yang terbagi dalam berbagai rombongan belajar. Peserta didik memiliki latar belakang potensi kecerdasan majemuk (multiple intelligences), minat tahfidz dan keagamaan yang kuat, serta keberagaman gaya belajar (visual, auditori, dan kinestetik). Madrasah menerapkan prinsip pendidikan inklusif, ramah anak, anti-kekerasan, dan non-diskriminasi sehingga seluruh peserta didik mendapatkan ruang tumbuh kembang yang aman, nyaman, dan penuh kasih sayang.`;
      updatedContent.bab1.karakteristikGTK = `Pendidik dan Tenaga Kependidikan (GTK) ${profile.namaMadrasah} berjumlah ${teachers.length} orang dengan kualifikasi akademik sarjana (S1) dan magister (S2). Sebagian besar pendidik telah memiliki Sertifikat Pendidik Profesional, menguasai kompetensi pedagogik modern, literasi digital, serta memiliki komitmen kuat dalam menerapkan pendekatan pedagogi welas asih (pedagogy of love) dan pembelajaran berdiferensiasi.`;
      if (updatedContent.bab1.identitasMadrasah) {
        updatedContent.bab1.identitasMadrasah.nama = profile.namaMadrasah;
        updatedContent.bab1.identitasMadrasah.nsm = profile.nsm;
        updatedContent.bab1.identitasMadrasah.npsn = profile.npsn;
        updatedContent.bab1.identitasMadrasah.alamat = profile.alamat;
      }
    }
    if (updatedContent.bab1_karakteristik) {
      updatedContent.bab1_karakteristik.karakteristikSiswa = `Peserta didik ${profile.namaMadrasah} berjumlah ${students.length} siswa dengan latar belakang potensi kecerdasan majemuk (multiple intelligences), minat tahfidz yang kuat, serta gaya belajar yang bervariasi (visual, auditori, dan kinestetik). Madrasah menerapkan prinsip non-diskriminasi, menjunjung kesetaraan gender, serta memfasilitasi pendidikan inklusif yang ramah bagi semua anak.`;
      updatedContent.bab1_karakteristik.karakteristikGTK = `Didukung oleh ${teachers.length} orang Pendidik dan Tenaga Kependidikan berkualifikasi akademik S1 dan S2, tersertifikasi pendidik, serta berkomitmen tinggi dalam mengimplementasikan pembelajaran berdiferensiasi dan mendidik dengan pendekatan kasih sayang (pedagogi welas asih).`;
    }
  } else if (doc.type === 'SK_BEBAN_MENGAJAR') {
    updatedContent.guruList = teachers.map((t) => ({
      id: t.id,
      nama: t.nama,
      nip: t.nip || '-',
      pangkatGol: t.pangkatGol,
      mapel: t.mapelUtama,
      tugasTambahan: t.tugasTambahan || '-',
      jumlahJam: t.jumlahJam,
      waliKelas: t.waliKelasDi || '-',
    }));
  } else if (doc.type === 'SK_WALI_KELAS') {
    const activeWalis = teachers
      .filter((t) => t.waliKelasDi)
      .map((t) => ({
        rombel: t.waliKelasDi || 'Kelas',
        namaWali: t.nama,
        nip: t.nip || '-',
      }));
    if (activeWalis.length > 0) {
      updatedContent.waliKelasList = activeWalis;
    }
  } else if (doc.type === 'SK_TIM_TPK') {
    updatedContent.susunanTim = [
      { jabatanTim: 'Penanggung Jawab', nama: profile.namaKepala, jabatanKedinasan: 'Kepala Madrasah' },
      { jabatanTim: 'Ketua Tim', nama: teachers[1]?.nama || 'Waka Kurikulum', jabatanKedinasan: 'Waka Kurikulum' },
      { jabatanTim: 'Sekretaris', nama: teachers[2]?.nama || 'Guru Senior', jabatanKedinasan: 'Guru PAI' },
      { jabatanTim: 'Anggota / Koordinator Fase A-B', nama: teachers[3]?.nama || 'Guru Kelas', jabatanKedinasan: 'Guru Kelas' },
      { jabatanTim: 'Anggota / Koordinator Fase C', nama: teachers[4]?.nama || 'Guru Kelas', jabatanKedinasan: 'Guru Kelas' },
      { jabatanTim: 'Narasumber / Konsultan', nama: profile.namaPengawas, jabatanKedinasan: 'Pengawas Madrasah Kemenag' },
    ];
  } else if (doc.type === 'SURAT_AKTIF_SISWA' || doc.type === 'SURAT_MUTASI_SISWA' || doc.type === 'SURAT_DISPENSASI_SISWA' || doc.type === 'SURAT_REKOMENDASI') {
    if (doc.targetPersonId) {
      const liveStudent = students.find((s) => s.id === doc.targetPersonId);
      if (liveStudent) {
        updatedContent.studentData = liveStudent;
        updatedDoc.targetPersonName = liveStudent.nama;
      }
    }
  } else if (doc.type === 'SURAT_TUGAS_GURU') {
    if (doc.targetPersonId) {
      const liveTeacher = teachers.find((t) => t.id === doc.targetPersonId);
      if (liveTeacher) {
        updatedContent.teacherData = liveTeacher;
        updatedDoc.targetPersonName = liveTeacher.nama;
      }
    }
  }

  return {
    ...updatedDoc,
    contentData: updatedContent,
  };
};

/**
 * Synchronizes an array of documents against the master database
 */
export const syncAllDocumentsWithDatabase = (
  documents: OfficialDocument[],
  profile: MadrasahProfile,
  teachers: Teacher[],
  students: Student[]
): OfficialDocument[] => {
  return documents.map((doc) => syncDocumentWithDatabase(doc, profile, teachers, students));
};
