// Translation utilities for dynamic content

/**
 * Creates a mapping from original text to translation keys for needs
 */
export const createNeedsTranslationMap = () => {
  return {
    "Health coverage": "persona.needsItems.healthCoverage",
    "Legacy planning": "persona.needsItems.legacyPlanning", 
    "Peace of mind": "persona.needsItems.peaceOfMind",
    "Quick and efficient service": "persona.needsItems.quickEfficientService",
    "Digital-first solutions": "persona.needsItems.digitalFirstSolutions",
    "Transparent pricing": "persona.needsItems.transparentPricing",
    "Investment opportunities": "persona.needsItems.investmentOpportunities",
    "Retirement planning": "persona.needsItems.retirementPlanning",
    "Tax optimization": "persona.needsItems.taxOptimization",
    "Family protection plans": "persona.needsItems.familyProtectionPlans",
    "Educational savings": "persona.needsItems.educationalSavings",
    "Comprehensive coverage": "persona.needsItems.comprehensiveCoverage"
  };
};

/**
 * Creates a mapping from product IDs to translation keys
 */
export const createProductTranslationMap = () => {
  return {
    "product1": {
      name: "products.healthHappy.name",
      description: "products.healthHappy.description"
    },
    "product2": {
      name: "products.endowment.name", 
      description: "products.endowment.description"
    },
    "product3": {
      name: "products.infiniteCare.name",
      description: "products.infiniteCare.description"
    },
    "product4": {
      name: "products.ciSuperCare.name",
      description: "products.ciSuperCare.description"
    }
  };
};

/**
 * Translates an array of needs using the translation function
 * @param {Array} needs - Array of need strings from persona data
 * @param {Function} t - Translation function from useTranslation
 * @returns {Array} Array of translated need strings
 */
export const translateNeeds = (needs, t) => {
  const translationMap = createNeedsTranslationMap();
  
  return needs.map(need => {
    const translationKey = translationMap[need];
    if (translationKey) {
      return t(translationKey);
    }
    // Fallback to original text if no translation found
    console.warn(`No translation found for need: "${need}"`);
    return need;
  });
};

/**
 * Translates a single need item
 * @param {string} need - Need string from persona data
 * @param {Function} t - Translation function from useTranslation
 * @returns {string} Translated need string
 */
export const translateNeed = (need, t) => {
  const translationMap = createNeedsTranslationMap();
  const translationKey = translationMap[need];
  
  if (translationKey) {
    return t(translationKey);
  }
  
  // Fallback to original text if no translation found
  console.warn(`No translation found for need: "${need}"`);
  return need;
};

/**
 * Translates product data
 * @param {Object} product - Product object from products data
 * @param {Function} t - Translation function from useTranslation
 * @returns {Object} Product object with translated name and description
 */
export const translateProduct = (product, t) => {
  const translationMap = createProductTranslationMap();
  const productTranslation = translationMap[product.id];
  
  if (productTranslation) {
    return {
      ...product,
      name: t(productTranslation.name),
      shortDescription: t(productTranslation.description)
    };
  }
  
  // Fallback to original data if no translation found
  console.warn(`No translation found for product: "${product.id}"`);
  return product;
};

/**
 * Translates an array of products
 * @param {Array} products - Array of product objects
 * @param {Function} t - Translation function from useTranslation
 * @returns {Array} Array of translated product objects
 */
export const translateProducts = (products, t) => {
  return products.map(product => translateProduct(product, t));
};
