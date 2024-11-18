"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const RankPage = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Rank Page</h1>
      </div>
    </Provider>
  );
};

export default RankPage;
