import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  sessionCode: string | null;
}

const initialState: SessionState = {
  sessionCode: null,
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
  },
});

export const { setSessionCode, clearSessionCode } = sessionSlice.actions;

export default sessionSlice.reducer;
