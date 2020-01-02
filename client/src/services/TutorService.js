import Api from "@/services/Api";

export default {
  get(tutor) {
    return Api().get(`tutor/${tutor}`);
  },
  update(subjects, avail) {
    return Api().post("tutor/update", {
      params: { subject: subjects, availability: avail }
    });
  }
};
