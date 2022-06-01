import { createContext } from "react";
import assets from "./assets/assets";

let now_playing = [];

const audioFiles = assets.audioFiles;
let currBackgroundMusicIndex = -1;

const volumeContext = createContext({
  volume: 0.5,
  setVolume: () => {},
});

const getPlaying = () => {
  return now_playing;
};

const playSound = (audioFile) => {
  audioFile.currentTime = 0;
  audioFile.play();
  now_playing.push(audioFile);
};

const stopAll = () => {
  console.log("now playing");
  console.log(now_playing);
  while (now_playing.length) {
    let sound = now_playing.pop();
    if (!sound.ended) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
};

const backgroundMusicFiles = audioFiles.backgroundMusic.map(music => new Audio(music));


const stopBackground = () => {
  backgroundMusicFiles.forEach(music => {
    music.pause();
    music.currentTime = 0;
  })
};

// backgroundMusic.addEventListener(
//   "ended",
//   function () {
//     playSound(backgroundMusic);
//   },
//   false
// );


backgroundMusicFiles.forEach(music => {
  music.addEventListener(
    'ended',
    function() {
      playSound(music);
    },
    false
  );
});


let backgroundMusic = backgroundMusicFiles[currBackgroundMusicIndex >= 0 ? currBackgroundMusicIndex : 0];


const changeBackgroundMusic = i => {
  stopBackground();
  if (i >= 0 && i < backgroundMusicFiles.length) {
    backgroundMusic = backgroundMusicFiles[i];
    // console.log(backgroundMusic)
    backgroundMusic.play();
  }
}

const changeBackgroundMusicVolume = (volume) => {
  backgroundMusic.volume = volume;
}

const endGameSFX = new Audio(audioFiles.endGameSFX);

const whackSFX = new Audio(audioFiles.whackSFX);
const rightArpSFX = new Audio(audioFiles.rightArpSFX);
const ruleChangeSFX = new Audio(audioFiles.ruleChangeSFX);
const wrongPitchSFX = new Audio(audioFiles.wrongPitchSFX);
const shockSFX = new Audio(audioFiles.shockSFX);

export default {
  playSound: playSound,
  changeBackgroundMusic: changeBackgroundMusic,
  stopBackground: stopBackground,
  changeBackgroundMusicVolume: changeBackgroundMusicVolume,
  stopAll: stopAll,
  getPlaying: getPlaying,
  volumeContext: volumeContext,
  endGameSFX: endGameSFX,
  whackSFX: whackSFX,
  rightArpSFX: rightArpSFX,
  ruleChangeSFX: ruleChangeSFX,
  wrongPitchSFX: wrongPitchSFX,
  shockSFX: shockSFX,
};
