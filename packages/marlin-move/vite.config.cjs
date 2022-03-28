import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { dependencies } from './package.json'
import { workspacesExternalPackages } from '../../dev/workspacesExternal'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-client',
    lib: {
      entry: path.resolve(__dirname, 'lib/client/index.js'),
      name: '@fuse-labs/marlin-move',
      fileName: (format) => `marlin-move.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', ...Object.keys(dependencies), ...workspacesExternalPackages],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      }
    }
  }
})