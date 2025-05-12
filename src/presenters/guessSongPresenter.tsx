import { useState } from "react";
import { observer } from "mobx-react-lite";
import { GuessSong } from "../views/guessSongView";
import { CountDokuView } from "../views/authViews/countDokuView";

const classicalBanger = ["9968843", "6971327", "1038775132", "1904250027", "3135556", "2801558052","630827242","350107641","44112901"];


interface GuessSongPresenterProps {
  model: {
    coverImageUrl: string;
    setCurrentTrackId: (id: string) => void;
    playSound: () => Promise<any>;
    setToggleTimer: (onProgressUpdate: (percent: number) => void) => void;
    setUserGuess: (userGuess: string) => void;
    userGuess: string;
    compareAnswer;
  };
}

export const GuessSongPresenter = observer(function GuessSongRender(props: GuessSongPresenterProps) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [showResult, setShowResult] = useState(false);

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
    if(showResult){
      setShowResult(!showResult)
    }
  }

  function PlaySoundHandler() {
    props.model.playSound();
    handleToggleTimer();
  }

  function handleUserGuessACB(userGuess) {
    props.model.setUserGuess(userGuess);
  }

  // Compare answer function
  function handleUserGuessSubmitACB() {
    // Get current guess from model
    const currentGuess = props.model.userGuess;

    // Compare answer and get result object
    const result = props.model.compareAnswer(currentGuess);

    // Set state based on result
    setIsCorrect(result.isCorrect);
    setSongTitle(result.songTitle);
    setShowResult(true);

    // Return result if needed elsewhere
    return result;
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
            model={props.model}
            userGuess={handleUserGuessACB}
            handleUserGuessSubmit={handleUserGuessSubmitACB}
            isCorrect={isCorrect}
            songTitle={songTitle}
            showResult={showResult}
          />
        )}
    </>
  );
});
