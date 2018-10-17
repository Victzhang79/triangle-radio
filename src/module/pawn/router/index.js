import Vue from 'vue';
import Router from 'vue-router';
import pawnCn from '../page/pawn/cn';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pawnCn',
      component: pawnCn
    }
  ]
});
