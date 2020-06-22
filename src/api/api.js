import Vue from 'vue'
import axios from 'axios'
import http from './http.js'

const system = '';


function toQueryPair(key, value) {
  if (typeof value == 'undefined') {
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}
function toQueryString(obj) {
  var ret = [];
  for (var key in obj) {
    key = encodeURIComponent(key);
    var values = obj[key];
    if (values && values.constructor == Array) {//数组
      var queryValues = [];
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else { //字符串
      ret.push(toQueryPair(key, values));
    }
  }
  return ret.join('&');
}



const comAPI = (method, url, params) => {
  if (!params) { params = {} };
  switch (method) {
    case 'post':
      return http.post(url, params).then(res => {
        return res
      })
      break;
    case 'get':
      return http.get(url, { params }).then(res => {
        return res
      })
      break;
    case 'postquery':
      params = toQueryString(params)
      return http.post(url + '?' + params, {}).then(res => {
        return res
      })
    case 'upload':
      http.headers = { 'Content-Type': 'multipart/form-data' };
      return http.post(url, params).then(res => {
        return res
      })
      break;
    case 'local':
      let loacalHttp = axios.create({
        baseURL: './static',
      })
      return loacalHttp.get(url, { params }).then(res => {
        return res.data
      })
      break;
    default:
      break;
  }

}

const api = {
  //注册
  register(params) { return comAPI('post', system + '/secret/register', params) },
  //登录
  login(params) { return comAPI('post', system + '/secret/token', params) },
  //获取验证码
  verifycode(params) { return comAPI('get', system + '/secret/verifycode', params) },
  //修改密码
  changepwd(params) { return comAPI('post', system + '/secret/changepwd', params) },
  //获取当前用户信息
  selfinfo(params) { return comAPI('post', system + '/secret/selfinfo', params) },
  //用户钱包
  userwallet(params) { return comAPI('post', system + '/wallet/userwallet', params) },
  //奖金明细
  usercoinrecord(params) { return comAPI('post', system + '/wallet/usercoinrecord', params) },
  //学点转让
  studycoinexchange(params) { return comAPI('post', system + '/wallet/studycoinexchange', params) },
  //学点转让记录
  studycoinexchangerecord(params) { return comAPI('post', system + '/wallet/studycoinexchangerecord', params) },

  //获取当前登录用户信息
  selfinfo(params) { return comAPI('post', system + '/secret/selfinfo', params) },

  //产品列表
  products(params) { return comAPI('get', system + '/product/products', params) },
  //买入申请
  tobuy(params) { return comAPI('post', system + '/buy/tobuyorder', params) },
  //买入确认
  tobuyordersure(params) { return comAPI('post', system + '/buy/tobuyordersure', params) },
  //买入信息记录
  buyorder(params) { return comAPI('post', system + '/buy/buyorderbyuserid', params) },
  //买入信息记录详情
  buyorderdetail(params) { return comAPI('post', system + '/buy/buyorderdetailbyparentid', params) },
  //卖出申请
  tosell(params) { return comAPI('post', system + '/sell/tosellorder', params) },
  //卖出信息记录
  sellorder(params) { return comAPI('post', system + '/sell/sellorderbyuserid', params) },
  //卖出信息记录详情
  sellorderdetail(params) { return comAPI('post', system + '/sell/sellorderdetailbyparentid', params) },
  //卖出确认
  tosellordersure(params) { return comAPI('post', system + '/sell/tosellordersure', params) },
  
  //直推体系
  relationnum(params) { return comAPI('post', system + '/relation/relationnum', params) },
  

  
}

Vue.prototype.$http = http;
Vue.prototype.$api = api;
