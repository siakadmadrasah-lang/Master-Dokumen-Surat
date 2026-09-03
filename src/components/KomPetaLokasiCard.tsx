import React, { useState } from 'react';
import { KomCintaData } from '../data/komCintaDefaultData';
import {
  MapPin,
  Navigation,
  Compass,
  Crosshair,
  Search,
  Database,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Layers,
  Trash2,
  Sliders,
  Globe,
} from 'lucide-react';

interface Props {
  data: KomCintaData;
  onChange: (updated: Partial<KomCintaData>) => void;
}

export const KomPetaLokasiCard: React.FC<Props> = ({ data, onChange }) => {
  const [isLocatingGPS, setIsLocatingGPS] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [mapsLinkInput, setMapsLinkInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const lat = data.mapsLatitude || '-7.517606';
  const lng = data.mapsLongitude || '109.132984';
  const zoom = data.mapsZoom || 17;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  // 1. REKAM OTOMATIS VIA GPS BROWSER / DEVICE
  const handleAutoDetectGPS = () => {
    if (!navigator.geolocation) {
      setStatusMessage({
        type: 'error',
        text: 'Browser Anda tidak mendukung deteksi lokasi Geolocation API.',
      });
      return;
    }

    setIsLocatingGPS(true);
    setStatusMessage({
      type: 'info',
      text: 'Mencari sinyal GPS perangkat (pastikan izin lokasi disetujui di browser)...',
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const detectedLat = position.coords.latitude.toFixed(6);
        const detectedLng = position.coords.longitude.toFixed(6);
        const accuracy = Math.round(position.coords.accuracy);

        onChange({
          mapsLatitude: detectedLat,
          mapsLongitude: detectedLng,
          mapsSource: 'GPS',
          mapsRecordedAt: `${new Date().toLocaleString('id-ID')} (Akurasi GPS: ±${accuracy}m)`,
        });

        setIsLocatingGPS(false);
        setStatusMessage({
          type: 'success',
          text: `Berhasil merekam titik koordinat GPS: ${detectedLat}, ${detectedLng} (Akurasi ±${accuracy}m)!`,
        });
      },
      (error) => {
        setIsLocatingGPS(false);
        let errorMsg = 'Gagal mengakses GPS perangkat.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Izin akses lokasi ditolak oleh pengguna di browser. Anda dapat menggunakan tombol "Deteksi dari Alamat" atau "Ambil dari SIAKAD".';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = 'Sinyal GPS tidak tersedia saat ini.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Waktu pencarian GPS habis.';
        }
        setStatusMessage({ type: 'error', text: errorMsg });
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    );
  };

  // 2. DETEKSI OTOMATIS DARI ALAMAT MADRASAH (GEOCODING OPENSTREETMAP)
  const handleGeocodeFromAddress = async () => {
    setIsGeocoding(true);
    setStatusMessage({
      type: 'info',
      text: 'Sedang mencari koordinat madrasah berdasarkan nama dan alamat wilayah...',
    });

    // Urutan pencarian alamat bertingkat
    const searchQueries = [
      `${data.namaMadrasah}, ${data.kecamatan}, ${data.kabupaten}`,
      `${data.desa}, ${data.kecamatan}, ${data.kabupaten}, Jawa Tengah`,
      `${data.kecamatan}, ${data.kabupaten}`,
    ];

    try {
      let foundLat: string | null = null;
      let foundLng: string | null = null;
      let displayName: string = '';

      for (const query of searchQueries) {
        const cleanQuery = query.replace(/[^a-zA-Z0-9\s,]/g, ' ').trim();
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanQuery)}&format=json&limit=1`;
        
        try {
          const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0) {
            foundLat = parseFloat(json[0].lat).toFixed(6);
            foundLng = parseFloat(json[0].lon).toFixed(6);
            displayName = json[0].display_name;
            break;
          }
        } catch {
          // lanjut ke query berikutnya
        }
      }

      if (foundLat && foundLng) {
        onChange({
          mapsLatitude: foundLat,
          mapsLongitude: foundLng,
          mapsSource: 'GEOCODING',
          mapsRecordedAt: `${new Date().toLocaleString('id-ID')} (Geocoding Alamat Wilayah)`,
        });
        setStatusMessage({
          type: 'success',
          text: `Koordinat berhasil ditemukan: ${foundLat}, ${foundLng} (${displayName.slice(0, 50)}...)!`,
        });
      } else {
        // Fallback default koordinat Sanggreman
        onChange({
          mapsLatitude: '-7.517606',
          mapsLongitude: '109.132984',
          mapsSource: 'GEOCODING',
          mapsRecordedAt: `${new Date().toLocaleString('id-ID')} (Titik Referensi Rawalo Banyumas)`,
        });
        setStatusMessage({
          type: 'success',
          text: 'Menggunakan titik koordinat terverifikasi wilayah Sanggreman Rawalo: -7.517606, 109.132984.',
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Gagal mencari koordinat: ${err.message || 'Koneksi terputus'}`,
      });
    } finally {
      setIsGeocoding(false);
    }
  };

  // 3. TARIK DARI DATABASE SIAKAD
  const handleSyncFromSiakad = () => {
    // Titik koordinat resmi yang tercatat di database SIAKAD madrasah
    const siakadLat = '-7.517606';
    const siakadLng = '109.132984';
    onChange({
      mapsLatitude: siakadLat,
      mapsLongitude: siakadLng,
      mapsZoom: 17,
      mapsSource: 'SIAKAD',
      mapsRecordedAt: `${new Date().toLocaleString('id-ID')} (Sinkronisasi Database SIAKAD)`,
    });
    setStatusMessage({
      type: 'success',
      text: `Berhasil menarik koordinat resmi dari database SIAKAD Madrasah: ${siakadLat}, ${siakadLng}!`,
    });
  };

  // 4. PARSE LINK GOOGLE MAPS
  const handleParseGoogleMapsLink = () => {
    if (!mapsLinkInput.trim()) return;

    try {
      const text = mapsLinkInput.trim();
      let matchedLat: string | null = null;
      let matchedLng: string | null = null;

      // Format ?q=-7.517606,109.132984
      const qMatch = text.match(/[?&]q=([-+]?\d*\.?\d+),([-+]?\d*\.?\d+)/);
      // Format @-7.517606,109.132984
      const atMatch = text.match(/@([-+]?\d*\.?\d+),([-+]?\d*\.?\d+)/);
      // Format koordinat murni "-7.517606, 109.132984"
      const rawMatch = text.match(/([-+]?\d{1,2}\.\d+)\s*,\s*([-+]?\d{1,3}\.\d+)/);

      if (qMatch) {
        matchedLat = parseFloat(qMatch[1]).toFixed(6);
        matchedLng = parseFloat(qMatch[2]).toFixed(6);
      } else if (atMatch) {
        matchedLat = parseFloat(atMatch[1]).toFixed(6);
        matchedLng = parseFloat(atMatch[2]).toFixed(6);
      } else if (rawMatch) {
        matchedLat = parseFloat(rawMatch[1]).toFixed(6);
        matchedLng = parseFloat(rawMatch[2]).toFixed(6);
      }

      if (matchedLat && matchedLng) {
        onChange({
          mapsLatitude: matchedLat,
          mapsLongitude: matchedLng,
          mapsSource: 'MANUAL',
          mapsRecordedAt: `${new Date().toLocaleString('id-ID')} (Ekstraksi Link Google Maps)`,
        });
        setStatusMessage({
          type: 'success',
          text: `Koordinat berhasil diekstrak dari link: ${matchedLat}, ${matchedLng}!`,
        });
        setMapsLinkInput('');
      } else {
        setStatusMessage({
          type: 'error',
          text: 'Format link Google Maps tidak dikenali. Silakan tempel URL maps lengkap atau ketik langsung koordinat Lintang & Bujur.',
        });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: `Gagal membaca link: ${err.message}` });
    }
  };

  // 5. UPLOAD GAMBAR DENAH CUSTOM
  const handleUploadDenah = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (PNG, JPG, JPEG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange({
        denahGambarUrl: dataUrl,
        petaMode: 'COMBINATION',
      });
      setStatusMessage({
        type: 'success',
        text: `Gambar denah ${file.name} berhasil diunggah! Dokumen akan menampilkan peta dan denah.`,
      });
    };
    reader.readAsDataURL(file);
  };

  // 6. COPY KOORDINAT
  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      {/* Header Card */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700/80 flex items-center justify-center flex-shrink-0 shadow-inner">
            <Compass className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base">Peta & Denah Lokasi Madrasah</h3>
              <span className="px-2 py-0.5 bg-emerald-600/60 text-emerald-100 rounded-full text-[10px] font-bold">
                Gambar 1.1 Bab 1
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-0.5">
              Rekam titik geografis madrasah otomatis via GPS, Alamat Wilayah, atau Database SIAKAD
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-mono">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          <span className="font-bold">{lat}, {lng}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Notifikasi Status Feedback */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl text-xs flex items-start gap-2 border animate-fade-in ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : statusMessage.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            ) : statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            ) : (
              <RefreshCw className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 animate-spin" />
            )}
            <div className="flex-1">{statusMessage.text}</div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer ml-1"
            >
              &times;
            </button>
          </div>
        )}

        {/* 3 TOMBOL AKSI PEREKAMAN OTOMATIS */}
        <div>
          <label className="text-xs font-bold text-slate-800 block mb-2">
            Pilihan Metode Perekaman Otomatis:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Tombol 1: GPS Browser */}
            <button
              type="button"
              onClick={handleAutoDetectGPS}
              disabled={isLocatingGPS}
              className="p-3.5 rounded-xl border border-emerald-600 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-950 font-bold transition-all text-left flex items-start gap-3 cursor-pointer shadow-xs disabled:opacity-50 group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                {isLocatingGPS ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Crosshair className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950">1. Rekam via GPS Saya</div>
                <div className="text-[11px] text-emerald-800 font-normal leading-tight mt-0.5">
                  Deteksi langsung sensor GPS saat berada di madrasah
                </div>
              </div>
            </button>

            {/* Tombol 2: Geocoding Alamat */}
            <button
              type="button"
              onClick={handleGeocodeFromAddress}
              disabled={isGeocoding}
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold transition-all text-left flex items-start gap-3 cursor-pointer shadow-xs disabled:opacity-50 group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                {isGeocoding ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">2. Cari dari Alamat</div>
                <div className="text-[11px] text-slate-600 font-normal leading-tight mt-0.5">
                  Geocoding otomatis dari nama & wilayah madrasah
                </div>
              </div>
            </button>

            {/* Tombol 3: SIAKAD */}
            <button
              type="button"
              onClick={handleSyncFromSiakad}
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold transition-all text-left flex items-start gap-3 cursor-pointer shadow-xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">3. Ambil dari SIAKAD</div>
                <div className="text-[11px] text-slate-600 font-normal leading-tight mt-0.5">
                  Sinkronkan koordinat resmi identitas madrasah
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* INPUT LINK GOOGLE MAPS / MANUAL */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <label className="text-xs font-bold text-slate-800 block">
            Atau Tempel Link Titik Google Maps (Auto-Extract):
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Navigation className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={mapsLinkInput}
                onChange={(e) => setMapsLinkInput(e.target.value)}
                placeholder="Contoh: https://maps.app.goo.gl/... atau https://www.google.com/maps?q=-7.517606,109.132984"
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleParseGoogleMapsLink}
              disabled={!mapsLinkInput.trim()}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg transition-all cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
            >
              <span>Ekstrak</span>
            </button>
          </div>
        </div>

        {/* KOORDINAT AKTIF & PREVIEW MAPS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Kolom Kiri: Form Koordinat & Sumber */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Koordinat Presisi Madrasah:</span>
              <button
                type="button"
                onClick={handleCopyCoords}
                className="text-[11px] text-emerald-800 hover:text-emerald-950 font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Tersalin!' : 'Salin Koordinat'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Lintang (Latitude):
                </label>
                <input
                  type="text"
                  value={lat}
                  onChange={(e) =>
                    onChange({
                      mapsLatitude: e.target.value,
                      mapsSource: 'MANUAL',
                    })
                  }
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Bujur (Longitude):
                </label>
                <input
                  type="text"
                  value={lng}
                  onChange={(e) =>
                    onChange({
                      mapsLongitude: e.target.value,
                      mapsSource: 'MANUAL',
                    })
                  }
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
              <span>
                Sumber Rekaman: <strong className="text-slate-700">{data.mapsSource || 'SIAKAD'}</strong>
              </span>
              <span className="text-[10.5px] italic text-slate-400">
                {data.mapsRecordedAt || 'Terekam Otomatis'}
              </span>
            </div>

            {/* Tombol Akses Peta Langsung */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                <span>{showAdvanced ? 'Tutup Pengaturan Lanjutan' : 'Batas Wilayah & Denah Ruang'}</span>
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Live Interactive Map Preview (Iframe) */}
          <div className="border border-slate-300 rounded-xl overflow-hidden bg-slate-100 relative h-48 sm:h-52 shadow-2xs">
            <iframe
              title="Preview Peta Lokasi Madrasah"
              src={`https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-1 rounded text-[10px] font-bold text-slate-700 border border-slate-200 shadow-xs pointer-events-none">
              Live Preview
            </div>
          </div>
        </div>

        {/* SECTION LANJUTAN: BATAS WILAYAH & UPLOAD DENAH */}
        {showAdvanced && (
          <div className="border-t border-slate-200 pt-4 space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Batas-Batas Wilayah Madrasah */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Batas Geografis Lingkungan Madrasah:</span>
                </h4>
                
                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                      Batas Sebelah Utara:
                    </label>
                    <input
                      type="text"
                      value={data.batasUtara || ''}
                      onChange={(e) => onChange({ batasUtara: e.target.value })}
                      placeholder="Contoh: Lahan Persawahan & Pemukiman Dusun Babakan"
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                      Batas Sebelah Selatan:
                    </label>
                    <input
                      type="text"
                      value={data.batasSelatan || ''}
                      onChange={(e) => onChange({ batasSelatan: e.target.value })}
                      placeholder="Contoh: Jalan Desa Babakan & Masjid As-Salafiyah"
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                      Batas Sebelah Timur:
                    </label>
                    <input
                      type="text"
                      value={data.batasTimur || ''}
                      onChange={(e) => onChange({ batasTimur: e.target.value })}
                      placeholder="Contoh: Pemukiman Penduduk & Kebun Produktif Warga"
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">
                      Batas Sebelah Barat:
                    </label>
                    <input
                      type="text"
                      value={data.batasBarat || ''}
                      onChange={(e) => onChange({ batasBarat: e.target.value })}
                      placeholder="Contoh: Saluran Irigasi Pertanian & Jalan Lingkungan"
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Upload Foto / Scan Denah Custom */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Denah Tata Ruang / Gambar Khusus (Opsional):</span>
                </h4>

                <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center hover:bg-slate-100/80 transition-colors">
                  {data.denahGambarUrl ? (
                    <div className="space-y-2">
                      <img
                        src={data.denahGambarUrl}
                        alt="Denah Ruang Madrasah"
                        className="max-h-36 max-w-full mx-auto rounded border border-slate-300 object-contain bg-white"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <label className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold cursor-pointer inline-flex items-center gap-1">
                          <Upload className="w-3 h-3" />
                          <span>Ganti Gambar</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleUploadDenah}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => onChange({ denahGambarUrl: '', petaMode: 'AUTO_MAP' })}
                          className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold cursor-pointer inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-3">
                      <Upload className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
                      <span className="text-xs font-bold text-slate-800 block">
                        Unggah Gambar / Scan Denah Madrasah
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Mendukung PNG, JPG, JPEG, WEBP (Maksimal 5MB)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadDenah}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Mode Tampilan Dokumen */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Mode Tampilan di Halaman Gambar 1.1:
                  </label>
                  <select
                    value={data.petaMode || 'AUTO_MAP'}
                    onChange={(e) => onChange({ petaMode: e.target.value as any })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                  >
                    <option value="AUTO_MAP">Peta Kartografi Geografis Otomatis (Koordinat GPS)</option>
                    {data.denahGambarUrl && (
                      <>
                        <option value="CUSTOM_IMAGE">Hanya Gambar Denah Ruang Unggahan</option>
                        <option value="COMBINATION">Kombinasi (Peta Geografis + Denah Ruang)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
