import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface RegisteredUser extends User {
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  registeredUsers: RegisteredUser[];
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  registeredUsers: [],
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisteredUser>) => {
      state.registeredUsers.push(action.payload);
      const { password, ...userWithoutPassword } = action.payload;
      state.user = userWithoutPassword;
      state.isAuthenticated = true;
    },

    loginUser: (
      state,
      action: PayloadAction<{ phoneNumber: string; password: string }>
    ) => {
      const found = state.registeredUsers.find(
        (u) =>
          u.phoneNumber === action.payload.phoneNumber &&
          u.password === action.payload.password
      )
      if (found) {
        const { password, ...userWithoutPassword } = found;
        state.user = userWithoutPassword;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
})

export const { registerUser, loginUser, logout } = authSlice.actions;
export default authSlice.reducer;