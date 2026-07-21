import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterRequest, User } from "./authTypes";
import { logoutUser, refreshUser, registerUser } from "./authService";
import { loginUser } from "./authService";
import type { LoginRequest } from "./authTypes";
import { decodeToken } from "./utils/jwt";
import type { RootState } from "../../app/api/store";
/* STATE TYPE */
interface AuthState {
  user: User | null;
  authorities: string[];
  accessToken: string | null;
  username: string | null;
  isLoading: boolean;
  error: string | null;
}

/* INITIAL STATE */
const initialState: AuthState = {
  user: null,
  authorities: [],
  accessToken: null,
  username: null,
  isLoading: false,
  error: null,
};

/* ASYNC THUNK */
export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterRequest, { rejectWithValue }) => {
    try {
      return await registerUser(data);
    } catch {
      return rejectWithValue("Register failed");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);

      const token = response.accessToken;

      const decoded = decodeToken(token);

      return {
        accessToken: token,
        username: decoded.sub,
        authorities: decoded.authorities,
      };
    } catch {
      return rejectWithValue("Login failed");
    }
  },
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshUser(); // service

      const decoded = decodeToken(response.accessToken);

      return {
        accessToken: response.accessToken,
        username: decoded.sub,
        authorities: decoded.authorities,
      };
    } catch {
      return rejectWithValue("Refresh failed");
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        return rejectWithValue("No access token found");
      }

      await logoutUser();
      return true;
    } catch {
      return rejectWithValue("Logout failed");
    }
  },
);

/* SLICE */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.authorities = [];
      state.accessToken = null;
      state.username = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //REGISTER
      // pending
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      // fulfilled
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })

      // rejected
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.error = "Register failed";
      })

      //LOGIN
      //pending
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //fulfilled
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.username = action.payload.username;
        state.authorities = action.payload.authorities;
      })
      //rejected
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //REFRESH
      //fulfilled

      .addCase(refresh.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.username = action.payload.username;
        state.authorities = action.payload.authorities;
      })
      //rejected
      .addCase(refresh.rejected, (state) => {
        state.accessToken = null;
        state.username = null;
        state.authorities = [];
      })

      //pending

      //LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.authorities = [];
        state.accessToken = null;
        state.username = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
