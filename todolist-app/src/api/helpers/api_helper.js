import axios from "axios";
import { BASE_URL } from "../../constants/url";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

class APIClient {
  get = (url) => {
    return axiosInstance.get(url);
  };

  post = (url, data) => {
    return axiosInstance.post(url, data);
  };

  put = (url, data) => {
    return axiosInstance.put(url, data);
  };

  delete = (url, data) => {
    return axiosInstance.delete(url, { data });
  };
}

export const apiClient = new APIClient();
