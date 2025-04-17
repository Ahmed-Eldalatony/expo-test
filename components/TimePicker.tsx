import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, Platform } from "react-native"; // Added Platform
import { LinearGradient } from "expo-linear-gradient";
import { TimerPickerModal } from "react-native-timer-picker";
import { useTranslation } from "@/hooks/useTranslation";
import { scheduleCustomTimeNotification } from "@/utils/notificationScheduler";
import { saveQuranReminderTime, getQuranReminderTime } from "@/app/storage";
import { Reminder } from "./addReminder"; // Import Reminder type

// Define the prop type for onTimeSelected
interface TimePickerProps {
  onTimeSelected: (reminder: Reminder) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ onTimeSelected }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState<string | null>(null);
  const { t } = useTranslation();

  // Load a previously saved reminder time, if it exists
  useEffect(() => {
    const savedTime = getQuranReminderTime();
    if (savedTime) {
      setAlarmString(savedTime);
    }
  }, []);

  const formatTime = ({
    hours,
    minutes,
    seconds,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    const timeParts = [];
    if (hours !== undefined) {
      timeParts.push(hours.toString().padStart(2, "0"));
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
    }
    return timeParts.join(":");
  };

  const handleTimeConfirm = async (pickedDuration) => { // Make async
    const formattedTime = formatTime(pickedDuration);
    setAlarmString(formattedTime);
    setShowPicker(false);

    // Save the chosen time to MMKV storage (optional, as the full reminder list is saved in slide8)
    // saveQuranReminderTime(formattedTime);
    // console.log("Custom reminder time saved:", formattedTime)

    // Schedule the notification using the new function
    const notificationId = await scheduleCustomTimeNotification(formattedTime);

    if (notificationId) {
      console.log("Custom notification scheduled successfully with ID:", notificationId);

      // Generate a unique ID for the reminder
      const reminderId = Date.now().toString(); // Simple timestamp-based ID

      // Create the Reminder object
      const newReminder: Reminder = {
        id: reminderId,
        timeString: formattedTime,
        notificationId: notificationId, // Store the actual ID
        triggerSeconds: 0 // triggerSeconds might not be needed if using daily repeat
      };

      // Call the callback with the full Reminder object
      if (onTimeSelected) {
        onTimeSelected(newReminder);
      }
       // Optionally provide user feedback
       // Alert.alert("Reminder Set", `Daily reminder set for ${formattedTime}.`);

    } else {
      console.error("Failed to schedule custom notification.");
      Alert.alert("Error", "Could not schedule the reminder notification.");
    }
  };

  return (
    <View className="items-center justify-center">
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View className="items-center">
          <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
            <View className="mt-3">
              <Text className="py-2 px-4 border border-primary-200 rounded-lg text-base overflow-hidden text-primary-900 font-readexpro-regular">
                {t("addAlarm")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        initialValue={{ hours: 3, minutes: 44 }}
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={handleTimeConfirm}
        use12HourPicker={true}
        secondsPickerIsDisabled={true}
        hideSeconds={true}
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        LinearGradient={LinearGradient}
        styles={{
          confirmButton: {
            backgroundColor: "#1F9C5B",
            color: "#ffffff",
          },
          cancelButton: {
            backgroundColor: "#A69D7F",
            color: "#281700",
          },
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </View>
  );
};


