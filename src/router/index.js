import Vue from 'vue'
import Router from 'vue-router'

// const Home = () => import('@/views/Home/index')
const Login = () => import('@/views/Login/index')

// Mobile页面
const mobileLayout = () => import('@/views/mobileLayout/index')
const Home = () => import('@/views/Home/index') // 首页
const Apply = () => import('@/views/apply/index') // 需求池
const Order = () => import('@/views/order/index') // 我的

const My = () => import('@/views/my/index') // 个人中心
const MyWork = () => import('@/views/my/my-work') // 我的作品
const MyCertificationResult = () => import('@/views/my/my-certification-result') // 实名认证
const MyAbout = () => import('@/views/my/my-about') // 企业说明

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'mobileLayout',
      component: mobileLayout,
      redirect: 'home',
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
          name: 'order',
          path: '/order',
          component: Order
        },
        {
          name: 'my',
          path: '/my',
          component: My
        },
        {
          name: 'my-work',
          path: '/my-work',
          component: MyWork
        },
        {
          name: 'my-certification-result',
          path: '/my-certification-result',
          component: MyCertificationResult
        },
        {
          name: 'my-about',
          path: '/my-about',
          component: MyAbout
        }
      ]
    }
  ]
})
