<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--home-swiper存在问题-->
    <home-swiper :banners="banners"/>
    <home-recommands :recommands="recommands"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./components/HomeSwiper";
  import HomeRecommands from "./components/HomeRecommands";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommands
    },
    data() {
      return {
        banners: [
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
        recommands: [
          {
            title: '商品1',
            link: '#',
            image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg"
          },
          {
            title: '商品2',
            link: '#',
            image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg"
          },
          {
            title: '商品3',
            link: '#',
            image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0"
          },
          {
            title: '商品4',
            link: '#',
            image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1"
          },
        ],
      }
    },
    created() {
      //1.请求获取多个数据
      // getHomeMultidata().then(res => {
      //   this.banners = res.data.banner.list;
      //   this.recommands = res.data.recommand.list;
      // })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
