import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addUserToList } from "../utils/api";

export default function ({
  user,
  setAddedPeople,
  setSearchResults,
  listInfoModal,
  setPeople,
  list_id,
  people,
}) {
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

  function AddPersonToExistingList() {
    const peopleBefore = JSON.parse(JSON.stringify(people));
    setPeople((curr) => {
      const addedPerson = JSON.parse(JSON.stringify(curr));
      addedPerson.push({
        user_id: user.user_id,
        display_name: user.display_name,
      });
      return addedPerson;
    });
    addUserToList(list_id, user.user_id, user.display_name).catch(() => {
      setPeople(peopleBefore);
    });
  }

  function handlePressInfoModal() {
    Alert.alert(
      "Add new user to list",
      `Do you want to add ${user.display_name} to this list?`,
      [
        { text: "yes", onPress: AddPersonToExistingList },
        { text: "no", onPress: () => {} },
      ]
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={listInfoModal ? handlePressInfoModal : handlePress}
    >
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
