import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'npm/npm',
    lib: {
      entry: resolve(__dirname, 'npm/src/lib/index.ts'),
      name: 'vue3-mini-weather',
      fileName: 'index',
      formats: ['umd', 'es']
    },
    rollupOptions: {
      external: ['vue', 'axios', 'lottie-web',],
      output: {
        globals: {
          'vue': 'vue',
          'axios': 'axios',
          'lottie-web': 'Lottie'
        }
      }
    }
  }
})
