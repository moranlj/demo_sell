import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Headers from '@/components/header/headers'
import  Goods from '../components/goods/goods'
import Ratings from '../components/ratings/ratings'
import Sellers from  '../components/seller/seller'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: Goods,
      component: Goods
    },
    {
      path:'/goods',
      name:Goods,
      component: Goods
    },
    {
      path:'/ratings',
      name: Ratings,
      component: Ratings
    },
    {
      path:'/seller',
      name:Sellers,
      component: Sellers
    },
    {
      path: '/',
      redirect:{
        name: 'goods'
      }
    }
  ]
})
