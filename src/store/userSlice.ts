import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserState } from "../types";
import { API_URL, PESAN } from "../constants";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  searchQuery: "",
};

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    try {
      const response = await axios.get<User[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Gagal mengambil data awal:", error);
      throw error;
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
      const maxId = state.users.reduce(
        (max, user) => Math.max(max, user.id),
        0,
      );
      const newUser = {
        ...action.payload,
        id: maxId + 1,
      };
      state.users.push(newUser);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || PESAN.ERROR_UMUM;
        console.error("Gagal memuat data pengguna:", action.error);
      });
  },
});

export const { setSearchQuery, addUser, updateUser, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;
