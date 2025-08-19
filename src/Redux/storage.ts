import { configureStore } from "@reduxjs/toolkit";
import Log_Slice from './slices/Log_status'

const Store = configureStore({
  reducer: {
    status: Log_Slice
  }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export default Store;