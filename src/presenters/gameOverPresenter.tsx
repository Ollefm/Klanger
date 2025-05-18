import { observer } from "mobx-react-lite";
import GameOverView from "../views/gameOverView";

export const GameOverPresenter = observer(function GuessSongRender(props) {

  return (
    <GameOverView score={props.quizModel.correctGuesses} />
  );
});