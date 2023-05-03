import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./language";

export default configureStore({
  reducer: {
    language: languageReducer,
  },
});
