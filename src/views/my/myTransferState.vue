<template>
  <div class="state">
    <mt-header fixed :title="$route.meta.title">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="box" v-if="false">
      <img src="@assets/success.png" alt />
      <p>恭喜您转让成功~</p>
    </div>
    <div class="box">
      <img src="@assets/fail.png" alt />
      <p>转让失败，请重新转让吧~</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
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