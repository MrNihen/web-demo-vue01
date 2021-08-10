import Vue from 'vue'
import router from './router'
import store from './store'
import Layout from "@/components/Layout";
import vuetify from './plugins/vuetify'
// import Axios  from "axios";
import '@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false
// //让vue的每个组件都可以直接使用axios
// Vue.prototype.axios = Axios
//
// //在每次向后台发请求时，请求路径前面都会加上/api,如：student?cmd=list,现在自动变成：/api/student?cmd=list
// Axios.defaults.baseURL = '/api'
new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(Layout) }
}).$mount('#app')
