import React from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import products from '../data/products.json';
import ProductCard from './cards/ProductCard';
import { translateProducts } from '../i18n/translateDynamicContent';
import clsx from 'clsx';
import useProductStore from '../store/productStore';

const ProductSelectionPage = ({ onNextStep }) => {
  const { t } = useTranslation();
  const { selectedProduct, setSelectedProduct } = useProductStore();

  // Translate products data
  const translatedProducts = translateProducts(products, t);

  const toggleProductSelection = productId => {
    const product = translatedProducts.find(p => p.id === productId);
    setSelectedProduct(selectedProduct?.id === productId ? null : product);
  };

  const hasSelection = selectedProduct !== null;

  const handleContinue = () => {
    if (selectedProduct) {
      onNextStep && onNextStep();
    }
  };

  return (
    <div className="min-h-screen py-3">
      <div className="grid">
        {translatedProducts.map(product => (
          <div key={product.id} className="col-12 sm:col-6 md:col-4 lg:col-3 p-2">
            <ProductCard
              product={product}
              isSelected={selectedProduct?.id === product.id}
              onToggle={toggleProductSelection}
              hasSelection={hasSelection}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Button
          label={t('common.continueToSelectPersona')}
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
