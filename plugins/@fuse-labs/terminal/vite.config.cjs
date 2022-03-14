import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { dependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-client',
    lib: {
      entry: path.resolve(__dirname, 'lib/client/index.js'),
      name: '@fuse-labs/terminal',
      fileName: (format) => `terminal.${format}.js`
    },
    rollupOptions: {
      external: Object.keys(dependencies),
      output: {
        exports: 'named',
        globals: {
          react: 'React'
        }
      }
    }
  }
})
