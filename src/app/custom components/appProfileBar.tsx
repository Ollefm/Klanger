import { TextInput, StyleSheet, View, Button, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AppProfileBar(props) {
  return (
    <View style={styles.Container}>
      <View style={{ flexDirection: "row" }}>
        <Ionicons name={"person-circle-outline"} color={"white"} size={96} />
        <View style={{ flexDirection: "row" }}>
          <View style={styles.info}>
            <Text style={styles.bold}>{props.highestScore || "0"}</Text>
            <Text style={styles.text}>Highest score</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.bold}>{props.gamesPlayed || "0"}</Text>
            <Text style={styles.text}>games played</Text>
          </View>
        </View>
      </View>
      <Text style={styles.name}>{props.username}</Text>
      <Text style={styles.text}>{props.email||"email"}</Text>
      <Text style={styles.name}>Klanger-player since: {props.playedSince||"may 5 2025"}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 18,
    width: 340,
  },
  info: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 14,
    color: "lightgray",
    width: "100%",
  },

  bold: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
});
