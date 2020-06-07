<template>
    <div class="none">
      <img src="@assets/none.png" alt />
      <p>还没有记录哦~</p>
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