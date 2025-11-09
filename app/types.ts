declare module "@madzadev/audio-player" {
  interface Track {
    url: string;
    title: string;
    tags: string[];
  }

  interface ColorScheme {
    playerBackground?: string;
    titleColor?: string;
    timeColor?: string;
    progressSlider?: string;
    progressUsed?: string;
    progressLeft?: string;
    bufferLoaded?: string;
    volumeSlider?: string;
    volumeUsed?: string;
    volumeLeft?: string;
  }
}
