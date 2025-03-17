import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TimerPickerModal } from "react-native-timer-picker";
import { useTranslation } from "@/hooks/useTranslation";
import { scheduleNotification } from "@/utils/notificationScheduler";
import { saveQuranReminderTime, getQuranReminderTime } from "@/app/storage";

export const TimePicker = ({ visible, onClose, onTimeSelected }) => {
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

  const handleTimeConfirm = (pickedDuration) => {
    const formattedTime = formatTime(pickedDuration);
    setAlarmString(formattedTime);
    setShowPicker(false);

    // Save the chosen time to MMKV storage
    saveQuranReminderTime(formattedTime);

    // Schedule the notification (this handles both web and mobile)
    scheduleNotification(formattedTime).then((notificationId) => {
      if (notificationId === null) {
        Alert.alert("Error scheduling notification");
      }
    });

    if (onTimeSelected) {
      onTimeSelected(formattedTime);
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
        initialValue={{ hours: 6, minutes: 31 }}
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

