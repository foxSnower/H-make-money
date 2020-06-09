<template>
  <div class="login">
    <div class="img">
      <!-- <img src="@assets/sell-record.png" alt /> -->
    </div>
    <div class="login-box">
      <div class="filed" @keyup.enter="login">
        <mt-field placeholder="用户名/邮箱/手机号" v-model.trim="mobilePhone"></mt-field>
        <mt-field placeholder="请输入密码" type="password" v-model.trim="password">
          <span class="iconfont icondizhi"></span>
          <span class="f-password">忘记密码</span>
        </mt-field>
        <mt-field placeholder="请输入验证码" v-model="validCode">
          <img :src="validCodeImg" alt="图片加载失败" height="37px" width="100px" @click="changeImg" />
        </mt-field>
      </div>
      <div class="btn">
        <mt-button :disabled="isDisabled" @click.native="login">登录</mt-button>
      </div>
      <div class="b-text" @click="$router.push('./register')">新用户注册</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      mobilePhone: "",
      validCode: "",

      validCodeImg: ""
    };
  },
  components: {},
  mounted() {
    this.changeImg();
  },
  methods: {
    changeImg() {
      let num = Math.ceil(Math.random() * 100);
      this.validCodeImg = this.$GLOBAL.BASE_URL + "secret/verifycode?num="+num;
    },
    login() {
      this.$api
        .login({
          password: this.password,
          mobilePhone: this.mobilePhone,
          validCode: this.validCode
        })
        .then(res => {
          this.$cookie.set("tokenHead", res.data.type);
          this.$cookie.set("token", res.data.token);
          this.$router.push("/index");
        });
    }
  },
  computed: {
    isDisabled() {
      if (
        this.password != "" &&
        this.mobilePhone != "" &&
        this.validCode != ""
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
.login {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(#191d26, #232730);
  .f-password {
    padding-left: 20px;
    color: #5e5e5e;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      height: 100%;
      border-right: 1px solid #5e5e5e;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
    }
  }
  .iconfont {
    color: #5e5e5e;
    padding: 0 10px;
  }
  .img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin: 90px auto;
    margin-bottom: 40px;
    background-color: #3d434a;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .login-box {
    margin: 0 30px;
  }
  .btn {
    margin-top: 80px;
  }
  .b-text {
    margin-top: 30px;
    text-align: center;
  }
  // position: absolute;
  // top: 0;
  // left: 0;
  // bottom: 0;
  // right: 0;
  // background-color: #fff;
  // .login-box {
  //   width: 90%;
  //   position: absolute;
  //   top: 40%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  // }
}
</style>
