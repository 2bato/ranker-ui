"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import useRedirectIfMissingParams from "@/hooks/useRedirectIfMissingParams";
import { useSearchParams } from "next/navigation";

const ResultPage = () => {
  useRedirectIfMissingParams(["code"]);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) {
    return null;
  }

  return (
    <Provider store={store}>
      <div>
        <h1>Result Page</h1>
      </div>
    </Provider>
  );
};

export default ResultPage;
