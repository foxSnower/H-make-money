<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="filed-box">
      <div class="filed">
        <mt-field label="新密码" placeholder="请输入您的新密码" type="password" v-model.trim="newPassword"></mt-field>
        <mt-field label="确认密码" placeholder="请重新输入密码" type="password" v-model.trim="newPassword2"></mt-field>
      </div>
      <div class="warn">
        <div class="tit">提示：</div>
        <div class="cont">为了您的账户安全，请您以数字组合字母的形式进行有效修改</div>
      </div>
      <div class="btn">
        <mt-button :disabled="isDisabled" @click.native="next">下一步</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: "",
      newPassword2: ""
    };
  },
  components: {},
  methods: {
    next() {
        let that = this;
      if (this.newPassword != this.newPassword2) {
        this.$toast("两次密码输入不一致！");
        return false;
      }
      this.$api
        .changepwd({
          newPassword: this.newPassword,
          oldPassword: this.$route.query.oldPassword,
          l2Password: this.$route.query.l2Password
        })
        .then(res => {
          if (res.error_code == "0") {
              that.$router.replace("./modifyStatus");
          }
        });
    }
  },
  computed: {
    isDisabled() {
      if (this.newPassword != "" && this.newPassword2 != "") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.filed-box {
  margin-top: 10px;
  // margin: 0 30px;
  .filed {
    background: #262b36;
  }
  .warn {
    margin: 30px 20px;
    .tit {
      font-size: 16px;
    }
    .cont {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
.btn {
  margin-top: 180px;
}
input {
  text-align: left;
}
/deep/ .mint-field {
  padding: 0 15px;
  &:first-child {
    border-bottom: 1px solid #3a3c47;
  }
  .mint-cell-wrapper {
    border-bottom: none;
  }
  .mint-cell-text {
    color: #b1b1b1;
  }
  .mint-cell-value {
    font-size: 14px;
  }
  input {
    text-align: right;
  }
}
</style>
