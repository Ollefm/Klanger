import { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Button, Image } from "react-native";
import PlayPreviewContainer from "../app/custom components/playPreviewContainer";
import AppTextInput from "../app/custom components/appInput";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";
import { BlurView } from "expo-blur";

export function GuessSong(props) {
  const [answer, setAnswer] = useState(""); 
   const [hasTrack, setHasTrack] = useState(false); // Add this state
  function setTrackId() {
    props.setTrack();
    setHasTrack(true); // Set to true when track is set
  }

  function playSoundHandlerACB() {

    props.playSound();
  }

  function stopSoundHandlerACB() {
    props.stopSound();
  }

  function handleAnswerChange(text) {
    setAnswer(text);
    if (props.onAnswerChange) {
      props.onAnswerChange(text);
    }
  }

console.log("in View",setTrackId)
  return (
    <SafeAreaView style={styles.background} >

      <View style={styles.coverImageContainer}>
        <Image
          source={{ uri: props.model.coverImageUrl }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        
        <BlurView
          intensity={70}
          style={StyleSheet.absoluteFill}

        />
      </View>

      <AppTextInput placeholder="Write your answer here..." value={answer} onChangeText={handleAnswerChange} secureTextEntry={undefined} />

      
      <View style={styles.container}>
        <PlayPreviewContainer onPress={playSoundHandlerACB} progress={props.progress} disabled={!hasTrack}/>
      </View>
      <AppPrimaryButton title="Next song" onPress={setTrackId} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    gap: 20,
    alignItems: 'center',

  },
  container: {
    backgroundColor: "#333333",
    padding: 30,
    borderRadius: 16,
    opacity: 0.75,
  },
  coverImageContainer: {
    marginVertical: 40,
    borderRadius: 20,
    overflow: 'hidden',
    height: 270,
    width: 270,
  },
  coverImage: {
    backgroundColor: "#333333",
    height: 270,
    width: 270,
    borderRadius: 20,
    marginVertical: 40,

  }
})
