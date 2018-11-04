import Vue from 'vue';
import Router from 'vue-router';
import Transaction from '../pages/transaction';
import History from '../pages/history';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Transaction',
      component: Transaction
    },
    {
      path: '/history/:coinCode',
      name: 'History',
      component: History
    }
  ]
});
