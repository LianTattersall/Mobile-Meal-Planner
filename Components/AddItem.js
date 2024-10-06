import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native";
import { postItemsToList } from "../utils/api";

export default function ({ list_id, setItems }) {
  const [newItem, setNewItem] = useState("");

  function submiteHandler() {
    postItemsToList(list_id, [newItem]);
    setItems((curr) => {
      curr.push(newItem);
      return curr;
    });
    setNewItem("");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.testInput}
        onChangeText={(value) => {
          setNewItem(value);
        }}
        value={newItem}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={submiteHandler}>
        <Text>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 9,
    alignItems: "center",
    height: 50,
  },
  testInput: { flex: 1, borderWidth: 1, marginRight: 6, height: 30 },
  button: { backgroundColor: "#d9fffd", padding: 10, borderRadius: 4 },
});
