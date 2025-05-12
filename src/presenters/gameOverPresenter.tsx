import { observer } from "mobx-react-lite";
import GameOverView from "../views/gameOverView";

interface GameOverViewProps {
  score: number;
  correctGuesses: number;
  totalRounds: number;
}

export const GameOverPresenter = observer(function GuessSongRender(props: GameOverViewProps) {

  return (
    <GameOverView props={props}/>
  );
});