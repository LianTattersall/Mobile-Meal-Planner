import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lists from "../Screens/Lists";

const stack = createNativeStackNavigator();

export default function ListsStack() {
  return (
    <stack.Navigator>
      <stack.Screen name="Lists" component={Lists}></stack.Screen>
    </stack.Navigator>
  );
}
