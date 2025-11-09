"use client";
import PlayerFromLib from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

const tracks = [
  {
    url: "/audio/show_3.wav",
    title: "En direct - Soirée des talents 2022",
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

const ThirdShow = () => {
  const Player = PlayerFromLib as React.ElementType;
  return (
    <div className="flex flex-col items-center justify-center text-[#2d1707] gap-8">
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

export default ThirdShow;
