import { View, Text, ScrollView } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

export default function Categories() {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Pickup" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Pickup" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Pickup" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Pickup" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Pickup" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Pickup" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Pickup" />
      <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Pickup" />
    </ScrollView>
  );
}
