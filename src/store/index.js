import Vue from 'vue';
import Vuex from 'vuex';

import api from '@/api';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: api.getNotes(),
  },
  mutations,
  actions,
});
