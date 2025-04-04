import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import AppPrimaryButton from "../custom components/appPrimaryButton";
import AppTextInput from "../custom components/appInput";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/index");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.buttonContainer}>
    <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} />
    <AppTextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
    <AppPrimaryButton title="Login" onPress={handleLogin} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    gap: 20,
    justifyContent: "center", // Centers buttons vertically
    alignItems: "center", // Centers buttons horizontally
  },

});