import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import AppPrimaryButton from "../../app/custom components/appPrimaryButton";
import AppTextInput from "../../app/custom components/appInput";
import { useState } from "react";

export default function RegisterView(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  function handleRegister() {
    props.handleRegister(email, username, password);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <AppTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
        />
        <AppTextInput
          placeholder="Username"
          secureTextEntry={false}
          value={username}
          onChangeText={setUsername}
        />
        <AppTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {props.promiseState.error && (
          <Text style={styles.errorText}>{props.promiseState.error}</Text>
        )}
        <AppPrimaryButton title="Register" onPress={handleRegister} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ED4337",
  },
});
