import React, { useEffect, useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import DrivingVersion from "./Centivizer/versions/DrivingVersion";
import GameManager from "./Centivizer/components/game-manager/GameManager";
import SwitchInstructions from "./Centivizer/components/instructions/SwitchInstructions";
import VersionGameSelectMenuDriving from "./Centivizer/components/gameselect/VersionGameSelectMenuDriving";

import AgainEasyInstructions from "./Centivizer/components/instructions/AgainEasyInstructions";
import TagMeSwitchDemo from "./Centivizer/games/TagMeSwitchDemo";
import audio from "./Centivizer/audio";
import Protocal from "./pages/Protocal"
import Instruction from "./pages/Instruction";
import MultiStepForm from "./pages/MultiStepForm";
import VideoPlay from "./Components/VideoPlay";
import FinalPage from "./pages/FinalPage";
import Quate from "./pages/Quate"
import UserIdFrame from './Centivizer/components/userIdFrame';

let version = new DrivingVersion();
export default function GameRoutes() {
  const [volume, setVolume] = useState(0.5);
  const [currBackgroundMusicIndex, setCurrBackgroundMusicIndex] = useState(-1);

  const value = { volume, setVolume };
  const [videoNames, setVideoNames] = useState([])
  const [wl, setWl] = useState([])
  const [sug, setSug] = useState({})
  const [sugt, setSugt] = useState({})
  const [twl, setTwl] = useState([])
  const [basicInfo, setBasicInfo] = useState({})
  const [shuffledIndex, setShuffleIndex] = useState([])

  function getData(videoNames, shuffledIndex, wl, sug){
    setVideoNames(videoNames)
    setShuffleIndex(shuffledIndex)
    setWl(wl)
    setSug(sug)
  }

  function getData2(inputValues){
    setBasicInfo(inputValues)
  }

  function getData3(inputValue){
    setTwl(inputValue)
  }

  useEffect(() => {
    audio.changeBackgroundMusic(currBackgroundMusicIndex);
  }, [currBackgroundMusicIndex]);

  useEffect(() => {
    audio.changeBackgroundMusicVolume(volume);
    audio.endGameSFX.volume = volume;
    audio.rightArpSFX.volume = volume;
    audio.ruleChangeSFX.volume = volume;
    audio.wrongPitchSFX.volume = volume;
    audio.shockSFX.volume = volume;
    audio.whackSFX.volume = volume;
  }, [volume]);

  return (
    <audio.volumeContext.Provider value={value}>
      {/* <UserIdFrame source='http://192.168.0.100:3000/standalone' /> */}
      <HashRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Protocal/>}
          />
          <Route
            path="/demo"
            exact
            render={(props) => <MultiStepForm getData={getData2}/>}
          />
          <Route
            path="/mainmenu"
            exact
            render={(props) => (
              <VersionGameSelectMenuDriving {...props} version={version} 
              // setCurrBackgroundMusicIndex={setCurrBackgroundMusicIndex}
              />
            )}
          />
          <Route
            path="/instruction"
            exact
            render={(props) => (
              <Instruction/>
            )}
          />
          <Route
            path="/video"
            exact
            render={(props) => (
              <VideoPlay getData={getData}/>
            )}
          />
          <Route
            path="/texts"
            exact
            render={(props)=>(
              <Quate getData={getData3}/>
            )}/>
          <Route
            path="/done"
            exact
            render={(props) => (
              <FinalPage names = {videoNames} index={shuffledIndex} wl={wl} basicInfo={basicInfo} twl={twl} sug={sug}/>
            )}
          />
          <Route
            path="/instructionsxyz"
            exact
            component={SwitchInstructions}
            key={"instructionsxyz"}
          />
          {version.games.map((game) => (
            <Route
              path={"/instructions" + game.name}
              exact
              render={(props) => (
                <game.instructionsComponent
                  {...props}
                  gameAddress={"/game" + game.name}
                  tryItOutAddress={"/game" + game.name + "Demo"}
                />
              )}
              key={"instructions" + game.name}
            />
          ))}
          {/* Games */}
          {version.games.map((game) => (
            <Route
              path={"/game" + game.name}
              exact
              render={(props) => (
                <GameManager
                  {...props}
                  name={game.name}
                  config={game.config}
                  isPractice={false}
                  version={version}
                  dataHandler={version.dataHandler}
                />
              )}
              key={"game" + game.name}
            />
          ))}
          {/* Practice */}
          {version.games
            .filter((game) => !/switch/i.test(game.name))
            .map((game) => (
              <Route
                path={"/game" + game.name + "Demo"}
                exact
                render={(props) => (
                  <GameManager
                    {...props}
                    name={game.name}
                    config={game.config}
                    isPractice={true}
                    version={version}
                    dataHandler={version.dataHandler}
                  />
                )}
                key={"game" + game.name + "Demo"}
              />
            ))}
          <Route
            path={"/gameSwitchDemo"}
            exact
            render={(props) => <TagMeSwitchDemo {...props} />}
          />
          <Route
            path="/againfigma"
            render={(props) => (
              <AgainEasyInstructions {...props} gameAddress={"/gameAgain"} />
            )}
          />
        </Switch>
      </HashRouter>
    </audio.volumeContext.Provider>
  );
}
