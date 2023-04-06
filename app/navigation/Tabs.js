import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import RankingsScreen from "../screens/RankingsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { StyleSheet } from "react-native";
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  BoltIcon,
  ChartBarSquareIcon,
} from "react-native-heroicons/outline";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#444",
        tabBarActiveTintColor: "#FE4862",
        tabBarStyle: {
          position: "absolute",
          bottom: 30,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          paddingBottom: 0,
          height: 60,
          borderTopWidth: 0,
          ...styles.shadow,
        },
        tabBarIcon: ({ focused, color, size }) => {
          focused_color = "#FE4862";
          unfocused_color = "#444";
          icon_size = 22;
          if (route.name === "Home") {
            return (
              <BoltIcon
                color={focused ? focused_color : unfocused_color}
                size={icon_size}
                opacity={focused ? 1 : 0.5}
              />
            );
          } else if (route.name === "Search") {
            return (
              <MagnifyingGlassIcon
                color={focused ? focused_color : unfocused_color}
                size={icon_size}
                opacity={focused ? 1 : 0.5}
              />
            );
          } else if (route.name === "Rankings") {
            return (
              <ChartBarSquareIcon
                color={focused ? focused_color : unfocused_color}
                size={icon_size}
                opacity={focused ? 1 : 0.5}
              />
            );
          } else if (route.name === "Settings") {
            return (
              <AdjustmentsVerticalIcon
                color={focused ? focused_color : unfocused_color}
                size={icon_size}
                opacity={focused ? 1 : 0.5}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{}} />
      <Tab.Screen name="Search" component={SearchScreen} options={{}} />
      <Tab.Screen name="Rankings" component={RankingsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{}} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
