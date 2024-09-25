import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function MealCard({ meal, data, pressHandler, loading }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={
        data
          ? () => {
              console.log(data.recipie_id);
              pressHandler("Recipie", data.recipie_id);
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
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#bcedcf",
    padding: 8,
    height: 90,
    margin: 10,
    borderRadius: 8,
  },
  header: { fontWeight: "500", fontSize: 18 },
});
