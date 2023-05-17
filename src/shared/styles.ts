import bootstrap from 'bootstrap/dist/css/bootstrap.css?inline';
import bootstrapIcons from 'bootstrap-icons/font/bootstrap-icons.css?inline';
import { unsafeCSS } from 'lit';

export const commonStyles = [
  unsafeCSS(bootstrap),
  unsafeCSS(bootstrapIcons),
];
