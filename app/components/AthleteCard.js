import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { memo, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function AthleteClubCard({ athlete, club }) {
  const navigation = useNavigation();

  return (
    <View className="w-[45%] h-40 bg-white border shadow   border-gray-200 rounded-lg mb-4">
      <TouchableOpacity
        className="w-full h-full items-center pt-4"
        onPress={() => {
          navigation.navigate("AthleteScreen", { fpa_id: athlete.fpa_id });
        }}
      >
        <Image
          source={
            athlete.profile_pic === ""
              ? require("../assets/profile_athlete.png")
              : { uri: athlete.profile_pic }
          }
          alt="profile"
          className="w-20 h-20 mb-2 rounded-lg object-cover"
        />
        <Text className="mb-2">{athlete.name}</Text>
        <Text>{club}</Text>
      </TouchableOpacity>
    </View>
  );
}
