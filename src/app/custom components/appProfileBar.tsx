import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AppProfileBar(props) {
  return (
        <View style={styles.headerContainer}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name={"person-circle-outline"}
              color={"white"}
              size={96}
            />
            <View>
              <Text style={styles.name}>{props.username}</Text>
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
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#0D0D0D",
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    paddingVertical: 5,
    borderRadius: 5,
    width: 340,
    paddingHorizontal: 15,
  },
  Container: {
    paddingVertical: 15,
    borderRadius: 16,
    width: 340,
    paddingHorizontal: 20,
    backgroundColor: "#1C1C1C",
  },
  info: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
  header: {
    color: "white",
    fontSize: 24,
    fontWeight: 700,
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
    fontSize: 18,
    color: "white",
    paddingTop: 10,
    paddingHorizontal: 1,
  },
});