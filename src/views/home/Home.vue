<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <home-recommands :recommands="recommands"/>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--组件的点击事件，必须增加native修饰-->
    <back-top @click.native="backClick" v-show="backShow"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "./components/HomeSwiper";
  import HomeRecommands from "./components/HomeRecommands";
  import FeatureView from "./components/FeatureView";

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      HomeRecommands,
      FeatureView,
    },
    data() {
      return {
        backShow: false,
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
        goods: {
          pop: {
            page: 0, list: [
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 299.99,
                cfav: 10890
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              }
            ]
          },
          news: {
            page: 0, list: [
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 29.99,
                cfav: 10234
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              }
            ]
          },
          sell: {
            page: 0, list: [
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 599.99,
                cfav: 108
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                title: '商品1',
                link: '#',
                image: "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=88eef3d5d1c451dae2fb04b9d7943903/0b55b319ebc4b745d092dc9dc3fc1e178a821532.jpg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              }
            ]
          },
        },
        currentType: 'pop'
      }
    },
    created() {
      //在组建创建完毕后，执行的逻辑
      //1.请求获取多个数据
      this.getHomeMultidata()
      //商品操作：默认都加载第一页数据
      this.getHomeGoods('pop')
      this.getHomeGoods('news')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'news';
            break;
          case 2:
            this.currentType = 'sell';
            break;
          default:
            this.currentType = 'pop'
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        this.backShow = position.y < -1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp();
        //因为图片异步加载问题，造成better-scroll计算加载区域不一致问题;需要在图片加载完毕后，refresh
        this.$refs.scroll.scroll.refresh();
      },
      /**
       * 网络请求
       */
      getHomeMultidata() {
        // getHomeMultidata().then(res => {
        //   this.banners = res.data.banner.list;
        //   this.recommands = res.data.recommand.list;
        // })
      },
      getHomeGoods(type) {
        console.log('访问后端获取 '+type+' 数据')
        // const page = this.goods[type].page + 1;
        // getHomeGoods(type, page).then(res => {
        //   this.goods[type].list.push(...res.data.list);
        //   this.goods[type].page++;
        // })

      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
