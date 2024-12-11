import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Checker({ typescript: true })  // 여기에 Checker 플러그인을 추가합니다.
  ]
})
