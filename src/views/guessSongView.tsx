import { SafeAreaView, View, Text, StyleSheet, Button,Image } from "react-native";
import PlayPreviewContainer from "../app/custom components/playPreviewContainer";
import AppTextInput from "../app/custom components/appInput";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";


export function GuessSong(props) {
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
    <SafeAreaView style={styles.background} >

        <Image 
          source={{ uri: props.model.coverImageUrl }} 
          style = {styles.coverImage}
          resizeMode="cover" 
        />

        <AppTextInput placeholder="Write your answer here..." value={props.answer || ""} onChangeText={""} secureTextEntry={undefined}/>
 
        <AppPrimaryButton title="Start Game" onPress={setTrackId} />
        <View style={styles.container}>
          <PlayPreviewContainer onPress={playSoundHandlerACB} />
        </View>
        
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background:{
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
  coverImage:{
    backgroundColor: "#333333",
    height: 270,
    width: 270, 
    borderRadius: 20,
    marginVertical: 40
  }
})
