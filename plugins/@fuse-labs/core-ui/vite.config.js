import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'
import { dependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrPlugin(), react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: '@fuse-labs/core-ui',
      fileName: (format) => `core-ui.${format}.js`
    },
    rollupOptions: {
      external: Object.keys(dependencies),
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  }
})
