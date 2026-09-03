import React from 'react';

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
  return (
    <div
      id={id || `kom-page-${pageIndex}`}
      data-page-index={pageIndex}
      data-page-number={pageNumber}
      className={`kom-exact-page bg-white mx-auto w-full max-w-[210mm] min-h-[297mm] ${
        isCover
          ? 'p-6 sm:p-[25mm]'
          : 'p-6 sm:pt-[25mm] sm:pb-[25mm] sm:pl-[35mm] sm:pr-[25mm]'
      } text-slate-900 shadow-md border border-slate-200 relative flex flex-col justify-between print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none print:min-h-0 print:break-after-page text-[12px] sm:text-[12.5px] leading-[1.65] font-sans ${className}`}
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
        <div className="pt-4 mt-auto text-center font-serif text-xs text-slate-700 select-none print:text-slate-900">
          {pageNumber}
        </div>
      )}
    </div>
  );
};
