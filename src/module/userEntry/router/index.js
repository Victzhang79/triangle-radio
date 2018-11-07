import Vue from 'vue';
import Router from 'vue-router';
import login from '../pages/login/index';
import logup from '../pages/logup/index';
import forget from '../pages/forgetPassword/index';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: login
		},
		{
			path: '/logup',
			name: 'logup',
			component: logup
		},
		{
			path: '/logup/:invateCode',
			name: 'logup',
			component: logup
		},
		{
			path: '/forget',
			name: 'forget',
			component: forget
		}
	]
});
