import Api from "@/services/Api";

export default {
  getSubjects() {
    return Api().get("api/sessions/subjects");
  },
  getHours() {
    return Api().get("api/sessions/hours");
  },
};
