import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ({ navigation, meal }) {
  const [searchQuery, setSearchQuery] = useState("");

  function changeTextHandler(value) {
    setSearchQuery(value);
  }

  function submitHandler() {
    navigation.navigate("SearchResults", { searchQuery, meal });
  }

  return (
    <View style={styles.container}>
      <Text>Search Meals:</Text>
      <TextInput
        style={styles.searchBar}
        onChangeText={changeTextHandler}
        onSubmitEditing={submitHandler}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", margin: 10 },
  searchBar: {
    padding: 2,
    flex: 1,
    borderWidth: 1,
    height: 20,
    marginLeft: 4,
    borderRadius: 3,
  },
});
