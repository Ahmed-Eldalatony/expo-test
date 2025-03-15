import * as Notifications from "expo-notifications";
import React from "react";
import { View, Button, Platform, Alert } from "react-native";

export const sendTestNotification = async () => {
  if (Platform.OS === "web") {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Test Notification", {
            body: "This is a test notification from your app!",
          });
        } else {
          Alert.alert("Notification permission denied");
        }
      });
    } else {
      Alert.alert("Browser does not support notifications");
    }
  } else {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a test notification from your app!",
      },
      trigger: null, // Trigger immediately
    });
  }
};

