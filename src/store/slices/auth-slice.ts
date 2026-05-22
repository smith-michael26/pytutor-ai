import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; session: Session }>) {
      state.user = action.payload.user;
      state.session = action.payload.session;
      state.isAuthenticated = true;
      state.isLoading = true;
    },
    clearUser(state) {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setIsLoading } = authSlice.actions;
export default authSlice.reducer;
