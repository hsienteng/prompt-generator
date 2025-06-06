import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

function Header() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="sticky-header px-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header">
        <div className="flex align-items-center justify-content-between">
          <div className="flex align-items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <img
                src="/img/aia-logo.png"
                alt="AIA Logo"
                className="mr-3"
                style={{
                  height: '2.5rem',
                  width: 'auto',
                }}
              />
            </motion.div>
            <div>
              <motion.h1
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t('header.title')}
              </motion.h1>
            </div>
          </div>
          <div className="flex align-items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
