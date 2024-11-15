import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantSlice";
import sessionReducer from "./sessionSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    session: sessionReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
