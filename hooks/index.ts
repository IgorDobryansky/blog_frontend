"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:3001",
  headers: {
    "Content-Type": "application/json"
  }
});

export const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.user.token}`;
      }
      return config;
    });
    return () => {
      api.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  return api;
};
