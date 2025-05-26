import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'primereact/button';
import PersonaCard from './cards/PersonaCard';
import customers from '../../public/data/persona.json';

const CustomerCarousel = ({ onNextStep, onPrevStep, setSelectedPersona }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (setSelectedPersona && customers.length > 0) {
      setSelectedPersona(customers[0]);
    }
  }, [setSelectedPersona]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex === customers.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    if (setSelectedPersona) {
      setSelectedPersona(customers[newIndex]);
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = currentIndex === 0 ? customers.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    if (setSelectedPersona) {
      setSelectedPersona(customers[newIndex]);
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const getCardPosition = cardIndex => {
    let position = cardIndex - currentIndex;
    if (position > customers.length / 2) position -= customers.length;
    if (position < -customers.length / 2) position += customers.length;
    return position;
  };

  const renderCustomerCard = (customer, index) => {
    const position = getCardPosition(index);
    const isCenter = position === 0;
    const isVisible = Math.abs(position) <= 1;

    return (
      <PersonaCard
        key={customer.id}
        customer={customer}
        position={position}
        isCenter={isCenter}
        isVisible={isVisible}
      />
    );
  };

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
            onClick={() => {
              prevSlide();
            }}
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
            onClick={() => {
              nextSlide();
            }}
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
            label="Previous"
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
            label="Next"
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
};

export default CustomerCarousel;
