<template>
  <!-- 前端请求传的参数 1(待付款)   return <0(待付款)>   
                           2(待消费)   return<1(待消费)>
                           3(已完成)   return<2(已完成),3(已完成)>
  4(《售后/其他》  注明:替换掉原先的《已取消》) retrun<4(已关闭)，5(无效订单),6(已退款),7(退款中)，8（付款中）>-->
  <div>
    <div
      class="order-box"
      v-for="(x,idX) in orderList"
      :key="idX"
      @click="$router.push('/orderDetail?orderId='+x.orderId)"
    >
      <div class="order-hd">
        <span class="hd-left">{{ $t('orderForMe.orderNumber')}}：{{x.orderSn}}</span>
        <span class="hd-right" v-if="x.status==0">{{ $t('orderForMe.status0')}}</span>
        <span class="hd-right" v-if="x.status==1">{{ $t('orderForMe.status1')}}</span>
        <span class="hd-right" v-if="x.status==2">{{ $t('orderForMe.status2')}}</span>
        <span class="hd-right" v-if="x.status==3">{{ $t('orderForMe.status3')}}</span>
        <span class="hd-right" v-if="x.status==4">{{ $t('orderForMe.status4')}}</span>
        <span class="hd-right" v-if="x.status==5">{{ $t('orderForMe.status5')}}</span>
        <span class="hd-right" v-if="x.status==6">{{ $t('orderForMe.status6')}}</span>
        <span class="hd-right" v-if="x.status==7">{{ $t('orderForMe.status7')}}</span>
        <span class="hd-right" v-if="x.status==8">{{ $t('orderForMe.status8')}}</span>
      </div>
      <div class="f-flex img-cell" v-for="(y,idY) in x.omsOrderItem" :key="idY">
        <div class="img">
          <img :src="y.pic" />
        </div>
        <div class="f-item1">
          <p>{{y.productName}}</p>
          <p class="tip">{{y.subTitle}}</p>
          <p class="tip">{{ $t('orderForMe.date')}}：{{y.saleTime|filterToDay}} {{ $t('orderForMe.to')}} {{y.saleTimeEnd|filterToDay}}</p>
          <p class="price">￥{{y.productPrice}}</p>
          <p class="total">×{{y.productQuantity}}</p>
        </div>
      </div>
      <div class="order-ft">
        <span class="ft-left">
          <i v-if="x.status==4||x.status==5||x.status==6||x.status==7||x.status==8">{{ $t('orderForMe.amountPayable')}}：</i>
          <i v-if="x.status==0||x.status==1||x.status==2||x.status==3">{{ $t('orderForMe.amountPaid')}}：</i>
          <i class="price">￥{{x.payAmount}}</i>
        </span>
        <span class="ft-right">
          <mt-button
            class="btn-cancel"
            v-if="x.status==0||x.status==1"
            @click.stop="orderDelete(x.orderId)"
          >{{ $t('orderForMe.cancelOrder')}}</mt-button>
          <mt-button
            class="btn-normal"
            v-if="x.status==2||x.status==3"
            @click.stop="$router.push('/orderComment?productSn='+x.productSn+'&orderSn='+x.orderSn)"
          >{{x.isComment==1?$t('orderForMe.review'):$t('orderForMe.evaluate')}}</mt-button>
          <mt-button class="btn-normal" v-if="x.status==0">{{ $t('orderForMe.immediatePayment')}}</mt-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderList: Array
  },
  methods: {
    orderDelete(orderId) {
      this.$messagebox.confirm("确定要取消该单吗").then(action => {
        if (action == "confirm") {
          this.$api
            .orderDelete({
              orderId
            })
            .then(res => {
              this.$toast({
                message: "操作成功",
                iconClass: "icon icon-success"
              });
            });
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.order-box {
  background-color: #fff;
  & + .order-box {
    margin-top: 10px;
  }
  .order-hd {
    padding: 10px;
    font-size: 12px;
    overflow: hidden;
    .hd-left {
      float: left;
    }
    .hd-right {
      float: right;
      color: #ff2a00;
    }
  }
  .img-cell {
    padding: 10px;
    border-bottom: 1px solid #efefef;
    background-color: #fff;
    .img {
      width: 60px;
      height: 60px;
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
          margin-top: 10px;
        }
        &.total {
          position: absolute;
          bottom: 0px;
          right: 0px;
          top: 30px;
        }
      }
    }
  }
  .order-ft {
    padding: 10px;
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    .ft-left {
      float: left;
      .price {
        color: #ff2a00;
      }
    }
    .ft-right {
      float: right;
      .btn-cancel {
        font-size: 12px;
        height: 30px;
        color: #333;
        background-color: transparent;
        border: 1px solid #333;
        padding: 0 10px;
      }
      .btn-normal {
        font-size: 12px;
        height: 30px;
        color: #ff2a00;
        background-color: transparent;
        border: 1px solid #ff2a00;
        padding: 0 10px;
      }
    }
  }
}
</style>

