import Vue from 'vue'
import $U from "../utils";
//基础数据
const app = {
  state: {
    //是否英文版
    isEnglish: 0,
    //入住离店时间
    datePicker: {
      startValue: new Date(),
      endValue: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    },
    //订单当前状态
    orderStatus:0,
    loading:false
  },
  getters: {
    isEnglish: state => state.isEnglish,
    datePicker: state => state.datePicker,
    loading: state => state.loading,
    orderStatus: state => state.orderStatus,
  },
  mutations: {
    isEnglish(state, payload) { state.isEnglish = payload },
    datePicker(state, payload) { state.datePicker = payload },
    loading(state, payload) { state.loading = payload },
    orderStatus(state, payload) { state.orderStatus = payload },
  }
}

Vue.prototype.$loading = app.state.loading;
export default app
