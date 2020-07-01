<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="banner">
      <img src="@assets/wallet-income.png" />
      <div class="text">
        <p class="tit">总收入</p>
        <p class="num">￥{{data.totalBuyOrderAmount}}</p>
      </div>
    </div>
    <div class="f-flex-box">
      <div class="f-flex">
        <div>
          <img src="@assets/wallet-order.png" />
          <p class="tit">购单总额</p>
          <p class="num">￥{{data.totalBuyOrderAmount}}</p>
        </div>
      </div>
      <div class="f-flex">
        <div>
          <img src="@assets/wallet-cash.png" />
          <p class="tit">提现金额</p>
          <p class="num">￥{{data.withDrawAmount}}</p>
        </div>
      </div>
    </div>
    <div class="f-flex-box">
      <div class="f-flex">
        <div>
          <img src="@assets/wallet-trends.png" />
          <p class="tit">动态金额</p>
          <p class="num">￥{{data.dynamicCoin}}</p>
        </div>
      </div>
      <div class="f-flex">
        <div>
          <img src="@assets/wallet-static.png" />
          <p class="tit">静态金额</p>
          <p class="num">￥{{data.staticCoin}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  components: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.userwallet({}).then(res => {
        this.data = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.m-block {
  margin: 0 15px;
}
.banner {
  margin: 10px 0;
  height: 120px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .text {
    width: 100%;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    .tit {
      font-size: 14px;
    }
    .num {
      font-size: 28px;
    }
  }
}

.f-flex {
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  background: linear-gradient(to left, #282e3a, #313746);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  img {
    width: 36px;
    height: 36px;
  }
  .tit {
    font-size: 14px;
    margin-top: 15px;
  }
  .num {
    font-size: 20px;
    margin-top: 15px;
  }
}
</style>