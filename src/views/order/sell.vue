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
          <div class="num">￥ {{wallet.availableStaticCoin}}</div>
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
            :type="inputType"
            @focus.native.capture="focusAmount(amount);inputType='number';"
            @blur.native.capture="blurAmount(amount);inputType='text';"
          ></mt-field>
        </div>
      </div>
      <div class="warn">
        <div class="tit">提示：</div>
        <div class="cont">订单金额提交后，将不能取消或修改</div>
      </div>

      <div class="btn f-flex-box">
        <mt-button class="default" @click.native="$router.go(-1)">取消</mt-button>
        <mt-button class="f-flex" :disabled="isDisabled" @click.native="showPassword=true">立即卖出</mt-button>
      </div>
    </div>
    <transition name="slide-fade">
      <Picker v-if="showPicker" :slots="slots" :curVal.sync="curVal" :showPicker.sync="showPicker"></Picker>
    </transition>
    <transition name="slide-fade">
      <div class="pass" v-if="showPassword">
        <mt-field label="二级密码" placeholder="请输入您的二级密码" type="password" v-model.trim="l2Password"></mt-field>
        <div class="btn f-flex-box">
          <mt-button class="default" @click.native="showPassword=false">取消</mt-button>
          <mt-button class="f-flex" :disabled="isDisabledPass" @click.native="sell">确定</mt-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: "",
      inputType: "text",
      wallet: {},
      showPicker: false,
      showPassword: false,
      curVal: null,
      l2Password: "",
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
    //失去焦点
    blurAmount(amount) {
      if (amount == "") {
        this.amount = "";
      } else {
        this.amount = "￥" + parseFloat(amount);
      }
    },
    //获取焦点
    focusAmount(amount) {
      if (amount == "") {
        this.amount = "";
      } else {
        this.amount = this.amount.split("￥")[1];
      }
    },
    sell() {
      this.$api
        .tosell({
          type: this.curVal == "静态钱包" ? 1 : 2,
          amount: parseFloat(this.amount.split("￥")[1]),
          l2Password:this.l2Password
        })
        .then(res => {
          this.showPassword = false;
          if (res.error_code == "0") {
            this.$router.replace("./sellRecord");
          }
        });
    }
  },
  computed: {
    isDisabled() {
      let curVal = this.curVal;
      if (
        this.curVal != "" &&
        this.curVal != null &&
        this.amount != "" &&
        parseFloat(this.amount.split("￥")[1]) != 0
      ) {
        return false;
      } else {
        return true;
      }
    },
    isDisabledPass(){
       if (this.l2Password != "") {
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

.pass {
  height: 180px;
  position: fixed;
  /* width: 100%; */
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5%;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#303645),
    to(#2b313f)
  );
  background: linear-gradient(#303645, #2b313f);
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
