/*
 * @Author: ZYH
 * @Date: 2022-08-26 08:40:48
 * @LastEditTime: 2022-08-26 08:46:23
 * @Description: 
 */

import { AttributifyAttributes } from "windicss/types/jsx";

declare module "react" {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}