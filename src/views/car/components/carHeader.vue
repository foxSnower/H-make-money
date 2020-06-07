<template>
  <div style="height:40px;">
    <mt-header fixed :title="$t('link')[$route.meta.title]">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <router-link to="/rooms" slot="right">
        <mt-button>
          <img src="@assets/search.png" slot="icon" />
        </mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: "cn"
    };
  }
};
</script>

<style lang="scss" scoped>
.mint-header {
  background-color: #fff;
  color: #333;
  /deep/ .mint-header-title {
    font-size: 18px;
    font-weight: 700;
    // position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
  }
}
.mint-header {
  .act-color {
    color: #fc1605;
  }
  .icon {
    padding: 4px;
    color: #868686;
  }
  .mint-button {
    position: relative;
    overflow: visible;
    font-size: 12px;
    img {
      width: 18px;
      height: 18px;
    }
  }
  .mint-button + .mint-button,
  a + a {
    padding-left: 10px;
  }
  .tip {
    position: absolute;
    right: -8px;
    z-index: 27;
    color: #fff;
    background-color: rgba(238, 116, 89, 0.8);
    top: 5px;
    padding: 1px;
    border-radius: 12px;
    font-size: 12px;
    width: 12px;
    height: 12px;
    i {
      font-style: normal;
    }
  }
}
</style>
