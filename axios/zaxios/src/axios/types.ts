
export type Methods = 'get'|'post'|'put'|'patch'|'head'|'delete'|'options'|'trace'|'connect';
export interface AxiosRequestConfig {
  url: string;
  params: any;
  method: Methods;
}

// promise的T类型代表成功之后reslov的值
export interface AxiosInstance {
  <T=any>(config:AxiosRequestConfig):Promise<T>;
}
export interface AxiosResponse<T=any>{
  data:T;
  status:number;
  statusText:string;
  headers:Record<string,any>;
  config?:AxiosRequestConfig;
  request?:XMLHttpRequest;

}