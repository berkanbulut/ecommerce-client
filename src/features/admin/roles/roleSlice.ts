import {
  getRoles,
  createRole,
  updateRole,
  setPermission,
  deleteRole,
} from "./roleService";
import type {
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
  SetRolePermissionsRequest,
} from "./roleTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//STATE TYPE
interface RoleState {
  id: number | null;
  name: string | null;
  description: string | null;
  permissions: string[];
  roles: Role[];
  isLoading: boolean;
  error: string | null;
}

//INITTIAL STATE
const initialState: RoleState = {
  id: null,
  name: null,
  description: null,
  permissions: [],
  roles: [],
  isLoading: false,
  error: null,
};

//ASYNC THUNK
export const handleGetRoles = createAsyncThunk(
  "admin/getRoles",
  async (_, { rejectWithValue }) => {
    try {
      return await getRoles();
    } catch {
      return rejectWithValue("Get roles failed");
    }
  },
);

export const handleCreateRole = createAsyncThunk(
  "admin/createRoles",
  async (data: CreateRoleRequest, { rejectWithValue }) => {
    try {
      return await createRole(data);
    } catch {
      return rejectWithValue("Create role failed");
    }
  },
);

export const handleUpdateRole = createAsyncThunk(
  "admin/updateRole",
  async (data: UpdateRoleRequest, { rejectWithValue }) => {
    try {
      return await updateRole(data);
    } catch {
      return rejectWithValue("Update role failed");
    }
  },
);

export const handleSetPermission = createAsyncThunk(
  "admin/setPermission",
  async (data: SetRolePermissionsRequest, { rejectWithValue }) => {
    try {
      return await setPermission(data);
    } catch {
      return rejectWithValue("Set permission failed");
    }
  },
);
export const handleDeleteRole = createAsyncThunk(
  "admin/deleteRole",
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteRole(id);
      return id;
    } catch {
      return rejectWithValue("Delete role failed");
    }
  },
);

//SLICE
/*SLICE*/
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ROLES
      .addCase(handleGetRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleGetRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleGetRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action.payload;
      })

      // CREATE ROLE
      .addCase(handleCreateRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleCreateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleCreateRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles.push(action.payload);
      })

      // UPDATE ROLE
      .addCase(handleUpdateRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleUpdateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleUpdateRole.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedRole = action.payload;
        const index = state.roles.findIndex(
          (role) => role.id === updatedRole.id,
        );

        if (index !== -1) {
          state.roles[index] = updatedRole;
        }
      })

      // SET ROLE PERMISSIONS
      .addCase(handleSetPermission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleSetPermission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleSetPermission.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedRole = action.payload;
        const index = state.roles.findIndex(
          (role) => role.id === updatedRole.id,
        );

        if (index !== -1) {
          state.roles[index] = updatedRole;
        }
      })

      // DELETE ROLE
      .addCase(handleDeleteRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleDeleteRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(handleDeleteRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      });
  },
});

export default roleSlice.reducer;
