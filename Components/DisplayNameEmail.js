import { StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ({ user, setAddedPeople, setSearchResults }) {
  function handleRemove() {
    setAddedPeople((curr) => {
      const filteredCurr = curr.filter(
        (addedUser) => addedUser.user_id !== user.user_id
      );
      return filteredCurr;
    });
    setSearchResults((curr) => {
      curr.push(user);
      return curr;
    });
  }
  return (
    <View style={styles.container}>
      <AntDesign name="close" size={24} color="black" onPress={handleRemove} />
      <View>
        <Text style={{ fontSize: 15, paddingLeft: 5 }}>
          {user.display_name}
        </Text>
        <Text style={{ fontSize: 12, paddingLeft: 5 }}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    margin: 5,
    padding: 5,
    backgroundColor: "#e1e3e3",
    flexDirection: "row",
    alignItems: "center",
  },
});
