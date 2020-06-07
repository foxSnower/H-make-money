<template>
  <div style="height:40px;">
    <mt-header fixed :title="$t('link')[$route.meta.title]">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <mt-button slot="right" @click="collection">
        <img src="@assets/love.png" slot="icon" />
      </mt-button>
      <!-- <mt-button slot="right">
        <img src="@assets/share.png" slot="icon" />
      </mt-button>-->
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: "cn"
    };
  },
  props: {
    productSn: {
      type: String,
      default: ""
    }
  },
  methods: {
    collection() {
      this.$api
        .collection({
          productSn: this.productSn
        })
        .then(res => {
          this.$toast({
            message: "收藏成功",
            iconClass: "icon icon-success"
          });
        });
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
  a + .mint-button {
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
