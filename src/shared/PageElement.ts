import { Context } from '@xlit/router';
import { BaseElement } from './BaseElement.js';
import { container, inject, lookup } from '../container.js';
import { Meta } from './lib/Meta.js';
export { html, css } from './BaseElement.js';

@inject(container)
export class PageElement extends BaseElement {
  protected ctx!: Context;

  @lookup()
  meta!: Meta;

  firstUpdated() {
    const title = this.title || this.$('h1, h2, h3, h4')?.textContent || '';
    document.title = title ? `${title} - ${this.meta.get('application-name')}` : this.meta.get('application-name');
  }
}
