import Api from "@/services/Api";

export default {
  get(subject) {
    return Api().get(`tutoring/sessions/${subject}`);
  },
  getAll() {
    return Api().get("subjects");
  }
};
