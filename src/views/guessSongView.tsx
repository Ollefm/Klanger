import { SafeAreaView, View, Text, StyleSheet, Button,Image } from "react-native";
import PlayPreviewContainer from "../app/custom components/playPreviewContainer";
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
  console.log("Cover image URL:", props);
  return (
    <SafeAreaView style={styles.background} >
      <View>
      
        <Image 
          source={{ uri: props.model.coverImageUrl }} 
          style = {styles.coverImage}
          resizeMode="cover" 
        />
      
      </View>

        <Button title="Start Game" onPress={setTrackId} />
        <View style={styles.container}>
          <PlayPreviewContainer onPress={playSoundHandlerACB} />
        </View>
        <Button title="Stop" onPress={stopSoundHandlerACB} />
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: "#0D0D0D",
    width: '100%',
    height: '100%'

  },
  container: {
    
    backgroundColor: "#ccc",
    margin: 10,
    padding: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40
  },
  coverImage:{
    backgroundColor: "#fff",
    height: 270,
    width: 270, 
    marginTop: 40,
    marginLeft: 90,
    marginBottom: 150,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
