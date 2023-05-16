import { LoginInfo } from './LoginInfo.js';

export interface AuthService {
  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
  getLoginInfo(): Promise<LoginInfo | undefined>;
}
