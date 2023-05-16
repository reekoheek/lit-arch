import { commonStyles } from './styles.js';
export * from './App.js';

if (commonStyles.styleSheet) {
  document.adoptedStyleSheets.push(commonStyles.styleSheet);
}
