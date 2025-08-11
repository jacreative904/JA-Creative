// Free alternative to GSAP's SplitText plugin
export const splitTextIntoWords = (element) => {
  if (!element) return [];
  
  const text = element.textContent;
  const words = text.split(' ');
  
  // Clear original content
  element.innerHTML = '';
  
  // Create spans for each word with spaces
  const wordElements = [];
  
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.className = 'split-word';
    span.style.display = 'inline-block';
    
    element.appendChild(span);
    wordElements.push(span);
    
    // Add space after each word except the last
    if (index < words.length - 1) {
      const space = document.createTextNode(' ');
      element.appendChild(space);
    }
  });
  
  return wordElements;
};

export const splitTextIntoChars = (element) => {
  if (!element) return [];
  
  const text = element.textContent;
  const chars = text.split('');
  
  element.innerHTML = '';
  
  const charElements = chars.map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
    span.className = 'split-char';
    span.style.display = 'inline-block';
    
    element.appendChild(span);
    return span;
  });
  
  return charElements;
};

// Utility to restore original text (for cleanup)
export const restoreText = (element, originalText) => {
  if (element && originalText) {
    element.innerHTML = originalText;
  }
};
