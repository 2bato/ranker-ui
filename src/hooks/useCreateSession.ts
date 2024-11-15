import { useState } from "react";

const useCreateSession = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSession = async (code: string) => {
    if (!code) {
      setError("Code is required");
      return;
    }

    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch("/api/sessions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code, latitude, longitude }),
            });

            if (!response.ok) {
              throw new Error("Failed to create session");
            }

            const result = await response.json();
            setData(result);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setLoading(false);
          setError("Geolocation not available or permission denied");
        }
      );
    } else {
      setLoading(false);
      setError("Geolocation not supported by this browser");
    }
  };
  return { data, loading, error, createSession };
};

export default useCreateSession;
