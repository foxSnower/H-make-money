<template>
  <div class="f-flex img-cell">
    <div class="img">
      <img :src="orderShow.pic" />
    </div>
    <div class="f-item1">
      <p>{{orderShow.title}}</p>
      <p class="tip">{{orderShow.subTitle}}</p>
    </div>
    <div class="num">×{{orderShow.quantity}}</div>
  </div>
</template>

<script>
export default {
  props:['orderShow']
}
</script>


<style lang="scss" scoped>
.img-cell {
  padding: 10px;
  border-top: 1px solid #efefef;
  background-color: #fff;
  .img {
    width: 90px;
    height: 90px;
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .f-item1 {
    position: relative;
    flex: 1;
    padding-left: 10px;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      &.tip {
        color: #7b7b7b;
        font-size: 12px;
        position: absolute;
        bottom: 3px;
      }
    }
  }
}
</style>
