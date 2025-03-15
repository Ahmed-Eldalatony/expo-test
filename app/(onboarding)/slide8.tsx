import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { useRouter } from "expo-router";
import { OnboardingButton } from "../../components/OnboardingButton";
import { TimePicker } from "@/components/TimePicker";
import { MMKV } from 'react-native-mmkv';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const storage = new MMKV();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const scheduleNotification = async (time, t) => {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const trigger = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

  if (trigger < now) {
    trigger.setDate(trigger.getDate() + 1);
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: t("reminderTitle"),
      body: t("reminderBody"),
      sound: 'default',
    },
    trigger,
  });
};

// =======================
// Main Onboarding Slide
// =======================
export default function OnboardingSlide() {
  const { t } = useTranslation();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectionType, setSelectionType] = useState<string | null>(null);
  const [customSelection, setCustomSelection] = useState<number | null>(null);
  const [reminders, setReminders] = useState<string[]>([]);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const storedReminders = storage.getString('reminders');
        if (storedReminders) {
          const parsedReminders = JSON.parse(storedReminders);
          setReminders(parsedReminders);
          parsedReminders.forEach(reminder => scheduleNotification(reminder, t)); // Schedule existing reminders
        }
      } catch (error) {
        console.error("Failed to load reminders:", error);
      }
    };

    const getPermissions = async () => {
      let { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('No notification permissions!');
      }
    };
    loadReminders();
    getPermissions();

    // Set up interval to check reminders every minute
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      reminders.forEach(reminderTime => {
        if (reminderTime === currentTime) {
          scheduleNotification(reminderTime, t);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [t, reminders]);

  const handleNext = () => {
    if (step === 1) {
      if (selectionType) {
        setStep(2);
      }
    } else if (step === 2) {
      if (customSelection) {
        setStep(3);
      }
    } else if (step === 3) {
      if (reminders.length > 0) {
        router.push("/slide9");
      }
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
          addReminder={(reminder) => {
            const updatedReminders = [...reminders, reminder];
            setReminders(updatedReminders);
            storage.set('reminders', JSON.stringify(updatedReminders));
            scheduleNotification(reminder, t);
          }}
          removeReminder={(index) => {
            const newReminders = [...reminders];
            newReminders.splice(index, 1);
            setReminders(newReminders);
            storage.set('reminders', JSON.stringify(newReminders));
          }}
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

// =======================
// Step 1: Selection Prompt
// =======================
const SelectionPrompt = ({ selectionType, setSelectionType }) => {
  const { t } = useTranslation();
  const options = [
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
const CustomSelectionPrompt = ({
  selectionType,
  customSelection,
  setCustomSelection,
}) => {
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

// ==================
// Step 3: Reminder Prompt
// ==================
const ReminderPrompt = ({ reminders, addReminder, removeReminder }) => {
  const { t } = useTranslation();
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const handleTimeSelected = (time) => {
    addReminder(time);
    setTimePickerVisible(false);
  };

  return (
    <View className="items-center">
      <Text className="text-lg font-readexpro-semibold text-primary-900 mb-4">
        {t("slide8.description2")}
      </Text>
      {reminders.map((reminder, index) => (
        <View key={index} className="flex-row items-center mb-2">
          <Text className="text-xl text-primary-800">{reminder}</Text>
          <TouchableOpacity onPress={() => removeReminder(index)} className="ml-2">
            <Text className="text-red-500">×</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => setTimePickerVisible(true)} className="mt-4">
        <View className="px-4 py-2 rounded-md">
          <Text className="text-primary-800 font-readexpro-semibold">
            {reminders.length === 0 && !isTimePickerVisible && t("addReminder")}
            {reminders.length > 0 && !isTimePickerVisible &&
              t("addAnotherReminder")}
          </Text>
        </View>
      </TouchableOpacity>
      {isTimePickerVisible && (
        <TimePicker
          visible={isTimePickerVisible}
          onClose={() => setTimePickerVisible(false)}
          onTimeSelected={handleTimeSelected}
        />
      )}
    </View>
  );
};

// ==================
// CustomSelect Component
// ==================
const CustomSelect = ({
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

// ==================
// Helper Functions
// ==================
const toArabicNumerals = (num: number): string => {
  return String(num).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
};

const formatArabic = (q: number, t: (key: string) => string): string => {
  const juz = Math.floor(q / 8);
  const hizb = Math.floor((q % 8) / 4);
  const quarter = q % 4;
  return [
    juz &&
    (juz === 1 ? t("juzOne") : `${toArabicNumerals(juz)} ${t("juz")}`),
    hizb &&
    (hizb === 1 ? t("hizbOne") : `${toArabicNumerals(hizb)} ${t("hizb")}`),
    quarter &&
    (quarter === 1
      ? t("quarterOne")
      : `${toArabicNumerals(quarter)} ${t("quarter")}`),
  ]
    .filter(Boolean)
    .join(" و ");
};


