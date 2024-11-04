import { defineConfig } from 'vite'
import { config } from 'dotenv';
import react from '@vitejs/plugin-react'

config(); // loads .env file into process.env

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
