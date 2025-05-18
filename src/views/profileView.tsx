import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import AppSecondaryButton from "../app/custom components/appSecondaryButton";
import AppProfileBar from "../app/custom components/appProfileBar";
export function ProfileView(props) {
  console.log("profileivew",props.userData);
  function handleSignoutACB() {
    props.signOut();
  }
>>>>>>> e28dbb9bc8ff36f9b918b0a593d279588f7542ab
  return (
    <SafeAreaView style={styles.background}>
      <View>
        <AppProfileBar
          username={props.userData.username}
          totalScore={props.score}
          gamesPlayed={props.gamesPlayed}
        ></AppProfileBar>
        <View style={styles.Container2}>
          <View style={styles.row}>
            <View style={{ width: "50%" }}>
              <Text style={styles.text}>Username:</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.text}>{props.userData.username || "username"}</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <View style={{ width: "50%" }}>
              <Text style={styles.text}>E-mail:</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.text}>{props.userData.email || "email"}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ width: "50%" }}>
              <Text style={styles.text}>Klanger since:</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.text}>{"date"}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{height:"20%"}}>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Latest games</Text>
      </View>
      <View style={styles.Container2}></View>
      </View>
      <AppSecondaryButton
        title="Score+100"
        onPress={handleScoreACB}
        ></AppSecondaryButton>
      <AppSecondaryButton
        title="log"
        onPress={logACB}
        ></AppSecondaryButton>
 
      <AppSecondaryButton
        title="Sign out"
        onPress={handleSignoutACB}
        ></AppSecondaryButton>
    </SafeAreaView>
  );
  function handleSignoutACB() {
    props.signOut();
  }
  function handleScoreACB() {
    props.addToTotalScore();
  }
  function logACB() {
    console.log(props.userData);
  }


}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  row2: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#2C2C2C",
    borderRadius: 8,
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
  Container2: {
    width: 365,
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#1A1A1A",
    borderWidth: 0.5,
    borderColor: "#5E5E5E"
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
  line: {
    paddingVertical: 1,
    width: "100%",
    backgroundColor: "lightgray",
  },
  text: {
    fontSize: 18,
    color: "white",
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
