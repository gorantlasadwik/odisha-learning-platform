import React from 'react';
import { useTranslation } from 'react-i18next';

const Logo = ({ className = "", size = "h-16 w-16", ...props }) => {
  const { i18n } = useTranslation();
  
  // Determine which logo to use based on current language
  const getLogoSrc = () => {
    switch (i18n.language) {
      case 'or': // Odia
        return '/logo-odia.png';
      case 'en': // English
      case 'hi': // Hindi - use English logo for Hindi
      default:
        return '/logo-english.png';
    }
  };

  const getLogoAlt = () => {
    switch (i18n.language) {
      case 'or':
        return 'ଶିକ୍ଷାମିତ୍ର ଲୋଗୋ';
      case 'hi':
        return 'शिक्षामित्र लोगो';
      case 'en':
      default:
        return 'ShikshaMitra Logo';
    }
  };

  return (
    <img
      src={getLogoSrc()}
      alt={getLogoAlt()}
      className={`${size} ${className} object-contain`}
      {...props}
    />
  );
};

export default Logo;