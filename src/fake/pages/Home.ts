import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles } from '../../styles.js';

@customElement('x-home')
export class Home extends LitElement {
  static styles = [commonStyles];

  protected render() {
    return html`
      <div class="container pt-3">
        <h4> Home </h4>
        <p class="small">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat harum voluptatum nam voluptates deserunt
          reprehenderit nulla porro ratione amet quibusdam quod adipisci impedit veniam ipsa quae alias officiis,
          repellendus perferendis.
        </p>
        <div class="card">
          <div class="card-header">
            System message
          </div>
          <div class="card-body">
            <p class="small">
              Ex sunt velit deserunt Lorem consectetur cillum nulla deserunt anim eu amet anim do. Ea ipsum ipsum
              reprehenderit cupidatat velit elit magna sint veniam reprehenderit irure culpa laboris aliquip. Aute
              officia nisi aliquip nostrud esse in enim laboris. Qui adipisicing ut mollit ullamco ipsum. Sunt
              exercitation exercitation deserunt commodo enim aliquip reprehenderit pariatur aliquip esse sit
              adipisicing.
            </p>
            <p class="small">
              In adipisicing amet sunt consequat aliquip consectetur et elit. Pariatur aliqua ipsum nulla anim ullamco
              eu occaecat. Sint esse dolore esse minim enim adipisicing cillum enim fugiat ex ad deserunt proident sit.
            </p>
            <p class="small">
              Proident qui consectetur quis nisi duis mollit dolor proident veniam. Laborum occaecat elit sit elit ad
              incididunt anim mollit et mollit magna esse incididunt. Consectetur ex eiusmod quis veniam aute consequat
              commodo sunt. Aliqua nulla aute proident qui et proident consequat nulla.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
