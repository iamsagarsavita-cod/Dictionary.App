import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/dictionary": {
        target: "https://api.dictionaryapi.dev",
        changeOrigin: true,
        // Allows the proxy to work on networks that inspect HTTPS certificates.
        secure: false,
        rewrite: (path) => path.replace(/^\/dictionary/, ""),
      },
    },
  },
})
