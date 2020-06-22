<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- <mt-search v-model="value" placeholder="请输入会员编号">
      <div class="cell-box">
        <mt-cell class="success" title="编号：" label="18924435345" value="已激活"></mt-cell>
        <mt-cell title="姓名" value="邓在"></mt-cell>
        <mt-cell title="推荐人数" value="0"></mt-cell>
        <mt-cell title="团队人数" value="0"></mt-cell>
      </div>
      <div class="cell-box">
        <mt-cell class="fail" title="编号：" label="18924435345" value="未激活"></mt-cell>
        <mt-cell title="姓名" value="邓在"></mt-cell>
        <mt-cell title="推荐人数" value="0"></mt-cell>
        <mt-cell title="团队人数" value="0"></mt-cell>
      </div>
    </mt-search>-->
    <div class="cell-box">
      <mt-cell title="推荐人数" :value="info.l1Num"></mt-cell>
      <mt-cell class="b-none" title="团队人数" :value="info.teamTotal"></mt-cell>
    </div>
    <noneImg v-if="info==null"></noneImg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: null
    };
  },
  components: {
    noneImg: () => import("@components/noneImg")
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.relationnum({}).then(res => {
        if (res.error_code == "0") {
          this.info = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cell-box {
  background: linear-gradient(to right, #303645, #292f3c);
  margin: 15px;
  border-radius: 4px;
  font-size: 16px;
  &:first-child {
    margin-top: 100px;
  }

  /deep/ .mint-cell-label {
    display: inline;
    color: #fff;
    font-size: 16px;
  }
  /deep/ .mint-cell-text {
    color: #cacaca;
  }
  /deep/ .mint-cell-value {
    color: #fff;
  }
  /deep/ .mint-cell-wrapper {
    padding: 0 10px;
  }
  .success /deep/ .mint-cell-value {
    color: #2997fe;
  }
  .fail /deep/ .mint-cell-value {
    color: #fc5c50;
  }
}
/deep/ .mint-searchbar {
  background-color: transparent;
  padding: 25px 10px;
  margin: 0 15px;
  .mint-searchbar-inner {
    border-radius: 25px;
    background-color: #2f3544;
    padding: 6px 15px;
    .mintui-search {
      position: relative;
      color: #b1b1b1;
      top: 2px;
    }
  }
  .mint-searchbar-cancel {
    color: #cbcbcb;
  }
  input {
    text-indent: 5px;
  }
  input::-webkit-input-placeholder {
    color: #b1b1b1;
  }
  .mint-search-list-warp {
    margin-top: 100px;
  }
}
</style>