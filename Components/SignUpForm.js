import { useContext, useState } from "react";
import {
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Keyboard,
} from "react-native";
import { LoggedIn } from "../Contexts/UserContext";
import auth from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpForm() {
  const { setLoggedIn } = useContext(LoggedIn);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordCopyInput, setPasswordCopyInput] = useState("");
  const [error, setError] = useState("");

  function handleChange(setInput) {
    return function (val) {
      setInput(val);
    };
  }

  function createAccount() {
    if (passwordInput !== passwordCopyInput) {
      Keyboard.dismiss();
      return setError("Passwords do not match");
    }
    return createUserWithEmailAndPassword(auth, emailInput, passwordInput)
      .then((cred) => {
        console.log(cred.user);
        //update display name post to backend
      })
      .catch((err) => {
        console.log(err);
        Keyboard.dismiss();
        if (err.code === "auth/weak-password") {
          setError("Password must be 6 characters or longer");
        }
        if (err.code === "auth/missing-email") {
          setError("Missing Email");
        }
        if (err.code == "auth/invalid-email") {
          setError("Invalid Email");
        }
        if (err.code == "auth/email-already-in-use") {
          setError("An account already exists for this email address");
        }
      });
  }

  return (
    <>
      <Text style={styles.Header}>Sign Up to Mobile Meals</Text>
      <Text style={styles.error}>{error}</Text>
      <TextInput
        placeholder="Name"
        style={styles.textInputs}
        onChangeText={handleChange(setNameInput)}
        spellCheck={false}
      />
      <TextInput
        placeholder="Email"
        style={styles.textInputs}
        onChangeText={handleChange(setEmailInput)}
        spellCheck={false}
      />
      <TextInput
        placeholder="Password"
        style={styles.textInputs}
        secureTextEntry={true}
        onChangeText={handleChange(setPasswordInput)}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.textInputs}
        secureTextEntry={true}
        onChangeText={handleChange(setPasswordCopyInput)}
      />
      <Button onPress={createAccount} title="Sign Up"></Button>
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
});
