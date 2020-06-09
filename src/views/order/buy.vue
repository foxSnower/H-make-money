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
          <div class="f-flex tit">墨：3000元</div>
          <div class="f-flex num">
            3学点
            <i class="allow-down"></i>
          </div>
        </div>
      </div>
      <div class="warn">
        <div class="tit">提示：</div>
        <div class="cont">排单每1000元需消耗1个学点数，您当前学点数数量为:0</div>
      </div>
      <div class="btn">
        <mt-button @click.native="$router.push('./buyRecordDetail')">确认买入</mt-button>
      </div>
    </div>
    <transition name="slide-fade">
      <Picker v-if="showPicker" :slots="slots" :showPicker.sync="showPicker"></Picker>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPicker: false,
      slots: [
        {
          flex: 1,
          values: [
            "笔：1000元 1学点",
            "墨：3000元 3学点",
            "纸：5000元 5学点",
            "砚：10000元 10学点"
          ],
          className: "slot3"
        }
      ]
    };
  },
  components: {
    Picker: () => import("@components/picker")
  },
  methods: {
    buy() {
      let that = this;
      if (this.newPassword != this.newPassword2) {
        this.$toast("两次密码输入不一致！");
        return false;
      }
      this.$api
        .changepwd({
          newPassword: this.newPassword,
          oldPassword: this.$route.query.oldPassword,
          l2Password: this.$route.query.l2Password
        })
        .then(res => {
          if (res.error_code == "0") {
            this.$toast("恭喜修改成功~");
            setTimeout(function() {
              that.$router.push("./my");
            }, 1000);
          }
        });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.m-block {
  margin: 30px;
  .title {
    font-size: 24px;
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
