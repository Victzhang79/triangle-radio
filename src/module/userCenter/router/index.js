import Vue from 'vue';
import Router from 'vue-router';
import AssetStatusCn from '../pages/assetStatus/cn';
import SecuritySetting from '../pages/SecuritySetting/cn';
import Identification from '../pages/identification/cn';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'AssetStatusCn',
			component: AssetStatusCn
		},
		{
			path: '/security',
			name: 'SecuritySetting',
			component: SecuritySetting
		},
		{
			path: '/identification',
			name: 'Identification',
			component: Identification
		}
	]
});
