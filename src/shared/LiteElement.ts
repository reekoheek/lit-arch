import { BaseElement } from './BaseElement.js';

export { html, css } from './BaseElement.js';

export class LiteElement extends BaseElement {
  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}
