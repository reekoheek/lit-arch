import { commonStyles } from './shared/styles.js';
export * from './App.js';

commonStyles.forEach((style) => {
  if (style.styleSheet) {
    document.adoptedStyleSheets.push(style.styleSheet);
  }
});
