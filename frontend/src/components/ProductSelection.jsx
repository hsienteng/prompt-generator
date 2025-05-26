import React, { useState } from 'react';
import { Button } from 'primereact/button';
import products from '../../public/data/products.json';
import ProductCard from './cards/ProductCard';
import clsx from 'clsx';

const ProductSelectionPage = ({ onNextStep, setSelectedProduct: setAppSelectedProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleProductSelection = productId => {
    setSelectedProduct(prevSelected => (prevSelected === productId ? null : productId));
  };

  const hasSelection = selectedProduct !== null;

  const handleContinue = () => {
    if (selectedProduct) {
      setAppSelectedProduct && setAppSelectedProduct(selectedProduct);
      onNextStep && onNextStep();
    }
  };

  return (
    <div className="min-h-screen py-3">
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="col-12 sm:col-6 md:col-4 lg:col-3 p-2">
            <ProductCard
              product={product}
              isSelected={selectedProduct === product.id}
              onToggle={toggleProductSelection}
              hasSelection={hasSelection}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Button
          label="Continue to Select Persona"
          icon="pi pi-arrow-right"
          iconPos="right"
          className={clsx(
            'border-none text-white px-6 py-3',
            !selectedProduct ? 'bg-red-300' : 'bg-red-600'
          )}
          disabled={!selectedProduct}
          onClick={handleContinue}
        />
      </div>
    </div>
  );
};

export default ProductSelectionPage;
