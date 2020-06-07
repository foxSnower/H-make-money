<template>
  <div class="f-flex img-cell" @click="$router.push('/info?productSn='+content.productSn)">
    <div class="img">
      <img :src="content.pic" />
    </div>
    <div class="f-item1">
      <p>{{content.name}}</p>
      <p class="tip">{{content.subTitle}}</p>
      <p class="price">
        <i>￥</i>
        {{content.price}}
      </p>
      <p class="planning" @click.stop="$router.push('/orderEdit?productSn='+content.productSn)">{{ $t('rooms.reserve')}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: Object
  }
};
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
      }
      &.price {
        color: #ff2a00;
        font-size: 20px;
        position: absolute;
        bottom: 3px;
        i {
          font-style: normal;
          font-size: 12px;
        }
      }
      &.planning {
        color: #ff2a00;
        position: absolute;
        bottom: 0px;
        right: 0px;
        padding: 5px 15px;
        border: 1px solid #ef8a50;
        border-radius: 20px;
      }
    }
  }
}
</style>

