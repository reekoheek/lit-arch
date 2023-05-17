import { Context } from '@xlit/router';
import { BaseElement } from './BaseElement.js';

export { html, css } from './BaseElement.js';

export class PageElement extends BaseElement {
  ctx!: Context;

  getContext(): Context {
    return this.ctx;
  }
}
