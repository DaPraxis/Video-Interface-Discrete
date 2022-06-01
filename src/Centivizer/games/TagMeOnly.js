import TrialBasedGame from "./TrialBasedGame";
import MoleState from "../components/game-manager/Objects.js";

export default class TagMeOnly extends TrialBasedGame {
  constructor(
    isPractice,
    totalTrials = 60,
    moleDuration = 2000,
    moleInterval = 2000,
    hatChance = 0.2
  ) {
    super(
      {
        gameName: "TAG-ME Only",
        dataName: "TagMeOnly",
        initNumMoles: 6,
        initNumRows: 2,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [
          [0, 1, 2],
          [3, 4, 5],
        ],
        startPoint: "trial",
        isPractice: isPractice,
      },
      totalTrials
    );
    this.hatChance = hatChance;
    this.adjust = true;
    this.targetTrials = [];
    this.permuteTrials(Math.floor(this.hatChance * this.totalTrials));
  }

  adjustTrials() {
    this.totalTrials++;
    let n = 0;
    for (let i = 0; i < this.targetTrials.length; i++) {
      if (this.targetTrials[i] >= this.currentTrial) {
        n++;
      }
    }
    this.targetTrials = [];
    this.permuteTrials(n);
  }

  permuteTrials(n) {
    for (let i = 0; i < n; i++) {
      let trial;
      do {
        trial = Math.floor(
          Math.random() * (this.totalTrials - this.currentTrial) +
            this.currentTrial +
            1
        );
      } while (this.targetTrials.includes(trial));
      this.targetTrials.push(trial);
    }
  }

  _chooseHoles(state) {
    const hole = new MoleState(
      Math.floor(Math.random() * this.numHoles),
      "regular"
    );
    if (this.targetTrials.includes(this.currentTrial)) {
      hole.type = "hat";
    }
    return [hole];
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    // auto-ended trial
    if (!holeInfo) {
      if (!this.hasHitEmpty){
      for (const hole of allHolesInfo) {
        if (hole.up) {
          if (hole.type === "hat") {
            return ["", 0, null, "correct rejection"];
          }
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
    // return ["happy", score, null, "correct hit"];

    if (!(this.hasHitEmpty) && !(holeInfo.type === "hat")) {
      return ["happy", score, null, "correct hit"];
    } else if (!(this.hasHitEmpty) && holeInfo.type === "hat") {
      //false alarm
      // console.log('hit wrong');
      return ["sad", -1, 3, "false alarm"];
    } else {
      return ["", 0, 0, ""];
    }
  }

  decideEndTrial(holeInfo) {
    return true; // prevent multiple hits per trial
  }

  getGameSpecificData() {
    return { hatChance: this.hatChance, totalTrials: this.totalTrials };
  }
}
