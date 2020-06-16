<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.push('./my')"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="none">
      <img src="@assets/modify-success.png" alt />
      <p>恭喜您修改成功~</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss" scoped>
.none {
  position: fixed;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 150px;
  }
  p {
    color: #cbcbcb;
    margin-top: 20px;
  }
}
</style>