import { bgc } from "@/config";
import axios from "axios";
import { getCookies } from "../utils/cookies";

const axiosInstance = axios.create({
  baseURL: bgc,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { token, iv } = await getCookies();
    if (token && iv) {
      config.headers.Cookie = `token=${token}; iv=${iv}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
