/* /// <reference types="vitest" /> */
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// maneira 1 de vitest, com UseConfig do Vite, e InlineConfig do Vitest/node
/* export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {},
} as UserConfig & {
  test: InlineConfig
})
 */

// maneira 2 de Vitest, usando triple hash reference no topo /\
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  /* test: {}, */
})
