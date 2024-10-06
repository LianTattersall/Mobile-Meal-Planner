import { Alert, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { deleteAllItems } from "../utils/api";

export default function ({ list_id, setItems }) {
  function handleClear() {
    setItems([]);
    deleteAllItems(list_id);
  }

  function handlePress() {
    Alert.alert(
      "Clear All Items",
      "Are you sure you want to clear all items from this list?",
      [
        { text: "Yes", onPress: handleClear },
        {
          text: "No",
          onPress: () => {
            console.log("canceled");
          },
        },
      ]
    );
  }
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>Clear All</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#d9fffd",
    padding: 10,
    borderRadius: 6,
    width: 100,
    margin: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: { textAlign: "center" },
});
