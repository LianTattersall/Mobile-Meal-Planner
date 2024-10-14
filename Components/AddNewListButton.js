import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";

export default function ({ user_id, navigation, text, route }) {
  function handlePress() {
    navigation.navigate(route, { user_id });
  }
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#d9fffd",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
});
