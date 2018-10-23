import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './assets/css/reset.css'

import delay from './utils/delay'

Vue.use(delay)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const clientWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = `${(clientWidth / 375) * 20}px`
