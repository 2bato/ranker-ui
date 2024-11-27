"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import SwipeVeto from "@/components/swipe-veto";
import useRedirectIfMissingParams from "@/hooks/useRedirectIfMissingParams";

const VetoPage = () => {
  useRedirectIfMissingParams(["code", "username"]);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const username = searchParams.get("username");

  if (!code || !username) {
    return null;
  }

  return (
    <Provider store={store}>
      <div>
        <h1>Veto Page</h1>
        {code ? <p>Session Code: {code}</p> : <p>Session Code is missing</p>}
      </div>
      <SwipeVeto code={code} username={username}></SwipeVeto>
    </Provider>
  );
};

export default VetoPage;
