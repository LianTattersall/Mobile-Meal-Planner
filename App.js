import { StyleSheet, Text, View } from "react-native";
import TabNavigator from "./Routes/TabNavigator";
import { UserProvider } from "./Contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <TabNavigator />
    </UserProvider>
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
