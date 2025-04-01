import { useState, useCallback, useEffect } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity,Alert } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "expo-router";
import { OnboardingButton } from "../../components/OnboardingButton";

import moment from "moment-timezone";
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from 'adhan';
import { TimePicker } from "@/components/TimePicker";
import { MMKV } from 'react-native-mmkv';
import { formatArabic, toArabicNumerals } from "@/utils/formatArabic";
import { getPrayerTimes } from "@/utils/adhan-times";
import { scheduleNotification } from "@/utils/notificationScheduler";
import dayjs from 'dayjs';

const storage = new MMKV();

type SelectionType = "quarter" | "hizb" | "juz" | null;

interface Option {
  type: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  options: { value: number; label: string }[];
  formatOption?: (value: number) => string;
  selectedValue: number | null;
  onValueChange: (value: number) => void;
}

interface SelectionPromptProps {
  selectionType: SelectionType;
  setSelectionType: (type: SelectionType) => void;
}

interface CustomSelectionPromptProps {
  selectionType: SelectionType;
  customSelection: number | null;
  setCustomSelection: (selection: number | null) => void;
}

interface ReminderPromptProps {
  reminders: string[];
  addReminder: (reminder: string) => void;
  removeReminder: (index: number) => void;
  onBeforeSalahSelected: (selected: boolean) => void;
  onAfterSalahSelected: (selected: boolean) => void;
}

// ========================================================
// Main Onboarding Slide
// ========================================================
// =======================
export default function OnboardingSlide() {
  const { t } = useTranslation();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectionType, setSelectionType] = useState<SelectionType>(null);
  const [customSelection, setCustomSelection] = useState<number | null>(null);
  const [reminders, setReminders] = useState<string[]>([]);
  const [beforeSalah, setBeforeSalah] = useState(false);
  const [afterSalah, setAfterSalah] = useState(false);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const storedReminders = storage.getString('reminders');
        if (storedReminders) {
          setReminders(JSON.parse(storedReminders));
        }
      } catch (error) {
        console.error("Failed to load reminders:", error);
      }
    };

    loadReminders();

  }, []);

  const handleNext = async () => {
    if (step === 1) {
      if (selectionType) {
        setStep(2);
      }
    } else if (step === 2) {
      if (customSelection) {
        setStep(3);
      }
    // } else if (step === 3) {
    //   if (reminders.length > 0) {
    //     await scheduleAllNotifications();
    //     router.push("/slide9");
    //   }
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    } else {
      router.push("/slide7");
    }
  };

  // Determine if the Next button should be disabled
  const isNextDisabled =
    (step === 1 && !selectionType) ||
    (step === 2 && !customSelection) ||
    (step === 3 && reminders.length === 0);

  return (
    <View className="flex-1 bg-white px-4 gap-12 items-center justify-center">
      <Text className="text-3xl mb-4 font-readexpro-semibold text-primary-800 text-center">
        {t("slide3.title")}
      </Text>

      <View className="bg-gray-100/70 p-4 rounded-lg">
        <Text className="text-lg text-center mb-2 font-readexpro-semibold text-primary-900">
          {t("slide3.hadeeth1")[0]}
        </Text>
        <View className="flex-row leading-relaxed rtl flex-end ml-auto">
          <Text className="text-2xl leading-relaxed font-amiri-bold text-secondary-500">
            "{t("slide8.hadeeth1")[1]}"{" "}
          </Text>
        </View>
      </View>
      <Text className="text-xl text-primary-900 font-readexpro-semibold">
        {t("slide8.description1")}
      </Text>

      {/* Render the current step */}
      {step === 1 && (
        <SelectionPrompt
          selectionType={selectionType}
          setSelectionType={setSelectionType}
        />
      )}

      {step === 2 && (
        <CustomSelectionPrompt
          selectionType={selectionType}
          customSelection={customSelection}
          setCustomSelection={setCustomSelection}
        />
      )}

      {step === 3 && (
        <ReminderPrompt
          reminders={reminders}
          addReminder={(reminder: string) => {
            const updatedReminders = [...reminders, reminder];
            setReminders(updatedReminders);
            storage.set('reminders', JSON.stringify(updatedReminders));
          }}
          removeReminder={(index: number) => {
            const newReminders = [...reminders];
            newReminders.splice(index, 1);
            setReminders(newReminders);
            storage.set('reminders', JSON.stringify(newReminders));
          }}
          onBeforeSalahSelected={(selected) => setBeforeSalah(selected)}
          onAfterSalahSelected={(selected) => setAfterSalah(selected)}
        />
      )}

      <View className="flex-row justify-between w-full px-4">
        <OnboardingButton title={t("back")} onPress={handleBack} />
        <OnboardingButton
          title={t("next")}
          onPress={handleNext}
          disabled={isNextDisabled}
        />
      </View>
    </View>
  );
}

// ========================================================
// Step 1: Selection Prompt
// ========================================================
const SelectionPrompt: React.FC<SelectionPromptProps> = ({ selectionType, setSelectionType }) => {
  const { t } = useTranslation();
  const options: Option[] = [
    { type: "quarter", label: t("byQuarter") },
    { type: "hizb", label: t("byHizb") },
    { type: "juz", label: t("byJuz") },
  ];

  return (
    <View className="items-center">
      <Text className="text-lg font-readexpro-semibold text-primary-900 mb-4">
        {t("chooseSelectionMethod")}:
      </Text>
      <View className="flex-row space-x-4">
        {options.map((o) => (
          <TouchableOpacity
            key={o.type}
            className={`px-4 py-2 rounded-md ${selectionType === o.type ? "bg-primary-200" : "bg-primary-100"
              }`}
            onPress={() => setSelectionType(o.type)}
          >
            <Text className="text-primary-800 font-readexpro-semibold">
              {o.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ==============================
// Step 2: Custom Selection Prompt
// ==============================
const CustomSelectionPrompt: React.FC<CustomSelectionPromptProps> = ({
  selectionType,
  customSelection,
  setCustomSelection,
}) => {
  console.log(customSelection)
  const { t } = useTranslation();

  const renderSelectComponent = useCallback(() => {
    switch (selectionType) {
      case "quarter":
        return (
          <CustomSelect
            label={t("selectQuarter")}
            options={Array.from({ length: 240 }, (_, i) => {
              const num = i + 1;
              return { value: num, label: formatArabic(num, t) };
            })}
            selectedValue={customSelection}
            onValueChange={setCustomSelection}
            formatOption={(value) => formatArabic(value, t)}
          />
        );
      case "hizb":
        return (
          <CustomSelect
            label={t("selectHizb")}
            options={Array.from({ length: 60 }, (_, i) => {
              const num = i + 1;
              return { value: num, label: formatArabic(num * 4, t) };
            })}
            selectedValue={customSelection}
            onValueChange={setCustomSelection}
            formatOption={(value) => formatArabic(value * 4, t)}
          />
        );
      case "juz":
        return (
          <CustomSelect
            label={t("selectJuz")}
            options={Array.from({ length: 30 }, (_, i) => {
              const num = i + 1;
              return {
                value: num,
                label:
                  num === 1
                    ? t("juzOne")
                    : `${toArabicNumerals(num)} ${t("juz")}`,
              };
            })}
            selectedValue={customSelection}
            onValueChange={setCustomSelection}
            formatOption={(num) =>
              num === 1
                ? t("juzOne")
                : `${toArabicNumerals(num)} ${t("juz")}`
            }
          />
        );
      default:
        return null;
    }
  }, [selectionType, customSelection, setCustomSelection, t]);

  return <View className="items-center">{renderSelectComponent()}</View>;
};

// ========================================================
// Step 3: Reminder Prompt
// ========================================================
const ReminderPrompt: React.FC<ReminderPromptProps> = ({
  reminders,
  addReminder,
  removeReminder,
  onBeforeSalahSelected,
  onAfterSalahSelected,
}) => {
  const { t } = useTranslation();
  const handleTimeSelected = (time: string) => {
    addReminder(time);
  };

  return (
    <View className="items-center">
      <Text className="text-lg font-readexpro-semibold text-primary-900 mb-4">
        {t("slide8.description2")}
      </Text>
      <TabbedReminderSection
        reminders={reminders}
        addReminder={addReminder}
        removeReminder={removeReminder}
        onBeforeSalahSelected={onBeforeSalahSelected}
        onAfterSalahSelected={onAfterSalahSelected}
      />
    </View>
  );
};

const TabbedReminderSection: React.FC<ReminderPromptProps> = ({
  reminders,
  addReminder,
  removeReminder,
  onBeforeSalahSelected,
  onAfterSalahSelected,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'salah' | 'custom'>('custom');

  return (
    <View className="items-center">
      <View className="flex-row  mb-4 space-x-4">
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${activeTab === 'salah' ? 'bg-primary-200' : 'bg-primary-100'}`}
          onPress={() => setActiveTab('salah')}
        >
          <Text className="text-primary-800 font-readexpro-semibold">
            {t("dependingOnSalah")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${activeTab === 'custom' ? 'bg-primary-200' : 'bg-primary-100'}`}
          onPress={() => setActiveTab('custom')}
        >
          <Text className="text-primary-800 font-readexpro-semibold">
            {t("customTime")}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'salah' && (
        <View>
          <CheckBox
            label={t("before")}
            onChange={(selected) => onBeforeSalahSelected(selected)}
          />
          <CheckBox
            label={t("after")}
            onChange={(selected) => onAfterSalahSelected(selected)}
          />

          <Text className=" my-2 text-sm text-primary-900">{t("youCanChooseBoth")}</Text>
        </View>
      )}

      {activeTab === 'custom' && (
        <View>
          {reminders.map((reminder, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <Text className="text-xl text-primary-800 font-readexpro-medium">{reminder}</Text>
              <TouchableOpacity onPress={() => removeReminder(index)} className="ml-2">
                <Text className="text-red-500 text-2xl ">×</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TimePicker onTimeSelected={addReminder} />
        </View>
      )}
    </View>
  );
};

interface CheckboxItemProps {
  label: string;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label }) => {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity className="flex-row items-center py-1" onPress={() => setChecked(!checked)}>
      <View
        className={`w-6 h-6 rounded-full border-2 mr-2 items-center justify-center ${
          checked
            ? 'bg-primary-500 border-primary-500'
            : 'border-primary-300 dark:border-primary-200'
        }`}
      >
        {checked && <Text className="text-white">✓</Text>}
      </View>
      <Text className="text-primary-900 dark:text-primary-100">{label}</Text>
    </TouchableOpacity>
  );
};

// ========================================================
// CustomSelect Component
// ========================================================
const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  formatOption,
  selectedValue,
  onValueChange,
}) => {
  const { t } = useTranslation();

  return (
    <View className="items-center">
      <Text className="text-lg font-readexpro-semibold text-primary-900 mb-2">
        {label}
      </Text>
      <View className="border rounded-md border-primary-200">
        <select
          className="bg-transparent text-primary-800 py-1 px-2 font-amiri-bold text-xl"
          style={{ direction: "rtl" }}
          value={selectedValue || ""}
          onChange={(e) => onValueChange(Number(e.target.value))}
        >
          <option>{t("choose")}</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="font-amiri-bold"
            >
              {typeof formatOption === "function"
                ? formatOption(option.value)
                : option.label}
            </option>
          ))}
        </select>
      </View>
    </View>
  );
};

// ========================================================
// CheckBox Component
// ========================================================
export const CheckBox = ({ label, onChange, checked = false }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <TouchableOpacity className="flex-row items-center py-1" onPress={toggleCheckbox}>
      <View
        className={`w-6 h-6  rounded-md border-2 mr-2 items-center justify-center ${
          isChecked ? "bg-primary-800 border-primary-800" : "border-primary-800"
        }`}
      >
        {isChecked && <MaterialIcons name="check" size={18} color="white" />}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

