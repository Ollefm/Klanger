import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";

export default function IndexPage(props) {
  const router = useRouter();
  
  function goToSinglePlayerCB() {
    router.navigate("/searchUsers");
  }

  function goToMultiplayerCB() {
    router.navigate("/searchUsers");
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
        <Text style={styles.text}>New game</Text>
          <AppPrimaryButton
            title="Single player"
            onPress={goToSinglePlayerCB}
          />
          <Text style={{ color: "gray", fontSize: 20, fontWeight: 500 }}>
            or
          </Text>
          <AppPrimaryButton title="Multiplayer" onPress={goToMultiplayerCB} />
        </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
