import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";
import AppSecondaryButton from "../app/custom components/appSecondaryButton";
export default function IndexPage(props) {
  const router = useRouter();
  
  function goToSinglePlayerCB() {
    router.navigate("/(home)/instructions");
  }

  function goToMultiplayerCB() {
    router.navigate("/(home)/searchUsers");
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
        <Text style={styles.text}>New game</Text>
          <AppPrimaryButton
            title="Multiplayer"
            onPress={goToMultiplayerCB}
          />
          <Text style={{ color: "gray", fontSize: 20, fontWeight: 400 }}>
            or
          </Text>
          <AppSecondaryButton  title="Single player"
            onPress={goToSinglePlayerCB}/>
        </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
