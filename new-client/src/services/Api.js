import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://bca-nhs.com",
  });
};
