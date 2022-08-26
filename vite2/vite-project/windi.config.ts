/*
 * @Author: ZYH
 * @Date: 2022-08-26 08:36:38
 * @LastEditTime: 2022-08-26 08:48:32
 * @Description: 
 */
import {defineConfig} from 'vite-plugin-windicss';
export default defineConfig({
  // 开启 attributify
  attributify: true,
  shortcuts: {
    "flex-c": "flex justify-center items-center",
  },
});
