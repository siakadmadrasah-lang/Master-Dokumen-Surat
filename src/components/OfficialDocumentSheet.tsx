import React, { useState } from 'react';
import { MadrasahProfile, OfficialDocument, Teacher, Student } from '../types';
import {
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  FileText,
  Heart,
  Users,
  Calendar,
  Layers,
  Award,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import { KomDocumentView } from './documents/KomDocumentView';
import { KomCintaDocumentView } from './documents/KomCintaDocumentView';
import { SkDocumentView } from './documents/SkDocumentView';
import { KemenagLogo, MaarifNuLogo } from './OfficialLogos';

interface OfficialDocumentSheetProps {
  document: OfficialDocument;
  profile: MadrasahProfile;
  teachers?: Teacher[];
  students?: Student[];
  onOpenSignModal?: (signer: any) => void;
}

export const OfficialDocumentSheet: React.FC<OfficialDocumentSheetProps> = ({
  document,
  profile,
  teachers = [],
  students = [],
  onOpenSignModal,
}) => {
  const { type, contentData, signatures } = document;

  return (
    <div className="w-full overflow-x-auto pb-4 print:p-0 print:m-0 print:overflow-visible">
      <div
        id="official-doc-sheet"
        className="bg-white text-slate-900 mx-auto p-6 sm:p-10 md:p-12 max-w-4xl shadow-xl rounded-xl border border-slate-200 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none text-[12.5px] leading-relaxed font-sans min-w-[320px]"
      >
        {/* KOP SURAT RESMI KEMENAG RI (Ditampilkan untuk Dokumen SK / Surat Resmi, tidak menduplikasi Cover KOM / KOM CINTA) */}
        {type !== 'KOM' && type !== 'KOM_CINTA' && (
          <>
            <div className="border-b-[3px] border-double border-slate-900 pb-3 mb-5 print:mb-4">
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                  {profile.logoKemenagUrl && !profile.logoKemenagUrl.includes('wikimedia.org') ? (
                    <img
                      src={profile.logoKemenagUrl}
                      alt="Logo Kemenag"
                      className="w-14 h-14 sm:w-18 sm:h-18 object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <KemenagLogo className="w-14 h-14 sm:w-18 sm:h-18" />
                  )}
                </div>

                <div className="text-center flex-1 space-y-0.5 px-1">
                  <p className="text-[11px] sm:text-[13px] font-bold tracking-wider text-slate-800 uppercase">
                    KEMENTERIAN AGAMA REPUBLIK INDONESIA
                  </p>
                  <p className="text-[10px] sm:text-[12px] font-semibold text-slate-800 uppercase">
                    KANTOR KEMENTERIAN AGAMA {profile.kabupatenKota?.toUpperCase() || 'KABUPATEN BANYUMAS'}
                  </p>
                  <h1 className="text-base sm:text-xl font-extrabold text-emerald-950 uppercase tracking-wide">
                    {profile.namaMadrasah}
                  </h1>
                  <p className="text-[10px] sm:text-[11px] text-slate-700 font-medium">
                    NSM: <span className="font-mono font-bold">{profile.nsm}</span> | NPSN:{' '}
                    <span className="font-mono font-bold">{profile.npsn}</span> | Akreditasi: {profile.akreditasi}
                  </p>
                  <p className="text-[9.5px] sm:text-[10px] text-slate-600 line-clamp-2">
                    {profile.alamat}, {profile.desaKelurahan}, Kec. {profile.kecamatan},{' '}
                    {profile.kabupatenKota}, {profile.provinsi} {profile.kodePos ? `- Kode Pos: ${profile.kodePos}` : ''}
                  </p>
                  <p className="text-[9.5px] sm:text-[10px] text-slate-600">
                    Telp: {profile.telepon || '(0281) 6841234'} | Email: {profile.email} {profile.website ? `| Website: ${profile.website}` : ''}
                  </p>
                </div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
                  {profile.logoMadrasahUrl ? (
                    <img
                      src={profile.logoMadrasahUrl}
                      alt="Logo Madrasah"
                      className="w-14 h-14 sm:w-18 sm:h-18 object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <MaarifNuLogo className="w-14 h-14 sm:w-18 sm:h-18" />
                  )}
                </div>
              </div>
            </div>

            {/* Bismillah for Islamic Madrasah Official Letters */}
            <div className="text-center my-3 font-serif text-lg text-emerald-900">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </>
        )}

        {/* ===================== DOKUMEN TYPE: KOM (KURIKULUM OPERASIONAL MADRASAH) ===================== */}
        {type === 'KOM' && (
          <KomDocumentView
            document={document}
            profile={profile}
            teachers={teachers}
            students={students}
          />
        )}

        {/* ===================== DOKUMEN TYPE: KOM CINTA (KMA 1503 TAHUN 2025) ===================== */}
        {type === 'KOM_CINTA' && (
          <KomCintaDocumentView
            document={document}
            profile={profile}
            teachers={teachers}
            students={students}
          />
        )}

        {/* ===================== DOKUMEN TYPE: SURAT KEPUTUSAN (SK) KEPALA MADRASAH ===================== */}
        {type.startsWith('SK_') && (
          <SkDocumentView
            document={document}
            profile={profile}
            teachers={teachers}
            students={students}
            onOpenSignModal={onOpenSignModal}
          />
        )}

        {/* ===================== DOKUMEN TYPE: SURAT KETERANGAN AKTIF SISWA ===================== */}
        {type === 'SURAT_AKTIF_SISWA' && (
          <div className="space-y-5 text-xs sm:text-[12.5px] leading-relaxed">
            <div className="text-center space-y-1 mb-5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 underline">
                SURAT KETERANGAN AKTIF BELAJAR
              </h2>
              <p className="text-xs font-mono text-slate-700">Nomor: {document.nomorSurat}</p>
            </div>

            <p>
              Yang bertanda tangan di bawah ini Kepala {profile.namaMadrasah}, Kementerian Agama{' '}
              {profile.kabupatenKota}, dengan ini menerangkan dengan sesungguhnya bahwa:
            </p>

            <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-3 sm:p-4 my-2">
              <table className="w-full text-xs space-y-2">
                <tbody>
                  <tr>
                    <td className="w-36 sm:w-44 font-semibold py-1 text-slate-700">Nama Lengkap</td>
                    <td className="font-bold text-slate-900 text-sm">
                      : {contentData.studentData?.nama || document.targetPersonName}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1 text-slate-700">NISN / NIS</td>
                    <td className="font-mono">
                      : {contentData.studentData?.nisn || '0123456789'} /{' '}
                      {contentData.studentData?.nis || '202301001'}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1 text-slate-700">NIK</td>
                    <td className="font-mono">: {contentData.studentData?.nik || '-'}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1 text-slate-700">Tempat, Tanggal Lahir</td>
                    <td>
                      : {contentData.studentData?.tempatLahir || 'Malang'},{' '}
                      {contentData.studentData?.tanggalLahir || '14 Mei 2015'}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1 text-slate-700">Jenis Kelamin</td>
                    <td>
                      : {contentData.studentData?.jenisKelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1 text-slate-700">Kelas / Rombel</td>
                    <td className="font-bold text-emerald-950">
                      : {contentData.studentData?.rombel || 'Kelas 4A'} (T.A {document.tahunAjaran})
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1 text-slate-700">Nama Orang Tua / Wali</td>
                    <td>
                      : Ayah: {contentData.studentData?.namaAyah || '-'} | Ibu:{' '}
                      {contentData.studentData?.namaIbu || '-'}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1 text-slate-700">Alamat Tempat Tinggal</td>
                    <td>: {contentData.studentData?.alamat || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Adalah benar-benar peserta didik yang <strong>AKTIF</strong> mengikuti kegiatan
              pembelajaran pada {profile.namaMadrasah} pada Tahun Pelajaran {document.tahunAjaran},{' '}
              {contentData.catatanKelakuan || 'berkelakuan baik dan taat tata tertib madrasah'}.
            </p>

            <p>
              Surat keterangan ini diberikan kepada yang bersangkutan untuk keperluan:{' '}
              <strong>{contentData.keperluan || 'Administrasi Pendidikan & Beasiswa'}</strong>.
            </p>

            <p>
              Demikian surat keterangan ini dibuat dengan sebenarnya agar dapat dipergunakan
              sebagaimana mestinya.
            </p>
          </div>
        )}

        {/* ===================== DOKUMEN TYPE: SURAT REKOMENDASI SISWA ===================== */}
        {type === 'SURAT_REKOMENDASI' && (
          <div className="space-y-5 text-xs sm:text-[12.5px] leading-relaxed">
            <div className="text-center space-y-1 mb-5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 underline">
                SURAT REKOMENDASI KEPALA MADRASAH
              </h2>
              <p className="text-xs font-mono text-slate-700">Nomor: {document.nomorSurat}</p>
            </div>

            <p>
              Yang bertanda tangan di bawah ini Kepala {profile.namaMadrasah} memberikan rekomendasi penuh kepada:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-4 my-2">
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="w-36 sm:w-44 font-semibold py-1">Nama Peserta Didik</td>
                    <td className="font-bold text-slate-900 text-sm">
                      : {contentData.studentData?.nama || document.targetPersonName}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">NISN / NIS</td>
                    <td className="font-mono">: {contentData.studentData?.nisn || '-'} / {contentData.studentData?.nis || '-'}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Kelas Asal</td>
                    <td>: {contentData.studentData?.rombel || 'Kelas 6'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-slate-800">Catatan Karakter & Prestasi:</p>
              <p className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-200 text-emerald-950 font-medium">
                {contentData.catatanPrestasi}
              </p>
            </div>

            <p>{contentData.rekomendasiTeks}</p>
            <p>Demikian surat rekomendasi ini dibuat dengan ikhlas untuk dapat dipergunakan sebagaimana mestinya.</p>
          </div>
        )}

        {/* ===================== DOKUMEN TYPE: SURAT TUGAS GURU ===================== */}
        {type === 'SURAT_TUGAS_GURU' && (
          <div className="space-y-5 text-xs sm:text-[12.5px] leading-relaxed">
            <div className="text-center space-y-1 mb-5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 underline">
                SURAT PERINTAH TUGAS
              </h2>
              <p className="text-xs font-mono text-slate-700">Nomor: {document.nomorSurat}</p>
            </div>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-20 sm:w-24 font-bold align-top py-1">Dasar</td>
                  <td className="w-3 align-top py-1">:</td>
                  <td className="py-1">{contentData.dasarSurat}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-center font-bold text-xs uppercase py-1 tracking-widest">
              MEMBERI TUGAS KEPADA:
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="w-32 sm:w-36 font-semibold py-1">Nama Lengkap</td>
                    <td className="font-bold text-slate-900">
                      : {contentData.teacherData?.nama || document.targetPersonName}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">NIP / NUPTK</td>
                    <td className="font-mono">: {contentData.teacherData?.nip || '-'}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Pangkat / Golongan</td>
                    <td>: {contentData.teacherData?.pangkatGol || '-'}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Jabatan / Tugas</td>
                    <td>
                      : {contentData.teacherData?.jabatanUtama || 'Guru'} (
                      {contentData.teacherData?.tugasTambahan || 'Pengajar'})
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <table className="w-full text-xs space-y-1">
              <tbody>
                <tr>
                  <td className="w-28 sm:w-32 font-bold align-top py-1">Untuk</td>
                  <td className="w-3 align-top py-1">:</td>
                  <td className="py-1 font-semibold text-slate-900">{contentData.tugas}</td>
                </tr>
                <tr>
                  <td className="font-bold align-top py-1">Tempat</td>
                  <td className="align-top py-1">:</td>
                  <td className="py-1">{contentData.tempat}</td>
                </tr>
                <tr>
                  <td className="font-bold align-top py-1">Waktu Pelaksanaan</td>
                  <td className="align-top py-1">:</td>
                  <td className="py-1">{contentData.waktuPelaksanaan}</td>
                </tr>
                <tr>
                  <td className="font-bold align-top py-1">Beban Pembiayaan</td>
                  <td className="align-top py-1">:</td>
                  <td className="py-1">{contentData.bebanBiaya}</td>
                </tr>
              </tbody>
            </table>

            <p>
              Setelah melaksanakan tugas, agar segera membuat laporan tertulis kepada Kepala
              Madrasah. Demikian surat tugas ini dibuat untuk dilaksanakan dengan penuh tanggung
              jawab.
            </p>
          </div>
        )}

        {/* ===================== DOKUMEN TYPE: SURAT PEMBERITAHUAN / UNDANGAN ORTU ===================== */}
        {type === 'SURAT_PEMBERITAHUAN_ORTU' && (
          <div className="space-y-4 text-xs sm:text-[12.5px] leading-relaxed">
            <div className="flex justify-between items-start text-xs border-b pb-3 mb-4">
              <div>
                <p>Nomor : {document.nomorSurat}</p>
                <p>Lamp. : {contentData.lampiran || '-'}</p>
                <p>Hal : <strong>{contentData.hal}</strong></p>
              </div>
              <div className="text-right">
                <p>{profile.titimangsa}, {document.tanggalSurat}</p>
                <p className="mt-2 font-medium">Kepada Yth.</p>
                <p className="font-bold">Bapak/Ibu Orang Tua / Wali Murid</p>
                <p>di Tempat</p>
              </div>
            </div>

            <p className="italic text-slate-700">Assalamu'alaikum Warahmatullahi Wabarakatuh,</p>
            <p>
              Puji syukur kita panjatkan ke hadirat Allah SWT, semoga Bapak/Ibu senantiasa dalam limpahan
              rahmat dan karunia-Nya. Dalam rangka memperkuat sinergi antara madrasah dan orang tua demi
              tumbuh kembang ananda tercinta, kami mengundang Bapak/Ibu pada:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 my-2 text-xs">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-28 font-semibold py-1">Hari, Tanggal</td>
                    <td className="font-bold">: {contentData.hariTanggal}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Waktu</td>
                    <td>: {contentData.waktu}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Tempat</td>
                    <td>: {contentData.tempat}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {contentData.agenda && (
              <div className="space-y-1">
                <p className="font-semibold text-xs text-slate-800">Agenda Kegiatan:</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-xs">
                  {contentData.agenda.map((ag: string, idx: number) => (
                    <li key={idx}>{ag}</li>
                  ))}
                </ol>
              </div>
            )}

            <p>{contentData.catatan}</p>
            <p className="italic text-slate-700">Wassalamu'alaikum Warahmatullahi Wabarakatuh.</p>
          </div>
        )}

        {/* ===================== DOKUMEN TYPE: MODUL AJAR / RPP BERBASIS CINTA ===================== */}
        {type === 'MODUL_AJAR' && (
          <div className="space-y-5 text-xs sm:text-[12.5px] leading-relaxed text-slate-900 font-sans">
            <div className="text-center space-y-1 mb-4 border-b pb-3 border-slate-300">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-950 font-serif">
                MODUL AJAR / RENCANA PELAKSANAAN PEMBELAJARAN (RPP)
              </h2>
              <h3 className="text-xs sm:text-sm font-semibold text-emerald-900 uppercase">
                PEMBELAJARAN MENDALAM (DEEP LEARNING) BERBASIS NILAI CINTA (KMA 1503/2025)
              </h3>
              <p className="text-xs font-mono text-slate-600">Nomor Registrasi: {document.nomorSurat}</p>
            </div>

            {/* I. INFORMASI UMUM */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wide bg-slate-100 px-3 py-1 rounded-md text-slate-900 border-l-4 border-emerald-700">
                A. IDENTITAS MODUL
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div><span className="font-semibold text-slate-700">Nama Madrasah:</span> {contentData.satuanPendidikan || profile.namaMadrasah}</div>
                <div><span className="font-semibold text-slate-700">Pendidik / Penyusun:</span> {contentData.namaPenyusun || profile.namaKepala}</div>
                <div><span className="font-semibold text-slate-700">Fase / Kelas / Semester:</span> {contentData.faseKelas || 'Fase B / Kelas IV'} ({document.semester})</div>
                <div><span className="font-semibold text-slate-700">Tahun Pelajaran:</span> {document.tahunAjaran}</div>
                <div><span className="font-semibold text-slate-700">Mata Pelajaran:</span> {contentData.mataPelajaran || 'Pendidikan Agama Islam / Tematik'}</div>
                <div><span className="font-semibold text-slate-700">Alokasi Waktu:</span> {contentData.alokasiWaktu || '3 JP (3 x 35 Menit)'}</div>
              </div>
            </div>

            {/* II. INTEGRASI DIMENSI & NILAI CINTA */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wide bg-slate-100 px-3 py-1 rounded-md text-slate-900 border-l-4 border-emerald-700">
                B. DIMENSI PROFIL LULUSAN & INTEGRASI NILAI PANCA CINTA
              </h4>
              <div className="space-y-1.5 p-2.5 bg-emerald-50/40 rounded-lg border border-emerald-200 text-xs">
                <div><span className="font-semibold text-emerald-950">Dimensi P5-RA:</span> {contentData.dimensiP5RA || 'Beriman Bertakwa (Taaddub), Gotong Royong (Tasyawur), Berkeadaban (Tasamuh)'}</div>
                <div><span className="font-semibold text-emerald-950">Fokus Pilar Nilai Cinta:</span> {contentData.nilaiCintaMadrasah || 'Mahabbatun Nafs wal Ikhwan (Kasih Sayang terhadap Teman dan Anti-Bullying)'}</div>
                <div><span className="font-semibold text-emerald-950">Pemahaman Bermakna (Deep Learning):</span> {contentData.pemahamanBermakna || 'Kebaikan kecil yang dilakukan dengan cinta dan ketulusan akan melahirkan kedamaian bersama.'}</div>
              </div>
            </div>

            {/* III. TUJUAN PEMBELAJARAN */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wide bg-slate-100 px-3 py-1 rounded-md text-slate-900 border-l-4 border-emerald-700">
                C. TUJUAN PEMBELAJARAN (TP)
              </h4>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs leading-relaxed">
                {contentData.tujuanPembelajaran || 'Peserta didik mampu mendemonstrasikan perilaku saling tolong menolong, menghormati perbedaan, dan menyebarkan salam cinta damai di lingkungan madrasah.'}
              </div>
            </div>

            {/* IV. LANGKAH-LANGKAH PEMBELAJARAN */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wide bg-slate-100 px-3 py-1 rounded-md text-slate-900 border-l-4 border-emerald-700">
                D. KEGIATAN PEMBELAJARAN (MINDFUL, MEANINGFUL, & JOYFUL LEARNING)
              </h4>
              <div className="space-y-2">
                {(contentData.langkahPembelajaran || [
                  { tahap: 'Pendahuluan (15 Menit)', deskripsi: 'Pembiasaan doa bersama, menyanyikan lagu Mars Madrasah, asesmen diagnostik emosi (Roda Emosi Bahagia), apersepsi kisah keteladanan Rasulullah SAW.' },
                  { tahap: 'Kegiatan Inti Berdiferensiasi (75 Menit)', deskripsi: 'Diferensiasi Proses: Siswa dibagi dalam kelompok minat (Visual: menganalisis poster cinta kasih, Auditori: mendengarkan kisah teladan, Kinestetik: bermain peran simulasi empati teman sakit).' },
                  { tahap: 'Penutup & Refleksi Cinta (15 Menit)', deskripsi: 'Siswa menuliskan satu "Kartu Kebaikan & Terima Kasih" untuk temannya, kesimpulan bersama, dan doa penutup.' },
                ]).map((step: any, idx: number) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <p className="font-bold text-emerald-950 mb-1">{step.tahap || `Tahap ${idx + 1}`}</p>
                    <p className="text-slate-700 leading-relaxed">{step.deskripsi}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* V. ASESMEN & REFLEKSI */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wide bg-slate-100 px-3 py-1 rounded-md text-slate-900 border-l-4 border-emerald-700">
                E. RANCANGAN ASESMEN PEMBELAJARAN & REFLEKSI
              </h4>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs leading-relaxed">
                <p className="font-semibold text-slate-800 mb-1">Instrumen Evaluasi:</p>
                <p className="text-slate-700">{contentData.asesmen || 'Asesmen Formatif: Lembar Observasi Sikap Welas Asih dan Jurnal Refleksi Diri. Asesmen Sumatif: Penilaian unjuk kerja simulasi empati.'}</p>
              </div>
            </div>
          </div>
        )}

        {/* ===================== DOKUMEN TYPE: IKRAR MADRASAH CINTA ===================== */}
        {type === 'IKRAR_MADRASAH_CINTA' && (
          <div className="space-y-6 text-xs sm:text-[12.5px] leading-relaxed text-center">
            <div className="space-y-1 mb-6 border-b pb-4 border-emerald-900/30">
              <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-emerald-950">
                PIAGAM DEKLARASI & IKRAR BERSAMA
              </h2>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase">
                MADRASAH RAMAH ANAK, INKLUSIF, DAN BERBASIS CINTA KASIH
              </h3>
              <p className="text-xs text-slate-600 font-mono">Nomor: {document.nomorSurat}</p>
            </div>

            <p className="italic text-slate-700 max-w-xl mx-auto">
              &ldquo;Kami segenap sivitas akademika {profile.namaMadrasah} berikrar dan berkomitmen
              dengan tulus ikhlas di hadapan Allah SWT untuk:&rdquo;
            </p>

            <div className="space-y-2.5 max-w-2xl mx-auto text-left py-2">
              {contentData.poinDeklarasi?.map((poin: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-2.5 sm:p-3 bg-emerald-50/50 border border-emerald-200/80 rounded-xl"
                >
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-semibold text-slate-800 pt-0.5">{poin}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600 italic">
              Dideklarasikan dan ditandatangani bersama di {profile.titimangsa}, tanggal{' '}
              {document.tanggalSurat}
            </p>
          </div>
        )}

        {/* ===================== SIGNATURE BLOCK RESMI KEMENAG (Non-SK / Non-KOM) ===================== */}
        {!type.startsWith('SK_') && type !== 'KOM' && (
          <div className="mt-8 pt-5 border-t border-slate-200">
            <div className="flex flex-wrap justify-between items-start gap-4">
              {/* Tanggal & Tempat Penetapan */}
              <div className="w-full text-right text-xs text-slate-700 mb-2">
                Ditetapkan di : {profile.titimangsa || 'Malang'}
                <br />
                Pada tanggal : {document.tanggalSurat || '14 Juli 2025'}
              </div>

              {/* Render Signers Grid */}
              <div
                className={`w-full grid gap-4 ${
                  signatures.length > 2
                    ? 'grid-cols-1 sm:grid-cols-3'
                    : signatures.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {signatures.length === 1 && <div className="hidden sm:block" />}

                {signatures.map((sig, idx) => (
                  <div
                    key={sig.id || idx}
                    className="flex flex-col items-center text-center p-3 rounded-xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50/30 transition-all relative group"
                  >
                    <p className="text-xs font-semibold text-slate-800">{sig.title},</p>

                    {/* Tanda Tangan / QR Box */}
                    <div className="my-2 min-h-[85px] flex flex-col items-center justify-center">
                      {sig.isSigned ? (
                        <div className="flex flex-col items-center space-y-1">
                          {sig.qrCodeDataUrl ? (
                            <div className="relative">
                              <img
                                src={sig.qrCodeDataUrl}
                                alt="QR TTE Resmi"
                                className="w-18 h-18 border border-emerald-200 rounded p-1 bg-white shadow-xs"
                              />
                              <div className="absolute -bottom-1 -right-1 bg-emerald-800 text-white p-0.5 rounded-full">
                                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                              </div>
                            </div>
                          ) : sig.signatureImage ? (
                            <img
                              src={sig.signatureImage}
                              alt="Tanda Tangan"
                              className="h-14 object-contain"
                            />
                          ) : (
                            <div className="h-14 flex items-center justify-center font-serif italic text-emerald-900 font-bold text-sm">
                              (Ditandatangani Secara Elektronik)
                            </div>
                          )}
                          <span className="text-[9px] font-mono text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                            TTE Terverifikasi Kemenag
                          </span>
                        </div>
                      ) : (
                        <div className="h-18 border-2 border-dashed border-slate-300 rounded-lg w-36 flex flex-col items-center justify-center p-2 text-slate-400">
                          <span className="text-[10px]">Belum Ditandatangani</span>
                          {onOpenSignModal && (
                            <button
                              id={`sign-now-btn-${idx}`}
                              type="button"
                              onClick={() => onOpenSignModal(sig)}
                              className="mt-1 text-[10px] text-emerald-700 hover:text-emerald-900 font-bold underline print:hidden cursor-pointer"
                            >
                              Tanda Tangan Sekarang
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-xs font-bold text-slate-900 underline mt-1">{sig.name}</p>
                    {sig.nip && sig.nip !== '-' && (
                      <p className="text-[10px] font-mono text-slate-600">NIP. {sig.nip}</p>
                    )}
                    {sig.signedAt && (
                      <p className="text-[9px] text-slate-400 mt-0.5">{sig.signedAt}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Security & Verification Footer */}
            <div className="mt-6 pt-3 border-t border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between text-[9.5px] text-slate-500 font-mono gap-1">
              <span>Sistem Dokumen Otomatis AutoMadrasah v1.0 • KMA 450/2024 & KMA 1503/2025</span>
              <span>Dokumen Resmi dan Sah Kementerian Agama RI</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
