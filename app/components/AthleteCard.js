import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Skeleton } from "@rneui/themed";

export default function AthleteCard() {
  return (
    <View className="mb-3 w-[50%] space-y-2 items-center pt-8">
      <Skeleton circle width={50} height={50} />
      <Skeleton width={120} height={10} />
      <Skeleton width={80} height={10} />
    </View>
  );
}
