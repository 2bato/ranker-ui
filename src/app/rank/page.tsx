"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DragAndDropRank from "@/components/drag-and-drop-rank";

const RankPage = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Rank Page</h1>
      </div>
      <DragAndDropRank></DragAndDropRank>
    </Provider>
  );
};

export default RankPage;
