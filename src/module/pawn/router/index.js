import Vue from 'vue';
import Router from 'vue-router';
import pawn_cn from '../page/pawn_cn';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pawn_cn',
      component: pawn_cn
    }
  ]
});
