import Vue from 'vue';
import Router from 'vue-router';
import DownloadPage from '../pages/download';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'DownloadPage',
			component: DownloadPage
		}
	]
});
