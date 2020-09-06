<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }

  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap; /*根据子项宽度，适配一行显示几个*/
    justify-content: space-around; /*均等份*/
  }

</style>
