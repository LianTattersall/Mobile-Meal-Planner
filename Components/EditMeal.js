import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { UserContext } from "../Contexts/UserContext";
import { SelectedDateContext } from "../Contexts/SelectedDateContext";
import { deleteMeal } from "../utils/api";

export default function ({ meal, navigation }) {
  const { user } = useContext(UserContext);
  const { selectedDate, setMeals } = useContext(SelectedDateContext);
  const strDate = `${selectedDate.date}-${selectedDate.month}-${selectedDate.year}`;

  function changeMealHandler() {
    navigation.navigate("AddMeal", { param: meal, edit: true });
  }

  function deleteMealHandler() {
    setMeals((curr) => {
      const currCopy = JSON.parse(JSON.stringify(curr));
      delete currCopy[meal.toLowerCase()];
      return currCopy;
    });
    deleteMeal(user.user_id, strDate, meal.toLowerCase()).then(() => {
      navigation.navigate("Calendar");
    });
  }
  return (
    <>
      <TouchableOpacity onPress={changeMealHandler} style={styles.button}>
        <Text>Change this meal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={deleteMealHandler}>
        <Text>Delete this meal from calendar</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#d9fffd",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
});
