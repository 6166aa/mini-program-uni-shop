import Request from 'luch-request';
import config from '@/configs/index.js';
const http = new Request({
  baseURL: config.BASE_URL,
});
//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  if (config.custom.loading) {
    uni.showLoading({
      title: '加载数据中...'
    });
  }
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})
//相应拦截器
http.interceptors.response.use((response) => {
  if (response.config.custom.loading) {
    uni.hideLoading();
  }
  if(response.data.meta.status!==200){
    return Promise.resolve(response.data.meta.msg)
  }
  return response.data.message;
}, (response) => {
  return Promise.reject(response)
});

export default http;
