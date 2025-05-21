import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { motion, Reorder, useMotionValue, useDragControls } from 'framer-motion';
import './ReorderStyles.css';

const Step4Generate = ({
  selectedProduct,
  selectedPersona,
  selectedSmalltalk,
  onGenerate,
  onPrevious,
  loading,
  promptOrder,
  setPromptOrder,
}) => {
  const [items, setItems] = useState([]);
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  // Initialize items when component loads or selections change
  useEffect(() => {
    if (!promptOrder || promptOrder.length === 0) {
      // Default order if not provided
      setItems([
        { id: 'product', label: 'Product', value: selectedProduct },
        { id: 'persona', label: 'Persona', value: selectedPersona },
        { id: 'smalltalk', label: 'Small Talk', value: selectedSmalltalk },
      ]);
    } else {
      // Use provided order
      const newItems = promptOrder.map(item => {
        if (item.id === 'product') return { ...item, value: selectedProduct };
        if (item.id === 'persona') return { ...item, value: selectedPersona };
        if (item.id === 'smalltalk') return { ...item, value: selectedSmalltalk };
        return item;
      });
      setItems(newItems);
    }
  }, [selectedProduct, selectedPersona, selectedSmalltalk, promptOrder]);

  // Update parent's promptOrder when items are reordered
  const handleReorder = newOrder => {
    setItems(newOrder);
    setPromptOrder(newOrder);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="step-card"
      style={{ height: '100%' }}
    >
      <Card
        style={{ borderRadius: '10px', height: '100%' }}
        header={
          <div
            className="flex align-items-center justify-content-center p-3 bg-primary text-white"
            style={{
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
          >
            <i className="pi pi-check-circle mr-2" style={{ fontSize: '1.5rem' }}></i>
            <h2 className="m-0 text-white">Step 4: Review & Generate</h2>
          </div>
        }
      >
        <div
          className="p-fluid"
          style={{
            height: 'calc(100% - 4rem)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div className="mb-4" style={{ flex: 1, overflow: 'auto' }}>
            <h3>Review & Arrange Your Selections</h3>
            <p className="mb-3">Drag and drop to rearrange the order of prompt elements:</p>

            <Reorder.Group
              axis="y"
              values={items}
              onReorder={handleReorder}
              className="reorder-group"
            >
              {items.map(item => (
                <Reorder.Item
                  key={item.id}
                  value={item}
                  className="p-card p-4 mb-3 surface-50 cursor-move"
                  whileDrag={{
                    scale: 1.02,
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'var(--surface-100)',
                  }}
                >
                  <div className="flex align-items-center">
                    <i className="pi pi-bars mr-2 text-500" style={{ fontSize: '1rem' }}></i>
                    <p className="m-0">
                      <strong>{item.label}:</strong> {item.value}
                    </p>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>

          <div className="flex justify-content-between mt-4" style={{ flexShrink: 0 }}>
            <Button
              label="Previous"
              icon="pi pi-arrow-left"
              className="p-button-outlined"
              onClick={onPrevious}
            />
            <Button
              label="Generate Prompt"
              icon="pi pi-bolt"
              iconPos="right"
              className="p-button-success"
              onClick={onGenerate}
              loading={loading}
              loadingIcon="pi pi-spin pi-spinner"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Step4Generate;
