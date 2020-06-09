<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="cell-box">
      <mt-cell title="参与者：" value="18970534540"></mt-cell>
      <mt-cell class="noline" title="申请编号：" value="B11181030"></mt-cell>
      <mt-cell class="noline" title="日期：" value="2020-05-22 15:00:23"></mt-cell>
      <mt-cell class="noline" title="已配：" value="1000.00元"></mt-cell>
      <mt-cell class="yellow" title="匹配状态：" value="等待中"></mt-cell>
      <mt-cell class="noline total" title="总额" value="￥1000.00"></mt-cell>
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
  components: {
    noneImg: () => import("@components/noneImg")
  }
};
</script>

<style lang="scss" scoped>
.cell-box {
  background: linear-gradient(to right, #303645, #292f3c);
  margin: 15px;
  border-radius: 4px;
  /deep/ .mint-cell {
    margin: 0 10px;
    &.noline{
        min-height:30px;
    }
  }
  /deep/ .mint-cell-title {
    flex: none;
    padding-right: 10px;
    color: #cacaca;
    // width: 110px;
  }
  /deep/ .mint-cell-wrapper {
    margin: 0;
  }
  /deep/ .mint-cell-value {
    color: #fff;
  }
  .total /deep/ .mint-cell-title {
    flex: 1;
    color: #fff;
  }
  .total /deep/ .mint-cell-value {
    color: #2997fe;
    font-size: 20px;
  }
  .yellow /deep/ .mint-cell-value {
    color: #fc5c50;
  }
  .noline /deep/ .mint-cell-wrapper {
    border-bottom: none;
  }
}
.btn {
  margin: 30px 50px;
}
</style>