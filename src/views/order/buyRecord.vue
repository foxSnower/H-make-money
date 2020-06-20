<template>
  <div class="m-block" v-if="!loading">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <template v-if="orderList.length!=0">
      <div class="cell-box" v-for="x in orderList" :key="x.id">
        <div class="hd">
          <span class="tit">参与者：</span>
          <span>{{x.bname}}</span>
          <span
            v-if="x.status==2"
            class="detail"
            @click="$router.push('./buyRecordDetail?parentId='+ x.id)"
          >查看详情</span>
        </div>
        <div class="bd">
          <span class="tit">申请编号：</span>
          <span>{{x.id}}</span>
        </div>
        <div class="bd">
          <span class="tit">日期：</span>
          <span>{{x.orderDate}}</span>
        </div>
        <div class="bd">
          <span class="tit">已配：</span>
          <span>{{x.buyAmount}} 元</span>
        </div>
        <div class="bd">
          <span class="tit">匹配状态：</span>
          <span :class="statusColor(x.status)">{{x.statusStr}}</span>
        </div>
        <div class="ft">
          <span class="tit">总额</span>
          <span class="total blue">￥{{x.orderAmount}}</span>
        </div>
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
      orderList: []
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
      this.$api.buyorder({}).then(res => {
        if (res.error_code == "0") {
          this.orderList = res.data;
        }
      });
    },
    statusColor(status) {
      if (status == 0) {
        return "yellow";
      }
      if (status == 2) {
        return "blue";
      }
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
  .hd {
    position: relative;
    margin: 0 15px;
    padding: 15px 0;
    font-size: 16px;
    border-bottom: 1px solid #3a3c47;
    overflow: hidden;
    .detail {
      float: right;
      font-size: 14px;
      padding-right: 20px;
      color: #d8d8d8;
    }
    .allow-down::after {
      top: 49%;
      right: 5px;

      width: 8px;
      height: 8px;
    }
  }
  .bd {
    margin: 0 15px;
    padding: 10px 0;
    font-size: 16px;
  }
  .ft {
    margin: 5px 15px;
    padding: 15px 0;
    font-size: 16px;
    border-top: 1px solid #3a3c47;
    overflow: hidden;
    .total {
      float: right;
    }
  }
  .tit {
    color: #cacaca;
  }
  .yellow {
    color: #fc5c50;
  }
  .blue {
    color: #2997fe;
  }
}
</style>