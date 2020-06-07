<template>
  <div class="goods">
    <div class="swipe">
      <mt-swipe
        :auto="0"
        :show-indicators="false"
        @change="handleChange"
        style="height:175px;background:#f2f2f2;"
      >
        <mt-swipe-item v-for="(x,index) in product.pic" :key="index">
          <img :src="x" preview="1" />
        </mt-swipe-item>
      </mt-swipe>
      <div class="tip">
        <i class="iconfont iconpicture_icon"></i>
        <span>{{picCurIndex}}/{{product.pic!=null?product.pic.length:1}}</span>
      </div>
    </div>
    <div class="cont">
      <div class="title">{{product.name}}</div>
      <div class="sub-title">
        <span>{{basicDescription.cont}}</span>
      </div>
      <div class="sub-title">
        <span class="sub">
          <span>{{ $t('infoLang.priceForDay')}}:</span>
          <span class="price">
            <i>￥</i>
            {{product.price}}
          </span>
        </span>
        <span class="sub">
          <span>{{ $t('infoLang.deposit')}}:</span>
          <span class="price">
            <i>￥</i>
            {{product.cashpledge}}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      product: {},
      pic: [],
      picCurIndex: 1
    };
  },
  props: {
    pmsProduct: Object,
    basicDescription: Object
  },
  watch: {
    pmsProduct(cur) {
      this.product = cur;
      this.product.pic = cur.pic.split(",");
    }
  },
  methods: {
    handleChange(index) {
      this.picCurIndex = index + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  background-color: #fff;
  .swipe {
    position: relative;
    .tip {
      padding: 5px 10px;
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #fff;
      background: rgba(0, 0, 0, 0.75);
      .iconfont {
        font-size: 16px;
      }
    }
  }
  .cont {
    padding: 10px 20px;
    line-height: 1.5;
    .sub-title {
      font-size: 12px;
      color: #7b7b7b;
      .sub {
        & + .sub {
          padding-left: 20px;
        }
        .price {
          color: #ff2a00;
          font-size: 20px;
          padding-left: 15px;
          i {
            font-style: normal;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>

