import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import NavBar from '@/components/navBar/navBar';
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView);
Vue.component('navBar',NavBar);
const app = new Vue({
  ...App
})
app.$mount()
