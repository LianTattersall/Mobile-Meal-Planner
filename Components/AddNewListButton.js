import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";

export default function ({ user_id, navigation }) {
  function handlePress() {
    navigation.navigate("AddNewList", { user_id });
  }
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text>Add a new list</Text>
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
