import { observer } from "mobx-react-lite";
import { QuizView } from "../views/quizView";

const classicalBanger = ["9968843", "6971327", "1038775132", "1904250027"];

export const Quiz = observer(function QuizRender(props) {
  function randomsong() {
    const randomIndex = Math.floor(Math.random() * classicalBanger.length);
    return classicalBanger[randomIndex];
  }

  function currentTrackIdHandlerACB() {
    const song = randomsong();
    props.model.setCurrentTrackId(song);
  }

  function PlaySoundHandler() {
    props.model.playSound();
  }

  function StopSoundHandler() {
    props.model.stopSound();
  }
  return (
    <QuizView
      model={props.model}
      stopSound={StopSoundHandler}
      playSound={PlaySoundHandler}
      setTrack={currentTrackIdHandlerACB}
    />
  );
});
