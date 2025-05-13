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

export default function GamesView(props) {
  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.challengeItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconRow}>
          <Text style={styles.challengeText}>Game against: {item}</Text>
          <Ionicons name="chevron-forward-outline" size={28} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Games</Text>
      <FlatList
        data={props.games}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
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
  challengeItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
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
