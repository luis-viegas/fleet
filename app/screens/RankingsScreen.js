import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WrenchIcon } from "react-native-heroicons/outline";

export default function RankingsScreen() {
  return (
    <SafeAreaView>
      <View className="pt-4">
        <Text className="text-center text-2xl font-bold">Rankings</Text>
        <View className="flex-row mt-8 justify-center">
          <Text className="text-lg">Coming soon...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
