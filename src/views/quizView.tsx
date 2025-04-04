import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";
import AppTextInput from "../app/custom components/appInput";
import PlayPreviewContainer from "../app/custom components/playPreviewContainer";

export function QuizView(props) {
  function setTrackId() {
    props.setTrack();
  }

  function playSoundHandlerACB() {
    props.playSound();
  }

  function stopSoundHandlerACB() {
    props.stopSound();
  }
  
  return (
    <SafeAreaView style={styles.background}>
      <Image
        source={{ uri: props.model.coverImageUrl }}
        style={styles.coverImage}
        resizeMode="cover"
      />
      <AppPrimaryButton title="Start Game" onPress={setTrackId} />
      <AppTextInput
        placeholder="Write your answer here..."
        value={props.answer || ""}
        onChangeText={""}
        secureTextEntry={undefined}
      />

      <View style={styles.container}>
        <PlayPreviewContainer onPress={playSoundHandlerACB} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    gap: 20,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#333333",
    padding: 30,
    borderRadius: 16,
    opacity: 0.75,
    marginVertical: 'auto'
  },
  coverImage: {
    backgroundColor: "#333333",
    height: '35%',
    width: '60%',
    borderRadius: 20,
  },
});
