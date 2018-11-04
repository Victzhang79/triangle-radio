// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { Progress, Tab, Tabs, Popup, Uploader, Pagination, Toast } from 'vant';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false;

Vue.use(Progress)
  .use(Tab)
  .use(Tabs)
  .use(Popup)
  .use(Uploader)
  .use(Pagination)
  .use(Toast);
Vue.use(VeeValidate, {
  fieldsBagName: 'veefields'
});

Vue.use(VueClipboard);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  store
});
