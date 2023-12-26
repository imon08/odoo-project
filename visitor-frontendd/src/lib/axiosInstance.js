import axios from "axios";
import { logOut } from "./utils";

const API_URL = "http://localhost:8000/api/v1";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.defaults.baseURL = API_URL;

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// if at any point got 401 response, then redirect to login page and remove token
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      logOut();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
