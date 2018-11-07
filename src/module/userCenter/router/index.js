import Vue from 'vue';
import Router from 'vue-router';
import SecuritySetting from '../pages/SecuritySetting/cn';
import Identification from '../pages/identification/cn';
import Wallet from '../pages/wallet/cn';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wallet',
      component: Wallet
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
