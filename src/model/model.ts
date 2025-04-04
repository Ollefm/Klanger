import { fetchData } from "../api/api";
import { Audio } from "expo-av";
import { signInWithEmail, signUpWithEmail } from "../firestoreModel";

export const model = {
  user: null,
  userCredentials: {email : "", password: ""},
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
  
    
    if (this.sound) {
      try {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
        console.log("Sound stopped.");
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
      return;
    }
  
    
    try {
      const data = await fetchData(`https://api.deezer.com/track/${this.currentTrackID}`);
      this.coverImageUrl = data.album.cover_medium;
      console.log("Cover image:", this.coverImageUrl);
  
      if (data.preview) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: data.preview },
          { shouldPlay: true }
        );
        this.sound = sound;
        console.log("Sound started.");
      } else {
        console.error("No preview URL available.");
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  },

  setEmail(email:string){
    this.userCredentials.email = email
  },
  setPassword(password:string){
    this.userCredentials.password = password
  },

  async registerAccount() {
    try {
      const userCredential = await signUpWithEmail(this.userCredentials.email, this.userCredentials.password);
      this.user = userCredential;
      console.log("User registered:", this.user);
      this.isAuthenticated = true;
    } catch (error) {
      console.error("Registration failed:", error);
    }
  },

  async login() {
    try {
      const userCredential = await signInWithEmail(this.userCredentials.email, this.userCredentials.password);
      this.user = userCredential;
      console.log("User logged in:", this.user);
      this.isAuthenticated = true;
    } catch (error) {
      console.error("Login failed:", error);
    }finally{
      this.userCredentials.email = ""
      this.userCredentials.password = ""

    }
  }
};
