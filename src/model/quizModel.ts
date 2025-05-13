import { fetchData } from "../api/api";
import { Audio } from "expo-av";
import { challengeUser } from "../services/firebaseGameModel";
import { runInAction } from "mobx"; // Add this import
import { TrackData } from "../types/user";

const classicalBanger = ["9968843", "10375665", "6971327", "1038775132", "1904250027", "3135556", "2801558052", "630827242", "350107641", "44112901"];
const rockBangers = ["92720046", "730866", "518458092", "13791930", "985745702", "1483825282", "136334560", "2263033", "63480990", "7818900", "7675130",]

export const quizModel = {
  currentTrackData: null as TrackData | null,
  currentTrackID: null,
  currentTrackPromiseState: {},
  coverImageUrl: null as string | null,
  playlist: [],
  personalHighScore: null,
  currentScore: null,
  userGuess: "" as string,
  sound: null as Audio.Sound | null,
  timer: null as NodeJS.Timeout | null,
  elapsedSeconds: 0,
  currentRound: 0,
  correctGuesses: 0,
  maxRounds: 5,
  gameOver: false,
  lastPlayedTrackID: null,


  async fetchTrackData(trackId?: string) {
    // Use provided trackId or the currently set one
    const id = trackId || this.currentTrackID;
    if (!id) {
      console.error("No track ID provided.");
      return null;
    }

    try {
      const data = await fetchData(`https://api.deezer.com/track/${id}`);
      runInAction(() => {
        this.currentTrackData = data;
        this.coverImageUrl = data.album?.cover_medium || null;
      });
      console.log("Track data fetched:", data.title);
      //console.log("Track Cover", data.album.cover_medium)
      return data;
    } catch (error) {
      console.error("Error fetching track data:", error);
      return null;
    }
  },

  initGame() {
    runInAction(() => {
      this.currentRound = 0;
      this.correctGuesses = 0;
      this.currentScore = 0;
      this.gameOver = false;
    });

    console.log("in Init Game", this.currentRound)
    // Start first round
    return this.nextRound();
  },

  // Move to next round
  nextRound() {
    if (this.currentRound >= this.maxRounds) {
      runInAction(() => {
        this.gameOver = true;
      });
      return { gameOver: true, score: this.currentScore };
    }

    runInAction(() => {
      this.currentRound += 1;
    });

    console.log(`Starting round ${this.currentRound} of ${this.maxRounds}`);
    return this.setCurrentTrackId();
  },

  // Update to handle game progression
  setCurrentTrackId() {
    // Check if we've reached max rounds
    if (this.gameOver || this.currentRound >= this.maxRounds) {
      console.log("Game over! Maximum rounds reached.");
      runInAction(() => {
        this.gameOver = true;
      });
      return null;
    }

    // If this is the first track and currentRound is 0, set it to 1
    if (this.currentRound === 0) {
      runInAction(() => {
        this.currentRound = 1;
      });
    }

    const songId = this.randomsong();
    console.log(`Round ${this.currentRound}: Setting track ID: ${songId}`);

    runInAction(() => {
      this.currentTrackID = songId;
    });

    return this.fetchTrackData(songId);
  },

  compareAnswer(userGuess: string): { isCorrect: boolean, songTitle: string, gameStatus: { round: number, score: number, isGameOver: boolean } } {
    if (!this.currentTrackData || !userGuess) {
      return {
        isCorrect: false,
        songTitle: "",
        gameStatus: {
          round: this.currentRound,
          score: this.currentScore,
          isGameOver: this.gameOver
        }
      };
    }

    // Get the original song title
    const originalTitle = this.currentTrackData.title;

    // Create a more lenient matching algorithm
    const isCorrect = this.isLenientMatch(userGuess, originalTitle);

    // Update score and correct guesses if answer is correct
    if (isCorrect) {
      runInAction(() => {
        this.correctGuesses += 1;
        this.currentScore += 100;  // Award 100 points per correct guess
      });
    }

    console.log("Answer comparison result:", isCorrect);
    console.log("Correct song title:", originalTitle);
    console.log(`Round: ${this.currentRound}/${this.maxRounds}, Score: ${this.currentScore}`);

    // Check if this was the last round
    const isLastRound = this.currentRound >= this.maxRounds;
    if (isLastRound) {
      runInAction(() => {
        this.gameOver = true;
      });
    }

    return {
      isCorrect: isCorrect,
      songTitle: originalTitle,
      gameStatus: {
        round: this.currentRound,
        score: this.currentScore,
        isGameOver: isLastRound || this.gameOver
      }
    };
  },

  // Add this new helper method to your quizModel
  isLenientMatch(guess: string, title: string): boolean {
    // Normalize both strings
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedTitle = title.trim().toLowerCase();

    // Check for exact match first (current behavior)
    if (normalizedGuess === normalizedTitle) {
      return true;
    }

    // Remove punctuation and special characters
    const cleanGuess = normalizedGuess.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const cleanTitle = normalizedTitle.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    // Split into words
    const guessWords = cleanGuess.split(/\s+/).filter(word => word.length > 1);
    const titleWords = cleanTitle.split(/\s+/).filter(word => word.length > 1);

    // Filter out common words that don't add meaning
    const commonWords = ["the", "a", "an", "and", "or", "but", "of", "in", "on", "at", "to", "for"];
    const importantGuessWords = guessWords.filter(word => !commonWords.includes(word));
    const importantTitleWords = titleWords.filter(word => !commonWords.includes(word));

    // Count how many important title words appear in the guess
    let matchingWords = 0;
    for (const titleWord of importantTitleWords) {
      if (importantGuessWords.some(guessWord => guessWord.includes(titleWord) || titleWord.includes(guessWord))) {
        matchingWords++;
      }
    }

    // Calculate percentage of matching important words
    const matchPercentage = matchingWords / importantTitleWords.length;

    // Consider it correct if the user got at least 60% of important words
    // You can adjust this threshold based on desired difficulty
    const isMatch = matchPercentage >= 0.6;

    console.log(`Match percentage: ${(matchPercentage * 100).toFixed(1)}% - Required: 60%`);

    return isMatch;
  },


  /** Choosing song couple of functions */

  randomsong() {
    const randomIndex = Math.floor(Math.random() * rockBangers.length);
    return rockBangers[randomIndex];
  },

  setUserGuess(userGuess: string) {
    this.userGuess = userGuess;
    console.log("userGuess", userGuess)
  },


  setToggleTimer(onProgressUpdate: (percent: number) => void) {
    if (!this.currentTrackID) {
      return
    }

    // Check if track has changed since last playback
    const trackChanged = this.lastPlayedTrackID !== this.currentTrackID;
    console.log("lastPlayedTrackID", this.lastPlayedTrackID)
    if (trackChanged) {
      console.log("Track changed, resetting progress");
      runInAction(() => {
        this.elapsedSeconds = 0;
        this.lastPlayedTrackID = this.currentTrackID;
      });
      onProgressUpdate(0);
    }
    if (this.timer) {
      // stop
      clearInterval(this.timer);
      runInAction(() => {
        this.timer = null;
      });

      return;
    }

    // start
    runInAction(() => {
      this.elapsedSeconds = 0;
    });
    onProgressUpdate(0);

    this.timer = setInterval(() => {
      runInAction(() => {
        this.elapsedSeconds += 0.1;
      });

      // map 0…30 s to 50…100%
      const raw = (this.elapsedSeconds / 30) * 100;
      const percent = Math.min(100, raw);

      onProgressUpdate(percent);

      if (this.elapsedSeconds >= 30) {
        clearInterval(this.timer!);
        if (this.sound) {
          try {
            this.sound.pauseAsync();
            runInAction(() => {
              this.sound = null;
            });
            console.log("Sound stopped.");
          } catch (error) {
            console.error("Error stopping sound:", error);
          }
          return;
        }
        runInAction(() => {
          this.timer = null;
        });
      }
    }, 100);
  },

  async clearPlaySound() {
    console.log("Track changed, stopping current playback");
    if (this.sound) {
      try {
        await this.sound.stopAsync();
        runInAction(() => {
          this.sound = null;
        });
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    }
  },


  async playSound() {
    if (!this.currentTrackID) {
      console.error("No track ID set.");
      return;
    }

    // Track ID has changed since last play, reset everything
    if (this.lastPlayedTrackID !== this.currentTrackID) {


    }

    // Update last played track ID
    runInAction(() => {
      this.lastPlayedTrackID = this.currentTrackID;
    });

    // Stop existing sound if playing
    if (this.sound) {
      try {
        await this.sound.pauseAsync();
        runInAction(() => {
          this.sound = null;
        });
        console.log("Sound stopped.");
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
      return;
    }

    try {
      // Ensure we have track data
      if (!this.currentTrackData) {
        await this.fetchTrackData();
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

      runInAction(() => {
        this.sound = sound;
      });

      //console.log("Sound started.");
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  },


};
