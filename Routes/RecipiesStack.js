import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipies from "../Screens/Recipies";
import AddNewRecipie from "../Screens/AddNewRecipie";
import IndividualRecipie from "../Screens/IndividualRecipie";
import { RecipieContextProvider } from "../Contexts/RecipiesContext";

const stack = createNativeStackNavigator();

export default function () {
  return (
    <RecipieContextProvider>
      <stack.Navigator>
        <stack.Screen
          name="Recipies"
          component={Recipies}
          options={{ title: "" }}
        ></stack.Screen>
        <stack.Screen
          name="AddNewRecipie"
          component={AddNewRecipie}
          options={{ title: "" }}
        ></stack.Screen>
        <stack.Screen
          name="IndividualRecipie"
          component={IndividualRecipie}
          options={{ title: "" }}
        ></stack.Screen>
      </stack.Navigator>
    </RecipieContextProvider>
  );
}
