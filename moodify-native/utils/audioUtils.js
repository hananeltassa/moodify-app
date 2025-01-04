import { Audio } from "expo-av";

class AudioPlayer {
  constructor() {
    this.soundRef = null;
    this.currentUri = null; // Track the currently playing URI
  }

  async loadAndPlay(uri, onPlaybackStatusUpdate) {
    try {
      if (this.soundRef) {
        if (this.currentUri === uri) {
          console.log("This song is already loaded. Playing it now.");
          await this.play();
          return;
        }
        console.log("Stopping and unloading previous sound");
        await this.unload(); // Unload the previous track
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      this.soundRef = sound;
      this.currentUri = uri;
      console.log("Sound loaded and initialized");
    } catch (error) {
      console.error("Error loading sound:", error);
      throw error;
    }
  }

  async play() {
    if (!this.soundRef) {
      console.warn("Attempted to play but SoundRef is not initialized.");
      return;
    }

    try {
      await this.soundRef.playAsync();
      console.log("Playback started");
    } catch (error) {
      console.error("Error resuming playback:", error);
    }
  }

  async pause() {
    if (!this.soundRef) {
      console.warn("Attempted to pause but SoundRef is not initialized.");
      return;
    }

    try {
      await this.soundRef.pauseAsync();
      console.log("Playback paused");
    } catch (error) {
      console.error("Error pausing playback:", error);
    }
  }

  async setPosition(positionMillis) {
    if (!this.soundRef) {
      console.warn("Attempted to set position but SoundRef is not initialized.");
      return;
    }

    try {
      await this.soundRef.setPositionAsync(positionMillis);
    } catch (error) {
      console.error("Error setting position:", error);
    }
  }

  async unload() {
    if (!this.soundRef) {
      console.warn("Attempted to unload but SoundRef is not initialized.");
      return;
    }

    try {
      console.log("Unloading sound");
      await this.soundRef.stopAsync();
      await this.soundRef.unloadAsync();
    } catch (error) {
      console.error("Error unloading sound:", error);
    } finally {
      this.soundRef = null;
      this.currentUri = null;
      console.log("Sound unloaded");
    }
  }
}

const audioPlayerInstance = new AudioPlayer();
export default audioPlayerInstance;
