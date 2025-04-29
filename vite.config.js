import { defineConfig } from 'vite'
import dotenv from "dotenv";
import react from '@vitejs/plugin-react'

// `.env` を読み込む
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // 出力ディレクトリを'dist'に設定
  },
  define: {
    "process.env": process.env, // Vite でも `process.env` を使えるようにする
  },
})
