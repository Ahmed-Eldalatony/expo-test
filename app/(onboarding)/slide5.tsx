import React from "react";
import { View, Text, } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "expo-router";
import { OnboardingButton } from "../../components/OnboardingButton";
import { ChecklistItem } from "@/components/TaskComponent/ChecklistCompoenent";

export default function OnboardingSlide(): JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 px-4 bg-white items-center justify-center">
      <Text className="text-3xl md:max-w-2xl mb-4 font-readexpro-semibold text-primary-800 text-center">
        {t("slide5.title")}
      </Text>
      <Text className="text-lg mt-6 font-readexpro-semibold text-primary-900 text-center">
        {t("slide5.title2")}
      </Text>
      <ChecklistItem
        t={t}
        checkState="notcompleted"
        demo={true}
        defaultSelectedSubtaskIndex={1}
        subtasks={[
          {
            type: "choose",
            defaultSelectedSubtaskIndex: 1,
            options: [
              { label: "جماعة في مسجد", triggerState: "completed" },
              { label: "جماعة دون مسجد", triggerState: "partiallycompleted" },
            ],
          },
        ]}
      />
      <Text className="text-lg mt-6 font-readexpro-semibold text-primary-900 text-center">
        {t("slide5.title3")}
      </Text>
      <ChecklistItem
        t={t}
        checkState="notcompleted"
        demo={true}
        defaultSelectedSubtaskIndex={0}
        subtasks={[
          {
            type: "choose",
            defaultSelectedSubtaskIndex: 0,
            options: [
              { label: "جماعة في مسجد", triggerState: "completed" },
              { label: "جماعة دون مسجد", triggerState: "partiallycompleted" },
            ],
          },
        ]}
      />
      <View className="flex-row justify-between w-full px-4 mt-4">
        <OnboardingButton title={t("back")} onPress={() => router.push("/slide4")} />
        <OnboardingButton
          style={{ marginTop: 0 }}
          title={t("next")}
          onPress={() => router.push("/slide6")}
        />
      </View>
    </View>
  );
}

