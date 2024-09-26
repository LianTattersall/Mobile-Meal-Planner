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
  const [seafood, setSeafood] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route.params.param === "Lunch") {
      getMealsByCategory("Pasta")
        .then(({ meals }) => {
          setPastaDishes(meals);
          return getMealsByCategory("Vegan");
        })
        .then(({ meals }) => {
          setVeganDishes(meals);
          return getMealsByCategory("Chicken");
        })
        .then(({ meals }) => {
          setChickenDishes(meals);
          setLoading(false);
        });
    }
    if (route.params.param === "Breakfast") {
      getMealsByCategory("Breakfast").then(({ meals }) => {
        setBreakfastDishes(meals);
        setLoading(false);
      });
    }
    if (route.params.param === "Dinner") {
      getMealsByCategory("Pasta")
        .then(({ meals }) => {
          setPastaDishes(meals);
          return getMealsByCategory("Vegan");
        })
        .then(({ meals }) => {
          setVeganDishes(meals);
          return getMealsByCategory("Chicken");
        })
        .then(({ meals }) => {
          setChickenDishes(meals);
          return getMealsByCategory("Seafood");
        })
        .then(({ meals }) => {
          setSeafood(meals);
          setLoading(false);
        });
    }
    if (route.params.param === "Extras") {
      getMealsByCategory("Dessert")
        .then(({ meals }) => {
          setDesserts(meals);
          return getMealsByCategory("Side");
        })
        .then(({ meals }) => {
          setOther(meals);
          return getMealsByCategory("Starter");
        })
        .then(({ meals }) => {
          setSide(meals);
          return getMealsByCategory("Miscellaneous");
        })
        .then(({ meals }) => {
          setStarter(meals);
          setLoading(false);
        });
    }
  }, []);

  const LunchScreen = (
    <View style={[styles.container, { flex: 1 }]}>
      <ScrollView>
        <SearchBar
          meal={route.params.param}
          navigation={navigation}
        ></SearchBar>
        <TextInput style={styles.searchBar}></TextInput>
        <Text style={styles.header}>Pasta</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={pastaDishes}
        ></CategoryMealBars>
        <Text style={styles.header}>Vegan</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={veganDishes}
        ></CategoryMealBars>
        <Text style={styles.header}>Chicken</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={chieckenDishes}
        ></CategoryMealBars>
      </ScrollView>
    </View>
  );

  const DinnerScreen = (
    <View style={[styles.container, { flex: 1 }]}>
      <ScrollView>
        <SearchBar
          meal={route.params.param}
          navigation={navigation}
        ></SearchBar>
        <TextInput style={styles.searchBar}></TextInput>
        <Text style={styles.header}>Pasta</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={pastaDishes}
        ></CategoryMealBars>
        <Text style={styles.header}>Vegan</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={veganDishes}
        ></CategoryMealBars>
        <Text style={styles.header}>Chicken</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={chieckenDishes}
        ></CategoryMealBars>
        <Text style={styles.header}>Seafood</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={seafood}
        ></CategoryMealBars>
      </ScrollView>
    </View>
  );

  const BreakfastScreen = (
    <View style={[styles.container, { flex: 1 }]}>
      <ScrollView>
        <SearchBar
          meal={route.params.param}
          navigation={navigation}
        ></SearchBar>
        <Text style={styles.header}>Breakfast</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={breakfastDishes}
        ></CategoryMealBars>
      </ScrollView>
    </View>
  );

  const ExtrasScreen = (
    <View style={[styles.container, { flex: 1 }]}>
      <ScrollView>
        <SearchBar
          meal={route.params.param}
          navigation={navigation}
        ></SearchBar>
        <Text style={styles.header}>Desserts</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={desserts}
        ></CategoryMealBars>
        <Text style={styles.header}>Sides</Text>
        <CategoryMealBars
          loading={loading}
          navigation={navigation}
          data={side}
          meal={route.params.param}
        ></CategoryMealBars>
        <Text style={styles.header}>Starters</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={starter}
        ></CategoryMealBars>
        <Text style={styles.header}>Other</Text>
        <CategoryMealBars
          loading={loading}
          meal={route.params.param}
          navigation={navigation}
          data={other}
        ></CategoryMealBars>
      </ScrollView>
    </View>
  );

  if (route.params.param === "Lunch") {
    return LunchScreen;
  } else if (route.params.param === "Breakfast") {
    return BreakfastScreen;
  } else if (route.params.param === "Extras") {
    return ExtrasScreen;
  } else if (route.params.param === "Dinner") {
    return DinnerScreen;
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
