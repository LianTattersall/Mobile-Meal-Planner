import { TouchableOpacity, View } from "react-native";
import { FlatList, Image, StyleSheet, Text } from "react-native";

export default function ({ data, navigation, meal, loading, edit }) {
  function handlePress(recipie_id) {
    navigation.navigate("Recipie", { recipie_id, freeMealApi: true, meal });
  }
  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.recipieContainer}
        onPress={() => handlePress(item.idMeal)}
      >
        <Image source={{ uri: item.strMealThumb }} style={styles.image}></Image>
        <Text style={{ marginTop: 10, fontSize: 16 }}>{item.strMeal}</Text>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <FlatList horizontal={true} data={data} renderItem={renderItem}></FlatList>
  );
}

const styles = StyleSheet.create({
  recipieContainer: {
    width: 110,
    margin: 10,
  },
  image: { height: 110, width: 110, borderRadius: 5 },
  loadingContainer: {
    height: 150,
    margin: 10,
  },
});
