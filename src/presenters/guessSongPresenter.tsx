import { useState } from "react";
import { observer } from "mobx-react-lite";
import { GuessSong } from "../views/guessSongView";
import { CountDokuView } from "../views/authViews/countDokuView";

const classicalBanger = ["9968843", "6971327", "1038775132", "1904250027", "3135556", "2801558052"];


interface GuessSongPresenterProps {
  model: {
    coverImageUrl: string;
    setCurrentTrackId: (id: string) => void;
    playSound: () => Promise<any>;
    setToggleTimer: (onProgressUpdate: (percent: number) => void) => void;
  };
}

export const GuessSongPresenter = observer(function GuessSongRender(props: GuessSongPresenterProps) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true)

  function randomsong() {
    const randomIndex = Math.floor(Math.random() * classicalBanger.length);
    return classicalBanger[randomIndex];
  }

  function handleToggleTimer() {
    // Pass the callback to update progress in the UI
    props.model.setToggleTimer((percent) => {
      setProgress(percent);
    });
  }

  function currentTrackIdHandlerACB() {
    const song = randomsong();
    props.model.setCurrentTrackId(song);

  }

  function PlaySoundHandler() {
    props.model.playSound();
    handleToggleTimer();
  }

  return (
    <>
      {(isPlaying && (
        <CountDokuView isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      )) || (
          <GuessSong
            coverImage={props.model.coverImageUrl}
            playSound={PlaySoundHandler}
            setTrack={currentTrackIdHandlerACB}
            progress={progress}

          />
        )}
    </>
  );
});
