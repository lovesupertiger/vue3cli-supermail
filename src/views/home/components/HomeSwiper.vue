<template>
  <div>
    <swiper >
      <swiper-item v-for="item in banners">
        <a :href="item.image">
          <img :src="item.image" alt="" @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper';

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
        if(!this.isLoad){
          this.isLoad = true;
          this.$emit("swiperImageLoad")
        }

      }
    },
    data(){
      return {
        isLoad: false
      }
    }
  }
</script>

<style scoped>
</style>
