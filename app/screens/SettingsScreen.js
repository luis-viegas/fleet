import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { BoltIcon } from "react-native-heroicons/solid";
import api_url from "../constants/api_url";

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  function submiteFeedback() {
    if (email == "") {
      Alert.alert(
        "Email Empty",
        "Please enter your email before submitting.",
        [{ text: "Close" }],
        {
          cancelable: false,
        }
      );
      return;
    }
    if (feedback == "") {
      Alert.alert(
        "Feedback Empty",
        "Please enter some feedback before submitting.",
        [{ text: "Close" }],
        {
          cancelable: false,
        }
      );
      return;
    }
    fetch(api_url + "/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback: feedback,
        email: email,
      }),
    });
    Alert.alert(
      "Feedback Submitted",
      "We received your feedback and will analyze it as soon as possible. Thank you for your help!",
      [{ text: "Close", onPress: () => setModalVisible(!modalVisible) }],
      {
        cancelable: false,
      }
    );
    setEmail("");
    setFeedback("");
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="pb-24">
          <View className="pt-4 items-center">
            <Text className="text-center text-2xl mb-8 font-bold">Fleet</Text>
            <BoltIcon color={"#FE4862"} size={120} />

            <View className="items-center mt-8 mb-6 px-10 ">
              <Text className="font-bold text-lg ">About Fleet</Text>
              <Text className="text-center mt-2">
                Fleet is 100% free and will remain this way forever, Fleet's
                purpose is to enable Portuguese Athletics Information to be
                accessed on mobile devices. Fleet is, at the current date, not
                affiliated with any Athletics Federation or any other Athletics
                related organization.
              </Text>

              <Text className="text-center mt-10 font-semibold ">
                A project by Luís Viegas
              </Text>

              <Text className="text-center mt-10 mb-3 px-6">
                Helpful contributions who helped bring this project to life:
              </Text>
              <Text className="mb-1">André Oliveira</Text>
              <Text className="mb-1">Lucas Pinheiro</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <View className="flex-row justify-center mb-4 bg-[#FE4862] px-4 py-2 rounded-lg mt-10 w-36">
                <Text className="text-white">Leave feedback</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <DismissKeyboard>
              <View className="flex-1 flex-row justify-center items-center px-10">
                <View className="bg-white py-5   align-middle shadow rounded-lg flex-1 relative">
                  <View className="flex-row mb-6 pl-8 pr-4   justify-between space-x-6 w-full">
                    <Text className="font-bold text-2xl w-2/3">
                      Leave your feedback!
                    </Text>
                    <TouchableOpacity
                      className=" bg-[#FE4862] w-8 h-8 rounded-full flex-row justify-center items-center "
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text className="text-white text-base font-semibold">
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="px-8">
                    <Text className="text-xs">
                      Have you experienced any bug?{" "}
                    </Text>
                    <Text className="text-xs">
                      Do you have any suggestions?
                    </Text>
                    <Text className="text-xs">
                      Is something not as you expected?
                    </Text>

                    <TextInput
                      className="border border-gray-300 rounded mt-6 p-1"
                      placeholder="Write your email here..."
                      onChangeText={setEmail}
                    />

                    <TextInput
                      className="border border-gray-300 h-40 rounded mt-3 p-1"
                      placeholder="Write your feedback here..."
                      keyboardType="default"
                      multiline={true}
                      style={{ textAlignVertical: "top" }}
                      onChangeText={setFeedback}
                    />
                    <TouchableOpacity
                      className="flex-row justify-center mb-4 bg-[#FE4862] px-4 py-2 rounded-lg mt-10 w-full"
                      onPress={submiteFeedback}
                    >
                      <Text className="text-white text-lg">Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </DismissKeyboard>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
