import React from 'react';
import { KomPageContainer } from './KomPageContainer';
import { KomCintaData } from '../../../data/komCintaDefaultData';

interface Props {
  data: KomCintaData;
}

export const KomBab6AndLampiranPages: React.FC<Props> = ({ data }) => {
  return (
    <>
      {/* =========================================================================
          PAGE 1 (Hal. 46) - BAB VI PENUTUP (KESIMPULAN, SARAN & TANDA TANGAN LENGKAP)
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-bab6" pageNumber="46" pageIndex={46}>
        <div className="text-center pb-2 border-b border-slate-300">
          <h2 className="font-bold text-base sm:text-lg uppercase tracking-wide text-slate-950 font-serif">
            BAB VI<br />PENUTUP
          </h2>
        </div>

        <div className="pt-2 space-y-2 text-[11px] leading-relaxed text-justify">
          <h3 className="font-bold text-slate-950 text-xs sm:text-[12px]">
            A. Kesimpulan
          </h3>
          <p className="indent-8">
            Kurikulum Operasional Madrasah (KOM) Berbasis Cinta di {data.namaMadrasah} Tahun Pelajaran {data.tahunAjaran} disusun sebagai kompas moral dan pedoman operasional seluruh sivitas akademika. Berdasarkan penjabaran bab-bab terdahulu, dapat ditarik beberapa kesimpulan pokok:
          </p>

          <ol className="list-decimal pl-5 space-y-1 text-slate-800">
            <li>
              <strong>Pondasi Kurikulum Berbasis Cinta:</strong> Meletakkan cinta sebagai ruh dan paradigma utama pendidikan melalui Panca Cinta (Cinta Allah & Rasul, Cinta Ilmu, Cinta Sesama, Cinta Lingkungan, dan Cinta Tanah Air) demi mewujudkan lingkungan madrasah ramah anak yang aman dan menyenangkan.
            </li>
            <li>
              <strong>Pembelajaran Mendalam (Deep Learning):</strong> Pendekatan <em>Mindful, Meaningful</em>, dan <em>Joyful Learning</em> membebaskan anak dari tekanan hafalan semata, menumbuhkan nalar kritis, kesadaran spiritual, dan kecakapan hidup abad 21.
            </li>
            <li>
              <strong>Delapan Dimensi Profil Lulusan:</strong> Menjadi tolok ukur pembinaan karakter santri yang berakar kuat pada tradisi Ahlussunnah wal Jama'ah An-Nahdliyyah, berakhlak mulia, unggul prestasi, dan adaptif terhadap teknologi digital.
            </li>
          </ol>

          <div className="pt-1 space-y-1">
            <h3 className="font-bold text-slate-950 text-xs sm:text-[12px]">
              B. Saran dan Rekomendasi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
              <div className="p-1.5 bg-slate-50 border border-slate-300 rounded">
                <p><strong>1. Pendidik & Tendik:</strong> Senantiasa menjaga keikhlasan, kesabaran, dan keteladanan akhlak (<em>qudwah hasanah</em>) dalam membimbing santri dengan kelembutan.</p>
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-300 rounded">
                <p><strong>2. Komite & Wali Murid:</strong> Mempererat kemitraan segitiga emas (madrasah, keluarga, masyarakat) dalam mendukung pembiasaan ibadah anak di rumah.</p>
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-300 rounded">
                <p><strong>3. Kemenag & LP Ma'arif:</strong> Diharapkan senantiasa memberikan supervisi, arahan, dan dukungan pembinaan mutu bagi pendidik madrasah secara berkelanjutan.</p>
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-300 rounded">
                <p><strong>4. Tokoh Masyarakat:</strong> Mohon doa restu dan sinergi menjaga lingkungan desa yang kondusif, religius, dan ramah terhadap tumbuh kembang anak.</p>
              </div>
            </div>
          </div>

          <p className="indent-8 text-[10.5px] italic text-slate-700">
            Semoga Allah SWT senantiasa melimpahkan taufiq, inayah, dan keberkahan-Nya kepada segenap pengelola, guru, santri, dan keluarga besar {data.namaMadrasah}. Aamiin Yaa Rabbal 'Aalamiin.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4 text-center text-[10.5px]">
            <div className="space-y-0.5">
              <p className="text-slate-700">Mengetahui,</p>
              <p className="font-bold text-slate-900">Ketua Tim Pengembang Kurikulum,</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold text-slate-900 underline">{data.namaBidangKurikulum || 'Jaenal Maskun, S.Pd.I'}</p>
              <p className="text-[10px] text-slate-700">NIP. {data.nipBidangKurikulum || '197808152009011009'}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-slate-700">Ditetapkan di: {data.desa}</p>
              <p className="font-bold text-slate-900">Kepala {data.namaMadrasah},</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan & Cap Madrasah)</span>
              </div>
              <p className="font-bold text-slate-900 underline">{(data as any).namaKepalaMadrasah || data.namaKepala}</p>
              <p className="text-[10px] text-slate-700">NIP. {(data as any).nipKepalaMadrasah || data.nipKepala}</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 2 (Hal. 47) - LAMPIRAN I: SURAT KEPUTUSAN (SK) TPKM RESMI LENGKAP
          ========================================================================= */}
      <KomPageContainer id="kom-cinta-lampiran" pageNumber="47" pageIndex={47}>
        <div className="space-y-2 text-[10px] sm:text-[10.5px] leading-[1.45] text-slate-900 font-sans">
          {/* KOP SURAT RESMI */}
          <div className="text-center pb-1.5 border-b-2 border-slate-950">
            <h3 className="font-bold text-xs sm:text-[13px] uppercase text-slate-950 font-serif leading-tight">
              LEMBAGA PENDIDIKAN MA'ARIF NU KABUPATEN BANYUMAS<br />
              {data.namaMadrasah.toUpperCase()}
            </h3>
            <p className="text-[9.5px] text-slate-700 leading-tight mt-0.5">
              Alamat: {data.alamat}, Desa {data.desa}, Kec. {data.kecamatan}, Kab. {data.kabupaten} - Jawa Tengah
            </p>
          </div>
          <div className="border-b border-slate-700 -mt-1 mb-1"></div>

          {/* JUDUL SURAT KEPUTUSAN */}
          <div className="text-center pt-0.5 pb-1">
            <h4 className="font-bold text-[11px] sm:text-xs uppercase underline text-slate-950">
              SURAT KEPUTUSAN KEPALA {data.namaMadrasah.toUpperCase()}
            </h4>
            <p className="text-[10px] font-mono font-semibold text-slate-800">
              Nomor: 045/MI.M-2/SK-TPKM/VII/{data.tahunAjaran.split('/')[0]}
            </p>
            <p className="font-bold text-[10.5px] text-slate-900 uppercase leading-snug mt-0.5">
              TENTANG<br />
              PENETAPAN TIM PENGEMBANG KURIKULUM MADRASAH (TPKM)<br />
              TAHUN PELAJARAN {data.tahunAjaran}
            </p>
            <p className="font-bold text-[10px] text-slate-900 uppercase mt-0.5">
              DENGAN RAHMAT TUHAN YANG MAHA ESA<br />
              KEPALA {data.namaMadrasah.toUpperCase()},
            </p>
          </div>

          {/* KONSIDERANS */}
          <div className="space-y-1 text-justify text-slate-800">
            <table className="w-full border-collapse align-top text-[9.5px] sm:text-[10px]">
              <tbody>
                <tr>
                  <td className="w-20 font-bold align-top py-0.5">Menimbang</td>
                  <td className="w-2 align-top py-0.5">:</td>
                  <td className="py-0.5">
                    <ol className="list-[lower-alpha] pl-3.5 space-y-0.5 leading-snug">
                      <li>bahwa dalam rangka memperlancar perencanaan, penyusunan, implementasi, dan evaluasi Kurikulum Operasional Madrasah (KOM) Berbasis Cinta (KBC) serta Kurikulum Merdeka Tahun Pelajaran {data.tahunAjaran}, dipandang perlu menetapkan Tim Pengembang Kurikulum Madrasah;</li>
                      <li>bahwa pendidik dan tenaga kependidikan yang namanya tercantum dalam lampiran keputusan ini dinilai cakap, kompeten, dan memenuhi syarat untuk melaksanakan tugas pengembangan kurikulum;</li>
                      <li>bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan b, perlu menetapkan Surat Keputusan Kepala Madrasah tentang Tim Pengembang Kurikulum Madrasah (TPKM).</li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold align-top py-0.5">Mengingat</td>
                  <td className="align-top py-0.5">:</td>
                  <td className="py-0.5">
                    <ol className="list-decimal pl-3.5 space-y-0.5 leading-snug">
                      <li>Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;</li>
                      <li>Peraturan Pemerintah Nomor 57 Tahun 2021 jo. PP No. 4 Tahun 2022 tentang Standar Nasional Pendidikan;</li>
                      <li>Peraturan Menteri Agama Nomor 38 Tahun 2024 tentang Kurikulum Madrasah;</li>
                      <li>Keputusan Menteri Agama Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada Madrasah;</li>
                      <li>Keputusan Menteri Agama Nomor 1503 Tahun 2025 tentang Pedoman Kurikulum Madrasah Berbasis Cinta;</li>
                      <li>Keputusan Menteri Agama Nomor 9 Tahun 2016 tentang Tata Naskah Dinas Kementerian Agama.</li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold align-top py-0.5">Memperhatikan</td>
                  <td className="align-top py-0.5">:</td>
                  <td className="py-0.5 leading-snug">
                    Hasil Musyawarah Kerja Dewan Guru, Tenaga Kependidikan, dan Komite Madrasah {data.namaMadrasah} pada tanggal 10 Juli {data.tahunAjaran.split('/')[0]} tentang Penyusunan dan Pengembangan Kurikulum Madrasah.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* DIKTUM MEMUTUSKAN */}
          <div className="pt-0.5 space-y-1 text-[9.5px] sm:text-[10px]">
            <p className="text-center font-bold tracking-wider text-slate-950 uppercase">MEMUTUSKAN:</p>
            <table className="w-full border-collapse align-top text-justify">
              <tbody>
                <tr>
                  <td className="w-20 font-bold align-top py-0.5">Menetapkan</td>
                  <td className="w-2 align-top py-0.5">:</td>
                  <td className="py-0.5 font-bold text-slate-900 leading-snug">
                    KEPUTUSAN KEPALA {data.namaMadrasah.toUpperCase()} TENTANG PENETAPAN TIM PENGEMBANG KURIKULUM MADRASAH (TPKM) TAHUN PELAJARAN {data.tahunAjaran}.
                  </td>
                </tr>
                <tr>
                  <td className="font-bold align-top py-0.5">KESATU</td>
                  <td className="align-top py-0.5">:</td>
                  <td className="py-0.5 leading-snug">
                    Menetapkan dan mengesahkan Susunan Tim Pengembang Kurikulum Madrasah (TPKM) {data.namaMadrasah} Tahun Pelajaran {data.tahunAjaran} sebagaimana tercantum dalam Lampiran yang merupakan bagian tidak terpisahkan dari Keputusan ini.
                  </td>
                </tr>
                <tr>
                  <td className="font-bold align-top py-0.5">KEDUA</td>
                  <td className="align-top py-0.5">:</td>
                  <td className="py-0.5 leading-snug">
                    Tim Pengembang Kurikulum bertugas menyusun naskah Kurikulum Operasional Madrasah (KOM) Berbasis Cinta, menyelaraskan Capaian Pembelajaran (CP) dan Alur Tujuan Pembelajaran (ATP), merancang modul ajar intrakurikuler dan kokurikuler P5-RA, serta melakukan monev keterlaksanaan kurikulum secara berkala.
                  </td>
                </tr>
                <tr>
                  <td className="font-bold align-top py-0.5">KETIGA</td>
                  <td className="align-top py-0.5">:</td>
                  <td className="py-0.5 leading-snug">
                    Segala biaya yang timbul akibat diterbitkannya keputusan ini dibebankan pada anggaran Bantuan Operasional Sekolah (BOS) madrasah atau sumber dana lain yang sah dan sesuai ketentuan peraturan perundang-undangan.
                  </td>
                </tr>
                <tr>
                  <td className="font-bold align-top py-0.5">KEEMPAT</td>
                  <td className="align-top py-0.5">:</td>
                  <td className="py-0.5 leading-snug">
                    Keputusan ini mulai berlaku sejak tanggal ditetapkan, dan apabila di kemudian hari terdapat kekeliruan akan diadakan perbaikan sebagaimana mestinya.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* KAKI SK: TEMBUSAN & TITI MANGSA */}
          <div className="pt-2 flex justify-between items-end text-[9px] sm:text-[9.5px]">
            <div className="w-52 space-y-0.5 text-slate-800">
              <p className="font-bold underline text-slate-900">Tembusan Yth.:</p>
              <ol className="list-decimal pl-3 space-y-0.5">
                <li>Kepala Kantor Kemenag Kab. {data.kabupaten}</li>
                <li>Pengawas Madrasah Pembina Kec. {data.kecamatan}</li>
                <li>Ketua Pengurus BP3MNU / LP Ma'arif NU</li>
                <li>Ketua Komite {data.namaMadrasah}</li>
                <li>Yang bersangkutan untuk dilaksanakan</li>
                <li>Arsip</li>
              </ol>
            </div>

            <div className="text-center w-56 space-y-0.5">
              <p>Ditetapkan di: {data.desa}</p>
              <p>Pada tanggal: 14 Juli {data.tahunAjaran.split('/')[0]}</p>
              <p className="font-bold pt-0.5">Kepala {data.namaMadrasah},</p>
              <div className="h-10 flex items-center justify-center">
                <span className="text-[9px] text-slate-400 italic">(Tanda Tangan & Cap Stempel)</span>
              </div>
              <p className="font-bold text-slate-950 underline">{(data as any).namaKepalaMadrasah || data.namaKepala}</p>
              <p className="text-[9px] text-slate-800">NIP. {(data as any).nipKepalaMadrasah || data.nipKepala}</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 3 (Hal. 48) - LAMPIRAN I LANJUTAN: SUSUNAN PERSONALIA & RINCIAN TUGAS TPKM
          ========================================================================= */}
      <KomPageContainer pageNumber="48" pageIndex={48}>
        <div className="space-y-2.5 text-[10.5px] sm:text-[11px] leading-relaxed">
          {/* HEADER LAMPIRAN */}
          <div className="border-b border-slate-300 pb-1 text-[10px] text-slate-800">
            <p className="font-bold">
              LAMPIRAN SURAT KEPUTUSAN KEPALA {data.namaMadrasah.toUpperCase()}
            </p>
            <p>
              Nomor: 045/MI.M-2/SK-TPKM/VII/{data.tahunAjaran.split('/')[0]}
            </p>
            <p className="font-semibold text-slate-900">
              Tentang: Susunan dan Rincian Tugas Tim Pengembang Kurikulum Madrasah (TPKM) Tahun Pelajaran {data.tahunAjaran}
            </p>
          </div>

          <p className="font-bold text-slate-900 text-[10.5px]">
            A. Susunan Personalia Tim Pengembang Kurikulum Madrasah (TPKM)
          </p>

          <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
            <thead>
              <tr className="bg-slate-100 font-semibold text-slate-900">
                <th className="border border-slate-400 p-1 w-7 text-center">No</th>
                <th className="border border-slate-400 p-1 text-left">Nama / NIP</th>
                <th className="border border-slate-400 p-1 text-left w-36">Jabatan Pokok</th>
                <th className="border border-slate-400 p-1 text-left w-40">Jabatan dalam Tim</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 text-center font-bold">1</td>
                <td className="border border-slate-400 p-1 font-semibold">{(data as any).namaKepalaMadrasah || data.namaKepala}</td>
                <td className="border border-slate-400 p-1">Kepala Madrasah</td>
                <td className="border border-slate-400 p-1 font-bold text-emerald-900">Penanggung Jawab</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center font-bold">2</td>
                <td className="border border-slate-400 p-1 font-semibold">{(data as any).namaKomite || data.namaKetuaKomite}</td>
                <td className="border border-slate-400 p-1">Ketua Komite Madrasah</td>
                <td className="border border-slate-400 p-1 font-bold text-emerald-900">Penasehat / Pengarah</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center font-bold">3</td>
                <td className="border border-slate-400 p-1 font-semibold">{data.namaBidangKurikulum || 'Jaenal Maskun, S.Pd.I'}</td>
                <td className="border border-slate-400 p-1">Waka Kurikulum / Guru</td>
                <td className="border border-slate-400 p-1 font-bold">Ketua Tim Pengembang</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center font-bold">4</td>
                <td className="border border-slate-400 p-1 font-semibold">Ustadzah Siti Fatimah, S.Pd.</td>
                <td className="border border-slate-400 p-1">Guru Kelas I</td>
                <td className="border border-slate-400 p-1 font-bold">Sekretaris Tim</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center font-bold">5</td>
                <td className="border border-slate-400 p-1 font-semibold">Ustadzah Nur Hidayah, S.Pd.</td>
                <td className="border border-slate-400 p-1">Bendahara Madrasah</td>
                <td className="border border-slate-400 p-1 font-bold">Bendahara Tim</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center font-bold">6</td>
                <td className="border border-slate-400 p-1 font-semibold">Ustadz Muhammad Rizqi, S.Pd.</td>
                <td className="border border-slate-400 p-1">Guru PJOK & Pembina Ekstra</td>
                <td className="border border-slate-400 p-1">Koordinator P5-RA & Ekstra</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center font-bold">7</td>
                <td className="border border-slate-400 p-1 font-semibold">Ustadzah Anis Marsela, S.Pd.</td>
                <td className="border border-slate-400 p-1">Guru Kelas IV</td>
                <td className="border border-slate-400 p-1">Koordinator Asesmen & RDM</td>
              </tr>
            </tbody>
          </table>

          {/* B. RINCIAN TUGAS POKOK */}
          <div className="space-y-1 text-[10px] text-justify text-slate-800">
            <p className="font-bold text-slate-900 text-[10.5px]">
              B. Rincian Uraian Tugas Pokok Tim Pengembang Kurikulum
            </p>
            <ol className="list-decimal pl-4 space-y-0.5 leading-snug">
              <li><strong>Penanggung Jawab:</strong> Bertanggung jawab penuh atas seluruh kebijakan, perumusan, legalitas, dan pelaksanaan kurikulum di madrasah.</li>
              <li><strong>Penasehat/Pengarah:</strong> Memberikan pertimbangan, saran, serta menyelaraskan aspirasi wali santri dan komite madrasah.</li>
              <li><strong>Ketua Tim:</strong> Memimpin rapat teknis TPKM, mengoordinasikan penulisan Bab 1 s.d. Bab 6 dokumen KOM, serta menyusun kalender pendidikan.</li>
              <li><strong>Sekretaris:</strong> Mengadministrasikan seluruh notula rapat, berita acara, instrumen telaah kurikulum, dan pengesahan dokumen fisik/digital.</li>
              <li><strong>Bendahara:</strong> Mengelola alokasi anggaran rapat kerja, pengadaan bahan literatur kurikulum, dan sarana lokakarya guru.</li>
              <li><strong>Koordinator P5-RA & Ekstrakurikuler:</strong> Merancang modul tema P5-RA, jadwal blok mingguan, serta portofolio gelar karya kreasi santri.</li>
              <li><strong>Koordinator Asesmen & RDM:</strong> Mengawal pedoman kriteria kenaikan kelas, kelulusan, format rubrik rapor KBC, dan sinkronisasi RDM Kemenag.</li>
            </ol>
          </div>

          <div className="pt-2 flex justify-end text-xs">
            <div className="text-center w-56 space-y-0.5 text-[9.5px]">
              <p>Ditetapkan di: {data.desa}</p>
              <p>Pada tanggal: 14 Juli {data.tahunAjaran.split('/')[0]}</p>
              <p className="font-bold pt-0.5">Kepala {data.namaMadrasah},</p>
              <div className="h-10 flex items-center justify-center">
                <span className="text-[9px] text-slate-400 italic">(Cap & TTD)</span>
              </div>
              <p className="font-bold text-slate-950 underline">{(data as any).namaKepalaMadrasah || data.namaKepala}</p>
              <p className="text-[9px] text-slate-800">NIP. {(data as any).nipKepalaMadrasah || data.nipKepala}</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 4 (Hal. 49) - LAMPIRAN II: KALENDER PENDIDIKAN MATRIKS
          ========================================================================= */}
      <KomPageContainer pageNumber="49" pageIndex={49}>
        <div className="space-y-3 text-[11.5px] leading-relaxed">
          <div className="text-center pb-1">
            <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-950 font-serif">
              LAMPIRAN II: MATRIKS KALENDER PENDIDIKAN MADRASAH<br />
              TAHUN PELAJARAN {data.tahunAjaran}
            </h3>
          </div>

          <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-20 text-center">Bulan</th>
                <th className="border border-slate-400 p-1 text-center w-24">Rentang Tanggal</th>
                <th className="border border-slate-400 p-1 text-left">Uraian Kegiatan Pokok Madrasah</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Juli 2026</td>
                <td className="border border-slate-400 p-1 text-center">13 - 15 Juli 2026</td>
                <td className="border border-slate-400 p-1">Masa Ta'aruf Siswa Madrasah (MATSAMA) Santri Baru</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Agustus 2026</td>
                <td className="border border-slate-400 p-1 text-center">17 Agustus 2026</td>
                <td className="border border-slate-400 p-1">Peringatan Hari Kemerdekaan Republik Indonesia Ke-81</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">September 2026</td>
                <td className="border border-slate-400 p-1 text-center">21 - 26 Sept 2026</td>
                <td className="border border-slate-400 p-1">Pelaksanaan Asesmen Formatif Tengah Semester Ganjil</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Oktober 2026</td>
                <td className="border border-slate-400 p-1 text-center">22 Oktober 2026</td>
                <td className="border border-slate-400 p-1">Upacara Bendera & Peringatan Hari Santri Nasional</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">November 2026</td>
                <td className="border border-slate-400 p-1 text-center">09 - 21 Nov 2026</td>
                <td className="border border-slate-400 p-1">Pelaksanaan Blok Projek P5-RA Apotek Hidup & Gelar Karya</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Desember 2026</td>
                <td className="border border-slate-400 p-1 text-center">01 - 10 Des 2026<br />19 Des 2026</td>
                <td className="border border-slate-400 p-1">Sumatif Akhir Semester (SAS) Ganjil<br />Penyerahan Raport Digital Madrasah (RDM) Semester I</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Januari 2027</td>
                <td className="border border-slate-400 p-1 text-center">04 Januari 2027</td>
                <td className="border border-slate-400 p-1">Hari Pertama Masuk Sekolah Semester II (Genap)</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Maret 2027</td>
                <td className="border border-slate-400 p-1 text-center">10 - 24 Maret 2027</td>
                <td className="border border-slate-400 p-1">Libur Awal Ramadhan 1448 H & Kegiatan Pesantren Kilat</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">April 2027</td>
                <td className="border border-slate-400 p-1 text-center">05 - 17 April 2027</td>
                <td className="border border-slate-400 p-1">Libur Hari Raya Idul Fitri 1448 H & Halal bi Halal Santri</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Mei 2027</td>
                <td className="border border-slate-400 p-1 text-center">10 - 20 Mei 2027</td>
                <td className="border border-slate-400 p-1">Pelaksanaan Asesmen Madrasah (AM) Kelas VI</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Juni 2027</td>
                <td className="border border-slate-400 p-1 text-center">07 - 16 Juni 2027<br />25 Juni 2027</td>
                <td className="border border-slate-400 p-1">Sumatif Akhir Tahun (SAT) Kenaikan Kelas<br />Penyerahan RDM Semester Genap & Wisuda Tahfidz</td>
              </tr>
            </tbody>
          </table>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 5 (Hal. 50) - LAMPIRAN III: PEMETAAN CP DAN CONTOH ATP
          ========================================================================= */}
      <KomPageContainer pageNumber="50" pageIndex={50}>
        <div className="space-y-3 text-[11.5px] leading-relaxed">
          <div className="text-center pb-1">
            <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-950 font-serif">
              LAMPIRAN III: CONTOH ALUR TUJUAN PEMBELAJARAN (ATP)<br />
              MATA PELAJARAN FIKIH - FASE A (KELAS I DAN II)
            </h3>
          </div>

          <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-16 text-center">Elemen</th>
                <th className="border border-slate-400 p-1 text-left">Capaian Pembelajaran (CP)</th>
                <th className="border border-slate-400 p-1 text-left">Alur Tujuan Pembelajaran (ATP)</th>
                <th className="border border-slate-400 p-1 w-20 text-center">Panca Cinta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 font-semibold text-center">Fikih Ibadah (Fase A)</td>
                <td className="border border-slate-400 p-1">
                  Peserta didik mampu mengenal rukun Islam, melafalkan kalimah syahadatain, mempraktikkan tata cara bersuci (thaharah), wudhu, dan gerakan shalat fardhu secara tertib.
                </td>
                <td className="border border-slate-400 p-1">
                  1.1 Mengenal lima rukun Islam dengan lagu ceria.<br />
                  1.2 Melafalkan dua kalimah syahadat beserta artinya.<br />
                  1.3 Membiasakan doa sebelum dan sesudah berwudhu.<br />
                  1.4 Menirukan tata cara berwudhu dengan hemat air.<br />
                  1.5 Mempraktikkan gerakan shalat fardhu berjamaah.
                </td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-900">
                  Cinta Allah, Cinta Lingkungan (Hemat Air)
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pt-2 text-[10.5px] text-justify space-y-1 text-slate-800">
            <p className="font-semibold">Prinsip Penyusunan ATP:</p>
            <p className="indent-6">
              1. Disusun dari materi konkret menuju abstrak, disesuaikan dengan kemampuan motorik halus dan kognitif santri Fase A.
            </p>
            <p className="indent-6">
              2. Mengutamakan pembiasaan dan keteladanan langsung di masjid madrasah, bukan sebatas teori hafalan naskah.
            </p>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 6 (Hal. 51) - LAMPIRAN IV: INSTRUMEN OBSERVASI KBC
          ========================================================================= */}
      <KomPageContainer pageNumber="51" pageIndex={51}>
        <div className="space-y-3 text-[11.5px] leading-relaxed">
          <div className="text-center pb-1">
            <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-950 font-serif">
              LAMPIRAN IV: LEMBAR OBSERVASI IKLIM KELAS BERBASIS CINTA<br />
              (SUPERVISI IMPLEMENTASI KBC DI MADRASAH)
            </h3>
          </div>

          <table className="w-full border-collapse border border-slate-400 text-[9.5px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-400 p-1 w-8 text-center">No</th>
                <th className="border border-slate-400 p-1 text-left">Indikator Iklim Kelas Berbasis Cinta</th>
                <th className="border border-slate-400 p-1 text-center w-20">Teramati</th>
                <th className="border border-slate-400 p-1 text-left">Catatan Praktik Baik</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-1 text-center">1</td>
                <td className="border border-slate-400 p-1">Guru menyambut siswa di pintu dengan senyuman dan sapaan ramah.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Siswa merasa disambut dengan penuh kasih.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">2</td>
                <td className="border border-slate-400 p-1">Kelas bebas dari teriakan kemarahan guru atau cemoohan verbal.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Suasana dialogis dan santun.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">3</td>
                <td className="border border-slate-400 p-1">Guru memberikan perhatian ekstra kepada siswa yang butuh bimbingan.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Diferensiasi bimbingan individual berjalan baik.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">4</td>
                <td className="border border-slate-400 p-1">Siswa saling membantu kawan kelompok tanpa membedakan latar belakang.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Budaya gotong royong terwujud nyata.</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-1 text-center">5</td>
                <td className="border border-slate-400 p-1">Tersedia sudut baca (pojok literasi) dan tempat sampah pilah di kelas.</td>
                <td className="border border-slate-400 p-1 text-center font-bold text-emerald-800">Ya</td>
                <td className="border border-slate-400 p-1">Lingkungan kelas bersih dan asri adiwiyata.</td>
              </tr>
            </tbody>
          </table>

          <div className="pt-3 flex justify-between text-xs">
            <div className="text-center w-48 space-y-1">
              <p>Guru Kelas yang Disupervisi,</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold underline">Ustadzah Siti Fatimah, S.Pd.</p>
            </div>

            <div className="text-center w-48 space-y-1">
              <p>Supervisor / Kepala Madrasah,</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold underline">{(data as any).namaKepalaMadrasah || data.namaKepala}</p>
            </div>
          </div>
        </div>
      </KomPageContainer>

      {/* =========================================================================
          PAGE 7 (Hal. 52) - LAMPIRAN V: BERITA ACARA RAPAT KERJA TPKM
          ========================================================================= */}
      <KomPageContainer pageNumber="52" pageIndex={52}>
        <div className="space-y-3 text-[11.5px] leading-relaxed">
          <div className="text-center pb-2 border-b-2 border-slate-900">
            <h3 className="font-bold text-xs sm:text-sm uppercase text-slate-950 font-serif">
              BERITA ACARA RAPAT KERJA PENYUSUNAN DAN REVIEW DOKUMEN<br />
              KURIKULUM OPERASIONAL MADRASAH (KOM) BERBASIS CINTA<br />
              {data.namaMadrasah.toUpperCase()}<br />
              TAHUN PELAJARAN {data.tahunAjaran}
            </h3>
          </div>

          <div className="pt-1 text-[10.5px] text-justify space-y-1.5 text-slate-800">
            <p className="indent-8">
              Pada hari ini, <strong>Sabtu</strong> tanggal <strong>Empat</strong> bulan <strong>Juli</strong> tahun <strong>{data.tahunAjaran?.startsWith('2025') ? 'Dua Ribu Dua Puluh Lima' : 'Dua Ribu Dua Puluh Enam'}</strong> bertempat di Ruang Guru {data.namaMadrasah}, telah diselenggarakan Rapat Kerja Review dan Finalisasi Dokumen Kurikulum Operasional Madrasah (KOM) Berbasis Cinta Tahun Pelajaran {data.tahunAjaran}.
            </p>
            <p className="indent-8">
              Rapat kerja dihadiri oleh Pengawas Madrasah, Kepala Madrasah, Tim Pengembang Kurikulum Madrasah (TPKM), Dewan Guru, Tenaga Kependidikan, serta Pengurus Komite Madrasah dan perwakilan Tokoh Masyarakat.
            </p>
            <p className="indent-8">
              Berdasarkan hasil musyawarah dan penelaahan mendalam terhadap regulasi KMA No. 1503 Tahun 2025 dan Panduan Kurikulum Berbasis Cinta, seluruh peserta rapat secara bulat <strong>MENYETUJUI</strong> dan <strong>MENGESAHKAN</strong> Dokumen Kurikulum Operasional Madrasah ini untuk diberlakukan secara efektif mulai Tahun Pelajaran {data.tahunAjaran}.
            </p>
            <p className="indent-8">
              Demikian Berita Acara ini dibuat dengan sebenarnya dengan penuh rasa tanggung jawab demi kemajuan mutu pendidikan madrasah, untuk dapat dipergunakan sebagaimana mestinya.
            </p>
          </div>

          <div className="pt-3 grid grid-cols-2 gap-4 text-center text-xs">
            <div className="space-y-0.5">
              <p className="font-bold text-slate-900">Perwakilan Dewan Guru,</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold underline">Ustadzah Siti Fatimah, S.Pd.</p>
            </div>

            <div className="space-y-0.5">
              <p className="font-bold text-slate-900">Ketua Komite Madrasah,</p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[10px] text-slate-400 italic">(Tanda Tangan)</span>
              </div>
              <p className="font-bold underline">{(data as any).namaKomite || data.namaKetuaKomite}</p>
            </div>
          </div>

          <div className="pt-2 text-center text-xs">
            <p className="font-bold text-slate-900">Mengetahui & Menyetujui,</p>
            <p className="font-bold text-slate-900">Kepala {data.namaMadrasah},</p>
            <div className="h-12 flex items-center justify-center">
              <span className="text-[10px] text-slate-400 italic">(Tanda Tangan & Cap Madrasah)</span>
            </div>
            <p className="font-bold underline">{(data as any).namaKepalaMadrasah || data.namaKepala}</p>
            <p className="text-[10px]">NIP. {(data as any).nipKepalaMadrasah || data.nipKepala}</p>
          </div>
        </div>
      </KomPageContainer>
    </>
  );
};
