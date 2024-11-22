import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  sessionCode: string | null;
  username: string | null;
}

const initialState: SessionState = {
  sessionCode: null,
  username: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionCode: (state, action: PayloadAction<string>) => {
      state.sessionCode = action.payload;
    },
    clearSessionCode: (state) => {
      state.sessionCode = null;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUsername: (state) => {
      state.username = null;
    },
  },
});

export const { setSessionCode, clearSessionCode, setUsername, clearUsername } =
  sessionSlice.actions;

export default sessionSlice.reducer;
