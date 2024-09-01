import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import DatesBar from "../Components/DatesBar";
import { useState } from "react";

export default function Calendar({ navigation }) {
  function pressHandler(route, param) {
    if (param) {
      navigation.navigate(route, { param });
    } else {
      navigation.navigate(route);
    }
  }

  return (
    <View style={styles.container}>
      <DatesBar />
      <Pressable
        onPress={() => {
          pressHandler("Recipie", 1);
        }}
      >
        <Text>Recipie 1</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          pressHandler("Recipie", 2);
        }}
      >
        <Text>Recipie 2</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          pressHandler("AddMeal");
        }}
      >
        <Text>Add Meal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
  calendarContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
});
