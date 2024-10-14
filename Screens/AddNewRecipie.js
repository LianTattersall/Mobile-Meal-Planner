import { useContext, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  TextInput,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import IngredientForRecipie from "../Components/IngredientForRecipie";
import { postRecipie, postRecipieToUser } from "../utils/api";
import { UserContext } from "../Contexts/UserContext";
import { RecipieContext } from "../Contexts/RecipiesContext";

export default function ({ navigation }) {
  const [imageUri, setImageUri] = useState(
    "https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg"
  );
  const [ingredients, setIngredients] = useState([]);
  const [ingInput, setIngInput] = useState("");
  const [methodInput, setMethodInput] = useState("");
  const [ingredientErr, setIngredientErr] = useState(false);
  const [methodErr, setMethodErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [recipieName, setRecipieName] = useState("");
  const [apiErr, setApiErr] = useState(false);
  const { user } = useContext(UserContext);
  const { setRecipies } = useContext(RecipieContext);
  function changeImage() {
    ImagePicker.launchImageLibraryAsync({ quality: 1 })
      .then(({ assets }) => {
        setImageUri(assets[0].uri);
      })
      .catch(() => {});
  }

  function addIngredient() {
    setIngredients((curr) => [...curr, ingInput]);
    setIngInput("");
  }

  function removeIngredient(index) {
    setIngredients((curr) => curr.filter((ing, i) => i !== index));
  }

  function handleSubmit() {
    if (ingredients.length === 0) {
      setIngredientErr(true);
      setTimeout(() => {
        setIngredientErr(false);
      }, 6000);
    }
    if (!methodInput) {
      setMethodErr(true);
      setTimeout(() => {
        setMethodErr(false);
      }, 6000);
    }
    if (!recipieName) {
      setNameErr(true);
      setTimeout(() => {
        setNameErr(false);
      }, 6000);
    }
    if (ingredients.length !== 0 && methodInput && recipieName) {
      postRecipie(
        recipieName,
        ingredients,
        methodInput,
        {
          user_id: user.user_id,
          display_name: user.display_name,
        },
        imageUri
      )
        .then(({ recipie }) => {
          setRecipies((curr) => [
            ...curr,
            {
              recipie_name: recipie.recipie_name,
              recipie_id: recipie.recipie_id,
            },
          ]);
          postRecipieToUser(
            user.user_id,
            recipie.recipie_id,
            recipie.recipie_name
          );
          navigation.navigate("Recipies");
        })
        .catch(() => {
          setApiErr(true);
        });
    }
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView
          contentContainerStyle={styles.container}
          automaticallyAdjustKeyboardInsets={true}
        >
          <Text style={styles.headers}>Recipie Name</Text>
          {nameErr ? (
            <Text style={{ color: "red" }}>Add a name for your recipie!</Text>
          ) : null}
          <TextInput
            style={{
              borderWidth: 1,
              width: "95%",
              height: 30,
              borderRadius: 4,
            }}
            onChangeText={(value) => {
              setRecipieName(value);
            }}
          ></TextInput>
          <TouchableOpacity onPress={changeImage}>
            <Image
              source={{
                uri: imageUri,
              }}
              style={styles.image}
            ></Image>
          </TouchableOpacity>
          <Pressable style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.headers}>Ingredients</Text>
            {ingredientErr ? (
              <Text style={{ color: "red" }}>Add some ingredients!</Text>
            ) : null}
            <View
              style={{
                justifyContent: "flex-start",
              }}
            >
              {ingredients.map((ing, index) => (
                <IngredientForRecipie
                  ingredient={ing}
                  removeIngredient={removeIngredient}
                  index={index}
                />
              ))}
            </View>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TextInput
              style={styles.ingrediantInput}
              onChangeText={(value) => {
                setIngInput(value);
              }}
              value={ingInput}
            ></TextInput>
            <TouchableOpacity style={styles.addIng} onPress={addIngredient}>
              <Text>Add Ingredient</Text>
            </TouchableOpacity>
          </View>
          <Pressable style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.headers}>Method</Text>
            {methodErr ? (
              <Text style={{ color: "red" }}>Add a method!</Text>
            ) : null}
          </Pressable>
          <TextInput
            multiline={true}
            style={styles.method}
            onChangeText={(value) => {
              setMethodInput(value);
            }}
          ></TextInput>
          {apiErr ? (
            <Text style={{ color: "red" }}>An error has occured</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Create!</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: { height: 200, width: 325, marginTop: 30 },
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  headers: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  ingrediantInput: {
    borderWidth: 1,
    flex: 1,
    marginLeft: 5,

    height: 30,
    padding: 5,
    borderRadius: 4,
  },
  addIng: {
    margin: 5,
    backgroundColor: "#d9fffd",
    padding: 7,
    borderRadius: 4,
  },
  method: { borderWidth: 1, width: "90%", height: 300, position: "fixed" },
  button: { backgroundColor: "#d9fffd", padding: 10, margin: 10 },
});
