import * as Notifications from "expo-notifications";
import { Platform, Alert } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import moment from "moment";


// // This function accepts a time string in "HH:mm" or "h:mm A" format
// // and schedules a notification at that time.
export const scheduleNotification = async (timeString) => {
  // Parse the time string. Here we assume a 24-hour "HH:mm" format.
  const [hoursStr, minutesStr] = timeString.split(':');
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  // Create a trigger Date object using the provided time.
  let trigger = new Date();
  trigger.setHours(hours, minutes, 0, 0);

  const now = new Date();
  // If the scheduled time is already past for today, move it to tomorrow.
  if (trigger <= now) {
    trigger.setDate(trigger.getDate() + 1);
  }

  const secondsUntilTrigger = (trigger.getTime() - now.getTime()) / 1000;
  if (secondsUntilTrigger < 0) {
    console.warn("Notification trigger time is in the past.");
    return null;
  }

  if (Platform.OS === "web") {
    // For web, simulate notifications with setTimeout.
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
    console.log(`Web notification scheduled for ${timeString}`);
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
          // For testing you may want to disable repeats.
          repeats: false,
        },
      });
      console.log(`Notification scheduled with ID: ${notificationId} for ${timeString}`);
      return notificationId;
    } catch (error) {
      console.error("Error scheduling notification:", error);
      return null;
    }
  }
};

import notifee, { TriggerType, TimestampTrigger, RepeatFrequency } from '@notifee/react-native';
import dayjs from 'dayjs';

const beforeSalah = true;
const afterSalah = false;

export const schedulePrayerNotifications = async (prayerTimes) => {
  // Cancel all existing notifications to prevent duplicates
  await notifee.cancelAllNotifications();
  //
  // if (Platform.OS === 'web') {
  //   // Web notification logic
  //   if ("Notification" in window) {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         for (const [prayerName, time] of Object.entries(prayerTimes)) {
  //           let triggerDate = dayjs(time);
  //
  //           if (beforeSalah) {
  //             const triggerDateBefore = triggerDate.subtract(5, 'minutes');
  //             if (triggerDateBefore.isAfter(dayjs())) {
  //               const timeUntilTriggerBefore = triggerDateBefore.diff(dayjs(), 'milliseconds');
  //               if (timeUntilTriggerBefore > 0) {
  //                 setTimeout(() => {
  //                   new Notification(`Time for ${prayerName} (Before)`, {
  //                     body: `Reminder: ${prayerName} prayer is in 5 minutes.`,
  //                   });
  //                 }, timeUntilTriggerBefore);
  //               }
  //             }
  //           }
  //
  //           if (afterSalah) {
  //             const triggerDateAfter = triggerDate.add(5, 'minutes');
  //             if (triggerDateAfter.isAfter(dayjs())) {
  //               const timeUntilTriggerAfter = triggerDateAfter.diff(dayjs(), 'milliseconds');
  //               if (timeUntilTriggerAfter > 0) {
  //                 setTimeout(() => {
  //                   new Notification(`Time for ${prayerName} (After)`, {
  //                     body: `Reminder: 5 minutes past ${prayerName} prayer time.`,
  //                   });
  //                 }, timeUntilTriggerAfter);
  //               }
  //             }
  //           }
  //         }
  //       } else {
  //         Alert.alert("Notification permission denied");
  //       }
  //     });
  //   } else {
  //     Alert.alert("Browser does not support notifications");
  //   }
  //   return; // Don't schedule native notifications on web
  // }
  //
  for (const [prayerName, time] of Object.entries(prayerTimes)) {
    let triggerDate = dayjs(time);

    if (beforeSalah) {
      const triggerDateBefore = triggerDate.subtract(5, 'minutes');
      if (triggerDateBefore.isAfter(dayjs())) {
        const triggerBefore = {
          type: TriggerType.TIMESTAMP,
          timestamp: triggerDateBefore.valueOf(),
          repeatFrequency: RepeatFrequency.DAILY,
        };

        await notifee.createTriggerNotification(
          {
            title: `Time for ${prayerName} (Before)`,
            body: `Reminder: ${prayerName} prayer is in 5 minutes.`,
            android: {
              channelId: 'prayer-times',
              smallIcon: 'ic_launcher', // Ensure this icon is in your resources
            },
          },
          triggerBefore
        );
      }
    }

    if (afterSalah) {
      const triggerDateAfter = triggerDate.add(5, 'minutes');
      if (triggerDateAfter.isAfter(dayjs())) {
        const triggerAfter = {
          type: TriggerType.TIMESTAMP,
          timestamp: triggerDateAfter.valueOf(),
          repeatFrequency: RepeatFrequency.DAILY,
        };

        await notifee.createTriggerNotification(
          {
            title: `Time for ${prayerName} (After)`,
            body: `Reminder: 5 minutes past ${prayerName} prayer time.`,
            android: {
              channelId: 'prayer-times',
              smallIcon: 'ic_launcher', // Ensure this icon is in your resources
            },
          },
          triggerAfter
        );
      }
    }
  }
};
