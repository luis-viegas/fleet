import { View, Text } from "react-native";
import React from "react";

export default function CustomTabBarButton(props) {
  const { children } = props;
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
}
