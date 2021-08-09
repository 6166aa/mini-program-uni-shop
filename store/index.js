import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
//动态载入
const files = require.context(
  '.',
  false,
  /.js/
);
let modules = {};

files.keys().forEach((item) => {
  if (item == './index.js') {
    return;
  }
  var key = /(\w+)\.js$/.exec(item)[1];
  modules[key] = files(item).default;
});

export default new Vuex.Store({
  modules
});
