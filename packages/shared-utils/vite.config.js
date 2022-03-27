const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: '@fuse-labs/shared-utils',
      fileName: (format) => {
        switch (format) {
          case 'es':
          case 'esm':
            return `shared-utils.${format}.mjs`
          default:
            return `shared-utils.${format}.js`
        }
      }
    },
  }
})