import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV()

const QURAN_REMINDER_KEY = 'quranReminderTime';

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
