import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Official Logo of Kementerian Agama Republik Indonesia (Vector SVG)
 * Vector-rendered to ensure 100% reliable printing without external image dependencies or broken image icons.
 */
export const KemenagLogo: React.FC<LogoProps> = ({ className = 'w-16 h-16', size }) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} inline-block`}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo Resmi Kementerian Agama RI"
    >
      {/* Outer Golden/Green Circle Frame */}
      <circle cx="100" cy="100" r="94" fill="#006633" stroke="#D4AF37" strokeWidth="6" />
      <circle cx="100" cy="100" r="86" fill="#024B25" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />

      {/* Outer Banner Text: IKHLAS BERAMAL */}
      <path
        id="text-path-top"
        d="M 30,100 A 70,70 0 0,1 170,100"
        fill="none"
      />
      <text fill="#FFD700" fontSize="13" fontWeight="bold" letterSpacing="2" textAnchor="middle">
        <textPath href="#text-path-top" startOffset="50%">
          KEMENTERIAN AGAMA
        </textPath>
      </text>

      {/* Five-Corner Pentagonal Golden Emblem Frame */}
      <polygon
        points="100,24 172,76 144,162 56,162 28,76"
        fill="#005A28"
        stroke="#FFD700"
        strokeWidth="4"
      />

      {/* Internal Shield */}
      <path
        d="M 100,42 L 150,78 C 150,126 100,154 100,154 C 100,154 50,126 50,78 Z"
        fill="#FFFFFF"
        stroke="#D4AF37"
        strokeWidth="3"
      />

      {/* Holy Book (Al-Qur'an / Kitab Suci) base */}
      <path
        d="M 72,118 Q 100,110 128,118 L 132,106 Q 100,98 68,106 Z"
        fill="#006633"
        stroke="#FFD700"
        strokeWidth="1.5"
      />
      <path
        d="M 100,99 L 100,116"
        stroke="#FFD700"
        strokeWidth="2"
      />

      {/* Scales of Justice (Timbangan Keadilan) */}
      <path
        d="M 100,60 L 100,96 M 75,72 L 125,72"
        stroke="#D4AF37"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Left scale pan */}
      <path d="M 75,72 L 66,88 L 84,88 Z" fill="#D4AF37" />
      {/* Right scale pan */}
      <path d="M 125,72 L 116,88 L 134,88 Z" fill="#D4AF37" />

      {/* Shining Golden Star at Top of Shield */}
      <polygon
        points="100,45 103,53 111,54 105,60 107,68 100,63 93,68 95,60 89,54 97,53"
        fill="#FFD700"
        stroke="#D4AF37"
        strokeWidth="1"
      />

      {/* Rice and Cotton Garland (Padi & Kapas) */}
      <path
        d="M 58,136 C 44,110 44,80 60,62"
        stroke="#FFD700"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 142,136 C 156,110 156,80 140,62"
        stroke="#E6E6E6"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom Ribbon with Motto: IKHLAS BERAMAL */}
      <path
        d="M 46,160 Q 100,172 154,160 L 160,174 Q 100,186 40,174 Z"
        fill="#FFD700"
        stroke="#B38F00"
        strokeWidth="1.5"
      />
      <text
        x="100"
        y="173"
        textAnchor="middle"
        fill="#004D25"
        fontSize="10.5"
        fontWeight="900"
        letterSpacing="1"
        fontFamily="sans-serif"
      >
        IKHLAS BERAMAL
      </text>
    </svg>
  );
};

/**
 * Official Logo of LP Ma'arif NU / Madrasah (Vector SVG)
 * Symbol of Nahdlatul Ulama education, with globe, 9 stars, and Arabic ribbon.
 */
export const MaarifNuLogo: React.FC<LogoProps> = ({ className = 'w-16 h-16', size }) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} inline-block`}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo LP Ma'arif NU"
    >
      {/* Outer Green Octagonal / Circular Frame */}
      <circle cx="100" cy="100" r="94" fill="#0A5C36" stroke="#D4AF37" strokeWidth="6" />
      <circle cx="100" cy="100" r="86" fill="#0D6B40" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* The Globe (Bola Dunia) */}
      <circle cx="100" cy="100" r="48" fill="#137547" stroke="#FFD700" strokeWidth="3" />
      <ellipse cx="100" cy="100" rx="48" ry="18" stroke="#FFD700" strokeWidth="2" strokeDasharray="2 2" fill="none" />
      <ellipse cx="100" cy="100" rx="20" ry="48" stroke="#FFD700" strokeWidth="2" strokeDasharray="2 2" fill="none" />
      <line x1="52" y1="100" x2="148" y2="100" stroke="#FFD700" strokeWidth="2" />
      <line x1="100" y1="52" x2="100" y2="148" stroke="#FFD700" strokeWidth="2" />

      {/* Surrounding Golden Rope (Tali Jagad Ikatan Ukhuwah) */}
      <circle cx="100" cy="100" r="54" stroke="#FFD700" strokeWidth="3.5" strokeDasharray="6 4" fill="none" />

      {/* 9 Stars (9 Bintang Ma'arif NU) */}
      {/* 1 Big Star Top Center (Nabi Muhammad SAW) */}
      <polygon points="100,26 103,34 112,35 106,41 108,50 100,45 92,50 94,41 88,35 97,34" fill="#FFD700" stroke="#B38F00" strokeWidth="0.8" />
      
      {/* 4 Stars Right (Khulafaur Rasyidin) */}
      <polygon points="135,36 137,42 143,43 138,47 140,53 135,50 130,53 132,47 127,43 133,42" fill="#FFD700" />
      <polygon points="158,56 160,62 166,63 161,67 163,73 158,70 153,73 155,67 150,63 156,62" fill="#FFD700" />
      <polygon points="168,82 170,88 176,89 171,93 173,99 168,96 163,99 165,93 160,89 166,88" fill="#FFD700" />
      <polygon points="162,110 164,116 170,117 165,121 167,127 162,124 157,127 159,121 154,117 160,116" fill="#FFD700" />

      {/* 4 Stars Left (4 Madzhab Fiqih) */}
      <polygon points="65,36 67,42 73,43 68,47 70,53 65,50 60,53 62,47 57,43 63,42" fill="#FFD700" />
      <polygon points="42,56 44,62 50,63 45,67 47,73 42,70 37,73 39,67 34,63 40,62" fill="#FFD700" />
      <polygon points="32,82 34,88 40,89 35,93 37,99 32,96 27,99 29,93 24,89 30,88" fill="#FFD700" />
      <polygon points="38,110 40,116 46,117 41,121 43,127 38,124 33,127 35,121 30,117 36,116" fill="#FFD700" />

      {/* Lower Ribbon with LP MA'ARIF NU */}
      <path
        d="M 44,152 Q 100,166 156,152 L 164,168 Q 100,184 36,168 Z"
        fill="#FFD700"
        stroke="#B38F00"
        strokeWidth="1.5"
      />
      <text
        x="100"
        y="166"
        textAnchor="middle"
        fill="#0A5C36"
        fontSize="11"
        fontWeight="900"
        letterSpacing="1"
        fontFamily="sans-serif"
      >
        LP MA'ARIF NU
      </text>

      {/* Top Arch Text: NAHDLATUL ULAMA */}
      <path id="maarif-top-path" d="M 36,96 A 66,66 0 0,1 164,96" fill="none" />
      <text fill="#FFFFFF" fontSize="10.5" fontWeight="bold" letterSpacing="1.5" textAnchor="middle">
        <textPath href="#maarif-top-path" startOffset="50%">
          MA'ARIF NU SANGGREMAN
        </textPath>
      </text>
    </svg>
  );
};
