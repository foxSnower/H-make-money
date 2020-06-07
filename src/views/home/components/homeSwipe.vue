<template>
  <mt-swipe :auto="4000" :show-indicators="false" style="height:175px">
    <mt-swipe-item v-for="(x,index) in advertiseList" :key="index" >
      <img :src="x.pic" @click="$router.push('/info?productSn='+x.productSn)" />
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  props: {
    advertiseList: Array
  },
};
</script>
