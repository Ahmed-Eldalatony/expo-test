import * as Notifications from "expo-notifications";
import { Platform, Alert } from "react-native";
import dayjs from 'dayjs';
import { getBeforeSalahReminder, getAfterSalahReminder } from '@/app/storage'; // Corrected import based on previous changes
const CUSTOM_REMINDER_IDENTIFIER = "custom-quran-reminder"; // Unique ID for the custom time reminder

export const schedulePrayerNotifications = async (prayerTimes) => {
  // Get preferences from storage
  if (Platform.OS === 'web') {
    // Web notification logic
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          for (const [prayerName, time] of Object.entries(prayerTimes)) {
            let triggerDate = dayjs(time);
            const beforeTime = getBeforeSalahReminder(); // Get preference
            const afterTime = getAfterSalahReminder();   // Get preference

            if (beforeTime) {
              console.log("yes before", beforeTime)
              const triggerDateBefore = triggerDate.subtract(1, 'minutes');
              if (triggerDateBefore.isAfter(dayjs())) {
                const timeUntilTriggerBefore = triggerDateBefore.diff(dayjs(), 'milliseconds');
                if (timeUntilTriggerBefore > 0) {
                  setTimeout(() => {
                    new Notification(`Time for ${prayerName} (Before)`, {
                      body: `Reminder: ${prayerName} prayer is in 5 minutes.`,
                    });
                  }, timeUntilTriggerBefore);
                }
              }
            }

            if (afterTime) {
              const triggerDateAfter = triggerDate.add(1, 'minutes');
              if (triggerDateAfter.isAfter(dayjs())) {
                const timeUntilTriggerAfter = triggerDateAfter.diff(dayjs(), 'milliseconds');
                if (timeUntilTriggerAfter > 0) {
                  setTimeout(() => {
                    new Notification(`Time for ${prayerName} (After)`, {
                      body: `Reminder: 5 minutes past ${prayerName} prayer time.`,
                    });
                  }, timeUntilTriggerAfter);
                }
              }
            }
          }
        } else {
          Alert.alert("Notification permission denied");
        }
      });
    } else {
      Alert.alert("Browser does not support notifications");
    }
    return; // Don't schedule native notifications on web
  }

  async function scheduleUniqueNotification(date) {
    const existing = await Notifications.getAllScheduledNotificationsAsync();

    const alreadyScheduled = existing.some(notification => {
      const existingDate = notification.trigger?.date;
      return existingDate && new Date(existingDate).getTime() === new Date(date).getTime();
    });

    if (alreadyScheduled) {
      console.log('A notification is already scheduled for that time.');
      return null;
    }
  }
  for (const [prayerName, time] of Object.entries(prayerTimes)) {
    scheduleUniqueNotification(time)
    let originalDate = dayjs(time);
    const beforeDate = originalDate.subtract(1, 'minute');
    const afterDate = originalDate.add(1, 'minute');

    const shouldScheduleBefore = getBeforeSalahReminder(); // Get preference
    const shouldScheduleAfter = getAfterSalahReminder();   // Get preference

    if (shouldScheduleBefore) {
      if (beforeDate.isAfter(dayjs())) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: prayerName,
            body: `A notification that should work before 5 minutes of ${prayerName} prayer time`,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: beforeDate.toDate(),
          },
        })
      }
    }

    if (shouldScheduleAfter) {
      if (afterDate.isAfter(dayjs())) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: prayerName,
            body: `A notification that should work after 5 minutes of ${prayerName} prayer time`,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: afterDate.toDate(),
          },
        })
      }

    }
  }
};


// --- New Function for Custom Time Notifications ---

export const scheduleCustomTimeNotification = async (timeString: string) => {
  // timeString format is expected to be "HH:MM"
  const [hours, minutes] = timeString.split(':').map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    console.error("Invalid time string format for custom notification:", timeString);
    Alert.alert("Error", "Invalid time format provided.");
    return null;
  }

  let triggerDate = dayjs().hour(hours).minute(minutes).second(0);

  // If the time has already passed today, schedule it for tomorrow
  if (triggerDate.isBefore(dayjs())) {
    triggerDate = triggerDate.add(1, 'day');
  }

  if (Platform.OS === 'web') {
    // Web notification logic for the next occurrence
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const timeUntilTrigger = triggerDate.diff(dayjs(), 'milliseconds');
          if (timeUntilTrigger > 0) {
            setTimeout(() => {
              new Notification("Quran Reminder", { // Example title/body
                body: `Time for your daily Quran reading!`,
              });
              // Note: Web notifications don't easily support daily repeats from a single schedule.
              // You might need more complex logic (e.g., using service workers) for true daily repeats.
              // This timeout schedules only the *next* occurrence.
            }, timeUntilTrigger);
            console.log(`Web Quran reminder scheduled for: ${triggerDate.toISOString()}`);
            return "web-timeout-scheduled"; // Indicate success
          } else {
            console.log(`Web Quran reminder time already passed today: ${triggerDate.toISOString()}`);
            return null; // Indicate failure
          }
        } else {
          Alert.alert("Notification permission denied");
          return null;
        }
      });
    } else {
      Alert.alert("Browser does not support notifications");
      return null;
    }
  } else {
    // Native notification logic (iOS/Android) with daily repeat
    try {
      // Cancel any existing custom reminder first
      await Notifications.cancelScheduledNotificationAsync(CUSTOM_REMINDER_IDENTIFIER);
      console.log(`Cancelled existing notification with ID: ${CUSTOM_REMINDER_IDENTIFIER}`);

      // Schedule the new daily repeating notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Quran Reminder", // Example title/body
          body: `Time for your daily Quran reading!`,
          sound: 'default', // Optional: play default sound
        },
        trigger: {
          hour: hours,
          minute: minutes,
          repeats: true, // Make it repeat daily
        },
        identifier: CUSTOM_REMINDER_IDENTIFIER, // Use the specific identifier
      });
      console.log(`Native Quran reminder scheduled with ID: ${notificationId} for ${hours}:${minutes} daily`);
      return notificationId;
    } catch (error) {
      console.error("Error scheduling native custom notification:", error);
      Alert.alert("Error", "Could not schedule the reminder.");
      return null;
    }
  }
  return null; // Should not be reached ideally
};
