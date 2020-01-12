import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
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
