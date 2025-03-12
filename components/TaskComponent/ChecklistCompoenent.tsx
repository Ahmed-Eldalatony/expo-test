
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export type ChecklistState = "notcompleted" | "partiallycompleted" | "completed";
// ai!, i want to change how subtasks work for the checklist component to the following:// {
// type:"choose",
//     options: [
//       { label: "جماعة في مسجد", triggerState: "completed" },
//       { label: "جماعة دون مسجد", triggerState: "partiallycompleted" },
//     ],
// type:"counter",
//   options:[
//     {label:"2 ركعات",triggerState:2},
//     {label:"4 ركعات",triggerState:4},
//     {label:"6 ركعات",triggerState:6},
//   ]
// }

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

export const ChecklistMainTask: React.FC<ChecklistMainTaskProps> = ({
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
      className={`flex-row-reverse  w-full justify-between max-w-xl rounded-md p-2 bg-white border border-gray-300 ${demo ? "bg-primary-200" : ""
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
      <Text className={`text-gray-800 !text-lg  ${hasSubtasks?"ps-6":""}`}>{t("slide4.task")}</Text>
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
            className={`p-1 w-[100%]  flex-1  rounded-[4px] ${selectedSubtaskIndex === index ? "bg-primary-400" : ""}`}
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

