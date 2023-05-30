import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AthleteClubCard({ athlete }) {
  const { name, club, fpa_id } = athlete;
  const navigation = useNavigation();
  return (
    <View className="w-[45%] h-40 bg-white border shadow   border-gray-200 rounded-lg mb-4">
      <TouchableOpacity
        className="w-full h-full items-center pt-4"
        onPress={() => {
          navigation.push("AthleteScreen", { athlete });
        }}
      >
        <Image
          source={require("../assets/profile_athlete.png")}
          alt="profile"
          className="w-20 h-20 mb-2 rounded-lg object-cover"
        />
        <Text className="mb-2">{name}</Text>
        <Text>{club}</Text>
      </TouchableOpacity>
    </View>
  );
}
