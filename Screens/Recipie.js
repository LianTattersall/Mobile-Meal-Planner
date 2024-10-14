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
import IngredientsSection from "../Components/IngredientsSection";
import { getUserRecipieById } from "../utils/api";

export default function Recipie({ navigation, route }) {
  const { recipie_id, freeMealApi, meal } = route.params;
  const [recipie, setRecipie] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (freeMealApi) {
      getRecipieById(recipie_id).then((data) => {
        setLoading(false);
        setRecipie(data.meals[0]);
        setIngredients(formatIngredients(data.meals[0]));
      });
    } else {
      getUserRecipieById(route.params.recipie_id).then((data) => {
        setLoading(false);
        setRecipie(data.recipie);
        setIngredients(data.recipie.ingredients);
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

  const UserRecipieComponent = (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>{recipie.recipie_name}</Text>
        <Image source={{ uri: recipie.image_url }} style={styles.image}></Image>
        <IngredientsSection ingredients={ingredients} />
        <Text style={styles.strInstructions}>{recipie.method}</Text>
        <AddToCalendar
          meal={meal}
          recipie_id={recipie.recipie_id}
          my_recipie={true}
          recipie_name={recipie.recipie_name}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );

  if (freeMealApi) {
    return freeMealApiRecipie;
  } else {
    return UserRecipieComponent;
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

  button: {
    backgroundColor: "#d9fffd",
    padding: 10,
    borderRadius: 6,
  },
});
