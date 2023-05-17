import { customElement, property } from 'lit/decorators.js';
import { BaseElement, html } from '../BaseElement.js';

@customElement('x-error-message')
export class ErrorMessage extends BaseElement {
  @property()
  private message = '';

  protected render() {
    if (!this.message) {
      return;
    }

    return html`
      <p class="text-danger small">
        <i class="bi bi-exclamation-circle-fill"></i>
        ${this.message}
      </p>
    `;
  }
}
