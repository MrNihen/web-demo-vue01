import Vue from 'vue'
import router from './router'
import store from './store'
import Layout from "@/components/Layout";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(Layout) }
}).$mount('#app')
