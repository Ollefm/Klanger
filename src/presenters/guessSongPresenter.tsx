import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { GuessSong } from "../views/guessSongView";
import { CountDokuView } from "../views/authViews/countDokuView";
import { useRouter } from "expo-router";

interface GuessSongPresenterProps {
  quizModel: {
    initGame,
    coverImageUrl: string;
    setCurrentTrackId;
    playSound: () => Promise<any>;
    setToggleTimer: (onProgressUpdate: (percent: number) => void) => void;
    setUserGuess: (userGuess: string) => void;
    userGuess: string;
    compareAnswer;
    nextRound,
    clearPlaySound: () => Promise<any>;
  };
}

export const GuessSongPresenter = observer(function GuessSongRender(props: GuessSongPresenterProps) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [showResult, setShowResult] = useState(false);
  
  
  const router = useRouter();

  useEffect(() => {
    props.quizModel.initGame();
  }, []);

  

  function handleToggleTimer() {
    // Pass the callback to update progress in the UI
    props.quizModel.setToggleTimer((percent) => {
      setProgress(percent);
    });
  }

  function currentTrackIdHandlerACB() {
    
    props.quizModel.setCurrentTrackId();
    if(showResult){
      setShowResult(!showResult)
    }
    handleNextSong();
  }

   function handleNextSong() {
    // Go to next round
    const result = props.quizModel.nextRound();
    
    // If game is over, show game over screen
    if (result && result.gameOver) {
      
      return;
    }
    
    // Reset UI state for new round
    setShowResult(false);
    setIsCorrect(false);
    setSongTitle("");
    setProgress(0);
    handleToggleTimer();
    props.quizModel.clearPlaySound();
  }

  function PlaySoundHandler() {
    props.quizModel.playSound();
    handleToggleTimer();
  }

  function handleUserGuessACB(userGuess) {
    props.quizModel.setUserGuess(userGuess);
  }

  // Compare answer function
  function handleUserGuessSubmitACB() {
    // Get current guess from quizModel
    const currentGuess = props.quizModel.userGuess;

    // Compare answer and get result object
    const result = props.quizModel.compareAnswer(currentGuess);

    // Set state based on result
    setIsCorrect(result.isCorrect);
    setSongTitle(result.songTitle);
    setShowResult(true);
    console.log(result.gameStatus.isGameOver)
    if (result.gameStatus.isGameOver) {
      router.navigate("/(home)/gameOver")
    }
    
    return result;
  
  }

  return (
    <>
      {(isPlaying && (
        <CountDokuView isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      )) || (
          <GuessSong
            coverImage={props.quizModel.coverImageUrl}
            playSound={PlaySoundHandler}
            setTrack={currentTrackIdHandlerACB}
            progress={progress}
            quizModel={props.quizModel}
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
