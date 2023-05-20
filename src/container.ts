import { Container, instance, singleton } from '@xlit/di';
import { Meta } from './shared/lib/Meta.js';

export * from '@xlit/di';
export const container = new Container()
  .provide('meta', instance(new Meta()))
  .provide('authService', singleton(async() => {
    const { MockAuthService } = await import('./auth/infrastructure/MockAuthService.js');
    return new MockAuthService();
  }));
