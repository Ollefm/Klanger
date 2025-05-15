import { FlatList, SafeAreaView, View, Text, StyleSheet } from "react-native";
import LeaderBoard from "../app/custom components/leaderBoard";
export function LeaderboardView(props) {

  return (
    <SafeAreaView style={styles.background}>
      <FlatList
        data={props.leaderBoards.sort(descendingCB)}

        renderItem={renderIngredientRowCB} 
        ></FlatList>
    </SafeAreaView>
  );

  function descendingCB(a, b) {
    if (a.genre < b.genre) {
      return -1;
    }
    if (a.genre > b.genre) {
      return 1;
    }
    return 0;
  }

  function renderIngredientRowCB(element) {
    const leaderBoard = element.item
    return (
      <View>
        <LeaderBoard data={leaderBoard.data} title={leaderBoard.genre} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#2C2C2C",
    borderRadius:8
  },
  background: {
    backgroundColor: "black",
    flex: 1,
    alignItems:"center"
  },
  header: {
    color: "white",
    fontSize: 24,
    fontWeight: 700,
  },
  headerContainer: {
    paddingVertical: 5,
    width: 340,
    paddingHorizontal: 20
  },
  Container: {
    paddingVertical: 10,
    borderRadius: 16,
    width: 340,
    paddingHorizontal: 20,
    backgroundColor: "#1C1C1C",
  },
  line: {
    paddingVertical: 1,
    width: "100%",
    backgroundColor: "lightgray",
  },
  info: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 18,
    color: "lightgray",
    width: "100%",
  },

  bold: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  name: {
    fontSize: 18,
    color: "white",
  },
});
