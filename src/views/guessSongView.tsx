import { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import PlayPreviewContainer from "../app/custom components/playPreviewContainer";
import AppTextInput from "../app/custom components/appInput";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";
import { BlurView } from "expo-blur";
import Feather from '@expo/vector-icons/Feather';

export function GuessSong(props) {

  const [hasTrack, setHasTrack] = useState(false); // Add this state

  function setTrackId() {
    props.setTrack();
    setHasTrack(true); // Set to true when track is set
  }

  function playSoundHandlerACB() {

    props.playSound();
  }

  function setUserGuessType(e) {
    props.userGuess(e);
  }

  function handleUserGuessSubmit() {
    props.handleUserGuessSubmit();
  }




  return (
    <SafeAreaView style={styles.background} >

      <View style={styles.coverImageContainer}>
        <Image
          source={{ uri: props.coverImage }}
          style={styles.coverImage}
          resizeMode="cover"
        />

        <BlurView
          intensity={70}
          style={StyleSheet.absoluteFill}

        />
      </View>

      {props.showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultStatusText}>
            {props.isCorrect ? "Correct!" : "Not quite!"}
          </Text>
          {!props.isCorrect && (
            <Text style={styles.feedbackText}>
              The song was: "{props.songTitle}"
            </Text>
          )}
        </View>
      )}

      <View
        style={[
          styles.guessContainer,
          props.showResult && (
            props.isCorrect
              ? styles.correctBorder
              : styles.incorrectBorder
          )
        ]}
      >
        <AppTextInput placeholder="Write your assumption here" value={props.userGuess || ""} onChangeText={setUserGuessType} secureTextEntry={undefined} />
        <TouchableOpacity onPress={handleUserGuessSubmit}>
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <PlayPreviewContainer onPress={playSoundHandlerACB} progress={props.progress} disabled={!hasTrack} />
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

  },
  resultStatusText: {
    color: 'white'
  },
  feedbackText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  guessContainer: {
    flexDirection: 'row',  // Arrange items horizontally
    alignItems: 'center',
    gap: 10,
    borderRadius: 20,
    borderWidth: 2,         // Add border width
    borderColor: 'transparent', // Default transparent border
    padding: 5,   
  },
  correctBorder: {
    borderColor: '#4CAF50',  // Green border for correct answers
  },
  
  incorrectBorder: {
    borderColor: '#F44336',  // Red border for incorrect answers
  },
  resultContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
})
