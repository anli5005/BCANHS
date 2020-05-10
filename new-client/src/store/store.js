import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    token: null,
    user: null,
    isLoggedIn: false
  },
  mutations: {
    setUser(state, res) {
      state.token = res.token;
      state.user = res.user;
      state.isLoggedIn = true;
    },
    logOut(state) {
      sessionStorage.clear();
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    }
  },
  actions: {
    setUser({ commit }, res) {
      commit("setUser", res);
    },
    logOut({ commit }) {
      commit("logOut");
    }
  }
});
