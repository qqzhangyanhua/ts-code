import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path'
export default defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    alias:{
    "@":path.resolve(__dirname,'src')
    },
    css:{
      preprocessorOptions:{
        less:{
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, 'src/assets/styles/base.scss')}";`,
        }
      }
    }
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});