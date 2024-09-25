import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { getMealsByCategory } from "../utils/freeMealApi";
import CategoryMealBars from "../Components/CategoryMealBars";
import SearchBar from "../Components/SearchBar";

export default function AddMeal({ route, navigation }) {
  const [pastaDishes, setPastaDishes] = useState([]);
  const [breakfastDishes, setBreakfastDishes] = useState([]);
  const [veganDishes, setVeganDishes] = useState([]);
  const [chieckenDishes, setChickenDishes] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [other, setOther] = useState([]);
  const [side, setSide] = useState([]);
  const [starter, setStarter] = useState([]);

  useEffect(() => {
    if (route.params.param === "Lunch") {
      getMealsByCategory("Pasta").then(({ meals }) => {
        setPastaDishes(meals);
      });
      getMealsByCategory("Vegan").then(({ meals }) => {
        setVeganDishes(meals);
      });
      getMealsByCategory("Chicken").then(({ meals }) => {
        setChickenDishes(meals);
      });
    }
    if (route.params.param === "Breakfast") {
      getMealsByCategory("Breakfast").then(({ meals }) => {
        setBreakfastDishes(meals);
      });
    }
    if (route.params.param === "Dinner") {
      getMealsByCategory("Vegan").then(({ meals }) => {
        setVeganDishes(meals);
      });
    }
    if (route.params.param === "Extras") {
      getMealsByCategory("Dessert").then(({ meals }) => {
        setDesserts(meals);
      });
      getMealsByCategory("Miscellaneous").then(({ meals }) => {
        setOther(meals);
      });
      getMealsByCategory("Side").then(({ meals }) => {
        setSide(meals);
      });
      getMealsByCategory("Starter").then(({ meals }) => {
        setStarter(meals);
      });
    }
  }, []);

  const LunchScreen = (
    <ScrollView>
      <SearchBar meal={route.params.param} navigation={navigation}></SearchBar>
      <TextInput style={styles.searchBar}></TextInput>
      <Text style={styles.header}>Pasta</Text>
      <CategoryMealBars
        meal={route.params.param}
        navigation={navigation}
        data={pastaDishes}
      ></CategoryMealBars>
      <Text style={styles.header}>Vegan</Text>
      <CategoryMealBars
        meal={route.params.param}
        navigation={navigation}
        data={veganDishes}
      ></CategoryMealBars>
      <Text style={styles.header}>Chicken</Text>
      <CategoryMealBars
        meal={route.params.param}
        navigation={navigation}
        data={chieckenDishes}
      ></CategoryMealBars>
    </ScrollView>
  );

  const BreakfastScreen = (
    <ScrollView>
      <SearchBar meal={route.params.param} navigation={navigation}></SearchBar>
      <Text style={styles.header}>Breakfast</Text>
      <CategoryMealBars
        meal={route.params.param}
        navigation={navigation}
        data={breakfastDishes}
      ></CategoryMealBars>
    </ScrollView>
  );

  const ExtrasScreen = (
    <ScrollView>
      <SearchBar meal={route.params.param} navigation={navigation}></SearchBar>
      <Text style={styles.header}>Desserts</Text>
      <CategoryMealBars
        meal={route.params.param}
        navigation={navigation}
        data={desserts}
      ></CategoryMealBars>
      <Text style={styles.header}>Sides</Text>
      <CategoryMealBars
        navigation={navigation}
        data={side}
        meal={route.params.param}
      ></CategoryMealBars>
      <Text style={styles.header}>Starters</Text>
      <CategoryMealBars
        meal={route.params.param}
        navigation={navigation}
        data={starter}
      ></CategoryMealBars>
      <Text style={styles.header}>Other</Text>
      <CategoryMealBars
        meal={route.params.param}
        navigation={navigation}
        data={other}
      ></CategoryMealBars>
    </ScrollView>
  );

  if (route.params.param === "Lunch") {
    return LunchScreen;
  } else if (route.params.param === "Breakfast") {
    return BreakfastScreen;
  } else if (route.params.param === "Extras") {
    return ExtrasScreen;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 25,
    margin: 10,
  },
  categoryContainer: {
    flex: 1,
  },
});
