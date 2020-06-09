<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="filed-box">
      <div class="filed">
        <mt-field label="旧密码" placeholder="请输入您的旧密码" type="password" v-model.trim="oldPassword"></mt-field>
        <mt-field label="二级密码" placeholder="出售密码" type="password" v-model.trim="l2Password"></mt-field>
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
      oldPassword: "",
      l2Password: ""
    };
  },
  components: {},
  methods: {
    next() {
      this.$router.push("/modifyPasswordSecond?oldPassword="+this.oldPassword+"&l2Password="+this.l2Password);
    }
  },
  computed:{
    isDisabled() {
      if (
        this.oldPassword != "" &&
        this.l2Password != ""
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
