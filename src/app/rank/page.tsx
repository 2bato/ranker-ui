"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import DragAndDropRank from "@/components/drag-and-drop-rank";
import RankButton from "@/components/rank-button";
import { useSearchParams } from "next/navigation";
import useRedirectIfMissingParams from "@/hooks/useRedirectIfMissingParams";

const RankPage = () => {
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
        <h1>Rank Page</h1>
      </div>
      <DragAndDropRank></DragAndDropRank>
      <RankButton code={code} username={username}></RankButton>
    </Provider>
  );
};

export default RankPage;
