import { View, Text, Switch } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLanguage } from "../language";

export default function RankingsScreen() {
  const language = useSelector(selectLanguage);
  return (
    <SafeAreaView>
      <View className="pt-4">
        <Text className="text-center text-2xl font-bold">Rankings</Text>
        <View className="flex-row mt-8 justify-center">
          <Text className="text-lg">
            {language === "en" ? "Coming soon..." : "Em breve..."}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
