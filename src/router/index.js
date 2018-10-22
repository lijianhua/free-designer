import Vue from 'vue'
import Router from 'vue-router'

// const Home = () => import('@/views/Home/index')
// const About = () => import('@/views/About/index')
const Login = () => import('@/views/Login/index')

// Mobile页面
const mobileLayout = () => import('@/views/mobile/mobileLayout/index')
const mobileHome = () => import('@/views/mobile/home/index') // 首页
const mobileApply = () => import('@/views/mobile/apply/index') // 需求池
const mobileMy = () => import('@/views/mobile/my/index') // 订单
const mobileOrder = () => import('@/views/mobile/order/index') // 我的
// PC页面
const pcHome = () => import('@/views/pc/home/index')

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
      path: '/m/:mobilePages',
      name: 'mobileLayout',
      component: mobileLayout,
      children: [
        {
          name: 'home',
          path: '/:parentsNav/home',
          component: mobileHome
        },
        {
          name: 'apply',
          path: '/:parentsNav/apply',
          component: mobileApply
        },
        {
          name: 'my',
          path: '/:parentsNav/my',
          component: mobileMy
        },
        {
          name: 'order',
          path: '/:parentsNav/order',
          component: mobileOrder
        }
      ]
    },
    {
      path: '/home',
      name: 'pcHome',
      component: pcHome
    }
  ]
})
