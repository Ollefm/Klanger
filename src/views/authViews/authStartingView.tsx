import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AppPrimaryButton from "../../app/custom components/appPrimaryButton";
import AppSecondaryButton from "../../app/custom components/appSecondaryButton";

export default function AuthIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textView}>
        <Image
          source={require("../../assets/KlangerLogo2.png")}
          style={{height: 100, width: 300}}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          How well do you really know your music?
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <AppPrimaryButton
          title="Register"
          onPress={() => router.push("/(auth)/register")}
        />
        <AppSecondaryButton
          title="Log In"
          onPress={() => router.push("/(auth)/login")}
        />
        <Text style={styles.deezerText}>Powered by Deezer API</Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    justifyContent: "space-between", 
  },
  textView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    color: "#4896DB",
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    gap: 15,
    marginBottom: 30, 
  },
  deezerText: {
    color: "#B4B4B4",
    fontSize: 12,
    marginTop: 10,
  },
});
