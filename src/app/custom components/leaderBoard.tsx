import { FlatList, View, Text, StyleSheet } from "react-native";
export default function LeaderBoard(props) {
    var rank = 1
  return (
    <View>
      <View style={styles.headerContainer}>
      <Text style={styles.header}>{props.title}</Text>
      </View>
      <View style={styles.Container2}>
      <View style={styles.row}>
        <View style={{width:"25%"}}>
          <Text style={styles.text}>rank</Text>
        </View>
        <View style={{width:"45%"}}>
          <Text style={styles.text}>username</Text>
        </View>
        <View style={{width:"35%"}}>
          <Text style={styles.text}>score</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <FlatList
            data={props.data/* .sort(descendingCB) */}
            renderItem={renderIngredientRowCB}
          />
      </View>
    </View>
  );
  /* 
  function descendingCB(a, b) {
    if (a.highScore > b.highScore) {
      return -1;
    }
    if (a.highScore < b.highScore) {
      return 1;
    }
    return 0;
  }
 */
  function renderIngredientRowCB(element) {
    const user = element.item
    return (
      <View style={(rank%2) ? styles.row : styles.row2}>
        <View style={{width:"25%"}}>
          <Text style={styles.bold}>{rank++}</Text>
        </View>
        <View style={{width:"45%"}}>
          <Text style={styles.name}>{user.username}</Text>
        </View>
        <View>
          <Text style={styles.text}>{user.totalScore}</Text>
        </View>
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
  Container2: {
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    width: 365,
    backgroundColor: "#1A1A1A",
    borderWidth: 0.5,
    borderColor: "#5E5E5E",
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
