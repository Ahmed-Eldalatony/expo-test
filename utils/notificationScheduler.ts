import * as Notifications from "expo-notifications";
import { Platform, Alert } from "react-native";
import dayjs from 'dayjs';
import { getBeforeSalahReminder, getAfterSalahReminder } from '@/app/storage';


export const schedulePrayerNotifications = async (prayerTimes) => {
  // Get preferences from storage
  if (Platform.OS === 'web') {
    // Web notification logic
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          for (const [prayerName, time] of Object.entries(prayerTimes)) {
            let triggerDate = dayjs(time);
            const shouldScheduleBefore = getBeforeSalahReminder(); // Get preference
            const shouldScheduleAfter = getAfterSalahReminder();   // Get preference

            if (shouldScheduleBefore) {
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

            if (shouldScheduleAfter) {
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
