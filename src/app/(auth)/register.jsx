import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import AppPrimaryButton from "../custom components/appPrimaryButton";
import AppTextInput from "../custom components/appInput";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/index");
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.buttonContainer}>  
    <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AppTextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    gap: 20,
    justifyContent: "center",
    alignItems: "center", 
  },

});
