import React from 'react';

const ProductCard = ({ product, isSelected, onToggle, hasSelection }) => {
  return (
    <div
      className={`flex-1 h-full cursor-pointer transition-all transition-duration-300 border-round-lg ${
        isSelected ? 'shadow-8' : 'shadow-2 hover:shadow-8'
      }`}
      onClick={() => onToggle(product.id)}
      style={{
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
    >
      <div className="relative h-full">
        {hasSelection && !isSelected && (
          <div
            className="absolute top-0 left-0 w-full h-full border-round-lg z-1"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              transition: 'background-color 0.3s ease',
            }}
          />
        )}

        <img
          src={product.imageUrl}
          className={`w-full h-full border-round-lg`}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
