import { customElement, property } from 'lit/decorators.js';
import { BaseElement, html } from '../BaseElement.js';

@customElement('x-alert')
export class Alert extends BaseElement {
  @property()
  private kind = 'danger';

  @property()
  private message = '';

  protected render() {
    if (!this.message) {
      return;
    }

    return html`
      <div class="alert alert-${this.kind}" role="alert">
        ${this.message}
      </div>
    `;
  }
}
