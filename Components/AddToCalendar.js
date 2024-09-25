import { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { SelectedDateContext } from "../Contexts/SelectedDateContext";
import { addMealToCalendar } from "../utils/api";
import { UserContext } from "../Contexts/UserContext";
import { TouchableOpacity } from "react-native";

export default function ({
  recipie_id,
  my_recipie,
  meal,
  recipie_name,
  navigation,
}) {
  const { selectedDate, setMeals } = useContext(SelectedDateContext);
  const { user } = useContext(UserContext);
  const strDate = `${selectedDate.date}/${selectedDate.month + 1}/${
    selectedDate.year
  }`;
  const strDate2 = `${selectedDate.date}-${selectedDate.month}-${selectedDate.year}`;

  function handlePress() {
    setMeals((curr) => {
      const currCopy = JSON.parse(JSON.stringify(curr));
      currCopy[meal.toLowerCase()] = { recipie_id, recipie_name, my_recipie };
      return currCopy;
    });
    addMealToCalendar(
      user.user_id,
      strDate2,
      meal,
      recipie_id,
      my_recipie,
      recipie_name
    ).then(() => {
      navigation.navigate("Calendar");
    });
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text>
        Add meal for {meal.toLowerCase()} on the {strDate}
      </Text>
    </TouchableOpacity>
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
