import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "expo-router";

export default function OnboardingSlide() {
  const { width } = Dimensions.get("window");
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 px-4 gap-12 items-center justify-center">
      <Text className="text-3xl mb-4 font-readexpro-semibold text-primary-800 text-center">
        {t("slide3.title")}
      </Text>

      <View className="bg-gray-200 p-4 rounded-lg ">
        <Text className="text-lg text-center mb-2 font-readexpro-semibold text-primary-900">
          {t("slide3.hadeeth1")[0]}
        </Text>
        <View className="flex-row leading-relaxed rtl flex-end ml-auto">
          <Text className=" text-2xl leading-relaxed font-amiri-bold text-secondary-500">
            "{t("slide3.hadeeth1")[1]}"{" "}
            <Text className="text-primary-900">{t("slide3.hadeeth1")[2]} </Text>
            <Text className="text-secondary-500">
              "{t("slide3.hadeeth1")[3]}"{" "}
            </Text>
            <Text className="text-primary-900">{t("slide3.hadeeth1")[4]} </Text>
            <Text className="text-secondary-500 ,">
              "{t("slide3.hadeeth1")[5]}"
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <View className="bg-gray-200 p-4 text-center rounded-lg ">
          <Text className="text-lg mb-2 text-center font-readexpro-semibold text-primary-900">
            {t("slide3.hadeeth2")[0]}
          </Text>
          <View className="flex-row leading-relaxed rtl flex-end ml-auto">
            <Text className=" text-2xl leading-relaxed font-amiri-bold text-secondary-500">
              "{t("slide3.hadeeth2")[1]}"{" "}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push("/slide4")}>
        <LinearGradient
          colors={["#FFD27D", "#4BE1A0"]} // Example gradient colors
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="font-readexpro-medium py-2 px-4 rounded-lg"
        >
          <Text
            className="font-readexpro-medium text-white text-2xl font-bold"
            style={{ writingDirection: "rtl" }}
          >
            {t("next")}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
