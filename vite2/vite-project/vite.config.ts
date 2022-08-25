import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定根目录的位置
  // root: path.join(__dirname,'src'),
  plugins: [react()]
})
