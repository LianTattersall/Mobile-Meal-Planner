import { StyleSheet, Text, View } from "react-native";
import TabNavigator from "./Routes/TabNavigator";
import { UserProvider } from "./Contexts/UserContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <UserProvider>
        <TabNavigator />
      </UserProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
