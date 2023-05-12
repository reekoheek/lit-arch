import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import { Router, component } from '@xlit/router';
import { container } from './container';

@customElement('x-app')
@container.injectable()
export class App extends LitElement {
  @container.injectProvide()
  router!: Router;

  outletRef: ReturnType<typeof createRef<HTMLElement>> = createRef();

  protected async firstUpdated() {
    const outlet = this.outletRef.value ?? this;
    this.router = new Router(outlet)
      .route('/', component('x-home', () => import('./pages/Home')))
      .route('/login', component('x-login', () => import('./pages/Login')))
    ;

    await this.router.start();
    console.info('router started');
    document.body.removeAttribute('unresolved');
  }

  protected render(): unknown {
    return html`
      <div class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
        </ul>
        </div>
      </div>
      <div class="main" ${ref(this.outletRef)}></div>
    `;
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}
