import { useContext, useEffect, useState } from "react";
import { Dimensions, Modal } from "react-native";
import { StyleSheet, View, Text, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getListsByUserId } from "../utils/api";
import { UserContext } from "../Contexts/UserContext";

export default function ({ ingredients }) {
  const { user } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    getListsByUserId(user.user_id).then(({ lists }) => {
      console.log(lists);
      setUserLists(lists);
    });
  }, []);

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

  function handleSubmit() {
    setModalVisible(true);
  }
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
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text>Add Ingredients to shopping list</Text>
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}></View>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text>Close</Text>
              </Pressable>
            </View>
            <Text>Add ingredients to which list:</Text>
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
