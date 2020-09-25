<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import DetailNavBar from "./components/DetailNavBar";
  import DetailSwiper from "./components/DetailSwiper";
  import DetailBaseInfo from "./components/DetailBaseInfo";
  import DetailGoodsInfo from "./components/DetailGoodsInfo";
  import DetailParamInfo from "./components/DetailParamInfo";

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailParamInfo
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
          title: '衣服',
          newPrice: 59.9,
          oldPrice: 159.9,
          discount: '十一促销',
          column: ['销量 100W','收藏1000人'],
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
        detailInfo: {
          desc: '商品详情',
          detailImage: [
            {
              key: '系列一', list: [
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
              ['尺码', 'M', 'L'],
              ['衣长', '61.5', '63'],
              ['胸围', '93', '104']
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
      }
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    },
    created() {
      //1.保存ID
      this.id = this.$route.params.id;
      //2.根据ID获取详情信息
      // getDetail(this.id).then(res => {
      //   this.goods = undefined === res ? {} : new Goods(res);
      // })
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

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
