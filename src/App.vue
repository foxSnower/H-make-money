<template>
  <div id="app" style="height: 100vh; overflow-x: hidden">
    <keep-alive include="my,myInfo,qrcode" v-if="isLoggedIn">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive||!isLoggedIn"></router-view>
    <mt-spinner class="loading" color="#2897fe" v-show="loading" type="double-bounce"></mt-spinner>
    <transition name="slide-fade">
      <div class="showTip" v-if="isTipShow">
        {{content}}
        <span class="close" @click="isTipShow=false"></span>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      content: "",
      isTipShow: false
    };
  },
  components: {},
  watch: {
    $route(to, from) {
      // if the route changes...
      let token = this.$cookie.get("token") || "";
      if (token) {
        // firebase returns null if user logged out
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }
  },
  computed: {
    ...mapGetters(["loading"])
  },
  mounted() {
    if (window.location.href.indexOf('register') < 0) {
      this.$api.systemnotice({}).then(res => {
        if (res.error_code == "0") {
          let systemnotice = this.$cookie.get("systemnotice");
          console.log("systemnotice", systemnotice);
          if (systemnotice == undefined) {
            this.isTipShow = true;
            this.content = res.data.content;
            systemnotice = [];
            systemnotice.push(res.data.id);
            systemnotice = systemnotice.join(",");
            this.$cookie.set("systemnotice", systemnotice);
          } else {
            systemnotice = systemnotice.split(",");
            let isDo = systemnotice.every(x => {
              return x != res.data.id;
            });
            if (isDo) {
              this.isTipShow = true;
              this.content = res.data.content;
              systemnotice.push(res.data.id);
              systemnotice = systemnotice.join(",");
              this.$cookie.set("systemnotice", systemnotice);
            }
          }
        }
      });
    }
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

.showTip {
  background: linear-gradient(to right, #303645, #292f3c);
  position: fixed;
  top: 30%;
  width: 90%;
  margin: 0 5%;
  padding: 20% 0;
  text-indent: 20px;
  z-index: 10;
  .close {
    width: 22px;
    height: 22px;
    position: absolute;
    top: -11px;
    right: -11px;
    background: url(assets/close.png) no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
}
</style>

