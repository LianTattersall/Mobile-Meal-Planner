import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getRecipieById } from "../utils/freeMealApi";
import { formatIngredients } from "../utils/formatIngredients";
import AddToCalendar from "../Components/AddToCalendar";

export default function Recipie({ navigation, route }) {
  const { param, recipie_id, freeMealApi, meal } = route.params;
  const [recipie, setRecipie] = useState({});
  const [ingredients, setIgredients] = useState([]);

  useEffect(() => {
    if (freeMealApi) {
      getRecipieById(recipie_id).then((data) => {
        setRecipie(data.meals[0]);
        setIgredients(formatIngredients(data.meals[0]));
      });
    }
  }, []);

  function pressHandler() {
    navigation.navigate("AddIngredients");
  }
  const freeMealApiRecipie = (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>{recipie.strMeal}</Text>
        <Image
          source={{ uri: recipie.strMealThumb }}
          style={styles.image}
        ></Image>
        <View style={styles.ingredientsContainer}>
          {ingredients.map((ing, index) => {
            return (
              <Text key={index} style={styles.ingredients}>
                {ing}
              </Text>
            );
          })}
        </View>
        <Pressable onPress={pressHandler} style={styles.button}>
          <Text>Add Ingredients to shopping list</Text>
        </Pressable>
        <Text style={styles.strInstructions}>{recipie.strInstructions}</Text>
        <AddToCalendar
          meal={meal}
          recipie_id={recipie.idMeal}
          my_recipie={false}
          recipie_name={recipie.strMeal}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );

  if (freeMealApi) {
    return freeMealApiRecipie;
  }
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
});
