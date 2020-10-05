import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from "components/common/toast"
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";


Vue.config.productionTip = false

//定义全局事件总线
Vue.prototype.$bus = new Vue()

Vue.use(toast)
//解决移动端300s延迟
FastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyload,{
  loading: require('./assets/img/tabbar/home.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
