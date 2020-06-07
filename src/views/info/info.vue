<template>
  <div>
    <infoHeader :productSn="pmsProduct.productSn"></infoHeader>
    <div style="height:50px;">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" v-anchor="1">{{ $t('infoLang.introduction')}}</mt-tab-item>
        <mt-tab-item id="2" v-anchor="2">{{ $t('infoLang.details')}}</mt-tab-item>
        <mt-tab-item id="3" v-anchor="3">{{ $t('infoLang.evaluate')}}</mt-tab-item>
      </mt-navbar>
    </div>
    <infoIntroduce id="anchor-1" :pmsProduct="pmsProduct" :basicDescription="basicDescription"></infoIntroduce>
    <infoService :serviceExplain="serviceExplain"></infoService>
    <div class="module" id="anchor-2">
      <p class="tit">{{ $t('infoLang.description')}}</p>
      <p class="detail">{{houseDescribe.cont}}</p>
    </div>
    <div class="module" id="anchor-3">
      <p class="tit">{{ $t('infoLang.comments')}}</p>
      <template v-if="pmsComment!=null">
        <commentShow :pmsComment="pmsComment"></commentShow>
        <p class="ft" @click="$router.push('/infoComments?productSn='+pmsComment.productSn)">{{ $t('infoLang.seeMore')}}</p>
      </template>
      <div class="detail" v-else >{{ $t('infoLang.noComment')}}</div>
    </div>
    <div class="module">
      <p class="tit">{{ $t('infoLang.facilities')}}</p>
      <p class="detail">
        <span class="icon" v-for="(x,index) in basicFacility" :key="index">
          <img :src="x.albumPics" alt />
          <i>{{x.content}}</i>
        </span>

        <span
          class="icon more"
          @click="$router.push({name:'infoFacilities',params:{supportingFacility}})"
          v-if="supportingFacilityLength>7"
        >
          <i>{{supportingFacilityLength}}</i>
          <i>{{ $t('infoLang.moreFacilities')}}</i>
        </span>
      </p>
    </div>
    <div class="module">
      <p class="tit">{{ $t('infoLang.date')}}</p>
      <datePicker style="padding-bottom:20px;" :maxSaleTime="pmsProduct.maxSaleTime"></datePicker>
    </div>
    <div class="module">
      <p class="tit">{{ $t('infoLang.admission')}}</p>
      <p class="cont" v-for="(x,index) in checkinKnow" :key="index">
        <span class="hd">{{x.name}}：</span>
        <span class="bd" v-if="x.contType=='String'">{{x.cont}}</span>
        <span class="bd" v-if="x.contType=='Object'">
          <span
            class="icon"
            v-for="(y,indexY) in x.contList"
            :key="indexY"
            style="text-align: left"
          >
            <i v-if="y.isAllow==0" class="iconfont iconerror"></i>
            <i v-else class="iconfont icongou"></i>
            <i>{{y.content}}</i>
          </span>
        </span>
      </p>
    </div>
    <div class="module">
      <p class="tit">{{ $t('infoLang.services')}}</p>
      <p class="cont" v-for="(x,index) in additionalServices" :key="index">
        <span class="hd">{{x.name}}：</span>
        <span class="bd">{{x.cont}}</span>
      </p>
    </div>
    <div class="module">
      <p class="tit">{{ $t('infoLang.policy')}}</p>
      <p class="detail" style="padding-bottom:20px;">{{withdrawalPolicy.cont}}</p>
    </div>
    <infoFooter :productSn="productSn" :cartCount="cartCount"></infoFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "1",
      basicDescription: {}, //基本描述
      pmsProduct: {}, //商品信息
      serviceExplain: {}, //服务说明
      houseDescribe: {}, //房屋描述
      pmsComment: {}, //住客评论
      supportingFacility: [], //配套设施
      checkinKnow: [], //入住须知
      additionalServices: [], //额外服务
      withdrawalPolicy: [], //退订政策
      cartCount:Object
    };
  },
  components: {
    infoFooter: () => import("./components/infoFooter"),
    infoHeader: () => import("./components/infoHeader"),
    infoIntroduce: () => import("./components/infoIntroduce"),
    commentShow: () => import("@components/commentShow"),
    infoService: () => import("./components/infoService"),
    datePicker: () => import("@components/datePicker")
  },
  mounted() {
    this.getData();
    this.getCartCount();
  },
  methods: {
    getData() {
      this.$api
        .getProduct({
          productSn: this.$route.query.productSn
        })
        .then(res => {
          this.basicDescription = res.data.basicDescription;
          this.pmsProduct = res.data.pmsProduct;
          this.serviceExplain = res.data.serviceExplain;
          this.houseDescribe = res.data.houseDescribe;
          this.pmsComment = res.data.pmsComment;
          this.supportingFacility = res.data.supportingFacility;
          this.checkinKnow = res.data.checkinKnow;
          this.additionalServices = res.data.additionalServices;
          this.withdrawalPolicy = res.data.withdrawalPolicy;
        });
    },
    getCartCount(){
      this.$api
        .getCartCount({}).then(res=>{
          this.cartCount=res.data.toString();
        });
    }
  },
  computed: {
    basicFacility() {
      let supportingFacility = this.supportingFacility;
      let length = supportingFacility.length;
      let basicFacility = [];
      for (let i = 0; i < length; i++) {
        if (supportingFacility[i].name == "基础设施") {
          basicFacility = supportingFacility[i].contList;
          return basicFacility;
        }
      }
      return basicFacility;
    },
    //配套设施数量
    supportingFacilityLength() {
      let supportingFacility = this.supportingFacility;
      let length = supportingFacility.length;
      let total = 0;
      for (let i = 0; i < length; i++) {
        total += supportingFacility[i].contList.length;
      }
      return total;
    },
    productSn() {
      return this.pmsProduct.productSn;
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-navbar {
  position: fixed;
  width: 100%;
  z-index: 10;
  /deep/ .mint-tab-item.is-selected {
    border-bottom: 3px solid #ff2a00;
    color: #ff2a00;
    margin-bottom: -1px;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
  /deep/ .mint-tab-item-label {
    font-size: 14px;
  }
}

.module {
  background-color: #fff;
  & + .module {
    margin-top: 10px;
  }
  .tit,
  .detail,
  .ft {
    padding: 10px 20px;
  }
  .tit {
    font-weight: 700;
    font-size: 20px;
  }
  .detail {
    line-height: 1.2;
    color: #7b7b7b;
    text-align: justify;
    overflow: hidden;
  }

  .ft {
    color: #ff2a00;
    text-align: center;
    padding-bottom: 20px;
  }
  .icon {
    display: inline-block;
    float: left;
    width: 25%;
    padding: 5px 0;
    color: #7b7b7b;
    text-align: center;
    i {
      font-style: normal;
      display: inline-block;
      width: 100%;
    }
    &.more {
      color: #ff2a00;
    }
  }

  .cont {
    display: flex;
    line-height: 1.2;
    padding: 5px 20px;
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
      .icon {
        padding: 0;
        width: 50%;
        i {
          width: auto;
          display: inline-block;
        }
      }
    }
  }
}
</style>

