import { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Modal, Image, TouchableOpacity } from "react-native";
import PlayPreviewContainer from "../app/custom components/playPreviewContainer";
import AppTextInput from "../app/custom components/appInput";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";
import { BlurView } from "expo-blur";

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

 function handleCloseModal() {
    props.setShowResult && props.setShowResult(false);
    setTrackId();
  }

  

  return (
    <SafeAreaView style={styles.background} >

      <View style={styles.coverImageContainer}>
        <Image
          source={{ uri: props.coverImage }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      {!props.showResult && (
        <BlurView
          intensity={70}
          style={StyleSheet.absoluteFill}

        />)}
      </View>

     <Modal
        animationType="fade"
        transparent={true}
        visible={props.showResult || false}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[
              styles.resultStatusText,
              props.isCorrect ? styles.correctText : styles.incorrectText
            ]}>
              {props.isCorrect ? "Correct!" : "Not quite!"}
            </Text>
            
            {!props.isCorrect && (
              <Text style={styles.feedbackText}>
                The song was: "{props.songTitle}"
              </Text>
            )}
            
            <AppPrimaryButton 
              title="Next Song" 
              onPress={handleCloseModal} 
            />
          </View>
        </View>
      </Modal>

            


        <PlayPreviewContainer 
        onPress={playSoundHandlerACB}
         progress={props.progress}
         playPause={props.playPause}
        />
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
        <AppTextInput placeholder="Write your assumption here"
          value={props.userGuess || ""}
          onChangeText={setUserGuessType}
          secureTextEntry={undefined} />

        
      </View>

      <AppPrimaryButton title="Check Answer" onPress={handleUserGuessSubmit} />

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
    margin: 10,
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
   modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
   modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
    width: '85%',
    maxWidth: 340,
  },
    correctText: {
    color: '#4CAF50',
  },
  incorrectText: {
    color: '#F44336',
  },
})
