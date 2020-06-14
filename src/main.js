import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
axios.defaults.baseURL = 'http://123.57.70.149:8181/';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
