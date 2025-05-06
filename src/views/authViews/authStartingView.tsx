import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppPrimaryButton from "../..//app/custom components/appPrimaryButton";
import AppSecondaryButton from "../../app/custom components/appSecondaryButton";

export default function AuthIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.logo}>Klanger</Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Play music guesser or get song recommendations
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppPrimaryButton
          title="Log In"
          onPress={() => router.push("/(auth)/login")}
        />
        <AppSecondaryButton
          title="Register"
          onPress={() => router.push("/(auth)/register")}
        />
        <Text style={styles.deezerText}>Powered by Deezer API</Text>
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
  logo: {
    color: "#FFD900",
    fontSize: 32,
    fontWeight: 700,
    textAlign: "center",
  },
  textView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Center text horizontally
    gap: 50,
  },
  deezerText: {
    color: "#B4B4B4",
  },
  buttonContainer: {
    flexGrow: 1, // Pushes this section down to center buttons
    justifyContent: "center", // Centers buttons vertically
    alignItems: "center", // Centers buttons horizontally
    gap: 20,
  },
});
