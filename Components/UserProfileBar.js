import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ({ user, setAddedPeople, setSearchResults }) {
  function handlePress() {
    setAddedPeople((curr) => {
      curr.push(user);
      return curr;
    });
    setSearchResults((curr) => {
      const filteredRes = curr.filter(
        (searchedUser) => user.user_id !== searchedUser.user_id
      );
      return filteredRes;
    });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View>
        <Image source={{ uri: user.avatar_url }} style={styles.image}></Image>
      </View>
      <View>
        <Text style={{ fontSize: 15 }}>{user.display_name}</Text>
        <Text style={{ fontSize: 12 }}>{user.email}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 8,
  },
  image: { width: 30, height: 30, borderRadius: "100%", marginRight: 5 },
});
