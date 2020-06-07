<template>
  <div class="promise">
    <div class="up">{{ $t('home.promise')}}</div>
    <div class="f-flex down">
      <div class="f-item3">
        <p class="img">
          <img src="@assets/safe.png" />
        </p>
        <p class="tip">{{ $t('home.tip1')}}</p>
        <p>{{ $t('home.subTip1')}}</p>
      </div>
      <div class="f-item3">
        <p class="img">
          <img src="@assets/call.png" />
        </p>
        <p class="tip">{{ $t('home.tip2')}}</p>
        <p>{{ $t('home.subTip2')}}</p>
      </div>
      <div class="f-item3">
        <p class="img">
          <img src="@assets/dianping.png" />
        </p>
        <p class="tip">{{ $t('home.tip3')}}</p>
        <p>{{ $t('home.subTip3')}}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promise {
  text-align: center;
  background-color: #fff;
  margin-top: 10px;
  padding-bottom: 20px;
  font-size: 12px;
  color: #7b7b7b;
  .up {
    display: inline-block;
    padding: 15px 0;
    position: relative;
    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 20px;
      height: 0.5px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #7b7b7b;
    }
    &:before {
      left: -25px;
    }
    &:after {
      right: -25px;
    }
  }
  .down {
    .img {
      margin: 0 auto;
      width: 34px;
      height: 34px;
    }
    .tip {
      font-size: 14px;
      color: #333;
    }
  }
}
</style>

