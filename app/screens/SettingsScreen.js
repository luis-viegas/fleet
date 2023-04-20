import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WrenchIcon } from "react-native-heroicons/outline";
import { TextInput } from "react-native-gesture-handler";
import { BoltIcon } from "react-native-heroicons/solid";

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  function submiteFeedback() {
    Alert.alert(
      "Feedback Submitted",
      "We received your feedback and will analyze it as soon as possible. Thank you for your help!",
      [{ text: "Close", onPress: () => setModalVisible(!modalVisible) }],
      {
        cancelable: false,
      }
    );
  }
  return (
    <SafeAreaView>
      <View className="pt-4 items-center">
        <Text className="text-center text-2xl mb-8 font-bold">Fleet</Text>
        <BoltIcon color={"#FE4862"} size={120} />

        <View className="items-center mt-8 mb-6 px-10 ">
          <Text className="font-bold text-lg ">About Fleet</Text>
          <Text className="text-center mt-2">
            Fleet is 100% free and will remain this way forever, Fleet's purpose
            is to enable Portuguese Athletics Information to be accessed on
            mobile devices. Fleet is, at the current date, not affiliated with
            any Athletics Federation or any other Athletics related
            organization.
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
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
                <Text className="text-white text-base font-semibold">X</Text>
              </TouchableOpacity>
            </View>
            <View className="px-8">
              <Text className="text-xs">Have you experienced any bug? </Text>
              <Text className="text-xs">Do you have any suggestions?</Text>
              <Text className="text-xs">Is something not as you expected?</Text>

              <TextInput
                className="border border-gray-300 h-40 rounded mt-6 p-1"
                placeholder="Wrtie your feedback here..."
                keyboardType="default"
                multiline
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
      </Modal>
    </SafeAreaView>
  );
}
