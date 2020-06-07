<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="cell-box">
      <mt-cell title="头像" is-link @click.native>
        <span class="img">
          <img src="@assets/hot-sell.png" />
        </span>
      </mt-cell>
      <mt-cell title="账号" is-link value="18825719951" @click.native></mt-cell>
      <mt-cell title="电话" value="18825719951"></mt-cell>
      <mt-cell title="微信" value="vxin74123"></mt-cell>
      <mt-cell title="支付宝" value="18825719951"></mt-cell>
      <mt-cell title="银行卡" value="62220244454679734646464"></mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss" scoped>
.cell-box {
  padding: 0 15px;
  background: #262b36;
  /deep/ .mint-cell-value {
    color: #fff;
    .img {
      width: 48px;
      height: 48px;
      padding: 10px 0;
      img {
        border-radius: 48px;
        width: 100%;
        height: 100%;
      }
    }
  }
  /deep/ .mint-cell-value.is-link {
    margin-right: 15px;
  }
  /deep/ .mint-cell-allow-right::after {
    right: 3px;
  }
}
</style>