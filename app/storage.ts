import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV()

const QURAN_REMINDER_KEY = 'quranReminderTime';
const READING_METHOD_KEY = 'readingMethod';
// Enabled keys removed
const BEFORE_SALAH_REMINDER_MINUTES_KEY = 'beforeSalahReminderMinutes';
// Enabled keys removed
const AFTER_SALAH_REMINDER_MINUTES_KEY = 'afterSalahReminderMinutes';


// Function to check if onboarding is complete
export const hasCompletedOnboarding = (): boolean => {
  const completed = storage.getBoolean('onboardingCompleted') || false;
  console.log('Onboarding completed:', completed); // Add this line
  return completed;
};

// Function to mark onboarding as completed
export const completeOnboarding = () => {
  storage.set('onboardingCompleted', true);
};

export const saveQuranReminderTime = (time: string) => {
  try {
    storage.set(QURAN_REMINDER_KEY, time);
  } catch (e) {
    console.error("Error saving quran reminder time", e);
  }
}

export const getQuranReminderTime = () => {
  try {
    const time = storage.getString(QURAN_REMINDER_KEY);
    return time ?? null;
  } catch (e) {
    console.error("Error getting quran reminder time", e);
    return null;
  }
}

// Selecting reading quran times
type SelectionType = "quarter" | "hizb" | "juz" | undefined
export const getReadingMethod = ():SelectionType=> {
  // how do i make this underlin method to have the SelectionType type and fix the lint issue
  const method = storage.getString(READING_METHOD_KEY)
  console.log('method', method); // Add this line
  return method 
};

export const setReadingMethod = (methodName:string)=> {
  // I may delete the variable
  storage.set(READING_METHOD_KEY,methodName)
  getReadingMethod()
};

// --- Before Salah Reminder ---
// Enabled functions removed

export const setBeforeSalahReminder = (minutes: number) => {
  // Ensure we store a non-negative integer
  const validMinutes = Math.max(0, Math.floor(minutes));
  storage.set(BEFORE_SALAH_REMINDER_MINUTES_KEY, validMinutes);
};

export const getBeforeSalahReminder = (): number => {
  // Default to 0 (disabled) if not set or invalid
  return storage.getNumber(BEFORE_SALAH_REMINDER_MINUTES_KEY) ?? 0;
};

// --- After Salah Reminder ---
// Enabled functions removed

export const setAfterSalahReminder = (minutes: number) => {
  // Ensure we store a non-negative integer
  const validMinutes = Math.max(0, Math.floor(minutes));
  storage.set(AFTER_SALAH_REMINDER_MINUTES_KEY, validMinutes);
};

export const getAfterSalahReminder = (): number => {
  // Default to 0 (disabled) if not set or invalid
  return storage.getNumber(AFTER_SALAH_REMINDER_MINUTES_KEY) ?? 0;
};
