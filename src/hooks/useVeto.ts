import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export const useVeto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const code = useSelector((state: RootState) => state.session.sessionCode);
  const submitVeto = async (vetoedRestaurantIds: number[]) => {
    if (!vetoedRestaurantIds.length) {
      setError("No restaurants selected for veto.");
      return;
    }

    setLoading(true);
    setError(null);

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
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit veto.");
      }
      router.push(`/rank?code=${code}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitVeto, loading, error };
};

export default useVeto;
