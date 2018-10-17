// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2';
import { Progress } from 'vant';


Vue.config.productionTip = false;

Vue.use(VeeValidate, {
	fieldsBagName: 'veefields'
});
Vue.use(VueClipboard);

Vue.use(Progress);

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
