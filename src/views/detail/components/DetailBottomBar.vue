<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods:{
      addToCart(){
        this.$emit('addToCart');
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: relative;
    display: flex;
    text-align: center;
    background-color: #f2f5f8;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item > div {
    flex: 1;
  }

  .bar-item .text {
    font-size: 12px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 3px auto -6px;
    /*background: url("") 0 0/100%;*/
  }

  .bar-left .text {
    font-size: 8px;
  }

  .bar-left .service {
    background-position: 0 -54px;
  }

  .bar-left .shop {
    background-position: 0 -98px;
  }

  .bar-right {
    font-size: 13px;
    color: #ffffff;
    line-height: 40px;
  }
  .bar-right .cart {
    background-color: #db0650;
  }

  .bar-right .buy {
    background-color: #e85d11;
  }

  .sport-ball {
    position: absolute;
    left: 225px;
    bottom: 20px;
  }

</style>
