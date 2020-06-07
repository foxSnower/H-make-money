<template>
  <div class="comment">
    <div class="visitor">
      <span class="img">
        <img :src="pmsComment.memberIcon" />
      </span>
      <span class="name">{{pmsComment.memberNickName}}</span>
      <span class="time">{{pmsComment.createTime}}</span>
    </div>
    <div class="detail">
      <p>{{pmsComment.content}}</p>
      <p class="img-box">
        <span class="f-item3" v-for="(x,index) in pmsCommentPics" :key="index">
          <span class="img">
            <img :preview="pmsComment.id" :src="x" alt />
          </span>
        </span>
      </p>
    </div>
    <div
      class="tip"
      v-if="pmsComment.replayCount>=1&&pmsCommentReplayList.length==0"
      @click="showReplay(pmsComment.id)"
    >
      {{ $t('infoComments.open')}} {{pmsComment.replayCount}} {{ $t('infoComments.reply')}}
      <i class="iconfont iconbelow-s"></i>
    </div>
    <div class="replay" v-for="(y,index) in pmsCommentReplayList" :key="index">
      {{y.type==1?$t('infoComments.businessReply'):y.memberNickName}}
      <span>{{y.content}}</span>
      <!-- <p class="img-box">
        <span class="f-item3">
          <span class="img">
            <img preview="1" src="@assets/demo.jpg" alt />
          </span>
        </span>
        <span class="f-item3">
          <span class="img">
            <img preview="1" src="@assets/demo.jpg" alt />
          </span>
        </span>
        <span class="f-item3">
          <span class="img">
            <img preview="1" src="@assets/demo.jpg" alt />
          </span>
        </span>
        <span class="f-item3">
          <span class="img">
            <img preview="1" src="@assets/demo.jpg" alt />
          </span>
        </span>
      </p>-->
      <p class="time">{{y.createTime}}</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      pmsCommentReplayList: []
    };
  },
  props: {
    pmsComment: Object
  },
  methods: {
    showReplay(commentId) {
      this.$api
        .queryCommentReplay({
          commentId
        })
        .then(res => {
          this.pmsCommentReplayList = res.data;
        });
    }
  },
  computed: {
    //评论者的图片数组
    pmsCommentPics() {
      if (this.pmsComment.pics != null) {
        return this.pmsComment.pics.split(",");
      } else {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  background-color: #fff;
  padding: 15px 20px;
  & + .comment {
    border-top: 1px solid #efefef;
  }
  .visitor {
    overflow: hidden;
    line-height: 40px;
    height: 40px;

    .img {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      overflow: hidden;
    }
    .name {
      display: inline-block;
      vertical-align: top;
    }
    .time {
      float: right;
      color: #7b7b7b;
    }
  }
  .detail {
    line-height: 1.2;
    color: #7b7b7b;
    text-align: justify;
    overflow: hidden;
    padding-top: 20px;
  }
  .tip {
    font-size: 12px;
    color: #7b7b7b;
  }
  .replay {
    text-align: justify;
    padding-top: 10px;
    padding-left: 20px;
    > span {
      color: #7b7b7b;
    }
    .time {
      text-align: right;
      font-size: 12px;
      color: #7b7b7b;
      padding: 5px 0;
    }
  }
}

.img-box {
  width: 100%;
  overflow: hidden;
  .f-item3 {
    float: left;
    display: block;
    overflow: hidden;
    margin-top: 10px;
    font-size: 0;
    .img {
      margin-right: 10px;
      display: inline-block;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
