import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";

export default function InstructionPage(props) {
  const router = useRouter();
  
  function goToSinglePlayerCB() {
    props.initGame()
    router.navigate("/(home)/guessSong");

  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>How to Play Klanger</Text>
        
        <View style={styles.Container2}>
          <Text style={styles.sectionTitle}>Game Rules</Text>
          
          <View style={styles.ruleItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.ruleText}>Listen to song previews and guess the correct song title</Text>
          </View>
          
          <View style={styles.ruleItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.ruleText}>Each game consists of 5 rounds</Text>
          </View>
          
          <View style={styles.ruleItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.ruleText}>Type your guess in the text field and press send</Text>
          </View>
          
          <View style={styles.ruleItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.ruleText}>Get points for each correct guess</Text>
          </View>
          
          <View style={styles.ruleItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.ruleText}>Climb the leaderboard!</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Text style={styles.readyText}>Ready to play?</Text>
          <AppPrimaryButton
            title="Start Single Player"
            onPress={goToSinglePlayerCB}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
  rulesCard: {
    backgroundColor: "#1E90FF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
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
  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  ruleItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  bulletPoint: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
  },
  ruleText: {
    color: "white",
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  readyText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  }
});