import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from "components/common/toast"

Vue.config.productionTip = false

//定义全局事件总线
Vue.prototype.$bus = new Vue()

Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
