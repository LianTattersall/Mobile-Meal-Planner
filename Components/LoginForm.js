import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import auth from "../firebaseConfig";
import { UserContext } from "../Contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../utils/api";

export default function () {
  const { setUser } = useContext(UserContext);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(setInput) {
    return function (val) {
      setInput(val);
    };
  }

  function handleLogin() {
    setLoading(true);
    return signInWithEmailAndPassword(auth, emailInput, passwordInput)
      .then((cred) => {
        return Promise.all([getUserById(cred.user.uid), cred.user.uid]);
      })
      .then((data) => {
        const userDetails = data[0].user;
        userDetails.user_id = data[1];
        setUser(userDetails);
        return AsyncStorage.setItem("user", JSON.stringify(userDetails));
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === "auth/invalid-credential") {
          setError("Incorrect Username or Password");
        }
      });
  }
  return (
    <>
      <Text style={styles.Header}>Login To Mobile Meals</Text>
      <Text style={styles.error}>{error}</Text>
      <TextInput
        placeholder="Email"
        style={styles.textInputs}
        onChangeText={handleChange(setEmailInput)}
        spellCheck={false}
      ></TextInput>
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInputs}
        onChangeText={handleChange(setPasswordInput)}
        spellCheck={false}
      ></TextInput>
      <Button title="Login" onPress={handleLogin}></Button>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Loading</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  textInputs: {
    width: Dimensions.get("window").width * 0.9,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#bbb",
  },
  Header: {
    fontSize: 20,
    marginBottom: 30,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
