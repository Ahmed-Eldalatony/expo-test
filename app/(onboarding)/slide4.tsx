import React from "react";
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
    <View className="flex-1 bg-white px-4 gap-4 items-center justify-center">
      <Text className="text-3xl md:max-w-2xl mb-4 font-readexpro-semibold text-primary-800 text-center">
        {t("slide4.title")}
      </Text>
      <Image
        source={require("../../assets/images/notification1.png")}
        className="max-h-36 "
        resizeMode="center"
        resizeMethod="resize"
      />
      <Image
        source={require("../../assets/images/notification2.png")}
        className="max-h-36 "
        resizeMode="center"
        resizeMethod="resize"
      />
      <Image
        source={require("../../assets/images/Arrow.svg")}
        className="-mt-2"
        style={{ width: 25, height: 56 }}
      />
      <ChecklistItem t={t} />
      <OnboardingButton title={t("next")} onPress={() => router.push("/slide5")} />
    </View>
  );
}
export const ChecklistItem = ({ t }) => {
  const [checked, setChecked] = useState(true);

  // Update these requires with the paths to your own images
  const checkedImage = require("../../assets/images/checked 3.svg");
  const uncheckedImage = require("../../assets/images/unchecked.svg");

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <LinearGradient
      locations={[0.2, 1]} // Adjust the first color to take up 70% of the gradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={["#FFD27D", "#4BE1A0"]}
      className=" w-full max-w-xl rounded-md p-1 border-gray-500"
    >
      <TouchableOpacity
        onPress={handleToggle}
        // Container styling with NativeWind (Tailwind)
        className=" flex-row-reverse  inline-flex w-full justify-between  max-w-xl text-start  rounded-md p-3 bg-white border border-gray-300"
      >
        {/* Checkbox image on the left */}

        <Text className="text-gray-800 text-base">{t("slide4.task")}</Text>
        <Image
          source={checked ? checkedImage : uncheckedImage}
          className="w-8  h-8"
        />

        {/* Label text on the right (Arabic text by default) */}
      </TouchableOpacity>
    </LinearGradient >
  );
};

