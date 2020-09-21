<template>
  <div class="swapper" ref="swapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      /**
       * 1.如果ref绑定的是一个组件，那么通过this.$refs.refName获取的则是一个组件
       * 2.如果ref绑定的是一个普通元素，那么通过this.$refs.refName获取的是一个普通元素
       */
      //1.创建对象
      this.scroll = new BScroll(this.$refs.swapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //2.实时监听滚动的位置
      this.scroll.on('scroll', (position)=>{
        this.$emit('scroll', position)
      })
      if(this.pullUpLoad){
        //3.上来加载更多数据
        this.scroll.on('pullingUp',()=>{
          this.pullingUp();
        })
      }

    },
    methods: {
      pullingUp(){
        this.$emit('pullingUp')
        this.finishPullUp();
        //因为图片异步加载问题，造成better-scroll计算加载区域不一致问题;需要在图片加载完毕后，refresh
        this.scroll.refresh();
      },
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
