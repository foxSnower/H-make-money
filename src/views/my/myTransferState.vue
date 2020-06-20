<template>
  <div class="state">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.push('./my')"></mt-button>
    </mt-header>
    <div class="box" v-if="showSuccess">
      <img src="@assets/success.png" alt />
      <p>恭喜您转让成功~</p>
    </div>
    <div class="box" v-else>
      <img src="@assets/fail.png" alt />
      <p>转让失败，请重新转让吧~</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSuccess: true
    };
  },
  components: {},
  mounted() {
    this.showSuccess = this.$route.query.status == "success" ? true : false;
  }
};
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 120px;
  }
  p {
    color: #cbcbcb;
    margin-top: 20px;
  }
}
</style>