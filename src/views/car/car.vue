<template>
  <div>
    <carHeader></carHeader>
    <div class="car-top" @click="changeManage(manageStatus)">{{manageStatus}}</div>
    <div class="car-bd">
      <div
        class="scroll-box"
        v-for="(x,index) in carList"
        :key="index"
        @click="$router.push('/info?productSn='+x.productSn)"
      >
        <div class="scroll-width">
          <div class="f-flex img-cell">
            <!-- <i class="iconfont iconcircle"></i> -->
            <i class="iconfont iconcircle" v-if="!x.check" @click.stop="changeCheck(x)"></i>
            <i class="iconfont icongouxuan" v-if="x.check" @click.stop="changeCheck(x)"></i>
            <div class="img">
              <img :src="x.pic" />
            </div>
            <div class="f-item1">
              <p>{{x.title}}</p>
              <p class="tip">{{x.subTitle}}</p>
              <p
                class="tip"
              >{{$t('car.date')}}：{{x.startDate|filterToDay}} {{$t('car.to')}} {{x.endDate|filterToDay}}</p>
              <p class="price">￥{{x.totalPrice}}</p>
              <p class="quantity">
                <span @click.stop="changeQuantity(x,-1)">-</span>
                <input type="text" v-model="x.quantity" />
                <span @click.stop="changeQuantity(x,1)">+</span>
              </p>
            </div>
          </div>
          <div class="del" @click.stop="carDelete(x)">
            <span>{{$t('car.delete')}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="car-ft">
      <div class="ft-box">
        <div class="ft-left">
          <span>
            <i class="iconfont iconcircle" v-if="!isAllCheck" @click="changeIsAllCheck(isAllCheck)"></i>
            <i class="iconfont icongouxuan" v-if="isAllCheck" @click="changeIsAllCheck(isAllCheck)"></i>
          </span>
          <span>{{$t('car.checkAll')}}</span>
        </div>
        <div class="ft-right" v-if="manageStatus==$t('car.curStatus1')">
          <span class="price">
            {{$t('car.total')}}：
            <i>￥</i>
          </span>
          <span class="num">{{totalMoney}}</span>
          <mt-button class="btn" @click="goPay(cartNoList)">
            {{$t('car.settlement')}}
            <span>（{{isCheckNum}}{{$t('car.piece')}}）</span>
          </mt-button>
        </div>
        <div class="ft-right" v-if="manageStatus==$t('car.curStatus2')">
          <mt-button class="btn-del" @click.stop="deleteIsCheck">{{$t('car.delete')}}</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carList: [],
      totalMoney: 0,
      manageStatus: this.$t("car.curStatus1"),
      num: 1
      // check: false
    };
  },
  components: {
    carHeader: () => import("./components/carHeader")
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.carList({}).then(res => {
        this.carList = res.data;
        this.computedTotalMoney();
      });
    },
    //改变管理
    changeManage(status) {
      if (status == this.$t("car.curStatus1")) {
        this.manageStatus = this.$t("car.curStatus2");
      }
      if (status == this.$t("car.curStatus2")) {
        this.manageStatus = this.$t("car.curStatus1");
      }
    },
    //改变选择的状态
    changeCheck(item) {
      this.$set(item, "check", !item.check);
      this.computedTotalMoney();
    },
    //改变全选
    changeIsAllCheck(check) {
      let carList = this.carList;
      carList.forEach((x, index) => {
        this.$set(x, "check", !check);
      });
      this.computedTotalMoney();
    },
    //改变数量
    changeQuantity(item, type) {
      let num = item.quantity;
      if (type > 0) {
        num++;
      } else {
        if (num <= 1) {
          num = 1;
        } else {
          num--;
        }
      }
      //请求接口
      this.$api
        .carValidQuantity({
          cartNo: item.cartNo,
          num
        })
        .then(res => {
          item.quantity = num;
          this.computedTotalMoney();
        });
    },
    //删除购物车
    carDelete(item) {
      this.$api.carDelete([item.cartNo]).then(res => {
        let carList = this.carList;
        this.carList = this.carList.filter(x => x.cartNo == item.cartNo);
        this.computedTotalMoney();
      });
    },
    //多选-删除购物车
    deleteIsCheck() {
      let carList = this.carList;
      let cartNoArr = [];
      carList.forEach((x, index) => {
        if (x.check) {
          cartNoArr.push(x.cartNo);
        }
      });
      if (cartNoArr.length == 0) {
        this.$toast(this.$t("car.toast1"));
        return false;
      }
      this.$api.carDelete(cartNoArr).then(res => {
        this.carList = this.carList.filter(
          x => x.check == false || x.check == null
        );
        this.computedTotalMoney();
      });
    },
    //计算总额
    computedTotalMoney() {
      let totalMoney = 0;
      let carList = this.carList;
      carList.forEach((x, index) => {
        if (x.check) {
          totalMoney += x.quantity * x.totalPrice;
        }
      });
      this.totalMoney = totalMoney;
    },
    //去结算
    goPay(cartNoList) {
      if (cartNoList.length == 0) {
        this.$toast(this.$t("car.toast2"));
        return false;
      }
      this.$router.push("/orderEdit?cartNoList=" + cartNoList);
    }
  },
  computed: {
    //全选
    isAllCheck() {
      let carList = this.carList;
      let isAllCheck = carList.every((x, index) => {
        return x.check == true;
      });
      return isAllCheck;
    },
    isCheckNum() {
      let carList = this.carList;
      let isCheckNum = 0;
      carList.forEach((x, index) => {
        if (x.check) {
          isCheckNum += 1;
        }
      });
      return isCheckNum;
    },
    //被选中的购物车
    cartNoList() {
      let carList = this.carList;
      let cartNoList = [];
      carList.forEach((x, index) => {
        if (x.check) {
          cartNoList.push(x.cartNo);
        }
      });
      return cartNoList;
    }
  }
};
</script>

<style lang="scss" scoped>
.car-top {
  padding: 0 10px;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  text-align: right;
  color: #ff2a00;
}
.car-bd {
  margin-top: 10px;
  .scroll-box {
    overflow-x: scroll;
    .scroll-width {
      width: calc(100% + 80px);
      position: relative;
      height: 123px;
      .img-cell {
        padding: 10px;
        border-bottom: 1px solid #efefef;
        background-color: #fff;
        width: calc(100% - 100px);
        .iconfont {
          font-size: 20px;
          color: #ababab;
          margin-top: 25px;
          margin-right: 10px;
          &.icongouxuan {
            color: #ff2a00;
          }
        }
        .img {
          width: 70px;
          height: 70px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .f-item1 {
          position: relative;
          flex: 1;
          padding-left: 10px;
          p {
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            padding-bottom: 5px;
            &.tip {
              color: #7b7b7b;
              font-size: 12px;
            }
            &.price {
              font-size: 16px;
              color: #ff2a00;
              margin-top: 10px;
            }
            &.quantity {
              overflow: hidden;
              position: absolute;
              bottom: 0;
              right: 0;
              > span,
              > input {
                text-align: center;
                color: #999;
                background-color: #f7f7f7;
                width: 24px;
                height: 24px;
                line-height: 24px;
                display: inline-block;
                outline: none;
                border: none;
                &.disabled {
                  color: #e0e0e0;
                }
              }
              > input {
                position: relative;
                top: -1px;
                color: #333;
                width: 40px;
                height: 25px;
              }
            }
          }
        }
      }
      .del {
        position: absolute;
        right: 0;
        top: 0;
        width: 80px;
        height: 123px;
        background: #ff2a00;
        color: #fff;
        text-align: center;
        > span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
.car-ft {
  height: 50px;
  .ft-box {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    overflow: hidden;
    .ft-left {
      padding: 10px;
      padding-right: 0;
    }
    .ft-right {
      padding: 10px;
    }
    .ft-left {
      float: left;
      text-align: center;
      > span {
        display: inline-block;
        width: 100%;
        > .iconfont {
          font-size: 20px;
          &.icongouxuan {
            color: #ff2a00;
          }
        }
      }
    }
    .ft-right {
      float: right;
      .price {
        font-size: 14px;
        > i {
          font-size: 12px;
          color: #ff2a00;
        }
      }
      .num {
        font-size: 16px;
        color: #ff2a00;
      }
      .btn,
      .btn-del {
        font-size: 14px;
        color: #fff;
        background-color: #ff2a00;
        > span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
