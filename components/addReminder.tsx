
// ReminderService.ts
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const REMINDERS_KEY = "reminders";

export interface Reminder {
  id: string;
  timeString: string;       // e.g. "02:30"
  triggerSeconds: number;   // total seconds from now
  notificationId: string;   // the id returned from scheduling the notification
}

export const getReminders = (): Reminder[] => {
  const jsonString = storage.getString(REMINDERS_KEY);
  if (!jsonString) return [];
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing reminders", error);
    return [];
  }
};

export const saveReminders = (reminders: Reminder[]) => {
  storage.set(REMINDERS_KEY, JSON.stringify(reminders));
};

export const addReminder = (reminder: Reminder) => {
  const reminders = getReminders();
  reminders.push(reminder);
  saveReminders(reminders);
};

export const deleteReminder = (id: string) => {
  const reminders = getReminders();
  const updated = reminders.filter(r => r.id !== id);
  saveReminders(updated);
};
