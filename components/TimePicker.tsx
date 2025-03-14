import { LinearGradient } from 'expo-linear-gradient';
import { TimerPickerModal } from "react-native-timer-picker";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from '@/hooks/useTranslation';
// import { Audio } from "expo-av"; // for audio feedback (click sound as you scroll)
import * as Haptics from "expo-haptics"; // for haptic feedback
const TimePicker = ({ visible, onClose, onTimeSelected }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [alarmString, setAlarmString] = useState<string | null>(null);
  const { t } = useTranslation();

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

  return (
    <View className="bg-white items-center justify-center p-5 rounded-lg">
      <Text className="text-lg text-primary-900 font-readexpro-semibold mb-2">
        {t("setReminderTime")}
      </Text>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View className="items-center">
          {alarmString !== null && (
            <Text className="text-5xl text-primary-900 font-readexpro-medium">
              {alarmString}
            </Text>
          )}
          <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
            <View className="mt-7">
              <Text className="py-2 px-4 border border-primary-200 rounded-lg text-base overflow-hidden text-primary-900 font-readexpro-regular">
                {t("setAlarm")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          const formattedTime = formatTime(pickedDuration);
          setAlarmString(formattedTime);
          setShowPicker(false);
          if (onTimeSelected) {
            onTimeSelected(formattedTime);
          }
        }}
        secondsPickerIsDisabled
        hideSeconds
        use12HourPicker
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
