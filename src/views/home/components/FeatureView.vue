<template>
  <div class="feature">
    <div class="title">本周流行</div>
    <a href="https://act.mogujie.com/zzlx67">
      <img src="http://img9.3lian.com/c1/vector3/01/03/d/59.jpg" alt="" @load="imgLoad">
    </a>
  </div>
</template>

<script>
  export default {
    name: "FeatureView",
    methods:{
      imgLoad(){
        this.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped>
  .feature .title {
    width: 100%;
    text-align: center;
  }

  .feature img {
    width: 100%;
  }
</style>
