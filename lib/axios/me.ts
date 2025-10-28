import axios from "axios";
import { env } from "@/config";

export const me = axios.create({
  baseURL: env.APP_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

me.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    console.log("Response error interceptor triggered: ", status);
    if (typeof window !== "undefined" && status === 401) {
      const p = window.location.pathname;
      window.location.href = `/auth/login?redirect=${encodeURIComponent(p)}`;
    }
    return Promise.reject(error);
  }
);
