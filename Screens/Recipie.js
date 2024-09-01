import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Recipie({ navigation, route }) {
  const { param } = route.params;
  function pressHandler() {
    navigation.navigate("AddIngredients");
  }
  return (
    <View style={styles.container}>
      <Text>Recipie {param}</Text>
      <Pressable onPress={pressHandler}>
        <Text>Add Ingredients</Text>
      </Pressable>
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
