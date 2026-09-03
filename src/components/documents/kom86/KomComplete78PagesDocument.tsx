import React from 'react';
import { KomCintaData } from '../../../data/komCintaDefaultData';
import { useKomLayout } from './KomLayoutContext';
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
  const { layoutMode } = useKomLayout();
  const isContinuous = layoutMode === 'CONTINUOUS';

  return (
    <div className={`kom-78-pages-root ${isContinuous ? 'kom-dense-continuous space-y-8' : 'space-y-6'} print:space-y-0 text-slate-900`}>
      {/* Front Matter: Halaman Sampul sampai Daftar Gambar (Halaman 1 - 8) */}
      <KomFrontMatterPages data={data} />

      {/* Bab I: Karakteristik Madrasah (Halaman 9 - 20) */}
      {isContinuous ? (
        <section
          id="kom-chapter-bab1-wrapper"
          className="kom-chapter-folio bg-white mx-auto w-full max-w-[210mm] shadow-md border border-slate-200 rounded-xl p-6 sm:pt-[25mm] sm:pb-[25mm] sm:pl-[35mm] sm:pr-[25mm] text-slate-900 text-[15px] sm:text-[15.5px] leading-[1.65] font-sans print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none print:break-before-page"
        >
          <KomBab1Pages data={data} />
        </section>
      ) : (
        <KomBab1Pages data={data} />
      )}

      {/* Bab II: Visi, Misi, dan Tujuan Madrasah (Halaman 21 - 24) */}
      {isContinuous ? (
        <section
          id="kom-chapter-bab2-wrapper"
          className="kom-chapter-folio bg-white mx-auto w-full max-w-[210mm] shadow-md border border-slate-200 rounded-xl p-6 sm:pt-[25mm] sm:pb-[25mm] sm:pl-[35mm] sm:pr-[25mm] text-slate-900 text-[15px] sm:text-[15.5px] leading-[1.65] font-sans print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none print:break-before-page"
        >
          <KomBab2Pages data={data} />
        </section>
      ) : (
        <KomBab2Pages data={data} />
      )}

      {/* Bab III: Pengorganisasian Pembelajaran (Halaman 25 - 42) */}
      {isContinuous ? (
        <section
          id="kom-chapter-bab3-wrapper"
          className="kom-chapter-folio bg-white mx-auto w-full max-w-[210mm] shadow-md border border-slate-200 rounded-xl p-6 sm:pt-[25mm] sm:pb-[25mm] sm:pl-[35mm] sm:pr-[25mm] text-slate-900 text-[15px] sm:text-[15.5px] leading-[1.65] font-sans print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none print:break-before-page"
        >
          <KomBab3Pages data={data} />
        </section>
      ) : (
        <KomBab3Pages data={data} />
      )}

      {/* Bab IV: Perencanaan Pembelajaran (Halaman 43 - 64) */}
      {isContinuous ? (
        <section
          id="kom-chapter-bab4-wrapper"
          className="kom-chapter-folio bg-white mx-auto w-full max-w-[210mm] shadow-md border border-slate-200 rounded-xl p-6 sm:pt-[25mm] sm:pb-[25mm] sm:pl-[35mm] sm:pr-[25mm] text-slate-900 text-[15px] sm:text-[15.5px] leading-[1.65] font-sans print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none print:break-before-page"
        >
          <KomBab4Pages data={data} />
        </section>
      ) : (
        <KomBab4Pages data={data} />
      )}

      {/* Bab V: Pendampingan, Evaluasi, dan Pengembangan Profesional (Halaman 65 - 70) */}
      {isContinuous ? (
        <section
          id="kom-chapter-bab5-wrapper"
          className="kom-chapter-folio bg-white mx-auto w-full max-w-[210mm] shadow-md border border-slate-200 rounded-xl p-6 sm:pt-[25mm] sm:pb-[25mm] sm:pl-[35mm] sm:pr-[25mm] text-slate-900 text-[15px] sm:text-[15.5px] leading-[1.65] font-sans print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none print:break-before-page"
        >
          <KomBab5Pages data={data} />
        </section>
      ) : (
        <KomBab5Pages data={data} />
      )}

      {/* Bab VI: Penutup & Lampiran I - V (Halaman 71 - 78) */}
      {isContinuous ? (
        <section
          id="kom-chapter-bab6-wrapper"
          className="kom-chapter-folio bg-white mx-auto w-full max-w-[210mm] shadow-md border border-slate-200 rounded-xl p-6 sm:pt-[25mm] sm:pb-[25mm] sm:pl-[35mm] sm:pr-[25mm] text-slate-900 text-[15px] sm:text-[15.5px] leading-[1.65] font-sans print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none print:break-before-page"
        >
          <KomBab6AndLampiranPages data={data} />
        </section>
      ) : (
        <KomBab6AndLampiranPages data={data} />
      )}
    </div>
  );
};

