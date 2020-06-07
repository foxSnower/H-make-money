import Vue from 'vue'
import router from '../router'
import store from '../store'
import axios from 'axios'
import { Toast } from 'mint-ui';

const http = axios.create({
  timeout: 1000 * 5,
  baseURL: Vue.prototype.$GLOBAL.BASE_URL,
  headers: {
    // 'app': Vue.prototype.$GLOBAL.APP,
    // 'X-Forwarded-For': '127.0.0.1',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8'
  },
})

const cookieToken = Vue.prototype.$GLOBAL.TOKEN;
const cookieRefreshToken = Vue.prototype.$GLOBAL.REFRESHTOKEN;
const tokenTime = Vue.prototype.$GLOBAL.TOKENTIME;

// /**
//  * 清空 cookie
//  */
// const clearToken = () => {
//   Vue.cookie.delete(cookieToken);
//   Vue.cookie.delete(cookieRefreshToken);
// }

// /**
//  * 获取 token
//  */
// const getToken = async () => {
//   // 从cookie中获取token
//   let token = Vue.cookie.get(cookieToken);
//   // 如果token失效，则重新获取
//   if (!token) {
//     return await http.get('/getToken').then(res => {
//       if (res.code == '0') {
//         // 重置token
//         Vue.cookie.set(cookieToken, res.data, { expires: tokenTime / 2 + 'm' });
//         Vue.cookie.set(cookieRefreshToken, res.data, { expires: tokenTime + 'm' });
//         return  res.data
//       } else {
//         // 清空cookie
//         clearToken()
//         // 跳转到登录页
//         router.push('/login')
//         Message.error('token失效，请重新登录 !')
//       }
//     }).catch(err => {
//       // 清空cookie
//       clearToken()
//       // 跳转到登录页
//       router.push('/login')
//       Message.error('token失效，请重新登录 !')
//     })
//   } 
//    return token
// }

/**
 * 请求拦截
 */
http.interceptors.request.use(async request => {
  //显示loading
  store.commit('loading', true);
  //统一为接口增加isEnglish参数
  if (request.method == 'get') {
    if (request.params.isEnglish === undefined) {
      if (store.state.app.isEnglish == 0) request.params.isEnglish = 0;
      if (store.state.app.isEnglish == 1) request.params.isEnglish = 1;
    }
  }
  //添加 Authorization
  switch (request.url) {
    // 不需要任何Authorization的API
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
        request.headers['Authorization'] = tokenHead + token;
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
  if (res.data.code) {
    if (res.data.code === 200) {
      return res.data
    } else {
      Toast(res.data.message);
      return Promise.reject(res.data.code)
    }
  } else {
    return Promise.reject(null)
  }
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
