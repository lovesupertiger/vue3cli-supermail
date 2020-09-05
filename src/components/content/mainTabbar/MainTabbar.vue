<template>
  <Tabbar>
    <TabbarItem path="/home">
      <img slot="item-icon" src="@/assets/img/tabbar/home.png" alt=""/>
      <img slot="item-icon-active" src="@/assets/img/tabbar/home_active.png" alt=""/>
      <div slot="item-text">首页</div>
    </TabbarItem>
    <TabbarItem path="/category">
      <img slot="item-icon" src="@/assets/img/tabbar/category.png" alt=""/>
      <img slot="item-icon-active" src="@/assets/img/tabbar/category_active.png" alt=""/>
      <div slot="item-text">分类</div>
    </TabbarItem>
    <TabbarItem path="/cart">
      <img slot="item-icon" src="@/assets/img/tabbar/cart.png" alt=""/>
      <img slot="item-icon-active" src="@/assets/img/tabbar/cart_active.png" alt=""/>
      <div slot="item-text">购物车</div>
    </TabbarItem>
    <TabbarItem path="/profile">
      <img slot="item-icon" src="@/assets/img/tabbar/user.png" alt=""/>
      <img slot="item-icon-active" src="@/assets/img/tabbar/user_active.png" alt=""/>
      <div slot="item-text">我的</div>
    </TabbarItem>
  </Tabbar>
</template>

<script>
  import Tabbar from "components/common/tabbar/Tabbar";
  import TabbarItem from "components/common/tabbar/TabbarItem";
  export default {
    name: "MainTabbar",
    components:{
      Tabbar,
      TabbarItem
    }
  }
</script>

<style scoped>

</style>
