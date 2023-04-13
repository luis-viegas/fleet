import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useRoute } from "@react-navigation/native";
import api_url from "../constants/api_url";
import AthleteCard from "../components/AthleteCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClubScreen() {
  const {
    params: { fpa_id },
  } = useRoute();

  const [data, setData] = React.useState({ athletes: [] });
  const [loading, setLoading] = React.useState(true);
  const [inputText, setInputText] = React.useState("");

  const filteredData = data.athletes.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.name.toLowerCase().includes(inputText);
    }
  });

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    fetch(api_url + "/api/profile/club/" + fpa_id)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView>
      {loading && (
        <View className="flex-row justify-center items-center h-96">
          <Text className="text-2xl font-semibold">Loading...</Text>
        </View>
      )}
      {!loading && (
        <ScrollView>
          <View className="px-12 mt-12 items-center">
            <View className="flex-row justify-center mb-8">
              <Image
                source={
                  data.profile_pic === ""
                    ? require("../assets/profile_club.jpg")
                    : { uri: data.profile_pic }
                }
                alt="profile"
                className="w-56 h-56 rounded-xl object-cover"
              />
            </View>
            <Text className="text-2xl font-semibold">{data.name}</Text>

            <View className="flex-row w-full justify-between font-semibold text-lg mt-8">
              <Text className="text-xl">{data.association}</Text>
              <Text className="text-xl">{data.acronym}</Text>
            </View>
            <View className="flex-row mt-4 ">
              <View className="flex-1 flex-row space-x-2 text-xl bg-gray-200 p-2 py-3 rounded w-full">
                <MagnifyingGlassIcon color="#FE4862" />
                <TextInput
                  onChangeText={(text) => inputHandler(text)}
                  placeholder="Search for competitions..."
                ></TextInput>
              </View>
            </View>
          </View>
          <View className="flex-wrap flex-row justify-between mb-16 pt-6 px-10">
            {filteredData.map((athlete) => (
              <AthleteCard
                key={athlete.fpa_id}
                athlete={athlete}
                club={data.acronym}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
