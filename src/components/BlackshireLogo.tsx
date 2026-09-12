import React from 'react';

interface BlackshireLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'full' | 'crest-only' | 'horizontal';
  className?: string;
  color?: 'gold' | 'white' | 'dual';
}

/**
 * Blackshire Motors Original Brand Logo & Stallion Shield Crest
 * Uses high-visibility, crisp assets calibrated for luxury dark backgrounds.
 */
export const BlackshireLogo: React.FC<BlackshireLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  className = '',
  color = 'gold',
}) => {
  // Height constraints matching natural aspect ratio with 100px option
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12 md:h-14',
    lg: 'h-14 sm:h-16 md:h-20',
    xl: 'h-16 sm:h-20 md:h-[90px] lg:h-[100px]',
    '2xl': 'h-20 sm:h-24 md:h-[105px] lg:h-[115px]',
  };

  const crestSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
    '2xl': 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const imgSrc =
    variant === 'crest-only'
      ? color === 'white'
        ? '/crest.png'
        : '/crest-gold.png'
      : color === 'dual'
      ? '/logo-dual.png'
      : color === 'white'
      ? '/logo.png'
      : '/logo-gold.png';

  const glowFilter =
    color === 'white'
      ? 'drop-shadow-[0_2px_12px_rgba(255,255,255,0.35)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
      : 'drop-shadow-[0_2px_14px_rgba(243,194,98,0.35)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]';

  if (variant === 'crest-only') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={imgSrc}
          alt="Blackshire Motors Crest"
          referrerPolicy="no-referrer"
          className={`${crestSizes[size]} object-contain ${glowFilter} select-none transition-transform duration-300 hover:scale-105`}
        />
      </div>
    );
  }

  // Full / Horizontal representation with prominent clarity on dark backgrounds
  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src={imgSrc}
        alt="Blackshire Motors"
        referrerPolicy="no-referrer"
        className={`${heightClasses[size]} w-auto object-contain max-w-full ${glowFilter} transition-all duration-300 hover:brightness-110 hover:scale-[1.02]`}
      />
    </div>
  );
};

export default BlackshireLogo;
