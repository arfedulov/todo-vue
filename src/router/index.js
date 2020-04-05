import Vue from 'vue';
import VueRouter from 'vue-router';

import config from '../../vue.config';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/MainPage.vue'),
  },
  {
    path: '/edit/:noteId/',
    component: () => import('@/views/EditNotePage.vue'),
    props: true,
  },
];

export default new VueRouter({
  base: config.publicPath,
  routes,
  mode: 'history',
});
