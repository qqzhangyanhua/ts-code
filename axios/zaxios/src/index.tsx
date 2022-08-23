 import axios,{AxiosResponse} from 'axios';

 const baseURL = 'http://localhost:8888';
 

 axios({
  method:'get',
  url:baseURL + '/film',
  params:{}
 }).then((res:AxiosResponse)=>{
  console.log(res);
  return res.data;
 }).catch((err)=>{
  console.log(err);
 });