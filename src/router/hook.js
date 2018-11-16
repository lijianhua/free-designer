import Router from './index'
import Store from '../store'
import Cookie from 'js-cookie'

export default router => {
  router.beforeEach((to, from, next) => {
    if (to.name === 'home' || to.name === 'product' || to.name === 'designerDetail' || to.name === 'browWork' || to.name === 'productDetail') { // 首页作品页及子页不检测登录
      return next()
    }

    let userInfo = Store.state.userInfo

    if (userInfo) {
      return next()
    }

    userInfo = Cookie.get('user')

    if (userInfo) {
      Store.commit('SET_USER_INFO', JSON.parse(userInfo))
      return next()
    }

    if (!userInfo && to.path !== '/login') {
      Router.replace('/login')
    }
    next()
  })
}
