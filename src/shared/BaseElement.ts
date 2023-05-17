import { LitElement } from 'lit';
import { commonStyles } from './styles.js';

export { html, css } from 'lit';

export class BaseElement extends LitElement {
  static styles = [...commonStyles];

  $(selector: string) {
    return (this.shadowRoot ?? this).querySelector(selector);
  }
}
