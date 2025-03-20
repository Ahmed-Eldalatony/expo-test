// import * as Notifications from "expo-notifications";
// import { Platform, Alert } from "react-native";
// import BackgroundFetch from "react-native-background-fetch";
// import moment from "moment";
//
// import { prayerTimes,prayerNames } from "./adhan-times";
//
//
// // Set the notification handler so notifications are shown when received.
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
//
// // This function accepts a time string in "HH:mm" or "h:mm A" format
// // and schedules a notification at that time.
// export const scheduleNotification = async (timeString) => {
//   // Parse the time string. Here we assume a 24-hour "HH:mm" format.
//   const [hoursStr, minutesStr] = timeString.split(':');
//   const hours = Number(hoursStr);
//   const minutes = Number(minutesStr);
//
//   // Create a trigger Date object using the provided time.
//   let trigger = new Date();
//   trigger.setHours(hours, minutes, 0, 0);
//
//   const now = new Date();
//   // If the scheduled time is already past for today, move it to tomorrow.
//   if (trigger <= now) {
//     trigger.setDate(trigger.getDate() + 1);
//   }
//
//   const secondsUntilTrigger = (trigger.getTime() - now.getTime()) / 1000;
//   if (secondsUntilTrigger < 0) {
//     console.warn("Notification trigger time is in the past.");
//     return null;
//   }
//
//   if (Platform.OS === "web") {
//     // For web, simulate notifications with setTimeout.
//     setTimeout(() => {
//       if ("Notification" in window) {
//         Notification.requestPermission().then((permission) => {
//           if (permission === "granted") {
//             new Notification("Time to read Quran!", {
//               body: "Don't forget your daily Quran reading.",
//             });
//           } else {
//             Alert.alert("Notification permission denied");
//           }
//         });
//       } else {
//         Alert.alert("Browser does not support notifications");
//       }
//     }, secondsUntilTrigger * 1000);
//     console.log(`Web notification scheduled for ${timeString}`);
//     return "web-scheduled";
//   } else {
//     try {
//       const notificationId = await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "Time to read Quran!",
//           body: "Don't forget your daily Quran reading.",
//           sound: "default",
//         },
//         trigger: {
//           seconds: secondsUntilTrigger,
//           // For testing you may want to disable repeats.
//           repeats: false,
//         },
//       });
//       console.log(`Notification scheduled with ID: ${notificationId} for ${timeString}`);
//       return notificationId;
//     } catch (error) {
//       console.error("Error scheduling notification:", error);
//       return null;
//     }
//   }
// };
//
//





// const beforeSalah=true
// const afterSalah=false
// const schedulePrayerNotifications = async () => {
//   for (const prayerName of prayerNames) {
//     const prayerTime = prayerTimes().timeForPrayer(prayerName);
//
//         console.log("======")
//     if (prayerTime) {
//       const prayerDate = moment(prayerTime);
//
//       if (beforeSalah) {
//
//         console.log("======")
//         const beforeTime = prayerDate.clone().subtract(132, 'minutes');
//         console.log("======",beforeTime)
//         if (beforeTime.isAfter(moment())) {
//           const timeString = beforeTime.format('HH:mm');
//           await scheduleNotification(timeString);
//           console.log(`Scheduled before ${prayerName} notification for ${timeString}`);
//         }
//       }
//
//       if (afterSalah) {
//         const afterTime = prayerDate.clone().add(5, 'minutes');
//         if (afterTime.isAfter(moment())) {
//           const timeString = afterTime.format('HH:mm');
//           await scheduleNotification(timeString);
//           console.log(`Scheduled after ${prayerName} notification for ${timeString}`);
//         }
//       }
//     }
//   }
// };
//
// // Register background task
// const registerBackgroundTask = async () => {
//   await BackgroundFetch.configure(
//     {
//       minimumFetchInterval: 15, // Run every 15 minutes
//       stopOnTerminate: false, // Continue after app close
//       startOnBoot: true, // Start on device boot
//     },
//     async (taskId) => {
//       console.log("Background fetch triggered!");
//       await schedulePrayerNotifications();
//       BackgroundFetch.finish(taskId);
//     },
//     (error) => {
//       console.error("Background Fetch failed to start:", error);
//     }
//   );
// };
// registerBackgroundTask()
// // export default registerBackgroundTask;
// //
// //
// //



import notifee, { TriggerType, TimestampTrigger, RepeatFrequency } from '@notifee/react-native';
import dayjs from 'dayjs';
import { getPrayerTimes } from './adhan-times';

export const schedulePrayerNotifications = async (prayerTimes) => {
  // Cancel all existing notifications to prevent duplicates
  await notifee.cancelAllNotifications();

  for (const [prayerName, time] of Object.entries(prayerTimes)) {
    let triggerDate = dayjs(time);

    // Ensure the trigger date is in the future
    if (triggerDate.isBefore(dayjs())) {
      triggerDate = triggerDate.add(1, 'day');
    }

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerDate.valueOf(),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    await notifee.createTriggerNotification(
      {
        title: `Time for ${prayerName}`,
        body: `It's time for ${prayerName} prayer.`,
        android: {
          channelId: 'prayer-times',
          smallIcon: 'ic_launcher', // Ensure this icon is in your resources
        },
      },
      trigger
    );
  }
};
