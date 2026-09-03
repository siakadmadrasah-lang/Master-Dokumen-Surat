export interface KomCintaData {
  // Identitas Madrasah
  namaMadrasah: string;
  nsm: string;
  npsn: string;
  statusAkreditasi: string;
  tahunAjaran: string;
  alamat: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  telepon: string;
  email: string;
  website: string;
  rdmUrl: string;
  perpusUrl: string;
  elearningUrl: string;
  emisUrl: string;
  yayasan: string;
  alamatYayasan: string;
  teleponYayasan: string;
  aktaYayasan: string;
  luasTanah: string;
  luasBangunan: string;
  statusTanah: string;
  statusBangunan: string;

  // Surat Pengantar & Rekomendasi
  nomorSuratPermohonan: string;
  tanggalPermohonan: string;
  namaKasiPenma: string;
  nipKasiPenma: string;
  namaPengawas: string;
  nipPengawas: string;
  tanggalRekomendasi: string;

  // Lembar Pengesahan
  tanggalPengesahan: string;
  namaKepala: string;
  nipKepala: string;
  namaKetuaKomite: string;
  namaBidangKurikulum: string;
  nipBidangKurikulum: string;

  // Visi, Misi, Tujuan
  visi: string;
  motto: string;
  indikatorVisi: string[];
  misi: string[];
  tujuan: string[];

  // Karakteristik & Sarpras
  sarpras: {
    luasLahan: string;
    luasBangunan: string;
    luasHalaman: string;
    luasLapangan: string;
    ruangKelas: number;
    ruangKepala: number;
    ruangGuru: number;
    ruangPerpus: number;
    ruangUKS: number;
    toilet: number;
    ruangLab: number;
    ruangGudang: number;
    ruangMultimedia: number;
    ruangPelayanan: number;
    masjid: number;
    listrik: string;
    air: string;
    teleponProvider: string;
    internet: string;
  };

  // Analisis SOAR
  soar: {
    strengths: string[];
    opportunities: string[];
    aspirations: string[];
    results: string[];
  };

  // Program Unggulan
  tahfidzProgram: {
    kelas: string;
    materi: string[];
    waktu: string;
  }[];
  itProgram: {
    kelas: string;
    materi: string[];
    waktu: string;
  }[];
  asramaProgram: {
    kelas: string;
    materi: string[];
    waktu: string;
  }[];
  adiwiyataProgram: {
    kelas: string;
    materi: string[];
    waktu: string;
  }[];

  // Pendidik & Tenaga Kependidikan
  teachersList: {
    no: number;
    nama: string;
    nuptk: string;
    pendidikan: string;
    jurusan: string;
    status: 'PNS' | 'GTY/GTT' | 'Tendik';
    sertifikasi: boolean;
  }[];

  // Statistik Siswa & Ortu
  siswa3Tahun: {
    tahun: string;
    kelas1: number;
    kelas2: number;
    kelas3: number;
    kelas4: number;
    kelas5: number;
    kelas6: number;
    total: number;
  }[];
  siswaRombel2026: {
    kelas: string;
    putra: number;
    putri: number;
    total: number;
  }[];
  rekapPendidikanOrtu: {
    tingkat: string;
    jumlah: number;
  }[];
  rekapPekerjaanOrtu: {
    pekerjaan: string;
    jumlah: number;
  }[];
  prestasiSiswa: {
    nama: string;
    tanggal: string;
    lomba: string;
    tingkat: string;
    juara: string;
  }[];

  // Kemitraan
  kemitraanPemerintah: string[];
  kemitraanNonPemerintah: string[];

  // Regulasi / Landasan Hukum
  landasanHukum: string[];

  // Target 8 Standar
  targetStandar: {
    standar: string;
    poin: string[];
  }[];

  // Nilai Panca Cinta & Deep Learning
  pancaCinta: {
    pilar: string;
    deskripsi: string;
  }[];

  // 8 Profil Lulusan
  delapanProfilLulusan: {
    dimensi: string;
    penjelasan: string;
  }[];

  // Struktur Kurikulum Intrakurikuler KMA 1503/2025
  strukturMapel: {
    no: string;
    mapel: string;
    k1: string;
    k2: string;
    k3: string;
    k4: string;
    k5: string;
    k6: string;
  }[];

  // Ekstrakurikuler
  ekstrakurikulerList: {
    bidang: string;
    items: {
      nama: string;
      indikator: string;
      sasaran: string;
    }[];
  }[];

  // Pembiasaan Budaya Madrasah
  pembiasaan: {
    harian: string[];
    mingguan: string[];
    tahunan: string[];
  };

  // Kalender & Waktu Efektif
  pekanEfektifSem1: { bulan: string; minggu: number; efektif: number; nonEfektif: number; ket?: string }[];
  pekanEfektifSem2: { bulan: string; minggu: number; efektif: number; nonEfektif: number; ket?: string }[];
  hariEfektifSem1: { bulan: string; minggu: number; hariEfektif: number; hariNonEfektif: number }[];
  hariEfektifSem2: { bulan: string; minggu: number; hariEfektif: number; hariNonEfektif: number }[];

  // Asesmen & Media
  mediaWajib: string[];
  mediaPilihan: string[];

  // Kriteria Kenaikan & Kelulusan
  kriteriaKenaikan: string[];
  kriteriaKelulusan: string[];

  // Pengembangan Profesional
  pengembanganProfesi: {
    bentuk: string;
    keterangan: string;
    kegiatan: { jenis: string; waktu: string }[];
  }[];

  // 15 Lampiran
  lampiranList: string[];
}

export const defaultKomCintaData: KomCintaData = {
  namaMadrasah: "MI MA'ARIF NU 2 SANGGREMAN",
  nsm: '111233020015',
  npsn: '60710459',
  statusAkreditasi: 'B',
  tahunAjaran: '2026/2027',
  alamat: 'Jl. Masjid As-Salafiyah Babakan Desa Sanggreman',
  desa: 'Sanggreman',
  kecamatan: 'Rawalo',
  kabupaten: 'Banyumas',
  provinsi: 'Jawa Tengah',
  telepon: '081226738883',
  email: 'admin@mimanu2sanggreman.sch.id',
  website: 'https://mimanu2sanggreman.sch.id',
  rdmUrl: 'https://rdm.mimanu2sanggreman.sch.id',
  perpusUrl: 'https://perpus.masbagus.id',
  elearningUrl: 'https://appmadrasah.kemenag.go.id/elearning/mi2sanggreman',
  emisUrl: 'http://emis.kemenag.go.id',
  yayasan: "LP Ma'arif NU",
  alamatYayasan: 'Karangklesem Banyumas',
  teleponYayasan: '0281',
  aktaYayasan: '04/2013',
  luasTanah: '858 m²',
  luasBangunan: '858 m²',
  statusTanah: 'Wakaf (858 m²)',
  statusBangunan: 'Pribadi / Milik Sendiri',

  nomorSuratPermohonan: '097/LPM/33.17/MI-77/VI/2026',
  tanggalPermohonan: '15 Juli 2026',
  namaKasiPenma: 'Dr. H. M. Wahyu Fauzi Aziz, SH., M.Si',
  nipKasiPenma: '19771110 200901 1 013',
  namaPengawas: 'H. Amin Purnomo, S.Ag.',
  nipPengawas: '197112031998031001',
  tanggalRekomendasi: '15 Juli 2026',

  tanggalPengesahan: '25 Juli 2026',
  namaKepala: 'Siti Rochimah, S.Pd.I',
  nipKepala: '-',
  namaKetuaKomite: 'Sohibul Ikhsan, S.Ag.',
  namaBidangKurikulum: 'Jaenal Maskun, S.Pd.I',
  nipBidangKurikulum: '197808152009011009',

  visi: 'Mencetak Generasi Yang Bertaqwa, Mandiri, Berprestasi, Ramah Lingkungan, Dan Hebat Teknologi',
  motto: 'Tampil Hebat',
  indikatorVisi: [
    "a. Terwujudnya generasi bangsa yang berakidah Ahlisunnah Wal Jama'ah",
    'b. Terwujudnya generasi bangsa yang berakhlakul karimah',
    'c. Terwujudnya generasi bangsa yang mandiri dalam mengatasi masalah hidup dan kehidupan',
    'd. Terwujudnya generasi bangsa yang berwawasan luas, unggul dalam bidang akademik dan non akademik',
    'e. Terwujudnya generasi bangsa yang memiliki kepedulian dan melestarikan lingkungan',
    'f. Terwujudnya generasi bangsa yang mandiri di bidang Teknologi, Informasi dan komunikasi',
    'g. Terwujudnya generasi bangsa yang berguna bagi sesama',
  ],
  misi: [
    "Menanamkan keimanan dan ketaqwaan melalui pengamalan ajaran agama Islam dan mewujudkan pembelajaran dan pembiasaan dalam mempelajari Al-qur'an dan menjalankan ajaran agama Islam.",
    'Mewujudkan pembentukan karakter Islami yang mampu mengaktualisasikan diri dalam masyarakat.',
    'Membina kemandirian peserta didik melalui kegiatan pembiasaan, kewirausahaan, dan pengembangan diri yang terencana dan berkesinambungan.',
    'Menyelenggarakan pendidikan yang berkualitas dalam pencapaian prestasi akademik dan non akademik.',
    'Mewujudkan kecintaan dan kepedulian sehat lingkungan madrasah.',
    'Mengenalkan dan mengaplikasikan Teknologi Informasi dan Komunikasi dalam kehidupan sehari-hari dengan bijaksana.',
    'Menyelenggarakan tata kelola madrasah yang efektif, efisien, transparan dan akuntabel.',
  ],
  tujuan: [
    'Mengembangkan budaya madrasah yang religius melalui kegiatan keagamaan.',
    'Mengoptimalkan proses pembelajaran dengan menggunakan pendekatan pembelajaran aktif (PAKEM, CTL, Deep Learning).',
    'Mengembangkan potensi akademik minat dan bakat siswa melalui layanan bimbingan dan konseling dan kegiatan ekstrakurikuler.',
    'Membiasakan perilaku Islami di lingkungan madrasah.',
    'Meningkatkan prestasi akademik siswa dengan nilai rata-rata 8,5.',
    'Meningkatkan prestasi akademik siswa di bidang seni dan olahraga lewat kejuaraan dan kompetisi.',
    'Membiasakan perilaku peduli dengan kebersihan lingkungan sekitarnya.',
    'Meningkatkan kemampuan dalam bidang Teknologi Informasi dan Komunikasi.',
  ],

  sarpras: {
    luasLahan: '632 m²',
    luasBangunan: '858 m²',
    luasHalaman: '7 m²',
    luasLapangan: '0 m² (hak pakai lapangan desa)',
    ruangKelas: 6,
    ruangKepala: 1,
    ruangGuru: 1,
    ruangPerpus: 1,
    ruangUKS: 1,
    toilet: 3,
    ruangLab: 1,
    ruangGudang: 2,
    ruangMultimedia: 1,
    ruangPelayanan: 1,
    masjid: 1,
    listrik: 'PLN 900 Watt',
    air: 'PDAM',
    teleponProvider: 'Telkomsel',
    internet: 'Personal / Fiber Optic',
  },

  soar: {
    strengths: [
      'Keberagaman SDM: Memiliki tenaga pendidik (PTK) beragam dengan latar belakang umum dan pesantren, termasuk S2, Hafidz, dan ahli kitab kuning.',
      'Jumlah Siswa yang Besar: Memiliki siswa dari berbagai penjuru desa dan luar desa yang mencerminkan daya tarik dan reputasi positif madrasah.',
      'Fasilitas yang Representatif: Memiliki jumlah ruang kelas dan ruang penunjang yang representatif, mendukung KBM nyaman dan efektif.',
    ],
    opportunities: [
      'Program Pengembangan SDM: Mengadakan pelatihan dan workshop keprofesian berkelanjutan bagi pendidik.',
      'Kolaborasi dengan Lembaga Lain: Kerjasama dengan Puskesmas, Polsek, komunitas lokal, dan pesantren untuk penguatan sosial budaya.',
      'Pemberdayaan Siswa: Pengembangan ekstrakurikuler seni, budaya, keagamaan, dan olahraga.',
      'Pemanfaatan Teknologi: Memanfaatkan platform digital (RDM, E-Learning, Canva, AI) untuk efektivitas pembelajaran.',
    ],
    aspirations: [
      'Menjadi Lembaga Pendidikan Terdepan yang unggul dalam bidang akademik dan keagamaan di tingkat lokal dan nasional.',
      'Penguatan Identitas Budaya dan Agama melalui integrasi nilai Aswaja An-Nahdliyyah dalam kehidupan sehari-hari.',
      'Pengembangan Inovasi Pendidikan berbasis Deep Learning dan Kurikulum Berbasis Cinta (KBC).',
      'Peningkatan Keterlibatan Komunitas dalam menciptakan ekosistem belajar yang ramah anak dan inklusif.',
    ],
    results: [
      'Prestasi Akademik dan Non-Akademik Meningkat secara konsisten.',
      'Kualitas Pendidikan yang Unggul dengan proses pembelajaran yang bermakna dan memerdekakan peserta didik.',
      'Penguatan Karakter Siswa yang berakhlakul karimah, toleran, dan berwawasan luas.',
      'Citra Positif Madrasah sebagai pilihan utama masyarakat di Banyumas.',
    ],
  },

  tahfidzProgram: [
    {
      kelas: 'Kelas I',
      materi: [
        'Surat Al-Fatihah, An-Nas, Al-Falaq, Al-Ikhlas, Al-Lahab, An-Nasr',
        "Do'a harian: sebelum/sesudah makan, sebelum tidur, bangun tidur",
        'Surat Al-Kafirun, Al-Kautsar, Al-Maun, Al-Quraisy',
        "Do'a harian: masuk/keluar kamar mandi, masuk/keluar masjid",
      ],
      waktu: 'Setiap hari jam 07.00 - 07.30 WIB',
    },
    {
      kelas: 'Kelas II',
      materi: [
        "Surat Al-Fiil, Al-Humazah, Al-'Asr, At-Takatsur",
        "Doa harian: naik kendaraan, keluar rumah, niat wudhu, doa setelah wudhu",
        "Surat Al-Qari'ah, Al-'Adiyat, Az-Zalzalah",
        "Doa harian: bercermin, ketika turun hujan",
      ],
      waktu: 'Setiap hari jam 07.00 - 07.30 WIB',
    },
    {
      kelas: 'Kelas III',
      materi: [
        "Surat Al-Bayyinah, Al-Qadr, Al-'Alaq",
        'Doa setelah adzan, niat sholat Subuh dan Dzuhur',
        'Surat At-Tin, Al-Insyirah, Ad-Dhuha, Al-Lail',
        'Niat sholat Ashar, Maghrib, Isya, dan doa iftitah',
      ],
      waktu: 'Setiap hari jam 06.30 - 07.30 WIB',
    },
    {
      kelas: 'Kelas IV',
      materi: [
        'Surat Asy-Syams, Al-Balad, Al-Fajr',
        "Doa ruku', i'tidal, sujud",
        "Surat Al-Ghasyiyah, Al-A'la, At-Thariq",
        'Doa duduk di antara dua sujud dan doa tahiyyat',
      ],
      waktu: 'Setiap hari jam 06.30 - 07.30 WIB',
    },
    {
      kelas: 'Kelas V',
      materi: [
        'Surat Al-Buruj, Al-Insyiqaq, Al-Muthaffifin, Doa Qunut',
        "Surat Al-Infithar, At-Takwir, 'Abasa, Ayat Kursi",
      ],
      waktu: 'Setiap hari jam 06.30 - 07.30 WIB',
    },
    {
      kelas: 'Kelas VI',
      materi: [
        "Surat An-Nazi'at, An-Naba', Niat dan doa sesudah sholat Dhuha",
        'Tahsin Juz 30 & Surat Al-Baqarah ayat 284-286',
      ],
      waktu: 'Setiap hari jam 06.30 - 07.30 WIB',
    },
  ],

  itProgram: [
    { kelas: 'Kelas I', materi: ['Mengenal TIK', 'Menjalankan Komputer', 'Mengenal program Paint'], waktu: '1 JP / Minggu' },
    { kelas: 'Kelas II', materi: ['Menggambar dengan Paint', 'Membuat publikasi sederhana'], waktu: '1 JP / Minggu' },
    { kelas: 'Kelas III', materi: ['Mengoperasikan Ms Word', 'Mengoperasikan Ms PowerPoint'], waktu: '1 JP / Minggu' },
    { kelas: 'Kelas IV', materi: ['Mengoperasikan Ms Excel', 'Ms Word tingkat lanjut', 'Membuat project Office', 'Desain Canva'], waktu: '1 JP / Minggu' },
    { kelas: 'Kelas V', materi: ['Mengenal CorelDraw', 'Mengenal Adobe PageMaker', 'Membuat project penerbitan'], waktu: '1 JP / Minggu' },
    { kelas: 'Kelas VI', materi: ['Menguasai Ms Excel', 'Menguasai Ms Word', 'Menguasai Ms PowerPoint'], waktu: '1 JP / Minggu' },
  ],

  asramaProgram: [
    { kelas: 'Kelas VI', materi: ["Pembiasaan 'Ubudhiyah", "Tahfidz dan Tahsin Al-Qur'an", 'Tadris Bahasa Arab', 'Kajian Kitab Salaf'], waktu: 'Pagi & Sore' },
  ],

  adiwiyataProgram: [
    {
      kelas: 'Kelas I - VI',
      materi: [
        'Menjaga kebersihan, fungsi sanitasi, dan drainase lingkungan',
        'Penanaman dan pemeliharaan pohon/tanaman peneduh',
        'Penghematan dan konservasi energi listrik',
        'Pengelolaan sampah melalui 3R (Reduce, Reuse, Recycle)',
        'Penghematan dan pemanfaatan air secara bijak',
        'Inovasi terkait Perilaku Ramah Lingkungan Hidup (PRLH)',
      ],
      waktu: 'Kegiatan Rutin & Pagi',
    },
  ],

  teachersList: [
    { no: 1, nama: 'JAENAL MASKUN, S.Pd.I', nuptk: '6147756658200003', pendidikan: 'S1', jurusan: 'PAI', status: 'PNS', sertifikasi: true },
    { no: 2, nama: 'YULI SETIYANI, S.Pd.I, M.Pd', nuptk: '3044764665300003', pendidikan: 'S2', jurusan: 'PGMI', status: 'GTY/GTT', sertifikasi: true },
    { no: 3, nama: 'FATKHUL MUBAROK, S.Pd', nuptk: '0000000054337646', pendidikan: 'S1', jurusan: 'PAI', status: 'GTY/GTT', sertifikasi: true },
    { no: 4, nama: 'SITI ROCHIMAH, S.Pd.I', nuptk: '5546748649300002', pendidikan: 'S1', jurusan: 'PAI', status: 'GTY/GTT', sertifikasi: true },
    { no: 5, nama: 'ROKHIMAH, S.Pd.I', nuptk: '8442744647300013', pendidikan: 'S1', jurusan: 'PAI', status: 'PNS', sertifikasi: true },
    { no: 6, nama: 'SITI SAPARIYAH, S.Pd.I', nuptk: '9040750654210003', pendidikan: 'S1', jurusan: 'PAI', status: 'GTY/GTT', sertifikasi: true },
    { no: 7, nama: 'INDAH ZUBAIDAH, S.Pd.I, M.Pd', nuptk: '7847755657300002', pendidikan: 'S2', jurusan: 'PGMI', status: 'PNS', sertifikasi: true },
    { no: 8, nama: 'SANIYAH, S.Pd.I', nuptk: '2836749652300002', pendidikan: 'S1', jurusan: 'PAI', status: 'PNS', sertifikasi: true },
    { no: 9, nama: 'NURUL MUSTOFA', nuptk: '-', pendidikan: 'SMA', jurusan: 'Tendik / TU', status: 'Tendik', sertifikasi: false },
  ],

  siswa3Tahun: [
    { tahun: '2024/2025', kelas1: 9, kelas2: 11, kelas3: 11, kelas4: 10, kelas5: 5, kelas6: 9, total: 55 },
    { tahun: '2025/2026', kelas1: 11, kelas2: 10, kelas3: 11, kelas4: 10, kelas5: 11, kelas6: 5, total: 58 },
    { tahun: '2026/2027', kelas1: 8, kelas2: 11, kelas3: 10, kelas4: 11, kelas5: 10, kelas6: 11, total: 61 },
  ],

  siswaRombel2026: [
    { kelas: 'Kelas I', putra: 3, putri: 4, total: 7 },
    { kelas: 'Kelas II', putra: 3, putri: 8, total: 11 },
    { kelas: 'Kelas III', putra: 5, putri: 5, total: 10 },
    { kelas: 'Kelas IV', putra: 3, putri: 8, total: 11 },
    { kelas: 'Kelas V', putra: 5, putri: 5, total: 10 },
    { kelas: 'Kelas VI', putra: 8, putri: 3, total: 11 },
  ],

  rekapPendidikanOrtu: [
    { tingkat: 'SD / MI Sederajat', jumlah: 21 },
    { tingkat: 'SMP / MTs Sederajat', jumlah: 20 },
    { tingkat: 'SMA / SMK / MA Sederajat', jumlah: 17 },
    { tingkat: 'Sarjana (S.1)', jumlah: 3 },
    { tingkat: 'Magister (S.2)', jumlah: 0 },
    { tingkat: 'Doktor (S.3)', jumlah: 0 },
  ],

  rekapPekerjaanOrtu: [
    { pekerjaan: 'PNS / ASN', jumlah: 0 },
    { pekerjaan: 'Pegawai Swasta', jumlah: 0 },
    { pekerjaan: 'Pedagang / Wiraswasta', jumlah: 0 },
    { pekerjaan: 'Petani', jumlah: 45 },
    { pekerjaan: 'Nelayan / Sopir', jumlah: 0 },
    { pekerjaan: 'Buruh / Lainnya', jumlah: 16 },
  ],

  prestasiSiswa: [
    { nama: 'Aqila', tanggal: 'PORSENI 2026', lomba: "Tahfidzul Qur'an", tingkat: 'Kecamatan', juara: 'Juara 2' },
  ],

  kemitraanPemerintah: [
    'Puskesmas Kecamatan Rawalo: Pendampingan Program UKS, Pemeriksaan Berkala, dan Dokter Kecil.',
    'Polsek Rawalo: Pendampingan Program Sadar Lalu Lintas, Pembinaan Karakter, dan Pencegahan Perundungan (Anti-Bullying).',
  ],

  kemitraanNonPemerintah: [
    'Masjid As-Salafiyah Sanggreman: Tempat Praktik Ibadah Sholat Berjamaah dan Pembinaan Rohani.',
    'Pemerintah Desa Sanggreman: Fasilitasi Sarana Olahraga Bulutangkis dan Kegiatan Bersama Warga.',
    'Madrasah Diniyah As-Salafiyah: Kolaborasi Belajar Baca Tulis Al-Qur’an (BTQ) dan Kitab Kuning.',
  ],

  landasanHukum: [
    'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional.',
    'Undang-Undang Nomor 14 Tahun 2005 tentang Guru dan Dosen.',
    'Peraturan Menteri Pendidikan dan Kebudayaan Nomor 62 Tahun 2014 tentang Kegiatan Ekstrakurikuler.',
    'Peraturan Menteri Pendidikan dan Kebudayaan Nomor 63 Tahun 2014 tentang Kepramukaan.',
    'Peraturan Menteri Pendidikan dan Kebudayaan Nomor 79 Tahun 2014 tentang Muatan Lokal.',
    'Peraturan Menteri Agama No. 2 tahun 2020 Tentang Penyelenggaraan Penguatan Pendidikan Karakter.',
    'Peraturan Pemerintah Nomor 4 tahun 2022 Tentang Standar Nasional Pendidikan.',
    'Permendikbudristek Nomor 16 Tahun 2022 Tentang Standar Proses pada PAUD, Dikdas, dan Dikmen.',
    'Permendikbudristek Nomor 21 Tahun 2022 Tentang Standar Penilaian Pendidikan.',
    'Permendikbud Nomor 10 Tahun 2025 Tentang Standar Kompetensi Lulusan.',
    'Permendikdasmen Nomor 11 Tahun 2025 Tentang Pemenuhan Beban Kerja Guru.',
    'Permendikdasmen Nomor 12 Tahun 2025 Tentang Standar Isi pada PAUD, Dikdas, dan Dikmen.',
    'Permendikdasmen No. 13 Tahun 2025 Tentang Kurikulum pada Pendidikan Anak Usia Dini, Dasar, dan Menengah.',
    'Keputusan Mendikdasmen RI Nomor 95/M/2025 Tentang Pedoman Penyelenggaraan Tes Kemampuan Akademik (TKA).',
    'Keputusan Kepala BSKAP Kemendikdasmen Nomor 046/H/KR/2025 Tentang Capaian Pembelajaran (CP).',
    'Permendikbudristek Nomor 31 Tahun 2024 Tentang Kompetensi dan Tema P5.',
    'KMA Nomor 450 Tahun 2024 Tentang Pedoman Implementasi Kurikulum Pada Madrasah.',
    'KMA Nomor 1503 Tahun 2025 Tentang Penguatan Kurikulum Nasional, Pembelajaran Mendalam (Deep Learning), dan Kurikulum Berbasis Cinta (KBC).',
    'Keputusan Dirjen Pendis Nomor 9941 Tahun 2025 Tentang Capaian Pembelajaran PAI dan Bahasa Arab.',
    'Keputusan Dirjen Pendis Nomor 3302 Tahun 2024 Tentang Capaian Pembelajaran PAI dan Bahasa Arab Kurikulum Merdeka.',
    'Keputusan Direktur Jenderal Pendidikan Islam Nomor B-202/Dt.I.I/PP.00/06/2025 tentang Pedoman Kalender Pendidikan Madrasah Tahun Pelajaran 2026/2027.',
    'Perda Provinsi Jawa Tengah Nomor 9 Tahun 2012 tentang Bahasa, Sastra dan Aksara Jawa.',
    'Keputusan Kadisdikbud Provinsi Jawa Tengah Nomor 423.5/04678 Tahun 2022 Tentang Pedoman Kurikulum Mulok Bahasa Jawa.',
    'SK PW LP Ma’arif NU Jawa Tengah Nomor 014/PW.11/LPMNU/SK/I/2020 Tentang Kurikulum Mata Pelajaran Ke-NU-an.',
    'SK Bupati Banyumas Nomor 430/1111/2015 tentang Kurikulum Mulok Bahasa Jawa Banyumasan.',
    'Kalender Pendidikan LP Ma’arif NU PCNU Kab. Banyumas Tahun Ajaran 2026/2027.',
    'SK Kepala Madrasah Nomor 229/LPM/33.08/MI-32/SK/VII/2025 Tentang Tim Pengembang Madrasah.',
    'SK Kepala Madrasah Nomor 230/LPM/33.08/MI-32/SK/VII/2025 Tentang Tim Pengembang Kurikulum (TPKM).',
    'SK Kepala Madrasah Nomor 232/LPM/33.08/MI-32/SK/VII/2025 Tentang Penetapan Mulok Madrasah.',
    'SK Kepala Madrasah Nomor 233/LPM/33.08/MI-32/SK/VII/2025 Tentang Kalender Pendidikan di MI Ma’arif NU 2 Sanggreman.',
  ],

  targetStandar: [
    {
      standar: '1. Standar Isi',
      poin: [
        'Sosialisasi kurikulum merdeka sesuai regulasi Kemendikbudristek dan Kementerian Agama.',
        'Guru menguasai KMA 1503/2025, Kepdirjen Pendis 9941/2025 (CP PAI & B. Arab), dan Permendikbud 046/2025 (CP Mapel Umum).',
        'Pendidik mampu mengembangkan dan mengimplementasikan kurikulum madrasah secara mandiri dan adaptif.',
      ],
    },
    {
      standar: '2. Standar Proses',
      poin: [
        'Guru mampu merencanakan, menerapkan, mengevaluasi pembelajaran berdiferensiasi dan mendalam (Deep Learning: Mindful, Meaningful, Joyful).',
        'Pendidik mampu memanfaatkan TIK dan platform digital dalam KBM.',
        'Pembelajaran berbasis proyek dan pembiasaan cinta di lingkungan madrasah.',
      ],
    },
    {
      standar: '3. Standar Kelulusan',
      poin: [
        'Peserta didik memiliki keunggulan akademik, religiusitas, dan keterampilan abad 21.',
        'Lulusan mampu menerapkan ajaran Islam Ahlussunnah wal Jamaah An-Nahdliyyah serta Panca Cinta.',
      ],
    },
    {
      standar: '4. Standar Pendidik dan Tenaga Kependidikan',
      poin: [
        'Guru kompeten dalam integrasi TIK dan kurikulum berbasis cinta.',
        'Kualifikasi akademik pendidik 100% S1/S2 dan memiliki sertifikat pendidik profesional.',
      ],
    },
    {
      standar: '5. Standar Sarana dan Prasarana',
      poin: [
        'Memiliki perlengkapan kesehatan standar, jaringan internet stabil, ruang laboratorium, dan perpustakaan digital.',
        'Menyediakan ruang ibadah (masjid) representatif dan area literasi madrasah.',
      ],
    },
    {
      standar: '6. Standar Pengelolaan',
      poin: [
        'Peningkatan SDM berkelanjutan dan transparansi tata kelola.',
        'Penguatan kemitraan inovatif dengan pemerintah daerah, kepolisian, dan masyarakat.',
      ],
    },
    {
      standar: '7. Standar Pembiayaan',
      poin: [
        'Pengadaan buku teks dan modul referensi sesuai regulasi 2025/2026.',
        'Alokasi anggaran tepat sasaran untuk sarpras dan pengembangan karakter siswa.',
      ],
    },
    {
      standar: '8. Standar Penilaian',
      poin: [
        'Mengacu pada prinsip asesmen: Berkeadilan, Objektif, dan Edukatif.',
        'Asesmen mencakup Asesmen Awal (Diagnostik), Formatif, Sumatif (SAS/SAT), Asesmen Madrasah (AM), dan TKA.',
      ],
    },
  ],

  pancaCinta: [
    { pilar: '1. Cinta Allah dan Rasul-Nya', deskripsi: 'Pondasi spiritual utama melalui sholat khusyuk, tahfidz, dzikir, dan keteladanan akhlak Nabi Muhammad SAW.' },
    { pilar: '2. Cinta Diri', deskripsi: 'Menjaga kesehatan fisik, pola hidup bersih, percaya diri, pantang menyerah, dan menghindarkan diri dari bahaya.' },
    { pilar: '3. Cinta Sesama', deskripsi: 'Membangun empati, toleransi, budaya 5S, tolong-menolong, anti-bullying, dan persaudaraan tanpa membedakan latar belakang.' },
    { pilar: '4. Cinta Ilmu', deskripsi: 'Semangat bernalar kritis, gemar membaca (literasi aktif), eksplorasi sains, teknologi TIK, dan kejujuran akademik.' },
    { pilar: '5. Cinta Lingkungan', deskripsi: 'Menjaga kebersihan madrasah (Adiwiyata), konservasi air/energi, 3R, dan kelestarian alam ciptaan Allah SWT.' },
  ],

  delapanProfilLulusan: [
    { dimensi: '1. Keimanan dan Ketakwaan kepada Tuhan YME', penjelasan: 'Memiliki keyakinan kokoh, mengamalkan syariat, berakhlak mulia, menjaga hubungan dengan Allah, sesama, dan alam semesta.' },
    { dimensi: '2. Kewargaan', penjelasan: 'Bangga akan identitas budaya bangsa, menghargai keberagaman, menjunjung persatuan, taat hukum, dan harmoni antarbangsa.' },
    { dimensi: '3. Penalaran Kritis', penjelasan: 'Memiliki rasa ingin tahu tinggi, berpikir logis-analitis, mampu memecahkan masalah dengan data dan literasi numerasi.' },
    { dimensi: '4. Kreativitas', penjelasan: 'Produktif berkarya, berinovasi, dan merumuskan solusi orisinal bagi permasalahan di sekitarnya.' },
    { dimensi: '5. Kolaborasi', penjelasan: 'Gemar berbagi, bergotong-royong, dan membangun sinergi positif dengan berbagai kalangan.' },
    { dimensi: '6. Kemandirian', penjelasan: 'Bertanggung jawab atas proses dan hasil belajarnya, berinisiatif, serta adaptif dalam pengembangan diri.' },
    { dimensi: '7. Kesehatan', penjelasan: 'Menjalankan pola hidup bersih dan sehat, menjaga kebugaran jasmani dan kesejahteraan mental.' },
    { dimensi: '8. Komunikasi', penjelasan: 'Terampil menyimak, membaca, berbicara, dan menulis secara santun, efektif, dan beretika dalam berbagai media.' },
  ],

  strukturMapel: [
    { no: '1.a', mapel: "Al-Qur'an Hadits", k1: '72 (2)', k2: '72 (2)', k3: '72 (2)', k4: '72 (2)', k5: '72 (2)', k6: '64 (2)' },
    { no: '1.b', mapel: 'Akidah Akhlak', k1: '72 (2)', k2: '72 (2)', k3: '72 (2)', k4: '72 (2)', k5: '72 (2)', k6: '64 (2)' },
    { no: '1.c', mapel: 'Fiqih', k1: '72 (2)', k2: '72 (2)', k3: '72 (2)', k4: '72 (2)', k5: '72 (2)', k6: '64 (2)' },
    { no: '1.d', mapel: 'Sejarah Kebudayaan Islam (SKI)', k1: '-', k2: '-', k3: '72 (2)', k4: '72 (2)', k5: '72 (2)', k6: '64 (2)' },
    { no: '2', mapel: 'Bahasa Arab', k1: '72 (2)', k2: '72 (2)', k3: '72 (2)', k4: '72 (2)', k5: '72 (2)', k6: '72 (2)' },
    { no: '3', mapel: 'Pendidikan Pancasila', k1: '144 (4)', k2: '144 (4)', k3: '144 (4)', k4: '144 (4)', k5: '144 (4)', k6: '128 (3)' },
    { no: '4', mapel: 'Bahasa Indonesia', k1: '216 (6)', k2: '252 (7)', k3: '216 (6)', k4: '216 (6)', k5: '216 (6)', k6: '192 (5)' },
    { no: '5', mapel: 'Matematika', k1: '144 (4)', k2: '180 (5)', k3: '180 (5)', k4: '180 (5)', k5: '180 (5)', k6: '160 (4)' },
    { no: '6', mapel: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', k1: '-', k2: '-', k3: '180 (5)', k4: '180 (5)', k5: '180 (5)', k6: '160 (4)' },
    { no: '7', mapel: 'Pendidikan Jasmani Olahraga dan Kesehatan (PJOK)', k1: '108 (3)', k2: '108 (3)', k3: '108 (3)', k4: '108 (3)', k5: '108 (3)', k6: '96 (3)' },
    { no: '8', mapel: 'Seni Rupa (Pilihan Seni)', k1: '108 (3)', k2: '108 (3)', k3: '108 (3)', k4: '108 (3)', k5: '108 (3)', k6: '96 (3)' },
    { no: '9', mapel: 'Muatan Lokal: Bahasa Inggris', k1: '72 (2)', k2: '72 (2)', k3: '72 (2)', k4: '36 (1)', k5: '36 (1)', k6: '36 (1)' },
    { no: '10', mapel: 'Muatan Lokal: Bahasa Jawa Banyumasan', k1: '72 (2)', k2: '72 (2)', k3: '72 (2)', k4: '72 (2)', k5: '72 (2)', k6: '64 (2)' },
    { no: '11', mapel: "Muatan Lokal: Baca Tulis Al-Qur'an (BTA)", k1: '36 (1)', k2: '36 (1)', k3: '36 (1)', k4: '-', k5: '-', k6: '-' },
    { no: '12', mapel: 'Muatan Lokal: Ke-NU-an / Aswaja', k1: '-', k2: '-', k3: '-', k4: '72 (2)', k5: '72 (2)', k6: '64 (2)' },
    { no: '13', mapel: 'Teknologi Informasi dan Komunikasi (TIK)', k1: '36 (1)', k2: '36 (1)', k3: '36 (1)', k4: '36 (1)', k5: '36 (1)', k6: '36 (1)' },
    { no: '14', mapel: 'Coding dan Kecerdasan Artifisial (AI/KA)', k1: '-', k2: '-', k3: '-', k4: '-', k5: '72 (2)', k6: '64 (2)' },
  ],

  ekstrakurikulerList: [
    {
      bidang: 'A. Ekstrakurikuler Wajib',
      items: [
        { nama: 'Gerakan Pramuka', indikator: 'Mempersiapkan sikap kepemimpinan, kemandirian, disiplin, tanggung jawab, dan nasionalisme.', sasaran: 'Kelas II - V' },
        { nama: 'Pencak Silat Pagar Nusa', indikator: 'Membentuk pribadi yang sehat, seimbang, berani membela kebenaran, dan mendekatkan diri kepada Allah SWT.', sasaran: 'Kelas II - V' },
      ],
    },
    {
      bidang: 'B. Bidang Olahraga (Pilihan)',
      items: [
        { nama: 'Badminton / Bulutangkis', indikator: 'Mengenal teknik dasar, terampil, dan siap berprestasi dalam kejuaraan.', sasaran: 'Kelas III - V' },
        { nama: 'Bola Voli', indikator: 'Terampil bermain tim dan menumbuhkan sportivitas.', sasaran: 'Kelas III - V' },
        { nama: 'Catur', indikator: 'Mengasah ketelitian, strategi berpikir kritis, dan konsentrasi.', sasaran: 'Kelas III - V' },
        { nama: 'Sepak Bola / Futsal', indikator: 'Melatih kebugaran fisik, kekompakan tim, dan fair play.', sasaran: 'Kelas III - V' },
        { nama: 'Tenis Meja', indikator: 'Melatih kelincahan dan koordinasi motorik cepat.', sasaran: 'Kelas III - V' },
        { nama: 'Sepak Takraw', indikator: 'Mengenal dan melestarikan olahraga tradisional.', sasaran: 'Kelas III - V' },
      ],
    },
    {
      bidang: 'C. Bidang Seni & Budaya Islami (Pilihan)',
      items: [
        { nama: 'Seni Musik Drumband', indikator: 'Terampil memainkan alat musik perkusi/melodis beregu secara harmonis.', sasaran: 'Kelas III - V' },
        { nama: 'MTQ (Musabaqah Tilawatil Quran)', indikator: 'Membaca Al-Qur’an dengan makharijul huruf dan lagu (nagham) yang indah.', sasaran: 'Kelas III - V' },
        { nama: 'Murottal Al-Qur’an', indikator: 'Fasih membaca dengan tajwid sempurna dan penghayatan makna.', sasaran: 'Kelas III - V' },
        { nama: 'Seni Hadroh / Rebana', indikator: 'Terampil memukul rebana dan melantunkan sholawat Nabi SAW.', sasaran: 'Kelas III - V' },
        { nama: 'Seni Kaligrafi Islam (Khath)', indikator: 'Menuliskan ayat Al-Qur’an dengan kaidah seni khath Naskhi/Tsuluts.', sasaran: 'Kelas III - V' },
        { nama: 'Seni Tari Saman / Kreasi Nusantara', indikator: 'Mengekspresikan seni gerak berirama penuh kekompakan.', sasaran: 'Kelas III - V' },
      ],
    },
    {
      bidang: 'D. Bidang Akademik & Bahasa (Pilihan)',
      items: [
        { nama: 'Klub Sains & Matematika (OSN/KSM)', indikator: 'Mempersiapkan siswa unggul dalam olimpiade sains dan eksplorasi eksperimen.', sasaran: 'Kelas III - V' },
        { nama: 'English Kids Club', indikator: 'Percaya diri berbicara bahasa Inggris dasar dalam percakapan sehari-hari.', sasaran: 'Kelas III - V' },
      ],
    },
  ],

  pembiasaan: {
    harian: [
      'Penyambutan peserta didik pagi hari di gerbang madrasah dengan senyum, sapa, salam.',
      "Do'a sebelum dan sesudah belajar bersama di kelas.",
      'Budaya 5S: Senyum, Sapa, Salam, Sopan, dan Santun.',
      'Sholat Dhuha bersama (Kelas 4-6) dan Sholat Dhuhur berjamaah.',
      'Membaca Asmaul Husna bersama di awal hari (Kelas 1-6).',
      "Pembiasaan do'a-do'a harian dan juz 'amma.",
    ],
    mingguan: [
      'Upacara Bendera setiap hari Senin pagi.',
      'Gerakan Infak / Shadaqah Jumat Berkah.',
      'Latihan Ekstrakurikuler Wajib Pramuka dan Pagar Nusa.',
      'Kajian Yasinan / Tahlilan bersama setiap Jumat pagi.',
      'Senam Kebugaran Jasmani bersama di halaman madrasah.',
    ],
    tahunan: [
      'Peringatan Hari Besar Islam (PHBI): Tahun Baru Hijriyah, Maulid Nabi SAW, Isra Mi’raj, Santunan Anak Yatim 10 Muharram.',
      'Peringatan Hari Besar Nasional (PHBN): Upacara HUT RI 17 Agustus, Hari Santri Nasional 22 Oktober, Hari Guru Nasional, Hardiknas, Hari Pahlawan.',
      'Harlah LP Ma’arif NU dan Wisuda Khotmil Qur’an Madrasah.',
    ],
  },

  pekanEfektifSem1: [
    { bulan: 'Juli 2026', minggu: 5, efektif: 3, nonEfektif: 2, ket: 'Matsara & PPDB' },
    { bulan: 'Agustus 2026', minggu: 4, efektif: 4, nonEfektif: 0 },
    { bulan: 'September 2026', minggu: 4, efektif: 4, nonEfektif: 0 },
    { bulan: 'Oktober 2026', minggu: 5, efektif: 5, nonEfektif: 0 },
    { bulan: 'November 2026', minggu: 4, efektif: 4, nonEfektif: 0 },
    { bulan: 'Desember 2026', minggu: 5, efektif: 3, nonEfektif: 2, ket: 'SAS & Pembagian Raport' },
  ],
  pekanEfektifSem2: [
    { bulan: 'Januari 2027', minggu: 5, efektif: 4, nonEfektif: 1, ket: 'Awal Masuk Sem 2' },
    { bulan: 'Februari 2027', minggu: 4, efektif: 4, nonEfektif: 0 },
    { bulan: 'Maret 2027', minggu: 5, efektif: 2, nonEfektif: 3, ket: 'Libur Awal Ramadhan' },
    { bulan: 'April 2027', minggu: 5, efektif: 5, nonEfektif: 0 },
    { bulan: 'Mei 2027', minggu: 4, efektif: 4, nonEfektif: 0 },
    { bulan: 'Juni 2027', minggu: 4, efektif: 3, nonEfektif: 1, ket: 'SAT & Kenaikan Kelas' },
  ],

  hariEfektifSem1: [
    { bulan: 'Juli 2026', minggu: 5, hariEfektif: 16, hariNonEfektif: 15 },
    { bulan: 'Agustus 2026', minggu: 4, hariEfektif: 26, hariNonEfektif: 5 },
    { bulan: 'September 2026', minggu: 4, hariEfektif: 25, hariNonEfektif: 5 },
    { bulan: 'Oktober 2026', minggu: 5, hariEfektif: 27, hariNonEfektif: 4 },
    { bulan: 'November 2026', minggu: 4, hariEfektif: 25, hariNonEfektif: 5 },
    { bulan: 'Desember 2026', minggu: 5, hariEfektif: 17, hariNonEfektif: 14 },
  ],
  hariEfektifSem2: [
    { bulan: 'Januari 2027', minggu: 5, hariEfektif: 23, hariNonEfektif: 8 },
    { bulan: 'Februari 2027', minggu: 4, hariEfektif: 23, hariNonEfektif: 5 },
    { bulan: 'Maret 2027', minggu: 5, hariEfektif: 14, hariNonEfektif: 17 },
    { bulan: 'April 2027', minggu: 5, hariEfektif: 25, hariNonEfektif: 5 },
    { bulan: 'Mei 2027', minggu: 4, hariEfektif: 26, hariNonEfektif: 5 },
    { bulan: 'Juni 2027', minggu: 4, hariEfektif: 18, hariNonEfektif: 12 },
  ],

  mediaWajib: ['Laptop Guru / Komputer Madrasah', 'Konten Belajar Digital / Video Pembelajaran'],
  mediaPilihan: ['Alat Peraga Edukatif', 'LCD Proyektor', 'Papan Tulis Interaktif', 'Video Animasi', 'Aplikasi Zoom / Meet', 'Internet & E-Learning Madrasah', 'Perpustakaan Digital'],

  kriteriaKenaikan: [
    'Menyelesaikan seluruh program pembelajaran dalam dua semester pada tingkat kelas yang diikuti.',
    'Mencapai nilai sikap minimal BAIK berdasarkan kriteria penilaian sikap madrasah.',
    'Semua peserta didik naik kelas sesuai ketercapaian kompetensi individual; catatan khusus diberikan untuk pendampingan psikologis, kognitif, atau motorik di kelas selanjutnya.',
    "Menuntaskan target program Tahfidzul Qur'an dan praktik Ubudiyah sesuai tingkatan kelasnya masing-masing.",
  ],

  kriteriaKelulusan: [
    '50% Menyelesaikan seluruh program pembelajaran dari kelas I s.d. VI dan mengikuti Asesmen Madrasah (AM).',
    "25% Menyelesaikan seluruh program Tahfidzul Qur'an kelas I s.d. VI yang dibuktikan dengan Syahadah / Ijazah Tahfidz.",
    "25% Menyelesaikan program pembiasaan 'Ubudiyah kelas I s.d. VI yang dibuktikan dengan Ijazah Praktik Ubudiyah Madrasah.",
    'Memperoleh nilai minimal BAIK pada seluruh kelompok mata pelajaran agama & akhlak mulia, kewarganegaraan, estetika, dan jasmani.',
    'Lulus Asesmen Madrasah (AM) dan Tes Kemampuan Akademik (TKA).',
  ],

  pengembanganProfesi: [
    {
      bentuk: '1. Coaching',
      keterangan: 'Proses pendampingan untuk mencapai tujuan dengan menggali potensi pemikiran guru terhadap kendala pembelajaran.',
      kegiatan: [
        { jenis: 'Pendampingan Pembelajaran di Kelas', waktu: 'Satu bulan sekali' },
        { jenis: 'Pendampingan Individu Guru', waktu: 'Satu bulan sekali' },
      ],
    },
    {
      bentuk: '2. Mentoring',
      keterangan: 'Proses pendampingan dengan berbagi pengalaman praktis dan pengetahuan klinis untuk mengatasi kendala kelas.',
      kegiatan: [
        { jenis: 'Supervisi Klinis Kepala Madrasah', waktu: 'Satu bulan sekali' },
        { jenis: 'Supervisi Klinis Pengawas Madrasah Kemenag', waktu: 'Dua bulan sekali' },
      ],
    },
    {
      bentuk: '3. Pelatihan & Workshop (IHT/KKG)',
      keterangan: 'Peningkatan kompetensi pedagogik dan profesional guru secara berkala.',
      kegiatan: [
        { jenis: 'Pelatihan Pengembangan CP menjadi ATP', waktu: 'Maret - April 2026' },
        { jenis: 'Pengembangan Modul Ajar Terdiferensiasi', waktu: 'Maret - April 2026' },
        { jenis: 'Pengembangan Modul Proyek P5RA & KBC', waktu: 'Maret - April 2026' },
        { jenis: 'Pelatihan Penilaian & Asesmen Kurikulum Merdeka', waktu: 'Maret - April 2026' },
        { jenis: 'Pengembangan Media Pembelajaran Digital & AI', waktu: 'Agustus 2026' },
        { jenis: 'Pelatihan Pustakawan & Operator Madrasah', waktu: 'Juli 2026' },
        { jenis: 'Pendampingan Pembina Ekstrakurikuler (Pramuka, Silat, Seni, Keagamaan)', waktu: 'Juli 2026' },
      ],
    },
  ],

  lampiranList: [
    'Lampiran 1: Instrumen Validasi Kurikulum Madrasah yang Ditandatangani Pengawas Pembina',
    'Lampiran 2: SK Kepala Madrasah tentang Tim Pengembang Kurikulum Madrasah (TPKM)',
    'Lampiran 3: SK Kepala Madrasah tentang Penetapan Kurikulum Madrasah (KOM)',
    'Lampiran 4: SK Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)',
    'Lampiran 5: SK Kriteria Kenaikan Kelas dan Kelulusan Peserta Didik',
    'Lampiran 6: SK Pembagian Tugas Mengajar, Tugas Tambahan, Bimbingan, dan Ekstrakurikuler',
    'Lampiran 7: SK Penetapan Muatan Lokal Madrasah (Bahasa Jawa, Ke-NU-an, BTA, TIK, AI)',
    'Lampiran 8: SOP dan Regulasi Ketentuan Mutasi Peserta Didik',
    'Lampiran 9: Tata Tertib, Komitmen Bersama, dan Peraturan Akademik Madrasah',
    'Lampiran 10: Jadwal Mengajar, PBL, dan Pembelajaran Kolaboratif Guru',
    'Lampiran 11: Kalender Akademik Resmi MI Ma’arif NU 2 Sanggreman',
    'Lampiran 12: Berita Acara, Notulen, dan Daftar Hadir Rapat/Workshop Penyusunan Kurikulum',
    'Lampiran 13: Matriks Analisis Kalender Pendidikan Kemenag & LP Ma’arif NU',
    'Lampiran 14: Contoh Modul Ajar (MA) Deep Learning & Kurikulum Berbasis Cinta',
    'Lampiran 15: Dokumentasi Foto Kegiatan Rapat Pleno dan Sosialisasi Kurikulum Madrasah',
  ],
};
