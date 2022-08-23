
export type Methods = 'get'|'post'|'put'|'patch'|'head'|'delete'|'options'|'trace'|'connect';
export interface AxiosRequestConfig {
  url: string;
  params: Record<string, any>;
  methods: Methods;
}

// promise的T类型代表成功之后reslov的值
export interface AxiosInstance {
  <T=any>(config:AxiosRequestConfig):Promise<T>;
}