/*
 * @Author: ZYH
 * @Date: 2022-07-19 08:26:33
 * @LastEditTime: 2022-07-19 08:32:50
 * @Description: 
 */

type Factory<T> = T|number|string;
type Clone<T> = {
    [K in keyof T]:T[K];
}

type IsEqual<T> = T extends true?1:2;
type A = IsEqual<true>  //1
type B = IsEqual<false> //2