import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  Edit2,
  Trash2,
  Eye,
  Plus,
  ShieldCheck,
  Download,
  ArrowLeft,
} from 'lucide-react';
import { OfficialDocument, DocumentType } from '../types';
import { DOCUMENT_TYPES } from '../utils/documentTemplates';

interface DocumentArchiveViewProps {
  documents: OfficialDocument[];
  onSelectDocument: (doc: OfficialDocument) => void;
  onEditDocument: (doc: OfficialDocument) => void;
  onDeleteDocument: (id: string) => void;
  onOpenSignModal: (signer: any, doc: OfficialDocument) => void;
  onCreateNew: () => void;
  onBack?: () => void;
  onOpenPrintModal?: (doc: OfficialDocument) => void;
}

export const DocumentArchiveView: React.FC<DocumentArchiveViewProps> = ({
  documents,
  onSelectDocument,
  onEditDocument,
  onDeleteDocument,
  onOpenSignModal,
  onCreateNew,
  onBack,
  onOpenPrintModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.targetPersonName && doc.targetPersonName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || doc.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || doc.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2.5 min-w-0 flex-1">
          {onBack && (
            <button
              id="archive-back-btn"
              type="button"
              onClick={onBack}
              className="p-2 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs flex-shrink-0"
              title="Kembali ke Dashboard / Menu Utama"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span className="hidden sm:inline">Kembali</span>
            </button>
          )}
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-2 truncate">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 flex-shrink-0" />
              <span className="truncate">Arsip Dokumen & Surat Resmi Madrasah</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
              Daftar seluruh dokumen Kurikulum KMA 450, SK Kepala Madrasah, Surat Tugas, dan Surat Keterangan Siswa.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            id="archive-create-new-btn"
            type="button"
            onClick={onCreateNew}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Dokumen Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
        <div className="relative flex-1 max-w-full md:max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="archive-search-input"
            type="text"
            placeholder="Cari judul dokumen, nomor SK/surat, atau nama guru/siswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:outline-hidden"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <select
            id="archive-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:bg-white focus:outline-hidden"
          >
            <option value="ALL">Semua Status ({documents.length})</option>
            <option value="SIGNED">Sudah TTE Sah (QR)</option>
            <option value="READY_FOR_SIGN">Menunggu TTE</option>
            <option value="DRAFT">Draft</option>
          </select>

          <select
            id="archive-type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:bg-white focus:outline-hidden max-w-[200px] truncate"
          >
            <option value="ALL">Semua Jenis Dokumen</option>
            {DOCUMENT_TYPES.map((dt) => (
              <option key={dt.type} value={dt.type}>
                {dt.badgeText} - {dt.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Document Grid / Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredDocs.map((doc) => {
          const isSigned = doc.status === 'SIGNED';
          const signedCount = doc.signatures.filter((s) => s.isSigned).length;
          const totalSigners = doc.signatures.length;

          return (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                      isSigned
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isSigned ? (
                      <>
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>TTE Sah ({signedCount}/{totalSigners})</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>Menunggu TTD ({signedCount}/{totalSigners})</span>
                      </>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{doc.tanggalSurat}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                  {doc.title}
                </h3>

                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p className="font-mono text-[10.5px] text-emerald-900 font-semibold truncate">
                    No: {doc.nomorSurat}
                  </p>
                  {doc.targetPersonName && (
                    <p className="text-slate-700 truncate">
                      Subjek: <strong>{doc.targetPersonName}</strong>
                    </p>
                  )}
                  <p className="text-slate-400 text-[10px]">T.A {doc.tahunAjaran} ({doc.semester})</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <button
                    id={`preview-doc-btn-${doc.id}`}
                    type="button"
                    onClick={() => onSelectDocument(doc)}
                    className="p-1.5 sm:p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl transition-colors text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                    title="Lihat Lembar Resmi"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat</span>
                  </button>

                  <button
                    id={`print-doc-btn-${doc.id}`}
                    type="button"
                    onClick={() => {
                      if (onOpenPrintModal) {
                        onOpenPrintModal(doc);
                      } else {
                        onSelectDocument(doc);
                      }
                    }}
                    className="p-1.5 sm:p-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl transition-colors text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                    title="Cetak / Simpan PDF Dokumen Ini"
                  >
                    <Printer className="w-3.5 h-3.5 text-teal-700" />
                    <span className="hidden sm:inline">Cetak</span>
                  </button>

                  <button
                    id={`edit-doc-btn-${doc.id}`}
                    type="button"
                    onClick={() => onEditDocument(doc)}
                    className="p-1.5 sm:p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                    title="Edit Dokumen"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  {!isSigned && doc.signatures.some((s) => !s.isSigned) && (
                    <button
                      id={`sign-card-btn-${doc.id}`}
                      type="button"
                      onClick={() => {
                        const unsigned = doc.signatures.find((s) => !s.isSigned) || doc.signatures[0];
                        onOpenSignModal(unsigned, doc);
                      }}
                      className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[11px] font-bold shadow-xs transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>TTE</span>
                    </button>
                  )}

                  <button
                    id={`del-doc-btn-${doc.id}`}
                    type="button"
                    onClick={() => onDeleteDocument(doc.id)}
                    className="p-1.5 sm:p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors cursor-pointer"
                    title="Hapus Dokumen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-10 sm:py-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3">
          <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">Tidak ada dokumen yang sesuai</h3>
          <p className="text-xs text-slate-400">Silakan sesuaikan kata kunci pencarian atau buat dokumen baru.</p>
        </div>
      )}
    </div>
  );
};
