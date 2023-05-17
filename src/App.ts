import { customElement } from 'lit/decorators.js';
import { Router, component } from '@xlit/router';
import { container, injected } from './container.js';
import { AuthService } from './auth/AuthService.js';
import { LiteElement, html } from './shared/LiteElement.js';

import './app.css';

@customElement('x-app')
@container.injectable()
export class App extends LiteElement {
  @container.injectProvide()
  router!: Router;

  @container.injectLookup()
  authService!: AuthService;

  protected async firstUpdated() {
    await injected(this);

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
      <nav class="border-end p-3 d-flex flex-column flex-shrink-0">
        <a href="/" class="nav-link">Lit Arch</a>
        <hr>
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/list">Table List</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/form">Data Form</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Menu 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Menu 2</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Menu 3</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Menu 4</a>
          </li>
          <li class="nav-item">
            <button class="nav-link" @click="${this.logoutClicked}">Logout</button>
          </li>
        </ul>
      </nav>
      <main></main>
    `;
  }

  async logoutClicked(evt: Event) {
    evt.preventDefault();
    await this.authService.logout();
    await this.router.push('/login');
  }
}
