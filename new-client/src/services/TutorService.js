import Api from "@/services/Api";

export default {
  getSession(token) {
    return Api().get("api/users/session", {
      headers: { "x-auth-token": token },
    });
  },
  update(params) {
    console.log(params);
    return Api().post(
      "api/users/update",
      {
        hours: params.hours,
        subjects: params.subjects,
      },
      { headers: { "x-auth-token": params.token } },
    );
  },
};
