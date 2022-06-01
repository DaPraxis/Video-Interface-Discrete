import React from "react";
import "./App.css";
import GameManager from "./components/game-manager/GameManager.js";
import TagMeQuick from "./games/TagMeQuick.js";
import TagMeOnly from "./games/TagMeOnly.js";
import TagMeSame from "./games/TagMeSame.js";
import TagMeAgain from "./games/TagMeAgain.js";
import TagMeSwitch from "./games/TagMeSwitch.js";
import TagMeBigger from "./games/TagMeBigger.js";
import TagMeWhere from "./games/TagMeWhere.js";
import OnlyPreGen from "./games/OnlyPreGen.js";
import Version from "./versions/AbstractVersion.js";

function App_Cent() {
  let version = new Version();
  
  return (
    <div className="App">
      <GameManager
        game={new TagMeOnly()}
        version={version}
        dataHandler={version.dataHandler}
      />
    </div>
  );
}

export default App_Cent;
