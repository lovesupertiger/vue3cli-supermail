import axios from 'axios'

export function request(config) {

  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'https://123.207.32.32:8000',
    timeout: 5000 /*5s*/
  })
  //2.axios的拦截器
  //2.1 请求拦截处理
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    console.log(error)
  })

  //2.2 响应拦截处理
  instance.interceptors.response.use(resp => {
    return resp.data
  }, error => {
    console.log(error)
  })

  //3.发送网络请求
  return instance(config)
}
