// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入VueCookie
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

//引入MintUI组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import store from './store'
import is from "is-js";
Vue.prototype.$is = is;

import '@/style/fonts/iconfont.css' //引入iconfont图标字体
import '@/style/index.scss'

import G_ from './api/global.js'  //全局变量
import U_ from './utils' //公共函数方法
import F_ from './utils/filters.js' //全局过滤方法

import api from './api/api.js' //API


/**
 * 引入图片预览---使用方法增加属性 preview="xxx" xxx相等时就是在同一组里切换了
 * */
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

// 引入语言
// import i18n from './i18n'


Vue.config.productionTip = false



/**
 * 全局指令- 纺锚链接->使用方法按钮增加 v-anchor="xxx" ，跳转地增加 id="anchor-xxx"
 */

Vue.directive('anchor', {
  inserted: function (el, binding) {
    el.onclick = function () {
      let ID = document.getElementById('anchor-' + binding.value);
      document.documentElement.scrollTop = ID.offsetTop - 90;
      document.body.scrollTop = ID.offsetTop - 90;//兼容写法
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  components: {
    App
  },
  template: '<App/>'
})
