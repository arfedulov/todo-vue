import Vue from 'vue';

import App from './App.vue';
import store from '@/store';
import router from '@/router';
import ConfirmDialog from '@/plugins/ConfirmDialog';
import GithubPagesSpa from '@/plugins/GithubPagesSpa';

Vue.use(GithubPagesSpa, router);
Vue.use(ConfirmDialog);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
