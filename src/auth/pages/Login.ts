import { Form } from '@xlit/form';
import { StringType } from '@xlit/form/types/StringType.js';
import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators.js';
import { commonStyles } from '../../styles.js';
import { Router } from '@xlit/router';
import { container } from '../../container.js';
import { AuthService } from '../AuthService.js';

interface LoginForm {
  username: string;
  password: string;
}

@customElement('x-login')
@container.injectable()
export class Login extends LitElement {
  static styles = [
    commonStyles,
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

  form = new Form<LoginForm>({
    username: new StringType().required(),
    password: new StringType().required(),
  }, this);

  onSubmit = async(model: LoginForm) => {
    await this.authService.login(model.username, model.password);
    await this.router.push('/');
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
              <div class="mb-3">
                <label class="form-label" for="inputUsername">Username</label>
                <input type="text" id="inputUsername"
                  class="${classMap({ 'form-control': true, 'is-invalid': this.form.errors.username })}"
                  .value="${this.form.model.username ?? ''}"
                  @input="${this.form.handleInput('username')}"
                  placeholder="Input username">
              </div>
              <div class="mb-3">
                <label class="form-label" for="inputPassword">Password</label>
                <input type="password" id="inputPassword"
                  class="${classMap({ 'form-control': true, 'is-invalid': this.form.errors.password })}"
                  .value="${this.form.model.password ?? ''}"
                  @input="${this.form.handleInput('password')}"
                  placeholder="Input password">
              </div>
              <div class="clearfix">
                <div class="form-check float-end">
                  <input type="checkbox" id="rememberMeCheck">
                  <label for="rememberMeCheck">Remember me</label>
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
