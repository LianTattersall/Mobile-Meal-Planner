import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Lists from "../Screens/Lists";
import AddNewList from "../Screens/AddNewList";
import { ListsProvider } from "../Contexts/ListsContext";
import IndividualList from "../Screens/IndividualList";

const stack = createNativeStackNavigator();

export default function ListsStack() {
  return (
    <ListsProvider>
      <stack.Navigator>
        <stack.Screen name="Lists" component={Lists}></stack.Screen>
        <stack.Screen
          name="AddNewList"
          component={AddNewList}
          options={{ title: "" }}
        ></stack.Screen>
        <stack.Screen
          name="IndividualList"
          component={IndividualList}
          options={{ title: "" }}
        ></stack.Screen>
      </stack.Navigator>
    </ListsProvider>
  );
}
