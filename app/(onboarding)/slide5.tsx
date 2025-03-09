import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "../../hooks/useTranslation";

import { useRouter } from "expo-router";

import { OnboardingButton } from "../../components/OnboardingButton";

export default function OnboardingSlide() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1  px-1 bg-white items-center justify-center">
      <Text className="text-3xl md:max-w-2xl mb-4 font-readexpro-semibold text-primary-800 text-center">
        {t("slide5.title")}
      </Text>
      <Text className="text-lg mt-6 font-readexpro-semibold text-primary-900 text-center">
        {t("slide5.title2")}
      </Text>
      <ChecklistItem
        t={t}
        checkState="notcompleted"
        demo={false}
        subtasks={[
          { label: "Mark Complete", triggerState: "completed" },
          { label: "Partial Complete", triggerState: "partiallycompleted" }
        ]}
      />
      <ChecklistItem
        t={t}
        checkState="notcompleted"
        demo={false}
        subtasks={[
          { label: "Mark Complete", triggerState: "completed" },
          { label: "Partial Complete", triggerState: "partiallycompleted" }
        ]}
      />
      <OnboardingButton style={{ marginTop: 30 }} title={t("next")} onPress={() => router.push("/slide5")} />
    </View>
  );
}


export const ChecklistItem = ({ t, checkState, demo, subtasks }) => {
  const [checked, setChecked] = useState(checkState);
  // Track selected subtask index
  const [selectedSubtaskIndex, setSelectedSubtaskIndex] = useState(-1);

  // Sync subtask selection with initial checkState
  useEffect(() => {
    if (subtasks) {
      const index = subtasks.findIndex(sub => sub.triggerState === checkState);
      setSelectedSubtaskIndex(index);
    }
  }, [checkState, subtasks]);

  const imageMap = {
    notcompleted: require("../../assets/images/unchecked.svg"),
    partiallycompleted: require("../../assets/images/mid-check.svg"),
    completed: require("../../assets/images/checked 3.svg"),
  };

  // Updated toggle handler
  const handleToggle = () => {
    setChecked(prev => {
      let newState;
      if (prev === "notcompleted") newState = "partiallycompleted";
      else if (prev === "partiallycompleted") newState = "completed";
      else newState = "notcompleted";

      // Find matching subtask index
      const index = subtasks?.findIndex(sub => sub.triggerState === newState) ?? -1;
      setSelectedSubtaskIndex(index);

      return newState;
    });
  };

  // Updated subtask handler
  const handleSubtaskPress = (newState, index) => {
    setChecked(newState);
    setSelectedSubtaskIndex(index);
  };

  //
  //
  const getGradientLocations = () => {
    switch (checked) {
      case "partiallycompleted":
        return [0, .8];
      case "completed":
        return [0, .2];
      default:
        return [.8, 0];
    }
  };
  //
  const gradientColors = ["#FFD27D", "#4BE1A0"]
  const gradientLocations = getGradientLocations()

  // ... rest of your existing code (getGradientColors, gradientColors, etc) ...

  return (
    <View className="w-full max-w-[500px] mt-2">

      {/* Main Task (existing code) */}
      <LinearGradient
        locations={gradientLocations}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors}
        className="w-full rounded-lg p-1  border-gray-500"
        dither="true"
      >
        <View>
          {/* Main Task */}
          <TouchableOpacity
            onPress={() => !demo && handleToggle()}
            className={`flex-row-reverse inline-flex w-full justify-between max-w-xl text-start rounded-md p-2 bg-white border border-gray-300 ${demo ? "bg-primary-200" : ""
              }`}
          >
            <Text className="text-gray-800 !text-lg">{t("slide4.task")}</Text>
            <Image source={imageMap[checked]} className="w-8 h-8 my-auto" />
          </TouchableOpacity>

          {/* Subtasks */}

        </View>
      </LinearGradient >

      {
        subtasks && (
          <View className="ms-5">
            <View className="mt-2 border w-full border-gray-800 rounded-md p-1 flex-row justify-between">
              {subtasks.map((subtask, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => !demo && handleSubtaskPress(subtask.triggerState, index)}
                  className={`p-1 w-[50%] flex-row ${selectedSubtaskIndex === index ? 'bg-yellow-200' : ''
                    }`}
                >
                  <Text className="text-gray-600">{subtask.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )
      }
    </View >
  );
};
