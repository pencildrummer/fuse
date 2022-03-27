import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'
import { dependencies } from './package.json'
import { workspacesExternalPackages } from '../../dev/workspacesExternal'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrPlugin(), react()],
  // optimizeDeps: {
  //   exclude: ['next', 'next/link', 'next/router']
  // },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: '@fuse-labs/core-ui',
      formats: ['es'],
      fileName: (format) => `core-ui.${format}.js`
    },
    //cssCodeSplit: true,
    // commonjsOptions: {
    //   exclude: ['next/link', 'next'],
    //   ignore: ['next/link', 'next'],
    //   defaultIsModuleExports: 'false',
    // },
    rollupOptions: {
      external: ['react', 'react-dom', ...Object.keys(dependencies), ...workspacesExternalPackages],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      }
    },
  },
})
