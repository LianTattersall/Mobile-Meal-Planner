import { StyleSheet, Text, View } from "react-native";
import AddNewListButton from "../Components/AddNewListButton";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { getUsersRecipies } from "../utils/api";
import { TouchableOpacity } from "react-native";
import { RecipieContext } from "../Contexts/RecipiesContext";

export default function ({ navigation }) {
  const { user } = useContext(UserContext);
  const { recipies, setRecipies } = useContext(RecipieContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsersRecipies(user.user_id).then((data) => {
      setLoading(false);
      setRecipies(data.recipies);
    });
  }, []);

  function handlePress(recipie_id) {
    navigation.navigate("IndividualRecipie", { recipie_id });
  }

  const recipiesComponent = recipies.map((recipie) => (
    <TouchableOpacity
      style={{ margin: 10 }}
      onPress={() => handlePress(recipie.recipie_id)}
      key={recipie.recipie_id}
    >
      <Text>{recipie.recipie_name}</Text>
    </TouchableOpacity>
  ));
  return (
    <View style={styles.container}>
      {loading ? <Text>Loading</Text> : recipiesComponent}
      <AddNewListButton
        user_id={user.user_id}
        navigation={navigation}
        text={"Add a new recipie"}
        route={"AddNewRecipie"}
      ></AddNewListButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
