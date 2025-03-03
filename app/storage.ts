import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV()

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
