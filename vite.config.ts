import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'SharedTick',
      // the proper extensions will be added
      fileName: 'shared-tick',
    },
  },
  plugins: [dts({
    insertTypesEntry: true,
    exclude: ["src/"]
  })]
})