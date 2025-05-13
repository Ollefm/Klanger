import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChallengeView(props){

  const renderItem = ({ item }) => (
        <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.challengeItem}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
    <Text style={styles.challengeText}>Challenge from: {item.fromUsername}</Text>
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.ButtonAccept}>
          <Text style={styles.challengeText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ButtonDecline}>
          <Text style={styles.challengeText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Challenges</Text>
        <FlatList
          data={props.challenges}
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
    paddingHorizontal: 16,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  challengeItem: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
  },
  challengeText: {
    color: "white",
    fontSize: 16,
    fontWeight: 700,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 24,
  },
  ButtonAccept:{
    backgroundColor: "lightgreen",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8
  },
  ButtonDecline:{
   backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8
  }
});
