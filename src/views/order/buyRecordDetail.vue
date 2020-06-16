<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="cell-box">
      <mt-cell title="买入玩家" value="陈明"></mt-cell>
      <mt-cell title="手机号" value="13713111203"></mt-cell>
      <mt-cell title="推荐人" value="王喜"></mt-cell>
      <mt-cell title="推荐人电话" value="18688912345"></mt-cell>
    </div>
    <div class="cell-box">
      <mt-cell title="卖出玩家" value="陈林"></mt-cell>
      <mt-cell title="手机号" value="15699899999"></mt-cell>
      <mt-cell title="推荐人" value="王喜"></mt-cell>
      <mt-cell title="推荐人电话" value="18688912345"></mt-cell>
      <mt-cell title="微信" value="18688912345"></mt-cell>
      <mt-cell title="支付宝" value="18688912345"></mt-cell>
      <mt-cell title="真实姓名" value="陈林"></mt-cell>
      <mt-cell title="银行账号" value="62909988777777777"></mt-cell>
      <mt-cell title="银行地址" value="东莞工行"></mt-cell>
    </div>
    <div class="btn">
      <mt-button @click.native>确认买入</mt-button>
    </div>
    <noneImg v-if="false"></noneImg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderDetail: null
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
        .buyorderdetail({
          parentId: "cd5c38ba-e8d9-4243-bc8b-440d9c912bcb"
        })
        .then(res => {
          if (res.error_code == "0") {
            this.orderDetail = res.data;
          }
        });
    }
  }
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