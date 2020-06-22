<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="banner">
      <img src="@assets/wallet-income.png" />
      <div class="text">
        <p class="tit">学点转让</p>
        <p class="num">{{studyCoin}}</p>
      </div>
    </div>
    <div class="field">
      <mt-field label="转出账户:" placeholder="请输入转出账户号" type="tel" v-model="toMobile"></mt-field>
      <mt-field label="输入数量:" placeholder="请输入排单币数量" type="number" v-model="amount"></mt-field>
      <div class="filed-tip" v-if="studyCoin<amount">学点币不足</div>
    </div>
    <div class="warn">
      <div class="tit">提示：</div>
      <div class="cont">请您认真核对转入账户，避免给您造成损失</div>
    </div>
    <div class="btn">
      <mt-button :disabled="isDisabled" @click.native="sure">确定转让</mt-button>
    </div>
    <div class="cell-box">
      <div class="f-flex-box hd">
        <div class="f-flex">会员编号</div>
        <div class="f-flex">数量</div>
        <div class="f-flex hd-time">时间</div>
      </div>
      <template v-if="recordList.length!=0">
        <div class="f-flex-box" v-for="x in recordList" :key="x.id">
          <div class="f-flex">{{x.referUserMobile}}</div>
          <div class="f-flex">{{x.amount}}</div>
          <div class="f-flex time">{{x.createDate}}</div>
        </div>
      </template>
    </div>
    <div class="none" v-if="recordList.length==0">暂无记录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studyCoin: 0,
      recordList: [],
      toMobile: "",
      amount: null
    };
  },
  components: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.userwallet(() => {
        this.getRecord();
      });
    },
    getRecord(fn) {
      //获取转让记录
      this.$api.studycoinexchangerecord({}).then(res => {
        if (res.error_code == 0) {
          this.recordList = res.data;
          fn();
        }
      });
    },
    userwallet(fn) {
      this.$api.userwallet({}).then(res => {
        if (res.error_code == "0") {
          this.studyCoin = res.data.studyCoin;
          fn();
        }
      });
    },
    sure() {
      this.$api
        .studycoinexchange({
          toMobile: this.toMobile,
          amount: this.amount
        })
        .then(res => {
          if (res.error_code == 0) {
            this.$router.replace("./myTransferState?status=success");
          } else {
            this.$router.replace("./myTransferState?status=fail");
          }
        });
    }
  },
  computed: {
    isDisabled() {
      if (this.toMobile != "" && this.amount != null && this.amount != "") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.m-block {
  margin: 0 15px;
}
.banner {
  margin: 10px 0;
  height: 120px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .text {
    width: 100%;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    .tit {
      font-size: 14px;
    }
    .num {
      font-size: 28px;
    }
  }
}
.warn {
  margin: 30px 20px;
  .tit {
    font-size: 16px;
  }
  .cont {
    margin-top: 10px;
    font-size: 14px;
  }
}
.cell-box {
  background: linear-gradient(to right, #303645, #292f3c);
  margin: 40px 0 20px;
  border-radius: 4px;
  .f-flex-box {
    padding: 10px;
    & + .f-flex-box {
      border-top: 1px solid #3a3c47;
    }
    &.hd {
      padding: 15px 10px;
      font-size: 16px;
    }
    .hd-time {
      min-width: 120px;
    }
    .f-flex {
      text-align: center;
    }
    .time {
      font-size: 12px;
      min-width: 120px;
    }
  }
}
.none {
  font-size: 26px;
  color: #5e5e5e;
  text-align: center;
  padding: 57px 0 75px;
}
</style>