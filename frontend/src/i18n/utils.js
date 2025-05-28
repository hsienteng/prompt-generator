// Language utilities
export const RTL_LANGUAGES = ['ar', 'he', 'fa']; // Arabic, Hebrew, Persian

export const isRTL = language => {
  return RTL_LANGUAGES.includes(language);
};

export const getDirection = language => {
  return isRTL(language) ? 'rtl' : 'ltr';
};

export const getTextAlign = language => {
  return isRTL(language) ? 'right' : 'left';
};
