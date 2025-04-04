import { fetchData } from "../api/api";
import { Audio } from "expo-av";
import { signInWithEmail, signUpWithEmail } from "../firestoreModel";

export const model = {
  user: null,
  isAuthenticated: false,
  currentTrackID: null,
  currentTrackPromiseState: {},
  coverImageUrl: null as string | null,
  playlist: [],
  personalHighScore: null,
  currentScore: null,
  sound: null as Audio.Sound | null,

  setCurrentTrackId(trackId: string) {
    console.log(trackId);
    this.currentTrackID = trackId;
  },

  async playSound() {
    if (!this.currentTrackID) {
      console.error("No track ID set.");
      return;
    }

    

        try {
            // Fetch track data from Deezer API
            const data = await fetchData(`https://api.deezer.com/track/${this.currentTrackID}`);
            
            console.log("data", data.album.cover_medium)
            
            this.coverImageUrl = data.album.cover_medium;
            if (data.preview) {
                // Stop and unload previous sound if any
                if (this.sound) {
                    await this.sound.unloadAsync();
                }

                // Load and play new sound
                const { sound } = await Audio.Sound.createAsync(
                    { uri: data.preview },
                    { shouldPlay: true }
                );

                this.sound = sound;
            } else {
                console.error("No preview URL available.");
            }
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    },


  async stopSound() {
    if (this.sound) {
      try {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    } else {
      console.warn("No sound is currently loaded.");
    }
  },

  async registerAccount(email: string, password: string) {
    try {
      const userCredential = await signUpWithEmail(email, password);
      this.user = userCredential.user;
      console.log("User registered:", this.user);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  },

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmail(email, password);
      this.user = userCredential.user;
      console.log("User logged in:", this.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
};
