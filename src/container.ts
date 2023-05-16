import { Container, singleton } from '@xlit/di';

export * from '@xlit/di';
export const container = new Container();

container.provide('authService', singleton(async() => {
  const { MockAuthService } = await import('./auth/infrastructure/MockAuthService.js');
  return new MockAuthService();
}));
