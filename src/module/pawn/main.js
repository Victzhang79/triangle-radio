// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { Toast, Dialog, Popup } from 'vant';
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false;
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
