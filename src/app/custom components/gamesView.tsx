import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function GamesView(props) {
  const router = useRouter();

  function handleGoToGame() {
    router.navigate("/(home)/guessSong");
  }
  return (
    <TouchableOpacity onPress={handleGoToGame}>
      <View style={styles.gameItem}>
        <View style={styles.iconRow}>
          <Text style={styles.challengeText}>
            Game against: {props.games.players[0].username}
          </Text>
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
    width: 365,
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
  },
});
