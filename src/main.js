import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Policy from '@/components/Policy'
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
Vue.use(VueRouter)

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/policy', component: Policy }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
