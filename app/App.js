import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Tabs from "./navigation/Tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { switchLanguage } from "./language";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <Tabs />
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  );
}
