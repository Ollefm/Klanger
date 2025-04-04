import { SafeAreaView, View, Text, StyleSheet, Button,Image } from "react-native";
import PlayPreviewContainer from "../app/custom components/playPreviewContainer";
import AppTextInput from "../app/custom components/appInput";


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
  console.log("Cover image URL:", props);
  return (
    <SafeAreaView style={styles.background} >

        <Image 
          source={{ uri: props.model.coverImageUrl }} 
          style = {styles.coverImage}
          resizeMode="cover" 
        />

        <AppTextInput placeholder="Write your answer here..." value={props.answer || ""} onChangeText={""} secureTextEntry={undefined}/>
 
        <Button title="Start Game" onPress={setTrackId} />
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
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30
  },
  container: {
    backgroundColor: "#333333",
    margin: 10,
    padding: 35,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    opacity: 0.8,
  },
  coverImage:{
    backgroundColor: "#fff",
    height: 270,
    width: 270, 
    borderRadius: 20,
  }
})
