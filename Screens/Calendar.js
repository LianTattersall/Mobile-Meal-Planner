import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import DatesBar from "../Components/DatesBar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { SelectedDateContext } from "../Contexts/SelectedDateContext";
import dateObjToStr from "../utils/dateObjToStr";
import { getMealsForUserByDate } from "../utils/api";
import MealCard from "../Components/MealCard";

export default function Calendar({ navigation }) {
  const { user } = useContext(UserContext);
  const { selectedDate, meals, setMeals } = useContext(SelectedDateContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMealsForUserByDate(user.user_id, dateObjToStr(selectedDate)).then(
      (data) => {
        setLoading(false);
        setMeals(data.meals);
      }
    );
  }, [selectedDate]);

  function pressHandler(route, param, recipie_id, freeMealApi, meal) {
    if (param && recipie_id) {
      navigation.navigate(route, { param, recipie_id, freeMealApi, meal });
    } else if (param) {
      navigation.navigate(route, { param });
    }
  }

  return (
    <View style={styles.container}>
      <DatesBar />
      <MealCard
        meal={"Breakfast"}
        data={meals.breakfast}
        pressHandler={pressHandler}
        loading={loading}
      />
      <MealCard
        meal={"Lunch"}
        data={meals.lunch}
        pressHandler={pressHandler}
        loading={loading}
      />
      <MealCard
        meal={"Dinner"}
        data={meals.dinner}
        pressHandler={pressHandler}
        loading={loading}
      />
      <MealCard
        meal={"Extras"}
        data={meals.extras}
        pressHandler={pressHandler}
        loading={loading}
      />
      <View style={{ height: 70 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
  calendarContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
});
