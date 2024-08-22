import { IUser } from '@/api/services/auth';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    unsetAuth: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, unsetAuth } = authSlice.actions;

export default authSlice.reducer;
