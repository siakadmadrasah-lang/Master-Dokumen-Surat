import React from 'react';
import { useKomLayout } from './KomLayoutContext';

interface KomPageContainerProps {
  pageNumber: string; // e.g. "i", "ii", ..., "1", "2", ..., "78"
  pageIndex: number;  // 1-based overall page (1 to 78)
  children: React.ReactNode;
  className?: string;
  isCover?: boolean;
  id?: string;
}

export const KomPageContainer: React.FC<KomPageContainerProps> = ({
  pageNumber,
  pageIndex,
  children,
  className = '',
  isCover = false,
  id,
}) => {
  const { layoutMode } = useKomLayout();

  // In CONTINUOUS mode:
  // Pages 1 to 8 are Front Matter sheets (Cover, Surat Permohonan, Rekomendasi, Pengesahan, Kata Pengantar, Daftar Isi, Daftar Tabel).
  // These are formal single-page sheets.
  // Pages 9+ belong to Chapters (Bab I - VI and Lampiran). In continuous mode, they flow seamlessly within their chapter container
  // without artificial min-height or premature page breaks, eliminating empty space.
  const isFrontMatterSheet = pageIndex <= 8;
  const isLampiranStart = id === 'kom-cinta-lampiran' || pageIndex >= 47;

  if (layoutMode === 'CONTINUOUS' && !isFrontMatterSheet) {
    return (
      <div
        id={id || `kom-page-${pageIndex}`}
        data-page-index={pageIndex}
        data-page-number={pageNumber}
        className={`kom-flow-subpage ${
          isLampiranStart ? 'print:break-before-page pt-6 border-t border-slate-300 mt-6 print:border-none print:mt-0 print:pt-0' : 'pt-2'
        } ${className}`}
      >
        {children}
      </div>
    );
  }

  // Standalone sheet or PAGINATED mode:
  return (
    <div
      id={id || `kom-page-${pageIndex}`}
      data-page-index={pageIndex}
      data-page-number={pageNumber}
      className={`kom-exact-page bg-white mx-auto w-full max-w-[210mm] min-h-[297mm] ${
        isCover
          ? 'p-6 sm:p-[25mm]'
          : 'p-6 sm:pt-[25mm] sm:pb-[25mm] sm:pl-[35mm] sm:pr-[25mm]'
      } text-slate-900 shadow-md border border-slate-200 relative flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none print:min-h-[240mm] print:break-after-page text-[15px] sm:text-[15.5px] leading-[1.65] font-sans mb-6 ${className}`}
      style={{
        pageBreakAfter: 'always',
        breakAfter: 'page',
      }}
    >
      {/* Page Body Content */}
      <div className="flex-1 flex flex-col justify-start">
        {children}
      </div>

      {/* Page Number Centered at Bottom */}
      {!isCover && (
        <div className="kom-page-number-footer pt-4 mt-auto text-center font-serif text-xs text-slate-700 select-none print:text-slate-900 print:mt-auto print:pt-3 print:pb-0">
          {pageNumber}
        </div>
      )}
    </div>
  );
};

