import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { GuessSong } from "../views/guessSongView";
import { CountDokuView } from "../views/authViews/countDokuView";
import { useRouter } from "expo-router";

interface GuessSongPresenterProps {
  quizModel: {
    initGame;
    coverImageUrl: string;
    setCurrentTrackId;
    guessesSongsIDs: string[];
    isCorrect: boolean;
    songTitle: string;
    gameOver: boolean;
    correctGuesses: number;
    gameStatus: { round: number; score: number; isGameOver: boolean };
    playSound: () => Promise<any>;
    setToggleTimer: (onProgressUpdate: (percent: number) => void) => void;
    setUserGuess: (userGuess: string) => void;
    userGuess: string;
    compareAnswer;
    nextRound;
    clearPlaySound: () => Promise<any>;
    playPause: (play: boolean) => Promise<any>;
    multiplayer: boolean;
  };

  userModel:{
    clickedGame: Object;
    setGame: (correctGuesses : number) => void;
    updateUserLeaderBoardData: (score: number) => Promise<any>;
  }
}

export const GuessSongPresenter = observer(function GuessSongRender(
  props: GuessSongPresenterProps
) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [playPause, setPlayPause] = useState<boolean>(false);
  
  const router = useRouter();
  function playPauseCB() {
    setPlayPause(!playPause);
  }

  function handleToggleTimer() {
    // Pass the callback to update progress in the UI
    props.quizModel.setToggleTimer((percent) => {
      setProgress(percent);
    });
  }

  function handleNextSong() {
    // If game is over, show game over screen
    if (props.quizModel.gameOver) {
      props.quizModel.clearPlaySound();
      setShowResult(false);
      return;
    }

    // Go to next round
    props.quizModel.nextRound();

    // Reset UI state for new round
    setShowResult(false);
    setProgress(0);

    props.quizModel.clearPlaySound();
    if (playPause) {
      playPauseCB();
      handleToggleTimer();
    }
  }

  function PlaySoundHandler() {
    props.quizModel.playSound();
    handleToggleTimer();
    playPauseCB();
  }

  function handleUserGuessACB(userGuess) {
    props.quizModel.setUserGuess(userGuess);
  }

  // Compare answer function
  function handleUserGuessSubmitACB() {
    // Compare answer and get result object
    props.quizModel.compareAnswer();

    setShowResult(true);

    if (props.quizModel.gameOver) {
      if(props.quizModel.multiplayer){
           props.userModel.setGame(props.quizModel.correctGuesses)
      }
      props.userModel.updateUserLeaderBoardData(props.quizModel.correctGuesses)
      router.navigate("/(home)/gameOver");
    }
  }

  return (
    <>
      {(isPlaying && (
        <CountDokuView isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      )) || (
        <GuessSong
          gameOver={props.quizModel.gameOver}
          coverImage={props.quizModel.coverImageUrl}
          playSound={PlaySoundHandler}
          nextSong={handleNextSong}
          progress={progress}
          quizModel={props.quizModel}
          userGuessEnter={handleUserGuessACB}
          userGuess={props.quizModel.userGuess}
          handleUserGuessSubmit={handleUserGuessSubmitACB}
          isCorrect={props.quizModel.isCorrect}
          songTitle={props.quizModel.songTitle}
          showResult={showResult}
          playPause={playPause}
        />
      )}
    </>
  );
});
