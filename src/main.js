import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.css'
import './style/tips.scss'
Vue.use(ElementUI)
import 'vue-country-intl/lib/vue-country-intl.css'
// 载入通用提示
import tips from '@/utils/tips'
Object.defineProperty(Vue.prototype, '$tipsBox', {
  value: tips
})
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
