import { useEffect, useState } from "react";
import { deleteItem, getListById } from "../utils/api";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { collection, doc, onSnapshot } from "firebase/firestore";
import db from "../connection";
import { TouchableOpacity } from "react-native";

const colRef = collection(db, "lists");

export default function ({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState("");
  const [err, setErr] = useState(false);

  function renderItem({ item }) {
    return (
      <Swipeable
        renderRightActions={() => rightAction(item.index)}
        friction={1}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.item}</Text>
        </View>
      </Swipeable>
    );
  }

  function handleDelete(index) {
    const prevItems = [...items];
    setItems((curr) => {
      const filtered = curr.filter((item) => item.index !== index);
      return filtered;
    });
    deleteItem(route.params.list_id, index).catch(() => {
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 6000);
      setItems(prevItems);
    });
  }

  function rightAction(index) {
    return (
      <TouchableOpacity
        style={[styles.delete]}
        onPress={() => {
          handleDelete(index);
        }}
      >
        <Text style={{ lineHeight: 50, marginLeft: 5, marginRight: 5 }}>
          Delete Item
        </Text>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    getListById(route.params.list_id).then(({ list }) => {
      setListName(list.list_name);
      setItems(
        list.items.map((item, index) => {
          return { item, index };
        })
      );
    });
  }, []);

  useEffect(
    () =>
      onSnapshot(doc(colRef, route.params.list_id), (snapShot) => {
        setItems(
          snapShot.data().items.map((item, index) => {
            return { item, index };
          })
        );
      }),
    []
  );

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Text style={{ fontSize: 30, textAlign: "center" }}>{listName}</Text>
      {err ? (
        <Text style={{ marginLeft: "auto", marginRight: "auto", color: "red" }}>
          An error occured
        </Text>
      ) : null}
      <FlatList data={items} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 50,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    borderRightWidth: 100,
    borderRightColor: "#fff",
    borderLeftWidth: 100,
    borderLeftColor: "#fff",
  },
  item: { marginLeft: "auto", marginRight: "auto", lineHeight: 50 },
  delete: { backgroundColor: "#dd2c00" },
});
