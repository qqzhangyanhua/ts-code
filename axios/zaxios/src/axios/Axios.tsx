/*
 * @Author: ZYH
 * @Date: 2022-08-23 08:36:51
 * @LastEditTime: 2022-08-29 08:30:37
 * @Description:
 */
import qs from "qs";
import { AxiosRequestConfig, AxiosResponse } from "./types";
import parseHeaders from "parse-headers";
export class Axios {
  //T用来限制response里data的类型
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.dispatchRequest(config);
  }
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let request = new XMLHttpRequest();
      let { url, method = "get", params } = config;
      if (params && typeof params === "object") {
        params = qs.stringify(params);
        url += (url.indexOf("?") === -1 ? "?" : "&") + params;
      }
      request.open(method.toUpperCase(), url, true);
      request.onreadystatechange = () => {
        //指定一个状态变更函数
        //0,1,2,3,4
        if (request.readyState == 4) {
          if (request.status >= 200 && request.status < 300) {
            let response: AxiosResponse<T> = {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config,
              request,
            };
            resolve(response);
          } else {
            reject(new Error("error"));
          }
        }
      };
      request.send(params);
    });
  }
}
