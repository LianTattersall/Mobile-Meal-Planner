import { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { addListToUser, getUsers, postList } from "../utils/api";
import UserProfileBar from "../Components/UserProfileBar";
import DisplayNameEmail from "../Components/DisplayNameEmail";
import { UserContext } from "../Contexts/UserContext";
import { ListsContext } from "../Contexts/ListsContext";

export default function AddNewList({ navigation }) {
  const { user } = useContext(UserContext);
  const { setUserLists } = useContext(ListsContext);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addedPeople, setAddedPeople] = useState([]);
  const [listName, setListName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers(searchTerm).then(({ users }) => {
      const addedIds = addedPeople.map((user) => user.user_id);
      addedIds.push(user.user_id);
      users = users.filter((user) => addedIds.indexOf(user.user_id) === -1);
      setSearchResults(users);
    });
  }, [searchTerm]);

  function handleSubmit() {
    if (listName) {
      setLoading(true);
      const people = addedPeople.map((person) => {
        return { user_id: person.user_id, display_name: person.display_name };
      });
      people.push({ user_id: user.user_id, display_name: user.display_name });
      postList(listName, people)
        .then(({ list }) => {
          setUserLists((curr) => {
            curr.push({ list_id: list.list_id, list_name: list.list_name });
            return curr;
          });
          const promiseArr = people.map((person) =>
            addListToUser(person.user_id, list.list_id, list.list_name)
          );
          return Promise.all(promiseArr);
        })
        .then(() => {
          setLoading(false);
          navigation.navigate("Lists");
        });
    } else {
      setError("Please Provide a list name");
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        {error ? (
          <Text
            style={{ marginLeft: "auto", marginRight: "auto", color: "red" }}
          >
            {error}
          </Text>
        ) : null}
        <Text style={styles.labels}>List Name</Text>
        <TextInput
          style={styles.inputBars}
          onChangeText={(value) => {
            setListName(value);
          }}
        ></TextInput>
        <Text style={styles.labels}>Add People</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {addedPeople.map((user) => (
            <DisplayNameEmail
              user={user}
              setAddedPeople={setAddedPeople}
              setSearchResults={setSearchResults}
            />
          ))}
        </View>
        <TextInput
          style={styles.inputBars}
          onChangeText={(value) => {
            setSearchTerm(value);
          }}
          value={searchTerm}
        ></TextInput>
        {searchResults.map((user) => (
          <UserProfileBar
            setAddedPeople={setAddedPeople}
            setSearchResults={setSearchResults}
            user={user}
            key={user.user_id}
          />
        ))}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>Create</Text>
        </TouchableOpacity>
        <Modal animationType="slide" visible={loading} transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Loading</Text>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "start",
    justifyContent: "start",
  },
  inputBars: {
    borderWidth: 1,
    height: 19,
    marginLeft: "auto",
    marginRight: "auto",
    width: "85%",
    height: 25,
    padding: 3,
  },
  labels: {
    margin: 15,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#d9fffd",
    padding: 10,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
