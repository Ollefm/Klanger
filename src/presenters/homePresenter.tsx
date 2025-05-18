import { observer } from "mobx-react-lite";
import HomeView from "../views/homeView";
import {
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import { useState } from "react";

export default observer(function HomeRender(props) {
  

  function handleUpdateACB() {
     props.userModel.listenForGames();
    props.userModel.listenForChallenges();

  }

  function handleAcceptChallengeACB(challenge) {
    props.userModel.acceptChallenge(challenge);
  }

  function handleDeclineChallengeACB(challenge) {
    props.userModel.declineChallenge(challenge);
  }

  return (
      <HomeView
        challenges={props.userModel.challenges}
        games = {props.userModel.games}
        user = {props.userModel.user}
        update={handleUpdateACB}
        acceptChallenge={handleAcceptChallengeACB}
        declineChallenge={handleDeclineChallengeACB}
      />

  );
});
