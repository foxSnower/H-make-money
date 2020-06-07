<template>
  <div style="height:40px;">
    <mt-header fixed :title="$t('link')[$route.meta.title]">
      <mt-button
        :class="{'act-color':isEnglish==0}"
        :key="isEnglish?1:0"
        @click.stop="isEnglish=0"
        slot="left"
      >中文版</mt-button>
      <span slot="left" class="icon">|</span>
      <mt-button :class="{'act-color':isEnglish==1}" @click.stop="isEnglish=1" slot="left">ENGLISH</mt-button>
      <router-link to="/rooms" slot="right">
        <mt-button>
          <img src="@assets/search.png" slot="icon" />
        </mt-button>
      </router-link>
      <router-link to="/car" slot="right">
        <mt-button>
          <img src="@assets/car.png" slot="icon" />
          <span class="tip">
            <i>{{cartCount}}</i>
          </span>
        </mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    cartCount: Number
  },
  watch: {
    isEnglish(cur) {
      this.$i18n.locale = cur == 0 ? "cn" : "en";
      this.$cookie.set("isEnglish", cur);
    }
  },
  computed: {
    isEnglish: {
      get: function() {
        return this.$store.state.app.isEnglish;
      },
      set: function(newValue) {
        this.$store.state.app.isEnglish = newValue;
      }
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
