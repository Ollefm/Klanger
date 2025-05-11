import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import AppPrimaryButton from "../../app/custom components/appPrimaryButton";
import AppTextInput from "../../app/custom components/appInput";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function LoginView(props) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleLogin() {
    props.handleLogin(email, password);
  }

  function handleSkipLogin(e) {
    setPassword("ollelove")
    setEmail("olle.love@test.com")

  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.infoText}>Your email</Text>
        <AppTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={undefined}
        />
        <Text style={styles.infoText}>Password</Text>
        <AppTextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {props.promiseState.error && (
          <Text style={styles.errorText}>{props.promiseState.error}</Text>
        )}
        {props.promiseState.isLoading ? (
          <ActivityIndicator></ActivityIndicator>
        ) : <View style={styles.buttonWrapper}>
            <AppPrimaryButton title="Login" onPress={handleLogin} />
            <AppPrimaryButton title="Autofill user" onPress={handleSkipLogin} />
          </View>}
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
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    marginTop: 20,
    gap: 20,
  },
  errorText: {
    color: "#ED4337",
  },
  infoText: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "white",
  },
});
