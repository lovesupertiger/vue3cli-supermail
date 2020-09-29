<template>
    <div class="check-button" :class="{checked: isChecked}">
      <img src="~assets/img/cart/check.svg" alt=""/>
    </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border:2px solid #aaaaaa;
  }

  .checked{
    background-color: red;
    border-color: red;
  }
</style>
