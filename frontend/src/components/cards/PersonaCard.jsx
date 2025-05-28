import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { translateNeeds } from '../../i18n/translateDynamicContent';

const PersonaCard = ({ customer, position, isCenter, isVisible }) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  // Translate the customer needs
  const translatedNeeds = translateNeeds(customer.needs, t);

  const getCardVariant = position => {
    if (position === 0) {
      return {
        x: 0,
        opacity: 1,
        scale: 1,
        zIndex: 10,
      };
    } else {
      return {
        x: position * 200,
        opacity: Math.abs(position) <= 1 ? 0.4 : 0,
        scale: 0.8,
        zIndex: 1,
      };
    }
  };

  return (
    <motion.div
      key={customer.id}
      animate={getCardVariant(position)}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      }}
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        pointerEvents: isCenter ? 'auto' : 'none',
      }}
      className={`
        w-full max-w-25rem
        md:max-w-20rem
        sm:max-w-17rem
      `}
    >
      <motion.div
        className="bg-white border-round-xl shadow-3 p-4"
        style={{ minHeight: '200px' }}
        whileHover={isCenter ? { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
        transition={{ duration: 0.2 }}
      >
        <div className="flex align-items-center gap-4 md:flex-column md:text-center sm:flex-column sm:text-center">
          <img
            src={customer.image}
            alt={customer.name}
            className="border-circle flex-shrink-0"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
            }}
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-900 m-0 mb-2">{customer.name}</h3>
            <p className="text-600 m-0 mb-3 text-lg">
              {t('persona.age')} {customer.age}
            </p>
            <h4 className="text-lg font-bold text-900 m-0 mb-2">{t('persona.needs')}</h4>
            <p className="text-600 m-0 line-height-3 text-base">{translatedNeeds.join(', ')}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PersonaCard;
