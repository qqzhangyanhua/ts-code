import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
const variablePath = normalizePath(path.resolve('./src/variable.scss'));
import windi from 'vite-plugin-windicss';
import autoprefixer from 'autoprefixer';
// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定根目录的位置
  // root: path.join(__dirname,'src'),
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-styled-components", "@emotion/babel-plugin"],
      },
      jsxImportSource: "@emotion/react",
    }),
    windi(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
    modules: {
      //我们可以通过这个配置来对生成的雷鸣进行自定义
      // 其中name 表示当前文件名 local 表示当前类名
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        //additionalDat的内容会在每个scss文件的开头自动引入
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
});
