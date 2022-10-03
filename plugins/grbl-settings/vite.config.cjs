import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { workspacesExternalPackages } from '../../dev/workspacesExternal'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-client',
    lib: {
      entry: path.resolve(__dirname, 'lib/client/index.js'),
      name: '@fuse-labs/grbl-settings',
      fileName: (format) => `grbl-settings.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', ...workspacesExternalPackages],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
