import 'current-script-polyfill'
import Vue from 'vue'
import App from './App'
import SvgIcon from './components/SvgIcon'

if (process.env.NODE_ENV === 'development') {
  require('file-loader!./template/index.pug')
}

Vue.config.productionTip = false

import router from './router'
import store from './store'

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.component('SvgIcon', SvgIcon)
