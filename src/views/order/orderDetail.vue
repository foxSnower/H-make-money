<template>
  <!-- 前端请求传的参数 1(待付款)   return <0(待付款)>   
                           2(待消费)   return<1(待消费)>
                           3(已完成)   return<2(已完成),3(已完成)>
  4(《售后/其他》  注明:替换掉原先的《已取消》) retrun<4(已关闭)，5(无效订单),6(已退款),7(退款中)，8（付款中）>-->
  <div>
    <Header :addName="orderDetail.orderSn"></Header>
    <div class="detail-hd">
      <i class="iconfont icongouxuan"></i>
      <div class="tit" v-if="orderDetail.status==0">{{ $t('orderDetail.status0')}}</div>
      <div class="tit" v-if="orderDetail.status==1">{{ $t('orderDetail.status1')}}</div>
      <div class="tit" v-if="orderDetail.status==2">{{ $t('orderDetail.status2')}}</div>
      <div class="tit" v-if="orderDetail.status==3">{{ $t('orderDetail.status3')}}</div>
      <div class="tit" v-if="orderDetail.status==4">{{ $t('orderDetail.status4')}}</div>
      <div class="tit" v-if="orderDetail.status==5">{{ $t('orderDetail.status5')}}</div>
      <div class="tit" v-if="orderDetail.status==6">{{ $t('orderDetail.status6')}}</div>
      <div class="tit" v-if="orderDetail.status==7">{{ $t('orderDetail.status7')}}</div>
      <div class="tit" v-if="orderDetail.status==8">{{ $t('orderDetail.status8')}}</div>
      <div class="sub-tit" v-if="$route.query.type=='长期租'">{{ $t('orderDetail.longExplain')}}</div>
      <div class="price">
        <p>
          <span class="f-left">
            {{$route.query.type=='长期租'?$t('orderDetail.offlinePayment'):$t('orderDetail.totalAmount')}}
            <i class="num">￥{{orderDetail.payAmount}}</i>
          </span>
          <span class="f-right">
            <i>{{ $t('orderDetail.price')}}：￥{{orderDetail.payAmount-orderDetail.cashpledge}}</i>
            <i>{{ $t('orderDetail.deposit')}}：￥{{orderDetail.cashpledge}}</i>
          </span>
        </p>
      </div>
    </div>
    <orderBack></orderBack>
    <div class="bd-box" v-for="(x,index) in orderDetail.omsOrderItem" :key="index">
      <div class="f-flex img-cell">
        <div class="img">
          <img :src="x.pic" />
        </div>
        <div class="f-item1">
          <p>{{x.productName}}</p>
          <p class="tip">{{x.subTitle}}</p>
        </div>
      </div>
      <div class="detail">
        <p class="cont border-t">
          <span class="hd">{{ $t('orderDetail.date')}}</span>
          <span class="bd">{{x.saleTime|filterToDay}} {{ $t('orderDetail.to')}} {{x.saleTimeEnd|filterToDay}}</span>
        </p>
        <p class="cont">
          <span class="hd">{{ $t('orderDetail.checkInTime')}}</span>
          <span class="bd">{{ $t('orderDetail.checkInTimeExplain')}}</span>
        </p>
        <p class="cont">
          <span class="hd">{{ $t('orderDetail.checkOutTime')}}</span>
          <span class="bd">{{ $t('orderDetail.checkOutTimeExplain')}}</span>
        </p>
      </div>
    </div>
    <div class="detail">
      <p class="cont">
        <span class="hd">{{ $t('orderDetail.receptionTime')}}</span>
        <span class="bd">00:00-24:00</span>
      </p>
      <p class="cont" v-for="(x,index) in orderDetail.umsMemberReceiveList" :key="index">
        <span class="hd">{{ $t('orderDetail.residents')}} {{index+1}}</span>
        <span class="bd">{{x.name}} {{x.phoneNumber}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderDetail: {}
    };
  },
  components: {
    Header: () => import("@components/layout/Header"),
    orderBack: () => import("./components/orderBack"),
    orderShow: () => import("./components/orderShow"),
    orderDetailInfo: () => import("./components/orderDetailInfo")
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api
        .getOrderDetail({
          orderId: this.$route.query.orderId
        })
        .then(res => {
          this.orderDetail = res.data;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-hd {
  background-color: #fff;
  position: relative;
  padding: 20px 0;
  .iconfont {
    position: absolute;
    left: 20px;
    top: 20px;
  }
  .iconfont,
  .tit {
    font-size: 20px;
    color: #ff2a00;
  }
  .tit,
  .sub-tit {
    padding-left: 50px;
    color: #ff2a00;
  }
  .price {
    margin: 10px 20px;
    padding: 10px 0;
    padding-left: 30px;
    border-top: 1px solid #d9d9d9;
    > p {
      overflow: hidden;
    }
    .f-left {
      float: left;
    }
    .f-right {
      float: right;
      font-size: 12px;
      color: #7b7b7b;
      > i {
        display: block;
      }
    }
    .num {
      color: #ff2a00;
    }
  }
}
.bd-box {
  border: 1px solid #d9d9d9;
  margin: 10px;
}
.img-cell {
  padding: 10px;
  border-top: 1px solid #efefef;
  background-color: #fff;
  .img {
    width: 90px;
    height: 90px;
    border-radius: 5px;
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
      &.tip {
        color: #7b7b7b;
        font-size: 12px;
        position: absolute;
        bottom: 3px;
      }
    }
  }
}

.detail {
  background-color: #fff;
  .cont {
    display: flex;
    line-height: 1.2;
    padding: 15px 0;
    margin: 0 20px;
    overflow: hidden;
    .hd {
      min-width: 70px;
      text-align: right;
      padding-right: 10px;
      color: #7b7b7b;
    }
    .bd {
      flex: 1;
      text-align: justify;
    }
    &.border-t {
      border-top: 1px solid #d9d9d9;
    }
  }
}
</style>
