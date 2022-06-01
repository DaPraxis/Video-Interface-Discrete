import TrialBasedGame from "./TrialBasedGame.js";
import TimeBasedGame from "./TimeBasedGame.js";
import MoleState from "../components/game-manager/Objects.js";

export class TrialBasedTagMeQuick extends TrialBasedGame {
  constructor(
    isPractice,
    totalMoles = 60,
    moleDuration = 1000,
    moleInterval = 2000
  ) {
    super(
      {
        gameName: "TAG-ME Quick",
        dataName: "TagMeQuick",
        initNumMoles: 6,
        initNumRows: 2,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [
          [0, 1, 2],
          [3, 4, 5],
        ],
        startPoint: "interstimulus",
        isPractice: isPractice,
      },
      totalMoles
    );
  }

  _chooseHoles(state) {
    // default implementation: return default mole in random spot
    return [new MoleState(Math.floor(Math.random() * this.numHoles))];
  }

  getGameSpecificData() {
    return { totalTrials: this.totalTrials };
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    // auto-ended trial
    if (!holeInfo) {
      if (!this.hasHitEmpty){
      for (const hole of allHolesInfo) {
        if (hole.up) {
          return ["", -1, 2, "miss"];
        }
      }}else{return ["", 0, 0, ""];}
    } else if (!holeInfo.up) {
      this.hasHitEmpty = true;
      return ["", -1, 4, "bad hit"];
    }

    this.hasHit = true;

    let score = Math.floor(1000 / (moleDownTime - holeInfo.upTime));
    if (score < 1) {
      score = 1;
    } else if (score > 5) {
      score = 5;
    }

    if (!(this.hasHitEmpty)) {
      return ["happy", score, null, "correct hit"];
    } else {
      return ["", 0, 0, ""];
    }
  }

  decideEndTrial(holeInfo) {
    return true; // prevent multiple hits per trial
  }
}

export class TimeBasedTagMeQuick extends TimeBasedGame {
  constructor(
    isPractice,
    totalSeconds = 60,
    moleDuration = 1000,
    moleInterval = 2000
  ) {
    super(
      {
        gameName: "TAG-ME Quick",
        dataName: "TagMeQuick",
        initNumMoles: 6,
        initNumRows: 2,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [
          [0, 1, 2],
          [3, 4, 5],
        ],
        startPoint: "interstimulus",
        isPractice: isPractice,
      },
      totalSeconds
    );
  }

  getGameSpecificData() {
    return { totalTrials: this.totalTrials };
  }

  // Extend the chooseHoles method from the parent class to enable bad hit.
  chooseHoles(state) {
    this.hasHit = false;
    this.hasHitEmpty = false;
    this.currentTrial++;
    // default: return default mole in random spot
    return [new MoleState(Math.floor(Math.random() * this.numHoles))];
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    // auto-ended trial
    if (!holeInfo) {
      if (!this.hasHitEmpty){
      for (const hole of allHolesInfo) {
        if (hole.up) {
          return ["", -1, 2, "miss"];
        }
      }}else{return ["", 0, 0, ""];}
    } else if (!holeInfo.up) {
      this.hasHitEmpty = true;
      return ["", -1, 4, "bad hit"];
    }

    this.hasHit = true;

    let score = Math.floor(1000 / (moleDownTime - holeInfo.upTime));
    if (score < 1) {
      score = 1;
    } else if (score > 5) {
      score = 5;
    }

    if (!(this.hasHitEmpty)) {
      return ["happy", score, null, "correct hit"];
    } else {
      return ["", 0, 0, ""];
    }
  }

  decideEndTrial(holeInfo) {
    return true; // prevent multiple hits per trial
  }
}
