import Vue from 'vue'
import Router from 'vue-router'

// const Home = () => import('@/views/Home/index')
const Login = () => import('@/views/login/index')
// Mobile页面
const mobileLayout = () => import('@/views/mobileLayout/index')
const Home = () => import('@/views/home/index') // 首页
const Apply = () => import('@/views/apply/index') // 需求池
const Product = () => import('@/views/product/index') // 作品展

// 订单
const Order = () => import('@/views/order/index')
// 发布订单
const sendCreatOrder = () => import('@/views/order/send-creat-order')
// 发单详情
const UnconfirmedDetail = () => import('@/views/order/unconfirmed-detail')
// 接单用户详情
const OrderUserInfo = () => import('@/views/order/order-user-info')

// 个人中心
const My = () => import('@/views/my/index')
// 我的作品
const MyWork = () => import('@/views/my/my-work')
// 实名认证
const MyCertificationResult = () => import('@/views/my/my-certification-result')
// 企业说明
const MyAbout = () => import('@/views/my/my-about')
// 积分充值
const MyPayNew = () => import('@/views/my/my-pay-new')
// 个人信息
const MyInfo = () => import('@/views/my/my-info')
// 历史订单
const MyHistoryOrder = () => import('@/views/my/my-history-order')
// 积分
const MyPoints = () => import('@/views/my/my-points')

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
          name: 'product',
          path: '/product',
          component: Product
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
          name: 'my-info',
          path: '/my-info',
          component: MyInfo
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
        },
        {
          name: 'my-pay-new',
          path: '/my-pay-new',
          component: MyPayNew
        },
        {
          name: 'send-creat-order',
          path: '/send-creat-order',
          component: sendCreatOrder
        },
        {
          name: 'my-history-order',
          path: '/my-history-order',
          component: MyHistoryOrder
        },
        {
          name: 'my-points',
          path: '/my-points',
          component: MyPoints
        },
        {
          name: 'unconfirmed-detail',
          path: '/unconfirmed-detail/:id',
          props: true,
          component: UnconfirmedDetail
        },
        {
          name: 'order-user-info',
          path: '/order-user-info/:id',
          props: true,
          component: OrderUserInfo
        }

      ]
    }
  ]
})
