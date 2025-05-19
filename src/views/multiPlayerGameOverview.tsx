import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";
import AppSecondaryButton from "../app/custom components/appSecondaryButton";
import { useRouter } from "expo-router";

export default function MultiplayerGameOverview({ game, challengeAgain, winner, removeGame }) {
  const router = useRouter();

  const results = Array.isArray(game?.roundResults)
  ? game.roundResults
  : Object.values(game?.roundResults || {});
  const players = game?.players || [];

  function getUsernameById(uid) {
    const user = players.find((p) => p.uid === uid);
    return user ? user.username : "Unknown";
  }

  function goOnHomeCB() {
    router.navigate("/");
  }

  function handleChallengeAgain() {
    challengeAgain();
  }

  function handleRemoveGame(){
    removeGame()
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Game Over!</Text>
        <View style={styles.Container2}>
          <Text style={styles.scoreText}>{winner ? winner.toUpperCase() : ""} won the game 🏆</Text>
          <Text style={styles.statsText}>Final results:</Text>
          {results ? results.map((res, index) => (
            <Text key={index} style={styles.playerText}>
              {getUsernameById(res.userId)}: {res.correctGuesses} / 5
            </Text>
          )) : <Text>""</Text>}
        </View>

        <View style={styles.buttonContainer}>
          <AppPrimaryButton title="Challenge again?" onPress={handleChallengeAgain} />
          <AppSecondaryButton title="Remove game" onPress={handleRemoveGame} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  buttonContainer:{
    gap: 40
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
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
    alignItems: "center",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
  statsText: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  playerText: {
    fontSize: 16,
    color: "#CCCCCC",
    marginVertical: 2,
  },
});
