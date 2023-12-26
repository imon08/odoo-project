import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../axiosInstance";

const useQuery = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosClient.get(route);
        setData(res.data);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [route]);

  return {
    isLoading,
    data,
    status,
  };
};

export default useQuery;
