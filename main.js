import Vue from 'vue'
import App from './App'
import NavBar from '@/components/lz-navBar/navBar.vue'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.component("NavBar", NavBar);
const app = new Vue({
    ...App
})
app.$mount()
