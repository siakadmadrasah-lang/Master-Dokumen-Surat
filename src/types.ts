export type JenjangMadrasah = 'RA' | 'MI' | 'MTs' | 'MA' | 'MAK';
export type StatusMadrasah = 'Negeri' | 'Swasta';
export type Semester = 'Ganjil' | 'Genap';

export interface MadrasahProfile {
  namaMadrasah: string;
  nsm: string; // Nomor Statistik Madrasah
  npsn: string; // Nomor Pokok Sekolah Nasional
  jenjang: JenjangMadrasah;
  status: StatusMadrasah;
  akreditasi: string;
  alamat: string;
  desaKelurahan: string;
  kecamatan: string;
  kabupatenKota: string;
  provinsi: string;
  kodePos: string;
  telepon: string;
  email: string;
  website: string;
  namaKepala: string;
  nipKepala: string;
  pangkatGolKepala: string;
  ttdKepalaUrl?: string;
  stempelUrl?: string;
  logoKemenagUrl?: string;
  logoMadrasahUrl?: string;
  namaKetuaKomite: string;
  namaPengawas: string;
  nipPengawas: string;
  namaKasiPenma?: string;
  nipKasiPenma?: string;
  kantorKemenag?: string;
  tahunAjaran: string; // e.g. "2025/2026"
  semester: Semester;
  titimangsa: string; // Kota penetapan, e.g. "Malang"
}

export type StatusKepegawaian = 'PNS' | 'PPPK' | 'GTY' | 'GTT' | 'Honorer' | 'PTY';

export interface Teacher {
  id: string;
  nama: string;
  gelarDepan?: string;
  gelarBelakang?: string;
  nip?: string;
  nuptk?: string;
  pegId?: string;
  jenisKelamin: 'L' | 'P';
  tempatLahir: string;
  tanggalLahir: string;
  statusKepegawaian: StatusKepegawaian;
  pangkatGol: string;
  jabatanUtama: string; // Guru Kelas, Guru Mata Pelajaran, Kepala Lab, dll
  tugasTambahan?: string; // Waka Kurikulum, Waka Kesiswaan, Pembina OSIM, Pembina Pramuka, Kepala Perpustakaan
  mapelUtama: string;
  jumlahJam: number;
  waliKelasDi?: string; // Rombel ID or Name
  sertifikasi: boolean;
  telepon: string;
  email: string;
  isActive: boolean;
  signatureUrl?: string;
}

export interface Student {
  id: string;
  nisn: string;
  nis: string;
  nik: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  rombel: string; // e.g. "VII A", "Kelas 4 B"
  tingkat: number; // 1 to 12
  tempatLahir: string;
  tanggalLahir: string;
  namaAyah: string;
  namaIbu: string;
  pekerjaanOrtu?: string;
  alamat: string;
  desaKelurahan?: string;
  kecamatan?: string;
  kabupatenKota?: string;
  provinsi?: string;
  statusSiswa: 'Aktif' | 'Mutasi' | 'Lulus' | 'Non-Aktif';
  tahunMasuk: string;
  teleponOrtu?: string;
}

export interface Rombel {
  id: string;
  nama: string;
  tingkat: number;
  waliKelasId?: string;
  ruangan?: string;
}

export type DocumentType =
  | 'KOM'
  | 'KOM_CINTA'
  | 'SK_BEBAN_MENGAJAR'
  | 'SK_WALI_KELAS'
  | 'SK_PANITIA_UJIAN'
  | 'SK_TIM_TPK'
  | 'SK_TIM_P5RA'
  | 'SK_PPDB'
  | 'SK_MATSAMA'
  | 'SK_TPPK'
  | 'SK_TIM_BOS'
  | 'SK_KKTP_KELULUSAN'
  | 'SURAT_AKTIF_SISWA'
  | 'SURAT_MUTASI_SISWA'
  | 'SURAT_TUGAS_GURU'
  | 'SURAT_DISPENSASI_SISWA'
  | 'SURAT_REKOMENDASI'
  | 'SURAT_PEMBERITAHUAN_ORTU'
  | 'MODUL_AJAR'
  | 'IKRAR_MADRASAH_CINTA';

export type DocumentStatus = 'DRAFT' | 'READY_FOR_SIGN' | 'SIGNED' | 'ARCHIVED';

export interface SignatureRecord {
  id: string;
  role: 'KEPALA_MADRASAH' | 'GURU' | 'KOMITE' | 'PENGAWAS' | 'WALI_KELAS';
  title: string;
  name: string;
  nip?: string;
  signedAt?: string;
  signatureImage?: string;
  digitalHash?: string;
  qrCodeDataUrl?: string;
  isSigned: boolean;
}

export interface OfficialDocument {
  id: string;
  type: DocumentType;
  title: string;
  nomorSurat: string;
  tanggalSurat: string;
  tahunAjaran: string;
  semester: Semester;
  status: DocumentStatus;
  targetPersonId?: string; // id guru/siswa jika surat personal
  targetPersonName?: string;
  contentData: Record<string, any>;
  signatures: SignatureRecord[];
  createdAt: string;
  updatedAt: string;
  creatorName: string;
  version: number;
  notes?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  documentTitle?: string;
  category: 'DOCUMENT' | 'SIGNATURE' | 'DATABASE' | 'SYNC' | 'SYSTEM';
}

export interface SiakadSyncConfig {
  baseUrl: string;
  apiToken?: string;
  username?: string;
  password?: string;
  autoSync: boolean;
  lastSyncAt?: string;
  lastSyncStatus?: 'SUCCESS' | 'ERROR' | 'IDLE';
  lastSyncMessage?: string;
  customEndpoints?: {
    students?: string;
    teachers?: string;
    profile?: string;
  };
}

export interface SiakadSyncResult {
  success: boolean;
  message: string;
  teachersCount?: number;
  studentsCount?: number;
  teachers?: Teacher[];
  students?: Student[];
  profile?: Partial<MadrasahProfile>;
  errors?: string[];
  rawResponse?: any;
}
