<template>
  <div id="app" style="height: 100vh; overflow-x: hidden">
    <router-view />
    <mt-spinner class="loading" color="#ff2a00" v-show="loading" type="double-bounce"></mt-spinner>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    
  },
  computed: {
    ...mapGetters(["loading"])
  },
  mounted() {
    // //进入获取cookie的isEnglish与vuex保持一致
    // let isEnglish = this.$cookie.get("isEnglish");
    // if (isEnglish == null) {
    //   isEnglish = 0;
    //   this.$cookie.set("isEnglish", isEnglish);
    // }
    // this.$store.commit("isEnglish", isEnglish);
    // this.$i18n.locale = isEnglish == 0 ? "cn" : "en";
  }
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  // background-color: rgba(0, 0, 0, 0.25);
  z-index: 1500;
  /deep/ .mint-spinner-double-bounce {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

