import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Path, Svg } from "react-native-svg";
import api_url from "../constants/api_url";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectLanguage } from "../language";

export default function CompetitionScreen() {
  const {
    params: { competition_id },
  } = useRoute();
  const [competition, setCompetition] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState("registered");
  const [refreshing, setRefreshing] = React.useState(false);

  const navigation = useNavigation();
  const language = useSelector(selectLanguage);

  useEffect(() => {
    fetch(api_url + "/api/competition/" + competition_id)
      .then((response) => response.json())
      .then((json) => {
        setCompetition(json);
        setLoading(false);
      });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(api_url + "/api/competition/" + competition_id)
      .then((response) => response.json())
      .then((json) => {
        setCompetition(json);
        setRefreshing(false);
      });
  }, []);

  const buttonVariants = {
    active: "bg-[#FE4862] text-white",
    inactive: "",
  };

  return (
    <SafeAreaView>
      {loading && (
        <View className="justify-center h-full items-center">
          <ActivityIndicator size="large" color="#FE4862" />
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!loading && (
          <View className="items-center space-y-6 pb-24 pt-4 px-8">
            <TouchableOpacity
              onPress={() => {
                navigation.push("EventScreen", {
                  event_id: competition.event_id,
                });
              }}
            >
              <View className="bg-gray-200 px-4 py-2 rounded-lg shadow-sm">
                <Text className="text-xl ">{competition.event_name}</Text>
              </View>
            </TouchableOpacity>
            <Text className="text-4xl font-semibold text-center">
              {competition.name}
            </Text>
            <Text className="text-xl ">{competition.startTime}</Text>

            <View className="flex-row justify-between items-center w-full px-4">
              <Text className="text-xl">{competition.level}</Text>
              <Text className="text-xl">
                <GenderIcon gender={competition.gender} />
              </Text>
            </View>

            <View className="flex-row justify-center mt-4">
              <View className="flex-row justify-between">
                <TouchableOpacity
                  className={` px-4 py-2 rounded ${
                    buttonVariants[
                      selected === "registered" ? "active" : "inactive"
                    ]
                  }`}
                  onPress={() => setSelected("registered")}
                >
                  <Text
                    className={selected === "registered" ? "text-white" : ""}
                  >
                    {language === "en" ? "Registered" : "Inscritos"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={` px-4 py-2 rounded ${
                    buttonVariants[
                      selected === "startlist" ? "active" : "inactive"
                    ]
                  }`}
                  onPress={() => setSelected("startlist")}
                >
                  <Text
                    className={selected === "startlist" ? "text-white" : ""}
                  >
                    {language === "en" ? "Startlist" : "Lista de Partida"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={` px-4 py-2 rounded ${
                    buttonVariants[
                      selected === "results" ? "active" : "inactive"
                    ]
                  }`}
                  onPress={() => setSelected("results")}
                >
                  <Text className={selected === "results" ? "text-white" : ""}>
                    {language === "en" ? "Results" : "Resultados"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              className={
                "w-full " + (selected !== "registered" ? " hidden" : "")
              }
            >
              <Text className="font-semibold text-xl mb-4">
                {language === "en" ? "Registered" : "Inscritos"}
              </Text>
              {competition.registered.map(([id, pb]) => (
                <RegisteredCard
                  key={"registered" + id.toString() + pb.toString()}
                  id={id}
                  pb={pb}
                />
              ))}
              {competition.registered.length === 0 && (
                <Text>
                  {language === "en"
                    ? "No information available yet."
                    : "Sem informação disponível."}
                </Text>
              )}
            </View>

            <View
              className={
                "w-full " + (selected !== "startlist" ? " hidden" : "")
              }
            >
              <Text className="font-semibold text-xl mb-4">
                {language === "en" ? "Startlist" : "Lista de Partida"}
              </Text>
              {competition.startlist.map((array, index) => (
                <View key={"startlist_serie" + index}>
                  <Text className="font-semibold text-xl mb-4">
                    {language === "en" ? "Series" : "Série"} {index + 1}
                  </Text>
                  {array.map(([id, lane]) => (
                    <StartlistCard key={"startlist" + id} id={id} lane={lane} />
                  ))}
                </View>
              ))}
              {competition.startlist.length === 0 && (
                <Text>
                  {language === "en"
                    ? "No information available yet."
                    : "Sem informação disponível."}
                </Text>
              )}
            </View>

            <View
              className={"w-full " + (selected !== "results" ? " hidden" : "")}
            >
              <Text className="font-semibold text-xl mb-4">
                {language === "en" ? "Results" : "Resultados"}
              </Text>
              {competition.results.map((array, index) => (
                <View key={"result_serie" + index}>
                  <Text className="font-semibold text-xl mb-4">
                    {language === "en" ? "Series" : "Série"} {index + 1}
                  </Text>
                  {array.map(([id, result, position]) => (
                    <ResultsCard
                      key={"results" + id}
                      id={id}
                      result={result}
                      position={position}
                    />
                  ))}
                </View>
              ))}
              {competition.results.length === 0 && (
                <Text>
                  {language === "en"
                    ? "No information available yet."
                    : "Sem informação disponível."}
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function GenderIcon({ gender }) {
  return (
    <View className="h-10 w-10 pt-1">
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

function RegisteredCard({ id, pb }) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isValidProfile, setIsValidProfile] = React.useState(true);
  useEffect(() => {
    if (id.startsWith("NOT_ID-")) {
      setData({ name: id.substring(7), club: "" });
      setLoading(false);
      setIsValidProfile(false);
      return;
    }
    fetch(api_url + "/api/profile/athlete/" + id)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
    setLoading(false);
  }, []);

  const navigation = useNavigation();

  if (!loading && data?.name === undefined) return null;

  if (!isValidProfile) {
    return (
      <View className="bg-white rounded-lg px-4 py-5 space-y-1 w-full shadow shadow-sm mb-4">
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View className="w-full flex-row justify-between">
            <View>
              <Text>{data?.name}</Text>
            </View>
            <Text>{pb}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("AthleteScreen", { fpa_id: data.fpa_id });
      }}
    >
      <View className="bg-white rounded-lg px-4 py-5 space-y-1 w-full shadow shadow-sm mb-4">
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View className="w-full flex-row justify-between">
            <View>
              <Text>
                {data?.name} - {data?.club}
              </Text>
            </View>
            <Text>{pb}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function ResultsCard({ id, result, position }) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isValidProfile, setIsValidProfile] = React.useState(true);
  useEffect(() => {
    if (id.startsWith("NOT_ID-")) {
      setData({ name: id.substring(7), club: "" });
      setLoading(false);
      setIsValidProfile(false);
      return;
    }
    fetch(api_url + "/api/profile/athlete/" + id)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
    setLoading(false);
  }, []);

  const navigation = useNavigation();

  if (!loading && data?.name === undefined) return null;

  if (!isValidProfile) {
    return (
      <View className="bg-white rounded-lg px-4 py-5 space-y-1 w-full shadow shadow-sm mb-4">
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View className="w-full flex-row justify-between">
            <View>
              <Text>{data?.name}</Text>
            </View>
            <Text>
              {position}º - {result}
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("AthleteScreen", { fpa_id: data.fpa_id });
      }}
    >
      <View className="bg-white rounded-lg px-4 py-5 space-y-1 w-full shadow shadow-sm mb-4">
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View className="w-full flex-row justify-between">
            <View>
              <Text>
                {data?.name} - {data?.club}
              </Text>
            </View>
            <Text>
              {position}º - {result}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function StartlistCard({ id, lane }) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isValidProfile, setIsValidProfile] = React.useState(true);
  useEffect(() => {
    if (id.startsWith("NOT_ID-")) {
      setData({ name: id.substring(7), club: "" });
      setLoading(false);
      setIsValidProfile(false);
      return;
    }
    fetch(api_url + "/api/profile/athlete/" + id)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
    setLoading(false);
  }, []);

  const navigation = useNavigation();
  const language = useSelector(selectLanguage);

  if (!loading && data?.name === undefined) return null;

  if (!isValidProfile) {
    return (
      <View className="bg-white rounded-lg px-4 py-5 space-y-1 w-full shadow shadow-sm mb-4">
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View className="w-full flex-row justify-between">
            <View>
              <Text>{data?.name}</Text>
            </View>
            <Text>
              {language === "en" ? "Lane" : "Pista"} - {lane}
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("AthleteScreen", { fpa_id: data.fpa_id });
      }}
    >
      <View className="bg-white rounded-lg px-4 py-5 space-y-1 w-full shadow shadow-sm mb-4">
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View className="w-full flex-row justify-between">
            <View>
              <Text>
                {data?.name} - {data?.club}
              </Text>
            </View>
            <Text>
              {language === "en" ? "Lane" : "Pista"} - {lane}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
