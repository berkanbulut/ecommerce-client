import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateUserPasswordRequest,
  UpdateUserRolesRequest,
} from "./userTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  updateUserPassword,
  updateUserRoles,
} from "./userService";

/*STATE TYPE*/
interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  roles: string[];
  authorities: string[];
  users: User[];
  isLoading: boolean;
  error: string | null;
}

/*INITTIAL STATE*/
const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  roles: [],
  authorities: [],
  users: [],
  isLoading: false,
  error: null,
};

/*ASYNC THUNK*/
export const handleGetUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await getUsers();
    } catch {
      return rejectWithValue("Get users failed");
    }
  },
);

export const handleCreateUser = createAsyncThunk(
  "admin/createUser",
  async (data: CreateUserRequest) => {
    try {
      return await createUser(data);
    } catch {
      throw new Error("User create failed");
    }
  },
);

export const handleUpdateUser = createAsyncThunk(
  "admin/updateUser",
  async (data: UpdateUserRequest, { rejectWithValue }) => {
    try {
      return await updateUser(data);
    } catch {
      return rejectWithValue("Update user failed");
    }
  },
);
export const handleDeleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id; // sadece reducer için
    } catch {
      return rejectWithValue("Delete user failed");
    }
  },
);

export const handleUpdateUserPassword = createAsyncThunk(
  "admin/updateUserPassword",
  async (data: UpdateUserPasswordRequest, { rejectWithValue }) => {
    try {
      await updateUserPassword(data);
    } catch {
      return rejectWithValue("Update user password failed");
    }
  },
);

export const handleUpdateUserRoles = createAsyncThunk(
  "admin/updateUserRoles",
  async (data: UpdateUserRolesRequest, { rejectWithValue }) => {
    try {
      return await updateUserRoles(data);
    } catch {
      return rejectWithValue("Update user roles failed");
    }
  },
);
/*SLICE*/
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET USER
      //pending
      .addCase(handleGetUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleGetUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = "Get users failed";
      })

      .addCase(handleGetUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })

      //CREATE USER
      //pending
      .addCase(handleCreateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //rejected
      .addCase(handleCreateUser.rejected, (state) => {
        state.isLoading = false;
        state.error = "Create user failed";
      })
      //fulfilled
      .addCase(handleCreateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })

      //UPDATE
      //pending
      .addCase(handleUpdateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //rejected
      .addCase(handleUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //fulfilled
      .addCase(handleUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id,
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      //DELETE
      //pending
      .addCase(handleDeleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //rejected
      .addCase(handleDeleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //fulfilled
      .addCase(handleDeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      //UPDATE USER PASSWORD
      //pending
      .addCase(handleUpdateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //rejected
      .addCase(handleUpdateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //fulfilled
      .addCase(handleUpdateUserPassword.fulfilled, (state) => {
        state.isLoading = false;
      })

      //UPDATE USER ROLES
      //pending
      .addCase(handleUpdateUserRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //rejected
      .addCase(handleUpdateUserRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //fulfilled
      .addCase(handleUpdateUserRoles.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id,
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      });
  },
});

export default userSlice.reducer;
