import Vue from 'vue'
import VeeValidate from "vee-validate";
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
