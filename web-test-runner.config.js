import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: [
    './src/**/*.test.ts',
  ],
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    include: ['**'],
    exclude: ['**/node_modules/**'],
  },
  plugins: [
    esbuildPlugin({ ts: true }),
  ],
};
