import React from 'react';
import { MadrasahProfile } from '../types';
import { KemenagLogo, MaarifNuLogo } from './OfficialLogos';

interface OfficialLetterheadProps {
  profile: MadrasahProfile;
  className?: string;
  isCompact?: boolean;
}

export const OfficialLetterhead: React.FC<OfficialLetterheadProps> = ({
  profile,
  className = '',
  isCompact = false,
}) => {
  const cfg = profile.kopSuratConfig || {};

  const showLogoKiri = cfg.showLogoKiri !== false;
  const showLogoKanan = cfg.showLogoKanan !== false;

  const baris1 =
    cfg.baris1Instansi || 'KEMENTERIAN AGAMA REPUBLIK INDONESIA';
  const baris2 =
    cfg.baris2Wilayah ||
    `KANTOR KEMENTERIAN AGAMA ${profile.kabupatenKota?.toUpperCase() || 'KABUPATEN BANYUMAS'}`;
  const namaMadrasahKop =
    cfg.namaMadrasahKop || profile.namaMadrasah;

  const logoKiriSizeClass =
    cfg.logoKiriSize === 'SM'
      ? 'w-12 h-12 sm:w-14 sm:h-14'
      : cfg.logoKiriSize === 'LG'
      ? 'w-16 h-16 sm:w-22 sm:h-22'
      : 'w-14 h-14 sm:w-18 sm:h-18';

  const logoKananSizeClass =
    cfg.logoKananSize === 'SM'
      ? 'w-12 h-12 sm:w-14 sm:h-14'
      : cfg.logoKananSize === 'LG'
      ? 'w-16 h-16 sm:w-22 sm:h-22'
      : 'w-14 h-14 sm:w-18 sm:h-18';

  const garisStyle = cfg.garisPemisahStyle || 'DOUBLE';
  const warnaGaris = cfg.warnaGaris || '#0f172a';

  // Custom texts or standard fallbacks
  const identitasText =
    cfg.customIdentitasText ||
    `NSM: ${profile.nsm} | NPSN: ${profile.npsn} | Akreditasi: ${profile.akreditasi}`;

  const alamatText =
    cfg.customAlamatText ||
    `${profile.alamat}${profile.desaKelurahan ? `, ${profile.desaKelurahan}` : ''}${
      profile.kecamatan ? `, Kec. ${profile.kecamatan}` : ''
    }, ${profile.kabupatenKota || ''}, ${profile.provinsi || ''}${
      profile.kodePos ? ` - Kode Pos: ${profile.kodePos}` : ''
    }`;

  const kontakText =
    cfg.customKontakText ||
    `Telp: ${profile.telepon || '(0281) 6841234'} | Email: ${profile.email}${
      profile.website ? ` | Website: ${profile.website}` : ''
    }`;

  const showBasmalah = cfg.showBasmalah !== false;

  // Determine line style classes
  let borderStyleNode = (
    <div
      style={{ borderColor: warnaGaris }}
      className="border-b-[3.5px] border-double my-3"
    />
  );
  if (garisStyle === 'SINGLE') {
    borderStyleNode = (
      <div
        style={{ borderColor: warnaGaris }}
        className="border-b-[1.5px] border-solid my-3"
      />
    );
  } else if (garisStyle === 'THICK') {
    borderStyleNode = (
      <div
        style={{ borderColor: warnaGaris }}
        className="border-b-[3px] border-solid my-3"
      />
    );
  } else if (garisStyle === 'NONE') {
    borderStyleNode = <div className="my-2" />;
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo Kiri */}
        {showLogoKiri ? (
          <div className="flex-shrink-0 flex items-center justify-center p-1">
            {cfg.logoKiriUrl || (profile.logoKemenagUrl && !profile.logoKemenagUrl.includes('wikimedia.org')) ? (
              <img
                src={cfg.logoKiriUrl || profile.logoKemenagUrl}
                alt="Logo Kiri Kop"
                className={`${logoKiriSizeClass} object-contain`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <KemenagLogo className={logoKiriSizeClass} />
            )}
          </div>
        ) : (
          <div className="w-4" />
        )}

        {/* Teks Tengah Kop Surat */}
        <div className="text-center flex-1 space-y-0.5 px-1">
          {baris1 && (
            <p className="text-[11px] sm:text-[13px] font-bold tracking-wider text-slate-800 uppercase leading-snug">
              {baris1}
            </p>
          )}
          {baris2 && (
            <p className="text-[10px] sm:text-[12px] font-semibold text-slate-800 uppercase leading-snug">
              {baris2}
            </p>
          )}
          <h1 className="text-sm sm:text-lg md:text-xl font-extrabold text-emerald-950 uppercase tracking-wide leading-tight pt-0.5">
            {namaMadrasahKop}
          </h1>
          <p className="text-[9.5px] sm:text-[11px] text-slate-700 font-medium leading-normal">
            {identitasText}
          </p>
          <p className="text-[9px] sm:text-[10px] text-slate-600 line-clamp-2 leading-tight">
            {alamatText}
          </p>
          <p className="text-[9px] sm:text-[10px] text-slate-600 leading-tight">
            {kontakText}
          </p>
        </div>

        {/* Logo Kanan */}
        {showLogoKanan ? (
          <div className="flex-shrink-0 flex items-center justify-center p-1">
            {cfg.logoKananUrl || profile.logoMadrasahUrl ? (
              <img
                src={cfg.logoKananUrl || profile.logoMadrasahUrl}
                alt="Logo Kanan Kop"
                className={`${logoKananSizeClass} object-contain`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <MaarifNuLogo className={logoKananSizeClass} />
            )}
          </div>
        ) : (
          <div className="w-4" />
        )}
      </div>

      {/* Garis Pemisah Kop Surat */}
      {borderStyleNode}

      {/* Basmalah */}
      {showBasmalah && (
        <div className="text-center my-2.5 font-serif text-lg text-emerald-900 leading-none">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      )}
    </div>
  );
};
