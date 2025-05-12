import { fetchData } from "../api/api";
import { Audio } from "expo-av";
import { challengeUser } from "../firestoreModels/firebaseGameModel";
import { runInAction } from "mobx"; // Add this import
import { TrackData } from "../types/user";

const classicalBanger = ["9968843", "10375665","6971327", "1038775132", "1904250027", "3135556", "2801558052","630827242","350107641","44112901"];

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
        console.log("Track Cover", data.album.cover_medium)
        return data;
      } catch (error) {
        console.error("Error fetching track data:", error);
        return null;
      }
    },


    /** Choosing song couple of functions */

    randomsong() {
    const randomIndex = Math.floor(Math.random() * classicalBanger.length);
    return classicalBanger[randomIndex];
  },
  
    setUserGuess(userGuess:string){
      this.userGuess = userGuess;
      console.log("userGuess", userGuess)
    },
  
  
      setCurrentTrackId(trackId?: string) {
    const songId = trackId || this.randomsong();
    console.log("Setting track ID:", songId);
    
    runInAction(() => {
      this.currentTrackID = songId;
    });
    
    return this.fetchTrackData(songId);
  },
  
    setToggleTimer(onProgressUpdate: (percent: number) => void) {
      if (!this.currentTrackID) {
        return
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
          this.elapsedSeconds += 1;
        });
  
        // map 0…30 s to 50…100%
        const raw = (this.elapsedSeconds / 30) * 100;
        const percent = Math.min(100, Math.round(raw));
  
        onProgressUpdate(percent);
  
        // once we hit 30 s, auto–stop
        if (this.elapsedSeconds >= 30) {
          clearInterval(this.timer!);
          runInAction(() => {
            this.timer = null;
          });
        }
      }, 1000);
    },
  
   compareAnswer(userGuess: string): { isCorrect: boolean, songTitle: string } {
    if (!this.currentTrackData || !userGuess) {
      return { isCorrect: false, songTitle: "" };
    }
        
    // Normalize both strings for comparison
    const normalizedGuess = userGuess.trim().toLowerCase();
    const normalizedTitle = this.currentTrackData.title.trim().toLowerCase();
    
    // Get the original song title (not normalized)
    const originalTitle = this.currentTrackData.title;
    
    console.log("Comparing:", normalizedGuess, "with:", normalizedTitle);
    const isCorrect = normalizedGuess === normalizedTitle;
    
    console.log("Answer comparison result:", isCorrect);
    console.log("Correct song title:", originalTitle);
    
    // Return both the result and the song title
    return {
      isCorrect: isCorrect,
      songTitle: originalTitle
    };
  },
  
  
    async playSound() {
      if (!this.currentTrackID) {
        console.error("No track ID set.");
        return;
      }
  
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
        
        console.log("Sound started.");
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    },
  
  
  };
  