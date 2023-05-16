import { AuthError } from '../AuthError.js';
import { AuthService } from '../AuthService.js';
import { LoginInfo } from '../LoginInfo.js';

export class MockAuthService implements AuthService {
  loginInfo?: LoginInfo | null;

  login(username: string, password: string): Promise<void> {
    if (username === 'admin' && password === 'password') {
      this.loginInfo = {
        name: 'Administrator',
        username: 'admin',
        email: 'admin@example.com',
      };
      localStorage.setItem('loginInfo', JSON.stringify(this.loginInfo));
      return Promise.resolve();
    }

    throw new AuthError('failed to login');
  }

  logout(): Promise<void> {
    localStorage.removeItem('loginInfo');
    return Promise.resolve();
  }

  getLoginInfo(): Promise<LoginInfo | undefined> {
    if (this.loginInfo === undefined) {
      try {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo') || '');
      } catch (err) {
        this.loginInfo = null;
      }
    }
    return Promise.resolve(this.loginInfo ?? undefined);
  }
}
