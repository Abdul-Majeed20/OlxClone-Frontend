import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      "9d453014-3443-4ed3-8958-012a03fe26bb-00-2qre6mwcvpfjq.pike.replit.dev"
    ],
  },
})
