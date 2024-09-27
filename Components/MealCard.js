import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function MealCard({ meal, data, pressHandler, loading }) {
  const dataLoaded = (
    <TouchableOpacity
      style={styles.container}
      onPress={
        data
          ? () => {
              pressHandler(
                "DisplayRecipie",
                "fromCalendar",
                data.recipie_id,
                !data.my_recipie,
                meal
              );
            }
          : () => {
              pressHandler("AddMeal", meal);
            }
      }
    >
      <Text style={styles.header}>{meal}</Text>
      {data ? <Text>{data.recipie_name}</Text> : <Text>Add a meal</Text>}
    </TouchableOpacity>
  );

  const loadingCard = (
    <TouchableOpacity style={styles.container}>
      <Text>Loading</Text>
    </TouchableOpacity>
  );
  if (loading) {
    return loadingCard;
  } else {
    return dataLoaded;
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#bcedcf",
    padding: 8,
    height: 90,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: { fontWeight: "500", fontSize: 18 },
});
