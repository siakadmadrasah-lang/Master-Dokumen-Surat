import React from 'react';
import { KomPageContainer } from './KomPageContainer';
import { KemenagLogo, MaarifNuLogo } from '../../OfficialLogos';
import { KomCintaData } from '../../../data/komCintaDefaultData';

interface Props {
  data: KomCintaData;
}

export const KomFrontMatterPages: React.FC<Props> = ({ data }) => {
  return (
    <>
      {/* =========================================================================
          PAGE 1 (Hal. i) - HALAMAN SAMPUL / COVER
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-cover" pageNumber="i" pageIndex={1} isCover>
        <div className="flex-1 flex flex-col justify-between items-center text-center py-4 sm:py-6 border-4 border-double border-emerald-950 p-6 sm:p-10 rounded-xl bg-gradient-to-b from-emerald-50/30 via-white to-emerald-50/40">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase font-serif tracking-tight text-slate-950 leading-tight">
              KURIKULUM
            </h1>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase font-serif tracking-wide text-emerald-950">
              {data.namaMadrasah}
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-800 tracking-wider">
              SESUAI KMA 1503 TAHUN 2025
            </p>
          </div>

          <div className="my-8 flex items-center justify-center gap-10">
            <div className="flex flex-col items-center">
              <KemenagLogo className="w-28 h-28 sm:w-32 sm:h-32" />
            </div>
            <div className="flex flex-col items-center">
              <MaarifNuLogo className="w-28 h-28 sm:w-32 sm:h-32" />
            </div>
          </div>

          <div className="w-full max-w-md text-left font-bold text-xs sm:text-[13px] space-y-1 text-slate-900 border-t border-b border-emerald-900/30 py-3">
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5">NAMA</span>
              <span className="col-span-7">: {data.namaMadrasah.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5">NSM</span>
              <span className="col-span-7">: {data.nsm}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5">NPSN</span>
              <span className="col-span-7">: {data.npsn}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5">STATUS AKREDITASI</span>
              <span className="col-span-7">: {data.statusAkreditasi}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5">TAHUN AJARAN</span>
              <span className="col-span-7">: {data.tahunAjaran}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-5">ALAMAT</span>
              <span className="col-span-7">: {data.alamat}</span>
            </div>
          </div>

          <div className="pt-8 space-y-0.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-serif">
            <p>KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
            <p>KEMENTERIAN AGAMA KABUPATEN {data.kabupaten.toUpperCase()}</p>
            <p>{data.namaMadrasah.toUpperCase()}</p>
            <p>{data.tahunAjaran}</p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 2 (Hal. ii) - SURAT PERMOHONAN PENGESAHAN
          ========================================================================= */}
      <KomPageContainer pageNumber="ii" pageIndex={2}>
        {/* KOP LP MA'ARIF */}
        <div className="border-b-[3px] border-double border-slate-900 pb-3 flex items-center justify-between gap-4">
          <MaarifNuLogo className="w-20 h-20 flex-shrink-0" />
          <div className="text-center flex-1 space-y-0.5">
            <p className="text-[12px] font-bold tracking-wider text-slate-800 uppercase">
              LEMBAGA PENDIDIKAN MA'ARIF NU CABANG {data.kabupaten.toUpperCase()}
            </p>
            <p className="text-[10.5px] text-slate-700">
              AKTE NOTARIS MUNYATI SULAM, SH., MA. NO {data.aktaYayasan}
            </p>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-950 uppercase">
              {data.namaMadrasah}
            </h3>
            <p className="text-[11px] font-bold text-slate-900 uppercase">
              TERAKREDITASI {data.statusAkreditasi}
            </p>
            <p className="text-[10px] text-slate-700">
              Alamat : {data.alamat} - {data.kecamatan} - {data.kabupaten} Kode Pos 53073
            </p>
            <p className="text-[10px] text-slate-700">
              Website: {data.website} E-mail : {data.email}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-start pt-6 text-[12px]">
          <div className="space-y-1">
            <p><span className="w-24 inline-block">Nomor</span>: {data.nomorSuratPermohonan}</p>
            <p><span className="w-24 inline-block">Lampiran</span>: 1 Bendel</p>
            <p><span className="w-24 inline-block">Perihal</span>: Permohonan Pengesahan</p>
            <p className="pl-24">Kurikulum {data.namaMadrasah}</p>
          </div>
          <div className="text-right">
            <p>{data.desa}, {data.tanggalPermohonan}</p>
          </div>
        </div>

        <div className="pt-6 space-y-1 text-[12px]">
          <p>Kepada Yth</p>
          <p className="font-bold">Kepala Kantor Kementerian Agama Kab. {data.kabupaten}</p>
          <p>Up. Kasi Pendidikan Madrasah</p>
          <p>Di Tempat</p>
        </div>

        <div className="pt-5 space-y-3 text-[12px] leading-relaxed text-justify">
          <p className="italic font-serif">Assalamu’alaikum Wr. Wb.</p>
          <p className="indent-8">
            Sehubungan telah selesainya penyusunan dan pengembangan Kurikulum {data.namaMadrasah} Tahun Pelajaran {data.tahunAjaran}, maka dengan ini kami mohon kiranya bapak dapat mengesahkan Kurikulum Madrasah dimaksud.
          </p>
          <p className="indent-8">
            Sebagai bahan pertimbangan bersama ini kami sertakan Kurikulum Madrasah {data.namaMadrasah} yang telah selesai kami susun.
          </p>
          <p className="indent-8">
            Demikian permohonan ini, atas berkenannya kami ucapkan terima kasih.
          </p>
          <p className="italic font-serif pt-2">Wassalaamu’alaikum Wr Wb.</p>
        </div>

        <div className="pt-8 flex justify-end">
          <div className="text-left w-56 space-y-1">
            <p>Kepala Madrasah</p>
            <div className="h-16 flex items-center font-serif text-slate-400 italic text-xs">
              (Tanda Tangan)
            </div>
            <p className="font-bold underline text-slate-950">{data.namaKepala}</p>
            <p className="font-mono text-[11px] text-slate-700">NIP. {data.nipKepala || '-'}</p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 3 (Hal. iii) - REKOMENDASI PENGESAHAN KURIKULUM
          ========================================================================= */}
      <KomPageContainer pageNumber="iii" pageIndex={3}>
        {/* KOP LP MA'ARIF */}
        <div className="border-b-[3px] border-double border-slate-900 pb-3 flex items-center justify-between gap-4">
          <MaarifNuLogo className="w-20 h-20 flex-shrink-0" />
          <div className="text-center flex-1 space-y-0.5">
            <p className="text-[12px] font-bold tracking-wider text-slate-800 uppercase">
              LEMBAGA PENDIDIKAN MA'ARIF NU CABANG {data.kabupaten.toUpperCase()}
            </p>
            <p className="text-[10.5px] text-slate-700">
              AKTE NOTARIS MUNYATI SULAM, SH., MA. NO {data.aktaYayasan}
            </p>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-950 uppercase">
              {data.namaMadrasah}
            </h3>
            <p className="text-[11px] font-bold text-slate-900 uppercase">
              TERAKREDITASI {data.statusAkreditasi}
            </p>
            <p className="text-[10px] text-slate-700">
              Alamat : {data.alamat} - {data.kecamatan} - {data.kabupaten} Kode Pos 53073
            </p>
            <p className="text-[10px] text-slate-700">
              Website: {data.website} E-mail : {data.email}
            </p>
          </div>
        </div>

        <div className="text-center pt-8 space-y-1">
          <h2 className="font-bold text-sm sm:text-base uppercase tracking-wide text-slate-950">
            REKOMENDASI PENGESAHAN KURIKULUM
          </h2>
          <h3 className="font-bold text-sm sm:text-base uppercase tracking-wide text-slate-950">
            {data.namaMadrasah.toUpperCase()}
          </h3>
          <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wide text-slate-950">
            KECAMATAN {data.kecamatan.toUpperCase()} KABUPATEN {data.kabupaten.toUpperCase()}
          </h4>
          <p className="font-bold text-xs sm:text-sm text-slate-900">
            TAHUN AJARAN {data.tahunAjaran}
          </p>
        </div>

        <div className="pt-8 space-y-4 text-[12px] leading-relaxed text-justify">
          <p className="indent-8">
            Setelah dilakukan validasi dengan instrumen validasi yang telah disesuaikan dengan regulasi yang berlaku, maka Rancangan Kurikulum pada :
          </p>

          <div className="pl-8 space-y-1.5 font-medium">
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-4">Nama Madrasah</span>
              <span className="col-span-8">: {data.namaMadrasah}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-4">Alamat</span>
              <span className="col-span-8">: {data.alamat}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-4">Tahun Pelajaran</span>
              <span className="col-span-8">: {data.tahunAjaran}</span>
            </div>
          </div>

          <p>
            dapat direkomendasikan untuk mendapat pengesahan sebagai pedoman penyelenggaraan pendidikan pada madrasah tersebut pada Tahun Pelajaran {data.tahunAjaran} sesuai dengan ketentuan peraturan perudangan-undangan yang berlaku.
          </p>
        </div>

        <div className="pt-12 flex justify-end">
          <div className="text-left w-64 space-y-1 text-[12px]">
            <p>{data.desa}, {data.tanggalRekomendasi}</p>
            <p className="font-semibold">Pengawas Pembina,</p>
            <div className="h-16 flex items-center font-serif text-slate-400 italic text-xs">
              (Tanda Tangan & Stempel)
            </div>
            <p className="font-bold underline text-slate-950">{data.namaPengawas}</p>
            <p className="font-mono text-[11px] text-slate-700">NIP. {data.nipPengawas}</p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 4 (Hal. iv) - LEMBAR PENGESAHAN
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-pengesahan" pageNumber="iv" pageIndex={4}>
        {/* KOP LP MA'ARIF */}
        <div className="border-b-[3px] border-double border-slate-900 pb-3 flex items-center justify-between gap-4">
          <MaarifNuLogo className="w-20 h-20 flex-shrink-0" />
          <div className="text-center flex-1 space-y-0.5">
            <p className="text-[12px] font-bold tracking-wider text-slate-800 uppercase">
              LEMBAGA PENDIDIKAN MA'ARIF NU CABANG {data.kabupaten.toUpperCase()}
            </p>
            <p className="text-[10.5px] text-slate-700">
              AKTE NOTARIS MUNYATI SULAM, SH., MA. NO {data.aktaYayasan}
            </p>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-950 uppercase">
              {data.namaMadrasah}
            </h3>
            <p className="text-[11px] font-bold text-slate-900 uppercase">
              TERAKREDITASI {data.statusAkreditasi}
            </p>
            <p className="text-[10px] text-slate-700">
              Alamat : {data.alamat} - {data.kecamatan} - {data.kabupaten} Kode Pos 53073
            </p>
            <p className="text-[10px] text-slate-700">
              Website: {data.website} E-mail : {data.email}
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <h2 className="font-bold text-sm sm:text-base uppercase tracking-wider text-slate-950 underline underline-offset-4">
            LEMBAR PENGESAHAN
          </h2>
        </div>

        <div className="pt-4 space-y-1 text-[12px]">
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">Nama Madrasah</span>
            <span className="col-span-8">: {data.namaMadrasah}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">NSM</span>
            <span className="col-span-8 font-mono">: {data.nsm}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">NPSN</span>
            <span className="col-span-8 font-mono">: {data.npsn}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4">Alamat</span>
            <span className="col-span-8">: {data.alamat}</span>
          </div>
          <div className="grid grid-cols-12 gap-1">
            <span className="col-span-4"></span>
            <span className="col-span-8 pl-2">Kecamatan {data.kecamatan} Kabupaten {data.kabupaten}</span>
          </div>
        </div>

        <p className="pt-4 text-[12px] leading-relaxed text-justify">
          Pada tanggal, {data.tanggalPengesahan} disahkan sebagai Dokumen Kurikulum Madrasah di {data.namaMadrasah} Kecamatan {data.kecamatan} Kabupaten {data.kabupaten} pada Tahun Pelajaran {data.tahunAjaran}.
        </p>

        <div className="pt-4 flex justify-end text-[12px]">
          <div className="text-left w-56 space-y-0.5">
            <p>Ditetapkan di : {data.desa}</p>
            <p>Pada tanggal : {data.tanggalPengesahan}</p>
          </div>
        </div>

        <div className="pt-6 flex justify-between items-start text-[12px]">
          <div className="text-center w-52 space-y-1">
            <p>Menyetujui</p>
            <p className="font-bold">Ketua Komite Madrasah</p>
            <div className="h-16 flex items-center justify-center font-serif text-slate-400 italic text-xs">
              (Tanda Tangan)
            </div>
            <p className="font-bold text-slate-950 underline">{data.namaKetuaKomite}</p>
          </div>

          <div className="text-center w-52 space-y-1">
            <p>&nbsp;</p>
            <p className="font-bold">Kepala Madrasah</p>
            <div className="h-16 flex items-center justify-center font-serif text-slate-400 italic text-xs">
              (Tanda Tangan & Stempel)
            </div>
            <p className="font-bold text-slate-950 underline">{data.namaKepala}</p>
            <p className="font-mono text-[11px] text-slate-700">NIP. {data.nipKepala || '-'}</p>
          </div>
        </div>

        <div className="pt-6 text-center space-y-1 text-[12px]">
          <p>Mengetahui</p>
          <p className="font-bold">Kasi Pendidikan Madrasah</p>
          <p className="font-bold">Kantor Kementerian Agama Kabupaten {data.kabupaten}</p>
          <div className="h-16 flex items-center justify-center font-serif text-slate-400 italic text-xs">
            (Tanda Tangan & Stempel)
          </div>
          <p className="font-bold text-slate-950 underline">{data.namaKasiPenma}</p>
          <p className="font-mono text-[11px] text-slate-700">NIP. {data.nipKasiPenma}</p>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 5 (Hal. v) - KATA PENGANTAR
          ========================================================================= */}
      <KomPageContainer pageNumber="v" pageIndex={5}>
        <div className="text-center pt-2 pb-4">
          <h2 className="font-bold text-sm sm:text-base uppercase tracking-wider text-slate-950">
            KATA PENGANTAR
          </h2>
        </div>

        <div className="space-y-3.5 text-[12px] leading-relaxed text-justify">
          <p className="font-serif italic font-semibold text-center text-slate-800">
            Bismillahirrohmaanirrohiim
          </p>
          <p className="indent-8">
            Alhamdulillah, puji syukur kita panjatkan ke hadirat Allah Swt. yang telah melimpahkan rahmat, taufik, dan hidayah-Nya sehingga kami dapat menyusun dokumen Kurikulum Operasional Madrasah ini dengan sebaik-baiknya. Kurikulum ini disusun berdasarkan Kepmendikbudristek Nomor 56/M/2022 tentang Pedoman Penerapan Kurikulum dalam Rangka Pemulihan Pembelajaran, KMA Nomor 1503 Tahun 2025 tentang Penguatan Kurikulum Nasional, Pembelajaran Mendalam, dan Kurikulum Berbasis Cinta, serta Kepdirjen Pendis Nomor 9941 Tahun 2025 tentang Penetapan Capaian pendidikan (CP) untuk mata pelajaran Pendidikan Agama Islam (PAI) dan Bahasa Arab.
          </p>
          <p className="indent-8">
            {data.namaMadrasah} berkomitmen penuh untuk melaksanakan Kurikulum Merdeka secara menyeluruh dari kelas I hingga kelas VI pada Tahun Pelajaran {data.tahunAjaran}. Kurikulum ini disusun sesuai amanat Permendikbud Nomor 81A Tahun 2013, bahwa setiap satuan pendidikan berhak menyusun dan mengembangkan kurikulum operasionalnya sendiri berdasarkan Peraturan Menteri Pendidikan Dasar dan Menengah Republik Indonesia Nomor 10 Tahun 2025 tentang Standar Kompetensi Lulusan.
          </p>
          <p className="indent-8">
            Salah satu pendekatan utama yang kami integrasikan dalam kurikulum ini adalah <strong>Implementasi Kurikulum Berbasis Cinta</strong> yakni kurikulum yang berlandaskan pada nilai kasih sayang, empati, dan welas asih sebagai fondasi pembentukan karakter peserta didik. Pendekatan ini diharapkan mampu menumbuhkan suasana belajar yang menyenangkan, aman, dan inklusif bagi seluruh warga madrasah.
          </p>
          <p className="indent-8">
            Selain itu, <strong>pembelajaran mendalam (deep learning)</strong> menjadi strategi penting dalam pembelajaran di {data.namaMadrasah}. Dengan mengedepankan pemahaman yang bermakna, refleksi kritis, dan koneksi antarkonsep, pembelajaran di madrasah ini diarahkan tidak hanya untuk menghafal informasi, tetapi juga mengasah keterampilan berpikir tingkat tinggi dan membentuk pribadi yang mandiri serta berkarakter.
          </p>
          <p className="indent-8">
            Dokumen kurikulum ini menjadi cerminan dari semangat madrasah dalam menjawab tantangan zaman dengan tetap berpijak pada nilai-nilai keislaman dan kearifan lokal. Dengan otonomi pengembangan kurikulum, madrasah diberi ruang untuk kreatif, inovatif, serta adaptif terhadap perubahan sosial, budaya, teknologi, dan kebutuhan masyarakat.
          </p>
          <p className="indent-8">
            Akhir kata, kami menyampaikan terima kasih kepada seluruh pihak yang telah mendukung tersusunnya dokumen ini. Semoga kurikulum ini menjadi pedoman yang efektif dalam mewujudkan pendidikan yang rahmatan lil ‘alamin di {data.namaMadrasah}.
          </p>
          <p className="italic font-serif">Wassalamu’alaikum warahmatullahi wabarakatuh.</p>
        </div>

        <div className="pt-6 flex justify-end">
          <div className="text-center w-48 text-[12px]">
            <p>Tim Penyusun</p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 6 (Hal. vi) - DAFTAR ISI
          ========================================================================= */}
      <KomPageContainer pageNumber="vi" pageIndex={6}>
        <div className="text-center pt-2 pb-4">
          <h2 className="font-bold text-sm sm:text-base uppercase tracking-wider text-slate-950">
            DAFTAR ISI
          </h2>
        </div>

        <div className="space-y-1.5 text-[11.5px] font-sans">
          <div className="flex justify-between items-baseline">
            <span>HALAMAN SAMPUL</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">i</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>LEMBAR REKOMENDASI PENGESAHAN</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">iii</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>LEMBAR PENGESAHAN</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">iv</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>KATA PENGANTAR</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">v</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>DAFTAR ISI</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">vi</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>DAFTAR TABEL</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">vii</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>DAFTAR GAMBAR</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">viii</span>
          </div>

          {/* BAB I */}
          <div className="flex justify-between items-baseline font-bold pt-2">
            <span>BAB I ANALISIS KARAKTERISTIK MADRASAH</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">1</span>
          </div>
          <div className="pl-6 space-y-1 text-slate-800">
            <div className="flex justify-between items-baseline">
              <span>A. Karakteristik Madrasah</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">1</span>
            </div>
            <div className="pl-4 space-y-0.5 text-slate-700">
              <div className="flex justify-between items-baseline">
                <span>1. Profil Madrasah</span>
                <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
                <span className="font-mono">1</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>2. Karakteristik Madrasah</span>
                <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
                <span className="font-mono">3</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>3. Kekhasan / Keunggulan Madrasah</span>
                <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
                <span className="font-mono">5</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>4. Peta Profil Pendidik, Tenaga Kependidikan, Peserta Didik Dan Orang Tua di Madrasah</span>
                <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
                <span className="font-mono">8</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>5. Kemitraan / Kerjasama Madrasah dengan Pihak Lain</span>
                <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
                <span className="font-mono">17</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline">
              <span>B. Landasan Hukum Pengembangan Kurikulum Madrasah</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">18</span>
            </div>
          </div>

          {/* BAB II */}
          <div className="flex justify-between items-baseline font-bold pt-2">
            <span>BAB II VISI, MISI, TUJUAN, SERTA TARGET PENDIDIKAN DI MADRASAH</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">13</span>
          </div>
          <div className="pl-6 space-y-0.5 text-slate-800">
            <div className="flex justify-between items-baseline">
              <span>A. Visi {data.namaMadrasah}</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">13</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>B. Misi {data.namaMadrasah}</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">13</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>C. Tujuan Pendidikan {data.namaMadrasah}</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">14</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>D. Target Madrasah</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">15</span>
            </div>
          </div>

          {/* BAB III */}
          <div className="flex justify-between items-baseline font-bold pt-2">
            <span>BAB III PENGORGANISASIAN PEMBELAJARAN</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">17</span>
          </div>
          <div className="pl-6 space-y-0.5 text-slate-800">
            <div className="flex justify-between items-baseline">
              <span>A. Intrakurikuler</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">17</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>B. Kokurikuler</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">24</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>C. Ekstrakurikuler</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">26</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>D. Kegiatan Pembiasaan</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">28</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>E. Kalender Pendidikan</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">29</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>F. Pengaturan Beban Belajar dan Jadwal Pelajaran</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">31</span>
            </div>
          </div>

          {/* BAB IV */}
          <div className="flex justify-between items-baseline font-bold pt-2">
            <span>BAB IV PERENCANAAN PEMBELAJARAN</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">35</span>
          </div>
          <div className="pl-6 space-y-0.5 text-slate-800">
            <div className="flex justify-between items-baseline">
              <span>A. Perencanaan Pembelajaran Ruang Lingkup Satuan Pendidikan</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">35</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>B. Perencanaan Pembelajaran Ruang Lingkup Kelas</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">35</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>C. Strategi Pengelolaan Pembelajaran & Asesmen</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">36</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>D. Modul Ajar & Modul Projek Profil</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">37</span>
            </div>
          </div>

          {/* BAB V */}
          <div className="flex justify-between items-baseline font-bold pt-2">
            <span>BAB V PENDAMPINGAN, EVALUASI, DAN PENGEMBANGAN PROFESIONAL</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">43</span>
          </div>
          <div className="pl-6 space-y-0.5 text-slate-800">
            <div className="flex justify-between items-baseline">
              <span>A. Pendampingan</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">43</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>B. Evaluasi</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">44</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>C. Pengembangan Profesional</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">44</span>
            </div>
          </div>

          {/* BAB VI */}
          <div className="flex justify-between items-baseline font-bold pt-2">
            <span>BAB VI PENUTUP</span>
            <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
            <span className="font-mono">46</span>
          </div>
          <div className="pl-6 space-y-0.5 text-slate-800">
            <div className="flex justify-between items-baseline">
              <span>A. Harapan</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">46</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span>B. Saran</span>
              <span className="flex-1 border-b border-dotted border-slate-400 mx-2"></span>
              <span className="font-mono">46</span>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 7 (Hal. vii) - DAFTAR TABEL, DAFTAR GAMBAR & LAMPIRAN
          ========================================================================= */}
      <KomPageContainer pageNumber="vii" pageIndex={7}>
        <div className="space-y-4">
          <div>
            <div className="text-center pb-2 border-b border-slate-300">
              <h2 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-950 font-serif">
                DAFTAR TABEL
              </h2>
            </div>

            <div className="pt-2 space-y-1 text-[10.5px] font-sans text-slate-800">
              {[
                { no: '1.', title: 'Tabel 1.1 Program Unggulan Budaya Lokal (Tahfidzul Qur\'an)', page: '5' },
                { no: '2.', title: 'Tabel 1.2 Program Unggulan Global (Teknologi Informasi)', page: '6' },
                { no: '3.', title: 'Tabel 1.3 Program Unggulan Madrasah (Asrama Santri)', page: '7' },
                { no: '4.', title: 'Tabel 1.4 Program Unggulan Madrasah (Adiwiyata Ramah Lingkungan)', page: '7' },
                { no: '5.', title: 'Tabel 1.5 Data Kualifikasi Pendidik dan Tenaga Kependidikan', page: '8' },
                { no: '6.', title: 'Tabel 1.6 Rekapitulasi Siswa Tiga Tahun Terakhir', page: '9' },
                { no: '7.', title: 'Tabel 1.7 Rekapitulasi Tamatan Tiga Tahun Terakhir', page: '9' },
                { no: '8.', title: 'Tabel 1.8 Data Prestasi Madrasah', page: '9' },
                { no: '9.', title: 'Tabel 1.9 Rekapitulasi Rombongan Belajar', page: '10' },
                { no: '10.', title: 'Tabel 1.10 Rekapitulasi Pendidikan Orang Tua', page: '10' },
                { no: '11.', title: 'Tabel 1.11 Rekapitulasi Pekerjaan Orang Tua', page: '10' },
                { no: '12.', title: 'Tabel 3.1 Struktur Kurikulum Intrakurikuler', page: '17' },
                { no: '13.', title: 'Tabel 3.2 Asesmen Awal Pemilihan Mata Pelajaran Seni', page: '19' },
                { no: '14.', title: 'Tabel 3.3 Delapan Dimensi Profil Lulusan Madrasah', page: '23' },
                { no: '15.', title: 'Tabel 3.4 Struktur Kurikulum Kokurikuler (P5-RA)', page: '24' },
                { no: '16.', title: 'Tabel 3.5 Jadwal dan Pembina Ekstrakurikuler', page: '26' },
                { no: '17.', title: 'Tabel 3.6 Kegiatan Pembiasaan Panca Cinta', page: '28' },
                { no: '18.', title: 'Tabel 3.7 Analisis Pekan Belajar Efektif Semester I & II', page: '29' },
                { no: '19.', title: 'Tabel 3.8 Acuan Alokasi Waktu Belajar dan Waktu Libur', page: '31' },
                { no: '20.', title: 'Tabel 5.1 Program Pendampingan Kurikulum Berbasis Cinta', page: '43' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <span className="w-5 font-semibold text-slate-700">{item.no}</span>
                  <span className="flex-1 truncate pr-2">{item.title}</span>
                  <span className="flex-1 border-b border-dotted border-slate-300 mx-1"></span>
                  <span className="font-mono text-slate-900 font-semibold">{item.page}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="text-center pb-2 border-b border-slate-300">
              <h2 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-950 font-serif">
                DAFTAR GAMBAR
              </h2>
            </div>

            <div className="pt-2 space-y-1 text-[10.5px] font-sans text-slate-800">
              <div className="flex justify-between items-baseline">
                <span className="w-5 font-semibold text-slate-700">1.</span>
                <span className="flex-1">Gambar 1.1 Letak Wilayah dan Denah {data.namaMadrasah}</span>
                <span className="flex-1 border-b border-dotted border-slate-300 mx-1"></span>
                <span className="font-mono text-slate-900 font-semibold">2</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="w-5 font-semibold text-slate-700">2.</span>
                <span className="flex-1">Gambar 1.2 Bagan Analisis SOAR (Strengths, Opportunities, Aspirations, Results)</span>
                <span className="flex-1 border-b border-dotted border-slate-300 mx-1"></span>
                <span className="font-mono text-slate-900 font-semibold">3</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="w-5 font-semibold text-slate-700">3.</span>
                <span className="flex-1">Gambar 3.1 Delapan Dimensi Profil Lulusan {data.namaMadrasah}</span>
                <span className="flex-1 border-b border-dotted border-slate-300 mx-1"></span>
                <span className="font-mono text-slate-900 font-semibold">18</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-center pb-2 border-b border-slate-300">
              <h2 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-950 font-serif">
                DAFTAR LAMPIRAN
              </h2>
            </div>

            <div className="pt-2 space-y-1 text-[10.5px] font-sans text-slate-800">
              <div className="flex justify-between items-baseline">
                <span className="w-5 font-semibold text-slate-700">1.</span>
                <span className="flex-1">Lampiran I: Surat Keputusan Kepala Madrasah tentang Penetapan TPKM</span>
                <span className="flex-1 border-b border-dotted border-slate-300 mx-1"></span>
                <span className="font-mono text-slate-900 font-semibold">47</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="w-5 font-semibold text-slate-700">2.</span>
                <span className="flex-1">Lampiran II: Matriks Kalender Pendidikan Madrasah Tahun Pelajaran {data.tahunAjaran}</span>
                <span className="flex-1 border-b border-dotted border-slate-300 mx-1"></span>
                <span className="font-mono text-slate-900 font-semibold">49</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="w-5 font-semibold text-slate-700">3.</span>
                <span className="flex-1">Lampiran III: Alur Tujuan Pembelajaran (ATP) Fikih Fase A</span>
                <span className="flex-1 border-b border-dotted border-slate-300 mx-1"></span>
                <span className="font-mono text-slate-900 font-semibold">50</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="w-5 font-semibold text-slate-700">4.</span>
                <span className="flex-1">Lampiran IV: Lembar Observasi Iklim Kelas Berbasis Cinta (Supervisi KBC)</span>
                <span className="flex-1 border-b border-dotted border-slate-300 mx-1"></span>
                <span className="font-mono text-slate-900 font-semibold">51</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="w-5 font-semibold text-slate-700">5.</span>
                <span className="flex-1">Lampiran V: Berita Acara Rapat Kerja Review Kurikulum Madrasah</span>
                <span className="flex-1 border-b border-dotted border-slate-300 mx-1"></span>
                <span className="font-mono text-slate-900 font-semibold">52</span>
              </div>
            </div>
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
