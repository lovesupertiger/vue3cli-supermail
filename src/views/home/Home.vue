<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 class="tabControl"
                 ref="tabControl1"
                 v-show="isTabControlFixed" ></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommands :recommands="recommands"/>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl"></tab-control>
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
    created() {
      //在组建创建完毕后，执行的逻辑
      //1.请求获取多个数据
      this.getHomeMultidata();
      //商品操作：默认都加载第一页数据
      this.getHomeGoods('pop');
      this.getHomeGoods('news');
      this.getHomeGoods('sell');

    },
    mounted() {

    },
    methods: {
      /**
       * 图片加载监听事件
       */
      swiperImageLoad(){
        this.tabControlOffset = this.$refs.tabControl.$el.offsetTop
      },
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.backShow = position.y < -1000
        //2.决定TabControl是否吸顶(position: fixed)
        this.isTabControlFixed = position.y < -this.tabControlOffset;

      },
      loadMore(){
        this.getHomeGoods(this.currentType);
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
    },
    data() {
      return {
        backShow: false,
        tabControlOffset: 0,
        isTabControlFixed: false,
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

 /*   原生时使用该配置，使用scroll插件不需要使用
 position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;*/
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  .tabControl{
    position: relative;
    z-index: 9;
  }
</style>
