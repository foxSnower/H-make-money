<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="cell-box">
      <mt-cell class="hd" title="收益来自：一级收益"></mt-cell>
      <mt-cell class="income" title="动态收益" value="20"></mt-cell>
      <mt-cell title="奖金类型" value="推广"></mt-cell>
      <mt-cell title="时间" value="2020-05-27 18：00"></mt-cell>
    </div>
    <div class="cell-box">
      <mt-cell class="hd" title="收益来自：一级收益"></mt-cell>
      <mt-cell class="income" title="动态收益" value="20"></mt-cell>
      <mt-cell title="奖金类型" value="推广"></mt-cell>
      <mt-cell title="时间" value="2020-05-27 18：00"></mt-cell>
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
  /deep/ .mint-cell-value {
    color: #fff;
  }
  /deep/ .mint-cell-wrapper {
    padding: 0 10px;
  }
  .income /deep/ .mint-cell-value {
    color: #2997fe;
  }
  .hd {
    /deep/ .mint-cell-text {
      font-size: 18px;
    }
  }
}

.none {
  position: fixed;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 150px;
  }
  p {
    color: #cbcbcb;
    margin-top: 20px;
  }
}
</style>