import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { dependencies } from './package.json'
import { workspacesExternalPackages } from '../../dev/workspacesExternal'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: '@fuse-labs/core-client',
      fileName: (format) => `core-client.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-intl', ...Object.keys(dependencies), ...workspacesExternalPackages],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})