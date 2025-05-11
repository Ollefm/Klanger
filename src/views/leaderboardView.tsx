import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import AppProfileBar from "../app/custom components/appProfileBar";
export function LeaderboardView(props) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.Container}>
      <Text style={styles.header}>Classical</Text>
      <Text style={styles.text}>Place on leader board: 1</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#0D0D0D",
    flex: 1,
    alignItems:"center"
  },
  header: {
    color: "white",
    fontSize: 24,
    fontWeight: 700,
    textAlign: "left",
    flexDirection: "row",
    margin: 20,
  },
  Container: {
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 18,
    width: "95%",
    backgroundColor:"#1C1C1C"
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
