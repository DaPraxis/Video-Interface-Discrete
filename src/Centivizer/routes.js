import React, { useEffect, useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import DemoVersion from "./versions/DemoVersion";
import GameManager from "./components/game-manager/GameManager";
import SwitchInstructions from "./components/instructions/SwitchInstructions";
import Home from "./components/homepage/Home";
import VersionGameSelectMenu from "./components/gameselect/VersionGameSelectMenu";
import AgainEasyInstructions from "./components/instructions/AgainEasyInstructions";
import TagMeSwitchDemo from "./games/TagMeSwitchDemo";
import audio from "./audio";
import UserIdFrame from './components/userIdFrame';

let version = new DemoVersion();
version.games.map((game) => {
  console.log(game);
});

export default function Routes() {
  const [volume, setVolume] = useState(0.5);
  const [currBackgroundMusicIndex, setCurrBackgroundMusicIndex] = useState(-1);

  const value = { volume, setVolume };

  // let route = window.location.href.split("/");

  // useEffect(() => {
  //   console.log("route: " + route);
  //   if (
  //     route[route.length - 1] !== "" &&
  //     !["gameCodaDemo", "gameCoda", "gameTune", "gameTuneDemo"].includes(
  //       route[route.length - 1]
  //     )
  //   ) {
  //     audio.backgroundMusic[0].play();
  //   }
  // }, [route]);

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
      <UserIdFrame source='http://192.168.0.100:3000/standalone' />
      <HashRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Home {...props} version={version} />}
          />
          <Route
            path="/mainmenu"
            exact
            render={(props) => (
              <VersionGameSelectMenu {...props} version={version} setCurrBackgroundMusicIndex={setCurrBackgroundMusicIndex}/>
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
