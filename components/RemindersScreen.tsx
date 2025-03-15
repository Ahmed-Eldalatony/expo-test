import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { getReminders, deleteReminder, Reminder } from "./addReminder";


export const RemindersScreen = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = () => {
    const stored = getReminders();
    setReminders(stored);
  };

  const handleDelete = (id: string, notificationId: string) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Cancel the scheduled notification
              await Notifications.cancelScheduledNotificationAsync(notificationId);
            } catch (error) {
              console.error("Error cancelling notification", error);
            }
            deleteReminder(id);
            loadReminders();
          },
        },
      ]
    );
  };

  const renderReminder = ({ item }: { item: Reminder }) => (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
      <Text style={{ flex: 1, fontSize: 18 }}>{item.timeString}</Text>
      <TouchableOpacity
        onPress={() => handleDelete(item.id, item.notificationId)}
        style={{ padding: 5, backgroundColor: "#ff4d4d", borderRadius: 5 }}
      >
        <Text style={{ color: "white" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={renderReminder}
        ListEmptyComponent={<Text>No reminders set.</Text>}
      />
    </View>
  );
};
