import Api from "@/services/Api";

export default {
  login(credentials) {
    return Api().post("api/auth", credentials);
  },

  forgot(email) {
    return Api().post("api/auth/forgot", { username: email });
  },
  reset(params) {
    return Api().post("api/auth/reset", {
      token: params.token,
      password: params.password,
    });
  },
};
