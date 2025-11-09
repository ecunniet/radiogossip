"use client";
import PlayerFromLib from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

const tracks = [
  {
    url: "/audio/end.wav",
    title: "Culture Pop - The End",
    tags: [],
  },
];

const colors = {
  playerBackground: "#bfa78b",
  titleColor: "#3a2b21",
  timeColor: "#ffffff",
  progressSlider: "#cf392c",
  progressUsed: "#3a2b21",
  progressLeft: "#ffffff",
  bufferLoaded: "#7a5f45",
  volumeSlider: "#cf392c",
  volumeUsed: "#3a2b21",
  volumeLeft: "#3a2b21",
};

const End = () => {
  const Player = PlayerFromLib as React.ElementType;
  return (
    <div className="flex flex-col items-center justify-center text-[#2d1707] gap-8">
      <h1 className="text-3xl font-bold text-[#cf392c]">
        Joyeux anniversaire Mathilde !
      </h1>
      <Player
        trackList={tracks}
        includeTags={false}
        includeSearch={false}
        showPlaylist={false}
        sortTracks={false}
        autoPlayNextTrack={false}
        customColorScheme={colors}
      />
    </div>
  );
};

export default End;
