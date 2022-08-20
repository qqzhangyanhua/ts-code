/*
 * @Author: ZYH
 * @Date: 2022-07-19 08:26:33
 * @LastEditTime: 2022-08-20 09:27:51
 * @Description: 
 */

type Factory<T> = T|number|string;
type Clone<T> = {
    [K in keyof T]:T[K];
}

type IsEqual<T> = T extends true?1:2;
type A = IsEqual<true>  //1
type B = IsEqual<false> //2
function id<T>(value:T):T{
    return value
}
id(1)

function id2<T,U>(val:T,msg:U):T{
    return val
}