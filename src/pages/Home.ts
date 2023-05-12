import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { bootstrapStyles } from '../styles.js';

@customElement('x-home')
export class Home extends LitElement {
  static styles = [bootstrapStyles];

  protected render(): unknown {
    return html`
      <div class="container">
        <h2>Home</h2>
        <p>This is home</p>
      </div>
    `;
  }
}
