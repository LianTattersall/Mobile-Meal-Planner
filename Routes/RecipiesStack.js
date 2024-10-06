import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipies from "../Screens/Recipies";

const stack = createNativeStackNavigator();

export default function () {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Recipies"
        component={Recipies}
        options={{ title: "" }}
      ></stack.Screen>
    </stack.Navigator>
  );
}
