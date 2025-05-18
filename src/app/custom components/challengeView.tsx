import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ChallengeView(props) {
  function handleAcceptACB(challenge){
    props.acceptChallenge(challenge)
  }
  function handleDeclineACB(challenge){
    props.declineChallenge(challenge)
  }

  const renderItem = ({ item }) => (
    <View style={styles.challengeItem}>
      <Text style={styles.challengeText}>{item.fromUsername}</Text>
        <TouchableOpacity style={styles.ButtonAccept} onPress={() => handleAcceptACB(item)}>
          <Text style={styles.challengeText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ButtonDecline} onPress={() => handleDeclineACB(item)}>
          <Text style={styles.challengeText}>Decline</Text>
        </TouchableOpacity>
      
    </View>
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
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#1A1A1A",
    borderWidth: 0.5,
    borderColor: "#5E5E5E",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  challengeText: {
    color: "white",
    fontSize: 16,
    fontWeight: 700,
  },
  ButtonAccept: {
    backgroundColor: "#4896DB",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  ButtonDecline: {
    borderWidth: 0.5,
    borderColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
});
