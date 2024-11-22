import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearVetoed, setRestaurants } from "@/redux/restaurantSlice";
import { useDispatch } from "react-redux";
import { setSessionCode, setUsername } from "@/redux/sessionSlice";

const useCreateSession = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const createSession = async (code: string, username: string) => {
    if (!code) {
      setError("Code is required");
      return;
    }

    if (!username) {
      setError("Username is required");
      return;
    }

    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              "http://127.0.0.1:8000/api/sessions/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, code, latitude, longitude }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to create session");
            }

            const result = await response.json();
            setData(result);

            const { restaurants } = result;

            dispatch(setRestaurants(restaurants));
            dispatch(setSessionCode(code));
            dispatch(setUsername(username));
            dispatch(clearVetoed());

            router.push(`/veto?code=${code}`);
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
