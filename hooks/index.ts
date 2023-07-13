"use client";

import axios from "@/http";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Api = {
  url: string;
  method: string;
  data: any;
};

const useAxiosAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.user.token}`;
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  return axios;
};
export default useAxiosAuth;
