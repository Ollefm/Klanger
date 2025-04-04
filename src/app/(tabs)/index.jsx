import React, { useState, useRef } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { fetchData } from "../../api/api";
import { useRouter } from 'expo-router';
import AppPrimaryButton from "../custom components/appPrimaryButton";

export default function IndexPage(props) {
  const router = useRouter();
  function goToQuizCB(){
    router.navigate('/quiz')
  }

  function goToRecommendationsCB(){
    router.navigate('recommend')
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Text View at the Top */}
      <View style={styles.textView}>
        <Text style={styles.text}>
          Play music quiz or get song recommendations
        </Text>
      </View>
  
      {/* Buttons Centered */}
      <View style={styles.buttonContainer}>
        <AppPrimaryButton title="Get Recommendations" onPress={goToRecommendationsCB} />
        <Text style={{color: 'gray', fontSize: 20, fontWeight: 600}}>or</Text>
        <AppPrimaryButton title="Play Music Quiz" onPress={goToQuizCB} />
      </View>
    </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0D0D0D",
      padding: 10,
    },
    textView: {
      justifyContent: 'center',
      alignItems: "center", 
      marginTop: 140, 
    },
    text: {
      color: "white",
      fontSize: 24,
      fontWeight: 700,
      textAlign: "center",
    },
    buttonContainer: {
      flexGrow: 1, 
      justifyContent: "center", 
      alignItems: "center", 
      gap: 20
    },
  });