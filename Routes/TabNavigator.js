import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CalendarStack from "./CalendarStack";
import ListsStack from "./ListsStack";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import AuthStack from "./AuthStack";
import Settings from "../Screens/Settings";
import RecipiesStack from "./RecipiesStack";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const {
    user: { user_id },
  } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {user_id ? (
          <Tab.Group>
            <Tab.Screen
              name="CalendarStack"
              component={CalendarStack}
              options={{ headerShown: false, title: "Calendar" }}
            ></Tab.Screen>
            <Tab.Screen
              name="MyLists"
              component={ListsStack}
              options={{ headerShown: false }}
            ></Tab.Screen>
            <Tab.Screen
              name="MyRecipies"
              component={RecipiesStack}
              options={{ headerShown: false }}
            ></Tab.Screen>
            <Tab.Screen name="Settings" component={Settings}></Tab.Screen>
          </Tab.Group>
        ) : (
          <Tab.Group>
            <Tab.Screen
              name="SignIn"
              component={AuthStack}
              options={{ headerShown: false, tabBarStyle: { display: "none" } }}
            ></Tab.Screen>
          </Tab.Group>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
