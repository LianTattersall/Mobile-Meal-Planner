import { useContext, useEffect, useState } from "react";
import { Dimensions, Modal } from "react-native";
import { StyleSheet, View, Text, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getListsByUserId, postItemsToList } from "../utils/api";
import { UserContext } from "../Contexts/UserContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native";
import { collection, doc, onSnapshot } from "firebase/firestore";
import db from "../connection";

const colRef = collection(db, "users");

export default function ({ ingredients }) {
  const { user } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [denyModal, setDenyModal] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListsByUserId(user.user_id).then(({ lists }) => {
      setUserLists(lists);
    });
  }, []);

  useEffect(
    () =>
      onSnapshot(doc(colRef, user.user_id), (snapShot) => {
        setUserLists(snapShot.data().lists);
      }),
    []
  );

  function handleCheck(ing, isChecked) {
    if (isChecked) {
      setList((curr) => {
        curr.push(ing);
        return curr;
      });
    } else {
      setList((curr) => {
        curr = curr.filter((listIng) => ing !== listIng);
        return curr;
      });
    }
  }

  function openModal() {
    if (list.length !== 0) {
      setModalVisible(true);
    } else {
      setDenyModal("Select some ingredients!");
      setTimeout(() => {
        setDenyModal("");
      }, 6000);
    }
  }

  function handleSubmit() {
    setLoading(true);
    postItemsToList(selectedList, list).then(() => {
      setLoading(false);
      setModalVisible(false);
    });
  }

  const selectListModalContent = (
    <>
      <Text>Add ingredients to:</Text>
      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedList(value);
        }}
        items={userLists.map((list) => {
          return { label: list.list_name, value: list.list_id };
        })}
        placeholder={{ label: "Select a list" }}
        style={{ height: 40 }}
      ></RNPickerSelect>
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={handleSubmit}
      >
        <Text>Add Ingredients</Text>
      </TouchableOpacity>
    </>
  );

  const loadingModalContent = (
    <>
      <Text>Loading</Text>
    </>
  );

  const modalContent = loading ? loadingModalContent : selectListModalContent;
  return (
    <>
      <View style={styles.ingredientsContainer}>
        {ingredients.map((ing, index) => {
          return (
            <View key={index} style={{ flexDirection: "row", margin: 5 }}>
              <BouncyCheckbox
                onPress={(isChecked) => {
                  handleCheck(ing, isChecked);
                }}
              ></BouncyCheckbox>
              <Text style={styles.ingredients}>{ing}</Text>
            </View>
          );
        })}
      </View>
      {denyModal ? <Text>Select some ingredients!</Text> : null}
      <Pressable style={styles.button} onPress={openModal}>
        <Text>Add Ingredients to shopping list</Text>
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}></View>
              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </View>
            {userLists.length !== 0 ? (
              modalContent
            ) : (
              <Text>
                Create a list to add your items to by pressing the MyLists tab
                at the bottom
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  ingredientsContainer: {
    width: Dimensions.get("window").width,
    padding: 15,
    marginLeft: 12,
    alignItems: "flex-start",
  },
  ingredients: {
    padding: 5,
  },
  button: {
    backgroundColor: "#d9fffd",
    padding: 10,
    borderRadius: 6,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "start",
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
