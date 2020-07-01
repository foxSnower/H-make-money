import Vue from 'vue'
import router from '../router'
import store from '../store'
import axios from 'axios'
import { Toast } from 'mint-ui';

const http = axios.create({
  timeout: 1000 * 10,
  baseURL: Vue.prototype.$GLOBAL.BASE_URL,
  headers: {
    // 'app': Vue.prototype.$GLOBAL.APP,
    // 'X-Forwarded-For': '127.0.0.1',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
    'responseType':'arraybuffer'
  },
})

const cookieToken = Vue.prototype.$GLOBAL.TOKEN;
const cookieRefreshToken = Vue.prototype.$GLOBAL.REFRESHTOKEN;
const tokenTime = Vue.prototype.$GLOBAL.TOKENTIME;



/**
 * 请求拦截
 */
http.interceptors.request.use(async request => {
  //显示loading
  store.commit('loading', true);
  //添加 Authorization
 
  switch (request.url) {
    // 不需要任何Authorization的API
    case '/secret/register':
    case '/sso/login':
    case '/home/content':
    case '/product/getProduct':
    case '/product/getProductList':
      return request
      break;
    // 其余API的Authorization全部使用token
    default:
      let tokenHead = Vue.cookie.get('tokenHead');
      let token = Vue.cookie.get('token');
      if (tokenHead == null || token == null) {
        router.push('/login');
      } else {
        request.headers['Authorization'] = tokenHead +' ' + token;
      }
      return request
      break;
  }
}, err => {
  return Promise.reject(err)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(res => {
  //隐藏 loading
  store.commit('loading', false);
  console.log(res)
  if (res.data.error_code != '0') {
    Toast(res.data.error_msg);
    return res.data
  }else{
    return res.data
  }
  // if (res.data.code) {
  //   if (res.data.code === 200) {
  //     return res.data
  //   } else {
  //     Toast(res.data.message);
  //     return Promise.reject(res.data.code)
  //   }
  // } else {
  //   return Promise.reject(null)
  // }
}, err => {
  store.commit('loading', false);
  let response = err.response;
  if (response) {
    let status = response.status;
    if (status === 500) {
      Toast('服务器正在维护,请稍后在试')
    } else {
      Toast(String(status))
    }
  } else {
    if (err.message && err.message.indexOf('timeout') != -1) {
      Toast('请求超时')
    } else {
      if (err.message) {
        Toast(err.message)
      }
    }

  }
  return Promise.reject(err)
})

export default http
