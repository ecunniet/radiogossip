"use client";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";

const tracks = [
  {
    url: "/audio/show_1.wav",
    title: "Culture Pop - Emission 20/20/2014",
    tags: [],
  },
];

const FirstShow = () => {
  return (
    <div className="flex flex-col items-center justify-center text-[#2d1707]">
      <Player
        trackList={tracks}
        includeTags={false}
        includeSearch={false}
        showPlaylist={false}
        sortTracks={false}
        autoPlayNextTrack={false}
      />
    </div>
  );
};

export default FirstShow;
