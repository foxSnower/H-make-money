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
  //获取当前登录用户信息
  selfinfo(params) { return comAPI('post', system + '/secret/selfinfo', params) },

  //产品列表
  products(params) { return comAPI('get', system + '/product/products', params) },
  //买入申请
  tobuy(params) { return comAPI('post', system + '/buy/tobuyorder', params) },
  //买入信息记录
  buyorder(params) { return comAPI('post', system + '/buy/buyorderbyuserid', params) },
  //买入信息记录详情
  buyorderdetail(params) { return comAPI('post', system + '/buy/buyorderdetailbyparentid', params) },
  //卖出申请
  tosell(params) { return comAPI('post', system + '/sell/matching', params) },
  //卖出信息记录
  sellorder(params) { return comAPI('post', system + '/sell/sellorderbyuserid', params) },
  //卖出信息记录详情
  sellorderdetail(params) { return comAPI('post', system + '/sell/sellorderdetailbyparentid', params) },


  //首页内容页信息展示
  homeContent(params) { return comAPI('get', system + '/home/content', params) },
  //商品信息展示
  getProduct(params) { return comAPI('get', system + '/product/getProduct', params) },
  //获取商品列表、收藏列表
  getProductList(params) { return comAPI('get', system + '/product/getProductList', params) },
  //订单列表
  getOrderList(params) { return comAPI('get', system + '/order/getOrderList', params) },
  //订单明细
  getOrderDetail(params) { return comAPI('get', system + '/order/getOrderDetail', params) },
  //取消订单
  orderDelete(params) { return comAPI('post', system + '/order/cancelOrder/v2', params) },
  //立即预定查询接口
  orderWriteSearch(params) { return comAPI('post', system + '/order/orderWriteSearch', params) },
  //购物车结算查询接口
  cartOrderWriteSearch(params) { return comAPI('post', system + '/order/cartOrderWriteSearch', params) },
  //确定下单
  directOrder(params) { return comAPI('post', system + '/order/directOrder', params) },
  //商品评论
  queryComment(params) { return comAPI('get', system + '/pmsComment/queryComment', params) },
  //商品评论回复
  queryCommentReplay(params) { return comAPI('get', system + '/pmsCommentReplay/queryCommentReplay', params) },
  //新增评论
  addPmsComment(params) { return comAPI('post', system + '/pmsComment/addPmsComment', params) },
  //新增回复
  addMsCommente(params) { return comAPI('post', system + '/pmsCommentReplay/addMsCommente', params) },
  //某商品自己的评论及回复
  // queryCommentAndReplay(params) { return comAPI('get', system + '/pmsComment/queryCommentAndReplay', params) },
  //入住人信息列表
  memberList(params) { return comAPI('get', system + '/member/address/list', params) },
  //更新入住人信息
  memberUpdate(params) { return comAPI('post', system + '/member/address/update', params) },
  //新增入住人信息
  memberAdd(params) { return comAPI('post', system + '/member/address/add', params) },
  //删除入住人信息
  memberDelete(params) { return comAPI('post', system + '/member/address/delete', params) },
  //上传附件
  fileUpload(params) { return comAPI('upload', system + 'service/fileUpload', params) },
  //加入购物车
  addCar(params) { return comAPI('post', system + '/cart/add/v2', params) },
  //购物车列表
  carList(params) { return comAPI('get', system + '/cart/list/v2', params) },
  //调整购物车数量
  carValidQuantity(params) { return comAPI('post', system + '/cart/list/validQuantity', params) },
  //删除购物车
  carDelete(params) { return comAPI('post', system + '/cart/delete', params) },
  //用户中心首页
  memberInfo(params) { return comAPI('get', system + '/memberCenter/memberInfo', params) },
  //会员收藏
  collection(params) { return comAPI('post', system + '/member/collection/addProduct', params) },
  //获取购物车的数据
  getCartCount(params) { return comAPI('get', system + '/cart/getCartCount', params) },

}

Vue.prototype.$http = http;
Vue.prototype.$api = api;
