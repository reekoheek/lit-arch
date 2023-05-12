import { bootstrapStyles } from './styles.js';
export * from './App.js';

if (bootstrapStyles.styleSheet) {
  document.adoptedStyleSheets.push(bootstrapStyles.styleSheet);
}
