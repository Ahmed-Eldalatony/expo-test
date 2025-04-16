import React from "react";
import { View, Text, Image } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "expo-router";

import { OnboardingButton } from "../../components/OnboardingButton";

export default function OnboardingSlide() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-4 gap-12 items-center justify-center">
      <Text className="text-3xl mb-4 font-readexpro-semibold text-primary-800 text-center">
        {t("slide3.title")}
      </Text>

      <View className="bg-gray-100/70 p-4 rounded-lg ">
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
        <View className="bg-gray-100/70 p-4 text-center rounded-lg ">
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
      <View className="flex-row justify-between w-full px-4">
        <OnboardingButton title={t("back")} onPress={() => router.push("/slide2")} />
        <OnboardingButton title={t("next")} onPress={() => router.push("/slide4")} />
      </View>
    </View>
  );
}
