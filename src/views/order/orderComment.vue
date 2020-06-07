<template>
  <div class="comment">
    <Header></Header>
    <commentShow
      v-show="commentShow"
      v-for="(x,index) in pmsCommentList"
      :key="index"
      :pmsComment="x"
    ></commentShow>
    <mt-field
      v-if="pmsCommentList.length==0"
      :placeholder="$t('orderComment.textareaPlaceholder1')"
      type="textarea"
      rows="4"
      v-model="content"
    ></mt-field>
    <mt-field v-else :placeholder="$t('orderComment.textareaPlaceholder2')" type="textarea" rows="4" v-model="content"></mt-field>
    <div class="upload" v-if="pmsCommentList.length==0">
      <div class="f-item3" v-for="x in picsToArray" :key="x">
        <div class="upload-box">
          <img preview="1" :src="x" alt />
        </div>
      </div>
      <div class="f-item3">
        <div class="upload-box">
          <input type="file" class="file" @change="uploadConfig" />
          <span>
            <i class="iconfont iconpicture_icon"></i>
            <i>{{ $t('orderComment.uploadPictures')}}</i>
          </span>
        </div>
      </div>
    </div>

    <div class="btn">
      <mt-button v-if="pmsCommentList.length==0" @click="submitComment">{{ $t('orderComment.btn1')}}</mt-button>
      <mt-button v-else @click="submitReplay">{{ $t('orderComment.btn2')}}</mt-button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      commentShow: false,
      content: "",
      pics: "",
      pmsCommentList: []
    };
  },
  components: {
    Header: () => import("@components/layout/Header"),
    commentShow: () => import("@components/commentShow")
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api
        .queryComment({
          productSn: this.$route.query.productSn,
          orderSn: this.$route.query.orderSn
        })
        .then(res => {
          this.pmsCommentList = res.data.list;
          if (this.pmsCommentList.length != 0) {
            this.commentShow = true;
          }
        });
    },
    submitComment() {
      this.$api
        .addPmsComment({
          content: this.content,
          pics: this.pics,
          orderSn: this.$route.query.orderSn,
          productSn: this.$route.query.productSn
        })
        .then(res => {
          this.$toast({
            message: "操作成功",
            iconClass: "icon icon-success"
          });
          this.$router.push("/orderForMe");
        });
    },
    submitReplay() {
      this.$api
        .addMsCommente({
          content: this.content,
          commentId: this.commentId
        })
        .then(res => {
          this.$toast({
            message: "操作成功",
            iconClass: "icon icon-success"
          });
          this.$router.push("/orderForMe");
        });
    },
    uploadConfig(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      this.$api.fileUpload(formData).then(res => {
        let imgUrl = res.data.host + ":" + res.data.fileName;
        if (this.pics == "") {
          this.pics = imgUrl;
        } else {
          this.pics = this.pics + "," + imgUrl;
        }
      });
    }
  },
  computed: {
    //图片转化数组形式
    picsToArray() {
      if (this.pics == "") {
        return [];
      } else {
        return this.pics.split(",");
      }
    },
    commentId(){
      if(this.pmsCommentList.length!=0){
        return this.pmsCommentList[0].id
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  background-color: #fff;
  /deep/ .mint-field.is-textarea {
    border-bottom: 1px solid #ccc;
  }

  .btn {
    padding: 10px 15px;
    background-color: #fff;
    /deep/ .mint-button {
      width: 100%;
      border-radius: 20px;
      background: linear-gradient(to right, #ee7459, #ef8a50); /* 标准的语法 */
      .mint-button-text {
        color: #fff;
      }
    }
  }

  .upload {
    background: #fff;
    overflow: hidden;
    margin-left: 10px;
    .f-item3 {
      float: left;
      margin-top: 10px;
    }
    .upload-box {
      position: relative;
      height: 90px;
      display: block;
      border: 1px solid #ccc;
      margin-right: 10px;
      input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 90px;
        height: 90px;
        z-index: 1;
      }
      > span {
        position: absolute;
        height: 50px;
        top: 50%;
        transform: translateY(-25px);
        text-align: center;
        display: inline-block;
        width: 100%;
        i {
          display: inline-block;
          width: 100%;
          color: #b7b7b7;
          &.iconfont {
            font-size: 20px;
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

