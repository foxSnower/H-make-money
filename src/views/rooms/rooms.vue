<template>
  <div>
    <searchHeader :keyword.sync="keyword"></searchHeader>
    <div class="rooms-box">
      <div class="rooms">
        <div class="f-item3" @click="changeSort('综合')">
          {{ $t('rooms.comprehensive')}}
          <i class="iconfont iconbelow-s"></i>
        </div>
        <div class="f-item3" @click="changeSort('销量')">
          {{ $t('rooms.salesVolume')}}
          <i class="iconfont iconbelow-s"></i>
        </div>
        <div class="f-item3" @click="changeSort('价格')">
          {{ $t('rooms.price')}}
          <i class="iconfont iconbelow-s"></i>
        </div>
        <!-- <div class="f-item3">
          筛选
          <i class="iconfont iconbelow-s"></i>
        </div>-->
      </div>
    </div>
    <roomsShow v-for="(x,index) in productList" :key="index" :content="x"></roomsShow>
    <div class="more">
      <span @click="loadingMore()">{{loadingText}}</span>
      <mt-spinner v-if="loading" :size="12" type="fading-circle"></mt-spinner>
    </div>

    <Footer :curPage="$t('link')[$route.meta.title]"></Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loadingText:this.$t('rooms.clickMore'),
      pageNum: 1,
      pageSize: 10,
      sort: 0,
      keyword: "",
      productList: []
    };
  },
  components: {
    Footer: () => import("@components/layout/footer"),
    roomsShow: () => import("@components/roomsShow"),
    searchHeader: () => import("@components/searchHeader")
  },
  watch: {
    keyword(cur) {
      //还原数据
      this.productList = [];
      this.pageNum = 1;
      this.pageSize = 10;
      //获取数据
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api
        .getProductList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          sort: this.sort,
          keyword: this.keyword
        })
        .then(res => {
          this.loading = false;
          if (res.data.list.length == 0) {
            this.loadingText = this.$t('rooms.noMore');
          } else {
            this.productList = this.productList.concat(res.data.list);
            this.loadingText = this.$t('rooms.clickMore');
          }
        });
    },
    changeSort(text) {
      //sort 排序字段:0->按新品从新到旧；5->按新品从旧到新；1->按商品的销量从高到低；2->按销量从低到高；3->价格从低到高；4->价格从高到低
      switch (text) {
        case "综合":
          if (this.sort == 0) this.sort = 5;
          else this.sort = 0;
          break;
        case "销量":
          if (this.sort == 1) this.sort = 2;
          else this.sort = 1;
          break;
        case "价格":
          if (this.sort == 3) this.sort = 4;
          else this.sort = 3;
          break;
        default:
          break;
      }
      //还原数据
      this.productList = [];
      this.pageNum = 1;
      this.pageSize = 10;
      // this.keyword = "";不需要还原
      this.getData();
    },
    loadingMore() {
      if (this.loadingText ==  this.$t('rooms.noMore')) {
        return false;
      } else {
        this.loading = true;
        this.loadingText = this.$t('rooms.loading');
        this.pageNum += 1;
        this.getData();
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.rooms-box {
  width: 100%;
  .rooms {
    padding: 10px;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
  }
  .f-item3 {
    float: left;
  }
}
.more {
  padding: 20px;
  font-size: 12px;
  columns: #b7b7b7;
  text-align: center;
  span {
    position: relative;
  }
  /deep/ .mint-spinner-fading-circle {
    position: absolute;
    right: -20px;
    top: 3px;
  }
}
</style>
