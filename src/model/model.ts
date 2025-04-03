import { fetchData} from "../api/api"
import { Audio } from "expo-av";


export const model = {
    currentTrackID: null,
    currentTrackPromiseState: {},
    playlist: [],
    personalHighScore: null,
    currentScore: null,
    sound: null as Audio.Sound | null,

    setCurrentTrackId(trackId: string) {
        console.log(trackId)
        this.currentTrackID = trackId
    },

    async playSound() {
        if (!this.currentTrackID) {
            console.error("No track ID set.");
            return;
        }

        try {
            // Fetch track data from Deezer API
            const data = await fetchData(`https://api.deezer.com/track/${this.currentTrackID}`);
            console.log("data", data.name)
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
        // Stop playback
        await this.sound.stopAsync();
        // Unload sound to release resources
        await this.sound.unloadAsync();
        this.sound = null;
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    } else {
      console.warn("No sound is currently loaded.");
    }
  },
}