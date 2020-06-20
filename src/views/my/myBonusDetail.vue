<template>
  <div class="m-block" v-if="!loading">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <template v-if="recordList.length!=0">
      <div class="cell-box" v-for="x in recordList" :key="x.id">
        <mt-cell class="hd" :title="`收益来自：${x.remark}`"></mt-cell>
        <mt-cell class="income" title="动态收益" :value="x.amount"></mt-cell>
        <mt-cell title="奖金类型" :value="x.type"></mt-cell>
        <mt-cell title="时间" :value="x.createDate"></mt-cell>
      </div>
    </template>
    <noneImg v-else></noneImg>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      recordList: []
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
      this.$api.usercoinrecord({}).then(res => {
        if (res.error_code == 0) {
          this.recordList = res.data;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["loading"])
  }
};
</script>

<style lang="scss" scoped>
.cell-box {
  background: linear-gradient(to right, #303645, #292f3c);
  margin: 15px;
  border-radius: 4px;
  /deep/ .mint-cell-value {
    color: #fff;
  }
  /deep/ .mint-cell-wrapper {
    padding: 0 10px;
  }
  .income /deep/ .mint-cell-value {
    color: #2997fe;
  }
  .hd {
    /deep/ .mint-cell-text {
      font-size: 18px;
    }
  }
}

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