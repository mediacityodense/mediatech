import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const githubPagesBase =
  repositoryName && !repositoryName.endsWith('.github.io')
    ? `/${repositoryName}/`
    : '/';

export default defineConfig(() => {
  const base = process.env.GITHUB_ACTIONS === 'true' ? githubPagesBase : '/';

  return {
    base,
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
