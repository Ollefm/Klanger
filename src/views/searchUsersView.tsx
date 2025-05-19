import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppTextInput from "../app/custom components/appInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

export default function SearchUsersView(props) {
  console.log("searchView props", props.pendingChallenges);
  function handleChallengeUser(user) {
    props.challengeUser(user);
  }

  function handleSearch() {
    props.doUserSeach();
  }

  function setSearchText(query: string) {
    console.log(query);
    props.setSearchText(query);
  }

  function handleRefreshChallenges() {
    props.refreshChallenges();
  }


  return (
    <SafeAreaView style={styles.background}>
      <Text
        style={{
          color: "white",
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        Find your opponent
      </Text>
      {props.promiseChallengeState.error && (
        <Text>props.promiseState.error</Text>
      )}
      <View style={styles.searchContainer}>
        <AppTextInput
          value={props.searchQuery}
          onChangeText={setSearchText}
          placeholder={"Search for users..."}
          secureTextEntry={false}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {props.promiseState.isLoading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={{ uri: "https://brfenergi.se/iprog/loading.gif" }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 20 }}
          data={props.users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            //console.log("Current item UID:", item.uid);
            //console.log("Challenged Users array:", props.challengedUsers);

            const isMyself = item.uid === props.userData.uid;
            const alreadyChallenged = props.challengedUsers?.includes(item.uid);
            const challenge = props.pendingChallenges?.find(
              challenge => challenge.opponentId === item.uid
            );
            const isIncoming = challenge?.direction === "incoming";
            const isOutgoing = challenge?.direction === "outgoing";
            console.log("alreadychallenged result", challenge)
            return (
              <View style={styles.userItem}>
                <View style={styles.userInfo}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#ffffff"
                    style={styles.userIcon}
                  />
                  <Text style={styles.userName}>{item.username}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    (alreadyChallenged || isMyself || isIncoming || isOutgoing) && { backgroundColor: "transparent", borderWidth: 1, borderColor: "white" },
                  ]}
                  onPress={() => handleChallengeUser(item)}
                  disabled={alreadyChallenged || isMyself || isIncoming || isOutgoing}
                >
                  <Ionicons
                    name="musical-notes-outline"
                    size={18}
                    color="#ffffff"
                  />
                  <Text style={styles.addButtonText}>
                    {isMyself ? "It's a me Mario" :
                    alreadyChallenged ? "already in match" :
                      isIncoming ? "Respond to Challenge" :
                        isOutgoing ? "Challenge Sent" :
                          "Challenge"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "black",
    flex: 1,
  },
  list: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    margin: 15,
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    marginRight: 10,
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 12,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E90FF",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
});
