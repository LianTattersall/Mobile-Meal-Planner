import { useContext, useState } from "react";
import {
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Keyboard,
  Modal,
} from "react-native";
import { UserContext } from "../Contexts/UserContext";
import auth from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { postUser, postUserToCalendar } from "../utils/api";

const defaultProfilePic =
  "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";

export default function SignUpForm() {
  const { setUser } = useContext(UserContext);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordCopyInput, setPasswordCopyInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(setInput) {
    return function (val) {
      setInput(val);
    };
  }

  function createAccount() {
    setLoading(true);
    if (passwordInput !== passwordCopyInput) {
      setLoading(false);
      return setError("Passwords do not match");
    }
    return (
      createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((cred) => {
          const updateUser = updateProfile(auth.currentUser, {
            displayName: nameInput,
            photoURL: defaultProfilePic,
          });
          return Promise.all([cred.user.uid, updateUser]);
        })
        .then((data) => {
          return Promise.all([
            data[0],
            postUser(data[0], nameInput, defaultProfilePic),
          ]);
        })
        .then((data) => {
          return postUserToCalendar(data[0]);
        })
        .then((data) => {
          setUser({
            user_id: data.user_id,
            display_name: nameInput,
            avatar_url: defaultProfilePic,
          });
        })
        // then post user to calendar
        .catch((err) => {
          setLoading(false);
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
        })
    );
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
