"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import useRedirectIfMissingParams from "@/hooks/useRedirectIfMissingParams";
import { useSearchParams } from "next/navigation";
import ResultList from "@/components/result-list";

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
        <ResultList code={code}></ResultList>
      </div>
    </Provider>
  );
};

export default ResultPage;
