import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { ChecklistItem } from "@/components/TaskComponent/ChecklistCompoenent";
import { useRouter } from "expo-router";
import { OnboardingButton } from "../../components/OnboardingButton";

export default function OnboardingSlide() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center justify-center px-4">
      <Text className="text-3xl md:max-w-2xl mb-4 font-readexpro-semibold text-primary-800 text-center">
        {t("slide7.title")}
      </Text>
      <Image
        source={require("../../assets/images/notification3.png")}
        style={{ width: '100%', maxWidth: '500px' }}
        resizeMode="contain"
        resizeMethod="resize"
      />
      <Image
        source={require("../../assets/images/notification4.png")}
        style={{ width: '100%', maxWidth: '500px' }}
        resizeMode="contain"
        resizeMethod="resize"
      />
      <Image
        source={require("../../assets/images/Arrow.svg")}
        className="-mt-2"
        style={{ width: 25, height: 56 }}
      />
      <ChecklistItem
        t={t}
        checkState="notcompleted"
        demo={false}
        subtasks={[
          {
            type: "choose",
            defaultSelectedSubtaskIndex: 0,
            options: [
              { label: "جماعة في مسجد", triggerState: "completed" },
              { label: "جماعة دون مسجد", triggerState: "partiallycompleted" },
            ],
          },
          {
            type: "counter",
            options: [
              { label: "2 ركعات", triggerState: 2 },
              { label: "4 ركعات", triggerState: 4 },
              { label: "6 ركعات", triggerState: 6 },
            ],
          },
        ]}
      />
      <View className="flex-row justify-between w-full px-4 mt-4">
        <OnboardingButton title={t("back")} onPress={() => router.push("/slide6")} />
        <OnboardingButton style={{ marginTop: 0 }} title={t("next")} onPress={() => router.push("/slide8")} />
      </View>
    </View>
  );
}

