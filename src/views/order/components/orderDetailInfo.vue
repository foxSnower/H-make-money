<template>
  <div class="detail">
    <p class="cont border-t">
      <span class="hd">入离日期</span>
      <span class="bd">2019-07-15至2019-08-15（30天）</span>
    </p>
    <p class="cont">
      <span class="hd">入住时间</span>
      <span class="bd">入住日14:00后</span>
    </p>
    <p class="cont">
      <span class="hd">退房时间</span>
      <span class="bd">退房日12:00前</span>
    </p>
    <p class="cont border-t">
      <span class="hd">接待时间</span>
      <span class="bd">00:00-24:00</span>
    </p>
    <p class="cont">
      <span class="hd">入住人</span>
      <span class="bd">张三丰、长是的哈卡、杀得好、是多少</span>
    </p>
    <p class="cont">
      <span class="hd">联系电话</span>
      <span class="bd">1300784486884</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.detail {
  background-color: #fff;
  .cont {
    display: flex;
    line-height: 1.2;
    padding: 15px 0;
    margin: 0 20px;
    overflow: hidden;
    .hd {
      min-width: 70px;
      text-align: right;
      padding-right: 10px;
      color: #7b7b7b;
    }
    .bd {
      flex: 1;
      text-align: justify;
    }
    &.border-t {
      border-top: 1px solid #d9d9d9;
    }
  }
}
</style>

