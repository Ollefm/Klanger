import { fetchData, fetchTrackData } from "../api/api";
import { Audio } from "expo-av";
import { TrackData } from "../types/user";
import { isLenientMatch } from "../utils/utils";

const classicalBanger = [
  "9968843",
  "10375665",
  "6971327",
  "1038775132",
  "1904250027",
  "3135556",
  "2801558052",
  "630827242",
  "350107641",
  "44112901",
];
const rockBangers = [
  "92720046",
  "730866",
  "518458092",
  "13791930",
  "985745702",
  "1483825282",
  "136334560",
  "2263033",
  "63480990",
  "7818900",
  "7675130",
];
const MAXIMUM_ROUNDS = 5;

export const quizModel = {
  currentTrackData: null as TrackData | null,
  currentTrackID: null,
  currentTrackPromiseState: {},
  coverImageUrl: null as string | null,
  guessesSongsIDs: [],
  personalHighScore: null,
  currentScore: null,
  isCorrect: false,
  songTitle: "",
  userGuess: "" as string,
  sound: null as Audio.Sound | null,
  timer: null as NodeJS.Timeout | null,
  elapsedSeconds: 0,
  currentRound: 0,
  correctGuesses: 0,
  gameOver: false,
  lastPlayedTrackID: null,
  multiplayer: false,
  multplayerGame: {},

  setGuessesSongsIDs() {
    const shuffledArray = [...rockBangers];

    // Shuffle the array using the Fisher-Yates algoritgm.
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }

    // Take the first 5 elements from the shuffled array.
    this.guessesSongsIDs = shuffledArray.slice(0, 5);
  },
   isMultiplayer(){
    this.multiplayer = true
  },
  isSinglePlayer(){
    this.multiplayer = false
  },

  initGame() {
    this.currentRound = 0;
    this.correctGuesses = 0;
    this.currentScore = 0;
    this.gameOver = false;
    this.userGuess = "";
    this.setGuessesSongsIDs();

    console.log("in Init Game", this.currentRound);
    // Start first round
    this.nextRound();
  },

  // Move to next round
  async nextRound() {
    if (this.currentRound >= MAXIMUM_ROUNDS) {
      this.gameOver = true;
    }
    const id = this.guessesSongsIDs[this.currentRound];
    try {
      const data = await fetchTrackData(id);
      this.currentTrackID = id;
      this.currentTrackData = data;
      this.coverImageUrl = data.album?.cover_medium || null;
      this.currentRound += 1;
      this.isCorrect = false;
      this.songTitle = "";
      this.userGuess = "";
    } catch (error) {
      console.error("something When wrong when fetching track data: ", error);
    }
  },

  compareAnswer() {
    if (!this.currentTrackData || !this.userGuess) {
      this.isCorrect = false;
      this.songTitle = "";
      this.userGuess = "";
    }

    // Create a more lenient matching algorithm
    const isCorrect = isLenientMatch(
      this.userGuess,
      this.currentTrackData.title
    );

    // Update score and correct guesses if answer is correct
    if (isCorrect) {
      this.correctGuesses += 1;
    }
    console.log("Answer comparison result:", isCorrect);
    console.log("Correct song title:", this.currentTrackData.title);
    console.log(
      `Round: ${this.currentRound}/${MAXIMUM_ROUNDS}, Score: ${this.correctGuesses}`
    );

    // Check if this was the last round
    const isLastRound = this.currentRound >= MAXIMUM_ROUNDS;
    if (isLastRound) {
      this.gameOver = true;
    }

    this.isCorrect = isCorrect;
    this.songTitle = this.currentTrackData.title;;
    this.gameOver = isLastRound || this.gameOver;
  },

  setUserGuess(userGuess: string) {
    this.userGuess = userGuess;
    //console.log("userGuess", userGuess)
  },

  setToggleTimer(onProgressUpdate: (percent: number) => void) {
    if (!this.currentTrackID) {
      return;
    }

    // Check if track has changed since last playback
    const trackChanged = this.lastPlayedTrackID !== this.currentTrackID;
    //console.log("lastPlayedTrackID", this.lastPlayedTrackID)
    if (trackChanged) {
      this.elapsedSeconds = 0;
      this.lastPlayedTrackID = this.currentTrackID;
      onProgressUpdate(0);
    }
    if (this.timer) {
      // stop
      clearInterval(this.timer);

      this.timer = null;

      return;
    }

    // start

    this.elapsedSeconds = 0;

    onProgressUpdate(0);

    this.timer = setInterval(() => {
      this.elapsedSeconds += 0.1;

      // map 0…30 s to 50…100%
      const raw = (this.elapsedSeconds / 30) * 100;
      const percent = Math.min(100, raw);

      onProgressUpdate(percent);

      if (this.elapsedSeconds >= 30) {
        clearInterval(this.timer!);
        if (this.sound) {
          try {
            this.sound.pauseAsync();

            this.sound = null;

            console.log("Sound stopped.");
          } catch (error) {
            console.error("Error stopping sound:", error);
          }
          return;
        }

        this.timer = null;
      }
    }, 100);
  },

  async clearPlaySound() {
    console.log("Track changed, stopping current playback");
    if (this.sound) {
      try {
        await this.sound.stopAsync();

        this.sound = null;
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    }
  },

  async playSound(play : boolean) {
    if (!this.currentTrackID) {
      console.error("No track ID set.");
      return;
    }

    // Update last played track ID

    this.lastPlayedTrackID = this.currentTrackID;

    // Stop existing sound if playing
    if (this.sound) {
      try {
        await this.sound.stopAsync();

        this.sound = null;

        console.log("Sound stopped.");
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
      return;
    }
    

    try {
      // Ensure we have track data
      const id = this.guessesSongsIDs[this.currentRound];
      if (!this.currentTrackData) {
        const data = await fetchTrackData(id);
        this.currentTrackID = id;
        this.currentTrackData = data;
        this.coverImageUrl = data.album?.cover_medium || null;
      }

      if (!this.currentTrackData || !this.currentTrackData.preview) {
        console.error("No preview URL available.");
        return;
      }

      // Create and play the sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: this.currentTrackData.preview },
        { shouldPlay: true }
      );

      this.sound = sound;
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  },
  async playPause(play : boolean){
    if(!play){
      await this.sound.setStatusAsync({ shouldPlay: false });
    }else{
      await this.sound.setStatusAsync({ shouldPlay: true });
    }
    
  }
};
