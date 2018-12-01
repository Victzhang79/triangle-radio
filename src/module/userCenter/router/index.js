import Vue from 'vue';
import Router from 'vue-router';
import SecuritySetting from '../pages/SecuritySetting/cn';
import Identification from '../pages/identification/cn';
import Wallet from '../pages/wallet/cn';
import Deposit from '../pages/deposit/cn';
import DepositHistory from '../pages/history';
import Property from '../pages/property';
// import Find from '../pages/find';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Wallet',
			component: Wallet
		},
		{
			path: '/deposit/:trxNum',
			name: 'Deposit',
			component: Deposit
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
		},
		{
			path: '/history',
			name: 'DepositHistory',
			component: DepositHistory
		},
		{
			path: '/property',
			name: 'Property',
			component: Property
		}
		// {
		// 	path: '/find',
		// 	name: 'Find',
		// 	component: Find
		// }
	]
});
