import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Modal, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { getUsers, removeListFromUser } from "../utils/api";
import UserProfileBar from "./UserProfileBar";
import DisplayNameEmail from "./DisplayNameEmail";

export default function ({
  people,
  infoModalVisible,
  setInfoModalVisible,
  list_id,
  navigation,
  setPeople,
}) {
  const { user } = useContext(UserContext);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function handleRemoveList() {
    removeListFromUser(user.user_id, list_id).then(() => {
      setInfoModalVisible(false);
      navigation.navigate("Lists");
    });
  }

  useEffect(() => {
    getUsers(searchTerm).then(({ users }) => {
      const addedIds = people.map((user) => user.user_id);
      users = users.filter((user) => addedIds.indexOf(user.user_id) === -1);
      setSearchResults(users);
    });
  }, [searchTerm, people]);
  return (
    <Modal visible={infoModalVisible} animationType="slide">
      <SafeAreaView style={styles.centredView}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}></View>
            <AntDesign
              name="close"
              size={24}
              color="black"
              onPress={() => {
                setInfoModalVisible(false);
              }}
            />
          </View>
          <Text style={[styles.text, { fontSize: 20, marginBottom: 10 }]}>
            People
          </Text>
          <FlatList
            data={people}
            renderItem={({ item }) => (
              <Text style={styles.text}>{item.display_name}</Text>
            )}
          />
        </View>
        <TouchableOpacity onPress={handleRemoveList}>
          <Text style={{ color: "red", fontSize: 20 }}>
            Remove list from my profile
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 20, fontSize: 20 }}>
          Add more people to this list
        </Text>
        <TextInput
          style={styles.inputBars}
          onChangeText={(value) => {
            setSearchTerm(value);
          }}
          value={searchTerm}
          defaultValue="Search for users"
        ></TextInput>
        <View
          style={{ alignItems: "flex-start", width: "100%", marginLeft: 20 }}
        >
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <UserProfileBar
                setSearchResults={setSearchResults}
                user={item}
                key={item.user_id}
                listInfoModal={true}
                setPeople={setPeople}
                list_id={list_id}
                people={people}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centredView: { flex: 1, justifyContent: "start", alignItems: "center" },
  container: {
    width: "100%",
    padding: 20,
  },
  text: { textAlign: "center" },
  inputBars: {
    borderWidth: 1,
    height: 19,
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%",
    height: 25,
    padding: 3,
    marginTop: 10,
    borderRadius: 4,
  },
});
