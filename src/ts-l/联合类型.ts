/*
 * @Author: ZYH
 * @Date: 2022-08-20 09:28:34
 * @LastEditTime: 2022-08-20 09:30:06
 * @Description: 
 */

type HttpMethod = 'get'|'post'|'put'|'delete';
function sendRequest(method: HttpMethod): void {
    console.log(method);
}
sendRequest('get');