import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Profile = () => import("views/profile/Profile")
const Detail = () => import("views/detail/Detail")

//1.安装插件
Vue.use(VueRouter)


//2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
  ,
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
