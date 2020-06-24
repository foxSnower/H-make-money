<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="qr-box">
      <img class="logo-img" src="@assets/logo.png" />
      <img class="qr-box-img" src="@assets/qr-code.png" />
      <div class="qr-code" ref="qrCodeUrl"></div>
      <div class="text">邀请好友，一起分享吧~</div>
      <div class="btn">
        <mt-button @click.native="doCopy">
          <img src="@assets/share.png" height="20" width="20" slot="icon" />
          邀请好友
        </mt-button>
      </div>
    </div>

    <Footer curPage="二维码"></Footer>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  name:'qrcode',
  data() {
    return {
      qrUrl: ""
    };
  },
  components: {
    Footer: () => import("@components/layout/footer")
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.selfinfo({}).then(res => {
        if (res.error_code == "0") {
          this.qrUrl = window.location.origin + "/#/register?invitecode=" + res.data.inviteCode;
          this.creatQrCode(this.qrUrl);
        }
      });
    },
    creatQrCode(qrUrl) {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: qrUrl, // 需要转换为二维码的内容
        width: 140,
        height: 140,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    },
    //复制url
    doCopy() {
      let that = this;
      this.$copyText(this.qrUrl).then(
        e => {
          that.$toast("复制成功,快发送给朋友吧~");
        },
        err => {
          that.$toast("复制失败~");
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.qr-box {
  position: relative;
  width: 300px;
  margin: 0 auto;
  margin-top: 15%;
  .logo-img {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    /* text-align: center; */
    top: -40px;
    left: 50%;
    margin-left: -40px;
  }
  .qr-box-img {
    width: 100%;
    height: 100%;
  }
  .qr-code {
    position: absolute;
    width: 55%;
    height: 35%;
    top: 24%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 1;
    /deep/ img {
      margin: 13px;
    }
  }
  .text {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 62%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .btn {
    position: absolute;
    width: 60%;
    bottom: 7%;
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
