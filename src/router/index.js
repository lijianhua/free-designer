import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home/index')
const About = () => import('@/views/About/index')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
