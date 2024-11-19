"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import RestaurantCardSwipe from "@/components/swipe-veto";
import Deck from "@/components/ex";

const VetoPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  return (
    <Provider store={store}>
      <div>
        <h1>Veto Page</h1>
        {code ? <p>Session Code: {code}</p> : <p>Session Code is missing</p>}
      </div>
      <Deck></Deck>
    </Provider>
  );
};

export default VetoPage;
