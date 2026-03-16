import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import * as path from 'node:path';
import * as dotenv from "dotenv";
dotenv.config({ path: './.env'})

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', reactCompilerPreset],
        ],
      },
    }),
  ],
  server: {
    port: process.env.VITE_PORT,
    proxy: {
      '/api': {
        target: process.env.VITE_SERVER_NAME,
        changeOrigin: true,
      }
    }
  },
})