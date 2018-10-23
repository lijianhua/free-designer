import Vue from 'vue'
import Router from 'vue-router'

// const Home = () => import('@/views/Home/index')
const Login = () => import('@/views/Login/index')

// Mobile页面
const mobileLayout = () => import('@/views/mobileLayout/index')
const Home = () => import('@/views/home/index') // 首页
const Apply = () => import('@/views/apply/index') // 需求池
const My = () => import('@/views/my/index') // 订单
const Order = () => import('@/views/order/index') // 我的

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/:mobilePages',
      name: 'mobileLayout',
      component: mobileLayout,
      children: [
        {
          name: 'home',
          path: '/home',
          component: Home
        },
        {
          name: 'apply',
          path: '/apply',
          component: Apply
        },
        {
          name: 'my',
          path: '/my',
          component: My
        },
        {
          name: 'order',
          path: '/order',
          component: Order
        }
      ]
    }
  ]
})
