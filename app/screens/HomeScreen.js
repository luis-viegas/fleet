import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Path, Svg } from "react-native-svg";
import api_url from "../constants/api_url";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { createStackNavigator } from "@react-navigation/stack";
import ClubScreen from "./ClubScreen";
import AthleteScreen from "./AthleteScreen";
import EventScreen from "./EventScreen";
import CompetitionScreen from "./CompetitionScreen";

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="HomeScreenComponent">
      <Stack.Screen
        name="HomeScreenComponent"
        component={HomeScreenComponent}
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

function HomeScreenComponent() {
  const navigation = useNavigation();

  const [showRecent, setShowRecent] = React.useState(false);
  const [showActive, setShowActive] = React.useState(false);
  const [showUpcoming, setShowUpcoming] = React.useState(false);

  icons = {
    recent: (
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
      />
    ),
    upcoming: (
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      />
    ),
    active: (
      <>
        <Path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
        <Path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
        />
      </>
    ),
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-gray-100 ">
      <ScrollView>
        <View className="pb-16">
          <Text className="font-semibold text-2xl px-8 mt-8">
            Welcome to Fleet!
          </Text>
          <View className="mt-8 px-8">
            <TouchableOpacity
              className="flex-row justify-between mb-4 bg-[#FE4862] px-4 py-2 rounded-lg mt-2"
              onPress={() => {
                setShowActive(!showActive);
              }}
            >
              <View className="flex-row">
                <Text className="font-semibold text-xl text-white">
                  Active events
                </Text>
                <View className="ml-2">
                  <Svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    stroke="white" //"#FE4862"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons["active"]}
                  </Svg>
                </View>
              </View>
              {showActive ? (
                <ChevronUpIcon size={26} color="white" />
              ) : (
                <ChevronDownIcon size={26} color="white" />
              )}
            </TouchableOpacity>
            {showActive && (
              <EventsList title="Active" icon="active" type="active" />
            )}

            <TouchableOpacity
              className="flex-row justify-between mb-4 bg-[#FE4862] px-4 py-2 rounded-lg mt-2"
              onPress={() => {
                setShowRecent(!showRecent);
              }}
            >
              <View className="flex-row">
                <Text className="font-semibold text-xl text-white">
                  Recent events
                </Text>
                <View className="ml-2">
                  <Svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons["recent"]}
                  </Svg>
                </View>
              </View>
              {showRecent ? (
                <ChevronUpIcon size={26} color="white" />
              ) : (
                <ChevronDownIcon size={26} color="white" />
              )}
            </TouchableOpacity>
            {showRecent && (
              <EventsList title="Recent" icon="recent" type="recent" />
            )}
            <TouchableOpacity
              className="flex-row justify-between mb-4 bg-[#FE4862] px-4 py-2 rounded-lg mt-2"
              onPress={() => {
                setShowUpcoming(!showUpcoming);
              }}
            >
              <View className="flex-row">
                <Text className="font-semibold text-xl text-white">
                  Upcoming events
                </Text>
                <View className="ml-2">
                  <Svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons["upcoming"]}
                  </Svg>
                </View>
              </View>
              {showUpcoming ? (
                <ChevronUpIcon size={26} color="white" />
              ) : (
                <ChevronDownIcon size={26} color="white" />
              )}
            </TouchableOpacity>
            {showUpcoming && (
              <EventsList title="Upcoming" icon="upcoming" type="upcoming" />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function EventsList({ title, icon, type }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [inputText, setInputText] = React.useState("");

  const filteredData = data.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return (
        el.name.toLowerCase().includes(inputText) ||
        el.location.toLowerCase().includes(inputText)
      );
    }
  });

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    fetch(api_url + `/api/homepage/events/${type}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-row justify-center items-center p-3">
        <ActivityIndicator size="large" color="#FE4862" />
      </View>
    );
  }

  return (
    <View className="mb-6">
      <View className="flex-1 flex-row space-x-2 text-xl bg-gray-200 p-2 py-3 rounded w-full mb-4">
        <MagnifyingGlassIcon color="#FE4862" />
        <TextInput
          onChangeText={(text) => inputHandler(text)}
          placeholder="Search for events or location..."
        ></TextInput>
      </View>
      <View className="">
        {filteredData.map((event, index) => (
          <EventCard
            key={index.toString() + title + event.fpa_id.toString()}
            event={event}
          />
        ))}
        {data.length == 0 && (
          <Text className="text-lg">Currently there are no {title} events</Text>
        )}
      </View>
    </View>
  );
}

function EventCard({ event }) {
  const navigation = useNavigation();
  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EventScreen", { event_id: event.fpa_id });
        }}
      >
        <View className="bg-white rounded-lg p-5 space-y-1 shadow shadow-sm">
          <Text className="text-lg">{event.name}</Text>
          <Text className="pt-2 ">
            {event.legacy
              ? event.dateBegin.split("T")[0].split("-")[1] +
                "-" +
                event.dateBegin.split("T")[0].split("-")[0]
              : event.dateBegin.split("T")[0] === event.dateEnd.split("T")[0]
              ? event.dateBegin.split("T")[0]
              : event.dateBegin.split("T")[0] +
                " - " +
                event.dateEnd.split("T")[0]}
          </Text>
          <View className="flex-row justify-between">
            <Text className="text-sm">{event.association}</Text>
            <Text className="w-2/3 text-right">{event.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
