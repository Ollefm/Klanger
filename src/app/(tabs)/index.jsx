import React, { useState, useRef } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { fetchData } from "../../api/api";
import AppPrimaryButton from "../custom components/appPrimaryButton";

export default function IndexPage() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null); // Store sound reference

  // Fetch and play sound from API
  const fetchAndPlaySound = async () => {
    try {
      const data = await fetchData("https://api.deezer.com/track/3135556");
      if (data.preview) {
        await loadSound(data.preview);
      } else {
        console.error("No preview URL available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Load and play audio
  const loadSound = async (previewUrl) => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync(); // Unload previous sound
    }

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: previewUrl },
        { shouldPlay: true } // Auto-play after loading
      );

      soundRef.current = sound;
      setSound(sound);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  // Pause the sound
  const pauseSound = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  // Resume playback
  const resumeSound = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppPrimaryButton title="Play Sound" onPress={fetchAndPlaySound} />
      {sound && (
        <View style={{ marginTop: 20 }}>
          {isPlaying ? (
            <Button title="Pause" onPress={pauseSound} />
          ) : (
            <Button title="Resume" onPress={resumeSound} />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#0D0D0D',
    color:'white'
  },
});
