import { customElement, property } from 'lit/decorators.js';
import { LiteElement, html } from '../LiteElement.js';
import { classMap } from 'lit/directives/class-map.js';

import './ErrorMessage.js';

let nextId = 0;

type Type = 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'datetime' | 'date' |
  'month' | 'week' | 'time' | 'datetime-local' | 'number';

@customElement('x-input')
export class Input extends LiteElement {
  uniqueId = `input${nextId++}`;

  @property()
  type: Type = 'text';

  @property()
  placeholder?: string;

  @property()
  label?: string;

  @property()
  error?: string;

  @property()
  value?: string;

  protected render() {
    return html`
      <div class="mb-3">
        <label class="form-label" for="${this.uniqueId}">${this.label}</label>
        <x-error-message .message="${this.error}"></x-error-message>
        <input type="${this.type}" id="${this.uniqueId}"
          class="${classMap({ 'form-control': true, 'is-invalid': !!this.error })}"
          .value="${this.value ?? ''}"
          @input="${this.handleInput}"
          placeholder="${this.placeholder ?? ''}">
      </div>
    `;
  }

  handleInput(evt: Event) {
    evt.stopImmediatePropagation();
    this.value = (evt.target as HTMLInputElement).value;
    const dispatchedEvent = new CustomEvent('change');
    this.dispatchEvent(dispatchedEvent);
  }
}
