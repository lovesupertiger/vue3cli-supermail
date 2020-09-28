<template>
  <div class="recommand">
    <div v-for="item in recommands" class="recommand-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad"/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommands",
    props: {
      recommands: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data(){
      return {
        count: 0
      }
    },
    methods:{
      imgLoad(){
        if(++this.count == this.recommands.length){
          this.$emit('imgLoad')
        }
      }
    }
  }
</script>

<style scoped>
  .recommand {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 0 20px;
    border-bottom: 10px solid #eee;
  }

  .recommand-item {
    flex: 1;
  }
  .recommand-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
