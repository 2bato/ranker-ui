import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setRestaurants } from "@/redux/restaurantSlice";

export const useVeto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const vetoedRestaurantIds = useSelector(
    (state: RootState) => state.restaurants.vetoed
  );
  const submitAndFetchVeto = async (code: string, username: string) => {
    setLoading(true);
    setError(null);
    console.log(vetoedRestaurantIds);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/sessions/${code}/veto/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vetoed_restaurants: vetoedRestaurantIds,
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
      const queryString = new URLSearchParams({
        code,
        username,
      }).toString();
      router.replace(`/rank?${queryString}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitAndFetchVeto, loading, error };
};

export default useVeto;
