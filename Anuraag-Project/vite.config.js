import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eventHtmlPlugin from './vite-plugin-event-page.js'
import pageFilesPlugin from './vite-plugin-page-files.js'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  // eventHtmlPlugin makes dist/event/index.html; pageFilesPlugin makes a file
  // for every other page plus sitemap.xml (see each file for details).
  plugins: [react(), eventHtmlPlugin(), pageFilesPlugin()],
})
