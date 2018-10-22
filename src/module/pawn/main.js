// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { Toast, Dialog, Popup } from 'vant';
import VueClipboard from 'vue-clipboard2';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;
Vue.use(VeeValidate, {
  events: 'blur' //blur失焦校验
});
Vue.use(VueClipboard);
Vue.use(Toast)
  .use(Dialog)
  .use(Popup);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
