<template>
  <div>
    <Header></Header>
    <div class="box" v-for="(x,idX) in supportingFacility" :key="idX">
      <p class="title">{{x.name}}</p>
      <p class="detail">
        <span class="icon" v-for="(y,idY) in x.contList" :key="idY">
          <!-- <i class="iconfont icon-markdown"></i> -->
          <img :src="y.albumPics" alt />
          <i>{{y.content}}</i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    Header: () => import("@components/layout/Header")
  },
  methods: {},
  computed:{
    supportingFacility(){
      return this.$route.params.supportingFacility;
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #fff;

  .title {
    font-weight: 700;
    padding: 10px 20px;
  }
  .detail {
    line-height: 1.2;
    color: #7b7b7b;
    text-align: justify;
    overflow: hidden;
    padding: 0 20px;
    .icon {
      float: left;
      display: inline-block;
      width: 25%;
      padding: 5px 0;
      color: #7b7b7b;
      i {
        font-style: normal;
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
