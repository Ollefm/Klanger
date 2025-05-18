import { observer } from "mobx-react-lite";
import NewGameView from "../views/newGameView";

export default observer(function NewGame(props) {
  function handleMultiplayer() {
    props.quizModel.isMultiplayer();
  }

  function handleSinglePlayer() {
    props.quizModel.isSinglePlayer();
  }
  return (
    <NewGameView
      multiplayer={props.quizModel.multiplayer}
      setMultiplayer={handleMultiplayer}
      setSinglePlayer = {handleSinglePlayer}
    />
  );
});
