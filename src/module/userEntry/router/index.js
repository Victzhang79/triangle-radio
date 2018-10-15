import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../components/Hello';
import login from '../pages/login/index';

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
		}
	]
});
