<template>
  <div>
    <Header></Header>
    <div style="height:50px;">
      <mt-navbar v-model="status">
        <mt-tab-item :id="0" disabled>{{ $t('orderForMe.whole')}}</mt-tab-item>
        <mt-tab-item :id="1">{{ $t('orderForMe.paymentToBeMade')}}</mt-tab-item>
        <mt-tab-item :id="2">{{ $t('orderForMe.toBeConsumed')}}</mt-tab-item>
        <mt-tab-item :id="3">{{ $t('orderForMe.completed')}}</mt-tab-item>
        <mt-tab-item :id="4">{{ $t('orderForMe.other')}}</mt-tab-item>
      </mt-navbar>
    </div>
    <orderFoMeShow :orderList="orderList"></orderFoMeShow>
    <div class="more" v-if="orderList.length!=0">
      <span @click="loadingMore()">{{loadingText}}</span>
      <mt-spinner v-if="loading" :size="12" type="fading-circle"></mt-spinner>
    </div>
    <Footer :curPage="$t('link')[$route.meta.title]"></Footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      // selected: 0,
      loading: false,
      loadingText: this.$t("orderForMe.clickMore"),
      pageNum: 1,
      pageSize: 10,
      status: 0,
      orderList: []
    };
  },
  components: {
    Header: () => import("@components/layout/Header"),
    Footer: () => import("@components/layout/footer"),
    orderFoMeShow: () => import("./components/orderFoMeShow")
  },
  watch: {
    status(cur) {
      //还原数据
      this.resetData();
      //存贮当前状态
      this.$store.commit("orderStatus", this.status);
      //获取数据
      this.getData();
    }
  },
  mounted() {
    //还原数据
    this.resetData();
    //获取数据
    this.getData();
  },
  methods: {
    //还原数据
    resetData() {
      this.orderList = [];
      this.pageNum = 1;
      this.pageSize = 10;
      this.loading = false;
      this.loadingText = this.$t("orderForMe.clickMore");
    },
    getData() {
      /**
       * 前端请求传的参数 1(待付款)   return <0(待付款)>
       *                 2(待消费)   return<1(待消费)>
       *                 3(已完成)   return<2(已完成),3(已完成)>
       *                 4(《售后/其他》  注明:替换掉原先的《已取消》) retrun<4(已关闭)，5(无效订单),6(已退款),7(退款中)，8（付款中）>
       */
      this.$api
        .getOrderList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          memberId: 1,
          status: this.orderStatus
        })
        .then(res => {
          this.loading = false;
          if (res.data.list.length == 0) {
            this.loadingText = this.$t("orderForMe.noMore");
          } else {
            this.orderList = this.orderList.concat(res.data.list);
            console.log("2", this.orderList);
            this.loadingText = this.$t("orderForMe.clickMore");
          }
        });
    },
    loadingMore() {
      if (this.loadingText == this.$t("orderForMe.noMore")) {
        return false;
      } else {
        this.loading = true;
        this.loadingText = this.$t("orderForMe.loading");
        this.pageNum += 1;
        this.getData();
      }
    }
  },
  computed: {
    ...mapGetters(["orderStatus"])
  }
};
</script>

<style lang="scss" scoped>
.mint-navbar {
  position: fixed;
  width: 100%;
  z-index: 10;
  /deep/ .mint-tab-item.is-selected {
    border-bottom: 3px solid #ff2a00;
    color: #ff2a00;
    margin-bottom: -1px;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
  /deep/ .mint-tab-item-label {
    font-size: 14px;
  }
}
.more {
  padding: 20px;
  font-size: 12px;
  columns: #b7b7b7;
  text-align: center;
  span {
    position: relative;
  }
  /deep/ .mint-spinner-fading-circle {
    position: absolute;
    right: -20px;
    top: 3px;
  }
}
</style>
