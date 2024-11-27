import { Result } from "postcss";
import { useEffect, useState } from "react";

const useGetResult = (code: string) => {
  const [data, setData] = useState<any>(null); // To store fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/sessions/${code}/result/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchData();
    }
  }, [code]);

  return { data, loading, error };
};

export default useGetResult;
