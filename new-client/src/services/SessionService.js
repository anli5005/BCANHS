import Api from "@/services/Api";

export default {
  getSubjects() {
    return Api().get("api/sessions/subjects");
  },
  getHours() {
    return Api().get("api/sessions/hours");
  },
  getSessions(subject) {
    return Api().get("api/sessions/subject/" + subject);
  },

  getTutor(tutor) {
    return Api().get("api/sessions/tutor/" + tutor);
  },
};
