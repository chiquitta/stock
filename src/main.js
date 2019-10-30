import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import feather from 'vue-icon'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(feather, {
  name: 'v-icon',
  props: {
    baseClass: {
        type: String,
        default: 'v-icon'
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
