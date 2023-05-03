import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = { value: null };

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchLanguage } = languageSlice.actions;

export const selectLanguage = (state) => state.language.value;

export const setLanguageFromStorage = () => async (dispatch) => {
  try {
    const value = await AsyncStorage.getItem("language");
    if (value !== null) {
      dispatch(switchLanguage(value));
    } else {
      dispatch(switchLanguage("pt"));
    }
  } catch (error) {
    console.log("Error retrieving language from storage:", error);
  }
};

export default languageSlice.reducer;
