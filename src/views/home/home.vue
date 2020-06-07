<template>
  <div>
    <!-- <homeHeader :cartCount="cartCount"></homeHeader> -->
    <homeSwipe :advertiseList="advertiseList"></homeSwipe>
    <datePicker></datePicker>
    <div class="btn">
      <mt-button @click.native="$router.push('/rooms')">{{ $t('home.search')}}</mt-button>
    </div>
    <mt-cell :title="$t('home.hotRecommendation')" is-link style="margin-top:10px;" @click.native="$router.push('/rooms')">
      <span class="tip">{{$t('home.more')}}</span>
    </mt-cell>
    <roomsShow v-for="x in hotProductList" :key="x.id" :content="x"></roomsShow>
    <mt-cell :title="$t('home.newRecommendation')" is-link style="margin-top:10px;" @click.native="$router.push('/rooms')">
      <span class="tip">{{$t('home.more')}}</span>
    </mt-cell>
    <homeFine :newProductList="newProductList"></homeFine>
    <homePromise></homePromise>
    <Footer :curPage="$t('link')[$route.meta.title]"></Footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      cartCount: 0,
      advertiseList: [],
      hotProductList: [],
      newProductList: []
    };
  },
  components: {
    Footer: () => import("@components/layout/footer"),
    datePicker: () => import("@components/datePicker"),
    roomsShow: () => import("@components/roomsShow"),
    homeHeader: () => import("./components/homeHeader"),
    homeSwipe: () => import("./components/homeSwipe"),
    homeFine: () => import("./components/homeFine"),
    homePromise: () => import("./components/homePromise")
  },
  watch: {
    isEnglish(cur) {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api
        .homeContent({
          app: 1 //0 PC端 1 手机端
        })
        .then(res => {
          this.cartCount = res.data.cartCount;
          this.advertiseList = res.data.advertiseList; //广告列表
          this.hotProductList = res.data.hotProductList; //人气推荐
          this.newProductList = res.data.newProductList; //精品房源
        });
    }
  },
  computed: {
    ...mapGetters(["isEnglish"])
  }
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 10px 15px;
  background-color: #fff;
  /deep/ .mint-button {
    width: 100%;
    border-radius: 20px;
    background: linear-gradient(to right, #ee7459, #ef8a50); /* 标准的语法 */
    .mint-button-text {
      color: #fff;
    }
  }
}
/deep/ .mint-cell-text {
  font-weight: 700;
  font-size: 15px;
}
.tip {
  font-size: 12px;
  color: #7b7b7b;
}
</style>






