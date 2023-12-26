import { useState } from "react";
import axiosClient from "../axiosInstance";

const useMutation = ({ route, method = "POST" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const mutate = async (payload) => {
    setIsLoading(true);
    try {
      const res = await axiosClient({
        method,
        url: route,
        data: payload,
      });

      setStatus("success");
      setIsLoading(false);
      return res.data;
    } catch (err) {
      setIsLoading(false);
      setStatus("error");
      throw err;
    }
  };

  return {
    isLoading,
    status,
    mutate,
  };
};

export default useMutation;
