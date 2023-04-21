import { configureStore } from "@reduxjs/toolkit";
import { apiTasks } from "../api/apiTasks";

const store = configureStore({
  reducer: {
    [apiTasks.reducerPath]: apiTasks.reducer,
  },
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware().concat(apiTasks.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
