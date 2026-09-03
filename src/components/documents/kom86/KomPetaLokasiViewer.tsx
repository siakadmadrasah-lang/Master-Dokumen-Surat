import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { KomCintaData } from '../../../data/komCintaDefaultData';
import { MapPin, Navigation, ExternalLink, Compass, Layers, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface Props {
  data: KomCintaData;
}

export const KomPetaLokasiViewer: React.FC<Props> = ({ data }) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [activeView, setActiveView] = useState<'AUTO' | 'CUSTOM' | 'BOTH'>(
    (data.petaMode as any) || (data.denahGambarUrl ? 'CUSTOM' : 'AUTO')
  );

  const lat = data.mapsLatitude || '-7.517606';
  const lng = data.mapsLongitude || '109.132984';
  const zoom = data.mapsZoom || 17;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(googleMapsUrl, {
      margin: 1,
      width: 130,
      color: {
        dark: '#064e3b',
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (isMounted) setQrCodeDataUrl(url);
      })
      .catch((err) => console.error('Gagal generate QR peta:', err));

    return () => {
      isMounted = false;
    };
  }, [googleMapsUrl]);

  // Format DMS (Derajat Menit Detik) untuk naskah dinas resmi
  const formatDMS = (coordStr: string, isLat: boolean) => {
    const val = parseFloat(coordStr);
    if (isNaN(val)) return coordStr;
    const absolute = Math.abs(val);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
    const direction = isLat ? (val >= 0 ? 'LU' : 'LS') : val >= 0 ? 'BT' : 'BB';
    return `${degrees}°${minutes}'${seconds}" ${direction}`;
  };

  const hasCustomImage = Boolean(data.denahGambarUrl && data.denahGambarUrl.trim().length > 0);

  return (
    <div className="kom-peta-lokasi-wrapper w-full max-w-2xl mx-auto my-2 space-y-2">
      {/* Tampilan Kontrol Mode (Hanya di Layar, Tersembunyi saat Cetak) */}
      {hasCustomImage && (
        <div className="flex items-center justify-center gap-2 print:hidden pb-1">
          <span className="text-[11px] text-slate-500 font-semibold">Tampilan Dokumen:</span>
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px]">
            <button
              type="button"
              onClick={() => setActiveView('AUTO')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeView === 'AUTO' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Peta Koordinat GPS
            </button>
            <button
              type="button"
              onClick={() => setActiveView('CUSTOM')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeView === 'CUSTOM' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Denah Ruang Madrasah
            </button>
            <button
              type="button"
              onClick={() => setActiveView('BOTH')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                activeView === 'BOTH' ? 'bg-white text-emerald-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kombinasi (Keduanya)
            </button>
          </div>
        </div>
      )}

      {/* FRAME KARTOGRAFI RESMI NASKAH DINAS */}
      <div className="border-2 border-slate-700 bg-white rounded-lg p-2.5 sm:p-3 shadow-xs relative overflow-hidden">
        {/* Header Kartografi Naskah Dinas */}
        <div className="flex items-center justify-between border-b border-slate-300 pb-1.5 mb-2 text-[10.5px]">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 uppercase tracking-wide">
            <Compass className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
            <span>Peta Situasi & Letak Wilayah Geografis Madrasah</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>Koordinat Terekam Otomatis</span>
          </div>
        </div>

        {/* CONTAINER VISUAL PETA */}
        <div className="space-y-3">
          {/* MODE 1: PETA KARTOGRAFI BERKOORDINAT */}
          {(activeView === 'AUTO' || activeView === 'BOTH' || !hasCustomImage) && (
            <div className="relative border border-slate-300 rounded-md bg-slate-50 overflow-hidden">
              {/* Kanvas Kartografi & Pin Madrasah */}
              <div className="w-full h-44 sm:h-52 bg-gradient-to-br from-emerald-50/70 via-slate-100 to-teal-50/60 relative flex flex-col items-center justify-center p-3 overflow-hidden select-none">
                {/* Garis Grid Geografis (Kartografi) */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: `linear-gradient(to right, #047857 1px, transparent 1px), linear-gradient(to bottom, #047857 1px, transparent 1px)`,
                    backgroundSize: '28px 28px',
                  }}
                />

                {/* Ilustrasi Topografi / Wilayah Madrasah */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-64 h-32 border-2 border-dashed border-emerald-600 rounded-2xl bg-emerald-100/40 transform -rotate-1" />
                  <div className="w-80 h-40 border border-slate-300 rounded-full absolute -top-8 -left-8" />
                  <div className="w-96 h-48 border border-emerald-200 rounded-3xl absolute -bottom-10 -right-10" />
                </div>

                {/* Indikator Arah Mata Angin (Kompas Utara) */}
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs border border-slate-300 rounded-md p-1 shadow-xs flex flex-col items-center z-10 w-9">
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-rose-600" />
                  <span className="text-[9px] font-bold text-slate-800 leading-none mt-0.5">U</span>
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[9px] border-t-slate-400 mt-0.5" />
                </div>

                {/* Titik Pin Marker Utama Madrasah */}
                <div className="relative z-10 flex flex-col items-center animate-fade-in text-center px-4 max-w-md">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-rose-500/25 animate-ping" />
                    <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md border-2 border-white">
                      <MapPin className="w-5 h-5 fill-white" />
                    </div>
                  </div>

                  <div className="mt-1.5 bg-white/95 border border-slate-300 rounded-lg px-3 py-1 shadow-xs text-center max-w-xs">
                    <p className="font-bold text-slate-900 text-[11px] leading-tight line-clamp-1">
                      {data.namaMadrasah}
                    </p>
                    <p className="text-[9.5px] text-slate-600 font-mono mt-0.5">
                      {formatDMS(lat, true)} &bull; {formatDMS(lng, false)}
                    </p>
                    <p className="text-[9px] text-emerald-800 font-medium mt-0.5">
                      Desa {data.desa}, Kec. {data.kecamatan}, Kab. {data.kabupaten}
                    </p>
                  </div>
                </div>

                {/* Badge Koordinat Geografis Presisi (Pojok Kiri Bawah) */}
                <div className="absolute bottom-2 left-2 bg-slate-900/85 text-white text-[9.5px] font-mono px-2 py-1 rounded shadow-xs z-10 flex items-center gap-1.5 backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>GPS: {lat}, {lng} (Skala Zoom {zoom}x)</span>
                </div>

                {/* QR Code Navigasi Google Maps (Pojok Kanan Bawah) */}
                {qrCodeDataUrl && (
                  <div className="absolute bottom-2 right-2 bg-white p-1 rounded border border-slate-300 shadow-xs z-10 flex flex-col items-center text-center">
                    <img
                      src={qrCodeDataUrl}
                      alt="QR Code Navigasi Lokasi"
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-[7.5px] font-bold text-slate-700 leading-tight mt-0.5">
                      Pindai Lokasi
                    </span>
                  </div>
                )}
              </div>

              {/* Link Akses Cepat Navigasi Digital (Hanya Web, Tersembunyi saat Cetak) */}
              <div className="p-1.5 bg-slate-100/90 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[10.5px] print:hidden px-3">
                <span className="text-slate-600">
                  Sumber: <strong className="text-slate-800">{data.mapsSource || 'SIAKAD / GPS Satelit'}</strong> ({data.mapsRecordedAt || 'Terekam Presisi'})
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold hover:underline"
                  >
                    <Navigation className="w-3 h-3 text-emerald-700" />
                    <span>Buka di Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: GAMBAR DENAH LOKASI / TATA RUANG MADRASAH */}
          {(activeView === 'CUSTOM' || activeView === 'BOTH') && hasCustomImage && (
            <div className="border border-slate-300 rounded-md bg-white p-2 text-center space-y-1">
              <div className="flex items-center justify-center text-[10.5px] font-bold text-slate-800 pb-1 border-b border-slate-200">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-700 mr-1" />
                <span>Denah Rancang Bangun & Tata Ruang Madrasah</span>
              </div>
              <div className="max-h-60 overflow-hidden flex items-center justify-center bg-slate-50 rounded border border-slate-200 p-1">
                <img
                  src={data.denahGambarUrl}
                  alt={`Denah Ruang ${data.namaMadrasah}`}
                  className="max-h-56 max-w-full object-contain mx-auto"
                />
              </div>
            </div>
          )}

          {/* TABEL BATAS WILAYAH ADMINISTRATIF & GEOGRAFIS RESMI */}
          <div className="border border-slate-300 rounded bg-slate-50/70 p-2 text-[10.5px] space-y-1">
            <div className="font-bold text-slate-900 border-b border-slate-200 pb-0.5 flex items-center justify-between">
              <span>Batas Wilayah Lingkungan Madrasah:</span>
              <span className="font-mono text-[9.5px] text-slate-600 font-normal">
                Lat: {lat} | Lng: {lng}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
              <div className="bg-white border border-slate-200 p-1 rounded">
                <span className="text-[9px] font-bold text-emerald-800 block">Sebelah Utara:</span>
                <span className="text-[10px] text-slate-700 leading-tight">
                  {data.batasUtara || 'Persawahan & Pemukiman Warga'}
                </span>
              </div>
              <div className="bg-white border border-slate-200 p-1 rounded">
                <span className="text-[9px] font-bold text-emerald-800 block">Sebelah Selatan:</span>
                <span className="text-[10px] text-slate-700 leading-tight">
                  {data.batasSelatan || 'Jalan Desa & Masjid As-Salafiyah'}
                </span>
              </div>
              <div className="bg-white border border-slate-200 p-1 rounded">
                <span className="text-[9px] font-bold text-emerald-800 block">Sebelah Timur:</span>
                <span className="text-[10px] text-slate-700 leading-tight">
                  {data.batasTimur || 'Pemukiman & Kebun Masyarakat'}
                </span>
              </div>
              <div className="bg-white border border-slate-200 p-1 rounded">
                <span className="text-[9px] font-bold text-emerald-800 block">Sebelah Barat:</span>
                <span className="text-[10px] text-slate-700 leading-tight">
                  {data.batasBarat || 'Saluran Irigasi & Jalan Dusun'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAPTION GAMBAR STANDAR NASKAH DINAS */}
      <div className="text-center pt-0.5">
        <p className="font-bold text-slate-900 text-[11.5px] tracking-wide">
          Gambar 1.1 Letak Wilayah dan Denah Lokasi {data.namaMadrasah}
        </p>
        <p className="text-[10px] text-slate-500 italic mt-0.5">
          Koordinat Geografis: {formatDMS(lat, true)}, {formatDMS(lng, false)} ({data.alamat || `Desa ${data.desa}, Kec. ${data.kecamatan}`})
        </p>
      </div>
    </div>
  );
};
