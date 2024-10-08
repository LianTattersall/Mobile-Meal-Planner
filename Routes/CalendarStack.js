import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calendar from "../Screens/Calendar";
import Recipie from "../Screens/Recipie";
import AddMeal from "../Screens/AddMeal";
import AddIngredients from "../Screens/AddIngredients";
import { SelectedDateProvider } from "../Contexts/SelectedDateContext";
import SearchResults from "../Screens/SearchResults";
import DisplayRecipie from "../Screens/DisplayRecipie";

const stack = createNativeStackNavigator();

export default function CalendarStack() {
  return (
    <SelectedDateProvider>
      <stack.Navigator initialRouteName="Calendar">
        <stack.Screen
          name="Calendar"
          component={Calendar}
          options={{ headerShown: false }}
        ></stack.Screen>
        <stack.Screen
          name="Recipie"
          component={Recipie}
          options={{ title: "" }}
        ></stack.Screen>
        <stack.Screen
          name="AddMeal"
          component={AddMeal}
          options={{ title: "Add Meal" }}
        ></stack.Screen>
        <stack.Screen
          name="AddIngredients"
          component={AddIngredients}
          options={{ title: "Add Ingredients", presentation: "modal" }}
        ></stack.Screen>
        <stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{ title: "Search Results" }}
        ></stack.Screen>
        <stack.Screen
          name="DisplayRecipie"
          component={DisplayRecipie}
          options={{ title: "" }}
        ></stack.Screen>
      </stack.Navigator>
    </SelectedDateProvider>
  );
}
