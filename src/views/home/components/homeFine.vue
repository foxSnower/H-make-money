<template>
  <mt-swipe :auto="4000" :show-indicators="false" style="height:220px">
    <mt-swipe-item v-for="(x,index) in newProductList" :key="index">
      <div class="img-cell" @click="$router.push('/info?productSn='+x.productSn)">
        <div class="img">
          <img :src="x.pic" />
        </div>
        <div class="detail">
          <p>{{x.name}}</p>
          <p class="tip">{{x.subTitle}}</p>
          <p class="price">
            <i>￥</i>
            {{x.price}}
          </p>
        </div>
      </div>
    </mt-swipe-item>
    <!-- <mt-swipe-item>2</mt-swipe-item>
    <mt-swipe-item>3</mt-swipe-item>-->
  </mt-swipe>
</template>

<script>
export default {
  props: {
    newProductList: Array
  }
};
</script>


<style lang="scss" scoped>
.img-cell {
  padding: 10px 0;
  border-top: 1px solid #efefef;
  background-color: #fff;
  .img {
    margin: 0 10px;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    margin: 0 10px;
    padding: 8px 0;
    position: relative;
    p {
      width: 80%;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      &.tip {
        color: #7b7b7b;
        font-size: 12px;
      }
      &.price {
        color: #ff2a00;
        font-size: 20px;
        margin-top: 10px;
        width: auto;
        position: absolute;
        top: 0;
        right: 0;
        i {
          font-style: normal;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
