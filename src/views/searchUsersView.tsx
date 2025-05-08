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
import { Image } from "expo-image"

export default function SearchUsersView(props) {
  function handleChallengeUser(user) {
    props.challengeUser(user)
    console.log(`Add friend: ${user}`);
  }

  function handleSearch() {
    props.doUserSeach();
  }

  function setSearchText(query: string) {
    console.log(query);
    props.setSearchText(query);
  }

  return (
    <SafeAreaView style={styles.background}>
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
        {props.promiseState.isLoading ? (
          <View>
            <Image
              source={{ uri: "https://brfenergi.se/iprog/loading.gif" }}
              style={{ width: 50, height: 50 }}
            />
          </View>
        ) : (
          <FlatList
            data={props.users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
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
                  style={styles.addButton}
                  onPress={() => handleChallengeUser(item)}
                >
                  <Ionicons
                    name="musical-notes-outline"
                    size={18}
                    color="#ffffff"
                  />
                  <Text style={styles.addButtonText}>Challenge</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#0D0D0D",
    flex: 1,
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
    borderBottomColor: "grey",
    borderBottomWidth: 1,
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
    fontWeight: "500",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#303030",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
});
