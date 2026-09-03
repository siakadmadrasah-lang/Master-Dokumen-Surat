import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  FileText,
  School,
  Lock,
  Calendar,
  UserCheck,
  ArrowLeft,
} from 'lucide-react';
import { OfficialDocument, MadrasahProfile } from '../types';

interface SignatureVerificationViewProps {
  documents: OfficialDocument[];
  profile: MadrasahProfile;
  onSelectDocument: (doc: OfficialDocument) => void;
  onBack?: () => void;
}

export const SignatureVerificationView: React.FC<SignatureVerificationViewProps> = ({
  documents,
  profile,
  onSelectDocument,
  onBack,
}) => {
  const [verificationInput, setVerificationInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'VALID' | 'INVALID' | 'IDLE';
    doc?: OfficialDocument;
    signer?: any;
    hashMatched?: string;
  }>({ status: 'IDLE' });

  const handleVerify = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setVerificationResult({ status: 'IDLE' });
      return;
    }

    // Try finding by doc id, nomor surat, or signature hash
    let matchedDoc: OfficialDocument | undefined;
    let matchedSigner: any;

    for (const doc of documents) {
      if (
        doc.nomorSurat.toLowerCase().includes(trimmed.toLowerCase()) ||
        doc.id.toLowerCase() === trimmed.toLowerCase() ||
        doc.title.toLowerCase().includes(trimmed.toLowerCase())
      ) {
        matchedDoc = doc;
        matchedSigner = doc.signatures.find((s) => s.isSigned) || doc.signatures[0];
        break;
      }

      for (const sig of doc.signatures) {
        if (sig.digitalHash && sig.digitalHash.includes(trimmed)) {
          matchedDoc = doc;
          matchedSigner = sig;
          break;
        }
      }
      if (matchedDoc) break;
    }

    if (matchedDoc && matchedSigner) {
      setVerificationResult({
        status: 'VALID',
        doc: matchedDoc,
        signer: matchedSigner,
        hashMatched: matchedSigner.digitalHash,
      });
    } else {
      setVerificationResult({ status: 'INVALID' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="relative text-center space-y-2 py-4">
        {onBack && (
          <button
            id="verify-back-btn"
            type="button"
            onClick={onBack}
            className="absolute left-0 top-4 p-2 sm:px-3 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
            title="Kembali ke Dashboard / Menu Utama"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700" />
            <span className="hidden sm:inline">Kembali</span>
          </button>
        )}
        <div className="inline-flex p-3 rounded-2xl bg-emerald-100 text-emerald-900 mb-2">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">
          Portal Verifikasi Tanda Tangan Elektronik (TTE) & Keaslian Dokumen
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Layanan verifikasi publik terpadu untuk memastikan keabsahan dokumen madrasah,
          keaslian tanda tangan digital Kepala Madrasah, dan integritas naskah dinas Kemenag.
        </p>
      </div>

      {/* Verification Input Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
          Masukkan Kode Hash Digital / Nomor Surat / ID Dokumen:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <QrCode className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="verify-hash-input"
              type="text"
              placeholder="Contoh: 184/MI.02/PP.00.4/07/2025 atau hash TTE"
              value={verificationInput}
              onChange={(e) => setVerificationInput(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 focus:outline-hidden font-mono"
            />
          </div>
          <button
            id="run-verify-btn"
            onClick={() => handleVerify(verificationInput)}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Periksa Keaslian</span>
          </button>
        </div>

        {/* Quick Sample Links */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Contoh Dokumen yang Tersedia:</span>
          {documents.slice(0, 3).map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setVerificationInput(d.nomorSurat);
                handleVerify(d.nomorSurat);
              }}
              className="text-[11px] font-mono text-emerald-700 hover:underline bg-emerald-50 px-2 py-0.5 rounded cursor-pointer"
            >
              {d.nomorSurat}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result State */}
      {verificationResult.status === 'VALID' && verificationResult.doc && (
        <div className="bg-white rounded-3xl border-2 border-emerald-500 p-6 sm:p-8 shadow-lg space-y-6 animate-scale-up">
          <div className="flex items-center space-x-3 text-emerald-800 border-b border-emerald-100 pb-4">
            <div className="p-2.5 bg-emerald-100 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-700" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 block">
                HASIL VERIFIKASI RESMI:
              </span>
              <h3 className="text-base font-extrabold text-emerald-950">
                DOKUMEN RESMI TERVERIFIKASI & SAH
              </h3>
              <p className="text-xs text-emerald-700">
                Tanda tangan elektronik telah diverifikasi valid sesuai standar kriptografis Kemenag.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="text-[11px] text-slate-500 font-bold uppercase block">
                Satuan Pendidikan Penerbit:
              </span>
              <p className="font-extrabold text-slate-900 text-sm">{profile.namaMadrasah}</p>
              <p className="text-slate-600">
                NSM: <span className="font-mono">{profile.nsm}</span> | NPSN:{' '}
                <span className="font-mono">{profile.npsn}</span>
              </p>
              <p className="text-slate-500 text-[11px]">{profile.kabupatenKota}, {profile.provinsi}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="text-[11px] text-slate-500 font-bold uppercase block">
                Penandatangan Resmi (TTE):
              </span>
              <p className="font-extrabold text-emerald-950 text-sm">
                {verificationResult.signer?.name}
              </p>
              <p className="text-slate-700 font-medium">{verificationResult.signer?.title}</p>
              <p className="font-mono text-slate-500 text-[11px]">
                NIP: {verificationResult.signer?.nip || '-'}
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950">Judul Dokumen:</span>
              <span className="font-mono text-emerald-800 text-[11px]">
                Tgl: {verificationResult.doc.tanggalSurat}
              </span>
            </div>
            <p className="font-semibold text-slate-900 text-sm">{verificationResult.doc.title}</p>
            <p className="font-mono text-xs text-slate-700">
              Nomor Surat: <strong>{verificationResult.doc.nomorSurat}</strong>
            </p>
            {verificationResult.hashMatched && (
              <div className="pt-2 border-t border-emerald-200/80">
                <span className="text-[10px] text-slate-500 block font-mono">Kode Hash Digital:</span>
                <span className="font-mono text-[10px] text-slate-800 break-all select-all font-semibold">
                  {verificationResult.hashMatched}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              id="view-verified-doc-btn"
              onClick={() => onSelectDocument(verificationResult.doc!)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Buka & Cetak Dokumen Asli</span>
            </button>
          </div>
        </div>
      )}

      {verificationResult.status === 'INVALID' && (
        <div className="bg-rose-50 rounded-3xl border-2 border-rose-300 p-6 text-center space-y-3 animate-scale-up">
          <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
          <h3 className="text-sm font-bold text-rose-900">
            Dokumen / Tanda Tangan Tidak Ditemukan
          </h3>
          <p className="text-xs text-rose-700 max-w-md mx-auto">
            Nomor surat atau kode hash yang Anda masukkan tidak terdaftar dalam database resmi madrasah.
            Pastikan kode dimasukkan dengan benar.
          </p>
        </div>
      )}
    </div>
  );
};
