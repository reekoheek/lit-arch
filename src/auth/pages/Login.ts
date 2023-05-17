import { Form } from '../../shared/Form.js';
import { StringType } from '@xlit/form/types/StringType.js';
import { PageElement, html, css } from '../../shared/PageElement.js';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@xlit/router';
import { container } from '../../container.js';
import { AuthService } from '../AuthService.js';

import '../../shared/components/Input.js';
import '../../shared/components/Alert.js';

interface LoginForm {
  username: string;
  password: string;
}

@customElement('x-login')
@container.injectable()
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
        background-image: url(https://c0.wallpaperflare.com/preview/1015/348/857/blue-wall-background-cobalt.jpg);
        background-position: center center;
        background-repeat: no-repeat;
        background-color: #1076ca;
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

  @container.injectLookup()
  router!: Router;

  @container.injectLookup()
  authService!: AuthService;

  @state()
  globalError = '';

  form = new Form<LoginForm>({
    username: new StringType().required(),
    password: new StringType().required(),
  }, this);

  onSubmit = async(model: LoginForm) => {
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
      <div class="bg"></div>
      <div class="viewport">
        <div class="card">
          <div class="card-body">
            <p class="text-center">Welcome to Lit Arch</p>
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
