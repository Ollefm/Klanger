import { observer } from "mobx-react-lite";
import HomeView from "../views/homeView";
import {
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import { useState } from "react";

type HomeRenderProps = {
  userModel: {
    challenges: any;
    games: any;
    user: any;
    listenForGames: () => void;
    listenForChallenges: () => void;
    acceptChallenge: (challenge: any) => Promise<any>;
    declineChallenge: (challenge: any) => void;
  };
};

export default observer(function HomeRender(props: HomeRenderProps) {
const [lastAcceptedId, setLastAcceptedId] = useState<string | null>(null);  
  

  function handleUpdateACB() {
     props.userModel.listenForGames();
    props.userModel.listenForChallenges();

  }

  async function handleAcceptChallengeACB(challenge) {
     try {
      await props.userModel.acceptChallenge(challenge);
      
      setLastAcceptedId(challenge.id);
      
      setTimeout(() => {
        if (lastAcceptedId === challenge.id) {
          setLastAcceptedId(null);
        }
      }, 3000);
    } catch (error) {
      console.error("Error accepting challenge:", error);
    } 
  }

  function handleDeclineChallengeACB(challenge) {
    props.userModel.declineChallenge(challenge);
  }

  function handleMultiplayer(){
    props.quizModel.isMultiplayer()
  }

  function handleClickedGame(game){
    props.userModel.setClickedGame(game)
  }

  function handleInitGame(){
    props.quizModel.initGame();
  }

  return (
      <HomeView
        initGame = {handleInitGame}
        setClickedGame = {handleClickedGame}
        multiplayer = {props.quizModel.multiplayer}
        setIsMultiplayer = {handleMultiplayer}
        challenges={props.userModel.challenges}
        games = {props.userModel.games}
        user = {props.userModel.user}
        update={handleUpdateACB}
        acceptChallenge={handleAcceptChallengeACB}
        declineChallenge={handleDeclineChallengeACB}
        succesChallenge={lastAcceptedId}
      />

  );
});
