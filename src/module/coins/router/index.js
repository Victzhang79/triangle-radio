import Vue from 'vue';
import Router from 'vue-router';
import FundListCn from '../pages/fundList/cn';
import FundListEn from '../pages/fundList/en';
import FundDetailCn from '../pages/fundDetail/cn';
import FundDetailEn from '../pages/fundDetail/en';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FundListCn',
      component: FundListCn
    },
    {
      path: '/cn',
      name: 'FundListCn',
      component: FundListCn
    },
    {
      path: '/detail/:fundId/cn',
      name: 'FundDetailCn',
      component: FundDetailCn
    },
    {
      path: '/detail/:fundId',
      name: 'FundDetailCn',
      component: FundDetailCn
    }
  ]
});
