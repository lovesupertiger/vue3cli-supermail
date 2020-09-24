<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchEnd" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item,index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}"
             :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      interval: {
        type: Number,
        default: 3000
      },
      animDuration: {
        type: Number,
        default: 300
      },
      moveRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        slideCount: 0, //元素个数
        totalWidth: 0, //swiper的宽度
        swiperStyle: {}, //swiper的样式
        currentIndex: 1, //当前的index
        scrolling: false, //是否正在滚动
      }
    },
    created() {
      setTimeout(() => {
        //1. 操作DOM，在前后添加Slide
        this.handleDom();
        //2.开启定时器
        this.startTimer();
      }, 1000)
    },
    methods: {
      /**
       * 定时器操作
       */
      startTimer() {
        this.playTimer = window.setInterval(() => {
          this.currentIndex++;
          this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
      stopTimer() {
        window.clearInterval(this.playTimer)
      },
      /**
       * 滚动到正确的位置
       * @param currentPosition
       */
      scrollContent(currentPosition) {
        //0.设备正在滚动
        this.scrolling = true;
        //1.开始滚动画面
        this.swiperStyle.transform = 'transform ' + this.animDuration + 'ms';
        this.setTransform(currentPosition);

        //2.判断滚动到的位置
        this.checkPosition();
        //3.滚动完毕
        this.scrolling = false;
      },
      /**
       * 检测正确的位置
       */
      checkPosition() {
        window.setTimeout(() => {
          //1.校正正确的位置
          this.swiperStyle.transform = '0ms';
          if (this.currentIndex >= this.sliCount + 1) {
            this.currentIndex = 1;
            this.setTransform(-this.currentIndex * this.totalWidth);
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.sliCount;
            this.setTransform(-this.currentIndex * this.totalWidth)
          }
          //2.结束移动后的回调
          this.$emit('transitionEnd', this.currentIndex - 1);
        }, this.animDuration)
      },
      /**
       * 设置的滚动位置
       * @param position
       */
      setTransform(position) {
        this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px,0,0)`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px,0,0)`;
      },
      /**
       * 操作DOM，在DOM前后添加Slide
       */
      handleDom() {
        //1.获取要操作的元素
        let swiperE1 = document.querySelector('.swiper');
        let slidesE1s = swiperE1.getElementsByClassName('slide');
        //2.保存个数
        this.slideCount = slidesE1s.length;
        //3.如果>1,那么在前后分别添加slide
        if (this.slideCount > 1) {
          let cloneFirst = slidesE1s[0].cloneNode(true);
          let cloneLast = slidesE1s[this.slideCount - 1].cloneNode(true);
          swiperE1.insertBefore(cloneLast, slidesE1s[0]);
          swiperE1.appendChild(cloneFirst);
          this.totalWidth = swiperE1.offsetWidth;
        }
        //4.让swiper元素，显示一个（目前是显示前面添加的最后一个元素）
        this.setTransform(-this.totalWidth);
      },
      touchStart(e) {
        //1.如果正在滚动，不可拖动
        if (this.scrolling) return;
        //2.停止定时器
        this.stopTimer();
        //3.保存开始滚动的位置
        this.startx = e.touches[0].pageX;
      },
      touchMove(e) {
        //1.计算出用户拖动的距离
        this.currentx = e.touches[0].pageX;
        this.distance = this.currentx - this.startx;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;

        //2.设置当前的位置
        this.setTransform(moveDistance);
      },
      touchEnd(e) {
        //1.获取移动的距离
        let currentMove = Math.abs(this.distance);

        //2.判断最终的距离
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
          //右边距离超过0.5
          this.currentIndex--;
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
          //左边距离查过0.5
          this.currentIndex++
        }
        //3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        //4.移动完成后重新开始定时器
        this.startTimer();
      },
      changeItem(num) {
        //1.移除定时器
        this.stopTimer();
        //2.修改index和位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        //3.添加定时器
        this.startTimer();
      }
    }
  }
</script>

<style scoped>
  /*缺少样式*/
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
    height: 128px;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item .active {
    background-color: rgba(212, 62, 46, 1.0);
  }
</style>
