import { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { LoggedIn } from "../Contexts/UserContext";

export default function SignIn() {
  const { setLoggedIn } = useContext(LoggedIn);
  return (
    <View style={styles.container}>
      <Button onPress={() => setLoggedIn(true)} title="Sign In"></Button>
    </View>
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
