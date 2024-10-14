import { Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ({ ingredient, index, removeIngredient }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", margin: 8 }}>
      <AntDesign
        name="close"
        size={20}
        onPress={() => {
          removeIngredient(index);
        }}
      ></AntDesign>
      <Text style={{ marginLeft: 10 }}>{ingredient}</Text>
    </View>
  );
}
