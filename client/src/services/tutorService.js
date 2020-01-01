import Api from "@/services/Api";

export default {
  index(subject) {
    return Api().get(`tutor/sessions/${subject}`);
  },
  update(things) {
    return Api().post("tutor/update", {
      params: {}
    });
  },
  put(song) {
    return Api().put(`songs/${song.id}`, song);
  }
};
