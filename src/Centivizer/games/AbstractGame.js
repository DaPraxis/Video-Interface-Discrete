import MoleState from "../components/game-manager/Objects.js";
import { TimeoutManager } from "../components/game-manager/TimeoutManager.js";

let field;

if (process.env.NODE_ENV === 'development') {
  field = require(".."+ "/assets/bgfield.png");
}else{
  field = ".."+ "/assets/bgfield.png";
}

export default class AbstractGame {
  name;
  dataName;
  numHoles;
  numRows;
  moleDuration;
  moleInterval;
  cryDuration;
  holeLayout;
  startPoint;

  constructor(args) {
    let {
      gameName,
      dataName,
      initNumMoles,
      initNumRows,
      moleInterval,
      moleDuration,
      cryDuration,
      moleLayout,
      startPoint,
      isPractice,
    } = args;
    this.name = gameName;
    this.dataName = dataName;
    this.numHoles = initNumMoles;
    this.numRows = initNumRows;
    this.moleDuration = moleDuration;
    this.moleInterval = moleInterval;
    this.cryDuration = cryDuration;
    this.holeLayout = moleLayout;
    this.timeoutManager = new TimeoutManager();
    this.resolveGameEnd = null;
    this.startPoint = startPoint;
    this.isPractice = isPractice;
    this.isReplayable = true;
    this.hasHit = false;
    this.showPoints = true;
    this.adjust = false;
    this.hasHitEmpty = false;
    // for any game-specific CSS, override this if necessary (e.g. TagMeMood and TagMeCoda)
    this.style = {
      background: {
        backgroundImage: `url(${field})`,
      },
      frame: {},
      smallScore: {},
      bigScore: {},
    };

    this.interactableHoles = [];
    for (let i = 0; i < this.numHoles; i++) {
      this.interactableHoles.push(i);
    }
  }

  // return an array of MoleState objects to present this trial
  chooseHoles(state) {
    this.hasHit = false;
    // default: return default mole in random spot
    return [new MoleState(Math.floor(Math.random() * this.numHoles))];
  }

  // return a promise for the interval between trials (during this you might, for example, show stimuli for the next trial)
  async interStimulusEvent(setOverlay, moles, setMoles) {
    // default: just wait for moleInterval
    return new Promise((resolve, reject) => {
      this.timeoutManager.setTimeout(resolve, this.moleInterval);
    });
  }

  // return an array [reactionType, scoreChange, dialogID, responseType] in response to this interaction (or non-interaction)
  // reactionType - "happy" or "sad"
  // scoreChange - the score change
  // dialogID - the id of the dialog to show (usually for messages shown if the player makes a mistake during practice)
  // responseType - "correct hit", "false alarm", "miss", "correct rejection" (and "bad hit") (check out signal detection theory)
  score(allHolesInfo, holeInfo, moleDownTime) {
    // holeInfo === null means the player did not hit a mole (i.e. they missed)
    if (!holeInfo) {
      // did not hit
      return ["", -1, 2, "miss"];
    } else if (!holeInfo.up) {
      // hit empty hole
      this.hasHitEmpty = true;
      return ["", -1, 4, "bad hit"];
    }

    // VERY IMPORTANT - set this flag to true if the player hit a mole
    // if you encounter a bug where multiple moles start popping up unintentionally, you probably forgot to do this
    this.hasHit = true;

    // calculate score based on reaction time, with the minimum being 1 and the maximum being 5
    let score = Math.floor(1000 / (moleDownTime - holeInfo.upTime));
    if (score < 1) {
      score = 1;
    } else if (score > 5) {
      score = 5;
    }
    return ["happy", score, null, "correct hit"];
  }

  // return whether this trial should be ended due to player interaction
  decideEndTrial(holeInfo) {
    // default: if the player hit a non-empty hole, end this trial
    return holeInfo.up;
  }

  getGameSpecificData() {
    return {};
  }

  getTrialSpecificData() {
    return {};
  }

  // return an array [dialogId, dialogId, ...] in the order you want to show each dialog
  // HIGHLY recommend looking at TagMeTune or (TagMeCoda or TagMeMood) for examples
  // IMPORTANT: use .showDialog to show dialog due to game instructions (e.g. "remember to turn on your sound!"), i.e. NOT due to player interaction
  // (conversely, use .score to show dialog due to player interaction (e.g. "you hit the wrong mole!"), i.e. NOT due to game instructions)
  showDialog() {
    return [];
  }

  endGame() {
    throw new Error("Not implemented");
  }
}
