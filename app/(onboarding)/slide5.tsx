import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "expo-router";
import { OnboardingButton } from "../../components/OnboardingButton";

// Allowed checklist states
export type ChecklistState = "notcompleted" | "partiallycompleted" | "completed";

// Type for each subtask
export interface Subtask {
  label: string;
  triggerState: ChecklistState;
}

// Props for the ChecklistItem component
export interface ChecklistItemProps {
  t: (key: string) => string;
  checkState: ChecklistState;
  demo: boolean;
  subtasks?: Subtask[];
  // Default selected subtask index to initialize both the subtask selection and main task state
  defaultSelectedSubtaskIndex?: number;
}

export default function OnboardingSlide(): JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 px-1 bg-white items-center justify-center">
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
        defaultSelectedSubtaskIndex={1} // default to the second subtask
        subtasks={[
          { label: "Mark Complete", triggerState: "completed" },
          { label: "Partial Complete", triggerState: "partiallycompleted" },
        ]}
      />
      <Text className="text-lg mt-6 font-readexpro-semibold text-primary-900 text-center">
        {t("slide5.title3")}
      </Text>
      <ChecklistItem
        t={t}
        checkState="notcompleted"
        demo={true}
        defaultSelectedSubtaskIndex={0} // default to the first subtask
        subtasks={[
          { label: "Mark Complete", triggerState: "completed" },
          { label: "Partial Complete", triggerState: "partiallycompleted" },
        ]}
      />
      <OnboardingButton
        style={{ marginTop: 30 }}
        title={t("next")}
        onPress={() => router.push("/slide6")}
      />
    </View>
  );
}

// Map checklist states to their corresponding images.
const imageMap: Record<ChecklistState, any> = {
  notcompleted: require("../../assets/images/unchecked.svg"),
  partiallycompleted: require("../../assets/images/mid-check.svg"),
  completed: require("../../assets/images/checked 3.svg"),
};

// Helper to get gradient locations based on the checked state.
const getGradientLocations = (checked: ChecklistState): number[] => {
  switch (checked) {
    case "partiallycompleted":
      return [0, 0.9];
    case "completed":
      return [0, 0.1];
    default:
      return [0.9, 0];
  }
};

interface ChecklistMainTaskProps {
  t: (key: string) => string;
  demo: boolean;
  handleToggle: () => void;
  checked: ChecklistState;
  imageMap: Record<ChecklistState, any>;
  isSubtasksCollapsed: boolean;
  toggleCollapse: () => void;
  hasSubtasks: boolean;
}

const ChecklistMainTask: React.FC<ChecklistMainTaskProps> = ({
  t,
  demo,
  handleToggle,
  checked,
  imageMap,
  isSubtasksCollapsed,
  toggleCollapse,
  hasSubtasks,
}) => {
  return (
    <TouchableOpacity
      onPress={() => !demo && handleToggle()}
      className={`flex-row-reverse inline-flex w-full justify-between max-w-xl text-start rounded-md p-2 bg-white border border-gray-300 ${demo ? "bg-primary-200" : ""
        }`}
    >
      {hasSubtasks && (
        <TouchableOpacity
          onPress={toggleCollapse}
          className="px-2 z-30 absolute right-0 top-2"
        >
          <Text className="text-gray-700 text-xl">
            {isSubtasksCollapsed ? "▶" : "▼"}
          </Text>
        </TouchableOpacity>
      )}
      <Text className="text-gray-800 !text-lg ps-6">{t("slide4.task")}</Text>
      <Image source={imageMap[checked]} className="w-8 h-8 my-auto" />
    </TouchableOpacity>
  );
};

interface ChecklistSubtasksProps {
  subtasks: Subtask[];
  selectedSubtaskIndex: number;
  demo: boolean;
  handleSubtaskPress: (newState: ChecklistState, index: number) => void;
}

const ChecklistSubtasks: React.FC<ChecklistSubtasksProps> = ({
  subtasks,
  selectedSubtaskIndex,
  demo,
  handleSubtaskPress,
}) => {
  return (
    <View className="ms-5 pr-2">
      <View className="absolute top-1 bottom-0 right-3 w-[2px] bg-gray-400" />
      <View className="mt-2 border right-4 w-full border-gray-500 rounded-md p-1 gap-2 flex-row justify-between">
        {subtasks.map((subtask, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => !demo && handleSubtaskPress(subtask.triggerState, index)}
            className={`p-1 w-[100%]  flex-1 flex-row rounded-[4px] ${selectedSubtaskIndex === index ? "bg-primary-400" : ""}`}
          >
            <Text className={`text-gray-600 ${selectedSubtaskIndex === index ? "text-white" : ""}`}>
              {subtask.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  t,
  checkState,
  demo,
  subtasks,
  defaultSelectedSubtaskIndex,
}) => {
  const initialState: ChecklistState =
    defaultSelectedSubtaskIndex !== undefined && subtasks && subtasks[defaultSelectedSubtaskIndex]
      ? subtasks[defaultSelectedSubtaskIndex].triggerState
      : checkState;

  const [checked, setChecked] = useState<ChecklistState>(initialState);
  const [selectedSubtaskIndex, setSelectedSubtaskIndex] = useState<number>(
    defaultSelectedSubtaskIndex !== undefined
      ? defaultSelectedSubtaskIndex
      : subtasks
        ? subtasks.findIndex((sub) => sub.triggerState === checkState)
        : -1
  );
  const [isSubtasksCollapsed, setIsSubtasksCollapsed] = useState<boolean>(false);

  // Sync with checkState changes if defaultSelectedSubtaskIndex is not provided.
  useEffect(() => {
    if (subtasks && defaultSelectedSubtaskIndex === undefined) {
      const index = subtasks.findIndex((sub) => sub.triggerState === checkState);
      setSelectedSubtaskIndex(index);
      setChecked(index >= 0 ? subtasks[index].triggerState : checkState);
    }
  }, [checkState, subtasks, defaultSelectedSubtaskIndex]);

  const handleToggle = () => {
    setChecked((prev) => {
      let newState: ChecklistState;
      if (prev === "notcompleted") newState = "partiallycompleted";
      else if (prev === "partiallycompleted") newState = "completed";
      else newState = "notcompleted";

      const index = subtasks?.findIndex((sub) => sub.triggerState === newState) ?? -1;
      setSelectedSubtaskIndex(index);
      return newState;
    });
  };

  const handleSubtaskPress = (newState: ChecklistState, index: number) => {
    setChecked(newState);
    setSelectedSubtaskIndex(index);
  };

  const toggleCollapse = () => {
    setIsSubtasksCollapsed((prev) => !prev);
  };

  const gradientLocations = getGradientLocations(checked);
  const gradientColors = ["#FFD27D", "#4BE1A0"];
  const hasSubtasks = subtasks && subtasks.length > 0;

  return (
    <View className="w-full max-w-[500px] mt-2">
      <LinearGradient
        locations={gradientLocations}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors}
        className="w-full rounded-lg p-1 border-gray-500"
        dither={true}
      >
        <View>
          <ChecklistMainTask
            t={t}
            demo={demo}
            handleToggle={handleToggle}
            checked={checked}
            imageMap={imageMap}
            isSubtasksCollapsed={isSubtasksCollapsed}
            toggleCollapse={toggleCollapse}
            hasSubtasks={!!hasSubtasks}
          />
        </View>
      </LinearGradient>
      {!isSubtasksCollapsed && subtasks && (
        <ChecklistSubtasks
          subtasks={subtasks}
          selectedSubtaskIndex={selectedSubtaskIndex}
          demo={demo}
          handleSubtaskPress={handleSubtaskPress}
        />
      )}
    </View>
  );
};

