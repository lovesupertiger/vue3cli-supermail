import Vue from "vue";
import Vuex from 'vuex';
//1.安装插件Vuex
Vue.use(Vuex)
//2.创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  getters:{
    cartLength(state){
      return state.cartList.length;
    },
    cartList(state){
      return state.cartList;
    }
  },
  mutations: {
    //mutations唯一的目的是为了修改state的状态
    //mutations中的每个方式尽可能完成的事件要单一点
    /**
     * 修改购物车中商品的数量
     * @param state
     * @param payload
     */
    addCounter(state, payload){
      payload.count++;
    },
    /**
     * 将商品添加到购物车中
     * @param state
     * @param payload
     */
    addToCart(state, payload){
      payload.count = 1;
      payload.checked = true;
      state.cartList.push(payload);
    }
  },
  actions: {
    /**
     * 将商品添加到购物车中
     * @param context
     * @param payload
     */
    addCart(context, payload) {
      //1.判断商品是否已存在
      let find = context.state.cartList.find(item => item.id === payload.id);
      if (!find) {
        context.commit('addToCart', payload);
      } else {
        context.commit('addCounter', find);
      }
    }
  }
})
//3.挂载vuex实例
export default store
