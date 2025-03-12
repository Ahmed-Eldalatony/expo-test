import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Subtask } from "./ChecklistCompoenent";

interface ChecklistSubtasksProps {
  subtasks: Subtask[];
  selectedOptionIndices: (number | null)[];
  demo: boolean;
  handleSubtaskPress: (
    subtaskIndex: number,
    optionIndex: number,
    newState: string | number
  ) => void;
}

export const ChecklistSubtasks: React.FC<ChecklistSubtasksProps> = ({
  subtasks,
  selectedOptionIndices,
  demo,
  handleSubtaskPress,
}) => {
  return (
    <View className="ms-5 pr-2">
      <View className="absolute top-1 bottom-0 right-3 w-[2px] bg-gray-400" />
      {subtasks.map((subtask, subtaskIndex) => (
        <View key={subtaskIndex} className="mt-2 border right-4  w-full border-gray-500 rounded-md p-1 gap-2 flex-row justify-between">
          {subtask.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              onPress={() =>
                !demo &&
                handleSubtaskPress(
                  subtaskIndex,
                  optionIndex,
                  option.triggerState
                )
              }
              className={`p-[5px] w-[100%]  flex-1 rounded-[4px] ${selectedOptionIndices[subtaskIndex] === optionIndex ? "bg-primary-400" : ""
                }`}
            >
              <Text className={`text-gray-600 text-center ${selectedOptionIndices[subtaskIndex] === optionIndex ? "text-white" : ""
                }`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};
