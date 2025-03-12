import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ChecklistState } from "./ChecklistCompoenent";

interface ChecklistMainTaskProps {
  t: (key: string) => string;
  demo: boolean;
  handleToggle: () => void;
  checked: ChecklistState;
  imageMap: Record<ChecklistState, any>;
  isSubtasksCollapsed: boolean;
  toggleCollapse: () => void;
  hasSubtasks: boolean;
  sunnahRakat: number;
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
  sunnahRakat
}) => {

  return (
    <TouchableOpacity
      onPress={() => !demo && handleToggle()}
      className={`flex-row-reverse w-full justify-between max-w-xl rounded-md p-2 bg-white border border-gray-300 ${demo ? "bg-primary-200" : ""
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
      <Text className={`text-gray-800 !text-lg  ${hasSubtasks ? "ps-6" : ""}`}>{t("slide4.task")}</Text>
      <View className="flex-row gap-2 items-center ">
        <Image source={imageMap[checked]} className="w-8 h-8 my-auto" />
        {sunnahRakat > 0 && <Text className="font-medium text-lg text-gray-800">+{sunnahRakat}</Text>}
      </View>
    </TouchableOpacity>
  );
};
