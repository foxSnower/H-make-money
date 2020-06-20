<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="filed-box">
      <div class="title">卖出</div>
      <div class="filed">
        <div class="f-flex-box">
          <div class="f-flex tit">
            <img src="@assets/wallet-static.png" />静态钱包
          </div>
          <div class="num">￥ {{wallet.staticCoin}}</div>
        </div>
      </div>
      <div class="filed">
        <div class="f-flex-box">
          <div class="f-flex tit">
            <img src="@assets/wallet-trends.png" />动态钱包
          </div>
          <div class="num">￥ {{wallet.dynamicCoin}}</div>
        </div>
      </div>
      <div class="filed" @click="showPicker=true">
        <div class="f-flex-box">
          <div class="f-flex tit">选择</div>
          <div class="num">
            {{curVal}}
            <i class="allow-down"></i>
          </div>
        </div>
      </div>
      <div class="filed">
        <div class="f-flex-box">
          <div class="f-flex tit">卖出金额</div>
          <mt-field
            class="f-filed"
            placeholder="请输入提现金额"
            v-model="amount"
            @focus.native.capture="filterAmount(amount)"
            @blur.native.capture="filterAmount(amount)"
          ></mt-field>
        </div>
      </div>
      <div class="warn">
        <div class="tit">提示：</div>
        <div class="cont">订单金额提交后，将不能取消或修改</div>
      </div>

      <div class="btn f-flex-box">
        <mt-button class="default" @click.native="$router.go(-1)">取消</mt-button>
        <mt-button class="f-flex" :disabled="isDisabled" @click.native="register">立即卖出</mt-button>
      </div>
    </div>
    <transition name="slide-fade">
      <Picker v-if="showPicker" :slots="slots" :curVal.sync="curVal" :showPicker.sync="showPicker"></Picker>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: null,
      wallet: {},
      showPicker: false,
      curVal: null,
      slots: [
        {
          flex: 1,
          values: ["静态钱包", "动态钱包"],
          className: "slot1"
        }
      ]
    };
  },
  components: {
    Picker: () => import("@components/picker")
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      this.$api.userwallet({}).then(res => {
        if (res.error_code == "0") {
          this.wallet = res.data;
        }
      });
    },
    filterAmount(amount) {
      console.log(amount,amount.indexOf("￥"));
      if (amount.indexOf("￥") > -1) {
        this.amount = parseFloat(amount.split("￥")[1]);
      } else {
        this.amount = "￥" + parseFloat(amount);
      }
    },
    buy() {
      this.$api
        .tobuy({
          productId: this.curVal.id
        })
        .then(res => {
          if (res.error_code == "0") {
            this.$router.replace("./buyRecordDetail");
          }
        });
    }
  },
  computed: {
    isDisabled() {
      let curVal = this.curVal;
      if (this.curVal != "" && this.curVal != null) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-block {
  margin: 30px;
  .title {
    font-size: 24px;
  }
  .f-flex-box {
    height: 26px;
    line-height: 26px;
  }
  .filed-box {
    margin-top: 10px;
    // margin: 0 30px;
    .filed {
      position: relative;
      background: #262b36;
      padding: 10px 20px;
      margin: 40px 0;
      border: 2px solid;
      border-image: linear-gradient(to right, #53cef8, #38b1f1) 10 10;
      clip-path: inset(0 round 4px);
      .tit {
        font-size: 20px;
        text-align: left;
        img {
          position: relative;
          top: 2px;
          width: 20px;
          height: 20px;
          padding-right: 10px;
        }
      }
      .num {
        position: relative;
        right: 20px;
        font-size: 18px;
        text-align: right;
        &.unit {
          right: 100px;
        }
        .allow-down::after {
          width: 8px;
          height: 8px;
          transform: translateY(-64%) rotate(135deg);
          right: -20px;
        }
      }
      .f-filed {
        position: absolute;
        width: 100px;
        right: 20px;
        top: 0;
        /deep/ .mint-cell-wrapper {
          border-bottom: none;
          input {
            color: #fc5c50;
            text-align: right;
          }
        }
      }
    }
    .warn {
      margin: 30px 0;
      .tit {
        font-size: 16px;
      }
      .cont {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }
}

.btn {
  margin-top: 50px;
  .default {
    /deep/ &.mint-button {
      background: transparent;
      width: 120px;
      margin-right: 10px;
      .mint-button-text {
        color: #2997fe;
      }
    }
    /deep/ &.mint-button--default {
      box-shadow: 0 0 1px #2997fe;
    }
  }
}
</style>
