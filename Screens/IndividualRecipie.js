import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getUserRecipieById } from "../utils/api";
import IngredientsSection from "../Components/IngredientsSection";
import { TouchableOpacity } from "react-native";

export default function ({ navigation, route }) {
  const [recipie, setRecipie] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserRecipieById(route.params.recipie_id).then((data) => {
      setLoading(false);
      setRecipie(data.recipie);
      setIngredients(data.recipie.ingredients);
    });
  }, []);

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
          <Text>Loading recipie</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>{recipie.recipie_name}</Text>
        <Image source={{ uri: recipie.image_url }} style={styles.image}></Image>
        <IngredientsSection ingredients={ingredients} />
        <Text style={styles.strInstructions}>{recipie.method}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
  header: {
    fontSize: 30,
    margin: 10,
  },
  image: {
    height: 200,
    width: 325,
    borderRadius: 5,
  },
  strInstructions: {
    fontSize: 20,
    margin: 8,
  },

  button: {
    backgroundColor: "#d9fffd",
    padding: 10,
    borderRadius: 6,
  },
});
