import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueAnalytics, {
  id: 'UA-151210580-1',
  checkDuplicatedScript: true
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
