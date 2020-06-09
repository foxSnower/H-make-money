<template>
  <div class="picker-box">
    <div class="hd">
      <span class="cancel" @click="$emit('update:showPicker', false)">取消</span>
      <span class="ok">确定</span>
    </div>
    <mt-picker :itemHeight="40" :visibleItemCount="7" :slots="slots"></mt-picker>
  </div>
</template>

<script>
export default {
  props: {
    slots: {
      type: Array,
      default: []
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.picker-box {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(#303645, #2b313f);
  .hd {
    line-height: 40px;
    overflow: hidden;
    border-bottom: 1px solid #cacaca;
    font-size: 15px;
    .cancel {
      float: left;
      padding: 0 30px;
      color: #cacaca;
    }
    .ok {
      float: right;
      padding: 0 30px;
      color: #2997fe;
    }
  }
}
/deep/.picker {
  //   background: linear-gradient(#303645, #2b313f);
  .picker-item {
    color: #cacaca;
    font-size: 18px;
    &.picker-selected {
      background: #232527;
      color: #fff;
      font-size: 22px;
    }
  }
  .picker-center-highlight:before,
  .picker-center-highlight:after {
    background-color: transparent;
  }
}
</style>