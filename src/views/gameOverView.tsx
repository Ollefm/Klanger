import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AppPrimaryButton from '../app/custom components/appPrimaryButton';
import { observer } from "mobx-react-lite";
import { useRouter } from 'expo-router';


export default function GameOverView(props){

    const router = useRouter();

    function goOnHomeCB() {
    router.navigate("/(home)/index");
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Game Over!</Text>
        
        <View style={styles.statsContainer}>
          <Text style={styles.scoreText}>Final Score: {props.score}</Text>
          <Text style={styles.statsText}>
            You got {props.correctGuesses} out of {props.totalRounds} songs correct!
          </Text>
        </View>
        
        <AppPrimaryButton 
          title="go Home" 
          onPress={goOnHomeCB} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  statsContainer: {
    backgroundColor: '#181818',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  statsText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});