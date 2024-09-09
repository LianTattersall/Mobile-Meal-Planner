import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../Screens/SignIn";
import Login from "../Screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import LoadingLogo from "../Screens/LoadingLogo";
import Calendar from "../Screens/Calendar";

const stack = createNativeStackNavigator();

export default function AuthStack() {
  const { setUser } = useContext(UserContext);
  const [showSignUp, setShowSignUp] = useState(false);

  AsyncStorage.getItem("user").then((data) => {
    if (data) {
      setUser(JSON.parse(data));
    } else {
      setShowSignUp(true);
    }
  });
  return (
    <stack.Navigator initialRouteName="SignUp">
      {showSignUp ? (
        <stack.Group>
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
        </stack.Group>
      ) : (
        <stack.Group>
          <stack.Screen
            component={LoadingLogo}
            name="Loading"
            options={{ headerShown: false }}
          ></stack.Screen>
        </stack.Group>
      )}
    </stack.Navigator>
  );
}
