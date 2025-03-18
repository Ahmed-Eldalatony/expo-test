import { sendTestNotification } from "@/components/Notificatoin";
import { View, Button } from "react-native";
const Slide9 = () => {
  return (
    <View>
      <Button title="Send Test Notification" onPress={sendTestNotification} />
    </View>
  );
};

export default Slide9;
