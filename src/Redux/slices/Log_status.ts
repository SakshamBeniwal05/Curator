import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  $id?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

interface AuthState {
  status: boolean;
  data: UserData | null;
}

const initialState: AuthState = {
  status: false,
  data: null
}

const Log_Slice = createSlice({
  name: "status",
  initialState,
  reducers: {
    Login: (state, action: PayloadAction<{ data: UserData }>) => {
      state.status = true;
      state.data = action.payload.data
    },
    Logout: (state) => {
      state.status = false;
      state.data = null;
    }
  }
})

export const { Login, Logout } = Log_Slice.actions
export default Log_Slice.reducer