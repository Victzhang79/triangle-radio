// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';
import {
  Progress,
  Tab,
  Tabs,
  Popup,
  Uploader,
  Pagination,
  Toast,
  Switch
} from 'vant';
import VueQrcode from '@chenfengyuan/vue-qrcode';

Vue.config.productionTip = false;

Vue.use(VeeValidate, {
  events: 'blur' //blur失焦校验
});
Vue.use(VueClipboard);

Vue.use(Progress)
  .use(Tab)
  .use(Tabs)
  .use(Popup)
  .use(Uploader)
  .use(Pagination)
  .use(Toast)
  .use(Switch);

Vue.component(VueQrcode.name, VueQrcode);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
