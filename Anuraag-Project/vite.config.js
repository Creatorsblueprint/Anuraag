import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eventHtmlPlugin from './vite-plugin-event-page.js'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), eventHtmlPlugin()],
})
