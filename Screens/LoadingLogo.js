import { View, Text, StyleSheet } from "react-native";

export default function LoadingLogo() {
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
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
