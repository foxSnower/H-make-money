<template>
  <div style="height:55px;">
    <div class="f-flex footer">
      <div class="item pay-method">
        <span>{{ $t('orderEditFooter.offlinePayment')}}：</span>
        <span class="price">
          ￥
          <i>{{totalMoney}}</i>
        </span>
      </div>
      <div class="item">
        <mt-button class="btn red" @click.native="surePay">{{ $t('orderEditFooter.sureOrder')}}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalMoney: Number
  },
  methods: {
    surePay() {
      this.$emit("surePay");
    },
    // linkTo(type) {
    //   if (type == "长期租") this.$router.push("/orderDetail?type=长期租");
    //   if (type == "短期租") {
    //     this.$api
    //       .directOrder({
    //         cartNoList: ["string"],
    //         checkInInfoList: [
    //           {
    //             customer: "string",
    //             id: 0,
    //             idCard: "string",
    //             tel: "string"
    //           }
    //         ],
    //         directOrderDtos: [
    //           {
    //             endDate: "2019-07-31",
    //             productSn: "string",
    //             quantity: 0,
    //             startDate: "2019-07-31"
    //           }
    //         ],
    //         isLongRent: 0
    //       })
    //       .then(res => {});
    //     // this.$router.push("/orderPay");
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  background-color: #fff;
  border-top: 1px solid #c9c9c9;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 50px;
  .item {
    flex: 1;
    padding: 5px 0;
    margin-right: 3px;
    font-size: 12px;
    .btn {
      width: 100%;
      height: 100%;
      font-size: 14px;
      color: #fff;
      min-width: 100px;
      &.orange {
        background-color: #ff8e14;
      }
      &.red {
        background-color: #ff3237;
      }
    }
    img {
      width: 22px;
      height: 22px;
    }
  }
  .pay-method,
  .price {
    line-height: 40px;
  }
  .pay-method {
    text-align: left;
    padding-left: 20px;
  }
  .price {
    color: #ff3237;
    i {
      font-size: 20px;
      font-style: normal;
    }
  }
}
</style>

