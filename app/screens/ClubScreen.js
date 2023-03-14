import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useRoute } from "@react-navigation/native";

import AthleteCard from "../components/AthleteCard";

export default function ClubScreen() {
  const {
    params: { club },
  } = useRoute();

  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    console.log(club);
    fetch(`http://localhost:3000/api/profile/club/athletes/${club._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-12 mt-12 items-center">
          <View className="flex-row justify-center mb-8">
            <Image
              source={require("../assets/profile_club.jpg")}
              alt="profile"
              className="w-56 h-56 rounded-xl object-cover"
            />
          </View>
          <Text className="text-2xl font-semibold">{club.name}</Text>

          <View className="flex-row w-full justify-between font-semibold text-lg mt-8">
            <Text className="text-xl">{club.association}</Text>
            <Text className="text-xl">{club.acronym}</Text>
          </View>
          <View className="flex-row w-full justify-between items-center mt-12">
            <Text className="text-lg">Athletes</Text>
            <View className="flex-1 ml-8 flex-row space-x-2 text-xl bg-gray-200 p-2 rounded">
              <MagnifyingGlassIcon color="#FE4862" />
              <TextInput
                onChangeText={(text) => loadData(text)}
                placeholder="Search for athletes or clubs..."
              ></TextInput>
            </View>
          </View>
        </View>
        <View className="flex-wrap flex-row justify-between pt-2">
          {loading &&
            loadingArray.map((athlete) => <AthleteCard key={athlete} />)}
          {!loading &&
            data.map((athlete) => (
              <Text key={athlete._id}>{athlete.name}</Text>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
