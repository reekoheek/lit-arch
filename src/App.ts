import { customElement } from 'lit/decorators.js';
import { Router, component } from '@xlit/router';
import { container, inject, injected, lookup, provide } from './container.js';
import { AuthService } from './auth/AuthService.js';
import { LiteElement, html } from './shared/LiteElement.js';
import { Meta } from './shared/lib/Meta.js';
import type { Menu, SideMenu } from './shared/components/SideMenu.js';
import './shared/components/SideMenu.js';
import './shared/components/ThemeSwitcher.js';

@customElement('x-app')
@inject(container)
export class App extends LiteElement {
  @provide()
  router!: Router;

  @lookup()
  authService!: AuthService;

  @lookup()
  meta!: Meta;

  sideMenu!: SideMenu;

  menus: Menu[] = [
    { id: 'home', label: '<i class="bi bi-house me-2"></i> Home', href: '/' },
    { id: 'list', label: '<i class="bi bi-table me-2"></i> List', href: '/list' },
    { id: 'form', label: '<i class="bi bi-window me-2"></i> Form', href: '/form' },
    { id: 'menu#1', label: '<i class="bi bi-1-circle me-2"></i> Menu 1' },
    { id: 'menu#2', label: '<i class="bi bi-1-circle me-2"></i> Menu 2' },
    { id: 'menu#3', label: '<i class="bi bi-1-circle me-2"></i> Menu 3' },
    { id: 'logout', label: '<i class="bi bi-door-closed me-2"></i> Logout', onClick: this.loggedOut.bind(this) },
  ];

  protected async firstUpdated() {
    await injected(this);

    this.sideMenu = this.$('x-side-menu') as SideMenu;

    this.router = new Router(this.querySelector('main') ?? this)
      .use(async(ctx, next) => {
        if (ctx.path === '/login') {
          return next();
        }

        const info = await this.authService.getLoginInfo();
        if (info) {
          return next();
        }

        this.router.push('/login');
      })
      .use((ctx, next) => {
        const index = this.menus.findIndex((menu) => menu.href === ctx.path);
        if (index !== -1) {
          this.sideMenu.setActive(index);
        }
        return next();
      })
      .route('/', component('x-home', () => import('./fake/pages/Home.js')))
      .route('/list', component('x-list', () => import('./fake/pages/List.js')))
      .route('/form', component('x-form', () => import('./fake/pages/Form.js')))
      .route('/login', component('x-login', () => import('./auth/pages/Login.js')))
    ;

    await this.router.start();
    console.info('router started');
    document.body.removeAttribute('unresolved');
  }

  protected render() {
    return html`
      <style>
        x-app x-side-menu {
          position: fixed;
          width: 15rem;
          height: 100vh;
        }

        x-app  main {
          margin-left: 15rem;
          height: 100vh;
        }
      </style>
      <x-side-menu title="${this.meta.get('application-name')}" .menus="${this.menus}"></x-side-menu>
      <main></main>
    `;
  }

  async loggedOut() {
    await this.authService.logout();
    await this.router.push('/login');
  }
}
