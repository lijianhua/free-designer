import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'

import './assets/css/reset.css'
import './assets/css/icon.css'
import 'mint-ui/lib/style.css'

import delay from './utils/delay'

Vue.use(delay)
Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
