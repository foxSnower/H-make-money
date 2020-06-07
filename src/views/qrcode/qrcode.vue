<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="qr-box">
      <img class="qr-box-img" src="@assets/qr-code.png" />
      <img class="qr-code" src="@assets/buy.png" />
      <div class="text">邀请好友，一起分享吧～</div>
      <div class="btn">
        <mt-button @click.native="login">
          <img src="@assets/share.png" height="20" width="20" slot="icon" />
          邀请好友
        </mt-button>
      </div>
    </div>

    <Footer curPage="二维码"></Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    Footer: () => import("@components/layout/footer")
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.qr-box {
  width: 80%;
  margin: 0 10%;
  margin-top: 40px;
  .qr-box-img {
    width: 100%;
    height: 100%;
  }
  .qr-code {
    position: absolute;
    width: 50%;
    height: 29%;
    top: 30%;
    left: 25%;
  }
  .text {
    position: absolute;
    top: 61%;
    left: 50%;
    transform: translateX(-50%);
  }
  .btn {
    position: absolute;
    width: 60%;
    top: 73%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    /deep/ .mint-button {
      height: 40px;
    }
    /deep/ .mint-button-icon img {
      position: relative;
      top: 2px;
    }
  }
}
</style>
