<template>
  <div style="height:40px;">
    <mt-header fixed>
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="search-box">
      <mt-search slot="right" type="submit" v-model="value" :cancel-text="$t('search.cancel')" :placeholder="$t('search.searchPlaceholder')"></mt-search>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  watch:{
    value(cur){
      this.$emit('update:keyword',cur)
    }
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
.search-box {
  position: absolute;
  width: 100%;
  height: inherit;
  /deep/ .mint-search {
    padding-left: 40px;
    padding-right: 10px;
    height: inherit;
    .mint-searchbar {
      padding: 0;
      height: inherit;
      background-color: transparent;
      .mint-searchbar-inner .mintui-search {
        font-size: 20px;
        padding-right: 10px;
      }
      .mint-searchbar-inner {
        border-radius: 20px;
        outline: none;
        background-color: #f4f4f4;
        height: auto;
      }
      .mint-searchbar-core {
        background-color: #f4f4f4;
        color: #7b7b7b;
      }
      .mint-searchbar-cancel {
        color: #ff2a00;
      }
    }
  }
}
</style>
