<template>
  <div style="height:55px;">
    <div class="f-flex footer">
      <div class="item">
        <img slot="icon" src="@assets/server.png" />
        <p>{{ $t('infoLang.customerService')}}</p>
      </div>
      <div class="item" @click="$router.push('/car')">
        <img slot="icon" src="@assets/car-red.png" />
        <p>{{ $t('infoLang.cart')}}</p>
      </div>
      <div class="item">
        <mt-button class="btn orange" @click.native="addCar">{{ $t('infoLang.addCart')}}</mt-button>
      </div>
      <div class="item">
        <mt-button
          class="btn red"
          @click.native="$router.push('/orderEdit?productSn='+productSn)"
        >{{ $t('infoLang.reserve')}}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    productSn: {
      type: String,
      default: ""
    },
    cartCount:{
      type:String,
      default:"0"
    }
  },
  methods: {
    addCar() {
      let startDate = this.$U.getDateStr(this.datePicker.startValue);
      let endDate = this.$U.getDateStr(this.datePicker.endValue);
      this.$api
        .addCar({
          endDate: endDate,
          productSn: this.productSn,
          startDate: startDate
        })
        .then(res => {
          this.$toast({
            message: "加入购物车成功",
            iconClass: "icon icon-success"
          });
          this.getCartCount();
        });
    },
    getCartCount(){
      this.$api
      .getCartCount({})
      .then(res=>{
        this.cartCount=res.data
      })
    }
  },
  computed: {
    ...mapGetters(["datePicker"])
  }
};
</script>

<style lang="scss" scoped>
.cart-num {
  position: absolute;
  left: 155px;
  z-index: 27;
  color: rgb(255, 255, 255);
  background-color: rgba(238, 116, 89, 0.8);
  top: 0px;
  padding: 2px;
  border-radius: 12px;
  font-size: 12px;
  width: 12px;
  height: 13px;
}
.footer {
  position: fixed;
  background-color: #fff;
  border-top: 1px solid #c9c9c9;
  bottom: 0;
  width: 100%;
  text-align: center;
  .item {
    flex: 1;
    padding: 5px 0;
    margin-right: 3px;
    font-size: 12px;
    .btn {
      width: 100%;
      height: 100%;
      font-size: 14px;
      color: #fff;
      min-width: 100px;
      &.orange {
        background-color: #ff8e14;
      }
      &.red {
        background-color: #ff3237;
      }
    }
    img {
      width: 22px;
      height: 22px;
    }
  }
}
// .mint-tabbar {
//   position: fixed;
//   background-color: #fff;
//   border-top: 1px solid #c9c9c9;
//   /deep/.mint-tabbar > .mint-tab-item.is-selected {
//     background-color: transparent;
//     color: #ef8a50;
//   }
// }
</style>

