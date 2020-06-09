<template>
  <div class="m-block">
    <mt-header fixed :title="$route.meta.title">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="banner">
      <img src="@assets/banner.png" />
    </div>
    <div class="f-flex-box">
      <div class="f-flex" @click="$router.push('/buy')">
        <div>
          <img src="@assets/buy.png" />
          <p>买入</p>
        </div>
      </div>
      <div class="f-flex" @click="$router.push('/sell')">
        <div>
          <img src="@assets/sell.png" />
          <p>卖出</p>
        </div>
      </div>
    </div>
    <div class="f-flex-box">
      <div class="f-flex" @click="$router.push('/buyRecord')">
        <div>
          <img src="@assets/buy-record.png" />
          <p>买入记录</p>
        </div>
      </div>
      <div class="f-flex" @click="$router.push('/sellRecord')">
        <div>
          <img src="@assets/sell-record.png" />
          <p>卖出记录</p>
        </div>
      </div>
    </div>
    <div class="ech-box">
      <div class="ech-tit">
        <img src="@assets/hot-sell.png" />
        <span>收益周期</span>
      </div>
      <div class="ech-subtit">
        <span class="num">+ 50%</span>
        <span class="text">稳固收益</span>
      </div>
      <div class="ech" id="echartDemo"></div>
    </div>
    <Footer curPage="首页"></Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      telephone: "",
      authCode: "",
      type: 2
    };
  },
  components: {
    Footer: () => import("@components/layout/footer")
  },
  mounted() {
    this.initEchart();
  },
  methods: {
    initEchart() {
      //初始化echart实例，获取dom
      let echartDemo = this.$echarts.init(
        document.getElementById("echartDemo")
      );
      let option = {
        color: new this.$echarts.graphic.LinearGradient(1, 0, 1, 1, [
          { offset: 1, color: "#5a95ea" },
          { offset: 0, color: "#abdcfc" }
        ]),
        // backgroundColor: "#F8F8F8",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: 40,
          containLabel: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 3,
            color: "#161F3C"
          }
        },

        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                width: 1,
                color: "#33558c"
              }
            },
            axisLabel: {
              show: true,
              fontSize: 16,
              color: "#e0e0e0"
            },
            data: ["笔", "墨", "纸", "砚"],
            axisTick: {
              show: false,
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            min:0,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#444"
              }
            },
            axisLine: {
              lineStyle: {
                width: 1,
                color: "#33558c"
              }
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            }
            // interval: 50
          }
        ],
        series: [
          {
            name: "天数",
            type: "bar",
            barWidth: "20",
            label: {
              show: true,
              color: "#25BCF8",
              fontSize: 14,
              fontWeight: 700,
              position: "top",
              formatter: "{c}天",
              offset: [0, -20]
            },
            data: [6, 7, 8, 9]
          }
        ]
      };
      echartDemo.setOption(option);
    }
    // login() {
    //   this.$api
    //     .login({
    //       username: this.username,
    //       password: this.password,
    //       telephone: this.telephone,
    //       authCode: this.authCode,
    //       type: this.type
    //     })
    //     .then(res => {
    //       this.$cookie.set("tokenHead", res.data.tokenHead);
    //       this.$cookie.set("token", res.data.token);
    //       this.$router.push("/home");
    //     });
    // }
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
  img {
    width: 100%;
    height: 100%;
  }
}
.f-flex-box {
  margin: 0 15px;
}
.f-flex {
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  background: linear-gradient(to left, #282e3a, #313746);
}
p {
  padding-top: 10px;
}

.ech-box {
  margin-top: 10px;
  margin-bottom: 20px;
  height: 270px;
  border-radius: 10px;
  text-align: center;
  background: linear-gradient(to left, #282e3a, #313746);
  .ech-tit {
    font-size: 20px;
    padding: 10px;
    letter-spacing: 3px;
  }
  .ech-subtit {
    span {
      padding: 0 10px;
    }
    .text {
      vertical-align: super;
      font-size: 12px;
    }
    .num {
      color: #2997fe;
      font-size: 30px;
    }
  }
  .ech {
    width: 100%;
    height: 180px;
  }
}
</style>
