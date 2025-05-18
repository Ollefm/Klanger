import { observer } from "mobx-react-lite";
import GameOverView from "../views/gameOverView";

interface GameOverPresenterProps {
  quizModel: {
    correctGuesses: number;
  };
}

export const GameOverPresenter = observer(function GuessSongRender(props: GameOverPresenterProps) {

  return (
    <GameOverView score={props.quizModel.correctGuesses} />
  );
});