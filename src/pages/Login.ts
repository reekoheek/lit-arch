import { Form } from '@xlit/form';
import { StringType } from '@xlit/form/types/StringType.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators.js';
import { bootstrapStyles } from '../styles.js';
import { Router } from '@xlit/router';
import { container } from '../container.js';

interface LoginForm {
  username?: string;
  password?: string;
}

@customElement('x-login')
@container.injectable()
export class Login extends LitElement {
  static styles = [bootstrapStyles];

  @container.injectLookup()
  router!: Router;

  form = new Form<LoginForm>({
    username: new StringType().required(),
    password: new StringType().required(),
  }, this);

  onSubmit = (model: LoginForm) => {
    console.info(model);
    this.router.push('/');
  };

  protected render() {
    return html`
      <form class="container" @submit="${this.form.handleSubmit(this.onSubmit)}" novalidate>
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input type="text"
            class="${classMap({ 'form-control': true, 'is-invalid': this.form.errors.username })}"
            .value="${this.form.model.username ?? ''}"
            @input="${this.form.handleInput('username')}">
          <div class="invalid-feedback">${this.form.errors.username}</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password"
            class="${classMap({ 'form-control': true, 'is-invalid': this.form.errors.password })}"
            .value="${this.form.model.password ?? ''}"
            @input="${this.form.handleInput('password')}">
          <div class="invalid-feedback">${this.form.errors.password}</div>
        </div>
        <div>
          <input type="submit" class="btn btn-primary" value="Login">
        </div>
      </form>
    `;
  }
}
