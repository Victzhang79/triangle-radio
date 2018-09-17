// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;

const veeConfig = {
	events: 'input'//blur失焦校验；input输入时校验
};
Vue.use(VeeValidate, veeConfig);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
});
