import Vue from 'vue'
import $U from './index'
import store from '../store'


Vue.filter('filterNull', function (val) {
  if (val == null) {
    return '-'
  } else {
    return val
  }
});

Vue.filter('filterIdCard', function (val) {
  if (val != null) {
    let arr1 = val.substr(0, 6);
    let arr2 = val.substr(6, 8);
    let arr3 = val.substring(14);
    return arr1 + ' ' + arr2 + ' ' + arr3;
  } else {
    return '-'
  }
});

Vue.filter('filterPhone', function (val) {
  if (val != null) {
    let arr1 = val.substr(0, 3);
    let arr2 = val.substr(3, 4);
    let arr3 = val.substring(7);
    return arr1 + ' ' + arr2 + ' ' + arr3;
  } else {
    return '-'
  }

});

Vue.filter('filterToDay', function (val) {
  if (val == null || val == '') {
    return '-'
  } else {
    return val.substr(0, 10)

  }
});
Vue.filter('filterDate', function (val) {
  if (val == null || val == '') {
    return '-'
  } else {
    let m = val.getMonth() + 1;
    let d = val.getDate();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    return m + "-" + d;

  }
});
Vue.filter('filterName', function (val) {
  if (val == null || val == '') {
    return '-'
  } else {
    let dd = new Date();
    let ddToStr = $U.getDateStr(dd);
    let valToStr = $U.getDateStr(val);
    let dayTotal = $U.getDays(ddToStr, valToStr);
    //中英文
    let isEnglish = store.state.app.isEnglish == 0;// 语言标识
    let today = isEnglish?'今天':'Today';
    let Tomorrow = isEnglish?'明天':'Tomorrow';
    let after = isEnglish?'后天':'The day after tomorrow';
    if (dayTotal <= 0) return today;
    if (dayTotal <= 1) return Tomorrow;
    if (dayTotal <= 2) return after;
    let a = isEnglish?["周日", "周一", "周二", "周三", "周四", "周五", "周六"]:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var week = val.getDay();
    if (dayTotal >= 3) return a[week];
  }
});
