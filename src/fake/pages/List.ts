import { customElement, state } from 'lit/decorators.js';
import { faker } from '@faker-js/faker';
import { PageElement, html, css } from '../../shared/PageElement.js';

interface User {
  username: string;
  email: string;
  name: string;
  avatar: string;
}

@customElement('x-list')
export class List extends PageElement {
  static styles = [
    ...PageElement.styles,
    css`
      .avatar {
        width: 2rem;
        height: 2rem;
        display: inline-block;
        position: relative;


      }

      .avatar img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    `,
  ];

  @state()
  rows:User[] = faker.helpers.multiple(createRandomUser, { count: 100 });

  protected render() {
    return html`
      <div class="d-flex flex-column vh-100">
        <div class="container-fluid py-3">
          <h4> List </h4>

          <div class="row">
            <div class="col">
              <button class="btn btn-primary">+</button>
            </div>
            <div class="col">
              <form>
                <input type="search" class="form-control"
                  placeholder="Search...">
              </form>
            </div>
          </div>
        </div>

        <div class="overflow-auto">
          <table class="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th class="sticky-top bg-light-subtle" scope="col"> Name </th>
                <th class="sticky-top bg-light-subtle" scope="col"> Username </th>
                <th class="sticky-top bg-light-subtle" scope="col"> Email </th>
              </tr>
            </thead>
            <tbody>
              ${this.rows.map((row) => html`
                <tr>
                  <td>
                    <a href="#" class="d-flex align-items-center text-decoration-none">
                      <div class="avatar">
                        <img src="${row.avatar}" class="rounded-circle" alt="Avatar" />
                      </div>
                      <div class="ms-3">
                        ${row.name}
                      </div>
                    </a>
                  </td>
                  <td class="align-middle"> ${row.username} </td>
                  <td class="align-middle"> ${row.email} </td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>

      </div>
    `;
  }
}

function createRandomUser(): User {
  return {
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  };
}
