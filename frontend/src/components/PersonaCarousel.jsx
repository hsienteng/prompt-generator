import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import PersonaCard from './cards/PersonaCard';
import customers from '../data/persona.json';
import usePersonaStore from '../store/personaStore';

const PersonaCarousel = memo(({ onNextStep, onPrevStep }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const setSelectedPersona = usePersonaStore(state => state.setSelectedPersona);

  useEffect(() => {
    if (customers.length > 0) {
      setSelectedPersona(customers[0]);
    }
  }, [setSelectedPersona]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex === customers.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedPersona(customers[newIndex]);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning, setSelectedPersona]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex === 0 ? customers.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedPersona(customers[newIndex]);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning, setSelectedPersona]);

  const getCardPosition = useCallback(
    cardIndex => {
      let position = cardIndex - currentIndex;
      if (position > customers.length / 2) position -= customers.length;
      if (position < -customers.length / 2) position += customers.length;
      return position;
    },
    [currentIndex]
  );

  const renderCustomerCard = useCallback(
    (customer, index) => {
      const position = getCardPosition(index);
      const isCenter = position === 0;
      const isVisible = Math.abs(position) <= 1;

      if (!isVisible) return null;

      return (
        <PersonaCard
          key={customer.id}
          customer={customer}
          position={position}
          isCenter={isCenter}
          isVisible={isVisible}
        />
      );
    },
    [getCardPosition]
  );

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <div
      className="w-full"
      style={{
        minHeight: '500px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        className="relative w-full h-full flex align-items-center justify-content-center"
        style={{ minHeight: '500px', padding: '2rem 0' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-full flex align-items-center justify-content-center">
          {customers.map((customer, index) => renderCustomerCard(customer, index))}
        </div>
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="absolute left-0 md:left-0 sm:left-0 z-6"
        >
          <Button
            icon="pi pi-chevron-left"
            onClick={prevSlide}
            className="p-button-rounded border-circle"
            style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: 'rgba(51, 65, 85, 0.9)',
              border: 'none',
              color: 'white',
            }}
          />
        </motion.div>
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="absolute right-0 md:right-0 sm:right-0 z-6"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            right: '2rem',
          }}
        >
          <Button
            icon="pi pi-chevron-right"
            onClick={nextSlide}
            className="p-button-rounded border-circle"
            style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: 'rgba(51, 65, 85, 0.9)',
              border: 'none',
              color: 'white',
            }}
          />
        </motion.div>
      </motion.div>
      <div className="flex justify-content-center align-items-center px-4 py-3">
        <div className="flex w-full" style={{ maxWidth: '600px' }}>
          <Button
            label={t('common.previous')}
            icon="pi pi-arrow-left"
            onClick={onPrevStep}
            disabled={!onPrevStep}
            style={{
              flex: '1',
              backgroundColor: 'white',
              borderColor: '#e0e0e0',
              color: '#666',
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
              fontWeight: '500',
              height: '48px',
              fontSize: '16px',
              justifyContent: 'flex-start',
              paddingLeft: '20px',
            }}
          />
          <Button
            label={t('common.next')}
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={onNextStep}
            disabled={!onNextStep}
            style={{
              flex: '1',
              backgroundColor: '#e33d3d',
              borderColor: '#e33d3d',
              color: 'white',
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
              fontWeight: '500',
              height: '48px',
              fontSize: '16px',
              justifyContent: 'flex-end',
              paddingRight: '20px',
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default PersonaCarousel;
