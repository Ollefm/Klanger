import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AppPrimaryButton from '../app/custom components/appPrimaryButton';
import { useRouter } from 'expo-router';


export default function GameOverView(props){

    const router = useRouter();

    function goOnHomeCB() {
    router.navigate("/");
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Game Over!</Text>
        
        <View style={styles.Container2}>
          <Text style={styles.scoreText}>Final Score: {props.score}</Text>
          <Text style={styles.statsText}>
            You got {props.score || 0} out of 5 songs correct!
          </Text>
        </View>
        
        <AppPrimaryButton 
          title="Back to Home" 
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
  Container2: {
    width: 365,
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#1A1A1A",
    borderWidth: 0.5,
    borderColor: "#5E5E5E",
    marginBottom: 40,
    alignItems: 'center',
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