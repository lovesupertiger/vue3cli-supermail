<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <ul>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
        <li>jini</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import DetailNavBar from "./components/DetailNavBar";
  import DetailSwiper from "./components/DetailSwiper";
  import DetailBaseInfo from "./components/DetailBaseInfo";

  import {getDetail, Goods} from "network/details";

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,

    },
    data() {
      return {
        id: null,
        topImages: [
          {
            link: '#',
            image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg"
          },
          {
            link: '#',
            image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg"
          },
          {
            link: '#',
            image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0"
          },
          {
            link: '#',
            image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1"
          },
        ],
        goods: {}
      }
    },
    created() {
      //1.保存ID
      this.id = this.$route.params.id;
      //2.根据ID获取详情信息
      getDetail(this.id).then(res => {

        this.goods = undefined === res ? {} : new Goods(res);
        console.log(this.goods);
      })
    }

  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
