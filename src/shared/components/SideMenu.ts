import { customElement, property } from 'lit/decorators.js';
import { BaseElement, html } from '../BaseElement.js';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface Menu {
  id: string;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => unknown;
}

@customElement('x-side-menu')
export class SideMenu extends BaseElement {
  @property()
  title = 'AppName';

  @property()
  menus: Menu[] = [];

  protected render(): unknown {
    return html`
      <nav class="border-end p-3 d-flex flex-column flex-shrink-0 bg-body-secondary h-100">
        <div class="d-flex">
          <a href="/" class="nav-link flex-fill">${this.title}</a>
          <x-theme-switcher></x-theme-switcher>
        </div>
        <hr>
        <ul class="nav nav-pills flex-column">
          ${repeat(this.menus, (menu) => menu.id, (menu) => this.renderMenu(menu))}
        </ul>
      </nav>
    `;
  }

  renderMenu(menu: Menu) {
    if (menu.active) {
      return html`
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"
            href="${menu.href || '#'}"
            @click="${this.menuClicked}"> ${unsafeHTML(menu.label)} </a>
        </li>
      `;
    }
    return html`
      <li class="nav-item">
        <a class="nav-link"
          href="${menu.href || '#'}"
          @click="${this.menuClicked(menu)}"> ${unsafeHTML(menu.label)} </a>
      </li>
    `;
  }

  menuClicked(menu: Menu) {
    return (evt: Event) => {
      if (!menu.onClick) {
        return;
      }
      evt.stopImmediatePropagation();
      evt.preventDefault();
      menu.onClick();
    };
  }

  setActive(index: number) {
    for (const menu of this.menus) {
      menu.active = false;
    }
    this.menus[index].active = true;
    this.requestUpdate();
  }
}
