import * as Notifications from "expo-notifications";
import { Platform, Alert } from "react-native";

// Set notification handler to determine how notifications are shown
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const scheduleNotification = async (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  let trigger = new Date();
  trigger.setHours(hours);
  trigger.setMinutes(minutes);
  trigger.setSeconds(0);
  trigger.setMilliseconds(0);

  const now = new Date();

  // If the trigger time is in the past, set it to the next day
  if (trigger <= now) {
    trigger.setDate(trigger.getDate() + 1);
  }

  const secondsUntilTrigger = (trigger.getTime() - now.getTime()) / 1000;

  if (secondsUntilTrigger < 0) {
    console.warn("Notification trigger time is in the past.");
    return null;
  }

  if (Platform.OS === "web") {
    // Schedule a web notification using setTimeout
    setTimeout(() => {
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Time to read Quran!", {
              body: "Don't forget your daily Quran reading.",
            });
          } else {
            Alert.alert("Notification permission denied");
          }
        });
      } else {
        Alert.alert("Browser does not support notifications");
      }
    }, secondsUntilTrigger * 1000);
    console.log(`Web notification scheduled for ${time}`);
    return "web-scheduled";
  } else {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to read Quran!",
          body: "Don't forget your daily Quran reading.",
          sound: "default",
        },
        trigger: {
          seconds: secondsUntilTrigger,
          repeats: true,
        },
      });
      console.log(`Notification scheduled with ID: ${notificationId} for ${time}`);
      return notificationId;
    } catch (error) {
      console.error("Error scheduling notification:", error);
      return null;
    }
  }
};

