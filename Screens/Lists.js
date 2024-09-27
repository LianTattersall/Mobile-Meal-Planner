import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getListsByUserId } from "../utils/api";
import { UserContext } from "../Contexts/UserContext";
import AddNewListButton from "../Components/AddNewListButton";
import { ListsContext } from "../Contexts/ListsContext";
import { TouchableOpacity } from "react-native";

export default function Lists({ navigation }) {
  const { user } = useContext(UserContext);
  const { userLists, setUserLists } = useContext(ListsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListsByUserId(user.user_id).then(({ lists }) => {
      setLoading(false);
      setUserLists(lists);
    });
  }, []);

  const handlePress = (list_id) => {
    navigation.navigate("IndividualList", { list_id });
  };
  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View>
          <Text>Loading Lists</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {userLists.map((list) => {
        return (
          <TouchableOpacity
            key={list.list_id}
            style={{ margin: 10 }}
            onPress={() => {
              handlePress(list.list_id);
            }}
          >
            <Text>{list.list_name}</Text>
          </TouchableOpacity>
        );
      })}
      <AddNewListButton navigation={navigation} user_id={user.user_id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
