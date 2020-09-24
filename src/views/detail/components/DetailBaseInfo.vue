<template>
  <div v-if="Object.keys(goods).length!==0" class="base-info">
    <div class="title">{{goods.title}}</div>
    <div class="price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="other">
      <span>{{goods.column[0]}}</span>
      <span>{{goods.column[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="service">
      <span class="service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .title {
    color: #222;
  }

  .price {
    margin-top: 10px;
  }

  .price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .price .o-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;

  }

  .discount {

  }

  .other {

  }

  .service {

  }

  .service-item {

  }
</style>
