import React from 'react';

function PromptSelector({
  products,
  personas,
  smalltalks,
  selectedProduct,
  selectedPersona,
  selectedSmalltalk,
  setSelectedProduct,
  setSelectedPersona,
  setSelectedSmalltalk,
  onGenerate,
  loading,
  apiStatus,
}) {
  const isDisabled = loading || apiStatus === 'offline';

  return (
    <div className="card">
      <h2>Prompt Components</h2>

      <div className="section">
        <h3>Product</h3>
        <select
          value={selectedProduct}
          onChange={e => setSelectedProduct(e.target.value)}
          disabled={isDisabled}
        >
          <option value="">-- Select Product --</option>
          {products.map(product => (
            <option key={product} value={product}>
              {product.charAt(0).toUpperCase() + product.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <h3>Persona</h3>
        <select
          value={selectedPersona}
          onChange={e => setSelectedPersona(e.target.value)}
          disabled={isDisabled}
        >
          <option value="">-- Select Persona --</option>
          {personas.map(persona => (
            <option key={persona} value={persona}>
              {persona.charAt(0).toUpperCase() + persona.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <h3>Small Talk</h3>
        <select
          value={selectedSmalltalk}
          onChange={e => setSelectedSmalltalk(e.target.value)}
          disabled={isDisabled}
        >
          <option value="">-- Select Small Talk --</option>
          {smalltalks.map(smalltalk => (
            <option key={smalltalk} value={smalltalk}>
              {smalltalk
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          onClick={onGenerate}
          disabled={!selectedProduct || !selectedPersona || !selectedSmalltalk || isDisabled}
        >
          {loading ? 'Generating...' : 'Generate Prompt'}
        </button>
      </div>

      {apiStatus === 'offline' && (
        <div className="alert alert-error" style={{ marginTop: '1rem' }}>
          Backend server is not available. Please start the server and retry.
        </div>
      )}
    </div>
  );
}

export default PromptSelector;
