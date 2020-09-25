<template>
 <div>
   <NavBar>
     <div slot="left" class="back" @click="back">
       <img src="~assets/img/common/arrow-left.svg" alt=""/>
     </div>
     <div slot="center" class="title">
       <div v-for="(item,index) in titles"
            class="title-item"
            :class="{active: index===currentIndex}"
            @click="itemClick(index)">
         {{item}}
       </div>
     </div>
   </NavBar>
 </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      };
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
      },
      back(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    padding: 0 10px;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: #d4237a;
  }
  .back img{
    margin-left: 10px;
    margin-top: 12px;
    width: 20px;
    height: 20px;
  }
</style>
