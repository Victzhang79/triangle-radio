// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';
import { Progress, Tab, Tabs, Popup, Uploader, Pagination, Toast } from 'vant';
// // 引入基础样式
// import 'vant/packages/vant-css/src/base.css';
// // 引入组件对应的样式
// import 'vant/packages/vant-css/src/button.css';
// import 'vant/packages/vant-css/src/checkbox.css';

Vue.config.productionTip = false;

Vue.use(VeeValidate, {
  fieldsBagName: 'veefields'
});
Vue.use(VueClipboard);

Vue.use(Progress)
  .use(Tab)
  .use(Tabs)
  .use(Popup)
  .use(Uploader)
  .use(Pagination)
  .use(Toast);

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
