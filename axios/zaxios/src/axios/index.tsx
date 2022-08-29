import { Axios } from "./Axios";
import {AxiosInstance} from './types';
function createInstance(): AxiosInstance {
  const context: Axios = new Axios();
  //   request的this 指向axios实例
  let instance = Axios.prototype.request.bind(context);
  instance = Object.assign(instance, Axios.prototype, context);
  return instance as AxiosInstance;
}
let axios = createInstance();
export default axios;