import Api from "@/services/Api";

export default {
  get(subject) {
    return Api().get(`tutor/sessions/${subject}`);
  },
  getAll() {
    return Api().get("subjects");
  }
};
