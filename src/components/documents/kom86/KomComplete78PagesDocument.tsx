import React from 'react';
import { KomCintaData } from '../../../data/komCintaDefaultData';
import { KomFrontMatterPages } from './KomFrontMatterPages';
import { KomBab1Pages } from './KomBab1Pages';
import { KomBab2Pages } from './KomBab2Pages';
import { KomBab3Pages } from './KomBab3Pages';
import { KomBab4Pages } from './KomBab4Pages';
import { KomBab5Pages } from './KomBab5Pages';
import { KomBab6AndLampiranPages } from './KomBab6AndLampiranPages';

interface Props {
  data: KomCintaData;
}

export const KomComplete78PagesDocument: React.FC<Props> = ({ data }) => {
  return (
    <div className="kom-78-pages-root space-y-6 print:space-y-0 text-slate-900 leading-[1.75]">
      {/* Front Matter: Halaman Sampul sampai Daftar Gambar (Halaman 1 - 8) */}
      <KomFrontMatterPages data={data} />

      {/* Bab I: Karakteristik Madrasah (Halaman 9 - 20) */}
      <KomBab1Pages data={data} />

      {/* Bab II: Visi, Misi, dan Tujuan Madrasah (Halaman 21 - 24) */}
      <KomBab2Pages data={data} />

      {/* Bab III: Pengorganisasian Pembelajaran (Halaman 25 - 42) */}
      <KomBab3Pages data={data} />

      {/* Bab IV: Perencanaan Pembelajaran (Halaman 43 - 64) */}
      <KomBab4Pages data={data} />

      {/* Bab V: Pendampingan, Evaluasi, dan Pengembangan Profesional (Halaman 65 - 70) */}
      <KomBab5Pages data={data} />

      {/* Bab VI: Penutup & Lampiran I - V (Halaman 71 - 78) */}
      <KomBab6AndLampiranPages data={data} />
    </div>
  );
};
