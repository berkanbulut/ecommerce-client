import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPermissions,
  deletePermission,
  getPermissions,
  updatePermission,
} from "./permissionService";
import type {
  CreatePermissionRequest,
  Permission,
  UpdatePermissionRequest,
} from "./permissionType";

interface PermissionState {
  id: number | null;
  name: string | null;
  description: string | null;
  permissions: Permission[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PermissionState = {
  id: null,
  name: null,
  description: null,
  permissions: [],
  isLoading: false,
  error: null,
};

//ASYNC THUNK
//get permissions
export const handleGetPermissions = createAsyncThunk(
  "admin/getPermissions",
  async (_, { rejectWithValue }) => {
    try {
      return await getPermissions();
    } catch {
      return rejectWithValue("Get permissions failed");
    }
  },
);

//create permission
export const handleCreatePermission = createAsyncThunk(
  "admin/createPermission",
  async (data: CreatePermissionRequest, { rejectWithValue }) => {
    try {
      return await createPermissions(data);
    } catch {
      return rejectWithValue("Create permission failed");
    }
  },
);

//update permission
export const handleUpdatePermission = createAsyncThunk(
  "admin/updatePermission",
  async (data: UpdatePermissionRequest, { rejectWithValue }) => {
    try {
      return await updatePermission(data);
    } catch {
      return rejectWithValue("Update permission failed");
    }
  },
);

//delete permission
export const handleDeletePermission = createAsyncThunk(
  "admin/deletePermission",
  async (id: number, { rejectWithValue }) => {
    try {
      await deletePermission(id);
      return id;
    } catch {
      return rejectWithValue("Delete permission failed");
    }
  },
);

/*SLICE*/
const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //GET PERMISSION
      //pending
      .addCase(handleGetPermissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //rejected
      .addCase(handleGetPermissions.rejected, (state) => {
        state.isLoading = false;
        state.error = "Get permissions failed";
      })

      .addCase(handleGetPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.permissions = action.payload;
      })

      //CREATE PERMISSION
      .addCase(handleCreatePermission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleCreatePermission.rejected, (state) => {
        state.isLoading = false;
        state.error = "Get permissions failed";
      })

      .addCase(handleCreatePermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.permissions.push(action.payload);
      })

      //UPDATE PERMISSION
      .addCase(handleUpdatePermission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(handleUpdatePermission.rejected, (state) => {
        state.isLoading = false;
        state.error = "Get permissions failed";
      })

      .addCase(handleUpdatePermission.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedPermission = action.payload;
        const index = state.permissions.findIndex(
          (permission) => permission.id === updatedPermission.id,
        );

        if (index !== -1) {
          state.permissions[index] = updatedPermission;
        }
      })

      //DELETE PERMISSION
      .addCase(handleDeletePermission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //rejected
      .addCase(handleDeletePermission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //fulfilled
      .addCase(handleDeletePermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.permissions = state.permissions.filter(
          (permission) => permission.id !== action.payload,
        );
      });
  },
});
export default permissionSlice.reducer;
