<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="title">翰林苑注册</div>
    <div class="filed" @keyup.enter="login">
      <div class="label">昵称</div>
      <mt-field placeholder="请输入在翰林苑中您的代称" v-model.trim="name"></mt-field>
      <div class="label">手机号</div>
      <mt-field type="tel" placeholder="此为您的登录账号" v-model.trim="mobile"></mt-field>
      <div class="label">密码</div>
      <mt-field type="password" placeholder="请输入后牢记该密码" v-model.trim="password"></mt-field>
      <div class="label">确认密码</div>
      <mt-field type="password" placeholder="请重新输入密码" v-model.trim="password2"></mt-field>
      <div class="label">二级密码</div>
      <mt-field type="password" placeholder="用于修改密码与出售" v-model.trim="l2password"></mt-field>
      <div class="label">提醒电话</div>
      <mt-field type="tel" placeholder="此为接收交易短信提醒的手机号码，可重复" v-model.trim="notifyPhone"></mt-field>
      <div class="label">微信账号</div>
      <mt-field placeholder="请输入微信账号" v-model.trim="wechat"></mt-field>
      <div class="label">支付宝账号</div>
      <mt-field placeholder="请输入支付宝账号" v-model.trim="alipay"></mt-field>
      <div class="label">银行卡账号</div>
      <mt-field type="number" placeholder="请输入银行卡账号" v-model.trim="bankCardNo"></mt-field>
      <div class="label">银行卡地址</div>
      <mt-field placeholder="请输入银行卡地址" v-model.trim="bankName"></mt-field>
      <div class="label">真实姓名</div>
      <mt-field placeholder="请输入真实姓名" v-model.trim="realName"></mt-field>
      <div class="label">邀请码（推荐码）</div>
      <mt-field placeholder="请输入推荐人提供给您的邀请码" v-model.trim="beInviteCode"></mt-field>
    </div>
    <div class="btn f-flex-box">
      <mt-button class="default" @click.native="reset">重置</mt-button>
      <mt-button class="f-flex" :disabled="isDisabled" @click.native="register">注册</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   isDisabled: true,
      password2: "",
      name: "",
      mobile: "",
      password: "",
      l2password: "",
      notifyPhone: "",
      wechat: "",
      alipay: "",
      bankName: "",
      bankCardNo: "",
      realName: "",
      beInviteCode: ""
    };
  },
  components: {},
  methods: {
    reset() {
      this.$messagebox
        .confirm("", "确定要重置吗？")
        .then(action => {
          if (action === "confirm") {
            this.name = "";
            this.mobile = "";
            this.password = "";
            this.l2password = "";
            this.notifyPhone = "";
            this.wechat = "";
            this.alipay = "";
            this.bankName = "";
            this.bankCardNo = "";
            this.realName = "";
            this.beInviteCode = "";
          }
        })
        .catch(err => {});
    },
    register() {
      let that = this;
      if (this.password2 !== this.password) {
        this.$toast("两次密码输入不一致！");
        return false;
      }
      this.$api
        .register({
          name: this.name,
          mobile: this.mobile,
          password: this.password,
          l2password: this.l2password,
          notifyPhone: this.notifyPhone,
          wechat: this.wechat,
          alipay: this.alipay,
          bankName: this.bankName,
          bankCardNo: this.bankCardNo,
          realName: this.realName,
          beInviteCode: this.beInviteCode
        })
        .then(res => {
          if (res.error_code == "0") {
            this.$toast("恭喜注册成功，马上登录吧~");
            setTimeout(function() {
              that.$router.push("./login");
            }, 1000);
          }
        });
    }
  },
  computed: {
    isDisabled() {
      if (
        this.name != "" &&
        this.mobile != "" &&
        this.password != "" &&
        this.l2password != "" &&
        this.notifyPhone != "" &&
        this.wechat != "" &&
        this.alipay != "" &&
        this.bankName != "" &&
        this.bankCardNo != "" &&
        this.realName != "" &&
        this.beInviteCode != ""
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: 40px auto;
  font-size: 26px;
  text-align: center;
}
.filed {
  margin: 0 40px;
  .label {
    font-size: 18px;
    color: #b1b1b1;
    margin-top: 10px;
  }
  /deep/ .mint-cell-value {
    font-size: 14px;
  }
}

.btn {
  margin: 40px 20px;
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
