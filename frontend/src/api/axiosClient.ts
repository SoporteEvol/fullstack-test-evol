import axios from "axios";

const AxiosClient = (url: string) => {
  return axios.create({
    baseURL: url,
  });
};

export default AxiosClient;
