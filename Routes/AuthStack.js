import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../Screens/SignIn";
import Login from "../Screens/Login";

const stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <stack.Navigator initialRouteName="SignUp">
      <stack.Screen
        name="SignUp"
        component={SignIn}
        options={{ headerShown: false }}
      ></stack.Screen>
      <stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      ></stack.Screen>
    </stack.Navigator>
  );
}
