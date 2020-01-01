import axios from "axios";

export default () => {
  console.log(process.env);
  return axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL
  });
};
