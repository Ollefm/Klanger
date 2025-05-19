import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChallengeView(props) {
  function handleAcceptACB(challenge) {
    props.acceptChallenge(challenge);
  }
  function handleDeclineACB(challenge) {
    props.declineChallenge(challenge);
  }

  const renderItem = ({ item }) => {
    const isAccepted = item.id === props.succesChallenge;

    return isAccepted ? (
      <View style={styles.successContainer}>
        <Text style={styles.challengeText}>Challenge Accepted!</Text>
      </View>
    ) : (
      <View style={styles.challengeItem}>
        <View style={styles.buttonContainer}>
          <Ionicons name="person-outline" size={20} color="#ffffff" />
          <Text style={styles.challengeText}>{item.fromUsername}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.ButtonAccept}
            onPress={() => handleAcceptACB(item)}
          >
            <Text style={styles.challengeText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ButtonDecline}
            onPress={() => handleDeclineACB(item)}
          >
            <Text style={styles.challengeText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending challenges</Text>
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
    paddingHorizontal: 10,
    alignContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  title: {
    color: "gray",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  challengeItem: {
    marginVertical: 20,
    marginLeft: 10,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  successContainer: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#28a745",
    borderWidth: 0.5,
    width: 365,
    borderColor: "#5E5E5E",
    alignItems: "center",
    justifyContent: "center",
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
