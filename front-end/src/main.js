import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/vuesax.js'
import store from './store'
import GoogleAuth from 'vue-google-authenticator'
Vue.use(GoogleAuth, {
  client_id: '846630149718-agedp64jpcais29j9de6p2n7csok20r5.apps.googleusercontent.com'
})
Vue.googleAuth().load()
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
