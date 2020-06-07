<template>
  <div class="service">
    <div class="cell" :class="{'cell-height':isHidden}" @click="isHidden=!isHidden">
      <span class="tit">{{ $t('infoLang.serviceDescription')}}</span>
      <p class="cont">
        <span v-for="(x,index) in serviceExplain.contList" :key="index">
          <i class="iconfont icongou1"></i>{{x.content}}
        </span>
      </p>
    </div>
    <i v-if="isHidden" class="allow-right"></i>
    <i v-else class="allow-down"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHidden: true
    };
  },
  props: {
    serviceExplain: Object
  }
};
</script>

<style lang="scss" scoped>
.service {
  position: relative;
  background-color: #fff;
  font-size: 12px;
  color: #7b7b7b;
  margin-top: 10px;
  .cell {
    display: flex;
    min-height: 48px;
    line-height: 48px;
    padding: 0 20px;
    overflow: hidden;
    &.cell-height {
      height: 48px;
    }
    .tit {
      padding-right: 40px;
    }
    .cont {
      flex: 1;
      word-break: break-all;
      & > span {
        display: inline-block;
        padding-right: 20px;
      }
      .iconfont {
        padding-right: 5px;
        font-size: 14px;
        color: red;
      }
    }
  }
  .allow-right::after {
    top: 24px;
  }
  .allow-down::after {
    top: 24px;
  }
}
</style>
