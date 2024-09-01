import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CalendarStack from "./CalendarStack";
import ListsStack from "./ListsStack";
import SignIn from "../Screens/SignIn";
import { useContext, useState } from "react";
import { LoggedIn } from "../Contexts/UserContext";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const { loggedIn } = useContext(LoggedIn);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {loggedIn ? (
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
          </Tab.Group>
        ) : (
          <Tab.Group>
            <Tab.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false, tabBarStyle: { display: "none" } }}
            ></Tab.Screen>
          </Tab.Group>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
