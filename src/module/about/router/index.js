import Vue from 'vue';
import Router from 'vue-router';
import About from '../pages/about/cn';
// import PawnEn from '../about/pawn/en';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'About',
			component: About
		},
		// {
		//   path: '/cn',
		//   name: 'PawnCn',
		//   component: PawnCn
		// }
	]
});
