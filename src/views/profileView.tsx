import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AppSecondaryButton from "../app/custom components/appSecondaryButton";
import AppProfileBar from "../app/custom components/appProfileBar";
export function ProfileView(props) {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
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
                <Text style={styles.text}>
                  {props.userData.username || "username"}
                </Text>
              </View>
            </View>
            <View style={styles.row2}>
              <View style={{ width: "50%" }}>
                <Text style={styles.text}>E-mail:</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.text}>
                  {props.userData.email || "email"}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ width: "50%" }}>
                <Text style={styles.text}>Klanger since:</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.text}>
                  {props.userData.createdAt
                    ? props.userData.createdAt.toDate().toLocaleDateString()
                    : "date"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: "50%" }}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Score history</Text>
          </View>
          <View style={styles.Container2}>
            {renderChart(props.scoreHistory)}
          </View>
        </View>

        <AppSecondaryButton
          title="Sign out"
          onPress={handleSignoutACB}
        ></AppSecondaryButton>
      </ScrollView>
    </SafeAreaView>
  );

  function renderChart(scoreHistory) {
    if (!scoreHistory || scoreHistory.length === 0) {
      return (
        <Text style={styles.text}>
          You have not earned any score yet, play some quizes to earn score!
        </Text>
      );
    }
    const data = {
      labels: [],
      datasets: [
        {
          data: scoreHistory,
          color: (opacity = 1) => `rgba(77, 141, 218, ${opacity})`, // optional
          strokeWidth: 3, // optional
        },
      ],
    };
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.0,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      propsForLabels: {
        fontSize: 12,
        fontWeight: "bold",
        color: "white",
      },
    };

    var number = 0;

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ marginRight: 50, marginBottom: -40 }}>
          <LineChart
            data={data}
            width={360}
            height={260}
            chartConfig={chartConfig}
            segments={5}
            formatYLabel={(value) => `${number++}`}
            fromZero={true}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.text2}>score</Text>
          <Text style={styles.text2}>newer results {"→"}</Text>
        </View>
      </View>
    );
  }

  function handleSignoutACB() {
    props.signOut();
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
    borderColor: "#5E5E5E",
    alignItems: "center",
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
  text2: {
    fontSize: 12,
    color: "lightgray",
  },
  text3: {
    fontSize: 12,
    color: "lightgray",
    width: "100%",
    textAlign: "left",
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
