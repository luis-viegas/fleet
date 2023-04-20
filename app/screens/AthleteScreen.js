import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import api_url from "../constants/api_url";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AthleteScreen() {
  const {
    params: { fpa_id },
  } = useRoute();

  const navigation = useNavigation();

  const [athleteObj, setAthleteObj] = React.useState({});

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [inputText, setInputText] = React.useState("");

  const filteredData = data.competitions?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.event_name.toLowerCase().includes(inputText);
    }
  });

  useEffect(() => {
    fetch(api_url + "/api/profile/athlete/" + fpa_id)
      .then((response) => response.json())
      .then((json) => {
        setAthleteObj(json);
        setLoading(false);
      });
  }, []);

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    fetch(api_url + "/api/profile/athlete/" + fpa_id + "/competitions")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  return (
    <SafeAreaView className="">
      {!loading && (
        <ScrollView>
          <View className="items-center space-y-6 pb-16">
            <Image
              className="rounded w-56 h-56 mt-6"
              source={
                athleteObj.profile_pic === ""
                  ? require("../assets/profile_athlete.png")
                  : { uri: athleteObj.profile_pic }
              }
              alt="profile"
            />
            <View className="items-center space-y-4 w-full px-12">
              <Text className="text-4xl font-semibold">{athleteObj.name}</Text>
              <View className="flex-row justify-between w-full items-baseline">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ClubScreen", {
                      fpa_id: athleteObj.club_id,
                    });
                  }}
                >
                  <View className="bg-gray-200 px-3 py-1 rounded-lg shadow-sm">
                    <Text className="text-2xl ">{athleteObj.club}</Text>
                  </View>
                </TouchableOpacity>
                <Text className="text-xl">{athleteObj.nationality}</Text>
              </View>
            </View>

            <View className="flex-row justify-between w-full px-12">
              <Text className="text-xl">{athleteObj.level}</Text>
              <Text className="text-xl">{athleteObj.birth_year}</Text>
            </View>
            <View className="flex-row px-6">
              <View className="flex-1 flex-row space-x-2 text-xl bg-gray-200 p-2 py-3 rounded w-full">
                <MagnifyingGlassIcon color="#FE4862" />
                <TextInput
                  onChangeText={(text) => inputHandler(text)}
                  placeholder="Search for competitions..."
                ></TextInput>
              </View>
            </View>

            <View className="px-6 space-y-4 w-full">
              {filteredData &&
                filteredData.map((competition) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("CompetitionScreen", {
                        competition_id: competition.competition_id,
                      });
                    }}
                    key={
                      competition.competition_id.toString() + competition.score
                    }
                  >
                    <View className="bg-white rounded-lg p-4 space-y-1 shadow shadow-sm w-full">
                      <Text className="text-lg">{competition.event_name}</Text>
                      <View className="flex-row justify-between pr-2">
                        <Text className="text-sm">
                          {competition.event_type}
                        </Text>
                        <Text>
                          {competition.position}º - {competition.score}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
