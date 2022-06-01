import React from "react";
import MoleState from "../components/game-manager/Objects.js";
import TrialBasedGame from "./TrialBasedGame.js";
import assets from "../assets/assets.js";

let lightning;

if (process.env.NODE_ENV === 'development') {
  lightning = require(".."+"/assets/lightning.gif");
} else {
  lightning = ".."+"/assets/lightning.gif";
}

export default class TagMeWhere extends TrialBasedGame {
  highProbHole;
  holeProb;

  constructor(
    isPractice,
    numTrials = 60,
    moleDuration = 800,
    moleInterval = 800,
    highProbChance = 0.8
  ) {
    super(
      {
        gameName: "TAG-ME Where",
        dataName: "TagMeWhere",
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
      numTrials
    );
    this.highProbChance = highProbChance;
    this.highProbHole = Math.floor(Math.random() * this.numHoles);
    this.highProbTrials = [];
    this.holeProb = "";
    this.adjust = true;
    this.permuteTrials(Math.floor(this.highProbChance * this.totalTrials));
    this.preload();
  }

  // preload mole and lightning
  preload() {
    // preload regular moles
    const modes = ["normal", "happy", "cry"];
    for (const mode of modes) {
      const img = new Image();
      img.src = assets["regular"][mode];
    }
    // preload lightning and hole
    const lightningGif = new Image();
    lightningGif.src = lightning;
    const holeImage = new Image();
    holeImage.src = assets['hole'];
  }

  adjustTrials() {
    this.totalTrials++;
    let n = 0;
    for (let i = 0; i < this.highProbTrials.length; i++) {
      if (this.highProbTrials[i] >= this.currentTrial) {
        n++;
      }
    }
    this.highProbTrials = [];
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
      } while (this.highProbTrials.includes(trial));
      this.highProbTrials.push(trial);
    }
  }

  _chooseHoles(state) {
    if (this.highProbTrials.includes(this.currentTrial)) {
      this.holeProb = "high";
      return [new MoleState(this.highProbHole)];
    }
    this.holeProb = "low";
    let holeNum;
    do {
      holeNum = Math.floor(Math.random() * this.numHoles);
    } while (holeNum === this.highProbHole);
    return [new MoleState(holeNum)];
  }

  async interStimulusEvent(setOverlay, moles, setMoles) {
    if (this.currentTrial === this.totalTrials) {
      return Promise.resolve;
    }
    
    this.highProbHole = Math.floor(Math.random() * this.numHoles);
    if (this.currentTrial !== this.totalTrials) {
      moles[this.highProbHole].overlay = this.overlay();
    }
    setMoles(moles);
    return new Promise((resolve, reject) => {
      this.timeoutManager.setTimeout(() => {
        moles[this.highProbHole].overlay = null;
        setMoles(moles, resolve);
      }, this.moleInterval);
    });
  }

  score(allHolesInfo, holeInfo, moleDownTime) {
    // auto-ended trial
    if (!holeInfo) {
      return ["", -1, 2, "miss"];
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

  overlay() {
    return (
      <img
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          marginLeft: "-85px",
        }}
        src={lightning}
        alt=""
      />
    );
  }

  getGameSpecificData() {
    return {
      highProbChance: this.highProbChance,
      totalTrials: this.totalTrials,
      highProbHole: this.highProbHole,
      holeProb: this.holeProb    
    };
  }

  getTrialSpecificData() {
    return { highProbHole: this.highProbHole, holeProb: this.holeProb };
  }
}
