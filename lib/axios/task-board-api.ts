// "use client";
import { cookies } from "next/headers";
import axios from "axios";
import { env } from "@/config";

export const taskboardApi = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

taskboardApi.interceptors.request.use(
  async (config) => {
    const token = (await cookies()).get("access_token")?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

taskboardApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;
    console.log("Response error interceptor triggered: ", status);
    if (status === 401) {
      (await cookies()).delete("access_token");
    }
    return Promise.reject(error);
  }
);
