import { fetchData } from "../api/api";
import { Audio } from "expo-av";
import { signInWithEmail, signUpWithEmail, searchUsersByUsername } from "../firestoreModel";
import { SignUpData, AppUser } from "../types/user";
import { runInAction } from "mobx"; // Add this import

interface TrackData {
  id: string;
  title: string;
  preview: string;
  album?: {
    cover_medium?: string;
  };
  artist?: {
    name?: string;
  };
}

export const model = {
  user: {
    uid: "",
    email: "",
    username: "",
    createdAt: {},
  } as AppUser,
  users: [] as AppUser[],

  userCredentials: {
    email: "",
    password: "",
    username: "",
  } as SignUpData,
  userSearch: "" as string,
  isAuthenticated: false,
  currentTrackData: null as TrackData | null,
  currentTrackID: null,
  currentTrackPromiseState: {},
  coverImageUrl: null as string | null,
  playlist: [],
  personalHighScore: null,
  currentScore: null,
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

  


  setCurrentTrackId(trackId: string) {
    console.log(trackId);
    runInAction(() => {
      this.currentTrackID = trackId;
    });
    return this.fetchTrackData(trackId);
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

 compareAnswer(userGuess: string): boolean {
    if (!this.currentTrackData || !userGuess) {
      return false;
    }
    
    // Normalize both strings for comparison
    const normalizedGuess = userGuess.trim().toLowerCase();
    const normalizedTitle = this.currentTrackData.title.trim().toLowerCase();
    
    // Simple exact match
    return normalizedGuess === normalizedTitle;
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
