import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import api_url from "../constants/api_url";
import { Path, Svg } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { selectLanguage } from "../language";

export default function EventScreen() {
  const {
    params: { event_id },
  } = useRoute();

  const navigation = useNavigation();

  const language = useSelector(selectLanguage);

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [inputText, setInputText] = React.useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.toLowerCase();
    setInputText(lowerCase);
  };

  useEffect(() => {
    (async () => {
      await fetch(api_url + "/api/event/" + event_id)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        });
    })();
  }, []);
  return (
    <SafeAreaView>
      {loading ? (
        <View className="h-full justify-center items-center">
          <ActivityIndicator size="large" color="#FE4862" />
        </View>
      ) : (
        <ScrollView>
          <View className="pb-24">
            <Text className="text-4xl pt-6 px-12 text-center">{data.name}</Text>
            <Text className="pt-2 text-lg text-center">
              {data.legacy
                ? data.dateBegin.split("T")[0].split("-")[1] +
                  "-" +
                  data.dateBegin.split("T")[0].split("-")[0]
                : data.dateBegin.split("T")[0]}
            </Text>
            <Text className="text-xl ml-8 mt-10">
              <HomeIcon color="#FE4862" size={18} />
              {"  "}
              {data.association}
            </Text>
            <Text className="text-xl ml-8">
              <MapPinIcon color="#FE4862" size={18} />
              {"  "}
              {data.location}
            </Text>
            <View className="w-full px-8 flex-1 mt-4">
              <View className="flex-1 flex-row space-x-2 text-xl bg-gray-200 p-2 py-3 rounded w-full">
                <MagnifyingGlassIcon color="#FE4862" />
                <TextInput
                  onChangeText={(text) => inputHandler(text)}
                  placeholder={
                    language === "en"
                      ? "Search for competitions..."
                      : "Pesquisar por competições..."
                  }
                ></TextInput>
              </View>
            </View>
            <View className="px-8 w-full">
              {data.competitions &&
                data.competitions?.map((competition_id) => (
                  <CompetitionCard
                    key={competition_id}
                    competition_id={competition_id}
                    inputText={inputText}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function CompetitionCard({ competition_id, inputText }) {
  const [competition, setCompetition] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    fetch(api_url + "/api/competition/" + competition_id)
      .then((response) => response.json())
      .then((json) => {
        setCompetition(json);
        setLoading(false);
      });
  }, []);

  if (
    inputText !== "" &&
    !loading &&
    !(
      competition.name?.toLowerCase().includes(inputText) ||
      competition.competition_type?.toLowerCase().includes(inputText)
    )
  ) {
    return (
      <View className="hidden">
        <Text></Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("CompetitionScreen", {
          competition_id: competition_id,
        });
      }}
    >
      <View className="bg-white w-full rounded-lg p-4 space-y-1 mt-4 shadow shadow-sm">
        {loading && (
          <View className="justify-center items-center">
            <ActivityIndicator size="large" color="#FE4862" />
          </View>
        )}
        {!loading && (
          <>
            <View className="flex-row">
              <Text className="text-lg">{competition.name}</Text>
              <GenderIcon gender={competition.gender} />
            </View>

            <Text>{competition.level}</Text>
            <Text>{competition.startTime}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

function GenderIcon({ gender }) {
  return (
    <View className="h-6 w-6 pt-1">
      {gender === "Female" ? (
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M9 18H15M12 13V21M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      ) : (
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M12 11C9.23858 11 7 13.2386 7 16C7 18.7614 9.23858 21 12 21C14.7614 21 17 18.7614 17 16C17 13.2386 14.7614 11 12 11ZM12 11V3M12 3L16 7M12 3L8 7"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      )}
    </View>
  );
}
