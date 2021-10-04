import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Auth/store/authSlice";
import layoutReducer from "./layoutSlice";
import projectReducer from "../pages/projects/store/projectSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    project: projectReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});
