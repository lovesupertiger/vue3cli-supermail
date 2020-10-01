<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-all"
                    :is-checked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calulate" @click="calClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.$store.getters.cartList.forEach(item=> item.checked=false);
        }else{
          this.$store.getters.cartList.forEach(item=> item.checked=true);
        }
      },
      calClick(){
        if(!this.isSelectAll){
          this.$toast.show("请选择商品", 1500);
        }
      }
    },
    computed: {
      totalPrice() {
        return this.$store.getters.cartList.filter(item => item.checked).reduce((pre, item) => {
          return pre + item.price * item.count;
        }, 0).toFixed(2);
      },
      checkLength() {
        return this.$store.getters.cartList.filter(item => item.checked).length;
      },
      isSelectAll() {
        if (this.$store.getters.cartList.length == 0) {
          return false;
        }
        return !this.$store.getters.cartList.filter(item => !item.checked).length;
      }
    }
  }
</script>

<style scoped>

  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eeeeee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-all {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calulate {
    width: 90px;
    background-color: red;
    color: #eeeeee;
    text-align: center;
    font-size: 12px;
  }
</style>
