import axios from "axios";

export default () => {
  return axios.create({
    //baseURL: "https://bca-nhs.com",
    baseURL: "https://bca-nhs-new.herokuapp.com",
  });
};
