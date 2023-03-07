import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";

export default function FeaturedRow({ id, title, description }) {
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg§">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-gray-500 text-xs px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RestaurantCards... */}
        <RestaurantCard
          id={123}
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="123 Fake Street"
          short_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nisl nisl aliquet nisl, eu aliquet nisl nisl sit amet lorem. Sed euismod, nunc vel ultricies ultricies, nisl nisl aliquet nisl, eu aliquet nisl nisl sit amet lorem."
          dishes={["Sushi", "Sashimi", "Tempura"]}
          long={-0.1234}
          lat={51.1234}
        />
        <RestaurantCard
          id={123}
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="123 Fake Street"
          short_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nisl nisl aliquet nisl, eu aliquet nisl nisl sit amet lorem. Sed euismod, nunc vel ultricies ultricies, nisl nisl aliquet nisl, eu aliquet nisl nisl sit amet lorem."
          dishes={["Sushi", "Sashimi", "Tempura"]}
          long={-0.1234}
          lat={51.1234}
        />
        <RestaurantCard
          id={123}
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="123 Fake Street"
          short_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nisl nisl aliquet nisl, eu aliquet nisl nisl sit amet lorem. Sed euismod, nunc vel ultricies ultricies, nisl nisl aliquet nisl, eu aliquet nisl nisl sit amet lorem."
          dishes={["Sushi", "Sashimi", "Tempura"]}
          long={-0.1234}
          lat={51.1234}
        />
        <RestaurantCard
          id={123}
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="123 Fake Street"
          short_description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel ultricies ultricies, nisl nisl aliquet nisl, eu aliquet nisl nisl sit amet lorem. Sed euismod, nunc vel ultricies ultricies, nisl nisl aliquet nisl, eu aliquet nisl nisl sit amet lorem."
          dishes={["Sushi", "Sashimi", "Tempura"]}
          long={-0.1234}
          lat={51.1234}
        />
      </ScrollView>
    </View>
  );
}
