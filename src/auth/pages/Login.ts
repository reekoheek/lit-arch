import { StringType } from '@xlit/form/types/StringType.js';
import { PageElement, html, css } from '../../shared/PageElement.js';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@xlit/router';
import { AuthService } from '../AuthService.js';
import '../../shared/components/Input.js';
import '../../shared/components/Alert.js';
import { Meta } from '../../shared/lib/Meta.js';
import { container, inject, lookup } from '../../container.js';
import { FormController } from '@xlit/form';

interface Model {
  username: string;
  password: string;
}

@customElement('x-login')
@inject(container)
export class Login extends PageElement {
  static styles = [
    ...PageElement.styles,
    css`
      .bg {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
      }

      .bg-img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0.6;
        background-image: url(https://c0.wallpaperflare.com/preview/1015/348/857/blue-wall-background-cobalt.jpg);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .viewport {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }

      .card {
        width: 100%;
        max-width: 400px;
        box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.3);
      }
    `,
  ];

  @lookup()
  router!: Router;

  @lookup()
  meta!: Meta;

  @lookup()
  authService!: AuthService;

  @state()
  globalError = '';

  form = new FormController<Model>(this, {
    username: new StringType().required(),
    password: new StringType().required(),
  });

  onSubmit = async(model: Model) => {
    try {
      await this.authService.login(model.username, model.password);
      await this.router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        this.globalError = err.message;
      }
    }
  };

  protected render() {
    return html`
      <div class="bg bg-body"></div>
      <div class="bg-img"></div>
      <div class="viewport">
        <div class="card">
          <div class="card-body">
            <h4 hidden>Login</h4>
            <p class="text-center">Welcome to ${this.meta.get('application-name')}</p>
            <p class="text-center small">username: admin password: password</p>

            <form @submit="${this.form.handleSubmit(this.onSubmit)}" novalidate>
              <x-alert .message="${this.globalError}"></x-alert>

              <x-input type="text" label="Username" ${this.form.field('username')}></x-input>
              <x-input type="password" label="Password" ${this.form.field('password')}></x-input>

              <div class="clearfix mb-3">
                <div class="form-check">
                  <input type="checkbox" id="rememberMeCheck" class="form-check-input">
                  <label for="rememberMeCheck" class="form-check-label">Remember me</label>
                </div>
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
}
