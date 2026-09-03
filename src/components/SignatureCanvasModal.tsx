import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Check, RotateCcw, PenTool, ShieldCheck, QrCode } from 'lucide-react';
import { generateDigitalSignatureHash, generateQRCodeDataUrl } from '../utils/storage';
import { MadrasahProfile, SignatureRecord } from '../types';

interface SignatureCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSignature: (sigData: {
    signatureImage: string;
    digitalHash: string;
    qrCodeDataUrl: string;
    signedAt: string;
  }) => void;
  signer: SignatureRecord;
  profile: MadrasahProfile;
  docTitle: string;
  docNumber: string;
}

export const SignatureCanvasModal: React.FC<SignatureCanvasModalProps> = ({
  isOpen,
  onClose,
  onConfirmSignature,
  signer,
  profile,
  docTitle,
  docNumber,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [useOfficialCertifiedSign, setUseOfficialCertifiedSign] = useState(true);
  const [generatedPreviewQr, setGeneratedPreviewQr] = useState<string>('');

  useEffect(() => {
    if (!isOpen) return;

    // Reset canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
    setHasDrawn(false);

    // Pre-generate QR Code preview
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
    const hash = generateDigitalSignatureHash(docTitle, signer.name, signer.title, docNumber, formattedDate);

    generateQRCodeDataUrl({
      documentId: docNumber,
      nomorSurat: docNumber,
      judul: docTitle,
      madrasah: profile.namaMadrasah,
      penandatangan: signer.name,
      jabatan: signer.title,
      nip: signer.nip,
      waktuTtd: formattedDate,
      hash,
    }).then((qr) => setGeneratedPreviewQr(qr));
  }, [isOpen, signer, profile, docTitle, docNumber]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSaveSignature = async () => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    const digitalHash = generateDigitalSignatureHash(
      docTitle,
      signer.name,
      signer.title,
      docNumber,
      formattedDate
    );

    const qrDataUrl = await generateQRCodeDataUrl({
      documentId: docNumber,
      nomorSurat: docNumber,
      judul: docTitle,
      madrasah: profile.namaMadrasah,
      penandatangan: signer.name,
      jabatan: signer.title,
      nip: signer.nip,
      waktuTtd: formattedDate,
      hash: digitalHash,
    });

    let signatureImage = '';
    if (!useOfficialCertifiedSign && canvasRef.current && hasDrawn) {
      signatureImage = canvasRef.current.toDataURL('image/png');
    }

    onConfirmSignature({
      signatureImage,
      digitalHash,
      qrCodeDataUrl: qrDataUrl,
      signedAt: formattedDate,
    });

    onClose();
  };

  return (
    <div id="signature-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-700/50 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Tanda Tangan Digital Resmi</h3>
              <p className="text-xs text-emerald-200">Sertifikasi & Verifikasi Integritas Kemenag RI</p>
            </div>
          </div>
          <button
            id="close-sig-modal-btn"
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Signer Info Box */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Penandatangan:</span>
                <span className="font-semibold text-slate-800 text-sm block">{signer.name}</span>
                <span className="text-emerald-700 font-medium">{signer.title}</span>
              </div>
              <div>
                <span className="text-slate-500 block">NIP / ID:</span>
                <span className="font-mono text-slate-700 font-medium">{signer.nip || 'Non-NIP'}</span>
                <span className="text-slate-500 block mt-1">Dokumen:</span>
                <span className="font-mono text-xs text-slate-700 truncate block">{docNumber}</span>
              </div>
            </div>
          </div>

          {/* Signature Type Switch */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
            <button
              id="mode-tte-qr-btn"
              type="button"
              onClick={() => setUseOfficialCertifiedSign(true)}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                useOfficialCertifiedSign
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>Sertifikat QR Digital (Standar BSrE)</span>
            </button>
            <button
              id="mode-canvas-draw-btn"
              type="button"
              onClick={() => setUseOfficialCertifiedSign(false)}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                !useOfficialCertifiedSign
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PenTool className="w-4 h-4 text-teal-600" />
              <span>Goresan Tangan + QR</span>
            </button>
          </div>

          {useOfficialCertifiedSign ? (
            /* QR Certified preview */
            <div className="border border-dashed border-emerald-300 rounded-xl p-5 bg-gradient-to-b from-white to-emerald-50/40 flex flex-col items-center text-center space-y-3">
              {generatedPreviewQr ? (
                <img
                  src={generatedPreviewQr}
                  alt="QR Code Verifikasi TTE"
                  className="w-32 h-32 rounded-lg shadow-sm border border-emerald-100"
                />
              ) : (
                <div className="w-32 h-32 bg-slate-100 animate-pulse rounded-lg" />
              )}
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  QR Code Verifikasi Resmi Terenkripsi
                </p>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                  Dokumen ditandatangani secara elektronik sah dengan metadata waktu, identitas pejabat madrasah, dan hash integritas dokumen.
                </p>
              </div>
            </div>
          ) : (
            /* Canvas for drawing */
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Goreskan tanda tangan pada bidang putih di bawah:</span>
                <button
                  id="clear-canvas-btn"
                  onClick={clearCanvas}
                  type="button"
                  className="text-amber-700 hover:text-amber-900 flex items-center space-x-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Hapus / Ulangi</span>
                </button>
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-xl overflow-hidden bg-white shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={440}
                  height={150}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[150px] cursor-crosshair touch-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 italic">
                *Tanda tangan grafis akan tetap dilengkapi dengan QR Code keabsahan Kemenag.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end space-x-3">
          <button
            id="cancel-sign-modal-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Batal
          </button>
          <button
            id="confirm-sign-modal-btn"
            type="button"
            onClick={handleSaveSignature}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Bubuhkan Tanda Tangan Sah</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
