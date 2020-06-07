<template>
  <div>
    <Header></Header>
    <div class="btn">
      <div class="title">{{ $t('orderEdit.type')}}</div>
      <mt-button :class="{'is-selected':type=='长期租'}" @click.native="type='长期租'">
        <i v-if="type=='长期租'" class="iconfont icongou"></i>{{ $t('orderEdit.longRent')}}
      </mt-button>
      <mt-button :class="{'is-selected':type=='短期租'}" @click.native="type='短期租'">
        <i v-if="type=='短期租'" class="iconfont icongou"></i>{{ $t('orderEdit.shortRent')}}
      </mt-button>
      <div class="tip" v-if="type=='长期租'">
        <i class="iconfont icongouxuan"></i>{{ $t('orderEdit.explain')}}
      </div>
    </div>
    <div class="order-box" v-for="(x,index) in productPriceInfoSums" :key="index">
      <orderShow :orderShow="x"></orderShow>
      <!-- 暂不需要 -->
      <!-- <orderDatePicker v-if="type!='长期租'" style="padding-bottom:20px;"></orderDatePicker> -->
      <orderBack></orderBack>
      <div class="price">
        <div class="title">{{ $t('orderEdit.price')}}</div>
        <div class="cont">
          <p>
            <span class="f-left">{{x.startDate}} {{ $t('orderEdit.to')}} {{x.endDate}}</span>
            <span class="f-right">{{$U.getDays(x.startDate, x.endDate)}} {{ $t('orderEdit.day')}}</span>
          </p>
          <p>
            <span class="f-right">
              {{ $t('orderEdit.total')}} ￥
              <i class="num">{{x.totalPrice}}</i>
            </span>
          </p>
        </div>
        <div class="cont">
          <p>
            <span class="f-left">{{ $t('orderEdit.deposit')}}</span>
            <span class="f-right">
              ￥
              <i class="num">{{x.cashpledge}}</i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="sel-man">
      <div class="title">
        {{ $t('orderEdit.choosingResident')}}
        <span>{{ $t('orderEdit.choosingResidentExplain')}}</span>
      </div>
      <customerInfo ref="customerInfo"></customerInfo>
    </div>
    <orderEditFooter :totalMoney="totalMoney" @surePay="surePay()"></orderEditFooter>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      type: "短期租",
      productPriceInfoSums: [],
      checkInInfoList: []
    };
  },
  components: {
    Header: () => import("@components/layout/Header"),
    orderDatePicker: () => import("./components/orderDatePicker"),
    customerInfo: () => import("@components/customerInfo"),
    orderShow: () => import("./components/orderShow"),
    orderBack: () => import("./components/orderBack"),
    orderEditFooter: () => import("./components/orderEditFooter")
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      let productSn = this.$route.query.productSn;
      let cartNoList = this.$route.query.cartNoList;
      //从预订按钮进入
      if (productSn != null) {
        this.$api
          .orderWriteSearch({
            startDate: this.$U.getDateStr(this.datePicker.startValue),
            endDate: this.$U.getDateStr(this.datePicker.endValue),
            productSn: this.$route.query.productSn,
            quantity: 1
          })
          .then(res => {
            this.productPriceInfoSums = res.data.productPriceInfoSums;
          });
      }
      //从购物车结算进入
      if (cartNoList != null) {
        this.$api
          .cartOrderWriteSearch({
            cartNoList: cartNoList.split(",")
          })
          .then(res => {
            this.productPriceInfoSums = res.data.productPriceInfoSums;
          });
      }
    },
    //确定下单
    surePay() {
      //判断入住人数不能少于房间数
      let memberList = this.$refs.customerInfo.memberList;
      memberList = memberList.filter(item => item.check == true);
      if (memberList.length < this.totalQuantity) {
        this.$toast(this.$t('orderEdit.toast')+"(" + this.totalQuantity + ")");
        return false;
      }
      let productSn = this.$route.query.productSn;
      let cartNoList = this.$route.query.cartNoList;
      //从预订按钮进入
      if (productSn != null) {
        cartNoList = [];
      } else {
        //从购物车结算进入
        cartNoList = cartNoList.split(",");
      }
      this.$api
        .directOrder({
          cartNoList: cartNoList,
          checkInInfoList: memberList,
          directOrderDtos: this.productPriceInfoSums,
          isLongRent: this.type == "短期租" ? 0 : 1
        })
        .then(res => {
          if (this.type == "短期租") {
            this.$router.push("/orderPay?orderId=" + res.data.orderId);
          } else {
            this.$router.push(
              "/orderDetail?type=长期租&orderId=" + res.data.orderId
            );
          }
        });
    }
  },
  computed: {
    ...mapGetters(["datePicker"]),
    //房间数量
    totalQuantity() {
      let productPriceInfoSums = this.productPriceInfoSums;
      let totalQuantity = 0;
      productPriceInfoSums.forEach((x, index) => {
        totalQuantity += x.quantity;
      });
      return totalQuantity;
    },
    //总金额
    totalMoney() {
      let productPriceInfoSums = this.productPriceInfoSums;
      let totalMoney = 0;
      productPriceInfoSums.forEach((x, index) => {
        totalMoney += x.totalPrice + x.cashpledge;
      });
      return totalMoney;
    }
  }
};
</script>

<style lang="scss" scoped>
.order-box {
  margin: 10px;
  border: 1px solid #d9d9d9;
}
.btn {
  background-color: #fff;
  .title {
    padding: 10px 20px;
    font-size: 20px;
    color: #7b7b7b;
  }
  .mint-button {
    border: 1px solid #d8d8d8;
    padding: 0 20px;
    background-color: #fff;
    margin: 5px 10px;
    margin-right: 0;
    font-size: 14px;
  }

  .is-selected {
    color: #ff2a00;
    border: 1px solid #ff2a00;
    .iconfont {
      position: absolute;
      bottom: -11px;
      background-color: red;
      color: #fff;
      right: -7px;
      width: 30px;
      height: 20px;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-30deg);
      font-size: 18px;
      &:before {
        position: absolute;
        left: 10px;
        top: -5px;
        transform: rotate(30deg);
      }
    }
  }
  .tip {
    padding: 10px 20px;
    color: #ff2a00;
    .iconfont {
      margin-right: 10px;
      font-size: 16px;
    }
  }
  .more {
    color: #ff2a00;
    .iconfont {
      position: relative;
      font-size: 16px;
      top: 1px;
    }
  }
}
.sel-man {
  background-color: #fff;
  margin-top: 10px;
  .title {
    padding: 10px 20px;
    font-size: 20px;
    color: #7b7b7b;
    span {
      font-size: 12px;
    }
  }
}
.price {
  background-color: #fff;
  .title {
    font-size: 20px;
    padding: 10px 20px;
  }
  .cont {
    padding: 10px 20px;
  }
  p {
    overflow: hidden;

    .f-left {
      float: left;
    }
    .f-right {
      float: right;
    }
    .num {
      font-size: 20px;
    }
  }
}
</style>