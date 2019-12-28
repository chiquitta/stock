import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import feather from 'vue-icon';
import App from './App.vue';
import Home from '@/components/Home.vue';
import Policy from '@/components/Policy.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(feather, {
  name: 'v-icon',
  props: {
    baseClass: {
      type: String,
      default: 'v-icon',
    },
  },
});
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/policy', component: Policy },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
