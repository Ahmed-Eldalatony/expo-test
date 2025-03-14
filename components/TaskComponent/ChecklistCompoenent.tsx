import React, { useEffect, useState } from "react";
import { View} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ChecklistMainTask } from "./ChecklistMainTask";
import { ChecklistSubtasks } from "./ChecklistSubtasks";
export type ChecklistState = "notcompleted" | "partiallycompleted" | "completed";
export type SubtaskType = "choose" | "counter";

// Type for each subtask option
// Props for the ChecklistItem component
export interface ChecklistItemProps {
  t: (key: string) => string;
  checkState: ChecklistState;
  demo: boolean;
  subtasks?: Subtask[];
  // Default selected subtask index to initialize both the subtask selection and main task state
  defaultSelectedSubtaskIndex?: number;
}

// Type for each subtask
export interface Subtask {
  type: SubtaskType;
  options: SubtaskOption[];
  defaultSelectedSubtaskIndex?: number;
}

export interface SubtaskOption {
  label: string;
  triggerState: string | number;
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

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  t,
  checkState,
  demo,
  subtasks,
  defaultSelectedSubtaskIndex,
}) => {
  const [sunnahRakat, setSunnahRakat] = useState<number>(0); // NEW state
  const initialState: ChecklistState =
    defaultSelectedSubtaskIndex !== undefined && subtasks
      ? mapTriggerStateToChecklistState(subtasks, defaultSelectedSubtaskIndex)
      : checkState;

  const [checked, setChecked] = useState<ChecklistState>(initialState);
  const [selectedOptionIndices, setSelectedOptionIndices] = useState<(number | null)[]>(
    subtasks
      ? subtasks.map((subtask) => {
        if (subtask.type === "choose" && subtask.defaultSelectedSubtaskIndex !== undefined) {
          return subtask.defaultSelectedSubtaskIndex;
        } else {
          return null;
        }
      })
      : []
  );
  const [isSubtasksCollapsed, setIsSubtasksCollapsed] = useState<boolean>(false);

  // Sync with checkState changes if defaultSelectedSubtaskIndex is not provided.
  useEffect(() => {
    if (subtasks) {
      // Initialize selectedOptionIndices based on defaultSelectedSubtaskIndex
      const initialIndices = subtasks.map((subtask) => {
        if (subtask.type === "choose" && subtask.defaultSelectedSubtaskIndex !== undefined) {
          return subtask.defaultSelectedSubtaskIndex;
        } else {
          const index = subtask.options.findIndex(
            (option) => option.triggerState === checkState
          );
          return index >= 0 ? index : null;
        }
      });
      setSelectedOptionIndices(initialIndices);

      // Update checked state based on the first 'choose' subtask's selected option
      const firstChooseSubtaskIndex = subtasks.findIndex(subtask => subtask.type === "choose");
      if (firstChooseSubtaskIndex >= 0 && initialIndices[firstChooseSubtaskIndex] !== null) {
        setChecked(mapTriggerStateToChecklistStateForSingleSubtask(subtasks[firstChooseSubtaskIndex].options[initialIndices[firstChooseSubtaskIndex] as number].triggerState));
      }
    }
  }, [checkState, subtasks]);

  const handleToggle = () => {
    setChecked((prev) => {
      let newState: ChecklistState;
      if (prev === "notcompleted") newState = "partiallycompleted";
      else if (prev === "partiallycompleted") newState = "completed";
      else newState = "notcompleted";

      // Update selectedOptionIndices to reflect the new state
      const newSelectedOptionIndices = subtasks?.map((subtask) => {
        if (subtask.type === "choose") {
          const index = subtask.options.findIndex(
            (option) => option.triggerState === newState
          );
          return index >= 0 ? index : null;
        }
        return null;
      });
      setSelectedOptionIndices(newSelectedOptionIndices);
      return newState;
    });
  };

  const handleSubtaskPress = (
    subtaskIndex: number,
    optionIndex: number,
    newState: string | number
  ) => {
    const newSelectedOptionIndices = [...selectedOptionIndices];
    newSelectedOptionIndices[subtaskIndex] = optionIndex;
    setSelectedOptionIndices(newSelectedOptionIndices);

    // Update the checked state based on the new state, but only for 'choose' subtasks
    if (subtasks[subtaskIndex].type === "choose") {
      setChecked(mapTriggerStateToChecklistStateForSingleSubtask(newState));
    }

    if (subtasks[subtaskIndex].type === "counter") {
      setSunnahRakat(newState as number);
    }
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
            sunnahRakat={sunnahRakat}
          />
        </View>
      </LinearGradient>
      {!isSubtasksCollapsed && subtasks && (
        <ChecklistSubtasks
          subtasks={subtasks}
          selectedOptionIndices={selectedOptionIndices}
          demo={demo}
          handleSubtaskPress={handleSubtaskPress}
        />
      )}
    </View>
  );
};

// Helper function to map triggerState to ChecklistState
const mapTriggerStateToChecklistState = (subtasks: Subtask[], defaultSelectedSubtaskIndex: number): ChecklistState => {
  if (!subtasks || subtasks.length === 0 || defaultSelectedSubtaskIndex === undefined) {
    return "notcompleted";
  }

  const selectedOption = subtasks[0].options[defaultSelectedSubtaskIndex];
  if (!selectedOption) {
    return "notcompleted";
  }

  return mapTriggerStateToChecklistStateForSingleSubtask(selectedOption.triggerState);
};

const mapTriggerStateToChecklistStateForSingleSubtask = (triggerState: string | number | undefined): ChecklistState => {
  if (triggerState === undefined) {
    return "notcompleted";
  }
  if (typeof triggerState === "string") {
    switch (triggerState) {
      case "completed":
        return "completed";
      case "partiallycompleted":
        return "partiallycompleted";
      default:
        return "notcompleted";
    }
  }
  // else {
  //   // Assuming number represents a counter value
  //   if (triggerState > 0) {
  //     return "partiallycompleted";
  //   } else {
  //     return "notcompleted";
  //   }
  // }
};

