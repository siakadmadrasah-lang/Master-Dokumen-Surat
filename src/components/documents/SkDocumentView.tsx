import React from 'react';
import { MadrasahProfile, OfficialDocument, Teacher, Student } from '../../types';
import { ShieldCheck } from 'lucide-react';

interface SkDocumentViewProps {
  document: OfficialDocument;
  profile: MadrasahProfile;
  teachers?: Teacher[];
  students?: Student[];
  onOpenSignModal?: (signer: any) => void;
}

export const SkDocumentView: React.FC<SkDocumentViewProps> = ({
  document,
  profile,
  teachers = [],
  students = [],
  onOpenSignModal,
}) => {
  const { type, contentData, signatures } = document;

  // Nama SK dalam huruf kapital
  const skTitleUpper = (document.title || '').toUpperCase();
  const namaMadrasahUpper = (profile.namaMadrasah || 'MADRASAH IBTIDAIYAH').toUpperCase();

  // Primary Signer (Kepala Madrasah)
  const kamadSigner = signatures.find((s) => s.role === 'KEPALA_MADRASAH') || signatures[0] || {
    id: 'kamad-sig',
    role: 'KEPALA_MADRASAH',
    title: `Kepala ${profile.namaMadrasah}`,
    name: profile.namaKepala,
    nip: profile.nipKepala,
    isSigned: false,
  };

  // Other signers (Komite / Pengawas / Waka jika ada)
  const otherSigners = signatures.filter((s) => s.id !== kamadSigner.id);

  // Tembusan list
  const tembusanList = contentData.tembusan || [
    `Kepala Kantor Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
    `Pengawas Madrasah Pembina Kementerian Agama ${profile.kabupatenKota || 'Kabupaten/Kota'}`,
    `Ketua Komite ${profile.namaMadrasah}`,
    'Pendidik dan Tenaga Kependidikan yang bersangkutan untuk diketahui dan dilaksanakan',
    'Arsip Madrasah',
  ];

  return (
    <div className="space-y-6 text-slate-900 leading-relaxed font-serif">
      {/* JUDUL SURAT KEPUTUSAN RESMI STANDAR TATA NASKAH DINAS KEMENAG */}
      <div className="text-center space-y-1.5 pt-1 pb-4">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-sans">
          KEPUTUSAN KEPALA {namaMadrasahUpper}
        </h2>
        <p className="text-xs font-bold text-slate-900 font-mono tracking-wide">
          NOMOR : {document.nomorSurat || 'MI.01/PP.00.4/001/07/2025'}
        </p>
        <div className="py-2">
          <p className="text-xs font-bold text-slate-800 uppercase tracking-widest font-sans">
            TENTANG
          </p>
          <p className="text-xs sm:text-[13px] font-extrabold text-slate-950 uppercase max-w-2xl mx-auto leading-normal mt-1">
            {skTitleUpper}
          </p>
        </div>
        <p className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans pt-1">
          DENGAN RAHMAT TUHAN YANG MAHA ESA
        </p>
        <p className="text-xs sm:text-[13px] font-bold text-slate-900 uppercase tracking-wider font-sans">
          KEPALA {namaMadrasahUpper},
        </p>
      </div>

      {/* KONSIDERANS: MENIMBANG, MENGINGAT, MEMPERHATIKAN */}
      <div className="space-y-3 text-[12px] font-sans text-slate-900">
        <table className="w-full align-top border-collapse">
          <tbody>
            {/* MENIMBANG */}
            <tr>
              <td className="w-24 sm:w-28 font-bold align-top py-1.5 text-slate-900">Menimbang</td>
              <td className="w-3 align-top py-1.5 font-bold">:</td>
              <td className="py-1.5">
                <ol className="list-[lower-alpha] pl-4 space-y-1.5 text-justify">
                  {contentData.menimbang?.map((item: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  )) || (
                    <>
                      <li>
                        bahwa dalam rangka memperlancar pelaksanaan tugas pokok dan fungsi di {profile.namaMadrasah} serta menjamin mutu pendidikan yang berkualitas, dipandang perlu menetapkan pembagian tugas dan ketentuan yang relevan;
                      </li>
                      <li>
                        bahwa untuk menjamin kepastian hukum, tertib administrasi, dan akuntabilitas kinerja, perlu diterbitkan Keputusan Kepala Madrasah;
                      </li>
                      <li>
                        bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Kepala Madrasah Ibtidaiyah tentang {document.title};
                      </li>
                    </>
                  )}
                </ol>
              </td>
            </tr>

            {/* MENGINGAT */}
            <tr>
              <td className="font-bold align-top py-1.5 text-slate-900">Mengingat</td>
              <td className="align-top py-1.5 font-bold">:</td>
              <td className="py-1.5">
                <ol className="list-decimal pl-4 space-y-1.5 text-justify">
                  {contentData.mengingat?.map((item: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  )) || (
                    <>
                      <li>Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;</li>
                      <li>Undang-Undang Nomor 14 Tahun 2005 tentang Guru dan Dosen;</li>
                      <li>Peraturan Pemerintah Nomor 17 Tahun 2010 jo. PP No. 66 Tahun 2010 tentang Pengelolaan dan Penyelenggaraan Pendidikan;</li>
                      <li>Peraturan Pemerintah Nomor 57 Tahun 2021 jo. PP No. 4 Tahun 2022 tentang Standar Nasional Pendidikan;</li>
                      <li>Peraturan Menteri Agama Nomor 90 Tahun 2013 jo. PMA No. 66 Tahun 2016 tentang Penyelenggaraan Pendidikan Madrasah;</li>
                      <li>Peraturan Menteri Agama Nomor 58 Tahun 2017 jo. PMA No. 24 Tahun 2018 tentang Kepala Madrasah;</li>
                      <li>Keputusan Menteri Agama Nomor 9 Tahun 2016 tentang Pedoman Tata Naskah Dinas Kementerian Agama;</li>
                      <li>Keputusan Menteri Agama Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Madrasah;</li>
                      <li>Keputusan Menteri Agama Nomor 1503 Tahun 2025 tentang Pedoman Kurikulum pada Madrasah;</li>
                    </>
                  )}
                </ol>
              </td>
            </tr>

            {/* MEMPERHATIKAN */}
            {contentData.memperhatikan && (
              <tr>
                <td className="font-bold align-top py-1.5 text-slate-900">Memperhatikan</td>
                <td className="align-top py-1.5 font-bold">:</td>
                <td className="py-1.5">
                  <ol className="list-decimal pl-4 space-y-1 text-justify">
                    {Array.isArray(contentData.memperhatikan) ? (
                      contentData.memperhatikan.map((item: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="leading-relaxed">{contentData.memperhatikan}</li>
                    )}
                  </ol>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* DIKTUM MEMUTUSKAN */}
        <div className="text-center font-bold text-xs uppercase py-3 tracking-widest text-slate-950 font-sans">
          MEMUTUSKAN:
        </div>

        {/* DIKTUM MENETAPKAN DAN PASAL-PASAL */}
        <table className="w-full align-top border-collapse">
          <tbody>
            <tr>
              <td className="w-24 sm:w-28 font-bold align-top py-1.5 text-slate-900">Menetapkan</td>
              <td className="w-3 align-top py-1.5 font-bold">:</td>
              <td className="py-1.5 font-bold uppercase text-slate-950">
                {skTitleUpper}.
              </td>
            </tr>
            <tr>
              <td className="font-bold align-top py-1.5 text-slate-900">KESATU</td>
              <td className="align-top py-1.5 font-bold">:</td>
              <td className="py-1.5 text-justify">
                {contentData.diktum?.kesatu ||
                  `Menetapkan ${document.title} sebagaimana tercantum dalam Lampiran yang merupakan bagian tidak terpisahkan dari Keputusan ini.`}
              </td>
            </tr>
            <tr>
              <td className="font-bold align-top py-1.5 text-slate-900">KEDUA</td>
              <td className="align-top py-1.5 font-bold">:</td>
              <td className="py-1.5 text-justify">
                {contentData.diktum?.kedua ||
                  'Masing-masing personil/tim yang ditunjuk bertugas melaksanakan amanah kedinasan dengan sebaik-baiknya, penuh keikhlasan, dan rasa tanggung jawab.'}
              </td>
            </tr>
            <tr>
              <td className="font-bold align-top py-1.5 text-slate-900">KETIGA</td>
              <td className="align-top py-1.5 font-bold">:</td>
              <td className="py-1.5 text-justify">
                {contentData.diktum?.ketiga ||
                  'Masing-masing personil/tim yang ditugaskan wajib melaporkan pelaksanaan tugasnya secara tertulis dan berkala kepada Kepala Madrasah.'}
              </td>
            </tr>
            <tr>
              <td className="font-bold align-top py-1.5 text-slate-900">KEEMPAT</td>
              <td className="align-top py-1.5 font-bold">:</td>
              <td className="py-1.5 text-justify">
                {contentData.diktum?.keempat ||
                  'Segala biaya yang timbul sebagai akibat ditetapkannya keputusan ini dibebankan pada Anggaran Pendapatan dan Belanja Madrasah (RKAM) yang bersumber dari DIPA / Dana Bantuan Operasional Sekolah (BOS) atau sumber lain yang sah dan tidak mengikat.'}
              </td>
            </tr>
            <tr>
              <td className="font-bold align-top py-1.5 text-slate-900">KELIMA</td>
              <td className="align-top py-1.5 font-bold">:</td>
              <td className="py-1.5 text-justify">
                {contentData.diktum?.kelima ||
                  'Keputusan ini mulai berlaku pada tanggal ditetapkan, dengan ketentuan apabila di kemudian hari terdapat kekeliruan akan diadakan perbaikan dan penyempurnaan sebagaimana mestinya.'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TITIMANGSA & PENGESAHAN UTAMA KEPALA MADRASAH */}
      <div className="pt-4 flex justify-end font-sans">
        <div className="w-64 sm:w-72 text-left text-xs space-y-1">
          <p>Ditetapkan di : {profile.titimangsa || profile.kabupatenKota || 'Malang'}</p>
          <p>Pada tanggal : {document.tanggalSurat || '14 Juli 2025'}</p>
          <div className="pt-2">
            <p className="font-bold uppercase text-slate-900">
              KEPALA {namaMadrasahUpper},
            </p>

            {/* Area TTE / Tanda Tangan */}
            <div className="my-2 min-h-[75px] flex flex-col justify-center">
              {kamadSigner.isSigned ? (
                <div className="flex items-center space-x-2">
                  {kamadSigner.qrCodeDataUrl ? (
                    <div className="relative">
                      <img
                        src={kamadSigner.qrCodeDataUrl}
                        alt="QR TTE"
                        className="w-16 h-16 border border-emerald-300 rounded p-0.5 bg-white shadow-2xs"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-emerald-800 text-white p-0.5 rounded-full">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-300" />
                      </div>
                    </div>
                  ) : kamadSigner.signatureImage ? (
                    <img
                      src={kamadSigner.signatureImage}
                      alt="Tanda Tangan"
                      className="h-12 object-contain"
                    />
                  ) : (
                    <span className="italic font-serif font-bold text-emerald-950 text-xs">
                      (Ditandatangani Secara Elektronik)
                    </span>
                  )}
                  <div className="text-[9.5px] font-mono text-emerald-900 leading-tight">
                    <span className="font-bold block">TTE Valid</span>
                    <span>Kemenag RI</span>
                  </div>
                </div>
              ) : (
                <div className="h-16 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-1 text-slate-400">
                  <span className="text-[10px]">Belum Ditandatangani</span>
                  {onOpenSignModal && (
                    <button
                      type="button"
                      onClick={() => onOpenSignModal(kamadSigner)}
                      className="mt-0.5 text-[10px] text-emerald-700 hover:text-emerald-900 font-bold underline print:hidden cursor-pointer"
                    >
                      TTE Sekarang
                    </button>
                  )}
                </div>
              )}
            </div>

            <p className="font-bold text-slate-950 underline text-xs">
              {kamadSigner.name || profile.namaKepala}
            </p>
            {kamadSigner.nip && kamadSigner.nip !== '-' && (
              <p className="font-mono text-[10px] text-slate-700">NIP. {kamadSigner.nip}</p>
            )}
          </div>
        </div>
      </div>

      {/* TEMBUSAN RESMI KEMENAG */}
      <div className="pt-4 border-t border-slate-200 text-xs font-sans text-slate-800">
        <p className="font-bold mb-1">Tembusan disampaikan kepada Yth.:</p>
        <ol className="list-decimal pl-4 space-y-0.5 text-[11px]">
          {tembusanList.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      </div>

      {/* ========================================================================= */}
      {/* ======================== LAMPIRAN RESMI SK ============================== */}
      {/* ========================================================================= */}

      {/* LAMPIRAN 1: SK_BEBAN_MENGAJAR (PEMBAGIAN TUGAS MENGAJAR & TUGAS TAMBAHAN) */}
      {type === 'SK_BEBAN_MENGAJAR' && (
        <div className="pt-8 border-t-2 border-slate-400 space-y-6 font-sans">
          {/* Header Lampiran I */}
          <div className="text-xs space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold uppercase">LAMPIRAN I :</p>
                <p className="font-bold uppercase">KEPUTUSAN KEPALA {namaMadrasahUpper}</p>
                <p className="font-mono">NOMOR : {document.nomorSurat}</p>
                <p className="font-mono">TANGGAL : {document.tanggalSurat}</p>
                <p className="font-bold uppercase pt-1">
                  TENTANG : PEMBAGIAN TUGAS GURU DALAM PROSES BELAJAR MENGAJAR TAHUN PELAJARAN {document.tahunAjaran}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] border border-slate-400 border-collapse">
              <thead className="bg-slate-100 text-slate-900 font-bold text-center">
                <tr>
                  <th className="border border-slate-400 p-1.5 w-8">No</th>
                  <th className="border border-slate-400 p-1.5 text-left">Nama Guru & NIP/NUPTK</th>
                  <th className="border border-slate-400 p-1.5">Pangkat / Gol</th>
                  <th className="border border-slate-400 p-1.5 text-left">Mata Pelajaran yang Diampu</th>
                  <th className="border border-slate-400 p-1.5">Rombel</th>
                  <th className="border border-slate-400 p-1.5">JTM Wajib</th>
                  <th className="border border-slate-400 p-1.5 text-left">Tugas Tambahan</th>
                  <th className="border border-slate-400 p-1.5">Ekuiv.</th>
                  <th className="border border-slate-400 p-1.5 w-12">Total JP</th>
                </tr>
              </thead>
              <tbody>
                {(contentData.guruList || teachers).map((g: any, idx: number) => {
                  const jtmWajib = g.jumlahJam || 24;
                  const ekuiv = g.tugasTambahan && g.tugasTambahan !== '-' ? 12 : 0;
                  const total = jtmWajib + ekuiv;
                  return (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-1.5 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-1.5">
                        <span className="font-bold text-slate-950 block">{g.nama}</span>
                        <span className="font-mono text-[10px] text-slate-600">NIP: {g.nip || '-'}</span>
                      </td>
                      <td className="border border-slate-300 p-1.5 text-center">{g.pangkatGol || 'Penata / III.c'}</td>
                      <td className="border border-slate-300 p-1.5 font-medium">{g.mapel || g.mapelUtama || 'Guru Kelas'}</td>
                      <td className="border border-slate-300 p-1.5 text-center font-semibold text-emerald-950">
                        {g.waliKelas || g.waliKelasDi || 'Fase A-C'}
                      </td>
                      <td className="border border-slate-300 p-1.5 text-center font-mono">{jtmWajib}</td>
                      <td className="border border-slate-300 p-1.5">{g.tugasTambahan || '-'}</td>
                      <td className="border border-slate-300 p-1.5 text-center font-mono">{ekuiv || '-'}</td>
                      <td className="border border-slate-300 p-1.5 text-center font-mono font-bold text-emerald-900">
                        {total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pengesahan Lampiran */}
          <div className="pt-2 flex justify-end">
            <div className="w-64 sm:w-72 text-left text-xs space-y-1">
              <p className="font-bold uppercase text-slate-900">
                KEPALA {namaMadrasahUpper},
              </p>
              <div className="h-12 flex items-center">
                {kamadSigner.isSigned && (
                  <span className="text-[10px] font-mono font-semibold text-emerald-800">
                    [TTE Kepala Madrasah Sah]
                  </span>
                )}
              </div>
              <p className="font-bold text-slate-950 underline">{kamadSigner.name || profile.namaKepala}</p>
              {kamadSigner.nip && <p className="font-mono text-[10px] text-slate-700">NIP. {kamadSigner.nip}</p>}
            </div>
          </div>
        </div>
      )}

      {/* LAMPIRAN: SK_TIM_TPK (TIM PENGEMBANG KURIKULUM MADRASAH) */}
      {type === 'SK_TIM_TPK' && (
        <div className="pt-8 border-t-2 border-slate-400 space-y-6 font-sans">
          <div className="text-xs space-y-1">
            <p className="font-bold uppercase">LAMPIRAN I :</p>
            <p className="font-bold uppercase">KEPUTUSAN KEPALA {namaMadrasahUpper}</p>
            <p className="font-mono">NOMOR : {document.nomorSurat}</p>
            <p className="font-mono">TANGGAL : {document.tanggalSurat}</p>
            <p className="font-bold uppercase pt-1">
              TENTANG : SUSUNAN TIM PENGEMBANG KURIKULUM OPERASIONAL MADRASAH (TPK) TAHUN PELAJARAN {document.tahunAjaran}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-slate-400 border-collapse">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="border border-slate-400 p-2 w-8 text-center">No</th>
                  <th className="border border-slate-400 p-2 text-left">Jabatan dalam Tim TPK</th>
                  <th className="border border-slate-400 p-2 text-left">Nama Lengkap & Gelar</th>
                  <th className="border border-slate-400 p-2 text-left">Jabatan Kedinasan</th>
                  <th className="border border-slate-400 p-2 text-left">Uraian Tugas Pokok</th>
                </tr>
              </thead>
              <tbody>
                {(contentData.susunanTim || []).map((t: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                    <td className="border border-slate-300 p-2 font-bold text-emerald-950">{t.jabatanTim}</td>
                    <td className="border border-slate-300 p-2 font-semibold">{t.nama}</td>
                    <td className="border border-slate-300 p-2 text-slate-700">{t.jabatanKedinasan}</td>
                    <td className="border border-slate-300 p-2 text-slate-700 text-[11px]">{t.tugas || t.peran || 'Merumuskan dan menyempurnakan dokumen kurikulum'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-end">
            <div className="w-64 sm:w-72 text-left text-xs space-y-1">
              <p className="font-bold uppercase text-slate-900">
                KEPALA {namaMadrasahUpper},
              </p>
              <div className="h-12 flex items-center">
                {kamadSigner.isSigned && (
                  <span className="text-[10px] font-mono font-semibold text-emerald-800">
                    [TTE Kepala Madrasah Sah]
                  </span>
                )}
              </div>
              <p className="font-bold text-slate-950 underline">{kamadSigner.name || profile.namaKepala}</p>
              {kamadSigner.nip && <p className="font-mono text-[10px] text-slate-700">NIP. {kamadSigner.nip}</p>}
            </div>
          </div>
        </div>
      )}

      {/* LAMPIRAN: SK_TIM_P5RA (TIM FASILITATOR KOKURIKULER / P5RA) */}
      {type === 'SK_TIM_P5RA' && (
        <div className="pt-8 border-t-2 border-slate-400 space-y-6 font-sans">
          <div className="text-xs space-y-1">
            <p className="font-bold uppercase">LAMPIRAN I :</p>
            <p className="font-bold uppercase">KEPUTUSAN KEPALA {namaMadrasahUpper}</p>
            <p className="font-mono">NOMOR : {document.nomorSurat}</p>
            <p className="font-mono">TANGGAL : {document.tanggalSurat}</p>
            <p className="font-bold uppercase pt-1">
              TENTANG : TIM FASILITATOR KOKURIKULER PROJEK PENGUATAN PROFIL PELAJAR PANCASILA DAN RAHMATAN LIL ALAMIN (P5RA)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-slate-400 border-collapse">
              <thead className="bg-slate-100 text-slate-900 font-bold">
                <tr>
                  <th className="border border-slate-400 p-2 w-8 text-center">No</th>
                  <th className="border border-slate-400 p-2 text-left">Posisi dalam Tim</th>
                  <th className="border border-slate-400 p-2 text-left">Nama Fasilitator</th>
                  <th className="border border-slate-400 p-2 text-left">Tema Projek & Sasaran Rombel</th>
                  <th className="border border-slate-400 p-2 text-left">Uraian Peran & Tanggung Jawab</th>
                </tr>
              </thead>
              <tbody>
                {(contentData.susunanTim || []).map((t: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                    <td className="border border-slate-300 p-2 font-bold text-emerald-950">{t.jabatanTim}</td>
                    <td className="border border-slate-300 p-2 font-semibold">{t.nama}</td>
                    <td className="border border-slate-300 p-2 text-slate-800">{t.tema || t.sasaran || 'Fase A-C'}</td>
                    <td className="border border-slate-300 p-2 text-slate-700 text-[11px]">{t.peran}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-end">
            <div className="w-64 sm:w-72 text-left text-xs space-y-1">
              <p className="font-bold uppercase text-slate-900">
                KEPALA {namaMadrasahUpper},
              </p>
              <div className="h-12 flex items-center">
                {kamadSigner.isSigned && (
                  <span className="text-[10px] font-mono font-semibold text-emerald-800">
                    [TTE Kepala Madrasah Sah]
                  </span>
                )}
              </div>
              <p className="font-bold text-slate-950 underline">{kamadSigner.name || profile.namaKepala}</p>
              {kamadSigner.nip && <p className="font-mono text-[10px] text-slate-700">NIP. {kamadSigner.nip}</p>}
            </div>
          </div>
        </div>
      )}

      {/* LAMPIRAN: SK_WALI_KELAS (WALI KELAS & PEMBINA EKSTRAKURIKULER) */}
      {type === 'SK_WALI_KELAS' && (
        <div className="pt-8 border-t-2 border-slate-400 space-y-6 font-sans">
          <div className="text-xs space-y-1">
            <p className="font-bold uppercase">LAMPIRAN I :</p>
            <p className="font-bold uppercase">KEPUTUSAN KEPALA {namaMadrasahUpper}</p>
            <p className="font-mono">NOMOR : {document.nomorSurat}</p>
            <p className="font-mono">TANGGAL : {document.tanggalSurat}</p>
            <p className="font-bold uppercase pt-1">
              TENTANG : PENETAPAN WALI KELAS DAN PEMBINA EKSTRAKURIKULER TAHUN PELAJARAN {document.tahunAjaran}
            </p>
          </div>

          {/* Bagian A: Wali Kelas */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase text-slate-900">
              A. DAFTAR ROMBONGAN BELAJAR DAN PENETAPAN WALI KELAS
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-slate-400 border-collapse">
                <thead className="bg-slate-100 text-slate-900 font-bold">
                  <tr>
                    <th className="border border-slate-400 p-2 w-8 text-center">No</th>
                    <th className="border border-slate-400 p-2 text-left">Rombongan Belajar</th>
                    <th className="border border-slate-400 p-2 text-left">Nama Wali Kelas</th>
                    <th className="border border-slate-400 p-2 text-left">NIP / NUPTK</th>
                    <th className="border border-slate-400 p-2 text-center">Ruang Kelas</th>
                    <th className="border border-slate-400 p-2 text-center">Jumlah Siswa</th>
                  </tr>
                </thead>
                <tbody>
                  {(contentData.waliKelasList || []).map((w: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-2 font-bold text-emerald-950">{w.rombel}</td>
                      <td className="border border-slate-300 p-2 font-semibold">{w.namaWali}</td>
                      <td className="border border-slate-300 p-2 font-mono text-slate-700">{w.nip || '-'}</td>
                      <td className="border border-slate-300 p-2 text-center text-slate-700">{w.ruang || `R.${idx + 1}`}</td>
                      <td className="border border-slate-300 p-2 text-center font-mono font-bold">{w.jumlahSiswa || 28}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian B: Pembina Ekskul */}
          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs uppercase text-slate-900">
              B. DAFTAR PEMBINA EKSTRAKURIKULER & PENGEMBANGAN DIRI
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-slate-400 border-collapse">
                <thead className="bg-slate-100 text-slate-900 font-bold">
                  <tr>
                    <th className="border border-slate-400 p-2 w-8 text-center">No</th>
                    <th className="border border-slate-400 p-2 text-left">Nama Ekstrakurikuler</th>
                    <th className="border border-slate-400 p-2 text-left">Kategori</th>
                    <th className="border border-slate-400 p-2 text-left">Nama Pembina</th>
                    <th className="border border-slate-400 p-2 text-left">Jadwal Latihan</th>
                    <th className="border border-slate-400 p-2 text-left">Tempat Latihan</th>
                  </tr>
                </thead>
                <tbody>
                  {(contentData.ekskulList || []).map((e: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-2 font-bold text-slate-900">{e.namaEkskul}</td>
                      <td className="border border-slate-300 p-2 text-slate-700 font-semibold">{e.kategori || (idx === 0 ? 'Wajib' : 'Pilihan')}</td>
                      <td className="border border-slate-300 p-2 font-medium">{e.pembina}</td>
                      <td className="border border-slate-300 p-2 text-slate-700">{e.jadwal}</td>
                      <td className="border border-slate-300 p-2 text-slate-700">{e.tempat || 'Halaman Madrasah'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <div className="w-64 sm:w-72 text-left text-xs space-y-1">
              <p className="font-bold uppercase text-slate-900">
                KEPALA {namaMadrasahUpper},
              </p>
              <div className="h-12 flex items-center">
                {kamadSigner.isSigned && (
                  <span className="text-[10px] font-mono font-semibold text-emerald-800">
                    [TTE Kepala Madrasah Sah]
                  </span>
                )}
              </div>
              <p className="font-bold text-slate-950 underline">{kamadSigner.name || profile.namaKepala}</p>
              {kamadSigner.nip && <p className="font-mono text-[10px] text-slate-700">NIP. {kamadSigner.nip}</p>}
            </div>
          </div>
        </div>
      )}

      {/* LAMPIRAN: SK_PPDB / SK_MATSAMA / SK_TPPK / SK_PANITIA_UJIAN / SK_TIM_BOS */}
      {(type === 'SK_PPDB' ||
        type === 'SK_MATSAMA' ||
        type === 'SK_TPPK' ||
        type === 'SK_PANITIA_UJIAN' ||
        type === 'SK_TIM_BOS') && (
        <div className="pt-8 border-t-2 border-slate-400 space-y-6 font-sans">
          <div className="text-xs space-y-1">
            <p className="font-bold uppercase">LAMPIRAN I :</p>
            <p className="font-bold uppercase">KEPUTUSAN KEPALA {namaMadrasahUpper}</p>
            <p className="font-mono">NOMOR : {document.nomorSurat}</p>
            <p className="font-mono">TANGGAL : {document.tanggalSurat}</p>
            <p className="font-bold uppercase pt-1">
              TENTANG : {skTitleUpper}
            </p>
          </div>

          {/* Tabel Susunan Panitia / Tim */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase text-slate-900">
              STRUKTUR & SUSUNAN PELAKSANA / PANITIA
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-slate-400 border-collapse">
                <thead className="bg-slate-100 text-slate-900 font-bold">
                  <tr>
                    <th className="border border-slate-400 p-2 w-8 text-center">No</th>
                    <th className="border border-slate-400 p-2 text-left">Jabatan dalam Tim / Panitia</th>
                    <th className="border border-slate-400 p-2 text-left">Nama Lengkap</th>
                    <th className="border border-slate-400 p-2 text-left">Unsur / Jabatan Kedinasan</th>
                    <th className="border border-slate-400 p-2 text-left">Uraian Tugas Pokok</th>
                  </tr>
                </thead>
                <tbody>
                  {(contentData.susunanPanitia || contentData.susunanTim || []).map(
                    (item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                        <td className="border border-slate-300 p-2 font-bold text-emerald-950">
                          {item.jabatanPanitia || item.jabatanTim}
                        </td>
                        <td className="border border-slate-300 p-2 font-semibold">{item.nama}</td>
                        <td className="border border-slate-300 p-2 text-slate-700">
                          {item.unsur || item.jabatanKedinasan || 'Pendidik'}
                        </td>
                        <td className="border border-slate-300 p-2 text-slate-700 text-[11px]">
                          {item.tugas || item.peran || 'Melaksanakan tugas sesuai juknis resmi Kemenag'}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail Khusus Jadwal / Mekanisme jika ada */}
          {contentData.jadwalKegiatan && (
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-xs uppercase text-slate-900">
                JADWAL & TAHAPAN PELAKSANAAN KEGIATAN
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-slate-400 border-collapse">
                  <thead className="bg-slate-100 text-slate-900 font-bold">
                    <tr>
                      <th className="border border-slate-400 p-2 w-8 text-center">No</th>
                      <th className="border border-slate-400 p-2 text-left">Tahapan Kegiatan</th>
                      <th className="border border-slate-400 p-2 text-left">Waktu Pelaksanaan</th>
                      <th className="border border-slate-400 p-2 text-left">Keterangan / Tempat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentData.jadwalKegiatan.map((j: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                        <td className="border border-slate-300 p-2 font-semibold">{j.tahap}</td>
                        <td className="border border-slate-300 p-2 text-slate-700">{j.waktu}</td>
                        <td className="border border-slate-300 p-2 text-slate-700">{j.keterangan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <div className="w-64 sm:w-72 text-left text-xs space-y-1">
              <p className="font-bold uppercase text-slate-900">
                KEPALA {namaMadrasahUpper},
              </p>
              <div className="h-12 flex items-center">
                {kamadSigner.isSigned && (
                  <span className="text-[10px] font-mono font-semibold text-emerald-800">
                    [TTE Kepala Madrasah Sah]
                  </span>
                )}
              </div>
              <p className="font-bold text-slate-950 underline">{kamadSigner.name || profile.namaKepala}</p>
              {kamadSigner.nip && <p className="font-mono text-[10px] text-slate-700">NIP. {kamadSigner.nip}</p>}
            </div>
          </div>
        </div>
      )}

      {/* LAMPIRAN: SK_KKTP_KELULUSAN (KRITERIA KETUNTASAN & KELULUSAN) */}
      {type === 'SK_KKTP_KELULUSAN' && (
        <div className="pt-8 border-t-2 border-slate-400 space-y-6 font-sans">
          <div className="text-xs space-y-1">
            <p className="font-bold uppercase">LAMPIRAN I :</p>
            <p className="font-bold uppercase">KEPUTUSAN KEPALA {namaMadrasahUpper}</p>
            <p className="font-mono">NOMOR : {document.nomorSurat}</p>
            <p className="font-mono">TANGGAL : {document.tanggalSurat}</p>
            <p className="font-bold uppercase pt-1">
              TENTANG : PENETAPAN KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP), KENAIKAN KELAS, DAN KELULUSAN
            </p>
          </div>

          {/* Bagian A: Interval Nilai KKTP */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase text-slate-900">
              A. INTERVAL KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP) FASE A, B, DAN C
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-slate-400 border-collapse">
                <thead className="bg-slate-100 text-slate-900 font-bold">
                  <tr>
                    <th className="border border-slate-400 p-2 w-8 text-center">No</th>
                    <th className="border border-slate-400 p-2 text-center w-32">Interval Nilai</th>
                    <th className="border border-slate-400 p-2 text-left">Predikat / Kategori</th>
                    <th className="border border-slate-400 p-2 text-left">Intervensi & Tindak Lanjut Pedagogik</th>
                  </tr>
                </thead>
                <tbody>
                  {(contentData.rentangNilai || []).map((r: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                      <td className="border border-slate-300 p-2 text-center font-bold text-emerald-950 font-mono">
                        {r.interval}
                      </td>
                      <td className="border border-slate-300 p-2 font-semibold">{r.kategori || r.kriteria}</td>
                      <td className="border border-slate-300 p-2 text-slate-700 text-[11px]">{r.tindakLanjut || r.kriteria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bagian B: Kriteria Kenaikan Kelas */}
          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs uppercase text-slate-900">
              B. KRITERIA KENAIKAN KELAS PESERTA DIDIK
            </h4>
            <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-800 text-justify">
              {(contentData.kriteriaKenaikan || []).map((k: string, idx: number) => (
                <li key={idx} className="leading-relaxed">
                  {k}
                </li>
              ))}
            </ol>
          </div>

          {/* Bagian C: Kriteria Kelulusan */}
          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-xs uppercase text-slate-900">
              C. KRITERIA KELULUSAN DARI SATUAN PENDIDIKAN (KELAS VI)
            </h4>
            <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-800 text-justify">
              {(contentData.kriteriaKelulusan || [
                'Menyelesaikan seluruh program pembelajaran dari kelas 1 sampai dengan kelas 6.',
                'Memperoleh nilai sikap/perilaku minimal BAIK pada seluruh semester.',
                'Mengikuti Asesmen Madrasah (AM) yang diselenggarakan oleh madrasah untuk seluruh mata pelajaran yang diujikan.',
                'Lulus ujian praktik keagamaan (Baca Tulis Al-Qur\'an, Praktik Ibadah Shalat, dan Hafalan Juz Amma).',
              ]).map((k: string, idx: number) => (
                <li key={idx} className="leading-relaxed">
                  {k}
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-2 flex justify-end">
            <div className="w-64 sm:w-72 text-left text-xs space-y-1">
              <p className="font-bold uppercase text-slate-900">
                KEPALA {namaMadrasahUpper},
              </p>
              <div className="h-12 flex items-center">
                {kamadSigner.isSigned && (
                  <span className="text-[10px] font-mono font-semibold text-emerald-800">
                    [TTE Kepala Madrasah Sah]
                  </span>
                )}
              </div>
              <p className="font-bold text-slate-950 underline">{kamadSigner.name || profile.namaKepala}</p>
              {kamadSigner.nip && <p className="font-mono text-[10px] text-slate-700">NIP. {kamadSigner.nip}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
