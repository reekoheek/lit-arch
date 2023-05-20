import { PageElement, html } from '../../shared/PageElement.js';
import { customElement, state } from 'lit/decorators.js';
import { StringType } from '@xlit/form/types/StringType.js';
import '../../shared/components/Input.js';
import '../../shared/components/Alert.js';
import { FormController } from '@xlit/form';

interface Model {
  name: string;
  email: string;
  password: string;
}

@customElement('x-form')
export class XForm extends PageElement {
  private form = new FormController<Model>(this, {
    name: new StringType().required(),
    email: new StringType().required(),
    password: new StringType().required(),
  });

  @state()
  globalError = '';

  onSubmit = (model: Model) => {
    try {
      console.info(model);
      throw new Error('unimplemented yet');
    } catch (err) {
      if (err instanceof Error) {
        this.globalError = err.message;
      }
    }
  };

  protected render() {
    return html`
      <form @submit="${this.form.handleSubmit(this.onSubmit)}" novalidate>
        <div class="d-flex flex-column vh-100">
          <div class="container-fluid pt-3">
            <div class="d-flex mb-3">
              <h4 class="flex-grow-1"> Data Form </h4>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>

            <x-alert .message="${this.globalError}"></x-alert>
          </div>

          <div class="container-fluid overflow-auto">
            <x-input type="text" label="Name" ${this.form.field('name')}></x-input>
            <x-input type="text" label="Email" ${this.form.field('email')}></x-input>
            <x-input type="password" label="Password" ${this.form.field('password')}></x-input>
          </div>
        </div>
      </form>
    `;
  }
}
