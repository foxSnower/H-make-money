<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="filed-box">
      <div class="filed" @keyup.enter="login">
        <mt-field label="旧密码" placeholder="请输入您的旧密码" type="password" v-model.trim="username"></mt-field>
        <mt-field label="二级密码" placeholder="出售密码" type="password" v-model.trim="password"></mt-field>
      </div>
      <div class="btn">
        <mt-button :disabled="isDisabled" @click.native="login">登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.filed-box {
  margin-top: 10px;
  // margin: 0 30px;
  .filed {
    background: #262b36;
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
}
</style>
