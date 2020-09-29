<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import {mapGetters} from 'vuex';

  import CartList from "./components/CartList";
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['cartLength']),
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #f2f5f8;
  }
</style>
