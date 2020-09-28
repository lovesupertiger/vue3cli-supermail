<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="DetailNavbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="paramInfo"></detail-param-info>
      <detail-comment-info :comment="commentInfo" ref="commentInfo"></detail-comment-info>
      <goods-list :goods="recommands" ref="recommands"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="backShow"/>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import DetailNavBar from "./components/DetailNavBar";
  import DetailSwiper from "./components/DetailSwiper";
  import DetailBaseInfo from "./components/DetailBaseInfo";
  import DetailShopInfo from "./components/DetailShopInfo";
  import DetailGoodsInfo from "./components/DetailGoodsInfo";
  import DetailParamInfo from "./components/DetailParamInfo";
  import DetailCommentInfo from "./components/DetailCommentInfo";
  import DetailBottomBar from "./components/DetailBottomBar";

  export default {
    name: "Detail",
    components: {
      Scroll,
      GoodsList,
      BackTop,

      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar
    },
    data() {
      return {
        id: null,
        topImages: [
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
        goods: {
          title: '2020春秋冬白色休闲西装，圆领韩版修身百搭',
          newPrice: 59.9,
          oldPrice: 159.9,
          discount: '十一促销',
          discountBgColor: '#FFB200FE',
          column: ['销量 100W', '收藏1000人'],
          services: [
            {name: '退货补运费', icon: 'http://p0.ifengimg.com/a/2019_16/9c4a1898c4155f9_size376_w750_h1000.jpg'},
            {name: '全国包邮', icon: 'http://p0.ifengimg.com/a/2019_16/9c4a1898c4155f9_size376_w750_h1000.jpg'},
            {name: '7天无理由退货', icon: 'http://p0.ifengimg.com/a/2019_16/9c4a1898c4155f9_size376_w750_h1000.jpg'},
            {
              name: '退货补运费',
              icon: 'http://p0.ifengimg.com/a/2019_16/9c4a1898c4155f9_size376_w750_h1000.jpg'
            },
          ]
        },
        shop: {
          shopLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/768px-WordPress_blue_logo.svg.png',
          name: '碧凌殿',
          sellsCount: 100000,
          goodsCount: 400,
          score: [
            {'name': '描述相符', score: 4.96, isBetter: true},
            {'name': '价格合理', score: 5, isBetter: true},
            {'name': '质量满意', score: 4.96, isBetter: true},
          ]
        },
        detailInfo: {
          desc: '韩版休闲男装，网红服装',
          detailImage: [
            {
              key: '穿着效果', list: [
                'https://uploadfile.bizhizu.cn/up/5a/6a/3b/5a6a3bd2d5e6f1f1e62f21375da8d85a.jpg',
                'https://uploadfile.bizhizu.cn/up/5a/6a/3b/5a6a3bd2d5e6f1f1e62f21375da8d85a.jpg',
                'https://uploadfile.bizhizu.cn/up/5a/6a/3b/5a6a3bd2d5e6f1f1e62f21375da8d85a.jpg'
              ]
            },
            {
              key: '设计工艺', list: [
                'https://uploadfile.bizhizu.cn/up/5a/6a/3b/5a6a3bd2d5e6f1f1e62f21375da8d85a.jpg',
                'https://uploadfile.bizhizu.cn/up/5a/6a/3b/5a6a3bd2d5e6f1f1e62f21375da8d85a.jpg',
                'https://uploadfile.bizhizu.cn/up/5a/6a/3b/5a6a3bd2d5e6f1f1e62f21375da8d85a.jpg'
              ]
            }
          ]
        },
        paramInfo: {
          sizes: [
            [
              ['尺码', 'M', 'L', 'XL', 'XXL', 'XXXL'],
              ['衣长', '61.5', '63', '65', '70', '75'],
              ['胸围', '93', '104', '120', '150', '190']
            ],
          ],
          infos: [
            {key: '图案', value: '宫廷复古'},
            {key: '厂名', value: 'xxx有限公司'},
            {key: '颜色', value: '乳白'},
            {key: '袖型', value: '常规袖'},
          ],
          image: ''
        },
        commentInfo: {
          user: {
            avatar: 'http://img.mm4000.com/file/f/9c/31033dd2de.jpg',
            uname: 'jin'
          },
          content: '交警对方那里可是家里都放假了受到警方介绍了KDJ富士康老地方水电费世界的看法奇偶数DNF，上帝就发撕开你的看法就是看到减肥',
          created: new Date().getTime(),
          style: '',
          images: [
            'https://tse1-mm.cn.bing.net/th/id/OIP.bHMi15X34Cr7lY3tJ8BeBwHaEK?pid=Api&rs=1',
            'https://photo.tuchong.com/7037489/f/38780868.jpg',
            'https://tse4-mm.cn.bing.net/th/id/OIP.VTRY5Pz7yd7FMu2sTAzrswHaJ4?pid=Api&rs=1'
          ]
        },
        recommands: [
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
        ],
        themeTopYs: [],
        currentIndex: 0,
        backShow: false
      }
    },
    methods: {
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      imageLoad() {
        this.$refs.scroll.refresh();
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop - 30);
        this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop - 30);
        this.themeTopYs.push(this.$refs.recommands.$el.offsetTop - 30);
        this.themeTopYs.push(Number.MAX_VALUE);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
      },
      contentScroll(position) {
        //判读回到顶部按钮是否显示
        this.backShow = position.y < -1000

        //滚动时自动适配Navbar
        const y = -position.y;
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if (this.currentIndex != i && y >= this.themeTopYs[i] && y<this.themeTopYs[i+1]) {
            this.currentIndex = i;
            this.$refs.DetailNavbar.currentIndex = this.currentIndex;
          }
        }
      },
    },
    created() {
      //1.保存ID
      this.id = this.$route.params.id;
      //2.根据ID获取详情信息
      // getDetail(this.id).then(res => {
      //   this.goods = undefined === res ? {} : new Goods(res);
      // })
    },
    mounted() {
      let count = this.recommands.length;
      let index = 0;
      //从事件总线中获取事件
      this.$bus.$on('imageLoad', () => {
        if (++index === count) {
          this.$refs.scroll.refresh();
        }
      })
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
