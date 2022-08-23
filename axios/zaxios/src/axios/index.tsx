import { Axios } from "./Axios";

function createInstance() {
  const context:Axios = new Axios();
//   request的this 指向axios实例
    let instance =  Axios.prototype.request.bind(context);
    instance = Object.assign(instance,Axios.prototype ,context);
  return instance;
}
let axios = createInstance();
export default axios;