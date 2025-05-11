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
        <Text style={styles.infoText}>Email *</Text>
        <AppTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
        />
        <Text style={styles.infoText}>Username *</Text>
        <AppTextInput
          placeholder="Username"
          secureTextEntry={false}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.infoText}>Password *</Text>
        <AppTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.buttonWrapper}>
          <AppPrimaryButton title="Register" onPress={handleRegister} />
        </View>
        {props.promiseState.error && (
          <Text style={styles.errorText}>{props.promiseState.error}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    marginTop: 15,
    fontSize: 12,
    fontWeight: 700,
    color: "#ED4337",
  },
  buttonWrapper:{
    marginTop: 15,
  },
  infoText: {
    padding: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "white",
  },
});
