import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const languages = [
    { code: 'en', name: 'EN', fullName: 'English', flag: '🇺🇸' },
    { code: 'th', name: 'TH', fullName: 'ไทย', flag: '🇹🇭' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageChange = languageCode => {
    i18n.changeLanguage(languageCode);
  };

  // Define animation variants for tab states
  const tabVariants = {
    inactive: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.7)',
      scale: 1,
    },
    active: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: '#333',
      scale: 1.05,
    },
    hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      scale: 1.02,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className="flex align-items-center"
    >
      <div className="flex bg-black-alpha-10 border-round-xl p-1 backdrop-blur-sm border-1 border-white-alpha-10 shadow-2">
        {languages.map(language => {
          const isActive = i18n.language === language.code;

          return (
            <motion.button
              key={language.code}
              variants={tabVariants}
              initial="inactive"
              animate={isActive ? 'active' : 'inactive'}
              whileHover={!isActive ? 'hover' : 'active'}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                'flex align-items-center justify-content-center gap-2 p-2 px-4 border-none border-round-lg',
                'cursor-pointer font-semibold transition-all transition-duration-200 min-w-4rem relative',
                'focus:outline-2 focus:outline-white-alpha-30 focus:outline-offset-2 text-sm font-family-inherit'
              )}
              onClick={() => handleLanguageChange(language.code)}
              title={language.fullName}
            >
              <span className="text-xl">{language.flag}</span>
              <span className="text-sm font-bold">{language.name}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LanguageSwitcher;
