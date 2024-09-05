import { Dimensions, StyleSheet, TextInput } from "react-native";

export default function () {
  return (
    <>
      <TextInput></TextInput>
    </>
  );
}

const styles = StyleSheet.create({
  textInputs: {
    width: Dimensions.get("window").width * 0.9,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#bbb",
  },
  Header: {
    fontSize: 20,
    marginBottom: 30,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});
