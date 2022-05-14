/* eslint-disable no-underscore-dangle */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { UserInput, UserOutput, UsersState } from 'redux/slices/user/types';

const url = process.env.REACT_APP_SERVER_URL as string;

export const fetchUsers = createAsyncThunk<
  UserOutput[],
  undefined,
  { rejectValue: string }
>('users/fetchUsers', async (_, { rejectWithValue }) =>
  axios.get(url).then((res) => {
    if (res.status !== 200) {
      return rejectWithValue('Server Error');
    }
    return res.data;
  }),
);

export const createUser = createAsyncThunk<
  UserOutput,
  UserInput,
  { rejectValue: string }
>('users/createUser', async (user, { rejectWithValue }) => {
  const res = await axios.post(url, user);
  if (res.status !== 201) {
    return rejectWithValue('Cannot add new user. Server Error');
  }
  return res.data;
});

export const updateUser = createAsyncThunk<
  UserOutput,
  UserOutput,
  { rejectValue: string }
>('users/updateUser', async (user, { rejectWithValue }) => {
  const res = await axios.patch(`${url}/${user._id}`, { user });
  if (res.status !== 200) {
    return rejectWithValue('Cannot update user. Server Error');
  }
  return res.data;
});

export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('users/deleteUser', async (id, { rejectWithValue }) => {
  const res: Response = await axios.delete(`${url}/${id}`);
  if (res.status !== 200) {
    return rejectWithValue('Cannot delete user');
  }
  return id;
});

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(createUser.pending, (state) => {
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.list = state.list.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user._id !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
