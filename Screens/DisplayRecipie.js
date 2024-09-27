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
import EditMeal from "../Components/EditMeal";
import IngredientsSection from "../Components/IngredientsSection";

export default function DisplayRecipie({ navigation, route }) {
  const { param, recipie_id, freeMealApi, meal } = route.params;
  const [recipie, setRecipie] = useState({});
  const [ingredients, setIgredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (freeMealApi) {
      getRecipieById(recipie_id).then((data) => {
        setLoading(false);
        setRecipie(data.meals[0]);
        setIgredients(formatIngredients(data.meals[0]));
      });
    }
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
  const freeMealApiRecipie = (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>{recipie.strMeal}</Text>
        <Image
          source={{ uri: recipie.strMealThumb }}
          style={styles.image}
        ></Image>
        <IngredientsSection ingredients={ingredients} />
        <Text style={styles.strInstructions}>{recipie.strInstructions}</Text>
        {param === "fromCalendar" ? (
          <EditMeal navigation={navigation} meal={meal} />
        ) : (
          <AddToCalendar
            meal={meal}
            recipie_id={recipie.idMeal}
            my_recipie={false}
            recipie_name={recipie.strMeal}
            navigation={navigation}
          />
        )}
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
