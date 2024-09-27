import { useEffect, useState } from "react";
import { getListById } from "../utils/api";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function ({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState("");
  function renderItem({ item }) {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => rightAction(progress, dragX)}
        friction={1}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.item}</Text>
        </View>
      </Swipeable>
    );
  }

  function rightAction(progress, dragX) {
    return (
      <View style={[styles.delete]}>
        <Text style={{ lineHeight: 50, marginLeft: 5, marginRight: 5 }}>
          Delete List
        </Text>
      </View>
    );
  }
  useEffect(() => {
    getListById(route.params.list_id).then(({ list }) => {
      setListName(list.listName);
      setItems(
        list.items.map((item, index) => {
          return { item, index };
        })
      );
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Text>{listName}</Text>
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
