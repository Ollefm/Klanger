import { observer } from "mobx-react-lite";
import { GuessSong } from "../views/guessSongView";

const classicalBanger = ["9968843", "6971327", "1038775132", "1904250027"];

interface GuessSongPresenterProps {
  model: {
    coverImageUrl: string;
    setCurrentTrackId: (id: string) => void;
    playSound: () => Promise<any>;
    stopSound: () => Promise<any>;
  };
}

export const GuessSongPresenter = observer(function GuessSongRender(props: GuessSongPresenterProps) {
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

  console.log("props in the guessPresenter", props.model.coverImageUrl)
  return (
    <GuessSong
      model={props.model}
      stopSound={StopSoundHandler}
      playSound={PlaySoundHandler}
      setTrack={currentTrackIdHandlerACB}
    />
  );
});
