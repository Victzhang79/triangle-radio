import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../components/Hello';
import login from '../pages/login/index';
import logup from '../pages/logup/index';
import forget from '../pages/forgetPassword/index';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Hello
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/logup',
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
