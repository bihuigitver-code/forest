import React from 'react';

interface EmblemProps {
  className?: string;
  size?: number;
}

export const Emblem: React.FC<EmblemProps> = ({ className = '', size = 72 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Department Emblem Placeholder"
      role="img"
    >
      {/* Outer concentric rings */}
      <circle cx="50" cy="50" r="47" stroke="#174A32" strokeWidth="2.5" fill="#FAFAF7" />
      <circle cx="50" cy="50" r="44" stroke="#B79A52" strokeWidth="1" strokeDasharray="2 1.5" />
      <circle cx="50" cy="50" r="41.5" stroke="#174A32" strokeWidth="1.2" fill="none" />

      {/* Decorative sunburst rays at top */}
      <path d="M50 11 L50 14" stroke="#B79A52" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M43 12 L44.5 14.5" stroke="#B79A52" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M57 12 L55.5 14.5" stroke="#B79A52" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M37 14 L39 16.5" stroke="#B79A52" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M63 14 L61 16.5" stroke="#B79A52" strokeWidth="1.2" strokeLinecap="round" />

      {/* Hill silhouettes representing forest landscape */}
      <path
        d="M20 70 Q35 56 50 63 Q65 54 80 70 Z"
        fill="#2E6F4C"
        opacity="0.25"
      />
      <path
        d="M15 74 Q32 62 48 68 Q68 59 85 74 Z"
        fill="#24563B"
        opacity="0.4"
      />

      {/* Tree of Conservation (Kalpavriksha / Banyan stylized) */}
      {/* Tree Trunk & Roots */}
      <path
        d="M48 68 C48 60 46 54 44 48 C43 45 45 42 48 40 C47 43 49 46 51 46 C53 46 55 43 54 40 C57 42 59 45 58 48 C56 54 54 60 54 68 Z"
        fill="#174A32"
      />
      <path
        d="M45 68 C43 72 38 75 34 76"
        stroke="#174A32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M55 68 C57 72 62 75 66 76"
        stroke="#174A32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Foliage Canopy - Layered emerald shapes */}
      <circle cx="50" cy="32" r="14" fill="#174A32" />
      <circle cx="39" cy="36" r="10" fill="#24563B" />
      <circle cx="61" cy="36" r="10" fill="#24563B" />
      <circle cx="32" cy="42" r="7.5" fill="#2E6F4C" />
      <circle cx="68" cy="42" r="7.5" fill="#2E6F4C" />
      <circle cx="50" cy="24" r="8" fill="#2E6F4C" />

      {/* Inner foliage highlights */}
      <circle cx="45" cy="30" r="3" fill="#B79A52" opacity="0.8" />
      <circle cx="55" cy="31" r="2.5" fill="#B79A52" opacity="0.8" />
      <circle cx="50" cy="37" r="3" fill="#B79A52" opacity="0.8" />

      {/* Wildlife Silhouettes (Deer leaping left, Bird soaring right) */}
      {/* Deer on left base */}
      <path
        d="M27 68 C27 65 29 64 31 64 C32 64 32.5 63 32 61 C31.5 59.5 30 58.5 31.5 58 C32.5 57.5 33.5 59 34 60 C34.5 61 35 63 35 65 C35 67 33 68 31 68 Z"
        fill="#B79A52"
      />

      {/* Soaring Bird on right */}
      <path
        d="M68 24 Q72 21 76 23 Q72 25 70 27 Q67 25 68 24 Z"
        fill="#B79A52"
      />

      {/* Base Banner / Pedestal */}
      <path
        d="M24 75 L76 75 L73 83 L27 83 Z"
        fill="#174A32"
      />
      <rect x="26" y="76" width="48" height="6" fill="#24563B" stroke="#B79A52" strokeWidth="0.6" />

      {/* Sanskrit Inscription placeholder dots / decorative bar */}
      <circle cx="32" cy="79" r="1" fill="#B79A52" />
      <line x1="36" y1="79" x2="64" y2="79" stroke="#B79A52" strokeWidth="1" strokeLinecap="round" />
      <circle cx="68" cy="79" r="1" fill="#B79A52" />

      {/* Lower leaves garland */}
      <path
        d="M28 85 Q50 90 72 85"
        stroke="#B79A52"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};
