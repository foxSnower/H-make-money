<template>
  <div>
    <Header></Header>
    <commentShow v-for="(x,index) in pmsCommentAndReplayList" :key="index" :pmsComment="x"></commentShow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pmsCommentAndReplayList: []
    };
  },
  mounted() {
    this.getData();
  },
  components: {
    Header: () => import("@components/layout/Header"),
    commentShow: () => import("@components/commentShow")
  },
  methods: {
    getData() {
      this.$api
        .queryComment({
          productSn:this.$route.query.productSn,
          pageSize:5,
          pageNum:1
        })
        .then(res => {
          this.pmsCommentAndReplayList = res.data.list;
        });
    }
  }
};
</script>