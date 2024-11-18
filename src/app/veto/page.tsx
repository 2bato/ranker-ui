"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import RestaurantList from "@/components/restaurant-test";
import { useRouter } from "next/navigation";

const VetoPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  return (
    <Provider store={store}>
      <div>
        <h1>Veto Page</h1>
        {code ? <p>Session Code: {code}</p> : <p>Session Code is missing</p>}
        <RestaurantList />
      </div>
    </Provider>
  );
};

export default VetoPage;
