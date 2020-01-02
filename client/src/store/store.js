import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.user = null;
      state.isLoggedIn = false;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    logOut({ commit }) {
      commit("logOut");
    }
  }
});
