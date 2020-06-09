import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
  * login: '登录',home: '首页',info: '商品信息',infoComments: '住客评论',
  * infoFacilities: '配套设施',rooms: '客房',orderEdit: '订单填写',orderDetail: '订单详情',
  * orderPay: '支付方式',orderForMe: '我的订单',orderComment: '订单评价',
  * my: '个人中心',myCollection: '我的收藏',myComments: '我的评价',
  * myBasicInfo: '基本信息',systemSet: '系统设置',car: '购物车',
  */
const router = new Router({
  routes: [
    { path: '/', redirect: 'index', component: () => import('@views/index.vue') },
    { path: '/index', meta: { title: '' }, name: 'index', component: () => import('@views/index.vue') },
    { path: '/buy', meta: { title: '买入申请' }, name: 'buy', component: () => import('@views/order/buy.vue') },
    { path: '/buyRecord', meta: { title: '买入记录' }, name: 'buyRecord', component: () => import('@views/order/buyRecord.vue') },
    { path: '/buyRecordDetail', meta: { title: '买入记录' }, name: 'buyRecordDetail', component: () => import('@views/order/buyRecordDetail.vue') },
    { path: '/sell', meta: { title: '卖出申请' }, name: 'sell', component: () => import('@views/order/sell.vue') },
    { path: '/sellRecord', meta: { title: '卖出记录' }, name: 'sellRecord', component: () => import('@views/order/sellRecord.vue') },
    { path: '/sellRecordDetail', meta: { title: '卖出记录' }, name: 'sellRecordDetail', component: () => import('@views/order/sellRecordDetail.vue') },
    
    { path: '/login', meta: { title: 'login' }, name: 'login', component: () => import('@views/account/login.vue') },
    { path: '/register', meta: { title: '' }, name: 'register', component: () => import('@views/account/register.vue') },
    { path: '/modifyPasswordFirst', meta: { title: '修改密码' }, name: 'modifyPasswordFirst', component: () => import('@views/account/modifyPasswordFirst.vue') },
    { path: '/modifyPasswordSecond', meta: { title: '修改密码' }, name: 'modifyPasswordSecond', component: () => import('@views/account/modifyPasswordSecond.vue') },
    { path: '/qrcode', meta: { title: '二维码' }, name: 'qrcode', component: () => import('@views/qrcode/qrcode.vue') },
    { path: '/my', meta: { title: '个人中心' }, name: 'my', component: () => import('@views/my/my.vue') },
    { path: '/myInfo', meta: { title: '个人信息' }, name: 'myInfo', component: () => import('@views/my/myInfo.vue') },
    { path: '/myWallet', meta: { title: '钱包' }, name: 'myWallet', component: () => import('@views/my/myWallet.vue') },
    { path: '/myBonusDetail', meta: { title: '奖金明细' }, name: 'myBonusDetail', component: () => import('@views/my/myBonusDetail.vue') },
    { path: '/myGoldTransfer', meta: { title: '学点转让' }, name: 'myGoldTransfer', component: () => import('@views/my/myGoldTransfer.vue') },
    { path: '/myTransferState', meta: { title: '转让状态' }, name: 'myTransferState', component: () => import('@views/my/myTransferState.vue') },
    { path: '/myPushSystem', meta: { title: '直推体系' }, name: 'myPushSystem', component: () => import('@views/my/myPushSystem.vue') }

    // { path: '/info', meta: { title: 'info' }, name: 'info', component: () => import('@views/info/info.vue') },
    // { path: '/infoComments', meta: { title: 'infoComments' }, name: 'infoComments', component: () => import('@views/info/infoComments.vue') },
    // { path: '/infoFacilities', meta: { title: 'infoFacilities' }, name: 'infoFacilities', component: () => import('@views/info/infoFacilities.vue') },
    // { path: '/rooms', meta: { title: 'rooms' }, name: 'rooms', component: () => import('@views/rooms/rooms.vue') },
    // { path: '/orderEdit', meta: { title: 'orderEdit' }, name: 'orderEdit', component: () => import('@views/order/orderEdit.vue') },
    // { path: '/orderDetail', meta: { title: 'orderDetail' }, name: 'orderDetail', component: () => import('@views/order/orderDetail.vue') },
    // { path: '/orderPay', meta: { title: 'orderPay' }, name: 'orderPay', component: () => import('@views/order/orderPay.vue') },
    // { path: '/orderForMe', meta: { title: 'orderForMe' }, name: 'orderForMe', component: () => import('@views/order/orderForMe.vue') },
    // { path: '/orderComment', meta: { title: 'orderComment' }, name: 'orderComment', component: () => import('@views/order/orderComment.vue') },
    // { path: '/my', meta: { title: 'my' }, name: 'my', component: () => import('@views/my/my.vue') },
    // { path: '/myCollection', meta: { title: 'myCollection' }, name: 'myCollection', component: () => import('@views/my/myCollection.vue') },
    // { path: '/myComments', meta: { title: 'myComments' }, name: 'myComments', component: () => import('@views/my/myComments.vue') },
    // { path: '/myBasicInfo', meta: { title: 'myBasicInfo' }, name: 'myBasicInfo', component: () => import('@views/my/myBasicInfo.vue') },
    // { path: '/systemSet', meta: { title: 'systemSet' }, name: 'systemSet', component: () => import('@views/my/systemSet.vue') },
    // { path: '/car', meta: { title: 'car' }, name: 'car', component: () => import('@views/car/car.vue') },
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  //路由跳转登录时清除cookie
  if (to.path === '/login') {
    Vue.cookie.delete('token');
    Vue.cookie.delete('tokenHead');
    next()
  } else {
    next()
  }
})


export default router