import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function GamesView(props) {
  const router = useRouter();

  function handleGoToGame(game) {
    props.setClickedGame(game)
    props.setIsMultiplayer()
    props.initGame()
    router.navigate("/(home)/guessSong");
  }
const userNameIndex = props.games.players.findIndex(userid => userid.uid !== props.user.uid);


  return (
    <TouchableOpacity onPress={() => handleGoToGame(props.games)} disabled={props.games.currentTurn !== props.user.uid}>
      <View style={styles.gameItem}>
        <View style={styles.iconRow}>
          <View style={styles.textContainer}>
            <Text style={styles.challengeText}>
              Game against: {props.games.players[userNameIndex].username || "unkown user"}
            </Text>
            {props.games.currentTurn === props.user.uid ? (
              <Text style={styles.turnText}>Your turn!</Text>
            ) : (
              <Text style={styles.turnText}>Waiting for other player...</Text>
            )}
          </View>
          <Ionicons name="chevron-forward-outline" size={28} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 16,
  },
  textContainer: {
    flexDirection: "column",
  },

  turnText: {
    color: "gray",
    fontSize: 16,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  gameItem: {
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#1A1A1A",
    borderWidth: 0.5,
    borderColor: "#5E5E5E",
  },
  challengeText: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 700,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
  },
});
