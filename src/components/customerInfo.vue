<template>
  <div>
    <div class="btn">
      <mt-button
        v-for="(x,index) in memberList"
        :key="index"
        :class="{'is-selected':x.check}"
        @click.native="changeCheck(x)"
      >
        <i v-if="x.check" class="iconfont icongou"></i>
        {{x.name}}
      </mt-button>
      <div class="tips" v-if="memberList.length==0">{{ $t('customerInfo.tip')}}</div>
      <mt-button class="more" @click.native="modifyInfo()">
        <i class="iconfont iconjia"></i>{{ $t('customerInfo.add')}}
      </mt-button>
    </div>
    <div class="info" v-for="(x,index) in memberList" :key="index" v-show="x.check">
      <p class="tit" @click="modifyInfo(x)">
        <i class="iconfont iconjian" @click.stop="deleteInfo(x)"></i>
        {{x.name}}
        <i class="allow-right"></i>
      </p>
      <p class="cont">
        <span class="hd">{{ $t('customerInfo.id')}}</span>
        <span class="bd">{{x.idCard|filterIdCard}}</span>
      </p>
      <p class="cont">
        <span class="hd">{{ $t('customerInfo.phone')}}</span>
        <span class="bd">{{x.phoneNumber|filterPhone}}</span>
      </p>
      <p class="cont" v-if="showInvoice">
        <span class="hd">{{ $t('customerInfo.invoice')}}</span>
        <span class="bd">{{ $t('customerInfo.invoiceExplain')}}</span>
      </p>
    </div>
    <transition name="slide-fade">
      <div class="filed" v-if="showFiled">
        <div class="title">
          <span class="lf" @click="showFiled=false">{{ $t('customerInfo.cancel')}}</span>
          <span>{{fieldTitle}}</span>
          <span class="rt" @click="submitFeild()">{{ $t('customerInfo.ok')}}</span>
        </div>
        <mt-field :label="$t('customerInfo.name')" :placeholder="$t('customerInfo.namePlaceholder')" v-model.trim="info.name" :state="nameState"></mt-field>
        <mt-field :label="$t('customerInfo.id')" :placeholder="$t('customerInfo.idPlaceholder')" v-model.trim="info.idCard" :state="idCardState"></mt-field>
        <mt-field
          :label="$t('customerInfo.phone')"
          :placeholder="$t('customerInfo.phonePlaceholder')"
          type="tel"
          v-model.trim="info.phoneNumber"
          :state="phoneState"
        ></mt-field>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  data() {
    return {
      showFiled: false,
      fieldTitle: "",
      memberList: [],
      info: {},
      nameState: "",
      idCardState: "",
      phoneState: ""
    };
  },
  props: {
    showInvoice: Boolean
  },
  watch: {
    showFiled(cur) {
      if (!cur) {
        //还原验证状态
        this.nameState = "";
        this.idCardState = "";
        this.phoneState = "";
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.memberList({}).then(res => {
        this.memberList = res.data;
      });
    },
    changeCheck(x) {
      this.$set(x, "check", !x.check);
    },
    modifyInfo(x) {
      this.showFiled = false;
      setTimeout(() => {
        this.showFiled = true;
      }, 100);
      if (x == null) {
        this.info = {};
        this.fieldTitle = "新增住户人信息";
      } else {
        this.info = Object.assign({}, x);
        this.fieldTitle = "修改住户人信息";
      }
    },
    submitFeild() {
      let name = this.info.name;
      let idCard = this.info.idCard;
      let phoneNumber = this.info.phoneNumber;
      //验证
      if (!this.$U.validator.name(name)) {
        this.nameState = "error";
        return false;
      }
      if (!this.$U.validator.idCard(idCard)) {
        this.idCardState = "error";
        return false;
      }

      if (!this.$U.validator.phone(phoneNumber)) {
        this.phoneState = "error";
        return false;
      }
      //验证通过
      this.nameState = "success";
      this.idCardState = "success";
      this.phoneState = "success";
      //修改
      if (this.info.id != null) {
        this.$api
          .memberUpdate({
            id: this.info.id,
            name,
            idCard,
            phoneNumber
          })
          .then(res => {
            // this.getData();
            //修改数据
            let memberList = this.memberList;
            memberList.forEach((x, index) => {
              if (x.id == this.info.id) {
                x.name = name;
                x.idCard = idCard;
                x.phoneNumber = phoneNumber;
              }
            });
            this.showFiled = false;
            this.$toast({
              message: "操作成功",
              iconClass: "icon icon-success"
            });
          });
      } else {
        //新增
        this.$api
          .memberAdd({
            name,
            idCard,
            phoneNumber
          })
          .then(res => {
            // this.getData();
            //修改数据
            let memberList = this.memberList;
            memberList.push({
              id: res.data.id,
              name,
              idCard,
              phoneNumber
            });
            this.showFiled = false;
            this.$toast({
              message: "操作成功",
              iconClass: "icon icon-success"
            });
          });
      }
    },
    deleteInfo(x) {
      this.$api
        .memberDelete({
          id: x.id
        })
        .then(res => {
          // this.getData();
          //修改数据
          this.memberList = this.memberList.filter(item => item.id != x.id);
          this.$toast({
            message: "操作成功",
            iconClass: "icon icon-success"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  background-color: #fff;

  .mint-button {
    border: 1px solid #d8d8d8;
    padding: 0 20px;
    background-color: #fff;
    margin: 5px 20px;
    margin-right: 0;
    font-size: 14px;
  }

  .is-selected {
    color: #ff2a00;
    border: 1px solid #ff2a00;
    .iconfont {
      position: absolute;
      bottom: -11px;
      background-color: red;
      color: #fff;
      right: -7px;
      width: 30px;
      height: 20px;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-30deg);
      font-size: 18px;
      &:before {
        position: absolute;
        left: 10px;
        top: -5px;
        transform: rotate(30deg);
      }
    }
  }
  .tips {
    color: #b7b7b7;
    padding: 5px 20px;
  }
  .more {
    color: #ff2a00;
    .iconfont {
      position: relative;
      font-size: 16px;
      top: 1px;
    }
  }
}

.info {
  background-color: #fff;
  & + .info {
    border-top: 1px solid #f2f2f2;
  }
  .tit {
    position: relative;
    font-size: 20px;
    padding: 10px 20px;
    .iconfont {
      padding-right: 10px;
      font-size: 20px;
      color: #ff2a00;
    }
  }
  .cont {
    display: flex;
    line-height: 1.2;
    padding: 10px;
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
  }
}
.filed {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 99;
  background-color: #fff;
  font-size: 14px;
  .title {
    position: relative;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    text-align: center;
    overflow: hidden;
    background: #d8d8d8;
    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    .lf,
    .rt {
      position: absolute;
      width: 50px;
      height: 30px;
      line-height: 30px;
      top: 50%;
      margin-top: -15px;
      border-radius: 5px;
    }
    .lf {
      border: 1px solid #ccc;
      left: 20px;
      background-color: #fff;
    }
    .rt {
      right: 20px;
      color: #fff;
      background-color: #ff2a00;
    }
  }

  /deep/ .mint-cell-wrapper {
    padding: 0 20px;
  }
  /deep/ .mint-field .mint-cell-title {
    width: 80px;
    font-size: 14px;
  }
  /deep/ .mint-field-core {
    font-size: 14px;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(200px);
  opacity: 0;
}
</style>
