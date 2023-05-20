import { MockAuthService } from './MockAuthService';
import { assert } from '@open-wc/testing';

describe('MockAuthService', () => {
  describe('#login()', () => {
    it('login', () => {
      const service = new MockAuthService();
      service.login('admin', 'password');
      assert.strictEqual(service.loginInfo?.name, 'Administrator');
    });
  });
});
