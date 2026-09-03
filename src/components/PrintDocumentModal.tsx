import React, { useState, useEffect, useMemo } from 'react';
import {
  Printer,
  X,
  FileText,
  Settings,
  CheckCircle2,
  Download,
  ShieldCheck,
  Layout,
  Maximize2,
  Minimize2,
  Sparkles,
  HelpCircle,
  Eye,
  Sliders,
  Check,
} from 'lucide-react';
import { OfficialDocument, MadrasahProfile, Teacher, Student } from '../types';
import { OfficialDocumentSheet } from './OfficialDocumentSheet';

export type MarginPresetKey = 'NASKAH_DINAS' | 'JILID_KURIKULUM' | 'SIMETRIS' | 'RINGKAS' | 'KUSTOM';

export interface MarginValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const MARGIN_PRESETS: Record<
  Exclude<MarginPresetKey, 'KUSTOM'>,
  { label: string; shortLabel: string; desc: string; values: MarginValues }
> = {
  NASKAH_DINAS: {
    label: 'Standar Naskah Dinas Kemenag RI',
    shortLabel: 'Naskah Dinas (3-2-2.5-2 cm)',
    desc: 'Kiri 3.0cm (ruang jilid/klip), Atas 2.5cm, Kanan 2.0cm, Bawah 2.0cm (PMA No. 2/2024)',
    values: { top: 2.5, right: 2.0, bottom: 2.0, left: 3.0 },
  },
  JILID_KURIKULUM: {
    label: 'Standar Jilid Buku Kurikulum / KOM',
    shortLabel: 'Jilid KOM (3.5-2.5-2.5-2.5 cm)',
    desc: 'Kiri 3.5cm (gutter staples/lakban), Atas 2.5cm, Kanan 2.5cm, Bawah 2.5cm (Buku 78 Hal)',
    values: { top: 2.5, right: 2.5, bottom: 2.5, left: 3.5 },
  },
  SIMETRIS: {
    label: 'Standar Simetris 2.5 cm',
    shortLabel: 'Simetris 2.5 cm',
    desc: 'Atas 2.5cm, Kiri 2.5cm, Kanan 2.5cm, Bawah 2.5cm (Standar Akademis Umum)',
    values: { top: 2.5, right: 2.5, bottom: 2.5, left: 2.5 },
  },
  RINGKAS: {
    label: 'Ringkas / Pas 1 Lembar',
    shortLabel: 'Ringkas (2-1.5-1.5-1.5 cm)',
    desc: 'Kiri 2.0cm, Atas 1.5cm, Kanan 1.5cm, Bawah 1.5cm (Hemat ruang surat agar tidak tumpah)',
    values: { top: 1.5, right: 1.5, bottom: 1.5, left: 2.0 },
  },
};

interface PrintDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: OfficialDocument | null;
  documents: OfficialDocument[];
  onSelectDocument?: (doc: OfficialDocument) => void;
  profile: MadrasahProfile;
  teachers?: Teacher[];
  students?: Student[];
  onOpenSignModal?: (signer: any) => void;
}

export const PrintDocumentModal: React.FC<PrintDocumentModalProps> = ({
  isOpen,
  onClose,
  document: initialDoc,
  documents,
  onSelectDocument,
  profile,
  teachers = [],
  students = [],
  onOpenSignModal,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(
    initialDoc ? initialDoc.id : documents[0]?.id || ''
  );
  const [paperSize, setPaperSize] = useState<'A4' | 'F4'>('A4');
  const [marginPreset, setMarginPreset] = useState<MarginPresetKey>('NASKAH_DINAS');
  const [customMargins, setCustomMargins] = useState<MarginValues>({
    top: 2.5,
    right: 2.0,
    bottom: 2.0,
    left: 3.0,
  });
  const [showMarginCustomizer, setShowMarginCustomizer] = useState<boolean>(false);
  const [showWatermark, setShowWatermark] = useState<boolean>(false);
  const [watermarkText, setWatermarkText] = useState<'DRAFT' | 'ASLI_RESMI' | 'SALINAN'>('ASLI_RESMI');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [printSuccessAlert, setPrintSuccessAlert] = useState<boolean>(false);

  useEffect(() => {
    if (initialDoc?.id) {
      setSelectedDocId(initialDoc.id);
    }
  }, [initialDoc?.id]);

  const allAvailableDocs = initialDoc && !documents.some((d) => d.id === initialDoc.id)
    ? [initialDoc, ...documents]
    : documents;

  const currentDoc =
    (initialDoc && initialDoc.id === selectedDocId ? initialDoc : null) ||
    documents.find((d) => d.id === selectedDocId) ||
    initialDoc ||
    documents[0];

  // Auto-set margin preset when document changes if not customized
  useEffect(() => {
    if (currentDoc) {
      if (currentDoc.type === 'KOM' || currentDoc.type === 'KOM_CINTA') {
        setMarginPreset('JILID_KURIKULUM');
        setCustomMargins(MARGIN_PRESETS.JILID_KURIKULUM.values);
      } else {
        setMarginPreset('NASKAH_DINAS');
        setCustomMargins(MARGIN_PRESETS.NASKAH_DINAS.values);
      }
    }
  }, [currentDoc?.id, currentDoc?.type]);

  if (!isOpen) return null;

  const activeMargin: MarginValues =
    marginPreset === 'KUSTOM' ? customMargins : MARGIN_PRESETS[marginPreset].values;

  const totalPaperHeightMm = paperSize === 'F4' ? 330 : 297;
  const topMarginMm = activeMargin.top * 10;
  const bottomMarginMm = activeMargin.bottom * 10;
  const printableHeightMm = Math.max(180, totalPaperHeightMm - topMarginMm - bottomMarginMm - 6);

  const handlePrint = () => {
    setPrintSuccessAlert(true);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto print:p-0 print:bg-white print:static print:overflow-visible">
      {/* Dynamic Print Page Size and Standardized Margins */}
      <style>
        {`
          @media print {
            @page {
              size: ${paperSize === 'F4' ? '215mm 330mm portrait' : 'A4 portrait'};
              margin: ${activeMargin.top}cm ${activeMargin.right}cm ${activeMargin.bottom}cm ${activeMargin.left}cm;
            }
            .kom-exact-page {
              min-height: ${printableHeightMm}mm !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between !important;
              box-sizing: border-box !important;
            }
            .kom-page-number-footer {
              margin-top: auto !important;
              text-align: center !important;
              padding-top: 8px !important;
              padding-bottom: 0 !important;
            }
          }
        `}
      </style>

      <div
        className={`bg-white rounded-2xl shadow-2xl w-full flex flex-col overflow-hidden border border-slate-200 transition-all duration-200 ${
          isFullscreen
            ? 'h-full max-h-full max-w-full rounded-none'
            : 'max-w-6xl max-h-[94vh] my-auto'
        } print:max-h-none print:border-none print:shadow-none print:h-auto print:w-full print:m-0 print:p-0`}
      >
        {/* Modal Top Header (Hidden on Print) */}
        <div className="p-4 bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800 print:hidden">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-700/60 flex items-center justify-center flex-shrink-0">
              <Printer className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm sm:text-base font-bold truncate">
                  Studio Cetak & Ekspor Dokumen Resmi
                </h3>
                <span className="bg-emerald-800 text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full font-mono">
                  Kemenag RI Terstandar
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/90 truncate">
                {currentDoc?.title || 'Pilih Dokumen'} • No: {currentDoc?.nomorSurat || '-'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              id="fullscreen-toggle-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Kecilkan' : 'Layar Penuh'}
              className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-900/60 rounded-xl transition-all cursor-pointer hidden sm:flex items-center"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              id="trigger-direct-print-btn"
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/40 transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang (Ctrl + P)</span>
            </button>

            <button
              id="close-print-modal-btn"
              onClick={onClose}
              className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-900/80 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Subheader Options Bar (Hidden on Print) */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:px-6 flex flex-col gap-3 text-xs print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Document Selector Dropdown */}
            <div className="flex items-center space-x-2 flex-1 min-w-[240px]">
              <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span className="font-semibold text-slate-700 whitespace-nowrap">Pilih Dokumen:</span>
              <select
                id="select-print-document-dropdown"
                value={selectedDocId}
                onChange={(e) => {
                  setSelectedDocId(e.target.value);
                  const chosen = allAvailableDocs.find((d) => d.id === e.target.value);
                  if (chosen && onSelectDocument) onSelectDocument(chosen);
                }}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none w-full max-w-md truncate cursor-pointer shadow-2xs font-medium"
              >
                {allAvailableDocs.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    [{doc.type}] {doc.title} ({doc.nomorSurat})
                  </option>
                ))}
              </select>
            </div>

            {/* Print Formatting Settings */}
            <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
              {/* Paper Size Option */}
              <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs">
                <span className="text-[11px] text-slate-500 px-1.5 font-medium">Ukuran:</span>
                <button
                  type="button"
                  onClick={() => setPaperSize('A4')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    paperSize === 'A4'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  A4
                </button>
                <button
                  type="button"
                  onClick={() => setPaperSize('F4')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    paperSize === 'F4'
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  F4 / Folio
                </button>
              </div>

              {/* Margin Preset Selector */}
              <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs">
                <Layout className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
                <span className="text-[11px] text-slate-500 px-1 font-medium">Margin:</span>
                <select
                  id="select-margin-preset-dropdown"
                  value={marginPreset}
                  onChange={(e) => {
                    const val = e.target.value as MarginPresetKey;
                    setMarginPreset(val);
                    if (val !== 'KUSTOM') {
                      setCustomMargins(MARGIN_PRESETS[val].values);
                    }
                  }}
                  className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-[11px] font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="NASKAH_DINAS">Standar Naskah Dinas (Kiri 3cm, Kanan 2cm)</option>
                  <option value="JILID_KURIKULUM">Standar Jilid KOM (Kiri 3.5cm, Kanan 2.5cm)</option>
                  <option value="SIMETRIS">Simetris (2.5 cm di Semua Sisi)</option>
                  <option value="RINGKAS">Ringkas 1 Halaman (Kiri 2cm, Kanan 1.5cm)</option>
                  <option value="KUSTOM">Kustom Ukuran...</option>
                </select>
                <button
                  type="button"
                  onClick={() => setShowMarginCustomizer(!showMarginCustomizer)}
                  title="Sesuaikan Margin Presisi"
                  className={`p-1 rounded cursor-pointer transition-colors ${
                    showMarginCustomizer ? 'bg-emerald-100 text-emerald-800' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Watermark Toggle */}
              <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-2xs">
                <input
                  type="checkbox"
                  id="toggle-watermark-checkbox"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                  className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
                <label
                  htmlFor="toggle-watermark-checkbox"
                  className="text-[11px] text-slate-700 font-medium cursor-pointer select-none"
                >
                  Watermark
                </label>

                {showWatermark && (
                  <select
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value as any)}
                    className="ml-1 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-700"
                  >
                    <option value="ASLI_RESMI">RESMI & SAH</option>
                    <option value="DRAFT">DRAFT UJI COBA</option>
                    <option value="SALINAN">SALINAN RESMI</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Custom Margin Expansion Panel (if activated) */}
          {showMarginCustomizer && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-emerald-950">
              <div className="flex items-center space-x-1.5 font-semibold">
                <Sliders className="w-3.5 h-3.5 text-emerald-700" />
                <span>Atur Margin Mandiri (cm):</span>
              </div>
              <div className="flex items-center space-x-4 flex-wrap gap-y-2">
                <label className="flex items-center space-x-1.5">
                  <span className="text-slate-600">Atas:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="5.0"
                    value={activeMargin.top}
                    onChange={(e) => {
                      setMarginPreset('KUSTOM');
                      setCustomMargins({ ...customMargins, top: parseFloat(e.target.value) || 2.5 });
                    }}
                    className="w-14 bg-white border border-emerald-300 rounded px-1.5 py-0.5 font-mono font-bold text-center"
                  />
                  <span className="text-slate-500 text-[10px]">cm</span>
                </label>

                <label className="flex items-center space-x-1.5">
                  <span className="text-slate-600 font-bold text-emerald-900">Kiri (Jilid):</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="5.0"
                    value={activeMargin.left}
                    onChange={(e) => {
                      setMarginPreset('KUSTOM');
                      setCustomMargins({ ...customMargins, left: parseFloat(e.target.value) || 3.0 });
                    }}
                    className="w-14 bg-white border border-emerald-300 rounded px-1.5 py-0.5 font-mono font-bold text-center"
                  />
                  <span className="text-slate-500 text-[10px]">cm</span>
                </label>

                <label className="flex items-center space-x-1.5">
                  <span className="text-slate-600">Kanan:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="5.0"
                    value={activeMargin.right}
                    onChange={(e) => {
                      setMarginPreset('KUSTOM');
                      setCustomMargins({ ...customMargins, right: parseFloat(e.target.value) || 2.0 });
                    }}
                    className="w-14 bg-white border border-emerald-300 rounded px-1.5 py-0.5 font-mono font-bold text-center"
                  />
                  <span className="text-slate-500 text-[10px]">cm</span>
                </label>

                <label className="flex items-center space-x-1.5">
                  <span className="text-slate-600">Bawah:</span>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="5.0"
                    value={activeMargin.bottom}
                    onChange={(e) => {
                      setMarginPreset('KUSTOM');
                      setCustomMargins({ ...customMargins, bottom: parseFloat(e.target.value) || 2.0 });
                    }}
                    className="w-14 bg-white border border-emerald-300 rounded px-1.5 py-0.5 font-mono font-bold text-center"
                  />
                  <span className="text-slate-500 text-[10px]">cm</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Print Instruction Alert (Hidden on Print) */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-900 print:hidden">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>
              <strong>Batas Margin Aktif:</strong> Atas {activeMargin.top} cm • Kiri (Ruang Jilid) {activeMargin.left} cm • Kanan {activeMargin.right} cm • Bawah {activeMargin.bottom} cm. <em>Di peramban saat cetak PDF, pastikan Margin disetel ke "Default"</em>.
            </span>
          </div>
          <span className="font-mono text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
            {paperSize} ({paperSize === 'A4' ? '210×297 mm' : '215×330 mm'}) • {currentDoc?.status === 'SIGNED' ? '✓ TTE Sah' : '⏳ Siap TTE'}
          </span>
        </div>

        {/* Modal Body: Document Sheet Live Preview */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-slate-100/70 print:bg-white print:p-0 print:overflow-visible print:block print:h-auto print:max-h-none relative">
          {/* Optional Watermark Overlay */}
          {showWatermark && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 select-none overflow-hidden">
              <div className="text-slate-400/20 font-black text-6xl sm:text-8xl md:text-9xl -rotate-45 uppercase tracking-widest border-4 sm:border-8 border-dashed border-slate-400/20 p-6 rounded-3xl">
                {watermarkText === 'ASLI_RESMI'
                  ? 'RESMI & SAH'
                  : watermarkText === 'DRAFT'
                  ? 'DRAFT'
                  : 'SALINAN'}
              </div>
            </div>
          )}

          {currentDoc ? (
            <OfficialDocumentSheet
              document={currentDoc}
              profile={profile}
              teachers={teachers}
              students={students}
              onOpenSignModal={onOpenSignModal}
              margin={activeMargin}
            />
          ) : (
            <div className="text-center py-16 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p>Tidak ada dokumen yang dipilih.</p>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer (Hidden on Print) */}
        <div className="p-3 sm:px-6 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
          <div className="flex items-center space-x-2 text-slate-500 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Format baku KMA No. 450/2024 & KMA No. 1503/2025 • Standar PMA No. 2/2024</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="cancel-print-modal-btn"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              id="confirm-print-modal-btn"
              onClick={handlePrint}
              className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
