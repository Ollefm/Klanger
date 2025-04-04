import { SafeAreaView, View, Text, StyleSheet, Button } from "react-native";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";
import { Audio } from "expo-av";
import { fetchData } from "../api/api";

export function QuizView(props) {
  function setTrackId() {
    props.setTrack();
  }

  function playSoundHandlerACB() {
    props.playSound();
  }

  function stopSoundHandlerACB(){
    props.stopSound();
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppPrimaryButton title="Start Game" onPress={setTrackId} />
      <AppPrimaryButton title="Play Sound" onPress={playSoundHandlerACB} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    padding: 10,
    alignItems: 'center',
    justifyContent:'center',
    gap: 40
  },
});
