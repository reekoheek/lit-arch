const { esbuildPlugin } = require('@web/dev-server-esbuild');

module.exports = {
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
