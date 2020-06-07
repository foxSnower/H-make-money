<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="my-hd" @click="$router.push('/myInfo')">
      <img src="@assets/hot-sell.png" />
      <p class="hd-title">18825719951</p>
      <p class="hd-subtitle">微信号:vxin74123</p>
      <i class="allow-right"></i>
    </div>
    <div class="cell-box">
      <mt-cell title="钱包" is-link @click.native="$router.push('/myWallet')">
        <img slot="icon" src="@assets/wallet.png" width="24" height="24" />
      </mt-cell>
    </div>
    <div class="cell-box">
      <mt-cell title="奖金明细" is-link @click.native="$router.push('/myBonusDetail')">
        <img slot="icon" src="@assets/bonus.png" width="24" height="24" />
      </mt-cell>
      <mt-cell title="学点转让" is-link @click.native="$router.push('/myGoldTransfer')">
        <img slot="icon" src="@assets/gold-transfer.png" width="24" height="24" />
      </mt-cell>
      <mt-cell title="直推体系" is-link @click.native="$router.push('/myPushSystem')">
        <img slot="icon" src="@assets/push-system.png" width="24" height="24" />
      </mt-cell>
    </div>
    <div class="cell-box">
      <mt-cell title="修改密码" is-link @click.native="$router.push('/modifyPassword')">
        <img slot="icon" src="@assets/modify-password.png" width="24" height="24" />
      </mt-cell>
    </div>
    <div class="btn">
      <mt-button @click.native>退出登录</mt-button>
    </div>
    <Footer curPage="我的"></Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      memberInfo: {}
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
      // this.$api.memberInfo({}).then(res => {
      //   this.memberInfo = res.data;
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.my-hd {
  position: relative;
  width: 100%;
  height: 120px;
  line-height: 1.8;
  background-size: 100% 100%;
  background: #262b36;
  img {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    top: 50%;
    margin-top: -25px;
    left: 20px;
    border: 2px solid #fff;
  }
  .hd-title,
  .hd-subtitle {
    padding-left: 100px;
  }
  .hd-title {
    padding-top: 35px;
    color: #fff;
    font-size: 18px;
  }
  .hd-subtitle {
    color: #cacaca;
    font-size: 14px;
    .iconfont {
      padding-right: 5px;
    }
  }
  .allow-right::after {
    border-color: #fff;
    top: 65%;
  }
}
.cell-box {
  margin-top: 20px;
  background: #262b36;
  /deep/ .mint-cell {
    & + .mint-cell {
      overflow: visible;
      &:before {
        content: "";
        position: absolute;
        left: 45px;
        width: 100%;
        height: 1px;
        border-top: 1px solid #3a3c47;
      }
    }
    .mint-cell-wrapper {
      border-bottom: none;
      .mint-cell-title {
        padding-left: 15px;
      }
    }
  }
}
.btn {
  margin-top: 50px;
  /deep/ .mint-button {
    background: transparent;

    .mint-button-text {
      color: #3bb5f2;
    }
  }
  /deep/ .mint-button--default {
    box-shadow: 0 0 1px #3bb5f2;
  }
}
</style>
