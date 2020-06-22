<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="filed-box">
      <div class="title">买入</div>
      <div class="filed" @click="showPicker=true">
        <div class="f-flex-box">
          <div class="f-flex tit">{{curValTit}}</div>
          <div class="num">
            {{curValNum}}
            <i class="allow-down"></i>
          </div>
        </div>
      </div>
      <div class="warn">
        <div class="tit">提示：</div>
        <div class="cont">排单每1000元需消耗1个学点数，您当前学点数数量为:{{studyCoin}}</div>
      </div>
      <div class="btn">
        <mt-button :disabled="isDisabled" @click.native="buy">确认买入</mt-button>
      </div>
    </div>
    <transition name="slide-fade">
      <Picker v-if="showPicker" :slots="slots" :curVal.sync="curVal" :showPicker.sync="showPicker"></Picker>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPicker: false,
      curVal: null,
      studyCoin:0,
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1"
        }
      ]
    };
  },
  components: {
    Picker: () => import("@components/picker")
  },
  watch: {
    curVal(oldVal, newVal) {
      console.log(oldVal, newVal);
    }
  },
  mounted() {
    this.getData();
    this.userwallet();
  },
  methods: {
    getData() {
      let that = this;
      this.$api.products({}).then(res => {
        if (res.data != undefined) {
          let list = [];
          let text = "";
          let status = "";
          list = res.data;
          list.forEach(x => {
            if (x.status == "未开放") {
              status = "(暂未开放)";
            } else {
              status = "";
            }
            text = x.productName + " " + x.studyCoinCost + "学点" + status;
            x.textVal = text;
          });
          this.slots[0].values = list;
        }
      });
    },
    userwallet() {
      this.$api.userwallet({}).then(res => {
         if (res.error_code == "0") {
           this.studyCoin = res.data.studyCoin;
         }
      });
    },
    buy() {
      this.$api
        .tobuy({
          productId: this.curVal.id
        })
        .then(res => {
          if (res.error_code == "0") {
            this.$router.replace("./buyRecord");
          }
        });
    }
  },
  computed: {
    curValTit() {
      if (this.curVal != null) {
        let curVal = this.curVal.textVal;
        console.log(curVal);
        return curVal.split(" ")[0];
      } else {
        return "";
      }
    },
    curValNum() {
      if (this.curVal != null) {
        let curVal = this.curVal.textVal;
        return curVal.split(" ")[1];
      } else {
        return "";
      }
    },
    isDisabled() {
      let curVal = this.curVal;
      if (this.curValTit != "" && this.curValNum != "") {
        if (curVal.status == "未开放") {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-block {
  margin: 30px;
  .title {
    font-size: 24px;
  }
  .f-flex-box {
    height: 26px;
    line-height: 26px;
  }
  .filed-box {
    margin-top: 10px;
    // margin: 0 30px;
    .filed {
      position: relative;
      background: #262b36;
      padding: 10px 20px;
      margin: 40px 0;
      border: 2px solid;
      border-image: linear-gradient(to right, #53cef8, #38b1f1) 10 10;
      clip-path: inset(0 round 4px);
      .tit {
        font-size: 20px;
        text-align: left;
      }
      .num {
        position: relative;
        right: 20px;
        font-size: 18px;
        text-align: right;
        .allow-down::after {
          width: 8px;
          height: 8px;
          transform: translateY(-64%) rotate(135deg);
          right: -20px;
        }
      }
    }
    .warn {
      margin: 30px 0;
      .tit {
        font-size: 16px;
      }
      .cont {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }
}

.btn {
  margin-top: 50px;
}
</style>
