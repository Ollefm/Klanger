import { observer } from "mobx-react-lite";
import MultiplayerGameOverview from "../views/multiPlayerGameOverview";
import { useRouter } from "expo-router";

export default observer(function MultiplayerGameOver(props) {
  const router = useRouter();
  
  function handleChallengeAgain() {
    const currentUserId = props.userModel.user.uid;

    const opponentPlayer = props.userModel.clickedGame.players.find(
      (player) => player.uid !== currentUserId
    );
    props.userModel.challengeUser(opponentPlayer);

    router.navigate("/");
  }

  async function handleRemoveGame(){
   await props.userModel.removeGame()
    router.navigate("/");
  }

  return (
    <MultiplayerGameOverview
      game={props.userModel.clickedGame}
      challengeAgain={handleChallengeAgain}
      winner={props.userModel.clickedGame?.winner}
      removeGame = {handleRemoveGame}
    />
  );
});
