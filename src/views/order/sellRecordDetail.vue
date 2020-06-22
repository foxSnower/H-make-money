<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- <div class="cell-box">
      <mt-cell title="买入玩家" value="陈明"></mt-cell>
      <mt-cell title="手机号" value="13713111203"></mt-cell>
      <mt-cell title="推荐人" value="王喜"></mt-cell>
      <mt-cell title="推荐人电话" value="18688912345"></mt-cell>
    </div>-->
    <template v-if="orderList.length!=0">
      <div class="cell-box" v-for="x in orderList" :key="x.id">
        <mt-cell title="买入玩家" :value="x.bname"></mt-cell>
        <mt-cell title="手机号" :value="x.bmobile"></mt-cell>
        <mt-cell title="推荐人" :value="x.invitename"></mt-cell>
        <mt-cell title="推荐人电话" :value="x.invitemobile"></mt-cell>
        <mt-cell title="微信" :value="x.bwechat"></mt-cell>
        <mt-cell title="支付宝" :value="x.bailipay"></mt-cell>
        <mt-cell title="真实姓名" :value="x.brealName"></mt-cell>
        <mt-cell title="银行账号" :value="x.bbankCardNo"></mt-cell>
        <mt-cell title="银行地址" :value="x.bbankName"></mt-cell>
        <mt-cell title="成交金额" :value="x.amount"></mt-cell>
        <mt-cell title="成交时间" :value="x.sellDateStr"></mt-cell>
        <div class="btn" v-if="showBtn(x.status)">
          <mt-button @click.native="sureSell(x.id)">确认收款</mt-button>
        </div>
      </div>
    </template>
    <noneImg v-else></noneImg>
  </div>
</template>

<script>

export default {
  data() {
    return {
      orderList: []
    };
  },
  components: {
    noneImg: () => import("@components/noneImg")
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api
        .sellorderdetail({
          parentId: this.$route.query.parentId
        })
        .then(res => {
          if (res.error_code == "0") {
            this.orderList = res.data;
          }
        });
    },
    sureSell(id) {
       this.$api
        .tosellordersure({
          detailId: id
        })
        .then(res => {
          if (res.error_code == "0") {
            this.$toast('成功收款！~');
            this.getData();
          }
        });
    },
    showBtn(status) {
      if(status==1) return true
      else return false
    }
  },
};
</script>

<style lang="scss" scoped>
.cell-box {
  background: linear-gradient(to right, #303645, #292f3c);
  margin: 15px;
  border-radius: 4px;
  /deep/ .mint-cell {
    &:last-child {
      padding-bottom: 20px;
    }
    margin: 0 10px;
  }
  /deep/ .mint-cell-title {
    flex: none;
    width: 110px;
  }
  /deep/ .mint-cell-wrapper {
    margin: 0;
  }
}
.btn {
  margin: 30px 50px;
}
</style>