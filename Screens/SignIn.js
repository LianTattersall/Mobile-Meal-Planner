import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Button,
} from "react-native";
import SignUpForm from "../Components/SignUpForm";

export default function SignIn({ navigation }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <SignUpForm />
        <View style={styles.loginContainer}>
          <Text>Already have an account?</Text>
          <Button
            title="Login"
            onPress={() => {
              navigation.navigate("Login");
            }}
          ></Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
