import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import NavBar from '@/components/navBar/navBar';
import filters from '@/filters/index.js';
import store from '@/store/index.js';
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView);
Vue.component('navBar', NavBar);
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

const app = new Vue({
  ...App,
  store
})
app.$mount()
