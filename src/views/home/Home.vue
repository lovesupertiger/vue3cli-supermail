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
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getCurrentY();
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
        saveY: 0,
        banners: [
          {
            link: '#',
            image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1"
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
            image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1"
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
                id: 1,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 299.99,
                cfav: 10890
              },
              {
                id: 2,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 3,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 4,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 5,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 6,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 7,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 8,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 9,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 10,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 11,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 12,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 13,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 14,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 15,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 16,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 17,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 18,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 19,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 20,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 21,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 22,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 23,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 24,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 25,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 26,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 27,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 28,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 29,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 30,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 31,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 32,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 33,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 34,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 35,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 36,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 37,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 38,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 39,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 40,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 41,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 42,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 43,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 44,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 45,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 46,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 47,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 48,
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
                id: 49,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 29.99,
                cfav: 10234
              },
              {
                id: 50,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 51,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 52,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 53,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 54,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 55,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 56,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 57,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 58,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 59,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 60,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 61,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 62,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 63,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 64,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 65,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 66,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 67,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 68,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 69,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 70,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 71,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 72,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 73,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 74,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 75,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 76,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 77,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 78,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 79,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 80,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 81,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 82,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 83,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 84,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 85,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 86,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 87,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 88,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 89,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 90,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 91,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 92,
                title: '商品4',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.jDsdA2q1goc4k0roAlklSwHaHa?pid=Api&rs=1",
                price: 22.8,
                cfav: 10
              },
              {
                id: 93,
                title: '商品1',
                link: '#',
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
                price: 100.0,
                cfav: 10
              },
              {
                id: 94,
                title: '商品2',
                link: '#',
                image: "http://5b0988e595225.cdn.sohucs.com/images/20190305/8c84b9660df14e729c8248890fa56ddc.jpeg",
                price: 100.0,
                cfav: 10
              },
              {
                id: 95,
                title: '商品3',
                link: '#',
                image: "http://pic.baike.soso.com/ugc/baikepic2/12533/20161228193621-1111035339.jpg/0",
                price: 99.99,
                cfav: 10
              },
              {
                id: 96,
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
                image: "https://tse2-mm.cn.bing.net/th/id/OIP.JtiIJvFf_yldeDMVGlL2GAHaLH?pid=Api&rs=1",
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
