import Api from "@/services/Api";

export default {
  get() {
    return Api().get("/tutoring/edit");
  },
  update(subjects, avail) {
    return Api().post("tutor/update", {
      params: { subject: subjects, availability: avail }
    });
  }
};
