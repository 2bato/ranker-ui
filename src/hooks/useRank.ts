import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setRestaurants } from "@/redux/restaurantSlice";

export const useRank = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (state: RootState) => state.restaurants.active_restaurants
  );
  const submitRank = async (code: string, username: string) => {
    setLoading(true);
    setError(null);
    console.log(
      JSON.stringify({
        restaurants: restaurants,
        username: username,
        session_code: code,
      })
    );
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/sessions/${code}/ranking/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurants: restaurants,
            username: username,
            session_code: code,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to veto restaurants.");
      }

      const data = await response.json();

      dispatch(setRestaurants(data.restaurants));
      router.replace(`/result?code=${code}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitRank, loading, error };
};

export default useRank;
