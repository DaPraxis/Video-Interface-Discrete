import TrialBasedGame from "./TrialBasedGame.js";
import MoleState from "../components/game-manager/Objects.js";

const NUMBERS = [];

export default class TagMeAgain extends TrialBasedGame {
  lastMoleNums = [];

  constructor(
    isPractice,
    numMoles = 60,
    moleDuration = 2000,
    moleInterval = 2000,
    congruentChance = 0.3,
    prev = 1,
    level = "Easy",
    maxMoleNum = 9
  ) {
    super(
      {
        gameName: "TAG-ME Again " + level,
        dataName: "TagMeAgain" + level,
        initNumMoles: 1,
        initNumRows: 1,
        moleInterval: moleInterval,
        moleDuration: moleDuration,
        cryDuration: 500,
        moleLayout: [[0]],
        startPoint: "trial",
        isPractice: isPractice,
      },
      numMoles
    );
    this.nBack = prev;
    this.nthBackMole = null;
    this.maxMoleNum = maxMoleNum;
    this.congruentChance = congruentChance;
    this.ignore = false;
    this.adjust = true;

    for (let i = 0; i < maxMoleNum; i++) {
      NUMBERS.push(`jersey${i}`);
    }

    this.targetTrials = [];
    this.permuteTrials(Math.floor(this.congruentChance * this.totalTrials));
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
        if (this.currentTrial <= this.nBack) {
          trial = Math.floor(
            Math.random() * (this.totalTrials - this.nBack) + this.nBack + 1
          );
        } else {
          trial = Math.floor(
            Math.random() * (this.totalTrials - this.currentTrial) +
              this.currentTrial +
              1
          );
        }
      } while (this.targetTrials.includes(trial));
      this.targetTrials.push(trial);
    }
    console.log(this.targetTrials);
  }

  _chooseHoles(state) {
    let moleNum;

    if (
      this.targetTrials.includes(this.currentTrial) &&
      this.lastMoleNums.length === this.nBack
    ) {
      //congruent case
      moleNum = this.lastMoleNums[0];
      this.ignore = false;
    } else {
      //incongruent case, choose random mole
      do {
        moleNum = Math.floor(Math.random() * (this.maxMoleNum - 1)) + 1;
      } while (moleNum === this.lastMoleNums[0]);
      this.ignore = true;
    }

    if (this.lastMoleNums.length === this.nBack) {
      this.nthBackMole = this.lastMoleNums[0];
      this.lastMoleNums = this.lastMoleNums.slice(1);
    }
    this.lastMoleNums.push(moleNum);

    return [
      new MoleState(
        Math.floor(Math.random() * this.numHoles),
        NUMBERS[moleNum]
      ),
    ];
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    let dialog;
    if (this.nBack === 1) {
      dialog = "one-back";
    } else if (this.nBack === 2) {
      dialog = "two-back";
    } else if (this.nBack === 3) {
      dialog = "three-back";
    }
    // auto-ended trial
    if (!holeInfo) {
      if (!this.hasHitEmpty) {
        if (this.ignore) {
          return ["", 0, null, "correct rejection"];
        }
        return ["", -1, 2, "miss"];
      } else { return ["", 0, 0, ""]; }
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

    if (!(this.hasHitEmpty) && holeInfo.type === NUMBERS[this.nthBackMole]){
      //hit a target mole
      return ["happy", score, null, "correct hit"];
    } else if (!(this.hasHitEmpty) && holeInfo.type !== NUMBERS[this.nthBackMole]) {
      //hit a non-target mole
      return ["sad", -1, dialog, "false alarm"];
    } else {
      return ["", 0, 0, ""];
    }
  }

  decideEndTrial(holeInfo) {
    return true; // prevent multiple hits per trial
  }

  getGameSpecificData() {
    return {
      congruentChance: this.congruentChance,
      totalTrials: this.totalTrials,
      nBack: this.nBack,
      maxMoleNum: this.maxMoleNum,
    };
  }
}
