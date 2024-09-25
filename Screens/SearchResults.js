import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getMealsBySearchQuery } from "../utils/freeMealApi";
import { TouchableOpacity } from "react-native";

export default function ({ route, navigation }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMealsBySearchQuery(route.params.searchQuery).then((apiResults) => {
      setResults(apiResults);
      setLoading(false);
    });
  }, []);

  function handlePress(recipie_id) {
    navigation.navigate("Recipie", {
      recipie_id,
      freeMealApi: true,
      meal: route.params.meal,
    });
  }

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.resultsContainer}>
      {results.map((item) => {
        return (
          <TouchableOpacity
            style={styles.recipieContainer}
            onPress={() => {
              handlePress(item.idMeal);
            }}
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.image}
            ></Image>
            <Text style={{ marginTop: 10, fontSize: 16 }}>{item.strMeal}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
  },
  recipieContainer: {
    width: 110,
    margin: 10,
  },
  image: { height: 110, borderRadius: 5 },
});
