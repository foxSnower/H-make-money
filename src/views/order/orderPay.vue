<template>
  <div>
    <Header></Header>
    <orderShow></orderShow>
    <div class="pay">
      <p>
        {{ $t('orderPay.totalPayable')}}：
        <i>￥</i>
        <i class="num">1999</i>
      </p>
    </div>
    <div class="pay-type">
      <div class="cell">
        <img src="@assets/payBank.png" />
        <span>{{ $t('orderPay.savingsDepositCard')}}</span>
      </div>
      <div class="cell">
        <img src="@assets/payCredit.png" />
        <span>{{ $t('orderPay.creditCard')}}</span>
      </div>
      <div class="cell">
        <img src="@assets/payWeixin.png" />
        <span>{{ $t('orderPay.WeChat')}}</span>
      </div>
      <div class="cell">
        <img src="@assets/payZhifubao.png" />
        <span>{{ $t('orderPay.Alipay')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    Header: () => import("@components/layout/Header"),
    orderShow: () => import("./components/orderShow")
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.pay {
  background-color: #fff;
  > p {
    padding: 10px 20px;
    i {
      color: #ff2a00;
      &.num {
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin: 10px;
  background-color: #fff;
  .cell {
    position: relative;
    height: 50px;
    line-height: 50px;
    padding-left: 40px;
    margin: 0 10px;
    & + .cell {
      border-top: 1px solid #efefef;
    }
    img {
      width: 22px;
      height: 22px;
      position: absolute;
      top: 14px;
      left: 0;
    }
    span {
      display: inline-block;
    }
  }
}
</style>
