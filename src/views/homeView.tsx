import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import AppPrimaryButton from "../app/custom components/appPrimaryButton";
import ChallengeView from "../app/custom components/challengeView";
import GamesView from "../app/custom components/gamesView";
import { useState } from "react";

export default function IndexPage(props) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    await props.update(); 
    setRefreshing(false);
  }

  function gotToNewGame() {
    router.navigate("/(home)/newGame");
  }

  function handleAcceptChallengeACB(challenge) {
    props.acceptChallenge(challenge);
  }

  function handleDeclineChallengeACB(challenge) {
    props.declineChallenge(challenge);
  }


return (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={props.games}
      keyExtractor={(item, index) => item.id ?? index.toString()}
      renderItem={({ item }) => <GamesView games={item} user = {props.user}/>}
      ListHeaderComponent={
        <>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/KlangerLogo2.png")}
              style={{ height: 100, width: 200 }}
              resizeMode="contain"
            />
          </View>
          <ChallengeView
            challenges={props.challenges}
            acceptChallenge={handleAcceptChallengeACB}
            declineChallenge={handleDeclineChallengeACB}
          />
        </>
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["white"]}
          tintColor="white"
        />
      }
      contentContainerStyle={{ paddingBottom: 80 }} 
    />
    <View style={styles.fixedButtonContainer}>
      <AppPrimaryButton title="New game" onPress={gotToNewGame} />
    </View>
  </SafeAreaView>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 24,
  },
    fixedButtonContainer: {
    position: "absolute",
    bottom: 100,        
    left: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
