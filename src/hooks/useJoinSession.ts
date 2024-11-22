import { useState } from "react";
import { useRouter } from "next/navigation";
import { setRestaurants } from "@/redux/restaurantSlice";
import { useDispatch } from "react-redux";
import { setSessionCode, setUsername } from "@/redux/sessionSlice";

const useJoinSession = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const joinSession = async (code: string, username: string) => {
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

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/sessions/${code}/join/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to join session");
      }

      const result = await response.json();
      setData(result);

      const { restaurants, vetoed } = result;

      dispatch(setRestaurants(restaurants));
      dispatch(setSessionCode(code));
      dispatch(setUsername(username));
      router.push(`/veto?code=${code}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, joinSession };
};

export default useJoinSession;
