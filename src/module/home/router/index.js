import Vue from 'vue';
import Router from 'vue-router';
import homeCn from '../page/home/cn';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeCn',
      component: homeCn
    }
  ]
});
