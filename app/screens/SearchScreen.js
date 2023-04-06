import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { createStackNavigator } from "@react-navigation/stack";
import ClubScreen from "./ClubScreen";
import { useNavigation } from "@react-navigation/native";
import API_URL from "../constants/api_url";
import AthleteScreen from "./AthleteScreen";
import EventScreen from "./EventScreen";
import CompetitionScreen from "./CompetitionScreen";

const Stack = createStackNavigator();

export default function SearchScreen() {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClubScreen"
        component={ClubScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AthleteScreen"
        component={AthleteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompetitionScreen"
        component={CompetitionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SearchPage() {
  const [data, setData] = React.useState({ clubs: [], athletes: [] });
  const [selected, setSelected] = React.useState("clubs");

  const navigation = useNavigation();

  const loadData = (text) => {
    if (text === "") {
      setData({ clubs: [], athletes: [] });
      return;
    }
    fetch(`${API_URL}/api/search/${text}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error(error));
  };

  const buttonVariants = {
    active: "bg-[#FE4862] text-white",
    inactive: "",
  };

  return (
    <SafeAreaView className="">
      <View className="flex-row items-center pb-2 mx-4 mt-2 px-2">
        <View className="flex-1 flex-row space-x-2 bg-gray-200 p-3 rounded">
          <MagnifyingGlassIcon color="#FE4862" />
          <TextInput
            onChangeText={(text) => loadData(text)}
            placeholder="Search for athletes or clubs..."
          ></TextInput>
        </View>
      </View>
      <View className="flex-row justify-center mt-4">
        <View className="flex-row justify-between w-[40%]">
          <TouchableOpacity
            className={` px-4 py-2 rounded ${
              buttonVariants[selected === "clubs" ? "active" : "inactive"]
            }`}
            onPress={() => setSelected("clubs")}
          >
            <Text className={selected === "clubs" ? "text-white" : ""}>
              Clubs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={` px-4 py-2 rounded ${
              buttonVariants[selected === "athletes" ? "active" : "inactive"]
            }`}
            onPress={() => setSelected("athletes")}
          >
            <Text className={selected === "athletes" ? "text-white" : ""}>
              Athletes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-2">
        {data.clubs?.length > 0 &&
          selected === "clubs" &&
          data.clubs.map((club) => (
            <TouchableOpacity
              key={club.fpa_id}
              onPress={() => {
                navigation.navigate("ClubScreen", { fpa_id: club.fpa_id });
              }}
            >
              <View className=" p-3 mx-4 mt-2 px-3 bg-white border border-gray-200 rounded-lg shadow">
                <Text className="text-base font-bold tracking-tight text-gray-900">
                  {club.name}
                </Text>
                <Text className="font-normal text-sm text-gray-700">
                  {club.association}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        {data.athletes?.length > 0 &&
          selected === "athletes" &&
          data.athletes.map((athlete) => (
            <TouchableOpacity
              key={athlete.fpa_id}
              onPress={() => {
                navigation.navigate("AthleteScreen", {
                  fpa_id: athlete.fpa_id,
                });
              }}
            >
              <View className=" p-3 mx-4 mt-2 px-3 bg-white border border-gray-200 rounded-lg shadow">
                <Text className="text-base font-bold tracking-tight text-gray-900">
                  {athlete.name}
                </Text>
                <Text className="font-normal text-sm text-gray-700">
                  {athlete.club}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </SafeAreaView>
  );
}
