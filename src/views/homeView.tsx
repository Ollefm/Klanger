import { SafeAreaView, View, Text, StyleSheet, ScrollView , Button, Image} from "react-native";
import { useRouter } from "expo-router";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";
import ChallengeView from "../app/custom components/challengeView";
import GamesView from "../app/custom components/gamesView";
export default function IndexPage(props) {
  const router = useRouter();
  
  function gotToNewGame() {
    router.navigate("/(home)/newGame");
  }

  function handleUpdateFeedACB(){
    props.update()
  }

  console.log(props.challenges)

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Update feed" onPress={handleUpdateFeedACB}></Button>
      <View style={{alignItems: "center"}}>
        <Image source={require("../assets/KlangerLogo2.png")} style={{height: 100, width: 200}} resizeMode="contain"/>
      </View>
      <ChallengeView challenges = {props.challenges}></ChallengeView>
      <GamesView games = {["Korv", "korvmannen"]}></GamesView>
        <View style={styles.buttonContainer}>
          <AppPrimaryButton
            title="New game"
            onPress={gotToNewGame}
          />
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
    justifyContent: "center",
    alignItems: "center",
  },
});
