<template>
  <div style="height:70px;">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="首页" @click.native="goTo(selected)">
        <img slot="icon" v-if="selected=='首页'" src="@assets/index-active.png" />
        <img slot="icon" v-else src="@assets/index-normal.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="二维码" @click.native="goTo(selected)">
        <img slot="icon" v-if="selected=='二维码'" src="@assets/qr-code-active.png" />
        <img slot="icon" v-else src="@assets/qr-code-normal.png" />
        二维码
      </mt-tab-item>
      <mt-tab-item id="我的" @click.native="goTo(selected)">
        <img slot="icon" v-if="selected=='我的'" src="@assets/my-active.png" />
        <img slot="icon" v-else src="@assets/my-normal.png" />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "首页"
    };
  },
  props: {
    curPage: {
      type: String,
      default: "首页"
    }
  },
  mounted() {
    this.selected = this.curPage;
  },
  methods: {
    goTo(selected) {
      console.log(selected)
      if (selected == "首页") this.$router.push("/index");
      if (selected == "二维码") this.$router.push("/qrcode");
      if (selected == "我的") this.$router.push("/my");
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

