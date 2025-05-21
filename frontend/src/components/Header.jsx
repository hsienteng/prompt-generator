import React from 'react';
import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.div
      className="header p-2 mb-2 shadow-1"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ borderRadius: '8px' }}
    >
      <div className="grid">
        <div className="col-12">
          <div className="flex align-items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <i className="pi pi-magic mr-3" style={{ fontSize: '2.5rem' }}></i>
            </motion.div>
            <div>
              <motion.h1
                className="mb-0 text-3xl text-white"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                AIA Thailand Sales Genie
              </motion.h1>
              <motion.p
                className="mt-2 mb-0 text-sm opacity-80"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Create customized sales prompts by combining product information, persona styles,
                and small talk elements.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
