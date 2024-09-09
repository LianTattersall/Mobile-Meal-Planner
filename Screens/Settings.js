import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../Contexts/UserContext";

export default function Settings() {
  const { setUser } = useContext(UserContext);
  function logOut() {
    return AsyncStorage.removeItem("user").then(() => {
      setUser({});
    });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut} style={styles.button}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#d9fffd",
    padding: 20,
    borderRadius: 20,
  },
});
