import { customElement, state } from 'lit/decorators.js';
import { BaseElement, html } from '../BaseElement.js';

@customElement('x-theme-switcher')
export class ThemeSwitcher extends BaseElement {
  @state()
  theme = localStorage.getItem('theme') ?? 'auto';

  @state()
  actualTheme: string;

  get targetTheme() {
    return this.actualTheme === 'light' ? 'dark' : 'light';
  }

  constructor() {
    super();

    this.actualTheme = this.theme;
    if (this.theme === 'auto') {
      const preferLight = window.matchMedia('(prefers-color-scheme: light)');
      this.actualTheme = preferLight ? 'light' : 'dark';
    }
    this.apply(this.actualTheme);
  }

  protected render(): unknown {
    return html`
      <a href="#" class="nav-link" @click="${this.toggleClicked}" title="Change to ${this.targetTheme} mode">
        <i class="bi ${this.actualTheme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'}"></i>
      </a>
    `;
  }

  private toggleClicked(evt: Event) {
    evt.stopImmediatePropagation();
    evt.preventDefault();
    this.toggle();
  }

  toggle() {
    this.theme = this.actualTheme = this.actualTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.apply(this.actualTheme);
  }

  apply(theme: string) {
    document.querySelector('html')?.setAttribute('data-bs-theme', theme);
  }
}
