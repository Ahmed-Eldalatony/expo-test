import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "expo-router";
import { ChecklistItem } from "@/components/TaskComponent/ChecklistCompoenent";
import { OnboardingButton } from "../../components/OnboardingButton";

export default function OnboardingSlide() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center justify-center px-4">
      <Text className="text-3xl md:max-w-2xl mb-4 font-readexpro-semibold text-primary-800 text-center">
        {t("slide4.title")}
      </Text>
      <Image
        source={require("../../assets/images/notification1.png")}
        style={{ width: '100%', maxWidth: '500px' }}
        resizeMode="contain"
        resizeMethod="resize"
      />
      <Image
        source={require("../../assets/images/notification2.png")}
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
        demo={true}
        t={t}
        checkState={"completed"}
        subtasks={[
          {
            type: "choose",
            options: [
              { label: "جماعة في مسجد", triggerState: "completed" },
              { label: "جماعة دون مسجد", triggerState: "partiallycompleted" },
            ],
          },
        ]}
      />
      <View className="flex-row justify-between w-full px-4 mt-4">
        <OnboardingButton title={t("back")} onPress={() => router.push("/slide3")} />
        <OnboardingButton style={{ marginTop: 0 }} title={t("next")} onPress={() => router.push("/slide5")} />
      </View>
    </View>
  );
}

