<template>
  <div style="height:70px;">
    <mt-tabbar v-model="titleText">
      <mt-tab-item id="首页" @click.native="goTo('index')">
        <img slot="icon" v-if="curPage=='首页'" src="@assets/index-active.png" />
        <img slot="icon" v-else src="@assets/index-normal.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="二维码" @click.native="goTo('qrcode')">
        <img slot="icon" v-if="curPage=='二维码'" src="@assets/qr-code-active.png" />
        <img slot="icon" v-else src="@assets/qr-code-normal.png" />
        二维码
      </mt-tab-item>
      <mt-tab-item id="个人中心" @click.native="goTo('my')">
        <img slot="icon" v-if="curPage=='个人中心'" src="@assets/my-active.png" />
        <img slot="icon" v-else src="@assets/my-normal.png" />
        个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: "首页"
    };
  },
  props: {
    curPage: {
      type: String,
      default: "首页"
    }
  },
  watch: {
    $route() {
      console.log(this.$route.meta.title);
      this.titleText =this.$route.meta.title
    },
  },
  mounted() {
    this.titleText = this.curPage;
  },
  methods: {
    goTo(name) {
      this.$router.push({
        path: name
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-tabbar {
  position: fixed;
  color: #cbcbcb;
  background-image: none;
  /deep/.mint-tabbar > .mint-tab-item.is-selected {
    background-color: transparent;
    color: #2897fe;
  }
  /deep/ .mint-tab-item {
    padding: 15px 0;
  }
}
</style>

